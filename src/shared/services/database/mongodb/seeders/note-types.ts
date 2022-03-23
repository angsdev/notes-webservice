/*============================ Imports ============================*/
import { classes } from '../../../../';
import { faker } from '@faker-js/faker';
import { v1 } from '../../../../../modules';
/*============================ Vars setup ============================*/
const { SeederBase } = classes;
const { model } = v1.noteTypes.persistence.mongodb;
/*============================ Rest ============================*/

export default class NoteTypesSeeder extends SeederBase {

  /**
   * Create a new note type seeder instance.
   * @param {number} quantity
   */
  constructor(quantity: number = 1){

    super(model, quantity);
  }

  /**
   * Execute the seeders.
   */
  async run(){

    this.seed(() => ({
      name: faker.lorem.word(),
      description: faker.lorem.text()
    }));
  }
}