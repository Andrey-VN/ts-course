type stringOrNumber = string | number;

function swapKeyValue<T extends stringOrNumber, V extends stringOrNumber>(obj : Record<T, V>): Record<V, T> {
	const massOut: Record<V, T> = {} as Record<V, T>
	for(const key in obj) {
		massOut[obj[key]] = key;
	}

	return massOut;
}

const massOut: Record<stringOrNumber, stringOrNumber> = {
	1 : '2',
	2 : '3'
}
console.log(massOut);
console.log(swapKeyValue(massOut));