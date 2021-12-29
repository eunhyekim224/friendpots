import { Friend } from './Friend';
import { v4 } from 'uuid';

export class Friends {
    create(name: string) {
        return new Friend(v4(), name);
    }
}
