"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore
const sort_by_1 = __importDefault(require("sort-by"));
const users = [{
        id: 3,
        name: 'B',
        age: '80',
        email: { primary: 'foo@email.com' }
    }, {
        id: 3,
        name: 'B',
        age: '67',
        email: { primary: 'baz@email.com' }
    }, {
        id: 4,
        name: 'A',
        age: '67',
        email: { primary: 'bar@email.com' }
    }];
console.log(users.sort((0, sort_by_1.default)('id', 'name', 'age')));
