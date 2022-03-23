/*============================ Imports ============================*/
const service = require('../application/service');
/*============================ Rest ============================*/

module.exports = new class UserController {

  /**
   * Handle showing a resource collection.
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {Promise<object>}
   */
  async showAll(req, res, next){

    try{

      const { page = 1, per_page = 15, sort_by, order, ...where } = req.query;
      const users = await service.getAll({ page, per_page, where, sort_by, order });
      res.json({ success: true, content: users });
    } catch(err){ next(err); }
  }

  /**
   * Handle showing a resource.
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {Promise<object>}
   */
  async show(req, res, next){

    try{

      const { id } = req.params;
      const user = await service.getByAnyOf(id);
      res.json({ success: true, content: user });
    } catch(err){ next(err); }
  }

  /**
   * Handle storing a resource.
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {Promise<object>}
   */
  async store(req, res, next){

    try{

      const userData = req.body;
      const user = await service.create(userData);
      res.status(201).json({ success: true, content: user });
    } catch(err){ next(err); }
  }

  /**
   * Handle updating a resource.
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {Promise<object>}
   */
  async update(req, res, next){

    try{

      const { params: { id }, body: userData } = req;
      const user = await service.update(id, userData);
      res.json({ success: true, content: user });
    } catch(err){ next(err); }
  }

  /**
   * Handle deleting a resource.
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {Promise<object>}
   */
  async destroy(req, res, next){

    try{

      const { id } = req.params;
      const user = await service.delete(id);
      res.json({ success: true, content: user });
    } catch(err){ next(err); }
  }

  /**
   * Handle showing a sub-resource collection.
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {Promise<object>}
   */
  async showAllNotes(req, res, next){

    try{

      const { params: { id }, query: { page = 1, per_page = 15, sort_by, order, ...where } } = req;
      const notes = await service.getAllNotes(id, { page, per_page, where, sort_by, order });
      res.json({ success: true, content: notes });
    } catch(err){ next(err); }
  }

  /**
   * Handle showing a sub-resource.
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {Promise<object>}
   */
  async showNote(req, res, next){

    try{

      const { id, nid } = req.params;
      const note = await service.getNote(id, nid);
      res.json({ success: true, content: note });
    } catch(err){ next(err); }
  }

  /**
   * Handle storing a sub-resource.
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {Promise<object>}
   */
  async storeNote(req, res, next){

    try{

      const { params: { id }, body: userData } = req;
      const note = await service.createNote(id, userData);
      res.json({ success: true, content: note });
    } catch(err){ next(err); }
  }

  /**
   * Handle updating a sub-resource.
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {Promise<object>}
   */
  async updateNote(req, res, next){

    try{

      const { params: { id, nid }, body: userData } = req;
      const note = await service.updateNote(id, nid, userData);
      res.json({ success: true, content: note });
    } catch(err){ next(err); }
  }

  /**
   * Handle deleting a sub-resource.
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {Promise<object>}
   */
  async destroyNote(req, res, next){

    try{

      const { id, nid } = req.params;
      const note = await service.deleteNote(id, nid);
      res.json({ success: true, content: note });
    } catch(err){ next(err); }
  }
};