"use strict";
//interface IBacket {
//	hash: number
//	element: IBacketElement[]
//}
class MapApp {
    constructor() {
        this.table = [];
        this.sizeBacket = 5;
    }
    add(key, value) {
        var _a, _b;
        const hash = this.hashFunction(key);
        const elemTable = this.table.find(e => e.hash === hash);
        if (!elemTable) {
            this.table.push({
                hash,
                element: { key, value }
            });
            return true;
        }
        else if (!elemTable.element) {
            elemTable.element = { key, value };
            return true;
        }
        const elem = this.getElement(elemTable.element, key);
        if (elem === null || elem === void 0 ? void 0 : elem.backetElement) {
            return false;
        }
        //console.log('elem', elem)
        const newElement = (_b = (_a = elem.parentBacketElement) === null || _a === void 0 ? void 0 : _a.element) !== null && _b !== void 0 ? _b : elemTable.element;
        newElement.element = {
            key,
            value
        };
        return true;
    }
    delete(key) {
        const hash = this.hashFunction(key);
        const elemTable = this.table.find(e => e.hash === hash);
        if (!elemTable || !elemTable.element) {
            return false;
        }
        const elem = this.getElement(elemTable.element, key);
        if (!(elem === null || elem === void 0 ? void 0 : elem.backetElement)) {
            return false;
        }
        if (!elem.parentBacketElement) {
            elemTable.element = elem.backetElement.element;
            return true;
        }
        elem.parentBacketElement.element = elem.backetElement.element;
        elem.backetElement = undefined;
        return true;
    }
    get(key) {
        var _a, _b;
        const hash = this.hashFunction(key);
        const elemTable = this.table.find(e => e.hash === hash);
        //console.log(elemTable)
        if (!elemTable || !elemTable.element) {
            return;
        }
        return (_b = (_a = this.getElement(elemTable.element, key)) === null || _a === void 0 ? void 0 : _a.backetElement) === null || _b === void 0 ? void 0 : _b.value;
    }
    getElement(backetElement, key, parentBacketElement) {
        if (backetElement.key !== key) {
            if (!backetElement.element) {
                return { backetElement: undefined, parentBacketElement };
            }
            return this.getElement(backetElement.element, key, backetElement);
        }
        return { backetElement, parentBacketElement };
    }
    clear() {
        this.table = [];
    }
    hashFunction(value) {
        const valueString = JSON.stringify(value);
        let hash = 0;
        for (let i = 0; i < valueString.length; i++) {
            hash = (hash + valueString.charCodeAt(i) * i) % this.sizeBacket;
        }
        return hash;
    }
}
// Пример добавления данных
const weatherMap = new MapApp();
console.log(weatherMap.add('London', 20));
console.log(weatherMap.add('Berlin', 25));
console.log(weatherMap.add('Berl222in', 2225));
console.log(weatherMap.add('Berl222i12321n', '221225'));
console.log(weatherMap.add('London2', 202));
console.log(weatherMap.add('Berlin', 25));
console.log(weatherMap.add('Berl222in', 2225));
console.log(weatherMap.add('Berl222i12321n', '221225'));
console.log(weatherMap.add('Londoqn', 20));
console.log(weatherMap.add('Berlwin', 25));
console.log(weatherMap.add('Berl222in', 2225));
console.log(weatherMap.add('Berls222i12321n', '221225'));
console.log(weatherMap.add('Lonssdon', 20));
console.log(weatherMap.add('Berlin', 25));
console.log(weatherMap.add('BerAl222in', 2225));
console.log(weatherMap.add('BerlA222i12321n', '221225'));
console.log('---');
//console.log(weatherMap)
console.log(weatherMap.delete('Berl222i12321n'));
console.log(weatherMap.delete('London'));
console.log(weatherMap.delete('BerlA222i12321n'));
console.log(weatherMap.delete('London'));
weatherMap.clear();
console.log(weatherMap.add('BerlA222i12321n', '221225'));
console.log('---');
//// Пример получения данных
console.log(weatherMap.get('London'));
console.log(weatherMap.get('Berlin'));
console.log(weatherMap.get('Berl222in'));
console.log(weatherMap.get('Berl222i12321n'));
console.log(weatherMap.get('London2'));
console.log(weatherMap.get('Berlin'));
console.log(weatherMap.get('Berl222in'));
console.log(weatherMap.get('Berl222i12321n'));
console.log(weatherMap.get('Londoqn'));
console.log(weatherMap.get('Berlwin'));
console.log(weatherMap.get('Berl222in'));
console.log(weatherMap.get('Berls222i12321n'));
console.log(weatherMap.get('Lonssdon'));
console.log(weatherMap.get('Berlin'));
console.log(weatherMap.get('BerAl222in'));
console.log(weatherMap.get('BerlA222i12321n'));
