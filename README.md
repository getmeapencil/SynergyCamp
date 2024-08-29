# SynergyCamp

StyleGuide-
- Always use arrow functions  
Eg.
```js
const niceFunction = () => {return "Hello"};
```

- Don't use `default` export  
Eg.
```js
export default const niceFunction = () => {return "Hello"}; // ❌
export const niceFunction = () => {return "Hello"}; // ✅
```

- If a function takes more than one params, pass params as object  
Eg.
```js
export const getSum = ({num1, num2}) => {return num1 + num2}; // ✅
getSum({num1: 3, num2: 4});
```
