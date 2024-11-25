"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class User {
    constructor() {
        this.age = 30;
    }
}
__decorate([
    allowFunc((a) => a > 0)
], User.prototype, "age", void 0);
function allowFunc(call) {
    return function (target, propertyKey) {
        let value;
        console.log('sadsa');
        const setter = function (a) {
            if (call(a)) {
                value ? value = value + a : value = a;
            }
            else {
                console.log(`Присваивание значения ${a} не произошло`);
            }
        };
        const getter = function () {
            return value;
        };
        Object.defineProperty(target, propertyKey, {
            set: setter,
            get: getter,
        });
    };
}
const user = new User();
user.age = 10;
user.age = 10;
user.age = 10;
user.age = -10;
console.log(user.age);
