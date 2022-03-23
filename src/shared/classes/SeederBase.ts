/*============================ Imports ============================*/
import { Model } from "mongoose";
/*============================ Rest ============================*/

export default class SeederBase {

  public model: Model<any>;
  public quantity: number = 1;
  public nonInsertions: number = 0;
  public insertions: number = 0;

  /**
   * Create a new base seeder instance.
   * @param {object} model
   * @param {number} quantity
   */
  constructor(model: Model<any>, quantity: number = 1){

    this.model = model;
    this.quantity = quantity;
  }

  /**
   * Execute seeding action.
   * @param {function} callback
   * @returns {Promise<void>}
   */
  public async seed(callback: Function): Promise<void> {

    for(let i = 0; i < this.quantity; i++){

      try{

        const object = await callback(i);
        await new this.model(object).save();
        this.insertions++;
      } catch(err){

        this.nonInsertions++;
        continue;
      }
    }
    this.notification();
  }

  /**
   * Send a notification through console.
   * @returns {void}
   */
  private notification(): void {

    console.info(
      '\x1b[44m\x1b[30m%s\x1b[0m \x1b[36m%s\x1b[0m %s \x1b[32m%s\x1b[0m %s \x1b[31m%s\x1b[0m',
      `${this.model.collection.name.replace(/^\w/, (c) => c.toUpperCase())}:`,
      `${this.quantity} insertions performed`, ' - ',
      `${this.insertions} successfully`, ' - ',
      `${this.nonInsertions} omitted.`
    );
  }

  /**
   * Get an existent object id from a collection.
   * @param {object} model
   * @returns {Promise<string>}
   */
  public async randomObjectId(model: Model<any>): Promise<string> {

    const count = await model.countDocuments();
    const random = Math.floor(Math.random() * count);
    const objectId = (await model.findOne().skip(random))._id;
    return objectId;
  }
}