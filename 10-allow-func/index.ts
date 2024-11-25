type TCallForAllowFunc = (a: number) => boolean

class User {
	@allowFunc((a: number) => a > 0)
	age: number = 30;
}

function allowFunc(call: TCallForAllowFunc) {
	return function (
		target: any,
		propertyKey: string,
	) {
		
		let value: number
		console.log('sadsa')
		const setter = function (a: number) {
			if (call(a)) {
				value ? value = value + a : value = a;
			} else {
				console.log(`Присваивание значения ${a} не произошло`);
			}
		}

		const getter = function () {
			return value;
		}

		Object.defineProperty(target, propertyKey, {
			set: setter,
			get: getter,
		})

	}
}

const user = new User();
user.age = 10;
user.age = 10;
user.age = 10;
user.age = -10;
console.log(user.age);