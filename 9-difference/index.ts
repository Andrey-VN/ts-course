interface IA {
	a: number
	b: string
	f: boolean
}

interface IB {
	a: number
	c: boolean
}

interface IDifference {
	b: string
}

const a: IA = { a: 5, b: '', f: false }
const b: IB = { a: 10, c: true }

//type TSubsetBA = Pick<IA, Extract<Exclude<keyof IA, keyof IB>, string>>

type TSubset<T, U> = Pick<T, Exclude<keyof T, keyof U>>
function difference<T extends object, U extends object, K extends keyof T>(a: T, b: U): TSubset<T, U> {
	


	return Object.keys(a).reduce((acc : any, curr) => {
		if (curr in b) {
			return acc;
		}

		if(curr in a) {
			const key  = curr as K
			acc[curr] = a[key];
		}

		return acc;
	}, {} as TSubset<T, U>) 
}

console.log(difference(a, b))

