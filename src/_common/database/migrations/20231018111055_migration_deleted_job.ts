import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	if (!await knex.schema.hasTable('deletedLogs'))
		return knex.schema
			.createTable('deletedLogs', table => {
				table.increments('id').primary();
				table.string('log').notNullable();
				table.string('deletedAt').notNullable();
				table.timestamps(true, true);
			});
}

export async function down(knex: Knex): Promise<void> { }