"use strict";
const a = { a: 5, b: '', f: false };
const b = { a: 10, c: true };
function difference(a, b) {
    return Object.keys(a).reduce((acc, curr) => {
        if (curr in b) {
            return acc;
        }
        if (curr in a) {
            const key = curr;
            acc[curr] = a[key];
        }
        return acc;
    }, {});
}
console.log(difference(a, b));
