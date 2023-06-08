import { INoteType } from './interfaces';

export default class NoteType implements INoteType {

  /**
   * Databaste identifier.
   **/
  public id?: string|number;

  /**
   *  Name of the title of note.
   **/
  public name: string;

  /**
   *  The description about this type of note.
   **/
  public description?: string;

  /**
   * Create a new note type instance.
   * @param {NoteType} data
   */
  constructor(data: NoteType) {

    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
  }

  toObject(): Record<string, any> {

    return {
      id: this.id,
      name: this.name,
      description: this.description
    };
  }
}