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
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
})(Gender || (Gender = {}));
var BloodGroup;
(function (BloodGroup) {
    BloodGroup["APositive"] = "A+";
    BloodGroup["ANegative"] = "A-";
    BloodGroup["BPositive"] = "B+";
    BloodGroup["BNegative"] = "B-";
    BloodGroup["OPositive"] = "O+";
    BloodGroup["ONegative"] = "O-";
    BloodGroup["ABPositive"] = "AB+";
    BloodGroup["ABNegative"] = "AB-";
})(BloodGroup || (BloodGroup = {}));
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resp = yield fetch('https://dummyjson.com/users');
        if (!resp.ok) {
            console.log(`Ошибка в ответе на запрос. Статус - ${resp.status}`);
            return;
        }
        const users = yield resp.json();
        if (!Array.isArray(users)) {
            console.log(`Данные в ответе не являются массивом - ${users}`);
            return;
        }
        const userNoObject = users.filter(u => typeof u !== 'object');
        if (userNoObject.length) {
            console.log(`Данные в массиве ответа не являются объектами - ${userNoObject}`);
            return;
        }
    }
    catch (e) {
        if (e instanceof Error) {
            console.log(`Ошибка запроса - ${e.message}`);
            return;
        }
        console.log(e);
    }
}))();
