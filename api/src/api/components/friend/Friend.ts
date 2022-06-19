import { Store } from "../../../Store";

export class Friend {
    id;
    name;

    constructor(id: string, name?: string) {
        this.id = id;
        this.name = name;
    }
}
