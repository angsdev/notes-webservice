import * as bcrypt from 'bcryptjs';
import { utils } from '../../shared';

const { Jwt } = utils;

export class User {

  /**
   * Databaste identifier.
   */
  public /* readonly */ id?: any;

  /**
   * Firstname.
   */
  public /* readonly */ firstname: string;

  /**
   * Lastname.
   */
  public /* readonly */ lastname: string;

  /**
   * Username.
   */
  public /* readonly */ username: string;

  /**
   * Phone.
   */
  public /* readonly */ phone?: string;

  /**
   * Email.
   */
  public /* readonly */ email: string;

  /**
   * Flag to know if an email is verified.
   */
  public /* readonly */ emailVerifiedAt?: Date|null;

  /**
   * Password.
   */
  public /* readonly */ password?: string;

  /**
   * Remember token flag.
   */
  public /* readonly */ rememberToken?: string;

  /**
   * Access token.
   */
  public /* readonly */ accessToken?: string;

  /**
   * User notes.
   */
  public /* readonly */ notes: string[]|object[];

  /**
   * Soft delete timestamp.
   */
  public /* readonly */ deletedAt?: Date|null;

  /**
   * Create a new User instance.
   * @param {IUser} data
   */
  constructor(data: Partial<User>){

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

  // toObject(): Record<string, any> {

  //   return {
  //     uid: this.id,
  //     firstname: this.firstname,
  //     lastname: this.lastname,
  //     username: this.username,
  //     phone: this.phone,
  //     email: this.email,
  //     password: this.password,
  //     notes: this.notes,
  //     emailVerifiedAt: this.emailVerifiedAt,
  //     rememberToken: this.rememberToken,
  //     deletedAt: this.deletedAt
  //   };
  // }
}