const knex = require('./../database/connection')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const errorHandler = (err, res) => {
    let jsonResponse = { status: 'failure', message: err.message }

    if(process.env.NODE_ENV == 'development'){
        console.log(err)
        jsonResponse.err = err
    }

    return res.status(500).json(jsonResponse)
}

exports.signin = async (req, res, next) => {
    try{
        const { email, password, rememberme } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                status: 'failure', 
                message: `Por favor, preeencha os campos de email e senha`
            });
        }

        const currentStudent = await knex('students').where({ email }).first();
        if(!currentStudent) return res.status(400).json({ 
            status: 'failure', 
            message: `E-mail ou senha inválido`
        });

        const correctPassword = await bcrypt.compare(password, currentStudent.password);
        if(!correctPassword) return res.status(400).json({ 
            status: 'failure', 
            message: `E-mail ou senha inválido`
        });
        
        let cookieOptions = { 
            expires: new Date(Date.now() + (process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000)) 
        }

        if(rememberme && rememberme == true) {
            const nextYear = new Date(Date.now() + (365 * 24 * 60 * 60 * 1000));
            cookieOptions.expires = nextYear;
        }
        
        if(process.env.NODE_ENV.trim() == 'production') cookieOptions.httpOnly = true;

        const token = await promisify(jwt.sign)({ id: currentStudent.id }, process.env.JWT_SECRET, {
            expiresIn: (rememberme) ? '365d': process.env.JWT_EXPIRES_IN
        });

        res.cookie('jwt', token, cookieOptions);

        delete currentStudent.password;

        return res.status(200).json({
            status: 'success',
            token,
            user: currentStudent,
            message: `Bem vindo ao Proffy ${currentStudent.name.split(' ')[0]}!` 
        })

    } catch(err){
        errorHandler(err, res);
    }
}

exports.signup = async (req, res, next) => {
    try {
        let { name, email, password, confirmPassword } = req.body;

        if (!name || !email || !password || !confirmPassword){
            return res.status(400).json({ 
                status: 'failure', 
                message: 'Campos estão faltando.'
            });
        }

        const student = await knex('students').where({ email }).first();
        if(student) {
            return res.status(400).json({ 
                status: 'failure', 
                message: 'Já existe um estudante com este e-mail.'
            });
        }
        
        if (confirmPassword !== password) {
            return res.status(400).json({ 
                status: 'failure', 
                message: 'A confirmação da senha deve está igual à senha.'
            });
        }

        password = await bcrypt.hash(password, 12);

        // Knex return the 'id' by default
        const [ newStudent ] = await knex('students').insert({
            name,
            email,
            password
        });

        return res.status(200).json({
            status: 'success',
            message: 'Seja muito bem vindo ao Proffy estudante!'
        });
    } catch(err){
        errorHandler(err, res);
    }
}

exports.logout = async (req, res, next) => {
    try {
        const { jwt:token } = req.cookies;

        if(!token) throw new Error('Estudante não está logado.');
    
        // if token is not available, will throw an Error
        await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        let cookieOptions = { 
            expires: new Date(Date.now() + 1000)
        }

        res.cookie('jwt', '', cookieOptions);

        // 204 - No Content
        res.status(204).send();
    } catch(err) {
        errorHandler(err, res);
    }
}

exports.isLoggedIn = async (req,res,next) => {
    try {
        const { jwt: token } = req.cookies;

        if (!token) throw new Error('Estudante não está logado.');

        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const currentUser = await knex('students').where({ id: decoded.id}).first();

        // If user no long exist, return to loginPage
        if(!currentUser) throw new Error('Estudante não existe mais.');

        // User is logged in, proceed to the next page
        currentUser.password = undefined;
        req.user = currentUser;

        return next();
    } catch (error) {
        return next();
    }
}