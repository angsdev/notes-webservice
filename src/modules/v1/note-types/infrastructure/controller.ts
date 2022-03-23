/*============================ Imports ============================*/
import service from '../application/service';
import { NextFunction, Request, Response } from 'express';
/*============================ Rest ============================*/

export default new class NoteTypeController {

  /**
   * Handle showing a resource collection.
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {Promise<object>}
   */
  async showAll(req: Request, res: Response, next: NextFunction){

    try{

      const { page = 1, per_page = 15, sort_by, order, ...where }: { [id: string]: any } = req.query;
      const noteTypes = await service.getAll({ page, per_page, where, sort_by, order });
      res.json({ success: true, content: noteTypes });
    } catch(err){ next(err); }
  }

  /**
   * Handle showing a resource.
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {Promise<object>}
   */
  async show(req: Request, res: Response, next: NextFunction){

    try{

      const { id } = req.params;
      const noteType = await service.getById(id);
      res.json({ success: true, content: noteType });
    } catch(err){ next(err); }
  }

  /**
   * Handle storing a resource.
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {Promise<object>}
   */
  async store(req: Request, res: Response, next: NextFunction){

    try{

      const noteTypeData = req.body;
      const noteType = await service.create(noteTypeData);
      res.status(201).json({ success: true, content: noteType });
    } catch(err){ next(err); }
  }

  /**
   * Handle updating a resource.
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {Promise<object>}
   */
  async update(req: Request, res: Response, next: NextFunction){

    try{

      const { params: { id }, body: noteTypeData } = req;
      const noteType = await service.update(id, noteTypeData);
      res.json({ success: true, content: noteType });
    } catch(err){ next(err); }
  }

  /**
   * Handle deleting a resource.
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {Promise<object>}
   */
  async destroy(req: Request, res: Response, next: NextFunction){

    try{

      const { id } = req.params;
      const noteType = await service.delete(id);
      res.json({ success: true, content: noteType });
    } catch(err){ next(err); }
  }
}