import { INote } from "./interfaces";

export default class Note implements Partial<INote> {

  /**
   * Databaste identifier.
   */
  public id: string|number;

  /**
   * User owner identifier.
   */
  public userId: string|number;

  /**
   * Type of note identifier.
   */
  public typeId: string|number;

  /**
   * Databaste identifier.
   */
  public title: string;

  /**
   * Note's content.
   */
  public content?: string;

  /**
   * Create a new note instance.
   * @param {Note} data
   */
  constructor(data: Note){

    this.id = data.id;
    this.userId = data.userId;
    this.typeId = data.typeId;
    this.title = data.title;
    this.content = data.content;
  }

  toObject(): Record<string, any> {

    return {
      id: this.id,
      userId: this.userId,
      typeId: this.typeId,
      title: this.title,
      content: this.content
    };
  }
}