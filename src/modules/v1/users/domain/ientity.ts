/*============================ Rest ============================*/

export default interface IUser {
  _id?: string|number;
  firstname?: string;
  lastname?: string;
  username?: string;
  phone?: string;
  email?: string;
  email_verified_at?: string;
  password?: string;
  notes?: string[]|object[];
  access_token?: string;
  updated_at?: string;
  created_at?: string;
  deleted_at?: string;
};