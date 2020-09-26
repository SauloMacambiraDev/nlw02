const knex = require('../database/connection');
const { subjects, weekdays } = require('../utils/formatData');

const errorHandler = (err, res) => {
    let jsonResponse = { status: 'failure', message: err.message }

    if(process.env.NODE_ENV == 'development'){
        console.log(err)
        jsonResponse.err = err
    }

    return res.status(500).json(jsonResponse)
}

exports.saveClass = async (req,res,next) => {
    const trx = await knex.transaction();
    
    try {

        const { 
            name,
            avatar,
            whatsapp,
            bio,
            subjectId,
            cost,
            weekdays,
            timeFroms,
            timeTos
        } = req.body;

        const [ proffyId ] = await trx('proffys').insert({
            name,
            avatar,
            whatsapp,
            bio
        });
        
        const [ classId ] = await trx('classes').insert({
            cost,
            subject_id: subjectId,
            proffy_id: proffyId,
        });

        if (weekdays) {
            const classScheduleArray = weekdays.map((value, index) => {

                const [ timeFromHours, timeFromMinutes ] = timeFroms[index].split(':');
                const timeFrom = (timeFromHours * 60) + timeFromMinutes;

                const [ timeToHours, timeToMinutes ] = timeTos[index].split(':');
                const timeTo = (timeToHours * 60) + timeToMinutes;

                return {
                    weekday: weekdays[index],
                    time_from: timeFrom,
                    time_to: timeTo,
                    class_id: classId
                };
            });

            await trx('class_schedule').insert(classScheduleArray);
        }

        await trx.commit();
        setTimeout(() => {
            // pretend this is an async request just to show loading view :)
            return res.status(201).json({
                status: 'success',
                proffy: proffyId
            });
        }, 3000)
        
        
    } catch (error) {
        await trx.rollback();
        return errorHandler(error, res)
    }
}