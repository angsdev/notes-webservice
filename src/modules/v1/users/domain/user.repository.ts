import { User } from './user.entity';
import { Note } from '../../notes/domain/note.entity';
import { CollectionOptions, CollectionResult } from "../../shared";

export interface UserRepository {

  /**
   * Get all documents and they total.
   * @param {CollectionOptions} options
   * @returns {Promise<CollectionResult<User>>}
   */
  findAll(options?: CollectionOptions): Promise<CollectionResult<User>>;

  /**
   * Get one document.
   * @param {string} index
   * @returns {Promise<User | null>}
   */
  findByIndex(index: string): Promise<User | null>;

  /**
   * Create one or more documents. asdsad
   * @param {Partial<User>} data
   * @returns {Promise<User | null>}
   */
  create(data: Partial<User>): Promise<User | null>;

  /**
   * Update one or more documents.
   * @param {string} index
   * @param {Partial<User>} toUpdate
   * @returns {Promise<User | UpdateResult | null>}
   */
  update(index: string, toUpdate: Partial<User>): Promise<User | null>;

  /**
   * Delete one or more documents.
   * @param {string} index
   * @returns {Promise<User | DeleteResult | null>}
   */
  delete(index: string): Promise<User | null>;

  /**
   * Get all documents from a sub model and it total.
   * @param {string} index
   * @param {CollectionOptions} options
   * @returns {Promise<CollectionResult<Note>>}
   */
  findAllNotes(index: string, options: CollectionOptions): Promise<CollectionResult<Note>>;

  /**
    * Get one sub model document.
    * @param {string} index
    * @param {string} noteId
    * @returns {Promise<Note | null>}
    */
  findNoteById(index: string, noteId: string): Promise<Note | null>;

  /**
    * Create one or more sub model documents.
    * @param {string} index
    * @param {Partial<Note>} data
    * @returns {Promise<Note | null>}
    */
  createNote(index: string, data: Partial<Note>): Promise<Note | null>;

  /**
    * Update one or more sub model documents.
    * @param {string} index
    * @param {string} noteId
    * @param {Partial<Note>} toUpdate
    * @returns {Promise<Note | UpdateResult | null>}
    */
  updateNote(index: string, noteId: string, toUpdate: Partial<Note>): Promise<Note | null>;

  /**
    * Delete one or more sub model documents.
    * @param {string} index
    * @param {string} noteId
    * @returns {Promise<Note | DeleteResult | null>}
    */
  deleteNote(index: string, noteId: string): Promise<Note | null>;
}
