import { CollectionObject } from './collection-object.model';

export interface Email extends CollectionObject {
  tempname: string;
  subject: string;
  text: string;
}
