import { CollectionObject } from './collection-object.model';

export interface Contact extends CollectionObject {
  firstname: string;
  lastname: string;
  email: string;
  list_id: string[];
}
