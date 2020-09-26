
exports.up = knex => knex.schema.createTable('proffys', table => {
    table.increments('id'); 
    table.string('name').notNullable();
    table.string('avatar').notNullable();
    table.string('whatsapp').notNullable();
    table.string('bio', 400).notNullable();
    
    // Log fields
    table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
    table.timestamp('updated_at', { precision: 6 });
}).then(() => console.log(`Table 'proffys' was created in database!!`))

exports.down = knex => knex.schema.dropTableIfExists('proffys')
.then(() => console.log(`Table 'proffys' was deleted from database..`))
.catch(err => console.log(err))
