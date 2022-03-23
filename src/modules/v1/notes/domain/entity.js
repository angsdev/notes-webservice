/*============================ Rest ============================*/

module.exports = class Note {

  /**
   * Create a new note instance.
   * @param {{ _id?: string|number; user_id: string|number; type_id: string|number; title: string; content: string; }} data
   */
  constructor(data){

    const { _id, user_id, type_id, title, content } = data;
    this._id = _id;
    this.user_id = user_id;
    this.type_id = type_id;
    this.title = title;
    this.content = content;
  }
};