/*============================ Rest ============================*/

module.exports = class UserRepository {

  /**
   * Create a new user repository instance.
   * @param {object} model
   */
  constructor(model){

    this.model = model;
  }

  /**
   * Get all documents and it total.
   * @param {{ where?: object; filter?: object; page?: number; per_page?: number; sort?: object; populate?: string|string[]|object[]; }} options
   * @returns {Promise<{ total: number; data: object[]; }>}
   */
  async getAll(options = {}){

    if(this.model.isMongo){

      const { page = 1, per_page = 15, where = {}, order = 'desc', populate = [], filter = {} } = options;
      let { sort_by = [] } = options;
      where.deleted_at = null;
      if(typeof(sort_by) === 'string'){

        sort_by = sort_by.split(',');
        sort_by = (sort_by[0]) ? sort_by.map(attr => [ attr, ((order === 'asc') ? 1 : -1) ]) : [];
        sort_by.unshift([ '_id', ((order === 'asc') ? 1 : -1) ]);
      }
      const [ total, data ] = await Promise.all([
        this.model.countDocuments(where),
        this.model.find(where, filter).skip((page - 1) * per_page).limit(per_page).sort(sort_by).populate(populate)
      ]);
      return { total, data };
    }
  }

  /**
   * Get one document.
   * @param {object} where
   * @param {{ filter?: object; populate?: string|string[]|object[]; }} options
   * @returns {Promise<object>}
   */
  async getBy(where, options = {}){

    if(this.model.isMongo){

      const { filter = {}, populate = [] } = options;
      const data = await this.model.findOne(where, filter).populate(populate);
      return data;
    }
  }

  /**
   * Create one or more documents.
   * @param {{ firstname: string; lastname: string; username: string, phone?: string; email: string; password?: string; access_token?: string; }|object[]} data
   * @returns {Promise<object|object[]>}
   */
  async create(data){

    if(this.model.isMongo){

      data = await ((Array.isArray(data)) ? this.model.insertMany(data)
                                          : this.model.create(data));
      return data;
    }
  }

  /**
   * Update one or more documents.
   * @param {object} where
   * @param {{ firstname?: string; lastname?: string; username?: string; phone?: string; email?: string; password?: string; }} toUpdate
   * @param {{ fields?: any[]; populate?: string|string[]|object[]; many?: boolean; }} options
   * @returns {Promise<object|object[]>}
   */
  async update(where, toUpdate, options = {}){

    if(this.model.isMongo){

      const { populate = [], many = false } = options;
      options = { timestamps: true, new: true, ...options };
      const data = await ((many) ? this.model.updateMany(where, toUpdate, options).populate(populate)
                                 : this.model.findOneAndUpdate(where, toUpdate, options).populate(populate));
     return data;
    }
  }

  /**
   * Delete one or more documents.
   * @param {object} where
   * @param {{ many?: boolean }} options
   * @returns {Promise<object|object[]>}
   */
  async delete(where, options = {}){

    if(this.model.isMongo){

      const { many = false } = options;
      const data = await ((many) ? this.model.deleteMany(where)
                                 : this.model.findOneAndDelete(where));
      return data;
    }
  }

  /**
   * Get all documents from a sub model and it total.
   * @param {object} where
   * @param {string} subName
   * @param {object} options
   * @returns {Promise<{ total: number; data: object[]; }>}
   */
  async getSubAll(where, subName, options = {}){

    if(this.model.isMongo){

      const { page = 1, per_page = 15, where: subWhere = {}, order = 'desc', populate = [], filter = {} } = options;
      let { sort_by = [] } = options;
      where.deleted_at = null;
      if(typeof(sort_by) === 'string'){

        sort_by = sort_by.split(',');
        sort_by = (sort_by[0]) ? sort_by.map(attr => [ attr, ((order === 'asc') ? 1 : -1) ]) : [];
        sort_by.unshift([ '_id', ((order === 'asc') ? 1 : -1) ]);
      }
      const main = await this.model.findOne(where).populate([{ path: subName, match: subWhere, select: filter, options: { sort: sort_by } }]);
      const total = main[subName].length;
      const data = main[subName].splice(((page - 1) * per_page), per_page);
      return { total, data };
    }
  }

   /**
    * Get one sub model document.
    * @param {object} where
    * @param {object} sub
    * @param {object} options
    * @returns {Promise<object>}
    */
  async getSubBy(where, sub, options = {}){

    if(this.model.isMongo){

      const { filter = [], populate = [] } = options;
      const [ subName, subWhere ] =  Object.entries(sub)[0];
      const main = await this.model.findOne(where).populate([{ path: subName, match: subWhere, select: filter, populate }]);
      const data = main[subName][0];
      return data;
    }
  }

   /**
    * Create one or more sub model documents.
    * @param {object} where
    * @param {object} subName
    * @param {object} data
    * @returns {Promise<object|object[]>}
    */
  async createSub(where, subName, data){

    if(this.model.isMongo){

      const main = await this.model.findOne(where).populate([{ path: subName }]);
      const sub = main[subName];
      (Array.isArray(data)) ? sub.push(...data) : sub.push(data);
      data = await ((Array.isArray(data)) ? Promise.all(sub.filter((subDoc, index) => (index < (sub.length - data.length)) ? null : subDoc.save()))
                                          : sub[sub.length - 1].save());
      await main.save();
      return data;
    }
  }

   /**
    * Update one or more sub model documents.
    * @param {object} where
    * @param {object} sub
    * @param {object} toUpdate
    * @param {object} options
    * @returns {Promise<object|object[]>}
    */
  async updateSub(where, sub, toUpdate, options = {}){

    if(this.model.isMongo){

      const { filter = [], populate = [] } = options;
      const [ subName, subWhere ] =  Object.entries(sub)[0];
      const main = await this.model.findOne(where).populate([{ path: subName, match: subWhere, select: filter, populate }]);
      sub = main[subName];
      const data = await ((Array.isArray(sub)) ? Promise.all(sub.map(subDoc => Object.assign(subDoc, toUpdate).save()))
                                               : Object.assign(sub, toUpdate).save());
      return (data.length > 1) ? data : data[0];
    }
  }

   /**
    * Delete one or more sub model documents.
    * @param {object} where
    * @param {object} sub
    * @param {object} options
    * @returns {Promise<object|object[]>}
    */
  async deleteSub(where, sub, options = {}){

    if(this.model.isMongo){

      const { filter = [], populate = [] } = options;
      const [ subName, subWhere ] = Object.entries(sub)[0];
      const firstId = Object.values(subWhere)[0];
      const main = await this.model.findOneAndUpdate(where, { $pull: { [subName]: firstId } }).populate([{ path: subName, match: subWhere, select: filter, populate }]);
      if(!main) return null;
      sub = main[subName];
      const data = (Array.isArray(sub)) ? await Promise.all(sub.map(subDoc => subDoc.delete()))
                                        : await sub.delete();
      return (data.length > 1) ? data : data[0];
    }
  }
};