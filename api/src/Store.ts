import fs from "fs";

type StorageItem = {
    id: string;
    [key: string]: string | number | boolean;
};

export class Store {
    write<T>(path: string, itemToStore: T): Promise<T> {
        return new Promise((resolve, reject) => {
            fs.readFile(path, "utf8", (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const allItems = JSON.parse(data);
                    allItems.push(itemToStore);

                    const allItemsJson = JSON.stringify(allItems);
                    fs.writeFileSync(path, allItemsJson);
                }
                resolve(itemToStore);
            });
        });
    }

    read<T>(path: string, id: string): Promise<T> {
        return new Promise((resolve, reject) => {
            fs.readFile(path, "utf8", (err, data) => {
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
