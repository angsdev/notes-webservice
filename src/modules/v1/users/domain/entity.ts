import * as bcrypt from 'bcryptjs';
import { utils } from '../../shared';
import { IUser } from './interfaces';

const { Jwt } = utils;

export default class User implements Partial<IUser> {

  /**
   * Databaste identifier.
   */
  public id?: string|number;

  /**
   * Firstname.
   */
  public firstname: string;

  /**
   * Lastname.
   */
  public lastname: string;

  /**
   * Username.
   */
  public username: string;

  /**
   * Phone.
   */
  public phone?: string;

  /**
   * Email.
   */
  public email: string;

  /**
   * Flag to know if an email is verified.
   */
  public emailVerifiedAt?: Date|null;

  /**
   * Password.
   */
  public password?: string;

  /**
   * Remember token flag.
   */
  public rememberToken?: string;

  /**
   * Access token.
   */
  public accessToken?: string;

  /**
   * User notes.
   */
  public notes: string[]|object[];

  /**
   * Soft delete timestamp.
   */
  public deletedAt?: Date|null;

  /**
   * Create a new User instance.
   * @param {IUser} data
   */
  constructor(data: User){

    this.id = data.id;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.username = data.username;
    this.phone = data.phone;
    this.email = data.email;
    this.password = data.password;
    this.notes = [];
    this.emailVerifiedAt = data.emailVerifiedAt;
    this.rememberToken = data.rememberToken;
    this.deletedAt = data.deletedAt;
  }

  async hashPassword(saltRounds?: number): Promise<void> {

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  }

  async isPasswordValid(password: string){

    bcrypt.compare(password, this.password);
  }

  async generateAccessToken(){

    this.accessToken = await Jwt.generate({ id: this.id });
  }

  toObject(): Record<string, any> {

    return {
      uid: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      username: this.username,
      phone: this.phone,
      email: this.email,
      password: this.password,
      notes: this.notes,
      emailVerifiedAt: this.emailVerifiedAt,
      rememberToken: this.rememberToken,
      deletedAt: this.deletedAt
    };
  }
}