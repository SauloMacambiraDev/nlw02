
exports.up = knex => knex.schema.createTable('students', table => {
    
    table.increments();
    table.string('name', 70).notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();

    // Log fields
    table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
    table.timestamp('updated_at', { precision: 6 });
})
.then(() => console.log('Table students were created successfully!'))
.catch(err => {
    console.log(`Was not possible to create table 'students'`)
    console.log(err)
})

exports.down = knex => knex.schema.dropTableIfExists('students')
.then(() => console.log('Table students were dropped successfully!'))
.catch(err => {
    console.log('Was not possible to DROP table students')
    console.log(err)
})
