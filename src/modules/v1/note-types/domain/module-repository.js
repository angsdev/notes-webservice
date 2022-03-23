/*============================ Rest ============================*/

module.exports = class NoteTypeRepository {

  /**
   * Create a new note type repository instance.
   * @param {object} model
   */
  constructor(model){

    this.model = model;
  }

  /**
   * Get all documents and it total.
   * @param {{ where?: object; filter?: object; page?: number; per_page?: number; sort?: object; populate?: string|string[]|object[] }} options
   * @returns {Promise<{ total: number; data: object[] }>}
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
   * @param {{ filter?: object; populate?: string|string[]|object[] }} options
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
   * @param {{ name: string; description?: string; }} data
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
   * @param {{ name?: string; description?: string; }} toUpdate
   * @param {{ fields?: any[]; populate?: string|string[]|object[]; many?: boolean }} options
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
};