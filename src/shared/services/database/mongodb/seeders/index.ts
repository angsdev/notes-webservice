/*============================ Imports ============================*/
import 'dotenv/config';
import UsersSeeder from './users';
import NotesSeeder from './notes';
import NoteTypesSeeder from './note-types';
/*============================ Rest ============================*/

const seeders = [
  new UsersSeeder(5),
  new NoteTypesSeeder(5),
  new NotesSeeder(5)
];

seeders.forEach(async (seeder) => await seeder.run());