import { Note } from './note.entity';
import { CollectionOptions, CollectionResult } from "../../shared";

export interface NoteRepository {

  /**
   * Get all documents and they total.
   * @param {CollectionOptions} options
   * @returns {Promise<CollectionResult<Note>>}
   */
  findAll(options?: CollectionOptions): Promise<CollectionResult<Note>>;

  /**
   * Get one document.
   * @param {string} id
   * @returns {Promise<Note | null>}
   */
  findById(id: string): Promise<Note | null>;

  /**
   * Create one or more documents. asdsad
   * @param {Partial<Note>} data
   * @returns {Promise<Note | null>}
   */
  create(data: Partial<Note>): Promise<Note | null>;

  /**
   * Update one or more documents.
   * @param {string} id
   * @param {Partial<Note>} toUpdate
   * @returns {Promise<Note | null>}
   */
  update(id: string, toUpdate: Partial<Note>): Promise<Note | null>;

  /**
   * Delete one or more documents.
   * @param {string} id
   * @returns {Promise<Note | null>}
   */
  delete(id: string): Promise<Note | null>;
}