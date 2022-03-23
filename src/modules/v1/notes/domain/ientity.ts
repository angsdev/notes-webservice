/*============================ Rest ============================*/

export default interface INote {
  _id?: string|number;
  user_id?: string|number;
  type_id?: string|number;
  title?: string;
  content?: string;
  updated_at?: string;
  created_at?: string;
};