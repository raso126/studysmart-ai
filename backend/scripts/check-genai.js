const { GoogleGenAI } = require('@google/genai');
const c = new GoogleGenAI({ apiKey: 'test' });
console.log('has models', !!c.models);
console.log('has interactions', !!c.interactions);
if (c.models) console.log('models methods', Object.getOwnPropertyNames(Object.getPrototypeOf(c.models)));
if (c.interactions) console.log('interactions methods', Object.getOwnPropertyNames(Object.getPrototypeOf(c.interactions)));
