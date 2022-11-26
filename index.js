const { regex } = require("./variables");

class CustomTypeof {
	constructor() {
		this.check = this.check.bind(this);
	}

	#isEveryTypeCheckTrue(items = [], type) {
		if (!items.length) return false;
		return items.every((value) => typeof value === type);
	}
	#isEveryTypeCheckFalse(items = [], type) {
		if (!items.length) return false;
		return items.every((value) => typeof value !== type);
	}
	// #isSomeTypeCheckTrue(items = [], type) {
	// 	return items.some((item) => typeof item === type);
	// }
	#getTypesWithFalseValues() {
		return {
			isArray: false,
			isBoolean: false,
			isFunction: false,
			isNan: false,
			isNull: false,
			isNumber: false,
			isObject: false,
			isObjectNative: false,
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
			isNotObjectNative: true,
			isNotString: true,
			isNotStringNumber: true,
			isNotUndefined: true,
		};
	}

	#typeUpperFirst(type) {
		let typeParts = type.split("");
		typeParts[0] = typeParts[0].toUpperCase();
		return typeParts.join("");
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
			const uppercaseType = this.#typeUpperFirst(typeof value);
			type[`is${uppercaseType}`] = true;
			type[`isNot${uppercaseType}`] = false;
		}

		return { type, isTruthy: !!value };
	}

	isNaN(...items) {
		if (!items.length) return false;
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
		if (!items.length) return false;
		return items.every((value) => Array.isArray(value));
	}
	#isSomeItemsArray(...items) {
		return items.some((item) => Array.isArray(item));
	}
	isNotArray(...items) {
		if (!items.length) return false;
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
		if (!items.length) return false;
		return items.every((item) => regex.enNumber.test(item));
	}
	isNotStringNumber(...items) {
		if (!items.length) return false;
		return items.every((item) => !regex.enNumber.test(item));
	}

	isBoolean(...items) {
		return this.#isEveryTypeCheckTrue(items, "boolean");
	}
	isNotBoolean(...items) {
		return this.#isEveryTypeCheckFalse(items, "boolean");
	}

	isTruthy(...items) {
		if (!items.length) return false;
		return items.every((item) => !!item === true);
	}
	isFalsy(...items) {
		if (!items.length) return false;
		return items.every((item) => !!item === false);
	}

	isObject(...items) {
		if (this.#isSomeItemsArray(...items)) return false;
		return this.#isEveryTypeCheckTrue(items, "object");
	}
	isObjectNative(...items) {
		return this.#isEveryTypeCheckTrue(items, "object");
	}
	isNotObject(...items) {
		const itemsFilteredFromArray = items.filter((item) => !Array.isArray(item));

		return itemsFilteredFromArray.length
			? this.#isEveryTypeCheckFalse(itemsFilteredFromArray, "object")
			: true;
	}
	isNotObjectNative(...items) {
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

	typeof(value) {
		if (this.isArray(value)) return "array";
		return typeof value;
	}
}

const customTypeof = new CustomTypeof();

module.exports = { customTypeof, CustomTypeof };
