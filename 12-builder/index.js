"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const URLS = ['http1', 'http2', 'http3'];
var RequestType;
(function (RequestType) {
    RequestType["POST"] = "post";
    RequestType["GET"] = "get";
})(RequestType || (RequestType = {}));
class BuilderRequest {
    constructor() {
        this.requestTypes = [];
        this.headersArray = [];
        this.bodys = [];
        this.urls = [];
    }
    addRequestType(requestType) {
        if (this.requestTypes.some(t => t === requestType)) {
            return this;
        }
        this.requestTypes.push(requestType);
        return this;
    }
    addUrl(url) {
        if (this.urls.some(u => u === url)) {
            return this;
        }
        this.urls.push(url);
        return this;
    }
    addHeader(header) {
        this.headersArray.push(header);
        return this;
    }
    addBody(body) {
        this.bodys.push(body);
        return this;
    }
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
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
            const requests = [];
            yield Promise.all(this.urls.map((u) => __awaiter(this, void 0, void 0, function* () {
                yield Promise.all(this.headersArray.map((h) => __awaiter(this, void 0, void 0, function* () {
                    yield Promise.all(this.requestTypes.map((t) => __awaiter(this, void 0, void 0, function* () {
                        console.log('33');
                        switch (t) {
                            case RequestType.POST:
                                if (!this.bodys.length) {
                                    const reqDate = {
                                        headers: h,
                                        requestType: RequestType.POST,
                                        url: u
                                    };
                                    requests.push(reqDate);
                                    yield this.requestProcessing(reqDate);
                                    break;
                                }
                                yield Promise.all(this.bodys.map((b) => __awaiter(this, void 0, void 0, function* () {
                                    const reqDate = {
                                        headers: h,
                                        requestType: RequestType.POST,
                                        url: u,
                                        body: b
                                    };
                                    requests.push(reqDate);
                                    yield this.requestProcessing(reqDate);
                                })));
                                break;
                            case RequestType.GET:
                                const reqDate = {
                                    headers: h,
                                    requestType: RequestType.GET,
                                    url: u
                                };
                                requests.push(reqDate);
                                yield this.requestProcessing(reqDate);
                                break;
                        }
                    })));
                })));
            })));
            console.log(requests);
        });
    }
    requestProcessing(reqDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url, requestType, headers, body } = reqDate;
            try {
                const res = yield fetch(url, {
                    method: requestType,
                    headers,
                    body: JSON.stringify(body)
                });
                if (!res.ok) {
                    console.log(`Ошибка ${requestType} запроса по url : ${url}. ${res.status}`);
                }
            }
            catch (e) {
                if (e instanceof Error)
                    console.log(`Ошибка ${requestType} запроса по url : ${url}. ${e.message}`);
            }
        });
    }
}
var MIMEType;
(function (MIMEType) {
    MIMEType["TEXTPLAN"] = "text/plain";
    MIMEType["IMAGEJPEG"] = "image/jpeg";
    MIMEType["APPLICATIONPNG"] = "application/pdf";
})(MIMEType || (MIMEType = {}));
new BuilderRequest()
    .addUrl('http1')
    .addUrl('http2')
    .addUrl('http2')
    .addHeader({
    Authorization: 'Authorization',
    'Content-Type': MIMEType.APPLICATIONPNG
})
    .addRequestType(RequestType.POST)
    .addRequestType(RequestType.GET)
    .addRequestType(RequestType.GET)
    .addBody({
    id: '1',
    name: 'andrey',
    date: new Date()
})
    .addBody({
    id: '2',
    name: 'ivan',
    date: new Date()
})
    .exec();
