const lodash = require("lodash");

const { regex } = require("./variables");

class CustomTypeof {
	constructor() {
		this.check = this.check.bind(this);
	}

	#isEveryTypeCheckTrue(items = [], type) {
		return items.every((value) => typeof value === type);
	}
	#isEveryTypeCheckFalse(items = [], type) {
		return items.every((value) => typeof value !== type);
	}
	#getTypesWithFalseValues() {
		return {
			isArray: false,
			isBoolean: false,
			isFunction: false,
			isNan: false,
			isNull: false,
			isNumber: false,
			isObject: false,
			isString: false,
			isStringNumber: false,
			isUndefined: false,

			isNotArray: true,
			isNotBoolean: true,
			isNotFunction: true,
			isNotNan: true,
			isNotNull: true,
			isNotNumber: true,
			isNotObject: true,
			isNotString: true,
			isNotStringNumber: true,
			isNotUndefined: true,
		};
	}

	check(value) {
		const type = this.#getTypesWithFalseValues();

		if (this.isNaN(value)) {
			type.isNan = true;
			type.isNotNan = false;
		} else {
			type.isStringNumber = true;
			type.isNotStringNumber = false;
		}

		if (this.isArray(value)) {
			type.isArray = true;
			type.isNotArray = false;
		} else if (this.isNull(value)) {
			type.isNull = true;
			type.isNotNull = false;
		} else {
			const uppercaseType = lodash.upperFirst(typeof value);
			type[`is${uppercaseType}`] = true;
			type[`isNot${uppercaseType}`] = false;
		}

		return { type, isTruthy: !!value };
	}

	isNaN(...items) {
		return items.every((value) => isNaN(value));
	}
	isNotNaN(...items) {
		return items.every((value) => !isNaN(value));
	}

	isNull(...items) {
		return items.every((value) => value === null);
	}
	isNotNull(...items) {
		return items.every((value) => value !== null);
	}

	isArray(...items) {
		return items.every((value) => Array.isArray(value));
	}
	isNotArray(...items) {
		return items.every((value) => !Array.isArray(value));
	}

	isFunction(...items) {
		return this.#isEveryTypeCheckTrue(items, "function");
	}
	isNotFunction(...items) {
		return this.#isEveryTypeCheckFalse(items, "function");
	}

	isNumber(...items) {
		return this.#isEveryTypeCheckTrue(items, "number");
	}
	isNotNumber(...items) {
		return this.#isEveryTypeCheckFalse(items, "number");
	}

	isStringNumber(...items) {
		return items.every((item) => regex.enNumber.test(item));
	}
	isNotStringNumber(...items) {
		return items.every((item) => !regex.enNumber.test(item));
	}

	isBoolean(...items) {
		return this.#isEveryTypeCheckTrue(items, "boolean");
	}
	isNotBoolean(...items) {
		return this.#isEveryTypeCheckFalse(items, "boolean");
	}

	isTruthy(...items) {
		return items.every((item) => !!item === true);
	}
	isFalsy(...items) {
		return items.every((item) => !!item === false);
	}

	isObject(...items) {
		return this.#isEveryTypeCheckTrue(items, "object");
	}
	isNotObject(...items) {
		return this.#isEveryTypeCheckFalse(items, "object");
	}

	isString(...items) {
		return this.#isEveryTypeCheckTrue(items, "string");
	}
	isNotString(...items) {
		return this.#isEveryTypeCheckFalse(items, "string");
	}

	isUndefined(...items) {
		return this.#isEveryTypeCheckTrue(items, "undefined");
	}
	isNotUndefined(...items) {
		return this.#isEveryTypeCheckFalse(items, "undefined");
	}
}

const customTypeof = new CustomTypeof();

module.exports = { customTypeof, CustomTypeof };
