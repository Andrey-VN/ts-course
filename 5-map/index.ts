//interface IBacket {
//	hash: number
//	element: IBacketElement[]
//}

//interface IBacketElement {
//	key: any
//	value: any
//}

//class MapApp {
//	private table: IBacket[];
//	private sizeBacket: number;

//	constructor() {
//		this.table = [];
//		this.sizeBacket = 5;
//	}

//	add(key: any, value: any) {
//		const hash = this.hashFunction(key)
//		const elemTable = this.table.find(e => e.hash === hash);
//		if(elemTable?.element.some(e => e.key === key)) {
//			return false;
//		}

//		if (!elemTable) {
//			this.table.push({
//				hash,
//				element: [{ key, value }]
//			})

//			return true;
//		}

//		elemTable.element.push({ key, value });
//		return true;
//	}

//	delete(key: any): boolean {
//		const hash = this.hashFunction(key);
//		const elemTable = this.table.find(e => e.hash === hash);
//		if (!elemTable) {
//			return false;
//		}


//		const elementsBacketFilter = elemTable.element.filter(e => e.key !== key);
//		if (elementsBacketFilter.length === elemTable.element.length) {
//			return false;
//		}

//		elemTable.element = elementsBacketFilter;
//		return true;
//	}

//	get(key: any): IBacketElement | undefined {
//		const hash = this.hashFunction(key);
//		const elemTable = this.table.find(e => e.hash === hash);
//		if (!elemTable) {
//			return;
//		}
//		return elemTable.element.find(e => e.key === key)?.value;
//	}

//	clear() {
//		this.table = [];
//	}

//	private hashFunction(value: any) {
//		const valueString = JSON.stringify(value)
//		let hash = 0;
//		for (let i = 0; i < valueString.length; i++) {
//			hash = (hash + valueString.charCodeAt(i) * i) % this.sizeBacket;
//		}
//		return hash;
//	}
//}


//// Пример добавления данных
//let weatherMap = new MapApp();

//console.log(weatherMap.add('London', 20));
//console.log(weatherMap.add('Berlin', 25));
//console.log(weatherMap.add('Berl222in', 2225));
//console.log(weatherMap.add('Berl222i12321n', '221225'));
//console.log(weatherMap.add('London', 20));
////console.log(weatherMap.add('Berlin', 25));
////console.log(weatherMap.add('Berl222in', 2225));
////console.log(weatherMap.add('Berl222i12321n', '221225'));
////console.log(weatherMap.add('Londoqn', 20));
////console.log(weatherMap.add('Berlwin', 25));
////console.log(weatherMap.add('Berl222in', 2225));
////console.log(weatherMap.add('Berls222i12321n', '221225'));
////console.log(weatherMap.add('Lonssdon', 20));
////console.log(weatherMap.add('Berlin', 25));
////console.log(weatherMap.add('BerAl222in', 2225));
////console.log(weatherMap.add('BerlA222i12321n', '221225'));

//console.log('---')
//console.log(weatherMap)
//console.log(weatherMap.delete('Berl222i12321n'));
//console.log(weatherMap.delete('London'));
//console.log('---')
//// Пример получения данных
//console.log(weatherMap.get('London'));
//console.log(weatherMap.get('Berlin'));
//console.log(weatherMap.get('Berl222in'));
//console.log(weatherMap.get('Berl222i12321n'));
//console.log(weatherMap.get('London'));
////console.log(weatherMap.get('Berlin'));
////console.log(weatherMap.get('Berl222in'));
////console.log(weatherMap.get('Berl222i12321n'));
////console.log(weatherMap.get('Londoqn'));
////console.log(weatherMap.get('Berlwin'));
////console.log(weatherMap.get('Berl222in'));
////console.log(weatherMap.get('Berls222i12321n'));
////console.log(weatherMap.get('Lonssdon'));
////console.log(weatherMap.get('Berlin'));
////console.log(weatherMap.get('BerAl222in'));
////console.log(weatherMap.get('BerlA222i12321n'));




interface IBacket {
	hash: number
	element?: IBacketElement
}

interface IBacketElement {
	key: any
	value: any
	element?: IBacketElement
}

class MapApp {
	private table: IBacket[];
	private sizeBacket: number;

	constructor() {
		this.table = [];
		this.sizeBacket = 5;
	}

	add(key: any, value: any) : boolean {
		const hash = this.hashFunction(key)
		const elemTable = this.table.find(e => e.hash === hash);
		if (!elemTable) {
			this.table.push({
				hash,
				element: { key, value }
			})

			return true;
		} else if (!elemTable.element) {
			elemTable.element = { key, value }
			return true;
		}

		const elem = this.getElement(elemTable.element, key);
		if (elem.backetElement) {
			return false;
		}

		const newElement = elem.parentBacketElement?.element ?? elemTable.element;
		newElement.element = {
			key,
			value
		};

		return true;
	}

	delete(key: any): boolean {
		const hash = this.hashFunction(key);
		const elemTable = this.table.find(e => e.hash === hash);
		if (!elemTable || !elemTable.element) {
			return false;
		}

		const elem = this.getElement(elemTable.element, key);
		if (!elem.backetElement) {
			return false;
		}

		if (!elem.parentBacketElement) {
			elemTable.element = elem.backetElement.element
			return true;
		}

		elem.parentBacketElement.element = elem.backetElement.element;
		elem.backetElement = undefined;
		return true;
	}

	get(key: any): IBacketElement | undefined {
		const hash = this.hashFunction(key);
		const elemTable = this.table.find(e => e.hash === hash);
		if (!elemTable || !elemTable.element) {
			return;
		}

		return this.getElement(elemTable.element, key)?.backetElement?.value;
	}

	clear() {
		this.table = [];
	}

	private getElement(backetElement: IBacketElement, key: any, parentBacketElement?: IBacketElement): {
		backetElement?: IBacketElement,
		parentBacketElement?: IBacketElement
	} {
		if (backetElement.key !== key) {
			if (!backetElement.element) {
				return { backetElement: undefined, parentBacketElement };
			}
			return this.getElement(backetElement.element, key, backetElement)
		}

		return { backetElement, parentBacketElement };
	}

	private hashFunction(value: any) {
		const valueString = JSON.stringify(value)
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

console.log('---')
//console.log(weatherMap)
console.log(weatherMap.delete('Berl222i12321n'));
console.log(weatherMap.delete('London'));
console.log(weatherMap.delete('BerlA222i12321n'));
console.log(weatherMap.delete('London'));
weatherMap.clear()
console.log(weatherMap.add('BerlA222i12321n', '221225'));
console.log('---')
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

