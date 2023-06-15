import { NoteType } from "./note-type.entity";
import { CollectionOptions, CollectionResult } from "../../shared";

export interface NoteTypeRepository {

  /**
   * Get all documents and they total.
   * @param {CollectionOptions} options
   * @returns {Promise<CollectionResult<NoteType>>}
   */
  findAll(options?: CollectionOptions): Promise<CollectionResult<NoteType>>;

  /**
   * Get one document.
   * @param {string} id
   * @returns {Promise<NoteType>}
   */
  findById(id: string): Promise<NoteType | null>;

  /**
   * Create one or more documents. asdsad
   * @param {Partial<NoteType>} data
   * @returns {Promise<INoteType>}
   */
  create(data: Partial<NoteType>): Promise<NoteType | null>;

  /**
   * Update one or more documents.
   * @param {string} id
   * @param {Partial<NoteType>} toUpdate
   * @returns {Promise<NoteType>}
   */
  update(id: string, toUpdate: Partial<NoteType>): Promise<NoteType | null>;

  /**
   * Delete one or more documents.
   * @param {string} id
   * @returns {Promise<NoteType>}
   */
  delete(id: string): Promise<NoteType | null>;
}