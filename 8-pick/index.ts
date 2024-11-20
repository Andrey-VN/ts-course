const user = {
	name: 'Vasiliy',
	age: 8,
	skills: ['ts, js']
}

//type TPickObjectKeysOut<T, K extends keyof T> = {
//	[P in K]: T[P]
//}

function pickObjectKeys<T, K extends keyof T>(obj: T, keys: K[]) {
	return keys.reduce((a, c) => {
		a[c] = obj[c]
		return a;
	}, {} as { [P in typeof keys[number]]: T[P] })
}

console.log(pickObjectKeys(user, ['age', 'name']))