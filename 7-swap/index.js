"use strict";
function swapKeyValue(obj) {
    const massOut = {};
    for (const key in obj) {
        massOut[obj[key]] = key;
    }
    return massOut;
}
const massOut = {
    1: '2',
    2: '3'
};
console.log(massOut);
console.log(swapKeyValue(massOut));
