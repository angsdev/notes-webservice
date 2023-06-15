import { NextFunction, Request, Response } from 'express';
import { AuthRequest, CollectionRequestParams } from '../../shared';
import { NoteService } from '../application';

export class NoteController {

  constructor(
    private service: NoteService
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
  async getAll(req: Request, res: Response, next: NextFunction): Promise<Response> {

    try {

      const { page, perPage, order, sortBy, ...where }: CollectionRequestParams = req.query;

      const notes = await this.service.getAll({ page, perPage, order, sortBy, where });
      return res.json({ success: true, content: notes });

    } catch(err){ next(err); }
  }

  /**
   * Handle showing a resource.
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  async get(req: Request, res: Response, next: NextFunction): Promise<Response> {

    try {

      const { id } = req.params;

      const note = await this.service.getById(id);
      return res.json({ success: true, content: note });

    } catch(err){ next(err); }
  }

  /**
   * Handle storing a resource.
   * @param {AuthRequest} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  async store(req: AuthRequest, res: Response, next: NextFunction): Promise<Response> {

    try {

      const noteData = { user_id: req.user.id, ...req.body };

      const note = await this.service.create(noteData);
      return res.status(201).json({ success: true, content: note });

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

    try {

      const { params: { id }, body: noteData } = req;

      const note = await this.service.update(id, noteData);
      return res.json({ success: true, content: note });

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

    try {

      const { id } = req.params;

      const note = await this.service.delete(id);
      return res.json({ success: true, content: note });

    } catch(err){ next(err); }
  }
}