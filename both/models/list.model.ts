import { CollectionObject } from './collection-object.model';

export interface List extends CollectionObject {
  name: string;
  description: string;
}
