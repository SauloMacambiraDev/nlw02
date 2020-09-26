const knex = require('../database/connection');

exports.createStudent = async (req,res,next) => {
    try{

        return res.status(201).json({
            status: 'success',
            message: 'Parabéns, você agora é um estudante da plataforma Proffy!'
        })
    }catch(err){
        return res.status(500).json({ 
            status: 'failure',
            message: 'Não foi possível cadastrá-lo. Por favor, tente novamente.'
        })
    }
}