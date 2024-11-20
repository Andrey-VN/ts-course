
interface IUsersResp extends IUsers { }

interface IUsers {
	users: IUsers[]
}

interface IUser {
	id: string
	firstName: string
	lastName: string
	maidenName: string
	age: number
	gender: Gender
	email: string
	phone: string
	username: string
	password: string
	birthDate: string
	image: string
	bloodGroup: BloodGroup
	height: number
	weight: number
	eyeColor: number
	hair: IHair
	ip: number
	address: IAddress
	macAddress: string
	university: string
	bank: IBank
	company: ICompany
	ein: string
	ssn: string
	userAgent: string
	crypto: ICrypto
	role: string
}

enum Gender {
	Male = 'male',
	Female = 'female'
}

enum BloodGroup {
	APositive = 'A+',
	ANegative = 'A-',
	BPositive = 'B+',
	BNegative = 'B-',
	OPositive = 'O+',
	ONegative = 'O-',
	ABPositive = 'AB+',
	ABNegative = 'AB-',
}

interface IHair {
	color: string
	type: string
}

interface IAddress {
	assress: string
	city: string
	statse: string
	stateCode: string
	postalCode: string
	coordinates: ICoordinates
	country: string
}

interface ICoordinates {
	lat: number
	lng: number
}

interface IBank {
	cardExpire: string
	cardNumber: string
	cardType: string
	currency: string
	iban: string
}

interface ICompany {
	department: string
	name: string
	title: string
	address: IAddress
}

interface ICrypto {
	coin: string
	wallet: string
	network: string
}

(async () => {
	try {
		const resp = await fetch('https://dummyjson.com/users');
		if (!resp.ok) {
			console.log(`Ошибка в ответе на запрос. Статус - ${resp.status}`)
			return;
		}

		const users: IUsersResp[] = await resp.json();
		if (!Array.isArray(users)) {
			console.log(`Данные в ответе не являются массивом - ${users}`);
			return;
		}

		const userNoObject = users.filter(u => typeof u !== 'object')
		if (userNoObject.length) {
			console.log(`Данные в массиве ответа не являются объектами - ${userNoObject}`);
			return;
		}




	} catch (e) {
		if (e instanceof Error) {
			console.log(`Ошибка запроса - ${e.message}`);
			return;
		}

		console.log(e);
	}

})()