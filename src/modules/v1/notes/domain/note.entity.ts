
export class Note {

  /**
   * Databaste identifier.
   */
  public id?: any;

  /**
   * User owner identifier.
   */
  public userId: any;

  /**
   * Type of note identifier.
   */
  public typeId: any;

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
  constructor(data: Partial<Note>){

    this.id = data.id;
    this.userId = data.userId;
    this.typeId = data.typeId;
    this.title = data.title;
    this.content = data.content;
  }

  // toObject(): Record<string, any> {

  //   return {
  //     id: this.id,
  //     userId: this.userId,
  //     typeId: this.typeId,
  //     title: this.title,
  //     content: this.content
  //   };
  // }
}