import { Document, Model } from 'mongoose';
import { UpdateResult, DeleteResult } from 'mongodb';
import { IUser, UserRepository, UserDocument } from '../../../domain/interfaces';
import { CanManageMany, CustomQueryOptions, TargetToSelect, CollectionOptions, CollectionResult } from '../../../../shared';
import MongoModel from './model';

export default class UserMongodbRepository implements UserRepository<IUser> {

  constructor(
    private model: Model<UserDocument> = MongoModel
  ){

  }

  async findAll(options: CollectionOptions = {}): Promise<CollectionResult<IUser>> {

    let { page = 1, perPage = 15, order = 'desc', sortBy = '', where = {}, populate = [], filter = [] } = options;
    let skip = (page - 1) * perPage;

    sortBy = ',_id,'.concat(sortBy).replace(/,+/g, (order === 'asc') ? ' -' : ' ').trim();
    where.deletedAt = null;

    const [ total, collection ] = await Promise.all([
      this.model.countDocuments(where),
      this.model.find(where, filter).skip(skip).limit(perPage).sort(sortBy).populate(populate)
    ]);

    return { total, collection };
  }

  async findBy(where: TargetToSelect, options: CustomQueryOptions = {}): Promise<IUser> {

    const { filter = [], populate = [] } = options;
    const document = await this.model.findOne(where, filter).populate(populate);
    return document.toObject();
  }

  async create(data: IUser|IUser[]): Promise<IUser|IUser[]> {

    const document = await this.model[(Array.isArray(data)) ? 'insertMany' : 'create'](data);
    return document;
  }

  async update(where: TargetToSelect, toUpdate: IUser, options: CustomQueryOptions = {}): Promise<IUser|IUser[]|UpdateResult> {

    const { populate = [], many = false } = options;
    options = { timestamps: true, new: true, ...options };

    const document = await this.model[(many) ? 'updateMany' : 'findOneAndUpdate'](where, toUpdate, options);
    return document;
  }

  async delete(where: TargetToSelect, options: CanManageMany = {}): Promise<IUser|IUser[]|DeleteResult> {

    const { many = false } = options;
    const document = await this.model[(many) ? 'deleteMany' : 'findOneAndDelete'](where);
    return document;
  }

  /**
   * Get all documents from a sub model and it total.
   * @param {TargetToSelect} where
   * @param {string} subResourceName
   * @param {CollectionOptions} options
   * @returns {Promise<MongoNoteCollectionResult>}
   */
  async findSubAll(where: TargetToSelect, subResourceName: string, options: CollectionOptions = {}): Promise<CollectionResult<Document>> {

    let { page = 1, perPage = 15, order = 'desc', sortBy = '', where: subWhere = {}, populate = [], filter = [] } = options;
    let skip = (page - 1) * perPage;

    sortBy = `,_id,${sortBy}`.replace(/,+$/, '').replace(/,+/g, (order === 'asc') ? ' -' : ' ').trim();

    let populationOptions = { path: subResourceName, match: subWhere, select: filter, options: { sort: sortBy } };
    where.deletedAt = null;

    const main = <Document & TargetToSelect> await this.model.findOne(where).populate(populationOptions);
    const sub = (<Document[]>main[subResourceName]);
    const total = sub.length;
    const collection = sub.splice(skip, perPage);

    return { total, collection };
  }

  /**
    * Get one sub model document.
    * @param {TargetToSelect} where
    * @param {TargetToSelect} subResource
    * @param {CustomQueryOptions} options
    * @returns {Promise<IMongoNote|IMongoNote[]>}
    */
  async findSubBy(where: TargetToSelect, subResource: TargetToSelect, options: CustomQueryOptions = {}): Promise<Document|Document[]> {

    const { filter = {}, populate = [] } = options;
    const { subResourceName, subWhere } = subResource;
    let populationOptions = { path: subResourceName, match: subWhere, select: filter, populate };

    const main = <Document & TargetToSelect> await this.model.findOne(where).populate(populationOptions);
    const document = (Array.isArray(main[subResourceName])) ? main[subResourceName].shift() : main[subResourceName];
    return document;
  }

  /**
    * Create one or more sub model documents.
    * @param {TargetToSelect} where
    * @param {string} subResourceName
    * @param {object|object[]} data
    * @returns {Promise<Document|Document[]>}
    */
  async createSub(where: TargetToSelect, subResourceName: string, data: object|object[]): Promise<Document|Document[]> {

    const main = <Document & TargetToSelect> await this.model.findOne(where).populate(subResourceName);
    const sub = <Document[]>main[subResourceName];
    let document;

    if(Array.isArray(data)){

      sub.push(...data);
      document = sub.filter((subDoc, index) => (index < (sub.length - data.length)) || subDoc.save())
    }
    else {

      sub.push(<Document>data);
      document = sub[sub.length - 1].save();
    }

    await main.save();
    return document;
  }

   /**
    * Update one or more sub model documents.
    * @param {TargetToSelect} where
    * @param {TargetToSelect} subResource
    * @param {object|object[]} toUpdate
    * @param {CustomQueryOptions} options
    * @returns {Promise<Document|Document[]>}
    */
  async updateSub(where: TargetToSelect, subResource: TargetToSelect, toUpdate: object|object[], options: CustomQueryOptions = {}): Promise<Document|Document[]> {

    const { filter = [], populate = [] } = options;
    const { subName, subWhere } =  subResource;
    let populationOptions = { path: subName, match: subWhere, select: filter, populate };

    const main = <Document & TargetToSelect> await this.model.findOne(where).populate(populationOptions);
    const sub = <Document[]>main[subName];

    const document = await ((Array.isArray(sub))
                           ? Promise.all(sub.map(subDoc => Object.assign(subDoc, toUpdate).save()))
                           : (<Document>Object.assign(sub, toUpdate)).save());
    return document;
  }

  /**
    * Delete one or more sub model documents.
    * @param {TargetToSelect} where
    * @param {TargetToSelect} subResource
    * @param {CustomQueryOptions} options
    * @returns {Promise<Document|Document[]> }
    */
  async deleteSub(where: TargetToSelect, subResource: TargetToSelect, options: CustomQueryOptions = {}): Promise<Document|Document[]> {

    const { filter = [], populate = [] } = options;
    const { subName, subWhere } =  subResource;
    let populationOptions = { path: subName, match: subWhere, select: filter, populate };

    const firstId = Object.values(subWhere)[0];
    const main = <Document & TargetToSelect> await this.model.findOneAndUpdate(where, { $pull: { [subName]: firstId } }).populate(populationOptions);

    if(!main) return null;

    const sub = <Document|Document[]>main[subName];
    const document = await ((Array.isArray(sub)) ? Promise.all(sub.map(subDoc => subDoc.delete()))
                                                 : sub.delete());
    return document;
  }
}