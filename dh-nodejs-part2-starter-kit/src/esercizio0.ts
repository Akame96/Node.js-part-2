import crypto from 'crypto'

Object.getOwnPropertyNames(crypto);
const randomID = crypto.randomBytes(16).toString('hex');
console.log(randomID);

