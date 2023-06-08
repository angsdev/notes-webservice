import { NextFunction, Request, Response } from 'express';
import { CollectionRequestParams } from '../../../../shared/types';
import NoteTypeService from '../application/service';
import service from '../application/service';

export default class NoteTypeController {

  constructor(
    private service: NoteTypeService
  ){

    this.service = service;
  }

  /**
   * Handle showing a resource collection.
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  async showAll(req: Request, res: Response, next: NextFunction): Promise<Response> {

    try{

      const { page, perPage, order, sortBy, ...where }: CollectionRequestParams = req.query;
      const noteTypes = await this.service.getAll({ page, perPage, order, sortBy, where });
      return res.json({ success: true, content: noteTypes });

    } catch(err){ next(err); }
  }

  /**
   * Handle showing a resource.
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  async show(req: Request, res: Response, next: NextFunction): Promise<Response> {

    try{

      const { id } = req.params;
      const noteType = await this.service.getById(id);
      return res.json({ success: true, content: noteType });

    } catch(err){ next(err); }
  }

  /**
   * Handle storing a resource.
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  async store(req: Request, res: Response, next: NextFunction): Promise<Response> {

    try{

      const noteTypeData = req.body;
      const noteType = await this.service.create(noteTypeData);
      return res.status(201).json({ success: true, content: noteType });

    } catch(err){ next(err); }
  }

  /**
   * Handle updating a resource.
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  async update(req: Request, res: Response, next: NextFunction): Promise<Response> {

    try{

      const { params: { id }, body: noteTypeData } = req;
      const noteType = await this.service.update(id, noteTypeData);
      return res.json({ success: true, content: noteType });

    } catch(err){ next(err); }
  }

  /**
   * Handle deleting a resource.
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  async destroy(req: Request, res: Response, next: NextFunction): Promise<Response> {

    try{

      const { id } = req.params;
      const noteType = await this.service.delete(id);
      return res.json({ success: true, content: noteType });

    } catch(err){ next(err); }
  }
}