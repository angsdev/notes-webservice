/*============================ Rest ============================*/

module.exports = class NoteType {

  /**
   * Create a new note type instance.
   * @param {{ _id?: string|number; name: string; description: string; }} data
   */
  constructor(data) {

    const { _id, name, description } = data;
    this._id = _id;
    this.name = name;
    this.description = description;
  }
};