/*============================ Imports ============================*/
import { classes } from '../../../../';
import { faker } from '@faker-js/faker';
import { v1 } from '../../../../../modules';
/*============================ Vars setup ============================*/
const { SeederBase } = classes;
const {
  notes: { persistence: { mongodb: { model } } },
  users: { persistence: { mongodb: { model: userModel } } },
  noteTypes: { persistence: { mongodb: { model: noteTypeModel } } }
} = v1;
/*============================ Rest ============================*/

export default class NotesSeeder extends SeederBase {

  /**
   * Create a new note seeder instance.
   * @param {number} quantity
   */
  constructor(quantity: number = 1){

    super(model, quantity);
  }

  /**
   * Execute the seeders.
   */
  async run(){

    this.seed(async () => ({
      user_id: await this.randomObjectId(userModel),
      type_id: await this.randomObjectId(noteTypeModel),
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph()
    }));
  }
}