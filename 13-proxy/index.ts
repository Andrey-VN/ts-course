const URLS = ['http1', 'http2', 'http3', 'https://dummyjson.com/products/1'];

enum RequestType {
	POST = 'post',
	GET = 'get'
}

interface IBody {
	date: any
}

interface IRequestDate {
	url: string
	requestType: RequestType
	headers: HeadersInit
	body?: IBody
}

class BuilderRequest {
	private requestTypes: RequestType[] = []
	private headersArray: HeadersInit[] = [];
	private bodys: IBody[] = [];
	private urls: string[] = [];

	addRequestType(requestType: RequestType) {
		if (this.requestTypes.some(t => t === requestType)) {
			return this;
		}
		this.requestTypes.push(requestType)
		return this
	}

	addUrl(url: string) {
		if (this.urls.some(u => u === url)) {
			return this;
		}
		this.urls.push(url)
		return this
	}

	addHeader(header: HeadersInit) {
		this.headersArray.push(header)
		return this
	}

	addBody(body: IBody) {
		this.bodys.push(body)
		return this
	}

	async exec() {
		if (!this.headersArray.length) {
			console.log('Не заполнен url для запроса, отправить сообщение невозможно');
			return;
		}

		if (!this.requestTypes.length) {
			console.log('Не заполнен тип запроса, отправить сообщение невозможно');
			return;
		}

		if (!this.headersArray.length) {
			console.log('Не заполнен заголовок для запроса, отправить сообщение невозможно');
			return;
		}

		const requests: IRequestDate[] = [];
		const resArrayDate: any[] = [];

		await Promise.all(this.urls.map(async u => {
			await Promise.all(this.headersArray.map(async h => {
				await Promise.all(this.requestTypes.map(async t => {
					switch (t) {
						case RequestType.POST:
							if (!this.bodys.length) {
								const reqDate: IRequestDate = {
									headers: h,
									requestType: RequestType.POST,
									url: u
								}
								requests.push(reqDate);
								const date = await this.requestProcessing(reqDate);
								if (date) {
									resArrayDate.push(date);
								}
								break;
							}

							await Promise.all(this.bodys.map(async b => {
								const reqDate: IRequestDate = {
									headers: h,
									requestType: RequestType.POST,
									url: u,
									body: b
								}
								requests.push(reqDate);
								const date = await this.requestProcessing(reqDate);
								if (date) {
									resArrayDate.push(date);
								}
							}));
							break;
						case RequestType.GET:
							const reqDate: IRequestDate = {
								headers: h,
								requestType: RequestType.GET,
								url: u
							}
							requests.push(reqDate);
							const date = await this.requestProcessing(reqDate);
							if (date) {
								resArrayDate.push(date);
							}
							break;
					}
				}))
			}))
		}))

		return resArrayDate;
	}

	private async requestProcessing(reqDate: IRequestDate): Promise<any> {
		const { url, requestType, headers, body } = reqDate;
		try {
			const res = await fetch(url, {
				method: requestType,
				headers,
				body: JSON.stringify(body)
			})

			if (!res.ok) {
				console.log(`Ошибка ${requestType} запроса по url : ${url}. ${res.status}`)
			}

			return await res.json()
		} catch (e) {
			if (e instanceof Error)
				console.log(`Ошибка ${requestType} запроса по url : ${url}. ${e.message}`)
		}

	}
}

enum MIMEType {
	TEXTPLAN = 'text/plain',
	IMAGEJPEG = 'image/jpeg',
	APPLICATIONPNG = 'application/pdf'
}

/// PROXY
interface IPaymentAPI {
	getPaymentDetali(id: number): IPaymentDetali | unknown
}

interface IPaymentDetali {
	id: number
	price: number
}

class PaymantAPI implements IPaymentAPI {
	async getPaymentDetali(id: number): Promise<IPaymentDetali | unknown> {
		const arrBuilder = await new BuilderRequest()
			.addUrl(`https://dummyjson.com/products/${id}`)
			.addHeader({})
			.addRequestType(RequestType.GET)
			.addBody({ date: {} })
			.exec() as IPaymentDetali[];

		if (!arrBuilder.length) {
			throw new Error('Не удалось получить данные')
		}
		const builder = arrBuilder[0];
		return {
			id: builder.id,
			price: builder.price
		};
	}

}

class PaymentAccessProxy implements IPaymentAPI {

	constructor(private api : PaymantAPI) {

	}

	async getPaymentDetali(id: number): Promise<IPaymentDetali | unknown> {
		if (id > 10) {
			throw new Error('Передаваемый id больше 10');
		}

		return await this.api.getPaymentDetali(id);
	}

}

(async () => {
	const paymant = new PaymantAPI();
	console.log(await paymant.getPaymentDetali(2))

	const paymant2 = new PaymentAccessProxy(new PaymantAPI());
	console.log(await paymant2.getPaymentDetali(11))
})()
