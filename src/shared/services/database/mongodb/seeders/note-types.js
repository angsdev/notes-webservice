/*============================ Imports ============================*/
const { faker } = require('@faker-js/faker');
/*============================ Imports ============================*/
const { SeederBase } = require('../../../../').classes;
const { model } = require('../../../../../modules').v1.noteTypes;
/*============================ Rest ============================*/

module.exports = class NoteTypesSeeder extends SeederBase {

  /**
   * Create a new note type seeder instance.
   * @param {number} quantity
   */
  constructor(quantity = 1){

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
};