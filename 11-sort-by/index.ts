//@ts-ignore
import sortBy from 'sort-by'
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

console.log(users.sort(sortBy('id', 'name', 'age')));