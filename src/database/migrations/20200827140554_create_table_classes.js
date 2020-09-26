
exports.up = knex => knex.schema.createTable('classes', table => {
    table.increments();
    table.decimal('cost');

    // Foreign Keys
    table.integer('subject_id').unsigned();
    table.foreign('subject_id').references('id').inTable('subjects').onDelete('SET NULL');

    table.integer('proffy_id').unsigned();
    table.foreign('proffy_id').references('id').inTable('proffys').onDelete('CASCADE');
    
    // Log fields
    table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
    table.timestamp('updated_at', { precision: 6 });
})
.then(() => console.log('Table classes were created successfully!'))
.catch(err => {
    console.log(`Was not possible to create table 'classes'`)
    console.log(err)
})

exports.down = knex => knex.schema.dropTableIfExists('classes')
.then(() => console.log('Table classes were dropped successfully!'))
.catch(err => {
    console.log('Was not possible to DROP table classes')
    console.log(err)
})
