const bcrypt = require('bcryptjs');

exports.seed = async knex => {
  try{
    // Insert default proffys on db
    console.log(`Deleting and inserting standard subjects`)
    await knex('subjects').del()
    await knex('subjects').insert([
      { id: 1, description: 'Artes' },
      { id: 2, description: 'Biologia' },
      { id: 3, description: 'Ciências' },
      { id: 4, description: 'Educação' },
      { id: 5, description: 'Física' },
      { id: 6, description: 'Geografia' },
      { id: 7, description: 'História' },
      { id: 8, description: 'Matemática' },
      { id: 9, description: 'Português' },
      { id: 10, description: 'Química' }
    ])
    


    console.log(`1) Deleting existings proffys in database`)
    await knex('proffys').del()
    
    console.log(`2) Inserting default proffys in database`)
    await knex('proffys').insert([
        {
          name: 'Diego Fernandes',
          avatar: 'https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4',
          whatsapp: '5585985143431',
          bio: `Entusiasta das melhores tecnologias de química avançada. <br><br>Apaixonado por explodir coisas em 
          laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram 
          por uma das minhas explosões.`,
          
      },
      {
          name: 'Saulo de Melo Macambira',
          avatar: 'https://avatars2.githubusercontent.com/u/62569215?s=400&u=fe6b6f7e94dc051545b626cbccd039f8b3d55abc&v=4',
          whatsapp: '5585985143431',
          bio: `I'm passioned on JS Stack since i've met rocketseat! <br><br>
              I'm currently finishing my course of NodeJs with ExpressJS provided by Jonas Schmedtmann and then i'll focus finally in ReactJs and React Native with all my strenght in order to domain all stack!`,
          
      },
      { 
        name: 'Mayk Brito',
        avatar: 'https://avatars2.githubusercontent.com/u/6643122?s=400&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4',
        whatsapp: '5585985143431',
        bio: 'Instrutor de Educação física'
      }
    ]);


    console.log(`3) Deleting existing classes in database`)
    await knex('classes').del()
    
    console.log(`4) Inserting existing classes in database`)
    await knex('classes').insert([
      {
        cost: 29.99,
        subject_id: 2, 
        proffy_id: 1
      },
      {
        cost: 59.99,
        subject_id: 10,
        proffy_id: 2
      },
      {
        cost: 120.00,
        subject_id: 5,
        proffy_id: 3
      }
    ]);
    
    console.log(`5) Deleting existing class_schedules in database`)
    await knex('class_schedule').del()

    console.log(`6) Inserting existing class_schedules in database`)
    await knex('class_schedule').insert([
      // class_id will come through database, right after register a class
      { 
        weekday: 1,
        time_from: 720,
        time_to: 1220,
        class_id: 1
      },
      { 
        weekday: 3,
        time_from: 520,
        time_to: 1220,
        class_id: 1
      }
    ])
    
    
    console.log(`7) Deleting existing students in database`)
    await knex('students').del()

    console.log(`8) Inserting existing students in database`)
    const password = await bcrypt.hash('123456', 12);
    await knex('students').insert([
      {
        name: 'Saulo de Melo Macambira',
        email: 'saulomacdev@gmail.com',
        password
      }
    ])

    console.log('Seed had worked successfully!')
  } catch(err) {
    console.log(err);
  }
  
}

