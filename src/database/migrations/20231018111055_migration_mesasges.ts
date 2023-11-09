import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	if (!await knex.schema.hasTable('messages'))
		return knex.schema
			.createTable('messages', table => {
				table.increments('id').primary();
				table.boolean('isActive').notNullable();
				table.string('to').notNullable();
				table.string('from').notNullable();
				table.string('content').notNullable();
				table.timestamps(true, true);
			});
}

export async function down(knex: Knex): Promise<void> { }