/*============================ Imports ============================*/
require('dotenv/config');
/*============================ Imports ============================*/
const UsersSeeder = require('./users');
const NotesSeeder = require('./notes');
const NoteTypesSeeder = require('./note-types');
/*============================ Rest ============================*/

const seeders = [
  new UsersSeeder(5),
  new NoteTypesSeeder(5),
  new NotesSeeder(5)
];

seeders.forEach(async (seeder) => await seeder.run());