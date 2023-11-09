import { Model } from 'objection';

export class Message extends Model {
  static get tableName(): string {
    return 'messages';
  }

  id!: number;
  isActive!: boolean;
  to!: string;
  from!: string;
  content!: string;

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['to', 'from', 'content'],

      properties: {
        id: { type: 'integer' },
        isActive: { type: 'boolean', default: true },
        to: { type: 'string' },
        from: { type: 'string' },
        content: { type: 'string' },
      }
    };
  }
}
