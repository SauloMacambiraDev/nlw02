const knex = require('./../database/connection');
const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const { subjects, weekdays } = require('./../utils/formatData');
const loadJsFiles = require('./../utils/loadJsFiles');
const loadCssFiles = require('./../utils/loadCssFiles');

const errorHandler = (err, res) => {
    let jsonResponse = { status: 'failure', message: err.message }

    if(process.env.NODE_ENV == 'development'){
        console.log(err)
        jsonResponse.err = err
    }

    return res.status(500).json(jsonResponse)
}

exports.homePage = (req,res,next) => {
    try {
        
        return res.status(200).render('index', 
        { 
            title: 'Proffy | Sua plataforma de ensino online',
            styleFiles: loadCssFiles('page-landing.css'),
            jsFiles: loadJsFiles('logout.js', 'loading.js', 'alert.js'),
            user: req.user
        });
    }catch(err){
        return errorHandler(err, res);
    }
}

exports.studyPage = async(req, res, next) => {
    try{

        const filters = req.query;

        const { subject, weekday, time } = filters;

        let query = knex('proffys')
                        .join('classes', 'classes.proffy_id', '=', 'proffys.id')
                        .join('subjects', 'subjects.id', '=', 'classes.subject_id')
                        .select('proffys.id', 'proffys.name', 'proffys.avatar', 
                        'proffys.bio', 'proffys.whatsapp', 'classes.cost', 'subjects.id as subjectId', 'subjects.description');

        if (subject) query.where('subjects.id', '=', subject)

        if (weekday || time){
            query.join('class_schedule', 'class_schedule.class_id', '=', 'classes.id')
            
            if (weekday) {
                query.where('class_schedule.weekday', '=', weekday)
            }
            if (time) {
                
                let [ hours, minutes]  = time.split(':')
                minutes = minutes + (hours * 60);
                query.where('class_schedule.time_from', '<=', minutes)
                query.where('class_schedule.time_to', '>', minutes)
            }
        }

        const proffys = await query;

        return res.status(200).render('study', { 
            title: 'Proffy | Sua plataforma de ensino online',
            styleFiles: loadCssFiles('header.css', 'forms.css', 'page-study.css'),
            filters,
            proffys,
            subjects,
            weekdays
        });
    } catch(err) {
        return errorHandler(err, res);
    }
}

exports.giveClassesPage = async (req, res, next) => {
    try {

        return res.status(200).render('give-classes', { 
            title: 'Proffy | Sua plataforma de ensino online',
            styleFiles: loadCssFiles('header.css', 'forms.css', 'page-give-classes.css', 'loading.css', 'alert.css'),
            jsFiles: loadJsFiles('https://cdnjs.cloudflare.com/ajax/libs/axios/0.20.0/axios.min.js', 'addField.js',
                                 'newProffy.js', 'loading.js', 'alert.js'),
            subjects,
            weekdays
        })
    }catch(err) {
        return errorHandler(err, res);
    }
}


exports.loginPage = async (req,res,next) => {
    try{
        return res.status(200).render('login', {
            title: 'Proffy | Sua plataforma de ensino online',
            styleFiles: loadCssFiles('page-login.css', 'loading.css', 'alert.css'),
            jsFiles: loadJsFiles('https://cdnjs.cloudflare.com/ajax/libs/axios/0.20.0/axios.min.js', 'login.js', 'loading.js', 'alert.js')
        });
    } catch (err) {
        return errorHandler(err, res);
    }
}

exports.register = async (req,res,next) => {
    try{
        return res.status(200).render('register', {
            title: 'Proffy | Sua plataforma de ensino online',
            styleFiles: loadCssFiles('page-register.css', 'loading.css', 'alert.css'),
            jsFiles: loadJsFiles('register.js', 'loading.js', 'alert.js')
        });
    } catch (err) {
        return errorHandler(err, res);
    }
}

exports.shouldGoToLogin = async( req,res,next) => {
    if (req.user) return next();
    
    return res.redirect('/login');
}