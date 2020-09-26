
exports.up = knex => knex.schema.createTable('class_schedule', table => {
    table.increments();
    table.integer('weekday').unsigned().notNullable();
    table.integer('time_from').unsigned().notNullable();
    table.integer('time_to').unsigned().notNullable();

    // Foreign Keys
    table.integer('class_id').unsigned();
    table.foreign('class_id').references('id').inTable('classes');

    // Log fields
    table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
    table.timestamp('updated_at', { precision: 6 });
})
.then(() => console.log('Table class_schedule were created successfully!'))
.catch(err => {
    console.log(`Was not possible to create table 'class_schedule'`)
    console.log(err)
})

exports.down = knex => knex.schema.dropTableIfExists('class_schedule')
.then(() => console.log(`table 'class_schedule' was deleted from database..`))
.catch((err) => {
    console.log(`An error happened while trying to drop table 'class_schedule':`)
    console.log(err)
});