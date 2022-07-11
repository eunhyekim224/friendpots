import fs from "fs";

type StorageItem = {
    id: string;
    [key: string]: string | number | boolean;
};

export class Store<T> {

    path;

    constructor(path: string) {
        this.path = path;
    }

    write(itemToStore: T): Promise<T> {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, "utf8", (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const allItems = JSON.parse(data);
                    allItems.push(itemToStore);

                    const allItemsJson = JSON.stringify(allItems);
                    fs.writeFileSync(this.path, allItemsJson);
                }
                resolve(itemToStore);
            });
        });
    }

    read(id: string): Promise<T> {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, "utf8", (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const allItems = JSON.parse(data);
                    const itemToRetrieve: T = allItems.find(
                        (item: StorageItem) => item.id === id
                    );
                    resolve(itemToRetrieve);
                }
            });
        });
    }
}
