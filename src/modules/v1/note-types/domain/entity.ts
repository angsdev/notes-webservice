/*============================ Imports ============================*/
import INoteType from './ientity';
/*============================ Rest ============================*/

export default class NoteType implements INoteType {

  public _id?: string|number;
  public name?: string;
  public description?: string;

  /**
   * Create a new note type instance.
   * @param {{ _id?: string|number; name: string; description: string; }} data
   */
  constructor(data: INoteType) {

    const { _id, name, description } = data;
    this._id = _id;
    this.name = name;
    this.description = description;
  }
}