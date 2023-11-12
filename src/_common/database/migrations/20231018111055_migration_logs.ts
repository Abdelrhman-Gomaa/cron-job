import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	if (!await knex.schema.hasTable('logs'))
		return knex.schema
			.createTable('logs', table => {
				table.increments('id').primary();
				table.string('content').notNullable();
				table.timestamps(true, true);
			});
}

export async function down(knex: Knex): Promise<void> { }