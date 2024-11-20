"use strict";
const user = {
    name: 'Vasiliy',
    age: 8,
    skills: ['ts, js']
};
//type TPickObjectKeysOut<T, K extends keyof T> = {
//	[P in K]: T[P]
//}
function pickObjectKeys(obj, keys) {
    console.log(keys);
    return keys.reduce((a, c) => {
        a[c] = obj[c];
        return a;
    }, {});
}
console.log(pickObjectKeys(user, ['age', 'name']));
