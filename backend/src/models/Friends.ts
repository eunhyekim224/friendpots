import { v4 } from "uuid";
import { Friend } from './Friend';

export class Friends {
  create(name: string) {
    return new Friend(v4(), name);
  }
}