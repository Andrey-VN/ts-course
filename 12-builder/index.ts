const URLS = ['http1', 'http2', 'http3', 'https://dummyjson.com/products/1'] as const

enum RequestType {
	POST = 'post',
	GET = 'get'
}

interface IBody {
	id: string,
	name: string,
	date: Date
}

interface IRequestDate {
	url: typeof URLS[number]
	requestType: RequestType
	headers: HeadersInit
	body?: IBody
}

class BuilderRequest {
	private requestTypes: RequestType[] = []
	private headersArray: HeadersInit[] = [];
	private bodys: IBody[] = [];
	private urls: typeof URLS[number][] = [];

	addRequestType(requestType: RequestType) {
		if (this.requestTypes.some(t => t === requestType)) {
			return this;
		}
		this.requestTypes.push(requestType)
		return this
	}

	addUrl(url: typeof URLS[number]) {
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

(async () => {
	console.log(await new BuilderRequest()
		.addUrl('https://dummyjson.com/products/1')
		.addHeader({})
		.addRequestType(RequestType.GET)
		.addBody({
			id: '1',
			name: 'andrey',
			date: new Date()
		})
		.exec())
})()

