# SynergyCamp

Project Name -  
**MindMesh**  

Description -  
Video Conferencing app with features that allows you to study and work with friends in real-time.  

## StyleGuide-
- Make sure `Format on save` is enabled and configured to `Prettier`  
https://www.digitalocean.com/community/tutorials/how-to-format-code-with-prettier-in-visual-studio-code

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

## Features

- Dashboard
  - Create Room
  - Room list
  - Invite list
  - Bar Chart (Stats)
  - Streak (like Github)
  - Todo Overview
- Chat
- Polls
- Pomodoro
- Todo
- Video Conferencing
- Music?
- Whiteboard?

