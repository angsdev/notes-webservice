/*============================ Rest ============================*/

module.exports = class User {

  /**
   * Create a new user instance.
   * @param {{ _id?: string|number; firstname: string; lastname: string; username: string; phone?: string; email: string; password?: string; access_token?: string; }} data
   */
  constructor(data){

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
};