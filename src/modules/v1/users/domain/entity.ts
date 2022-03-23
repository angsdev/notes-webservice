/*============================ Imports ============================*/
import IUser from './ientity';
/*============================ Rest ============================*/

export default class User implements IUser {

  /**
   * Databaste identifier.
   */
  public _id?: string|number;

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
  public phone: string;

  /**
   * Email.
   */
  public email: string;

  /**
   * Password.
   */
  public password: string;

  /**
   * User notes.
   */
  public notes: string[]|object[];

  /**
   * User access token.
   */
  public access_token?: string;

  /**
   * Create a new user instance.
   * @param {{ _id?: string|number; firstname: string; lastname: string; username: string; phone?: string; email: string; password?: string; access_token?: string; }} data
   */
  constructor(data: IUser){

    const { _id, firstname, lastname, username, phone, email, password, access_token } = data;
    this._id = _id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.phone = phone;
    this.email = email;
    this.password = password;
    this.access_token = access_token;
  }
}