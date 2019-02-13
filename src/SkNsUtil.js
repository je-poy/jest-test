function SKMTI() {}

SKMTI.prototype.util = {
	isEmpty: function(value) {
		if (value instanceof Array) {
			return (value.length < 1);
		}

		return (value === '' || value === null || value === undefined || value === "undefined");
	},
	getAbsoluteURL: (function() {
		var a;

		return function(url) {
			if(!a) a = document.createElement('a');
			a.href = url;

			return a.href;
		};
	}),
	toNumber: function(value) {
		return +value;
	},
	functionExists: function(value) {
		return typeof value === 'function';
	}
}

SKMTI.prototype.object = {
	merge: function(source, forMerge) {
		for(var property in forMerge) {
			if(!source.hasOwnProperty(property)) {
				source[property] = forMerge[property];
			}
		}

		return source;
	},
	compare: function(source, target) {
		var property;

		for(property in source) {
			if(SKMTI.util.isEmpty(target[property])) return false;
		}

    for(property in target) {
			if(SKMTI.util.isEmpty(source[property])) return false;
		}

		for(property in source) {
			if(source[property]) {
				switch(typeof(source[property])) {
					case 'object':
          console.log('object');
						if(!SKMTI.object.compare(source[property], target[property])) {
							return false;
						}
						break;
					case 'function':
          console.log('fun');
						if(typeof(target[property]) === undefined ||
							(property != "equals" && source[property].toString() != target[property].toString())) {
							return false;
						}
						break;
					default:
          console.log('def');
						if(source[property] != target[property]) {
							return false;
						}
						break;
				}
			} else {
				if(target[property]) return false;
			}
		}

		return true;
	},
	trim: function (source) {
		for(var key in source){
			var val = source[key];
			if (SKMTI.util.isEmpty(val)) {
				delete source[key];
			}
		}
		return source;
	},
	toReqParams: function (url, obj) {
		var paramString = "";
		var patt = new RegExp(/((&amp;|&))/ig);

		for(var key in obj){
			paramString += (key+'='+obj[key]+'&');
		}


		url = url+(patt.test(url) ? "&" : "?")+paramString.slice(0, -1);

		return url;
	}
}

SKMTI.prototype.array = {
	find: function(source, value) {
		for(var index = 0, length = source.length; index < length; index++) {
			if(typeof value === 'object') {
				if(typeof source[index] === 'object' && SKMTI.object.compare(source[index], value)) {
					return index;
				}
			} else if(source[index] === value) return index;
		}

		return false;
	},
	truncate: function(source, value) {
		source.length = value;

		return source;
	},
	merge: function(source, forMerge) {
		return source.push.apply(source, forMerge);
	},
	contains: function(source, value) {
		return source.indexOf(value) >= 0;
	},
	sum: function(source) {
		return source.reduce(function(a, b) { return a + b; });
	}
}

SKMTI.prototype.lang = {
	toUpperCaseFirst: function(value) {
		var firstChar = value.substring(0, 1),
			remainChars = value.substring(1);

		return firstChar.toUpperCase() + remainChars.toLowerCase();
	},
	toUpperCaseWords: function(value) {
		var arrayValues = value.split(' '),
			result = '';

		for(var index = 0, length = arrayValues.length; index < length; index++) {
			result += SKMTI.lang.toUpperCaseFirst(arrayValues[index]) + ' ';
		}

		return result.substring(0, result.length - 1);
	},
	replaceAll: function(source, search, replacement) {
		return source.replace(new RegExp(search, 'g'), replacement);
	},
	reverse: function(value) {
		return value.split('').reverse().join('');
	},
	getCharAt: function(source, position) {
		return source.substring(position, position + 1);
	}
}

SKMTI.prototype.num = {
	isZero: function(value) {
		return value === 0;
	}
}

SKMTI.prototype.url = {
	getQueryParams: function(urlStr) {
		if (SKMTI.util.isEmpty(urlStr)) urlStr = window.location.search;
		if (SKMTI.util.isEmpty(urlStr)) return {};

		urlStr = urlStr.substring(1);
		var urlStrArr = urlStr.split("&");
		var queryParamObj = {};

		urlStrArr.forEach(function(value, indx) {
			var pair = value.split('=');
			queryParamObj[pair[0]] = pair[1];
		});

		return queryParamObj;
	},
	getQueryParamValue: function(value, urlStr) {
		var queryParamObj = this.getQueryParams(urlStr);
		return queryParamObj.hasOwnProperty(value) ? queryParamObj[value] : null;
	}
}

String.prototype.capitalize = function(){
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.toDecimal = function(place){
	var value = this, parsedValue = parseFloat(value);

	if(isNaN(parsedValue)) return 0;
	if(place != undefined) {
		var parsedFixedValue = parsedValue.toFixed(place);
		parsedValue = parseFloat(parsedFixedValue);
    }

	return parsedValue;
}

/**
 * Sample Usage
 * @type {SKMTI}
 */
var SKMTI = new SKMTI();

module.exports = SKMTI;
