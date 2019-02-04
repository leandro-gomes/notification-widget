## Installation

```
$ npm install
$ npm start
```

## Usage

Just type in browser console:

`notification.show(type, position, message);`

### Example:

`notification.show("info", "tl", "Hello");`

**The notification will automatically disappear after 5 seconds**

## API

| Name     | Type   | Description                                                          |
| -------- | ------ | -------------------------------------------------------------------- |
| type     | string | alert, info or warning                                               |
| position | string | tl (top-left), tr (top-right), bl (bottom-left) or br (bottom-right) |
| message  | string | The message string                                                   |

## Notes

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
