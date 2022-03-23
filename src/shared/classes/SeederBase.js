/*============================ Rest ============================*/

module.exports = class SeederBase {

  /**
   * Create a new base seeder instance.
   * @param {object} model
   * @param {number} quantity
   */
  constructor(model, quantity = 1){

    this.model = model;
    this.insertions = 0;
    this.nonInsertions = 0;
    this.quantity = quantity;
  }

  /**
   * Execute seeding action.
   * @param {function} callback
   * @returns {Promise<void>}
   */
  async seed(callback){

    for(let i = 0; i < this.quantity; i++){

      try{

        const object = await callback(i);
        await new this.collection(object).save();
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
  notification(){

    console.info(
      '\x1b[44m\x1b[30m%s\x1b[0m \x1b[36m%s\x1b[0m %s \x1b[32m%s\x1b[0m %s \x1b[31m%s\x1b[0m',
      `${this.collection.collection.name.replace(/^\w/, (c) => c.toUpperCase())}:`,
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
  async randomObjectId(model){

    const count = await model.countDocuments();
    const random = Math.floor(Math.random() * count);
    const objectId = (await model.findOne().skip(random))._id;
    return objectId;
  }
};