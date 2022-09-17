Check your types more easily!. CustomTypeof offer you two way to check your values types.
One is using `check` method for check a single value type in more readable way, Rest of them can check n values

**Install:**

```bash
npm install custom-typeof
```

or

```bash
yarn add custom-typeof
```

**Examples:**

```js
const { customTypeof } = require(".");

const { check } = customTypeof;

const log = (...params) => console.log(...params);

const object = {};
const array = [];
log(check(object).type.isObject); // true
log(check(array).type.isObject); // false
log(check(array).type.isNotObject); // true

const someString = "1234567890";
log(check(someString).type.isString); // ofc is true
log(check(someString).type.isStringNumber); // true!

const custom = "custom",
	typeOf = "typeof";
if (check(custom, typeOf).type.isNotUndefined) {
	log("Is not undefined!");
}

const arr1 = [],
	arr2 = [],
	arr3 = [];
log(customTypeof.isArray(arr1, arr2, arr3)); // true
```

**All methods you have:**

```
check

isArray
isNotArray
isObject
isNotObject
isBoolean
isNotBoolean
isString
isNotString
isNumber
isNotNumber
isStringNumber
isNotStringNumber
isFunction
isNotFunction
isUndefined
isNotUndefined
isNaN
isNotNaN
isNull
isNotNull
isTruthy
isFalsy
```
