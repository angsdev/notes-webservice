import { NextFunction, Request, Response } from 'express';
import { CollectionRequestParams } from '../../shared';
import { UserService } from '../application';

export class UserController {

  constructor(
    private readonly service: UserService
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

      const users = await this.service.getAll({ page, perPage, order, sortBy, where });
      return res.json({ success: true, content: users });

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

      const user = await this.service.getByIndex(id);
      return res.json({ success: true, content: user });

    } catch(err){ next(err); }
  }

  /**
   * Handle storing a resource.
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  async store(req: Request, res: Response, next: NextFunction): Promise<Response>{

    try {

      const userData = req.body;

      const user = await this.service.create(userData);
      return res.status(201).json({ success: true, content: user });

    } catch(err){ next(err); }
  }

  /**
   * Handle updating a resource.
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  async update(req: Request, res: Response, next: NextFunction): Promise<Response>{

    try {

      const { params: { id }, body: userData } = req;

      const user = await this.service.update(id, userData);
      return res.json({ success: true, content: user });

    } catch(err){ next(err); }
  }

  /**
   * Handle deleting a resource.
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  async destroy(req: Request, res: Response, next: NextFunction): Promise<Response>{

    try {

      const { id } = req.params;

      const user = await this.service.delete(id);
      return res.json({ success: true, content: user });

    } catch(err){ next(err); }
  }

  /**
   * Handle showing a sub-resource collection.
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  async getAllNotes(req: Request, res: Response, next: NextFunction): Promise<Response>{

    try {

      const { params: { id } } = req;
      const { page, perPage, order, sortBy, ...where }: CollectionRequestParams = req.query;

      const notes = await this.service.getAllNotes(id, { page, perPage, where, sortBy, order });
      return res.json({ success: true, content: notes });

    } catch(err){ next(err); }
  }

  /**
   * Handle showing a sub-resource.
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  async getNote(req: Request, res: Response, next: NextFunction): Promise<Response>{

    try {

      const { id, noteId } = req.params;

      const note = await this.service.getNote(id, noteId);
      return res.json({ success: true, content: note });

    } catch(err){ next(err); }
  }

  /**
   * Handle storing a sub-resource.
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  async storeNote(req: Request, res: Response, next: NextFunction): Promise<Response>{

    try {

      const { params: { id }, body: userData } = req;

      const note = await this.service.createNote(id, userData);
      return res.json({ success: true, content: note });

    } catch(err){ next(err); }
  }

  /**
   * Handle updating a sub-resource.
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  async updateNote(req: Request, res: Response, next: NextFunction): Promise<Response>{

    try {

      const { params: { id, noteId }, body: userData } = req;

      const note = await this.service.updateNote(id, noteId, userData);
      return res.json({ success: true, content: note });

    } catch(err){ next(err); }
  }

  /**
   * Handle deleting a sub-resource.
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  async destroyNote(req: Request, res: Response, next: NextFunction): Promise<Response>{

    try {

      const { id, noteId } = req.params;

      const note = await this.service.deleteNote(id, noteId);
      return res.json({ success: true, content: note });

    } catch(err){ next(err); }
  }
}