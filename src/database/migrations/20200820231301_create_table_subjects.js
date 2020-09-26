
exports.up = knex => knex.schema.createTable('subjects', table => {
    // table.increments(); //create primary key auto increment
    table.integer('id').unsigned().primary();
    table.string('description').notNullable();

    // Log fields
    table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
    table.timestamp('updated_at', { precision: 6 });
})
.then(() => console.log(`table 'subjects' was created in database!!`))
.catch((err) => {
    console.log(`An error happened while trying to create table 'subjects':`)
    console.log(err)
});

exports.down = knex => knex.schema.dropTableIfExists('subjects')
.then(() => console.log(`table 'subjects' was deleted from database..`))
.catch((err) => {
    console.log(`An error happened while trying to drop table 'subjects':`)
    console.log(err)
});
