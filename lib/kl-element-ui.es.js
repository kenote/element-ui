import Vue from "vue";
/**
  * vue-class-component v7.2.6
  * (c) 2015-present Evan You
  * @license MIT
  */
function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++)
      arr2[i] = arr[i];
    return arr2;
  }
}
function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]")
    return Array.from(iter);
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function reflectionIsSupported() {
  return typeof Reflect !== "undefined" && Reflect.defineMetadata && Reflect.getOwnMetadataKeys;
}
function copyReflectionMetadata(to, from) {
  forwardMetadata(to, from);
  Object.getOwnPropertyNames(from.prototype).forEach(function(key) {
    forwardMetadata(to.prototype, from.prototype, key);
  });
  Object.getOwnPropertyNames(from).forEach(function(key) {
    forwardMetadata(to, from, key);
  });
}
function forwardMetadata(to, from, propertyKey) {
  var metaKeys = propertyKey ? Reflect.getOwnMetadataKeys(from, propertyKey) : Reflect.getOwnMetadataKeys(from);
  metaKeys.forEach(function(metaKey) {
    var metadata = propertyKey ? Reflect.getOwnMetadata(metaKey, from, propertyKey) : Reflect.getOwnMetadata(metaKey, from);
    if (propertyKey) {
      Reflect.defineMetadata(metaKey, metadata, to, propertyKey);
    } else {
      Reflect.defineMetadata(metaKey, metadata, to);
    }
  });
}
var fakeArray = {
  __proto__: []
};
var hasProto = fakeArray instanceof Array;
function createDecorator(factory) {
  return function(target, key, index) {
    var Ctor = typeof target === "function" ? target : target.constructor;
    if (!Ctor.__decorators__) {
      Ctor.__decorators__ = [];
    }
    if (typeof index !== "number") {
      index = void 0;
    }
    Ctor.__decorators__.push(function(options) {
      return factory(options, key, index);
    });
  };
}
function isPrimitive(value) {
  var type2 = _typeof(value);
  return value == null || type2 !== "object" && type2 !== "function";
}
function collectDataFromConstructor(vm, Component2) {
  var originalInit = Component2.prototype._init;
  Component2.prototype._init = function() {
    var _this = this;
    var keys = Object.getOwnPropertyNames(vm);
    if (vm.$options.props) {
      for (var key in vm.$options.props) {
        if (!vm.hasOwnProperty(key)) {
          keys.push(key);
        }
      }
    }
    keys.forEach(function(key2) {
      Object.defineProperty(_this, key2, {
        get: function get() {
          return vm[key2];
        },
        set: function set2(value) {
          vm[key2] = value;
        },
        configurable: true
      });
    });
  };
  var data = new Component2();
  Component2.prototype._init = originalInit;
  var plainData = {};
  Object.keys(data).forEach(function(key) {
    if (data[key] !== void 0) {
      plainData[key] = data[key];
    }
  });
  return plainData;
}
var $internalHooks = [
  "data",
  "beforeCreate",
  "created",
  "beforeMount",
  "mounted",
  "beforeDestroy",
  "destroyed",
  "beforeUpdate",
  "updated",
  "activated",
  "deactivated",
  "render",
  "errorCaptured",
  "serverPrefetch"
];
function componentFactory(Component2) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  options.name = options.name || Component2._componentTag || Component2.name;
  var proto = Component2.prototype;
  Object.getOwnPropertyNames(proto).forEach(function(key) {
    if (key === "constructor") {
      return;
    }
    if ($internalHooks.indexOf(key) > -1) {
      options[key] = proto[key];
      return;
    }
    var descriptor = Object.getOwnPropertyDescriptor(proto, key);
    if (descriptor.value !== void 0) {
      if (typeof descriptor.value === "function") {
        (options.methods || (options.methods = {}))[key] = descriptor.value;
      } else {
        (options.mixins || (options.mixins = [])).push({
          data: function data() {
            return _defineProperty({}, key, descriptor.value);
          }
        });
      }
    } else if (descriptor.get || descriptor.set) {
      (options.computed || (options.computed = {}))[key] = {
        get: descriptor.get,
        set: descriptor.set
      };
    }
  });
  (options.mixins || (options.mixins = [])).push({
    data: function data() {
      return collectDataFromConstructor(this, Component2);
    }
  });
  var decorators = Component2.__decorators__;
  if (decorators) {
    decorators.forEach(function(fn) {
      return fn(options);
    });
    delete Component2.__decorators__;
  }
  var superProto = Object.getPrototypeOf(Component2.prototype);
  var Super = superProto instanceof Vue ? superProto.constructor : Vue;
  var Extended = Super.extend(options);
  forwardStaticMembers(Extended, Component2, Super);
  if (reflectionIsSupported()) {
    copyReflectionMetadata(Extended, Component2);
  }
  return Extended;
}
var shouldIgnore = {
  prototype: true,
  arguments: true,
  callee: true,
  caller: true
};
function forwardStaticMembers(Extended, Original, Super) {
  Object.getOwnPropertyNames(Original).forEach(function(key) {
    if (shouldIgnore[key]) {
      return;
    }
    var extendedDescriptor = Object.getOwnPropertyDescriptor(Extended, key);
    if (extendedDescriptor && !extendedDescriptor.configurable) {
      return;
    }
    var descriptor = Object.getOwnPropertyDescriptor(Original, key);
    if (!hasProto) {
      if (key === "cid") {
        return;
      }
      var superDescriptor = Object.getOwnPropertyDescriptor(Super, key);
      if (!isPrimitive(descriptor.value) && superDescriptor && superDescriptor.value === descriptor.value) {
        return;
      }
    }
    Object.defineProperty(Extended, key, descriptor);
  });
}
function Component(options) {
  if (typeof options === "function") {
    return componentFactory(options);
  }
  return function(Component2) {
    return componentFactory(Component2, options);
  };
}
Component.registerHooks = function registerHooks(keys) {
  $internalHooks.push.apply($internalHooks, _toConsumableArray(keys));
};
var __spreadArrays = globalThis && globalThis.__spreadArrays || function() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++)
    s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
      r[k] = a[j];
  return r;
};
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = function(str2) {
  return str2.replace(hyphenateRE, "-$1").toLowerCase();
};
function Emit(event) {
  return function(_target, propertyKey, descriptor) {
    var key = hyphenate(propertyKey);
    var original = descriptor.value;
    descriptor.value = function emitter() {
      var _this = this;
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var emit2 = function(returnValue2) {
        var emitName = event || key;
        if (returnValue2 === void 0) {
          if (args.length === 0) {
            _this.$emit(emitName);
          } else if (args.length === 1) {
            _this.$emit(emitName, args[0]);
          } else {
            _this.$emit.apply(_this, __spreadArrays([emitName], args));
          }
        } else {
          args.unshift(returnValue2);
          _this.$emit.apply(_this, __spreadArrays([emitName], args));
        }
      };
      var returnValue = original.apply(this, args);
      if (isPromise(returnValue)) {
        returnValue.then(emit2);
      } else {
        emit2(returnValue);
      }
      return returnValue;
    };
  };
}
function isPromise(obj) {
  return obj instanceof Promise || obj && typeof obj.then === "function";
}
function needToProduceProvide(original) {
  return typeof original !== "function" || !original.managed && !original.managedReactive;
}
function produceProvide(original) {
  var provide = function() {
    var _this = this;
    var rv = typeof original === "function" ? original.call(this) : original;
    rv = Object.create(rv || null);
    rv[reactiveInjectKey] = Object.create(this[reactiveInjectKey] || {});
    for (var i in provide.managed) {
      rv[provide.managed[i]] = this[i];
    }
    var _loop_1 = function(i2) {
      rv[provide.managedReactive[i2]] = this_1[i2];
      Object.defineProperty(rv[reactiveInjectKey], provide.managedReactive[i2], {
        enumerable: true,
        configurable: true,
        get: function() {
          return _this[i2];
        }
      });
    };
    var this_1 = this;
    for (var i in provide.managedReactive) {
      _loop_1(i);
    }
    return rv;
  };
  provide.managed = {};
  provide.managedReactive = {};
  return provide;
}
var reactiveInjectKey = "__reactiveInject__";
function inheritInjected(componentOptions) {
  if (!Array.isArray(componentOptions.inject)) {
    componentOptions.inject = componentOptions.inject || {};
    componentOptions.inject[reactiveInjectKey] = {
      from: reactiveInjectKey,
      default: {}
    };
  }
}
var reflectMetadataIsSupported = typeof Reflect !== "undefined" && typeof Reflect.getMetadata !== "undefined";
function applyMetadata(options, target, key) {
  if (reflectMetadataIsSupported) {
    if (!Array.isArray(options) && typeof options !== "function" && !options.hasOwnProperty("type") && typeof options.type === "undefined") {
      var type2 = Reflect.getMetadata("design:type", target, key);
      if (type2 !== Object) {
        options.type = type2;
      }
    }
  }
}
function Model(event, options) {
  if (options === void 0) {
    options = {};
  }
  return function(target, key) {
    applyMetadata(options, target, key);
    createDecorator(function(componentOptions, k) {
      (componentOptions.props || (componentOptions.props = {}))[k] = options;
      componentOptions.model = { prop: k, event: event || k };
    })(target, key);
  };
}
function Prop(options) {
  if (options === void 0) {
    options = {};
  }
  return function(target, key) {
    applyMetadata(options, target, key);
    createDecorator(function(componentOptions, k) {
      (componentOptions.props || (componentOptions.props = {}))[k] = options;
    })(target, key);
  };
}
function Provide(key) {
  return createDecorator(function(componentOptions, k) {
    var provide = componentOptions.provide;
    inheritInjected(componentOptions);
    if (needToProduceProvide(provide)) {
      provide = componentOptions.provide = produceProvide(provide);
    }
    provide.managed[k] = key || k;
  });
}
function Watch(path, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.deep, deep = _a === void 0 ? false : _a, _b = options.immediate, immediate = _b === void 0 ? false : _b;
  return createDecorator(function(componentOptions, handler) {
    if (typeof componentOptions.watch !== "object") {
      componentOptions.watch = /* @__PURE__ */ Object.create(null);
    }
    var watch = componentOptions.watch;
    if (typeof watch[path] === "object" && !Array.isArray(watch[path])) {
      watch[path] = [watch[path]];
    } else if (typeof watch[path] === "undefined") {
      watch[path] = [];
    }
    watch[path].push({ handler, deep, immediate });
  });
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function commonjsRequire(path) {
  throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var lodash = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
(function(module, exports) {
  (function() {
    var undefined$1;
    var VERSION = "4.17.21";
    var LARGE_ARRAY_SIZE = 200;
    var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT = "Expected a function", INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`";
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var MAX_MEMOIZE_SIZE = 500;
    var PLACEHOLDER = "__lodash_placeholder__";
    var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
    var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
    var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
    var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
    var HOT_COUNT = 800, HOT_SPAN = 16;
    var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
    var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 17976931348623157e292, NAN = 0 / 0;
    var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
    var wrapFlags = [
      ["ary", WRAP_ARY_FLAG],
      ["bind", WRAP_BIND_FLAG],
      ["bindKey", WRAP_BIND_KEY_FLAG],
      ["curry", WRAP_CURRY_FLAG],
      ["curryRight", WRAP_CURRY_RIGHT_FLAG],
      ["flip", WRAP_FLIP_FLAG],
      ["partial", WRAP_PARTIAL_FLAG],
      ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
      ["rearg", WRAP_REARG_FLAG]
    ];
    var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", domExcTag = "[object DOMException]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]", weakSetTag = "[object WeakSet]";
    var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
    var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
    var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
    var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
    var reTrimStart = /^\s+/;
    var reWhitespace = /\s/;
    var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
    var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
    var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
    var reEscapeChar = /\\(\\)?/g;
    var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
    var reFlags = /\w*$/;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var reIsOctal = /^0o[0-7]+$/i;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
    var reNoMatch = /($^)/;
    var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
    var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
    var rsApos = "['\u2019]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
    var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
    var reApos = RegExp(rsApos, "g");
    var reComboMark = RegExp(rsCombo, "g");
    var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
    var reUnicodeWord = RegExp([
      rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
      rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
      rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
      rsUpper + "+" + rsOptContrUpper,
      rsOrdUpper,
      rsOrdLower,
      rsDigits,
      rsEmoji
    ].join("|"), "g");
    var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
    var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
    var contextProps = [
      "Array",
      "Buffer",
      "DataView",
      "Date",
      "Error",
      "Float32Array",
      "Float64Array",
      "Function",
      "Int8Array",
      "Int16Array",
      "Int32Array",
      "Map",
      "Math",
      "Object",
      "Promise",
      "RegExp",
      "Set",
      "String",
      "Symbol",
      "TypeError",
      "Uint8Array",
      "Uint8ClampedArray",
      "Uint16Array",
      "Uint32Array",
      "WeakMap",
      "_",
      "clearTimeout",
      "isFinite",
      "parseInt",
      "setTimeout"
    ];
    var templateCounter = -1;
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    var cloneableTags = {};
    cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
    cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
    var deburredLetters = {
      "\xC0": "A",
      "\xC1": "A",
      "\xC2": "A",
      "\xC3": "A",
      "\xC4": "A",
      "\xC5": "A",
      "\xE0": "a",
      "\xE1": "a",
      "\xE2": "a",
      "\xE3": "a",
      "\xE4": "a",
      "\xE5": "a",
      "\xC7": "C",
      "\xE7": "c",
      "\xD0": "D",
      "\xF0": "d",
      "\xC8": "E",
      "\xC9": "E",
      "\xCA": "E",
      "\xCB": "E",
      "\xE8": "e",
      "\xE9": "e",
      "\xEA": "e",
      "\xEB": "e",
      "\xCC": "I",
      "\xCD": "I",
      "\xCE": "I",
      "\xCF": "I",
      "\xEC": "i",
      "\xED": "i",
      "\xEE": "i",
      "\xEF": "i",
      "\xD1": "N",
      "\xF1": "n",
      "\xD2": "O",
      "\xD3": "O",
      "\xD4": "O",
      "\xD5": "O",
      "\xD6": "O",
      "\xD8": "O",
      "\xF2": "o",
      "\xF3": "o",
      "\xF4": "o",
      "\xF5": "o",
      "\xF6": "o",
      "\xF8": "o",
      "\xD9": "U",
      "\xDA": "U",
      "\xDB": "U",
      "\xDC": "U",
      "\xF9": "u",
      "\xFA": "u",
      "\xFB": "u",
      "\xFC": "u",
      "\xDD": "Y",
      "\xFD": "y",
      "\xFF": "y",
      "\xC6": "Ae",
      "\xE6": "ae",
      "\xDE": "Th",
      "\xFE": "th",
      "\xDF": "ss",
      "\u0100": "A",
      "\u0102": "A",
      "\u0104": "A",
      "\u0101": "a",
      "\u0103": "a",
      "\u0105": "a",
      "\u0106": "C",
      "\u0108": "C",
      "\u010A": "C",
      "\u010C": "C",
      "\u0107": "c",
      "\u0109": "c",
      "\u010B": "c",
      "\u010D": "c",
      "\u010E": "D",
      "\u0110": "D",
      "\u010F": "d",
      "\u0111": "d",
      "\u0112": "E",
      "\u0114": "E",
      "\u0116": "E",
      "\u0118": "E",
      "\u011A": "E",
      "\u0113": "e",
      "\u0115": "e",
      "\u0117": "e",
      "\u0119": "e",
      "\u011B": "e",
      "\u011C": "G",
      "\u011E": "G",
      "\u0120": "G",
      "\u0122": "G",
      "\u011D": "g",
      "\u011F": "g",
      "\u0121": "g",
      "\u0123": "g",
      "\u0124": "H",
      "\u0126": "H",
      "\u0125": "h",
      "\u0127": "h",
      "\u0128": "I",
      "\u012A": "I",
      "\u012C": "I",
      "\u012E": "I",
      "\u0130": "I",
      "\u0129": "i",
      "\u012B": "i",
      "\u012D": "i",
      "\u012F": "i",
      "\u0131": "i",
      "\u0134": "J",
      "\u0135": "j",
      "\u0136": "K",
      "\u0137": "k",
      "\u0138": "k",
      "\u0139": "L",
      "\u013B": "L",
      "\u013D": "L",
      "\u013F": "L",
      "\u0141": "L",
      "\u013A": "l",
      "\u013C": "l",
      "\u013E": "l",
      "\u0140": "l",
      "\u0142": "l",
      "\u0143": "N",
      "\u0145": "N",
      "\u0147": "N",
      "\u014A": "N",
      "\u0144": "n",
      "\u0146": "n",
      "\u0148": "n",
      "\u014B": "n",
      "\u014C": "O",
      "\u014E": "O",
      "\u0150": "O",
      "\u014D": "o",
      "\u014F": "o",
      "\u0151": "o",
      "\u0154": "R",
      "\u0156": "R",
      "\u0158": "R",
      "\u0155": "r",
      "\u0157": "r",
      "\u0159": "r",
      "\u015A": "S",
      "\u015C": "S",
      "\u015E": "S",
      "\u0160": "S",
      "\u015B": "s",
      "\u015D": "s",
      "\u015F": "s",
      "\u0161": "s",
      "\u0162": "T",
      "\u0164": "T",
      "\u0166": "T",
      "\u0163": "t",
      "\u0165": "t",
      "\u0167": "t",
      "\u0168": "U",
      "\u016A": "U",
      "\u016C": "U",
      "\u016E": "U",
      "\u0170": "U",
      "\u0172": "U",
      "\u0169": "u",
      "\u016B": "u",
      "\u016D": "u",
      "\u016F": "u",
      "\u0171": "u",
      "\u0173": "u",
      "\u0174": "W",
      "\u0175": "w",
      "\u0176": "Y",
      "\u0177": "y",
      "\u0178": "Y",
      "\u0179": "Z",
      "\u017B": "Z",
      "\u017D": "Z",
      "\u017A": "z",
      "\u017C": "z",
      "\u017E": "z",
      "\u0132": "IJ",
      "\u0133": "ij",
      "\u0152": "Oe",
      "\u0153": "oe",
      "\u0149": "'n",
      "\u017F": "s"
    };
    var htmlEscapes = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    var htmlUnescapes = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'"
    };
    var stringEscapes = {
      "\\": "\\",
      "'": "'",
      "\n": "n",
      "\r": "r",
      "\u2028": "u2028",
      "\u2029": "u2029"
    };
    var freeParseFloat = parseFloat, freeParseInt = parseInt;
    var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var freeExports = exports && !exports.nodeType && exports;
    var freeModule = freeExports && true && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = function() {
      try {
        var types = freeModule && freeModule.require && freeModule.require("util").types;
        if (types) {
          return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {
      }
    }();
    var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer, nodeIsDate = nodeUtil && nodeUtil.isDate, nodeIsMap = nodeUtil && nodeUtil.isMap, nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, nodeIsSet = nodeUtil && nodeUtil.isSet, nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    function apply(func, thisArg, args) {
      switch (args.length) {
        case 0:
          return func.call(thisArg);
        case 1:
          return func.call(thisArg, args[0]);
        case 2:
          return func.call(thisArg, args[0], args[1]);
        case 3:
          return func.call(thisArg, args[0], args[1], args[2]);
      }
      return func.apply(thisArg, args);
    }
    function arrayAggregator(array, setter, iteratee, accumulator) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        var value = array[index];
        setter(accumulator, value, iteratee(value), array);
      }
      return accumulator;
    }
    function arrayEach(array, iteratee) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
          break;
        }
      }
      return array;
    }
    function arrayEachRight(array, iteratee) {
      var length = array == null ? 0 : array.length;
      while (length--) {
        if (iteratee(array[length], length, array) === false) {
          break;
        }
      }
      return array;
    }
    function arrayEvery(array, predicate) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (!predicate(array[index], index, array)) {
          return false;
        }
      }
      return true;
    }
    function arrayFilter(array, predicate) {
      var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }
    function arrayIncludes(array, value) {
      var length = array == null ? 0 : array.length;
      return !!length && baseIndexOf(array, value, 0) > -1;
    }
    function arrayIncludesWith(array, value, comparator) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (comparator(value, array[index])) {
          return true;
        }
      }
      return false;
    }
    function arrayMap(array, iteratee) {
      var index = -1, length = array == null ? 0 : array.length, result = Array(length);
      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }
    function arrayPush(array, values) {
      var index = -1, length = values.length, offset = array.length;
      while (++index < length) {
        array[offset + index] = values[index];
      }
      return array;
    }
    function arrayReduce(array, iteratee, accumulator, initAccum) {
      var index = -1, length = array == null ? 0 : array.length;
      if (initAccum && length) {
        accumulator = array[++index];
      }
      while (++index < length) {
        accumulator = iteratee(accumulator, array[index], index, array);
      }
      return accumulator;
    }
    function arrayReduceRight(array, iteratee, accumulator, initAccum) {
      var length = array == null ? 0 : array.length;
      if (initAccum && length) {
        accumulator = array[--length];
      }
      while (length--) {
        accumulator = iteratee(accumulator, array[length], length, array);
      }
      return accumulator;
    }
    function arraySome(array, predicate) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (predicate(array[index], index, array)) {
          return true;
        }
      }
      return false;
    }
    var asciiSize = baseProperty("length");
    function asciiToArray(string) {
      return string.split("");
    }
    function asciiWords(string) {
      return string.match(reAsciiWord) || [];
    }
    function baseFindKey(collection, predicate, eachFunc) {
      var result;
      eachFunc(collection, function(value, key, collection2) {
        if (predicate(value, key, collection2)) {
          result = key;
          return false;
        }
      });
      return result;
    }
    function baseFindIndex(array, predicate, fromIndex, fromRight) {
      var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
      while (fromRight ? index-- : ++index < length) {
        if (predicate(array[index], index, array)) {
          return index;
        }
      }
      return -1;
    }
    function baseIndexOf(array, value, fromIndex) {
      return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
    }
    function baseIndexOfWith(array, value, fromIndex, comparator) {
      var index = fromIndex - 1, length = array.length;
      while (++index < length) {
        if (comparator(array[index], value)) {
          return index;
        }
      }
      return -1;
    }
    function baseIsNaN(value) {
      return value !== value;
    }
    function baseMean(array, iteratee) {
      var length = array == null ? 0 : array.length;
      return length ? baseSum(array, iteratee) / length : NAN;
    }
    function baseProperty(key) {
      return function(object) {
        return object == null ? undefined$1 : object[key];
      };
    }
    function basePropertyOf(object) {
      return function(key) {
        return object == null ? undefined$1 : object[key];
      };
    }
    function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
      eachFunc(collection, function(value, index, collection2) {
        accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection2);
      });
      return accumulator;
    }
    function baseSortBy(array, comparer) {
      var length = array.length;
      array.sort(comparer);
      while (length--) {
        array[length] = array[length].value;
      }
      return array;
    }
    function baseSum(array, iteratee) {
      var result, index = -1, length = array.length;
      while (++index < length) {
        var current = iteratee(array[index]);
        if (current !== undefined$1) {
          result = result === undefined$1 ? current : result + current;
        }
      }
      return result;
    }
    function baseTimes(n, iteratee) {
      var index = -1, result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    function baseToPairs(object, props) {
      return arrayMap(props, function(key) {
        return [key, object[key]];
      });
    }
    function baseTrim(string) {
      return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
    }
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    function baseValues(object, props) {
      return arrayMap(props, function(key) {
        return object[key];
      });
    }
    function cacheHas(cache, key) {
      return cache.has(key);
    }
    function charsStartIndex(strSymbols, chrSymbols) {
      var index = -1, length = strSymbols.length;
      while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
      }
      return index;
    }
    function charsEndIndex(strSymbols, chrSymbols) {
      var index = strSymbols.length;
      while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
      }
      return index;
    }
    function countHolders(array, placeholder) {
      var length = array.length, result = 0;
      while (length--) {
        if (array[length] === placeholder) {
          ++result;
        }
      }
      return result;
    }
    var deburrLetter = basePropertyOf(deburredLetters);
    var escapeHtmlChar = basePropertyOf(htmlEscapes);
    function escapeStringChar(chr) {
      return "\\" + stringEscapes[chr];
    }
    function getValue(object, key) {
      return object == null ? undefined$1 : object[key];
    }
    function hasUnicode(string) {
      return reHasUnicode.test(string);
    }
    function hasUnicodeWord(string) {
      return reHasUnicodeWord.test(string);
    }
    function iteratorToArray(iterator) {
      var data, result = [];
      while (!(data = iterator.next()).done) {
        result.push(data.value);
      }
      return result;
    }
    function mapToArray(map2) {
      var index = -1, result = Array(map2.size);
      map2.forEach(function(value, key) {
        result[++index] = [key, value];
      });
      return result;
    }
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    function replaceHolders(array, placeholder) {
      var index = -1, length = array.length, resIndex = 0, result = [];
      while (++index < length) {
        var value = array[index];
        if (value === placeholder || value === PLACEHOLDER) {
          array[index] = PLACEHOLDER;
          result[resIndex++] = index;
        }
      }
      return result;
    }
    function setToArray(set2) {
      var index = -1, result = Array(set2.size);
      set2.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }
    function setToPairs(set2) {
      var index = -1, result = Array(set2.size);
      set2.forEach(function(value) {
        result[++index] = [value, value];
      });
      return result;
    }
    function strictIndexOf(array, value, fromIndex) {
      var index = fromIndex - 1, length = array.length;
      while (++index < length) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }
    function strictLastIndexOf(array, value, fromIndex) {
      var index = fromIndex + 1;
      while (index--) {
        if (array[index] === value) {
          return index;
        }
      }
      return index;
    }
    function stringSize(string) {
      return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
    }
    function stringToArray(string) {
      return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
    }
    function trimmedEndIndex(string) {
      var index = string.length;
      while (index-- && reWhitespace.test(string.charAt(index))) {
      }
      return index;
    }
    var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
    function unicodeSize(string) {
      var result = reUnicode.lastIndex = 0;
      while (reUnicode.test(string)) {
        ++result;
      }
      return result;
    }
    function unicodeToArray(string) {
      return string.match(reUnicode) || [];
    }
    function unicodeWords(string) {
      return string.match(reUnicodeWord) || [];
    }
    var runInContext = function runInContext2(context) {
      context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));
      var Array2 = context.Array, Date2 = context.Date, Error2 = context.Error, Function2 = context.Function, Math2 = context.Math, Object2 = context.Object, RegExp2 = context.RegExp, String2 = context.String, TypeError2 = context.TypeError;
      var arrayProto = Array2.prototype, funcProto = Function2.prototype, objectProto = Object2.prototype;
      var coreJsData = context["__core-js_shared__"];
      var funcToString = funcProto.toString;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var idCounter = 0;
      var maskSrcKey = function() {
        var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
        return uid ? "Symbol(src)_1." + uid : "";
      }();
      var nativeObjectToString = objectProto.toString;
      var objectCtorString = funcToString.call(Object2);
      var oldDash = root._;
      var reIsNative = RegExp2("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
      var Buffer = moduleExports ? context.Buffer : undefined$1, Symbol2 = context.Symbol, Uint8Array = context.Uint8Array, allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined$1, getPrototype = overArg(Object2.getPrototypeOf, Object2), objectCreate = Object2.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : undefined$1, symIterator = Symbol2 ? Symbol2.iterator : undefined$1, symToStringTag = Symbol2 ? Symbol2.toStringTag : undefined$1;
      var defineProperty = function() {
        try {
          var func = getNative(Object2, "defineProperty");
          func({}, "", {});
          return func;
        } catch (e) {
        }
      }();
      var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout, ctxNow = Date2 && Date2.now !== root.Date.now && Date2.now, ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;
      var nativeCeil = Math2.ceil, nativeFloor = Math2.floor, nativeGetSymbols = Object2.getOwnPropertySymbols, nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined$1, nativeIsFinite = context.isFinite, nativeJoin = arrayProto.join, nativeKeys = overArg(Object2.keys, Object2), nativeMax = Math2.max, nativeMin = Math2.min, nativeNow = Date2.now, nativeParseInt = context.parseInt, nativeRandom = Math2.random, nativeReverse = arrayProto.reverse;
      var DataView = getNative(context, "DataView"), Map2 = getNative(context, "Map"), Promise2 = getNative(context, "Promise"), Set2 = getNative(context, "Set"), WeakMap = getNative(context, "WeakMap"), nativeCreate = getNative(Object2, "create");
      var metaMap = WeakMap && new WeakMap();
      var realNames = {};
      var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap);
      var symbolProto = Symbol2 ? Symbol2.prototype : undefined$1, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined$1, symbolToString = symbolProto ? symbolProto.toString : undefined$1;
      function lodash2(value) {
        if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
          if (value instanceof LodashWrapper) {
            return value;
          }
          if (hasOwnProperty.call(value, "__wrapped__")) {
            return wrapperClone(value);
          }
        }
        return new LodashWrapper(value);
      }
      var baseCreate = function() {
        function object() {
        }
        return function(proto) {
          if (!isObject2(proto)) {
            return {};
          }
          if (objectCreate) {
            return objectCreate(proto);
          }
          object.prototype = proto;
          var result2 = new object();
          object.prototype = undefined$1;
          return result2;
        };
      }();
      function baseLodash() {
      }
      function LodashWrapper(value, chainAll) {
        this.__wrapped__ = value;
        this.__actions__ = [];
        this.__chain__ = !!chainAll;
        this.__index__ = 0;
        this.__values__ = undefined$1;
      }
      lodash2.templateSettings = {
        "escape": reEscape,
        "evaluate": reEvaluate,
        "interpolate": reInterpolate,
        "variable": "",
        "imports": {
          "_": lodash2
        }
      };
      lodash2.prototype = baseLodash.prototype;
      lodash2.prototype.constructor = lodash2;
      LodashWrapper.prototype = baseCreate(baseLodash.prototype);
      LodashWrapper.prototype.constructor = LodashWrapper;
      function LazyWrapper(value) {
        this.__wrapped__ = value;
        this.__actions__ = [];
        this.__dir__ = 1;
        this.__filtered__ = false;
        this.__iteratees__ = [];
        this.__takeCount__ = MAX_ARRAY_LENGTH;
        this.__views__ = [];
      }
      function lazyClone() {
        var result2 = new LazyWrapper(this.__wrapped__);
        result2.__actions__ = copyArray(this.__actions__);
        result2.__dir__ = this.__dir__;
        result2.__filtered__ = this.__filtered__;
        result2.__iteratees__ = copyArray(this.__iteratees__);
        result2.__takeCount__ = this.__takeCount__;
        result2.__views__ = copyArray(this.__views__);
        return result2;
      }
      function lazyReverse() {
        if (this.__filtered__) {
          var result2 = new LazyWrapper(this);
          result2.__dir__ = -1;
          result2.__filtered__ = true;
        } else {
          result2 = this.clone();
          result2.__dir__ *= -1;
        }
        return result2;
      }
      function lazyValue() {
        var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
        if (!isArr || !isRight && arrLength == length && takeCount == length) {
          return baseWrapperValue(array, this.__actions__);
        }
        var result2 = [];
        outer:
          while (length-- && resIndex < takeCount) {
            index += dir;
            var iterIndex = -1, value = array[index];
            while (++iterIndex < iterLength) {
              var data = iteratees[iterIndex], iteratee2 = data.iteratee, type2 = data.type, computed = iteratee2(value);
              if (type2 == LAZY_MAP_FLAG) {
                value = computed;
              } else if (!computed) {
                if (type2 == LAZY_FILTER_FLAG) {
                  continue outer;
                } else {
                  break outer;
                }
              }
            }
            result2[resIndex++] = value;
          }
        return result2;
      }
      LazyWrapper.prototype = baseCreate(baseLodash.prototype);
      LazyWrapper.prototype.constructor = LazyWrapper;
      function Hash(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function hashClear() {
        this.__data__ = nativeCreate ? nativeCreate(null) : {};
        this.size = 0;
      }
      function hashDelete(key) {
        var result2 = this.has(key) && delete this.__data__[key];
        this.size -= result2 ? 1 : 0;
        return result2;
      }
      function hashGet(key) {
        var data = this.__data__;
        if (nativeCreate) {
          var result2 = data[key];
          return result2 === HASH_UNDEFINED ? undefined$1 : result2;
        }
        return hasOwnProperty.call(data, key) ? data[key] : undefined$1;
      }
      function hashHas(key) {
        var data = this.__data__;
        return nativeCreate ? data[key] !== undefined$1 : hasOwnProperty.call(data, key);
      }
      function hashSet(key, value) {
        var data = this.__data__;
        this.size += this.has(key) ? 0 : 1;
        data[key] = nativeCreate && value === undefined$1 ? HASH_UNDEFINED : value;
        return this;
      }
      Hash.prototype.clear = hashClear;
      Hash.prototype["delete"] = hashDelete;
      Hash.prototype.get = hashGet;
      Hash.prototype.has = hashHas;
      Hash.prototype.set = hashSet;
      function ListCache(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function listCacheClear() {
        this.__data__ = [];
        this.size = 0;
      }
      function listCacheDelete(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
          return false;
        }
        var lastIndex = data.length - 1;
        if (index == lastIndex) {
          data.pop();
        } else {
          splice.call(data, index, 1);
        }
        --this.size;
        return true;
      }
      function listCacheGet(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        return index < 0 ? undefined$1 : data[index][1];
      }
      function listCacheHas(key) {
        return assocIndexOf(this.__data__, key) > -1;
      }
      function listCacheSet(key, value) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
          ++this.size;
          data.push([key, value]);
        } else {
          data[index][1] = value;
        }
        return this;
      }
      ListCache.prototype.clear = listCacheClear;
      ListCache.prototype["delete"] = listCacheDelete;
      ListCache.prototype.get = listCacheGet;
      ListCache.prototype.has = listCacheHas;
      ListCache.prototype.set = listCacheSet;
      function MapCache(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function mapCacheClear() {
        this.size = 0;
        this.__data__ = {
          "hash": new Hash(),
          "map": new (Map2 || ListCache)(),
          "string": new Hash()
        };
      }
      function mapCacheDelete(key) {
        var result2 = getMapData(this, key)["delete"](key);
        this.size -= result2 ? 1 : 0;
        return result2;
      }
      function mapCacheGet(key) {
        return getMapData(this, key).get(key);
      }
      function mapCacheHas(key) {
        return getMapData(this, key).has(key);
      }
      function mapCacheSet(key, value) {
        var data = getMapData(this, key), size2 = data.size;
        data.set(key, value);
        this.size += data.size == size2 ? 0 : 1;
        return this;
      }
      MapCache.prototype.clear = mapCacheClear;
      MapCache.prototype["delete"] = mapCacheDelete;
      MapCache.prototype.get = mapCacheGet;
      MapCache.prototype.has = mapCacheHas;
      MapCache.prototype.set = mapCacheSet;
      function SetCache(values2) {
        var index = -1, length = values2 == null ? 0 : values2.length;
        this.__data__ = new MapCache();
        while (++index < length) {
          this.add(values2[index]);
        }
      }
      function setCacheAdd(value) {
        this.__data__.set(value, HASH_UNDEFINED);
        return this;
      }
      function setCacheHas(value) {
        return this.__data__.has(value);
      }
      SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
      SetCache.prototype.has = setCacheHas;
      function Stack(entries) {
        var data = this.__data__ = new ListCache(entries);
        this.size = data.size;
      }
      function stackClear() {
        this.__data__ = new ListCache();
        this.size = 0;
      }
      function stackDelete(key) {
        var data = this.__data__, result2 = data["delete"](key);
        this.size = data.size;
        return result2;
      }
      function stackGet(key) {
        return this.__data__.get(key);
      }
      function stackHas(key) {
        return this.__data__.has(key);
      }
      function stackSet(key, value) {
        var data = this.__data__;
        if (data instanceof ListCache) {
          var pairs2 = data.__data__;
          if (!Map2 || pairs2.length < LARGE_ARRAY_SIZE - 1) {
            pairs2.push([key, value]);
            this.size = ++data.size;
            return this;
          }
          data = this.__data__ = new MapCache(pairs2);
        }
        data.set(key, value);
        this.size = data.size;
        return this;
      }
      Stack.prototype.clear = stackClear;
      Stack.prototype["delete"] = stackDelete;
      Stack.prototype.get = stackGet;
      Stack.prototype.has = stackHas;
      Stack.prototype.set = stackSet;
      function arrayLikeKeys(value, inherited) {
        var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result2 = skipIndexes ? baseTimes(value.length, String2) : [], length = result2.length;
        for (var key in value) {
          if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) {
            result2.push(key);
          }
        }
        return result2;
      }
      function arraySample(array) {
        var length = array.length;
        return length ? array[baseRandom(0, length - 1)] : undefined$1;
      }
      function arraySampleSize(array, n) {
        return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
      }
      function arrayShuffle(array) {
        return shuffleSelf(copyArray(array));
      }
      function assignMergeValue(object, key, value) {
        if (value !== undefined$1 && !eq(object[key], value) || value === undefined$1 && !(key in object)) {
          baseAssignValue(object, key, value);
        }
      }
      function assignValue(object, key, value) {
        var objValue = object[key];
        if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined$1 && !(key in object)) {
          baseAssignValue(object, key, value);
        }
      }
      function assocIndexOf(array, key) {
        var length = array.length;
        while (length--) {
          if (eq(array[length][0], key)) {
            return length;
          }
        }
        return -1;
      }
      function baseAggregator(collection, setter, iteratee2, accumulator) {
        baseEach(collection, function(value, key, collection2) {
          setter(accumulator, value, iteratee2(value), collection2);
        });
        return accumulator;
      }
      function baseAssign(object, source) {
        return object && copyObject(source, keys(source), object);
      }
      function baseAssignIn(object, source) {
        return object && copyObject(source, keysIn(source), object);
      }
      function baseAssignValue(object, key, value) {
        if (key == "__proto__" && defineProperty) {
          defineProperty(object, key, {
            "configurable": true,
            "enumerable": true,
            "value": value,
            "writable": true
          });
        } else {
          object[key] = value;
        }
      }
      function baseAt(object, paths) {
        var index = -1, length = paths.length, result2 = Array2(length), skip = object == null;
        while (++index < length) {
          result2[index] = skip ? undefined$1 : get(object, paths[index]);
        }
        return result2;
      }
      function baseClamp(number, lower, upper) {
        if (number === number) {
          if (upper !== undefined$1) {
            number = number <= upper ? number : upper;
          }
          if (lower !== undefined$1) {
            number = number >= lower ? number : lower;
          }
        }
        return number;
      }
      function baseClone(value, bitmask, customizer, key, object, stack) {
        var result2, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
        if (customizer) {
          result2 = object ? customizer(value, key, object, stack) : customizer(value);
        }
        if (result2 !== undefined$1) {
          return result2;
        }
        if (!isObject2(value)) {
          return value;
        }
        var isArr = isArray(value);
        if (isArr) {
          result2 = initCloneArray(value);
          if (!isDeep) {
            return copyArray(value, result2);
          }
        } else {
          var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
          if (isBuffer(value)) {
            return cloneBuffer(value, isDeep);
          }
          if (tag == objectTag || tag == argsTag || isFunc && !object) {
            result2 = isFlat || isFunc ? {} : initCloneObject(value);
            if (!isDeep) {
              return isFlat ? copySymbolsIn(value, baseAssignIn(result2, value)) : copySymbols(value, baseAssign(result2, value));
            }
          } else {
            if (!cloneableTags[tag]) {
              return object ? value : {};
            }
            result2 = initCloneByTag(value, tag, isDeep);
          }
        }
        stack || (stack = new Stack());
        var stacked = stack.get(value);
        if (stacked) {
          return stacked;
        }
        stack.set(value, result2);
        if (isSet(value)) {
          value.forEach(function(subValue) {
            result2.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
          });
        } else if (isMap(value)) {
          value.forEach(function(subValue, key2) {
            result2.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
          });
        }
        var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
        var props = isArr ? undefined$1 : keysFunc(value);
        arrayEach(props || value, function(subValue, key2) {
          if (props) {
            key2 = subValue;
            subValue = value[key2];
          }
          assignValue(result2, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
        });
        return result2;
      }
      function baseConforms(source) {
        var props = keys(source);
        return function(object) {
          return baseConformsTo(object, source, props);
        };
      }
      function baseConformsTo(object, source, props) {
        var length = props.length;
        if (object == null) {
          return !length;
        }
        object = Object2(object);
        while (length--) {
          var key = props[length], predicate = source[key], value = object[key];
          if (value === undefined$1 && !(key in object) || !predicate(value)) {
            return false;
          }
        }
        return true;
      }
      function baseDelay(func, wait, args) {
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        return setTimeout2(function() {
          func.apply(undefined$1, args);
        }, wait);
      }
      function baseDifference(array, values2, iteratee2, comparator) {
        var index = -1, includes2 = arrayIncludes, isCommon = true, length = array.length, result2 = [], valuesLength = values2.length;
        if (!length) {
          return result2;
        }
        if (iteratee2) {
          values2 = arrayMap(values2, baseUnary(iteratee2));
        }
        if (comparator) {
          includes2 = arrayIncludesWith;
          isCommon = false;
        } else if (values2.length >= LARGE_ARRAY_SIZE) {
          includes2 = cacheHas;
          isCommon = false;
          values2 = new SetCache(values2);
        }
        outer:
          while (++index < length) {
            var value = array[index], computed = iteratee2 == null ? value : iteratee2(value);
            value = comparator || value !== 0 ? value : 0;
            if (isCommon && computed === computed) {
              var valuesIndex = valuesLength;
              while (valuesIndex--) {
                if (values2[valuesIndex] === computed) {
                  continue outer;
                }
              }
              result2.push(value);
            } else if (!includes2(values2, computed, comparator)) {
              result2.push(value);
            }
          }
        return result2;
      }
      var baseEach = createBaseEach(baseForOwn);
      var baseEachRight = createBaseEach(baseForOwnRight, true);
      function baseEvery(collection, predicate) {
        var result2 = true;
        baseEach(collection, function(value, index, collection2) {
          result2 = !!predicate(value, index, collection2);
          return result2;
        });
        return result2;
      }
      function baseExtremum(array, iteratee2, comparator) {
        var index = -1, length = array.length;
        while (++index < length) {
          var value = array[index], current = iteratee2(value);
          if (current != null && (computed === undefined$1 ? current === current && !isSymbol(current) : comparator(current, computed))) {
            var computed = current, result2 = value;
          }
        }
        return result2;
      }
      function baseFill(array, value, start, end) {
        var length = array.length;
        start = toInteger(start);
        if (start < 0) {
          start = -start > length ? 0 : length + start;
        }
        end = end === undefined$1 || end > length ? length : toInteger(end);
        if (end < 0) {
          end += length;
        }
        end = start > end ? 0 : toLength(end);
        while (start < end) {
          array[start++] = value;
        }
        return array;
      }
      function baseFilter(collection, predicate) {
        var result2 = [];
        baseEach(collection, function(value, index, collection2) {
          if (predicate(value, index, collection2)) {
            result2.push(value);
          }
        });
        return result2;
      }
      function baseFlatten(array, depth, predicate, isStrict, result2) {
        var index = -1, length = array.length;
        predicate || (predicate = isFlattenable);
        result2 || (result2 = []);
        while (++index < length) {
          var value = array[index];
          if (depth > 0 && predicate(value)) {
            if (depth > 1) {
              baseFlatten(value, depth - 1, predicate, isStrict, result2);
            } else {
              arrayPush(result2, value);
            }
          } else if (!isStrict) {
            result2[result2.length] = value;
          }
        }
        return result2;
      }
      var baseFor = createBaseFor();
      var baseForRight = createBaseFor(true);
      function baseForOwn(object, iteratee2) {
        return object && baseFor(object, iteratee2, keys);
      }
      function baseForOwnRight(object, iteratee2) {
        return object && baseForRight(object, iteratee2, keys);
      }
      function baseFunctions(object, props) {
        return arrayFilter(props, function(key) {
          return isFunction2(object[key]);
        });
      }
      function baseGet(object, path) {
        path = castPath(path, object);
        var index = 0, length = path.length;
        while (object != null && index < length) {
          object = object[toKey(path[index++])];
        }
        return index && index == length ? object : undefined$1;
      }
      function baseGetAllKeys(object, keysFunc, symbolsFunc) {
        var result2 = keysFunc(object);
        return isArray(object) ? result2 : arrayPush(result2, symbolsFunc(object));
      }
      function baseGetTag(value) {
        if (value == null) {
          return value === undefined$1 ? undefinedTag : nullTag;
        }
        return symToStringTag && symToStringTag in Object2(value) ? getRawTag(value) : objectToString(value);
      }
      function baseGt(value, other) {
        return value > other;
      }
      function baseHas(object, key) {
        return object != null && hasOwnProperty.call(object, key);
      }
      function baseHasIn(object, key) {
        return object != null && key in Object2(object);
      }
      function baseInRange(number, start, end) {
        return number >= nativeMin(start, end) && number < nativeMax(start, end);
      }
      function baseIntersection(arrays, iteratee2, comparator) {
        var includes2 = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array2(othLength), maxLength = Infinity, result2 = [];
        while (othIndex--) {
          var array = arrays[othIndex];
          if (othIndex && iteratee2) {
            array = arrayMap(array, baseUnary(iteratee2));
          }
          maxLength = nativeMin(array.length, maxLength);
          caches[othIndex] = !comparator && (iteratee2 || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined$1;
        }
        array = arrays[0];
        var index = -1, seen = caches[0];
        outer:
          while (++index < length && result2.length < maxLength) {
            var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
            value = comparator || value !== 0 ? value : 0;
            if (!(seen ? cacheHas(seen, computed) : includes2(result2, computed, comparator))) {
              othIndex = othLength;
              while (--othIndex) {
                var cache = caches[othIndex];
                if (!(cache ? cacheHas(cache, computed) : includes2(arrays[othIndex], computed, comparator))) {
                  continue outer;
                }
              }
              if (seen) {
                seen.push(computed);
              }
              result2.push(value);
            }
          }
        return result2;
      }
      function baseInverter(object, setter, iteratee2, accumulator) {
        baseForOwn(object, function(value, key, object2) {
          setter(accumulator, iteratee2(value), key, object2);
        });
        return accumulator;
      }
      function baseInvoke(object, path, args) {
        path = castPath(path, object);
        object = parent(object, path);
        var func = object == null ? object : object[toKey(last(path))];
        return func == null ? undefined$1 : apply(func, object, args);
      }
      function baseIsArguments(value) {
        return isObjectLike(value) && baseGetTag(value) == argsTag;
      }
      function baseIsArrayBuffer(value) {
        return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
      }
      function baseIsDate(value) {
        return isObjectLike(value) && baseGetTag(value) == dateTag;
      }
      function baseIsEqual(value, other, bitmask, customizer, stack) {
        if (value === other) {
          return true;
        }
        if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
          return value !== value && other !== other;
        }
        return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
      }
      function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
        var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
        objTag = objTag == argsTag ? objectTag : objTag;
        othTag = othTag == argsTag ? objectTag : othTag;
        var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
        if (isSameTag && isBuffer(object)) {
          if (!isBuffer(other)) {
            return false;
          }
          objIsArr = true;
          objIsObj = false;
        }
        if (isSameTag && !objIsObj) {
          stack || (stack = new Stack());
          return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
        }
        if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
          var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
          if (objIsWrapped || othIsWrapped) {
            var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
            stack || (stack = new Stack());
            return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
          }
        }
        if (!isSameTag) {
          return false;
        }
        stack || (stack = new Stack());
        return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
      }
      function baseIsMap(value) {
        return isObjectLike(value) && getTag(value) == mapTag;
      }
      function baseIsMatch(object, source, matchData, customizer) {
        var index = matchData.length, length = index, noCustomizer = !customizer;
        if (object == null) {
          return !length;
        }
        object = Object2(object);
        while (index--) {
          var data = matchData[index];
          if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
            return false;
          }
        }
        while (++index < length) {
          data = matchData[index];
          var key = data[0], objValue = object[key], srcValue = data[1];
          if (noCustomizer && data[2]) {
            if (objValue === undefined$1 && !(key in object)) {
              return false;
            }
          } else {
            var stack = new Stack();
            if (customizer) {
              var result2 = customizer(objValue, srcValue, key, object, source, stack);
            }
            if (!(result2 === undefined$1 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result2)) {
              return false;
            }
          }
        }
        return true;
      }
      function baseIsNative(value) {
        if (!isObject2(value) || isMasked(value)) {
          return false;
        }
        var pattern = isFunction2(value) ? reIsNative : reIsHostCtor;
        return pattern.test(toSource(value));
      }
      function baseIsRegExp(value) {
        return isObjectLike(value) && baseGetTag(value) == regexpTag;
      }
      function baseIsSet(value) {
        return isObjectLike(value) && getTag(value) == setTag;
      }
      function baseIsTypedArray(value) {
        return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
      }
      function baseIteratee(value) {
        if (typeof value == "function") {
          return value;
        }
        if (value == null) {
          return identity;
        }
        if (typeof value == "object") {
          return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
        }
        return property(value);
      }
      function baseKeys(object) {
        if (!isPrototype(object)) {
          return nativeKeys(object);
        }
        var result2 = [];
        for (var key in Object2(object)) {
          if (hasOwnProperty.call(object, key) && key != "constructor") {
            result2.push(key);
          }
        }
        return result2;
      }
      function baseKeysIn(object) {
        if (!isObject2(object)) {
          return nativeKeysIn(object);
        }
        var isProto = isPrototype(object), result2 = [];
        for (var key in object) {
          if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
            result2.push(key);
          }
        }
        return result2;
      }
      function baseLt(value, other) {
        return value < other;
      }
      function baseMap(collection, iteratee2) {
        var index = -1, result2 = isArrayLike(collection) ? Array2(collection.length) : [];
        baseEach(collection, function(value, key, collection2) {
          result2[++index] = iteratee2(value, key, collection2);
        });
        return result2;
      }
      function baseMatches(source) {
        var matchData = getMatchData(source);
        if (matchData.length == 1 && matchData[0][2]) {
          return matchesStrictComparable(matchData[0][0], matchData[0][1]);
        }
        return function(object) {
          return object === source || baseIsMatch(object, source, matchData);
        };
      }
      function baseMatchesProperty(path, srcValue) {
        if (isKey(path) && isStrictComparable(srcValue)) {
          return matchesStrictComparable(toKey(path), srcValue);
        }
        return function(object) {
          var objValue = get(object, path);
          return objValue === undefined$1 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
        };
      }
      function baseMerge(object, source, srcIndex, customizer, stack) {
        if (object === source) {
          return;
        }
        baseFor(source, function(srcValue, key) {
          stack || (stack = new Stack());
          if (isObject2(srcValue)) {
            baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
          } else {
            var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : undefined$1;
            if (newValue === undefined$1) {
              newValue = srcValue;
            }
            assignMergeValue(object, key, newValue);
          }
        }, keysIn);
      }
      function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
        var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
        if (stacked) {
          assignMergeValue(object, key, stacked);
          return;
        }
        var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined$1;
        var isCommon = newValue === undefined$1;
        if (isCommon) {
          var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
          newValue = srcValue;
          if (isArr || isBuff || isTyped) {
            if (isArray(objValue)) {
              newValue = objValue;
            } else if (isArrayLikeObject(objValue)) {
              newValue = copyArray(objValue);
            } else if (isBuff) {
              isCommon = false;
              newValue = cloneBuffer(srcValue, true);
            } else if (isTyped) {
              isCommon = false;
              newValue = cloneTypedArray(srcValue, true);
            } else {
              newValue = [];
            }
          } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
            newValue = objValue;
            if (isArguments(objValue)) {
              newValue = toPlainObject(objValue);
            } else if (!isObject2(objValue) || isFunction2(objValue)) {
              newValue = initCloneObject(srcValue);
            }
          } else {
            isCommon = false;
          }
        }
        if (isCommon) {
          stack.set(srcValue, newValue);
          mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
          stack["delete"](srcValue);
        }
        assignMergeValue(object, key, newValue);
      }
      function baseNth(array, n) {
        var length = array.length;
        if (!length) {
          return;
        }
        n += n < 0 ? length : 0;
        return isIndex(n, length) ? array[n] : undefined$1;
      }
      function baseOrderBy(collection, iteratees, orders) {
        if (iteratees.length) {
          iteratees = arrayMap(iteratees, function(iteratee2) {
            if (isArray(iteratee2)) {
              return function(value) {
                return baseGet(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
              };
            }
            return iteratee2;
          });
        } else {
          iteratees = [identity];
        }
        var index = -1;
        iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
        var result2 = baseMap(collection, function(value, key, collection2) {
          var criteria = arrayMap(iteratees, function(iteratee2) {
            return iteratee2(value);
          });
          return { "criteria": criteria, "index": ++index, "value": value };
        });
        return baseSortBy(result2, function(object, other) {
          return compareMultiple(object, other, orders);
        });
      }
      function basePick(object, paths) {
        return basePickBy(object, paths, function(value, path) {
          return hasIn(object, path);
        });
      }
      function basePickBy(object, paths, predicate) {
        var index = -1, length = paths.length, result2 = {};
        while (++index < length) {
          var path = paths[index], value = baseGet(object, path);
          if (predicate(value, path)) {
            baseSet(result2, castPath(path, object), value);
          }
        }
        return result2;
      }
      function basePropertyDeep(path) {
        return function(object) {
          return baseGet(object, path);
        };
      }
      function basePullAll(array, values2, iteratee2, comparator) {
        var indexOf2 = comparator ? baseIndexOfWith : baseIndexOf, index = -1, length = values2.length, seen = array;
        if (array === values2) {
          values2 = copyArray(values2);
        }
        if (iteratee2) {
          seen = arrayMap(array, baseUnary(iteratee2));
        }
        while (++index < length) {
          var fromIndex = 0, value = values2[index], computed = iteratee2 ? iteratee2(value) : value;
          while ((fromIndex = indexOf2(seen, computed, fromIndex, comparator)) > -1) {
            if (seen !== array) {
              splice.call(seen, fromIndex, 1);
            }
            splice.call(array, fromIndex, 1);
          }
        }
        return array;
      }
      function basePullAt(array, indexes) {
        var length = array ? indexes.length : 0, lastIndex = length - 1;
        while (length--) {
          var index = indexes[length];
          if (length == lastIndex || index !== previous) {
            var previous = index;
            if (isIndex(index)) {
              splice.call(array, index, 1);
            } else {
              baseUnset(array, index);
            }
          }
        }
        return array;
      }
      function baseRandom(lower, upper) {
        return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
      }
      function baseRange(start, end, step, fromRight) {
        var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result2 = Array2(length);
        while (length--) {
          result2[fromRight ? length : ++index] = start;
          start += step;
        }
        return result2;
      }
      function baseRepeat(string, n) {
        var result2 = "";
        if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
          return result2;
        }
        do {
          if (n % 2) {
            result2 += string;
          }
          n = nativeFloor(n / 2);
          if (n) {
            string += string;
          }
        } while (n);
        return result2;
      }
      function baseRest(func, start) {
        return setToString(overRest(func, start, identity), func + "");
      }
      function baseSample(collection) {
        return arraySample(values(collection));
      }
      function baseSampleSize(collection, n) {
        var array = values(collection);
        return shuffleSelf(array, baseClamp(n, 0, array.length));
      }
      function baseSet(object, path, value, customizer) {
        if (!isObject2(object)) {
          return object;
        }
        path = castPath(path, object);
        var index = -1, length = path.length, lastIndex = length - 1, nested = object;
        while (nested != null && ++index < length) {
          var key = toKey(path[index]), newValue = value;
          if (key === "__proto__" || key === "constructor" || key === "prototype") {
            return object;
          }
          if (index != lastIndex) {
            var objValue = nested[key];
            newValue = customizer ? customizer(objValue, key, nested) : undefined$1;
            if (newValue === undefined$1) {
              newValue = isObject2(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
            }
          }
          assignValue(nested, key, newValue);
          nested = nested[key];
        }
        return object;
      }
      var baseSetData = !metaMap ? identity : function(func, data) {
        metaMap.set(func, data);
        return func;
      };
      var baseSetToString = !defineProperty ? identity : function(func, string) {
        return defineProperty(func, "toString", {
          "configurable": true,
          "enumerable": false,
          "value": constant(string),
          "writable": true
        });
      };
      function baseShuffle(collection) {
        return shuffleSelf(values(collection));
      }
      function baseSlice(array, start, end) {
        var index = -1, length = array.length;
        if (start < 0) {
          start = -start > length ? 0 : length + start;
        }
        end = end > length ? length : end;
        if (end < 0) {
          end += length;
        }
        length = start > end ? 0 : end - start >>> 0;
        start >>>= 0;
        var result2 = Array2(length);
        while (++index < length) {
          result2[index] = array[index + start];
        }
        return result2;
      }
      function baseSome(collection, predicate) {
        var result2;
        baseEach(collection, function(value, index, collection2) {
          result2 = predicate(value, index, collection2);
          return !result2;
        });
        return !!result2;
      }
      function baseSortedIndex(array, value, retHighest) {
        var low = 0, high = array == null ? low : array.length;
        if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
          while (low < high) {
            var mid = low + high >>> 1, computed = array[mid];
            if (computed !== null && !isSymbol(computed) && (retHighest ? computed <= value : computed < value)) {
              low = mid + 1;
            } else {
              high = mid;
            }
          }
          return high;
        }
        return baseSortedIndexBy(array, value, identity, retHighest);
      }
      function baseSortedIndexBy(array, value, iteratee2, retHighest) {
        var low = 0, high = array == null ? 0 : array.length;
        if (high === 0) {
          return 0;
        }
        value = iteratee2(value);
        var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol(value), valIsUndefined = value === undefined$1;
        while (low < high) {
          var mid = nativeFloor((low + high) / 2), computed = iteratee2(array[mid]), othIsDefined = computed !== undefined$1, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol(computed);
          if (valIsNaN) {
            var setLow = retHighest || othIsReflexive;
          } else if (valIsUndefined) {
            setLow = othIsReflexive && (retHighest || othIsDefined);
          } else if (valIsNull) {
            setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
          } else if (valIsSymbol) {
            setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
          } else if (othIsNull || othIsSymbol) {
            setLow = false;
          } else {
            setLow = retHighest ? computed <= value : computed < value;
          }
          if (setLow) {
            low = mid + 1;
          } else {
            high = mid;
          }
        }
        return nativeMin(high, MAX_ARRAY_INDEX);
      }
      function baseSortedUniq(array, iteratee2) {
        var index = -1, length = array.length, resIndex = 0, result2 = [];
        while (++index < length) {
          var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
          if (!index || !eq(computed, seen)) {
            var seen = computed;
            result2[resIndex++] = value === 0 ? 0 : value;
          }
        }
        return result2;
      }
      function baseToNumber(value) {
        if (typeof value == "number") {
          return value;
        }
        if (isSymbol(value)) {
          return NAN;
        }
        return +value;
      }
      function baseToString(value) {
        if (typeof value == "string") {
          return value;
        }
        if (isArray(value)) {
          return arrayMap(value, baseToString) + "";
        }
        if (isSymbol(value)) {
          return symbolToString ? symbolToString.call(value) : "";
        }
        var result2 = value + "";
        return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
      }
      function baseUniq(array, iteratee2, comparator) {
        var index = -1, includes2 = arrayIncludes, length = array.length, isCommon = true, result2 = [], seen = result2;
        if (comparator) {
          isCommon = false;
          includes2 = arrayIncludesWith;
        } else if (length >= LARGE_ARRAY_SIZE) {
          var set3 = iteratee2 ? null : createSet(array);
          if (set3) {
            return setToArray(set3);
          }
          isCommon = false;
          includes2 = cacheHas;
          seen = new SetCache();
        } else {
          seen = iteratee2 ? [] : result2;
        }
        outer:
          while (++index < length) {
            var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
            value = comparator || value !== 0 ? value : 0;
            if (isCommon && computed === computed) {
              var seenIndex = seen.length;
              while (seenIndex--) {
                if (seen[seenIndex] === computed) {
                  continue outer;
                }
              }
              if (iteratee2) {
                seen.push(computed);
              }
              result2.push(value);
            } else if (!includes2(seen, computed, comparator)) {
              if (seen !== result2) {
                seen.push(computed);
              }
              result2.push(value);
            }
          }
        return result2;
      }
      function baseUnset(object, path) {
        path = castPath(path, object);
        object = parent(object, path);
        return object == null || delete object[toKey(last(path))];
      }
      function baseUpdate(object, path, updater, customizer) {
        return baseSet(object, path, updater(baseGet(object, path)), customizer);
      }
      function baseWhile(array, predicate, isDrop, fromRight) {
        var length = array.length, index = fromRight ? length : -1;
        while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {
        }
        return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
      }
      function baseWrapperValue(value, actions) {
        var result2 = value;
        if (result2 instanceof LazyWrapper) {
          result2 = result2.value();
        }
        return arrayReduce(actions, function(result3, action) {
          return action.func.apply(action.thisArg, arrayPush([result3], action.args));
        }, result2);
      }
      function baseXor(arrays, iteratee2, comparator) {
        var length = arrays.length;
        if (length < 2) {
          return length ? baseUniq(arrays[0]) : [];
        }
        var index = -1, result2 = Array2(length);
        while (++index < length) {
          var array = arrays[index], othIndex = -1;
          while (++othIndex < length) {
            if (othIndex != index) {
              result2[index] = baseDifference(result2[index] || array, arrays[othIndex], iteratee2, comparator);
            }
          }
        }
        return baseUniq(baseFlatten(result2, 1), iteratee2, comparator);
      }
      function baseZipObject(props, values2, assignFunc) {
        var index = -1, length = props.length, valsLength = values2.length, result2 = {};
        while (++index < length) {
          var value = index < valsLength ? values2[index] : undefined$1;
          assignFunc(result2, props[index], value);
        }
        return result2;
      }
      function castArrayLikeObject(value) {
        return isArrayLikeObject(value) ? value : [];
      }
      function castFunction(value) {
        return typeof value == "function" ? value : identity;
      }
      function castPath(value, object) {
        if (isArray(value)) {
          return value;
        }
        return isKey(value, object) ? [value] : stringToPath(toString4(value));
      }
      var castRest = baseRest;
      function castSlice(array, start, end) {
        var length = array.length;
        end = end === undefined$1 ? length : end;
        return !start && end >= length ? array : baseSlice(array, start, end);
      }
      var clearTimeout2 = ctxClearTimeout || function(id) {
        return root.clearTimeout(id);
      };
      function cloneBuffer(buffer, isDeep) {
        if (isDeep) {
          return buffer.slice();
        }
        var length = buffer.length, result2 = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
        buffer.copy(result2);
        return result2;
      }
      function cloneArrayBuffer(arrayBuffer) {
        var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
        new Uint8Array(result2).set(new Uint8Array(arrayBuffer));
        return result2;
      }
      function cloneDataView(dataView, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
        return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
      }
      function cloneRegExp(regexp2) {
        var result2 = new regexp2.constructor(regexp2.source, reFlags.exec(regexp2));
        result2.lastIndex = regexp2.lastIndex;
        return result2;
      }
      function cloneSymbol(symbol) {
        return symbolValueOf ? Object2(symbolValueOf.call(symbol)) : {};
      }
      function cloneTypedArray(typedArray, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
        return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
      }
      function compareAscending(value, other) {
        if (value !== other) {
          var valIsDefined = value !== undefined$1, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
          var othIsDefined = other !== undefined$1, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
          if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
            return 1;
          }
          if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
            return -1;
          }
        }
        return 0;
      }
      function compareMultiple(object, other, orders) {
        var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
        while (++index < length) {
          var result2 = compareAscending(objCriteria[index], othCriteria[index]);
          if (result2) {
            if (index >= ordersLength) {
              return result2;
            }
            var order = orders[index];
            return result2 * (order == "desc" ? -1 : 1);
          }
        }
        return object.index - other.index;
      }
      function composeArgs(args, partials, holders, isCurried) {
        var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(leftLength + rangeLength), isUncurried = !isCurried;
        while (++leftIndex < leftLength) {
          result2[leftIndex] = partials[leftIndex];
        }
        while (++argsIndex < holdersLength) {
          if (isUncurried || argsIndex < argsLength) {
            result2[holders[argsIndex]] = args[argsIndex];
          }
        }
        while (rangeLength--) {
          result2[leftIndex++] = args[argsIndex++];
        }
        return result2;
      }
      function composeArgsRight(args, partials, holders, isCurried) {
        var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(rangeLength + rightLength), isUncurried = !isCurried;
        while (++argsIndex < rangeLength) {
          result2[argsIndex] = args[argsIndex];
        }
        var offset = argsIndex;
        while (++rightIndex < rightLength) {
          result2[offset + rightIndex] = partials[rightIndex];
        }
        while (++holdersIndex < holdersLength) {
          if (isUncurried || argsIndex < argsLength) {
            result2[offset + holders[holdersIndex]] = args[argsIndex++];
          }
        }
        return result2;
      }
      function copyArray(source, array) {
        var index = -1, length = source.length;
        array || (array = Array2(length));
        while (++index < length) {
          array[index] = source[index];
        }
        return array;
      }
      function copyObject(source, props, object, customizer) {
        var isNew = !object;
        object || (object = {});
        var index = -1, length = props.length;
        while (++index < length) {
          var key = props[index];
          var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined$1;
          if (newValue === undefined$1) {
            newValue = source[key];
          }
          if (isNew) {
            baseAssignValue(object, key, newValue);
          } else {
            assignValue(object, key, newValue);
          }
        }
        return object;
      }
      function copySymbols(source, object) {
        return copyObject(source, getSymbols(source), object);
      }
      function copySymbolsIn(source, object) {
        return copyObject(source, getSymbolsIn(source), object);
      }
      function createAggregator(setter, initializer) {
        return function(collection, iteratee2) {
          var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
          return func(collection, setter, getIteratee(iteratee2, 2), accumulator);
        };
      }
      function createAssigner(assigner) {
        return baseRest(function(object, sources) {
          var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined$1, guard = length > 2 ? sources[2] : undefined$1;
          customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined$1;
          if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            customizer = length < 3 ? undefined$1 : customizer;
            length = 1;
          }
          object = Object2(object);
          while (++index < length) {
            var source = sources[index];
            if (source) {
              assigner(object, source, index, customizer);
            }
          }
          return object;
        });
      }
      function createBaseEach(eachFunc, fromRight) {
        return function(collection, iteratee2) {
          if (collection == null) {
            return collection;
          }
          if (!isArrayLike(collection)) {
            return eachFunc(collection, iteratee2);
          }
          var length = collection.length, index = fromRight ? length : -1, iterable = Object2(collection);
          while (fromRight ? index-- : ++index < length) {
            if (iteratee2(iterable[index], index, iterable) === false) {
              break;
            }
          }
          return collection;
        };
      }
      function createBaseFor(fromRight) {
        return function(object, iteratee2, keysFunc) {
          var index = -1, iterable = Object2(object), props = keysFunc(object), length = props.length;
          while (length--) {
            var key = props[fromRight ? length : ++index];
            if (iteratee2(iterable[key], key, iterable) === false) {
              break;
            }
          }
          return object;
        };
      }
      function createBind(func, bitmask, thisArg) {
        var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
        function wrapper() {
          var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
          return fn.apply(isBind ? thisArg : this, arguments);
        }
        return wrapper;
      }
      function createCaseFirst(methodName) {
        return function(string) {
          string = toString4(string);
          var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined$1;
          var chr = strSymbols ? strSymbols[0] : string.charAt(0);
          var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
          return chr[methodName]() + trailing;
        };
      }
      function createCompounder(callback) {
        return function(string) {
          return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
        };
      }
      function createCtor(Ctor) {
        return function() {
          var args = arguments;
          switch (args.length) {
            case 0:
              return new Ctor();
            case 1:
              return new Ctor(args[0]);
            case 2:
              return new Ctor(args[0], args[1]);
            case 3:
              return new Ctor(args[0], args[1], args[2]);
            case 4:
              return new Ctor(args[0], args[1], args[2], args[3]);
            case 5:
              return new Ctor(args[0], args[1], args[2], args[3], args[4]);
            case 6:
              return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
            case 7:
              return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
          }
          var thisBinding = baseCreate(Ctor.prototype), result2 = Ctor.apply(thisBinding, args);
          return isObject2(result2) ? result2 : thisBinding;
        };
      }
      function createCurry(func, bitmask, arity) {
        var Ctor = createCtor(func);
        function wrapper() {
          var length = arguments.length, args = Array2(length), index = length, placeholder = getHolder(wrapper);
          while (index--) {
            args[index] = arguments[index];
          }
          var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
          length -= holders.length;
          if (length < arity) {
            return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, undefined$1, args, holders, undefined$1, undefined$1, arity - length);
          }
          var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
          return apply(fn, this, args);
        }
        return wrapper;
      }
      function createFind(findIndexFunc) {
        return function(collection, predicate, fromIndex) {
          var iterable = Object2(collection);
          if (!isArrayLike(collection)) {
            var iteratee2 = getIteratee(predicate, 3);
            collection = keys(collection);
            predicate = function(key) {
              return iteratee2(iterable[key], key, iterable);
            };
          }
          var index = findIndexFunc(collection, predicate, fromIndex);
          return index > -1 ? iterable[iteratee2 ? collection[index] : index] : undefined$1;
        };
      }
      function createFlow(fromRight) {
        return flatRest(function(funcs) {
          var length = funcs.length, index = length, prereq = LodashWrapper.prototype.thru;
          if (fromRight) {
            funcs.reverse();
          }
          while (index--) {
            var func = funcs[index];
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            if (prereq && !wrapper && getFuncName(func) == "wrapper") {
              var wrapper = new LodashWrapper([], true);
            }
          }
          index = wrapper ? index : length;
          while (++index < length) {
            func = funcs[index];
            var funcName = getFuncName(func), data = funcName == "wrapper" ? getData(func) : undefined$1;
            if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
              wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
            } else {
              wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
            }
          }
          return function() {
            var args = arguments, value = args[0];
            if (wrapper && args.length == 1 && isArray(value)) {
              return wrapper.plant(value).value();
            }
            var index2 = 0, result2 = length ? funcs[index2].apply(this, args) : value;
            while (++index2 < length) {
              result2 = funcs[index2].call(this, result2);
            }
            return result2;
          };
        });
      }
      function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
        var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined$1 : createCtor(func);
        function wrapper() {
          var length = arguments.length, args = Array2(length), index = length;
          while (index--) {
            args[index] = arguments[index];
          }
          if (isCurried) {
            var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
          }
          if (partials) {
            args = composeArgs(args, partials, holders, isCurried);
          }
          if (partialsRight) {
            args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
          }
          length -= holdersCount;
          if (isCurried && length < arity) {
            var newHolders = replaceHolders(args, placeholder);
            return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, thisArg, args, newHolders, argPos, ary2, arity - length);
          }
          var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
          length = args.length;
          if (argPos) {
            args = reorder(args, argPos);
          } else if (isFlip && length > 1) {
            args.reverse();
          }
          if (isAry && ary2 < length) {
            args.length = ary2;
          }
          if (this && this !== root && this instanceof wrapper) {
            fn = Ctor || createCtor(fn);
          }
          return fn.apply(thisBinding, args);
        }
        return wrapper;
      }
      function createInverter(setter, toIteratee) {
        return function(object, iteratee2) {
          return baseInverter(object, setter, toIteratee(iteratee2), {});
        };
      }
      function createMathOperation(operator, defaultValue) {
        return function(value, other) {
          var result2;
          if (value === undefined$1 && other === undefined$1) {
            return defaultValue;
          }
          if (value !== undefined$1) {
            result2 = value;
          }
          if (other !== undefined$1) {
            if (result2 === undefined$1) {
              return other;
            }
            if (typeof value == "string" || typeof other == "string") {
              value = baseToString(value);
              other = baseToString(other);
            } else {
              value = baseToNumber(value);
              other = baseToNumber(other);
            }
            result2 = operator(value, other);
          }
          return result2;
        };
      }
      function createOver(arrayFunc) {
        return flatRest(function(iteratees) {
          iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
          return baseRest(function(args) {
            var thisArg = this;
            return arrayFunc(iteratees, function(iteratee2) {
              return apply(iteratee2, thisArg, args);
            });
          });
        });
      }
      function createPadding(length, chars) {
        chars = chars === undefined$1 ? " " : baseToString(chars);
        var charsLength = chars.length;
        if (charsLength < 2) {
          return charsLength ? baseRepeat(chars, length) : chars;
        }
        var result2 = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
        return hasUnicode(chars) ? castSlice(stringToArray(result2), 0, length).join("") : result2.slice(0, length);
      }
      function createPartial(func, bitmask, thisArg, partials) {
        var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
        function wrapper() {
          var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array2(leftLength + argsLength), fn = this && this !== root && this instanceof wrapper ? Ctor : func;
          while (++leftIndex < leftLength) {
            args[leftIndex] = partials[leftIndex];
          }
          while (argsLength--) {
            args[leftIndex++] = arguments[++argsIndex];
          }
          return apply(fn, isBind ? thisArg : this, args);
        }
        return wrapper;
      }
      function createRange(fromRight) {
        return function(start, end, step) {
          if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
            end = step = undefined$1;
          }
          start = toFinite(start);
          if (end === undefined$1) {
            end = start;
            start = 0;
          } else {
            end = toFinite(end);
          }
          step = step === undefined$1 ? start < end ? 1 : -1 : toFinite(step);
          return baseRange(start, end, step, fromRight);
        };
      }
      function createRelationalOperation(operator) {
        return function(value, other) {
          if (!(typeof value == "string" && typeof other == "string")) {
            value = toNumber(value);
            other = toNumber(other);
          }
          return operator(value, other);
        };
      }
      function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
        var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined$1, newHoldersRight = isCurry ? undefined$1 : holders, newPartials = isCurry ? partials : undefined$1, newPartialsRight = isCurry ? undefined$1 : partials;
        bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
        bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
        if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
          bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
        }
        var newData = [
          func,
          bitmask,
          thisArg,
          newPartials,
          newHolders,
          newPartialsRight,
          newHoldersRight,
          argPos,
          ary2,
          arity
        ];
        var result2 = wrapFunc.apply(undefined$1, newData);
        if (isLaziable(func)) {
          setData(result2, newData);
        }
        result2.placeholder = placeholder;
        return setWrapToString(result2, func, bitmask);
      }
      function createRound(methodName) {
        var func = Math2[methodName];
        return function(number, precision) {
          number = toNumber(number);
          precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
          if (precision && nativeIsFinite(number)) {
            var pair = (toString4(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
            pair = (toString4(value) + "e").split("e");
            return +(pair[0] + "e" + (+pair[1] - precision));
          }
          return func(number);
        };
      }
      var createSet = !(Set2 && 1 / setToArray(new Set2([, -0]))[1] == INFINITY) ? noop : function(values2) {
        return new Set2(values2);
      };
      function createToPairs(keysFunc) {
        return function(object) {
          var tag = getTag(object);
          if (tag == mapTag) {
            return mapToArray(object);
          }
          if (tag == setTag) {
            return setToPairs(object);
          }
          return baseToPairs(object, keysFunc(object));
        };
      }
      function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
        var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
        if (!isBindKey && typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        var length = partials ? partials.length : 0;
        if (!length) {
          bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
          partials = holders = undefined$1;
        }
        ary2 = ary2 === undefined$1 ? ary2 : nativeMax(toInteger(ary2), 0);
        arity = arity === undefined$1 ? arity : toInteger(arity);
        length -= holders ? holders.length : 0;
        if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
          var partialsRight = partials, holdersRight = holders;
          partials = holders = undefined$1;
        }
        var data = isBindKey ? undefined$1 : getData(func);
        var newData = [
          func,
          bitmask,
          thisArg,
          partials,
          holders,
          partialsRight,
          holdersRight,
          argPos,
          ary2,
          arity
        ];
        if (data) {
          mergeData(newData, data);
        }
        func = newData[0];
        bitmask = newData[1];
        thisArg = newData[2];
        partials = newData[3];
        holders = newData[4];
        arity = newData[9] = newData[9] === undefined$1 ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);
        if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
          bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
        }
        if (!bitmask || bitmask == WRAP_BIND_FLAG) {
          var result2 = createBind(func, bitmask, thisArg);
        } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
          result2 = createCurry(func, bitmask, arity);
        } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
          result2 = createPartial(func, bitmask, thisArg, partials);
        } else {
          result2 = createHybrid.apply(undefined$1, newData);
        }
        var setter = data ? baseSetData : setData;
        return setWrapToString(setter(result2, newData), func, bitmask);
      }
      function customDefaultsAssignIn(objValue, srcValue, key, object) {
        if (objValue === undefined$1 || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
          return srcValue;
        }
        return objValue;
      }
      function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
        if (isObject2(objValue) && isObject2(srcValue)) {
          stack.set(srcValue, objValue);
          baseMerge(objValue, srcValue, undefined$1, customDefaultsMerge, stack);
          stack["delete"](srcValue);
        }
        return objValue;
      }
      function customOmitClone(value) {
        return isPlainObject(value) ? undefined$1 : value;
      }
      function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
        if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
          return false;
        }
        var arrStacked = stack.get(array);
        var othStacked = stack.get(other);
        if (arrStacked && othStacked) {
          return arrStacked == other && othStacked == array;
        }
        var index = -1, result2 = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined$1;
        stack.set(array, other);
        stack.set(other, array);
        while (++index < arrLength) {
          var arrValue = array[index], othValue = other[index];
          if (customizer) {
            var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
          }
          if (compared !== undefined$1) {
            if (compared) {
              continue;
            }
            result2 = false;
            break;
          }
          if (seen) {
            if (!arraySome(other, function(othValue2, othIndex) {
              if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                return seen.push(othIndex);
              }
            })) {
              result2 = false;
              break;
            }
          } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
            result2 = false;
            break;
          }
        }
        stack["delete"](array);
        stack["delete"](other);
        return result2;
      }
      function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
        switch (tag) {
          case dataViewTag:
            if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
              return false;
            }
            object = object.buffer;
            other = other.buffer;
          case arrayBufferTag:
            if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
              return false;
            }
            return true;
          case boolTag:
          case dateTag:
          case numberTag:
            return eq(+object, +other);
          case errorTag:
            return object.name == other.name && object.message == other.message;
          case regexpTag:
          case stringTag:
            return object == other + "";
          case mapTag:
            var convert = mapToArray;
          case setTag:
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
            convert || (convert = setToArray);
            if (object.size != other.size && !isPartial) {
              return false;
            }
            var stacked = stack.get(object);
            if (stacked) {
              return stacked == other;
            }
            bitmask |= COMPARE_UNORDERED_FLAG;
            stack.set(object, other);
            var result2 = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
            stack["delete"](object);
            return result2;
          case symbolTag:
            if (symbolValueOf) {
              return symbolValueOf.call(object) == symbolValueOf.call(other);
            }
        }
        return false;
      }
      function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
        if (objLength != othLength && !isPartial) {
          return false;
        }
        var index = objLength;
        while (index--) {
          var key = objProps[index];
          if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
            return false;
          }
        }
        var objStacked = stack.get(object);
        var othStacked = stack.get(other);
        if (objStacked && othStacked) {
          return objStacked == other && othStacked == object;
        }
        var result2 = true;
        stack.set(object, other);
        stack.set(other, object);
        var skipCtor = isPartial;
        while (++index < objLength) {
          key = objProps[index];
          var objValue = object[key], othValue = other[key];
          if (customizer) {
            var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
          }
          if (!(compared === undefined$1 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
            result2 = false;
            break;
          }
          skipCtor || (skipCtor = key == "constructor");
        }
        if (result2 && !skipCtor) {
          var objCtor = object.constructor, othCtor = other.constructor;
          if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
            result2 = false;
          }
        }
        stack["delete"](object);
        stack["delete"](other);
        return result2;
      }
      function flatRest(func) {
        return setToString(overRest(func, undefined$1, flatten), func + "");
      }
      function getAllKeys(object) {
        return baseGetAllKeys(object, keys, getSymbols);
      }
      function getAllKeysIn(object) {
        return baseGetAllKeys(object, keysIn, getSymbolsIn);
      }
      var getData = !metaMap ? noop : function(func) {
        return metaMap.get(func);
      };
      function getFuncName(func) {
        var result2 = func.name + "", array = realNames[result2], length = hasOwnProperty.call(realNames, result2) ? array.length : 0;
        while (length--) {
          var data = array[length], otherFunc = data.func;
          if (otherFunc == null || otherFunc == func) {
            return data.name;
          }
        }
        return result2;
      }
      function getHolder(func) {
        var object = hasOwnProperty.call(lodash2, "placeholder") ? lodash2 : func;
        return object.placeholder;
      }
      function getIteratee() {
        var result2 = lodash2.iteratee || iteratee;
        result2 = result2 === iteratee ? baseIteratee : result2;
        return arguments.length ? result2(arguments[0], arguments[1]) : result2;
      }
      function getMapData(map3, key) {
        var data = map3.__data__;
        return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
      }
      function getMatchData(object) {
        var result2 = keys(object), length = result2.length;
        while (length--) {
          var key = result2[length], value = object[key];
          result2[length] = [key, value, isStrictComparable(value)];
        }
        return result2;
      }
      function getNative(object, key) {
        var value = getValue(object, key);
        return baseIsNative(value) ? value : undefined$1;
      }
      function getRawTag(value) {
        var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
        try {
          value[symToStringTag] = undefined$1;
          var unmasked = true;
        } catch (e) {
        }
        var result2 = nativeObjectToString.call(value);
        if (unmasked) {
          if (isOwn) {
            value[symToStringTag] = tag;
          } else {
            delete value[symToStringTag];
          }
        }
        return result2;
      }
      var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
        if (object == null) {
          return [];
        }
        object = Object2(object);
        return arrayFilter(nativeGetSymbols(object), function(symbol) {
          return propertyIsEnumerable.call(object, symbol);
        });
      };
      var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
        var result2 = [];
        while (object) {
          arrayPush(result2, getSymbols(object));
          object = getPrototype(object);
        }
        return result2;
      };
      var getTag = baseGetTag;
      if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
        getTag = function(value) {
          var result2 = baseGetTag(value), Ctor = result2 == objectTag ? value.constructor : undefined$1, ctorString = Ctor ? toSource(Ctor) : "";
          if (ctorString) {
            switch (ctorString) {
              case dataViewCtorString:
                return dataViewTag;
              case mapCtorString:
                return mapTag;
              case promiseCtorString:
                return promiseTag;
              case setCtorString:
                return setTag;
              case weakMapCtorString:
                return weakMapTag;
            }
          }
          return result2;
        };
      }
      function getView(start, end, transforms) {
        var index = -1, length = transforms.length;
        while (++index < length) {
          var data = transforms[index], size2 = data.size;
          switch (data.type) {
            case "drop":
              start += size2;
              break;
            case "dropRight":
              end -= size2;
              break;
            case "take":
              end = nativeMin(end, start + size2);
              break;
            case "takeRight":
              start = nativeMax(start, end - size2);
              break;
          }
        }
        return { "start": start, "end": end };
      }
      function getWrapDetails(source) {
        var match = source.match(reWrapDetails);
        return match ? match[1].split(reSplitDetails) : [];
      }
      function hasPath(object, path, hasFunc) {
        path = castPath(path, object);
        var index = -1, length = path.length, result2 = false;
        while (++index < length) {
          var key = toKey(path[index]);
          if (!(result2 = object != null && hasFunc(object, key))) {
            break;
          }
          object = object[key];
        }
        if (result2 || ++index != length) {
          return result2;
        }
        length = object == null ? 0 : object.length;
        return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
      }
      function initCloneArray(array) {
        var length = array.length, result2 = new array.constructor(length);
        if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
          result2.index = array.index;
          result2.input = array.input;
        }
        return result2;
      }
      function initCloneObject(object) {
        return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
      }
      function initCloneByTag(object, tag, isDeep) {
        var Ctor = object.constructor;
        switch (tag) {
          case arrayBufferTag:
            return cloneArrayBuffer(object);
          case boolTag:
          case dateTag:
            return new Ctor(+object);
          case dataViewTag:
            return cloneDataView(object, isDeep);
          case float32Tag:
          case float64Tag:
          case int8Tag:
          case int16Tag:
          case int32Tag:
          case uint8Tag:
          case uint8ClampedTag:
          case uint16Tag:
          case uint32Tag:
            return cloneTypedArray(object, isDeep);
          case mapTag:
            return new Ctor();
          case numberTag:
          case stringTag:
            return new Ctor(object);
          case regexpTag:
            return cloneRegExp(object);
          case setTag:
            return new Ctor();
          case symbolTag:
            return cloneSymbol(object);
        }
      }
      function insertWrapDetails(source, details) {
        var length = details.length;
        if (!length) {
          return source;
        }
        var lastIndex = length - 1;
        details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
        details = details.join(length > 2 ? ", " : " ");
        return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
      }
      function isFlattenable(value) {
        return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
      }
      function isIndex(value, length) {
        var type2 = typeof value;
        length = length == null ? MAX_SAFE_INTEGER : length;
        return !!length && (type2 == "number" || type2 != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
      }
      function isIterateeCall(value, index, object) {
        if (!isObject2(object)) {
          return false;
        }
        var type2 = typeof index;
        if (type2 == "number" ? isArrayLike(object) && isIndex(index, object.length) : type2 == "string" && index in object) {
          return eq(object[index], value);
        }
        return false;
      }
      function isKey(value, object) {
        if (isArray(value)) {
          return false;
        }
        var type2 = typeof value;
        if (type2 == "number" || type2 == "symbol" || type2 == "boolean" || value == null || isSymbol(value)) {
          return true;
        }
        return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object2(object);
      }
      function isKeyable(value) {
        var type2 = typeof value;
        return type2 == "string" || type2 == "number" || type2 == "symbol" || type2 == "boolean" ? value !== "__proto__" : value === null;
      }
      function isLaziable(func) {
        var funcName = getFuncName(func), other = lodash2[funcName];
        if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
          return false;
        }
        if (func === other) {
          return true;
        }
        var data = getData(other);
        return !!data && func === data[0];
      }
      function isMasked(func) {
        return !!maskSrcKey && maskSrcKey in func;
      }
      var isMaskable = coreJsData ? isFunction2 : stubFalse;
      function isPrototype(value) {
        var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
        return value === proto;
      }
      function isStrictComparable(value) {
        return value === value && !isObject2(value);
      }
      function matchesStrictComparable(key, srcValue) {
        return function(object) {
          if (object == null) {
            return false;
          }
          return object[key] === srcValue && (srcValue !== undefined$1 || key in Object2(object));
        };
      }
      function memoizeCapped(func) {
        var result2 = memoize(func, function(key) {
          if (cache.size === MAX_MEMOIZE_SIZE) {
            cache.clear();
          }
          return key;
        });
        var cache = result2.cache;
        return result2;
      }
      function mergeData(data, source) {
        var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
        var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
        if (!(isCommon || isCombo)) {
          return data;
        }
        if (srcBitmask & WRAP_BIND_FLAG) {
          data[2] = source[2];
          newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
        }
        var value = source[3];
        if (value) {
          var partials = data[3];
          data[3] = partials ? composeArgs(partials, value, source[4]) : value;
          data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
        }
        value = source[5];
        if (value) {
          partials = data[5];
          data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
          data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
        }
        value = source[7];
        if (value) {
          data[7] = value;
        }
        if (srcBitmask & WRAP_ARY_FLAG) {
          data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
        }
        if (data[9] == null) {
          data[9] = source[9];
        }
        data[0] = source[0];
        data[1] = newBitmask;
        return data;
      }
      function nativeKeysIn(object) {
        var result2 = [];
        if (object != null) {
          for (var key in Object2(object)) {
            result2.push(key);
          }
        }
        return result2;
      }
      function objectToString(value) {
        return nativeObjectToString.call(value);
      }
      function overRest(func, start, transform2) {
        start = nativeMax(start === undefined$1 ? func.length - 1 : start, 0);
        return function() {
          var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array2(length);
          while (++index < length) {
            array[index] = args[start + index];
          }
          index = -1;
          var otherArgs = Array2(start + 1);
          while (++index < start) {
            otherArgs[index] = args[index];
          }
          otherArgs[start] = transform2(array);
          return apply(func, this, otherArgs);
        };
      }
      function parent(object, path) {
        return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
      }
      function reorder(array, indexes) {
        var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array);
        while (length--) {
          var index = indexes[length];
          array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined$1;
        }
        return array;
      }
      function safeGet(object, key) {
        if (key === "constructor" && typeof object[key] === "function") {
          return;
        }
        if (key == "__proto__") {
          return;
        }
        return object[key];
      }
      var setData = shortOut(baseSetData);
      var setTimeout2 = ctxSetTimeout || function(func, wait) {
        return root.setTimeout(func, wait);
      };
      var setToString = shortOut(baseSetToString);
      function setWrapToString(wrapper, reference, bitmask) {
        var source = reference + "";
        return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
      }
      function shortOut(func) {
        var count = 0, lastCalled = 0;
        return function() {
          var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
          lastCalled = stamp;
          if (remaining > 0) {
            if (++count >= HOT_COUNT) {
              return arguments[0];
            }
          } else {
            count = 0;
          }
          return func.apply(undefined$1, arguments);
        };
      }
      function shuffleSelf(array, size2) {
        var index = -1, length = array.length, lastIndex = length - 1;
        size2 = size2 === undefined$1 ? length : size2;
        while (++index < size2) {
          var rand = baseRandom(index, lastIndex), value = array[rand];
          array[rand] = array[index];
          array[index] = value;
        }
        array.length = size2;
        return array;
      }
      var stringToPath = memoizeCapped(function(string) {
        var result2 = [];
        if (string.charCodeAt(0) === 46) {
          result2.push("");
        }
        string.replace(rePropName, function(match, number, quote, subString) {
          result2.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
        });
        return result2;
      });
      function toKey(value) {
        if (typeof value == "string" || isSymbol(value)) {
          return value;
        }
        var result2 = value + "";
        return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
      }
      function toSource(func) {
        if (func != null) {
          try {
            return funcToString.call(func);
          } catch (e) {
          }
          try {
            return func + "";
          } catch (e) {
          }
        }
        return "";
      }
      function updateWrapDetails(details, bitmask) {
        arrayEach(wrapFlags, function(pair) {
          var value = "_." + pair[0];
          if (bitmask & pair[1] && !arrayIncludes(details, value)) {
            details.push(value);
          }
        });
        return details.sort();
      }
      function wrapperClone(wrapper) {
        if (wrapper instanceof LazyWrapper) {
          return wrapper.clone();
        }
        var result2 = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
        result2.__actions__ = copyArray(wrapper.__actions__);
        result2.__index__ = wrapper.__index__;
        result2.__values__ = wrapper.__values__;
        return result2;
      }
      function chunk(array, size2, guard) {
        if (guard ? isIterateeCall(array, size2, guard) : size2 === undefined$1) {
          size2 = 1;
        } else {
          size2 = nativeMax(toInteger(size2), 0);
        }
        var length = array == null ? 0 : array.length;
        if (!length || size2 < 1) {
          return [];
        }
        var index = 0, resIndex = 0, result2 = Array2(nativeCeil(length / size2));
        while (index < length) {
          result2[resIndex++] = baseSlice(array, index, index += size2);
        }
        return result2;
      }
      function compact(array) {
        var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result2 = [];
        while (++index < length) {
          var value = array[index];
          if (value) {
            result2[resIndex++] = value;
          }
        }
        return result2;
      }
      function concat() {
        var length = arguments.length;
        if (!length) {
          return [];
        }
        var args = Array2(length - 1), array = arguments[0], index = length;
        while (index--) {
          args[index - 1] = arguments[index];
        }
        return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
      }
      var difference = baseRest(function(array, values2) {
        return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true)) : [];
      });
      var differenceBy = baseRest(function(array, values2) {
        var iteratee2 = last(values2);
        if (isArrayLikeObject(iteratee2)) {
          iteratee2 = undefined$1;
        }
        return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2)) : [];
      });
      var differenceWith = baseRest(function(array, values2) {
        var comparator = last(values2);
        if (isArrayLikeObject(comparator)) {
          comparator = undefined$1;
        }
        return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), undefined$1, comparator) : [];
      });
      function drop(array, n, guard) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        n = guard || n === undefined$1 ? 1 : toInteger(n);
        return baseSlice(array, n < 0 ? 0 : n, length);
      }
      function dropRight(array, n, guard) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        n = guard || n === undefined$1 ? 1 : toInteger(n);
        n = length - n;
        return baseSlice(array, 0, n < 0 ? 0 : n);
      }
      function dropRightWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
      }
      function dropWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
      }
      function fill(array, value, start, end) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        if (start && typeof start != "number" && isIterateeCall(array, value, start)) {
          start = 0;
          end = length;
        }
        return baseFill(array, value, start, end);
      }
      function findIndex(array, predicate, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = fromIndex == null ? 0 : toInteger(fromIndex);
        if (index < 0) {
          index = nativeMax(length + index, 0);
        }
        return baseFindIndex(array, getIteratee(predicate, 3), index);
      }
      function findLastIndex(array, predicate, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = length - 1;
        if (fromIndex !== undefined$1) {
          index = toInteger(fromIndex);
          index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
        }
        return baseFindIndex(array, getIteratee(predicate, 3), index, true);
      }
      function flatten(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseFlatten(array, 1) : [];
      }
      function flattenDeep(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseFlatten(array, INFINITY) : [];
      }
      function flattenDepth(array, depth) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        depth = depth === undefined$1 ? 1 : toInteger(depth);
        return baseFlatten(array, depth);
      }
      function fromPairs(pairs2) {
        var index = -1, length = pairs2 == null ? 0 : pairs2.length, result2 = {};
        while (++index < length) {
          var pair = pairs2[index];
          result2[pair[0]] = pair[1];
        }
        return result2;
      }
      function head(array) {
        return array && array.length ? array[0] : undefined$1;
      }
      function indexOf(array, value, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = fromIndex == null ? 0 : toInteger(fromIndex);
        if (index < 0) {
          index = nativeMax(length + index, 0);
        }
        return baseIndexOf(array, value, index);
      }
      function initial(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseSlice(array, 0, -1) : [];
      }
      var intersection = baseRest(function(arrays) {
        var mapped = arrayMap(arrays, castArrayLikeObject);
        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
      });
      var intersectionBy = baseRest(function(arrays) {
        var iteratee2 = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
        if (iteratee2 === last(mapped)) {
          iteratee2 = undefined$1;
        } else {
          mapped.pop();
        }
        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee2, 2)) : [];
      });
      var intersectionWith = baseRest(function(arrays) {
        var comparator = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
        comparator = typeof comparator == "function" ? comparator : undefined$1;
        if (comparator) {
          mapped.pop();
        }
        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined$1, comparator) : [];
      });
      function join(array, separator) {
        return array == null ? "" : nativeJoin.call(array, separator);
      }
      function last(array) {
        var length = array == null ? 0 : array.length;
        return length ? array[length - 1] : undefined$1;
      }
      function lastIndexOf(array, value, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = length;
        if (fromIndex !== undefined$1) {
          index = toInteger(fromIndex);
          index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
        }
        return value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, true);
      }
      function nth(array, n) {
        return array && array.length ? baseNth(array, toInteger(n)) : undefined$1;
      }
      var pull = baseRest(pullAll);
      function pullAll(array, values2) {
        return array && array.length && values2 && values2.length ? basePullAll(array, values2) : array;
      }
      function pullAllBy(array, values2, iteratee2) {
        return array && array.length && values2 && values2.length ? basePullAll(array, values2, getIteratee(iteratee2, 2)) : array;
      }
      function pullAllWith(array, values2, comparator) {
        return array && array.length && values2 && values2.length ? basePullAll(array, values2, undefined$1, comparator) : array;
      }
      var pullAt = flatRest(function(array, indexes) {
        var length = array == null ? 0 : array.length, result2 = baseAt(array, indexes);
        basePullAt(array, arrayMap(indexes, function(index) {
          return isIndex(index, length) ? +index : index;
        }).sort(compareAscending));
        return result2;
      });
      function remove(array, predicate) {
        var result2 = [];
        if (!(array && array.length)) {
          return result2;
        }
        var index = -1, indexes = [], length = array.length;
        predicate = getIteratee(predicate, 3);
        while (++index < length) {
          var value = array[index];
          if (predicate(value, index, array)) {
            result2.push(value);
            indexes.push(index);
          }
        }
        basePullAt(array, indexes);
        return result2;
      }
      function reverse(array) {
        return array == null ? array : nativeReverse.call(array);
      }
      function slice(array, start, end) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        if (end && typeof end != "number" && isIterateeCall(array, start, end)) {
          start = 0;
          end = length;
        } else {
          start = start == null ? 0 : toInteger(start);
          end = end === undefined$1 ? length : toInteger(end);
        }
        return baseSlice(array, start, end);
      }
      function sortedIndex(array, value) {
        return baseSortedIndex(array, value);
      }
      function sortedIndexBy(array, value, iteratee2) {
        return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2));
      }
      function sortedIndexOf(array, value) {
        var length = array == null ? 0 : array.length;
        if (length) {
          var index = baseSortedIndex(array, value);
          if (index < length && eq(array[index], value)) {
            return index;
          }
        }
        return -1;
      }
      function sortedLastIndex(array, value) {
        return baseSortedIndex(array, value, true);
      }
      function sortedLastIndexBy(array, value, iteratee2) {
        return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2), true);
      }
      function sortedLastIndexOf(array, value) {
        var length = array == null ? 0 : array.length;
        if (length) {
          var index = baseSortedIndex(array, value, true) - 1;
          if (eq(array[index], value)) {
            return index;
          }
        }
        return -1;
      }
      function sortedUniq(array) {
        return array && array.length ? baseSortedUniq(array) : [];
      }
      function sortedUniqBy(array, iteratee2) {
        return array && array.length ? baseSortedUniq(array, getIteratee(iteratee2, 2)) : [];
      }
      function tail(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseSlice(array, 1, length) : [];
      }
      function take(array, n, guard) {
        if (!(array && array.length)) {
          return [];
        }
        n = guard || n === undefined$1 ? 1 : toInteger(n);
        return baseSlice(array, 0, n < 0 ? 0 : n);
      }
      function takeRight(array, n, guard) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        n = guard || n === undefined$1 ? 1 : toInteger(n);
        n = length - n;
        return baseSlice(array, n < 0 ? 0 : n, length);
      }
      function takeRightWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
      }
      function takeWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
      }
      var union = baseRest(function(arrays) {
        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
      });
      var unionBy = baseRest(function(arrays) {
        var iteratee2 = last(arrays);
        if (isArrayLikeObject(iteratee2)) {
          iteratee2 = undefined$1;
        }
        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2));
      });
      var unionWith = baseRest(function(arrays) {
        var comparator = last(arrays);
        comparator = typeof comparator == "function" ? comparator : undefined$1;
        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined$1, comparator);
      });
      function uniq(array) {
        return array && array.length ? baseUniq(array) : [];
      }
      function uniqBy(array, iteratee2) {
        return array && array.length ? baseUniq(array, getIteratee(iteratee2, 2)) : [];
      }
      function uniqWith(array, comparator) {
        comparator = typeof comparator == "function" ? comparator : undefined$1;
        return array && array.length ? baseUniq(array, undefined$1, comparator) : [];
      }
      function unzip(array) {
        if (!(array && array.length)) {
          return [];
        }
        var length = 0;
        array = arrayFilter(array, function(group) {
          if (isArrayLikeObject(group)) {
            length = nativeMax(group.length, length);
            return true;
          }
        });
        return baseTimes(length, function(index) {
          return arrayMap(array, baseProperty(index));
        });
      }
      function unzipWith(array, iteratee2) {
        if (!(array && array.length)) {
          return [];
        }
        var result2 = unzip(array);
        if (iteratee2 == null) {
          return result2;
        }
        return arrayMap(result2, function(group) {
          return apply(iteratee2, undefined$1, group);
        });
      }
      var without = baseRest(function(array, values2) {
        return isArrayLikeObject(array) ? baseDifference(array, values2) : [];
      });
      var xor = baseRest(function(arrays) {
        return baseXor(arrayFilter(arrays, isArrayLikeObject));
      });
      var xorBy = baseRest(function(arrays) {
        var iteratee2 = last(arrays);
        if (isArrayLikeObject(iteratee2)) {
          iteratee2 = undefined$1;
        }
        return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee2, 2));
      });
      var xorWith = baseRest(function(arrays) {
        var comparator = last(arrays);
        comparator = typeof comparator == "function" ? comparator : undefined$1;
        return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined$1, comparator);
      });
      var zip = baseRest(unzip);
      function zipObject(props, values2) {
        return baseZipObject(props || [], values2 || [], assignValue);
      }
      function zipObjectDeep(props, values2) {
        return baseZipObject(props || [], values2 || [], baseSet);
      }
      var zipWith = baseRest(function(arrays) {
        var length = arrays.length, iteratee2 = length > 1 ? arrays[length - 1] : undefined$1;
        iteratee2 = typeof iteratee2 == "function" ? (arrays.pop(), iteratee2) : undefined$1;
        return unzipWith(arrays, iteratee2);
      });
      function chain(value) {
        var result2 = lodash2(value);
        result2.__chain__ = true;
        return result2;
      }
      function tap(value, interceptor) {
        interceptor(value);
        return value;
      }
      function thru(value, interceptor) {
        return interceptor(value);
      }
      var wrapperAt = flatRest(function(paths) {
        var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = function(object) {
          return baseAt(object, paths);
        };
        if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
          return this.thru(interceptor);
        }
        value = value.slice(start, +start + (length ? 1 : 0));
        value.__actions__.push({
          "func": thru,
          "args": [interceptor],
          "thisArg": undefined$1
        });
        return new LodashWrapper(value, this.__chain__).thru(function(array) {
          if (length && !array.length) {
            array.push(undefined$1);
          }
          return array;
        });
      });
      function wrapperChain() {
        return chain(this);
      }
      function wrapperCommit() {
        return new LodashWrapper(this.value(), this.__chain__);
      }
      function wrapperNext() {
        if (this.__values__ === undefined$1) {
          this.__values__ = toArray2(this.value());
        }
        var done = this.__index__ >= this.__values__.length, value = done ? undefined$1 : this.__values__[this.__index__++];
        return { "done": done, "value": value };
      }
      function wrapperToIterator() {
        return this;
      }
      function wrapperPlant(value) {
        var result2, parent2 = this;
        while (parent2 instanceof baseLodash) {
          var clone2 = wrapperClone(parent2);
          clone2.__index__ = 0;
          clone2.__values__ = undefined$1;
          if (result2) {
            previous.__wrapped__ = clone2;
          } else {
            result2 = clone2;
          }
          var previous = clone2;
          parent2 = parent2.__wrapped__;
        }
        previous.__wrapped__ = value;
        return result2;
      }
      function wrapperReverse() {
        var value = this.__wrapped__;
        if (value instanceof LazyWrapper) {
          var wrapped = value;
          if (this.__actions__.length) {
            wrapped = new LazyWrapper(this);
          }
          wrapped = wrapped.reverse();
          wrapped.__actions__.push({
            "func": thru,
            "args": [reverse],
            "thisArg": undefined$1
          });
          return new LodashWrapper(wrapped, this.__chain__);
        }
        return this.thru(reverse);
      }
      function wrapperValue() {
        return baseWrapperValue(this.__wrapped__, this.__actions__);
      }
      var countBy = createAggregator(function(result2, value, key) {
        if (hasOwnProperty.call(result2, key)) {
          ++result2[key];
        } else {
          baseAssignValue(result2, key, 1);
        }
      });
      function every(collection, predicate, guard) {
        var func = isArray(collection) ? arrayEvery : baseEvery;
        if (guard && isIterateeCall(collection, predicate, guard)) {
          predicate = undefined$1;
        }
        return func(collection, getIteratee(predicate, 3));
      }
      function filter(collection, predicate) {
        var func = isArray(collection) ? arrayFilter : baseFilter;
        return func(collection, getIteratee(predicate, 3));
      }
      var find = createFind(findIndex);
      var findLast = createFind(findLastIndex);
      function flatMap(collection, iteratee2) {
        return baseFlatten(map2(collection, iteratee2), 1);
      }
      function flatMapDeep(collection, iteratee2) {
        return baseFlatten(map2(collection, iteratee2), INFINITY);
      }
      function flatMapDepth(collection, iteratee2, depth) {
        depth = depth === undefined$1 ? 1 : toInteger(depth);
        return baseFlatten(map2(collection, iteratee2), depth);
      }
      function forEach(collection, iteratee2) {
        var func = isArray(collection) ? arrayEach : baseEach;
        return func(collection, getIteratee(iteratee2, 3));
      }
      function forEachRight(collection, iteratee2) {
        var func = isArray(collection) ? arrayEachRight : baseEachRight;
        return func(collection, getIteratee(iteratee2, 3));
      }
      var groupBy = createAggregator(function(result2, value, key) {
        if (hasOwnProperty.call(result2, key)) {
          result2[key].push(value);
        } else {
          baseAssignValue(result2, key, [value]);
        }
      });
      function includes(collection, value, fromIndex, guard) {
        collection = isArrayLike(collection) ? collection : values(collection);
        fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
        var length = collection.length;
        if (fromIndex < 0) {
          fromIndex = nativeMax(length + fromIndex, 0);
        }
        return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
      }
      var invokeMap = baseRest(function(collection, path, args) {
        var index = -1, isFunc = typeof path == "function", result2 = isArrayLike(collection) ? Array2(collection.length) : [];
        baseEach(collection, function(value) {
          result2[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
        });
        return result2;
      });
      var keyBy = createAggregator(function(result2, value, key) {
        baseAssignValue(result2, key, value);
      });
      function map2(collection, iteratee2) {
        var func = isArray(collection) ? arrayMap : baseMap;
        return func(collection, getIteratee(iteratee2, 3));
      }
      function orderBy(collection, iteratees, orders, guard) {
        if (collection == null) {
          return [];
        }
        if (!isArray(iteratees)) {
          iteratees = iteratees == null ? [] : [iteratees];
        }
        orders = guard ? undefined$1 : orders;
        if (!isArray(orders)) {
          orders = orders == null ? [] : [orders];
        }
        return baseOrderBy(collection, iteratees, orders);
      }
      var partition = createAggregator(function(result2, value, key) {
        result2[key ? 0 : 1].push(value);
      }, function() {
        return [[], []];
      });
      function reduce(collection, iteratee2, accumulator) {
        var func = isArray(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
        return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEach);
      }
      function reduceRight(collection, iteratee2, accumulator) {
        var func = isArray(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
        return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEachRight);
      }
      function reject(collection, predicate) {
        var func = isArray(collection) ? arrayFilter : baseFilter;
        return func(collection, negate(getIteratee(predicate, 3)));
      }
      function sample(collection) {
        var func = isArray(collection) ? arraySample : baseSample;
        return func(collection);
      }
      function sampleSize(collection, n, guard) {
        if (guard ? isIterateeCall(collection, n, guard) : n === undefined$1) {
          n = 1;
        } else {
          n = toInteger(n);
        }
        var func = isArray(collection) ? arraySampleSize : baseSampleSize;
        return func(collection, n);
      }
      function shuffle(collection) {
        var func = isArray(collection) ? arrayShuffle : baseShuffle;
        return func(collection);
      }
      function size(collection) {
        if (collection == null) {
          return 0;
        }
        if (isArrayLike(collection)) {
          return isString(collection) ? stringSize(collection) : collection.length;
        }
        var tag = getTag(collection);
        if (tag == mapTag || tag == setTag) {
          return collection.size;
        }
        return baseKeys(collection).length;
      }
      function some(collection, predicate, guard) {
        var func = isArray(collection) ? arraySome : baseSome;
        if (guard && isIterateeCall(collection, predicate, guard)) {
          predicate = undefined$1;
        }
        return func(collection, getIteratee(predicate, 3));
      }
      var sortBy = baseRest(function(collection, iteratees) {
        if (collection == null) {
          return [];
        }
        var length = iteratees.length;
        if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
          iteratees = [];
        } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
          iteratees = [iteratees[0]];
        }
        return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
      });
      var now = ctxNow || function() {
        return root.Date.now();
      };
      function after(n, func) {
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        n = toInteger(n);
        return function() {
          if (--n < 1) {
            return func.apply(this, arguments);
          }
        };
      }
      function ary(func, n, guard) {
        n = guard ? undefined$1 : n;
        n = func && n == null ? func.length : n;
        return createWrap(func, WRAP_ARY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, n);
      }
      function before(n, func) {
        var result2;
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        n = toInteger(n);
        return function() {
          if (--n > 0) {
            result2 = func.apply(this, arguments);
          }
          if (n <= 1) {
            func = undefined$1;
          }
          return result2;
        };
      }
      var bind = baseRest(function(func, thisArg, partials) {
        var bitmask = WRAP_BIND_FLAG;
        if (partials.length) {
          var holders = replaceHolders(partials, getHolder(bind));
          bitmask |= WRAP_PARTIAL_FLAG;
        }
        return createWrap(func, bitmask, thisArg, partials, holders);
      });
      var bindKey = baseRest(function(object, key, partials) {
        var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
        if (partials.length) {
          var holders = replaceHolders(partials, getHolder(bindKey));
          bitmask |= WRAP_PARTIAL_FLAG;
        }
        return createWrap(key, bitmask, object, partials, holders);
      });
      function curry(func, arity, guard) {
        arity = guard ? undefined$1 : arity;
        var result2 = createWrap(func, WRAP_CURRY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
        result2.placeholder = curry.placeholder;
        return result2;
      }
      function curryRight(func, arity, guard) {
        arity = guard ? undefined$1 : arity;
        var result2 = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
        result2.placeholder = curryRight.placeholder;
        return result2;
      }
      function debounce(func, wait, options) {
        var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        wait = toNumber(wait) || 0;
        if (isObject2(options)) {
          leading = !!options.leading;
          maxing = "maxWait" in options;
          maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        function invokeFunc(time) {
          var args = lastArgs, thisArg = lastThis;
          lastArgs = lastThis = undefined$1;
          lastInvokeTime = time;
          result2 = func.apply(thisArg, args);
          return result2;
        }
        function leadingEdge(time) {
          lastInvokeTime = time;
          timerId = setTimeout2(timerExpired, wait);
          return leading ? invokeFunc(time) : result2;
        }
        function remainingWait(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
          return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
        }
        function shouldInvoke(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
          return lastCallTime === undefined$1 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
        }
        function timerExpired() {
          var time = now();
          if (shouldInvoke(time)) {
            return trailingEdge(time);
          }
          timerId = setTimeout2(timerExpired, remainingWait(time));
        }
        function trailingEdge(time) {
          timerId = undefined$1;
          if (trailing && lastArgs) {
            return invokeFunc(time);
          }
          lastArgs = lastThis = undefined$1;
          return result2;
        }
        function cancel() {
          if (timerId !== undefined$1) {
            clearTimeout2(timerId);
          }
          lastInvokeTime = 0;
          lastArgs = lastCallTime = lastThis = timerId = undefined$1;
        }
        function flush() {
          return timerId === undefined$1 ? result2 : trailingEdge(now());
        }
        function debounced() {
          var time = now(), isInvoking = shouldInvoke(time);
          lastArgs = arguments;
          lastThis = this;
          lastCallTime = time;
          if (isInvoking) {
            if (timerId === undefined$1) {
              return leadingEdge(lastCallTime);
            }
            if (maxing) {
              clearTimeout2(timerId);
              timerId = setTimeout2(timerExpired, wait);
              return invokeFunc(lastCallTime);
            }
          }
          if (timerId === undefined$1) {
            timerId = setTimeout2(timerExpired, wait);
          }
          return result2;
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
      }
      var defer = baseRest(function(func, args) {
        return baseDelay(func, 1, args);
      });
      var delay = baseRest(function(func, wait, args) {
        return baseDelay(func, toNumber(wait) || 0, args);
      });
      function flip(func) {
        return createWrap(func, WRAP_FLIP_FLAG);
      }
      function memoize(func, resolver) {
        if (typeof func != "function" || resolver != null && typeof resolver != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        var memoized = function() {
          var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
          if (cache.has(key)) {
            return cache.get(key);
          }
          var result2 = func.apply(this, args);
          memoized.cache = cache.set(key, result2) || cache;
          return result2;
        };
        memoized.cache = new (memoize.Cache || MapCache)();
        return memoized;
      }
      memoize.Cache = MapCache;
      function negate(predicate) {
        if (typeof predicate != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        return function() {
          var args = arguments;
          switch (args.length) {
            case 0:
              return !predicate.call(this);
            case 1:
              return !predicate.call(this, args[0]);
            case 2:
              return !predicate.call(this, args[0], args[1]);
            case 3:
              return !predicate.call(this, args[0], args[1], args[2]);
          }
          return !predicate.apply(this, args);
        };
      }
      function once(func) {
        return before(2, func);
      }
      var overArgs = castRest(function(func, transforms) {
        transforms = transforms.length == 1 && isArray(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
        var funcsLength = transforms.length;
        return baseRest(function(args) {
          var index = -1, length = nativeMin(args.length, funcsLength);
          while (++index < length) {
            args[index] = transforms[index].call(this, args[index]);
          }
          return apply(func, this, args);
        });
      });
      var partial = baseRest(function(func, partials) {
        var holders = replaceHolders(partials, getHolder(partial));
        return createWrap(func, WRAP_PARTIAL_FLAG, undefined$1, partials, holders);
      });
      var partialRight = baseRest(function(func, partials) {
        var holders = replaceHolders(partials, getHolder(partialRight));
        return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined$1, partials, holders);
      });
      var rearg = flatRest(function(func, indexes) {
        return createWrap(func, WRAP_REARG_FLAG, undefined$1, undefined$1, undefined$1, indexes);
      });
      function rest(func, start) {
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        start = start === undefined$1 ? start : toInteger(start);
        return baseRest(func, start);
      }
      function spread(func, start) {
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        start = start == null ? 0 : nativeMax(toInteger(start), 0);
        return baseRest(function(args) {
          var array = args[start], otherArgs = castSlice(args, 0, start);
          if (array) {
            arrayPush(otherArgs, array);
          }
          return apply(func, this, otherArgs);
        });
      }
      function throttle(func, wait, options) {
        var leading = true, trailing = true;
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        if (isObject2(options)) {
          leading = "leading" in options ? !!options.leading : leading;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        return debounce(func, wait, {
          "leading": leading,
          "maxWait": wait,
          "trailing": trailing
        });
      }
      function unary(func) {
        return ary(func, 1);
      }
      function wrap(value, wrapper) {
        return partial(castFunction(wrapper), value);
      }
      function castArray() {
        if (!arguments.length) {
          return [];
        }
        var value = arguments[0];
        return isArray(value) ? value : [value];
      }
      function clone(value) {
        return baseClone(value, CLONE_SYMBOLS_FLAG);
      }
      function cloneWith(value, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$1;
        return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
      }
      function cloneDeep(value) {
        return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
      }
      function cloneDeepWith(value, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$1;
        return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
      }
      function conformsTo(object, source) {
        return source == null || baseConformsTo(object, source, keys(source));
      }
      function eq(value, other) {
        return value === other || value !== value && other !== other;
      }
      var gt = createRelationalOperation(baseGt);
      var gte = createRelationalOperation(function(value, other) {
        return value >= other;
      });
      var isArguments = baseIsArguments(function() {
        return arguments;
      }()) ? baseIsArguments : function(value) {
        return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
      };
      var isArray = Array2.isArray;
      var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
      function isArrayLike(value) {
        return value != null && isLength(value.length) && !isFunction2(value);
      }
      function isArrayLikeObject(value) {
        return isObjectLike(value) && isArrayLike(value);
      }
      function isBoolean2(value) {
        return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
      }
      var isBuffer = nativeIsBuffer || stubFalse;
      var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
      function isElement(value) {
        return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
      }
      function isEmpty(value) {
        if (value == null) {
          return true;
        }
        if (isArrayLike(value) && (isArray(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
          return !value.length;
        }
        var tag = getTag(value);
        if (tag == mapTag || tag == setTag) {
          return !value.size;
        }
        if (isPrototype(value)) {
          return !baseKeys(value).length;
        }
        for (var key in value) {
          if (hasOwnProperty.call(value, key)) {
            return false;
          }
        }
        return true;
      }
      function isEqual(value, other) {
        return baseIsEqual(value, other);
      }
      function isEqualWith(value, other, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$1;
        var result2 = customizer ? customizer(value, other) : undefined$1;
        return result2 === undefined$1 ? baseIsEqual(value, other, undefined$1, customizer) : !!result2;
      }
      function isError(value) {
        if (!isObjectLike(value)) {
          return false;
        }
        var tag = baseGetTag(value);
        return tag == errorTag || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject(value);
      }
      function isFinite(value) {
        return typeof value == "number" && nativeIsFinite(value);
      }
      function isFunction2(value) {
        if (!isObject2(value)) {
          return false;
        }
        var tag = baseGetTag(value);
        return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
      }
      function isInteger2(value) {
        return typeof value == "number" && value == toInteger(value);
      }
      function isLength(value) {
        return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
      }
      function isObject2(value) {
        var type2 = typeof value;
        return value != null && (type2 == "object" || type2 == "function");
      }
      function isObjectLike(value) {
        return value != null && typeof value == "object";
      }
      var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
      function isMatch(object, source) {
        return object === source || baseIsMatch(object, source, getMatchData(source));
      }
      function isMatchWith(object, source, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$1;
        return baseIsMatch(object, source, getMatchData(source), customizer);
      }
      function isNaN2(value) {
        return isNumber(value) && value != +value;
      }
      function isNative(value) {
        if (isMaskable(value)) {
          throw new Error2(CORE_ERROR_TEXT);
        }
        return baseIsNative(value);
      }
      function isNull2(value) {
        return value === null;
      }
      function isNil(value) {
        return value == null;
      }
      function isNumber(value) {
        return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
      }
      function isPlainObject(value) {
        if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
          return false;
        }
        var proto = getPrototype(value);
        if (proto === null) {
          return true;
        }
        var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
        return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
      }
      var isRegExp2 = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
      function isSafeInteger(value) {
        return isInteger2(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
      }
      var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
      function isString(value) {
        return typeof value == "string" || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
      }
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
      }
      var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
      function isUndefined2(value) {
        return value === undefined$1;
      }
      function isWeakMap(value) {
        return isObjectLike(value) && getTag(value) == weakMapTag;
      }
      function isWeakSet(value) {
        return isObjectLike(value) && baseGetTag(value) == weakSetTag;
      }
      var lt = createRelationalOperation(baseLt);
      var lte = createRelationalOperation(function(value, other) {
        return value <= other;
      });
      function toArray2(value) {
        if (!value) {
          return [];
        }
        if (isArrayLike(value)) {
          return isString(value) ? stringToArray(value) : copyArray(value);
        }
        if (symIterator && value[symIterator]) {
          return iteratorToArray(value[symIterator]());
        }
        var tag = getTag(value), func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
        return func(value);
      }
      function toFinite(value) {
        if (!value) {
          return value === 0 ? value : 0;
        }
        value = toNumber(value);
        if (value === INFINITY || value === -INFINITY) {
          var sign = value < 0 ? -1 : 1;
          return sign * MAX_INTEGER;
        }
        return value === value ? value : 0;
      }
      function toInteger(value) {
        var result2 = toFinite(value), remainder = result2 % 1;
        return result2 === result2 ? remainder ? result2 - remainder : result2 : 0;
      }
      function toLength(value) {
        return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
      }
      function toNumber(value) {
        if (typeof value == "number") {
          return value;
        }
        if (isSymbol(value)) {
          return NAN;
        }
        if (isObject2(value)) {
          var other = typeof value.valueOf == "function" ? value.valueOf() : value;
          value = isObject2(other) ? other + "" : other;
        }
        if (typeof value != "string") {
          return value === 0 ? value : +value;
        }
        value = baseTrim(value);
        var isBinary2 = reIsBinary.test(value);
        return isBinary2 || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary2 ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
      }
      function toPlainObject(value) {
        return copyObject(value, keysIn(value));
      }
      function toSafeInteger(value) {
        return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : value === 0 ? value : 0;
      }
      function toString4(value) {
        return value == null ? "" : baseToString(value);
      }
      var assign2 = createAssigner(function(object, source) {
        if (isPrototype(source) || isArrayLike(source)) {
          copyObject(source, keys(source), object);
          return;
        }
        for (var key in source) {
          if (hasOwnProperty.call(source, key)) {
            assignValue(object, key, source[key]);
          }
        }
      });
      var assignIn = createAssigner(function(object, source) {
        copyObject(source, keysIn(source), object);
      });
      var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
        copyObject(source, keysIn(source), object, customizer);
      });
      var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
        copyObject(source, keys(source), object, customizer);
      });
      var at = flatRest(baseAt);
      function create(prototype, properties) {
        var result2 = baseCreate(prototype);
        return properties == null ? result2 : baseAssign(result2, properties);
      }
      var defaults = baseRest(function(object, sources) {
        object = Object2(object);
        var index = -1;
        var length = sources.length;
        var guard = length > 2 ? sources[2] : undefined$1;
        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          length = 1;
        }
        while (++index < length) {
          var source = sources[index];
          var props = keysIn(source);
          var propsIndex = -1;
          var propsLength = props.length;
          while (++propsIndex < propsLength) {
            var key = props[propsIndex];
            var value = object[key];
            if (value === undefined$1 || eq(value, objectProto[key]) && !hasOwnProperty.call(object, key)) {
              object[key] = source[key];
            }
          }
        }
        return object;
      });
      var defaultsDeep = baseRest(function(args) {
        args.push(undefined$1, customDefaultsMerge);
        return apply(mergeWith, undefined$1, args);
      });
      function findKey(object, predicate) {
        return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
      }
      function findLastKey(object, predicate) {
        return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
      }
      function forIn(object, iteratee2) {
        return object == null ? object : baseFor(object, getIteratee(iteratee2, 3), keysIn);
      }
      function forInRight(object, iteratee2) {
        return object == null ? object : baseForRight(object, getIteratee(iteratee2, 3), keysIn);
      }
      function forOwn(object, iteratee2) {
        return object && baseForOwn(object, getIteratee(iteratee2, 3));
      }
      function forOwnRight(object, iteratee2) {
        return object && baseForOwnRight(object, getIteratee(iteratee2, 3));
      }
      function functions(object) {
        return object == null ? [] : baseFunctions(object, keys(object));
      }
      function functionsIn(object) {
        return object == null ? [] : baseFunctions(object, keysIn(object));
      }
      function get(object, path, defaultValue) {
        var result2 = object == null ? undefined$1 : baseGet(object, path);
        return result2 === undefined$1 ? defaultValue : result2;
      }
      function has2(object, path) {
        return object != null && hasPath(object, path, baseHas);
      }
      function hasIn(object, path) {
        return object != null && hasPath(object, path, baseHasIn);
      }
      var invert = createInverter(function(result2, value, key) {
        if (value != null && typeof value.toString != "function") {
          value = nativeObjectToString.call(value);
        }
        result2[value] = key;
      }, constant(identity));
      var invertBy = createInverter(function(result2, value, key) {
        if (value != null && typeof value.toString != "function") {
          value = nativeObjectToString.call(value);
        }
        if (hasOwnProperty.call(result2, value)) {
          result2[value].push(key);
        } else {
          result2[value] = [key];
        }
      }, getIteratee);
      var invoke = baseRest(baseInvoke);
      function keys(object) {
        return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
      }
      function keysIn(object) {
        return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
      }
      function mapKeys(object, iteratee2) {
        var result2 = {};
        iteratee2 = getIteratee(iteratee2, 3);
        baseForOwn(object, function(value, key, object2) {
          baseAssignValue(result2, iteratee2(value, key, object2), value);
        });
        return result2;
      }
      function mapValues(object, iteratee2) {
        var result2 = {};
        iteratee2 = getIteratee(iteratee2, 3);
        baseForOwn(object, function(value, key, object2) {
          baseAssignValue(result2, key, iteratee2(value, key, object2));
        });
        return result2;
      }
      var merge2 = createAssigner(function(object, source, srcIndex) {
        baseMerge(object, source, srcIndex);
      });
      var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
        baseMerge(object, source, srcIndex, customizer);
      });
      var omit = flatRest(function(object, paths) {
        var result2 = {};
        if (object == null) {
          return result2;
        }
        var isDeep = false;
        paths = arrayMap(paths, function(path) {
          path = castPath(path, object);
          isDeep || (isDeep = path.length > 1);
          return path;
        });
        copyObject(object, getAllKeysIn(object), result2);
        if (isDeep) {
          result2 = baseClone(result2, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
        }
        var length = paths.length;
        while (length--) {
          baseUnset(result2, paths[length]);
        }
        return result2;
      });
      function omitBy(object, predicate) {
        return pickBy(object, negate(getIteratee(predicate)));
      }
      var pick = flatRest(function(object, paths) {
        return object == null ? {} : basePick(object, paths);
      });
      function pickBy(object, predicate) {
        if (object == null) {
          return {};
        }
        var props = arrayMap(getAllKeysIn(object), function(prop) {
          return [prop];
        });
        predicate = getIteratee(predicate);
        return basePickBy(object, props, function(value, path) {
          return predicate(value, path[0]);
        });
      }
      function result(object, path, defaultValue) {
        path = castPath(path, object);
        var index = -1, length = path.length;
        if (!length) {
          length = 1;
          object = undefined$1;
        }
        while (++index < length) {
          var value = object == null ? undefined$1 : object[toKey(path[index])];
          if (value === undefined$1) {
            index = length;
            value = defaultValue;
          }
          object = isFunction2(value) ? value.call(object) : value;
        }
        return object;
      }
      function set2(object, path, value) {
        return object == null ? object : baseSet(object, path, value);
      }
      function setWith(object, path, value, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$1;
        return object == null ? object : baseSet(object, path, value, customizer);
      }
      var toPairs = createToPairs(keys);
      var toPairsIn = createToPairs(keysIn);
      function transform(object, iteratee2, accumulator) {
        var isArr = isArray(object), isArrLike = isArr || isBuffer(object) || isTypedArray(object);
        iteratee2 = getIteratee(iteratee2, 4);
        if (accumulator == null) {
          var Ctor = object && object.constructor;
          if (isArrLike) {
            accumulator = isArr ? new Ctor() : [];
          } else if (isObject2(object)) {
            accumulator = isFunction2(Ctor) ? baseCreate(getPrototype(object)) : {};
          } else {
            accumulator = {};
          }
        }
        (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object2) {
          return iteratee2(accumulator, value, index, object2);
        });
        return accumulator;
      }
      function unset(object, path) {
        return object == null ? true : baseUnset(object, path);
      }
      function update(object, path, updater) {
        return object == null ? object : baseUpdate(object, path, castFunction(updater));
      }
      function updateWith(object, path, updater, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$1;
        return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
      }
      function values(object) {
        return object == null ? [] : baseValues(object, keys(object));
      }
      function valuesIn(object) {
        return object == null ? [] : baseValues(object, keysIn(object));
      }
      function clamp(number, lower, upper) {
        if (upper === undefined$1) {
          upper = lower;
          lower = undefined$1;
        }
        if (upper !== undefined$1) {
          upper = toNumber(upper);
          upper = upper === upper ? upper : 0;
        }
        if (lower !== undefined$1) {
          lower = toNumber(lower);
          lower = lower === lower ? lower : 0;
        }
        return baseClamp(toNumber(number), lower, upper);
      }
      function inRange(number, start, end) {
        start = toFinite(start);
        if (end === undefined$1) {
          end = start;
          start = 0;
        } else {
          end = toFinite(end);
        }
        number = toNumber(number);
        return baseInRange(number, start, end);
      }
      function random(lower, upper, floating) {
        if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) {
          upper = floating = undefined$1;
        }
        if (floating === undefined$1) {
          if (typeof upper == "boolean") {
            floating = upper;
            upper = undefined$1;
          } else if (typeof lower == "boolean") {
            floating = lower;
            lower = undefined$1;
          }
        }
        if (lower === undefined$1 && upper === undefined$1) {
          lower = 0;
          upper = 1;
        } else {
          lower = toFinite(lower);
          if (upper === undefined$1) {
            upper = lower;
            lower = 0;
          } else {
            upper = toFinite(upper);
          }
        }
        if (lower > upper) {
          var temp = lower;
          lower = upper;
          upper = temp;
        }
        if (floating || lower % 1 || upper % 1) {
          var rand = nativeRandom();
          return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
        }
        return baseRandom(lower, upper);
      }
      var camelCase = createCompounder(function(result2, word, index) {
        word = word.toLowerCase();
        return result2 + (index ? capitalize(word) : word);
      });
      function capitalize(string) {
        return upperFirst(toString4(string).toLowerCase());
      }
      function deburr(string) {
        string = toString4(string);
        return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
      }
      function endsWith(string, target, position) {
        string = toString4(string);
        target = baseToString(target);
        var length = string.length;
        position = position === undefined$1 ? length : baseClamp(toInteger(position), 0, length);
        var end = position;
        position -= target.length;
        return position >= 0 && string.slice(position, end) == target;
      }
      function escape(string) {
        string = toString4(string);
        return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
      }
      function escapeRegExp(string) {
        string = toString4(string);
        return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
      }
      var kebabCase = createCompounder(function(result2, word, index) {
        return result2 + (index ? "-" : "") + word.toLowerCase();
      });
      var lowerCase = createCompounder(function(result2, word, index) {
        return result2 + (index ? " " : "") + word.toLowerCase();
      });
      var lowerFirst = createCaseFirst("toLowerCase");
      function pad(string, length, chars) {
        string = toString4(string);
        length = toInteger(length);
        var strLength = length ? stringSize(string) : 0;
        if (!length || strLength >= length) {
          return string;
        }
        var mid = (length - strLength) / 2;
        return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
      }
      function padEnd(string, length, chars) {
        string = toString4(string);
        length = toInteger(length);
        var strLength = length ? stringSize(string) : 0;
        return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
      }
      function padStart(string, length, chars) {
        string = toString4(string);
        length = toInteger(length);
        var strLength = length ? stringSize(string) : 0;
        return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
      }
      function parseInt2(string, radix, guard) {
        if (guard || radix == null) {
          radix = 0;
        } else if (radix) {
          radix = +radix;
        }
        return nativeParseInt(toString4(string).replace(reTrimStart, ""), radix || 0);
      }
      function repeat2(string, n, guard) {
        if (guard ? isIterateeCall(string, n, guard) : n === undefined$1) {
          n = 1;
        } else {
          n = toInteger(n);
        }
        return baseRepeat(toString4(string), n);
      }
      function replace() {
        var args = arguments, string = toString4(args[0]);
        return args.length < 3 ? string : string.replace(args[1], args[2]);
      }
      var snakeCase = createCompounder(function(result2, word, index) {
        return result2 + (index ? "_" : "") + word.toLowerCase();
      });
      function split(string, separator, limit) {
        if (limit && typeof limit != "number" && isIterateeCall(string, separator, limit)) {
          separator = limit = undefined$1;
        }
        limit = limit === undefined$1 ? MAX_ARRAY_LENGTH : limit >>> 0;
        if (!limit) {
          return [];
        }
        string = toString4(string);
        if (string && (typeof separator == "string" || separator != null && !isRegExp2(separator))) {
          separator = baseToString(separator);
          if (!separator && hasUnicode(string)) {
            return castSlice(stringToArray(string), 0, limit);
          }
        }
        return string.split(separator, limit);
      }
      var startCase = createCompounder(function(result2, word, index) {
        return result2 + (index ? " " : "") + upperFirst(word);
      });
      function startsWith(string, target, position) {
        string = toString4(string);
        position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
        target = baseToString(target);
        return string.slice(position, position + target.length) == target;
      }
      function template(string, options, guard) {
        var settings = lodash2.templateSettings;
        if (guard && isIterateeCall(string, options, guard)) {
          options = undefined$1;
        }
        string = toString4(string);
        options = assignInWith({}, options, settings, customDefaultsAssignIn);
        var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
        var isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
        var reDelimiters = RegExp2((options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$", "g");
        var sourceURL = "//# sourceURL=" + (hasOwnProperty.call(options, "sourceURL") ? (options.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
        string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
          interpolateValue || (interpolateValue = esTemplateValue);
          source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
          if (escapeValue) {
            isEscaping = true;
            source += "' +\n__e(" + escapeValue + ") +\n'";
          }
          if (evaluateValue) {
            isEvaluating = true;
            source += "';\n" + evaluateValue + ";\n__p += '";
          }
          if (interpolateValue) {
            source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
          }
          index = offset + match.length;
          return match;
        });
        source += "';\n";
        var variable = hasOwnProperty.call(options, "variable") && options.variable;
        if (!variable) {
          source = "with (obj) {\n" + source + "\n}\n";
        } else if (reForbiddenIdentifierChars.test(variable)) {
          throw new Error2(INVALID_TEMPL_VAR_ERROR_TEXT);
        }
        source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
        source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
        var result2 = attempt(function() {
          return Function2(importsKeys, sourceURL + "return " + source).apply(undefined$1, importsValues);
        });
        result2.source = source;
        if (isError(result2)) {
          throw result2;
        }
        return result2;
      }
      function toLower(value) {
        return toString4(value).toLowerCase();
      }
      function toUpper(value) {
        return toString4(value).toUpperCase();
      }
      function trim(string, chars, guard) {
        string = toString4(string);
        if (string && (guard || chars === undefined$1)) {
          return baseTrim(string);
        }
        if (!string || !(chars = baseToString(chars))) {
          return string;
        }
        var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
        return castSlice(strSymbols, start, end).join("");
      }
      function trimEnd(string, chars, guard) {
        string = toString4(string);
        if (string && (guard || chars === undefined$1)) {
          return string.slice(0, trimmedEndIndex(string) + 1);
        }
        if (!string || !(chars = baseToString(chars))) {
          return string;
        }
        var strSymbols = stringToArray(string), end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
        return castSlice(strSymbols, 0, end).join("");
      }
      function trimStart(string, chars, guard) {
        string = toString4(string);
        if (string && (guard || chars === undefined$1)) {
          return string.replace(reTrimStart, "");
        }
        if (!string || !(chars = baseToString(chars))) {
          return string;
        }
        var strSymbols = stringToArray(string), start = charsStartIndex(strSymbols, stringToArray(chars));
        return castSlice(strSymbols, start).join("");
      }
      function truncate(string, options) {
        var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
        if (isObject2(options)) {
          var separator = "separator" in options ? options.separator : separator;
          length = "length" in options ? toInteger(options.length) : length;
          omission = "omission" in options ? baseToString(options.omission) : omission;
        }
        string = toString4(string);
        var strLength = string.length;
        if (hasUnicode(string)) {
          var strSymbols = stringToArray(string);
          strLength = strSymbols.length;
        }
        if (length >= strLength) {
          return string;
        }
        var end = length - stringSize(omission);
        if (end < 1) {
          return omission;
        }
        var result2 = strSymbols ? castSlice(strSymbols, 0, end).join("") : string.slice(0, end);
        if (separator === undefined$1) {
          return result2 + omission;
        }
        if (strSymbols) {
          end += result2.length - end;
        }
        if (isRegExp2(separator)) {
          if (string.slice(end).search(separator)) {
            var match, substring = result2;
            if (!separator.global) {
              separator = RegExp2(separator.source, toString4(reFlags.exec(separator)) + "g");
            }
            separator.lastIndex = 0;
            while (match = separator.exec(substring)) {
              var newEnd = match.index;
            }
            result2 = result2.slice(0, newEnd === undefined$1 ? end : newEnd);
          }
        } else if (string.indexOf(baseToString(separator), end) != end) {
          var index = result2.lastIndexOf(separator);
          if (index > -1) {
            result2 = result2.slice(0, index);
          }
        }
        return result2 + omission;
      }
      function unescape2(string) {
        string = toString4(string);
        return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
      }
      var upperCase = createCompounder(function(result2, word, index) {
        return result2 + (index ? " " : "") + word.toUpperCase();
      });
      var upperFirst = createCaseFirst("toUpperCase");
      function words(string, pattern, guard) {
        string = toString4(string);
        pattern = guard ? undefined$1 : pattern;
        if (pattern === undefined$1) {
          return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
        }
        return string.match(pattern) || [];
      }
      var attempt = baseRest(function(func, args) {
        try {
          return apply(func, undefined$1, args);
        } catch (e) {
          return isError(e) ? e : new Error2(e);
        }
      });
      var bindAll = flatRest(function(object, methodNames) {
        arrayEach(methodNames, function(key) {
          key = toKey(key);
          baseAssignValue(object, key, bind(object[key], object));
        });
        return object;
      });
      function cond(pairs2) {
        var length = pairs2 == null ? 0 : pairs2.length, toIteratee = getIteratee();
        pairs2 = !length ? [] : arrayMap(pairs2, function(pair) {
          if (typeof pair[1] != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          return [toIteratee(pair[0]), pair[1]];
        });
        return baseRest(function(args) {
          var index = -1;
          while (++index < length) {
            var pair = pairs2[index];
            if (apply(pair[0], this, args)) {
              return apply(pair[1], this, args);
            }
          }
        });
      }
      function conforms(source) {
        return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
      }
      function constant(value) {
        return function() {
          return value;
        };
      }
      function defaultTo(value, defaultValue) {
        return value == null || value !== value ? defaultValue : value;
      }
      var flow = createFlow();
      var flowRight = createFlow(true);
      function identity(value) {
        return value;
      }
      function iteratee(func) {
        return baseIteratee(typeof func == "function" ? func : baseClone(func, CLONE_DEEP_FLAG));
      }
      function matches(source) {
        return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
      }
      function matchesProperty(path, srcValue) {
        return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
      }
      var method = baseRest(function(path, args) {
        return function(object) {
          return baseInvoke(object, path, args);
        };
      });
      var methodOf = baseRest(function(object, args) {
        return function(path) {
          return baseInvoke(object, path, args);
        };
      });
      function mixin(object, source, options) {
        var props = keys(source), methodNames = baseFunctions(source, props);
        if (options == null && !(isObject2(source) && (methodNames.length || !props.length))) {
          options = source;
          source = object;
          object = this;
          methodNames = baseFunctions(source, keys(source));
        }
        var chain2 = !(isObject2(options) && "chain" in options) || !!options.chain, isFunc = isFunction2(object);
        arrayEach(methodNames, function(methodName) {
          var func = source[methodName];
          object[methodName] = func;
          if (isFunc) {
            object.prototype[methodName] = function() {
              var chainAll = this.__chain__;
              if (chain2 || chainAll) {
                var result2 = object(this.__wrapped__), actions = result2.__actions__ = copyArray(this.__actions__);
                actions.push({ "func": func, "args": arguments, "thisArg": object });
                result2.__chain__ = chainAll;
                return result2;
              }
              return func.apply(object, arrayPush([this.value()], arguments));
            };
          }
        });
        return object;
      }
      function noConflict() {
        if (root._ === this) {
          root._ = oldDash;
        }
        return this;
      }
      function noop() {
      }
      function nthArg(n) {
        n = toInteger(n);
        return baseRest(function(args) {
          return baseNth(args, n);
        });
      }
      var over = createOver(arrayMap);
      var overEvery = createOver(arrayEvery);
      var overSome = createOver(arraySome);
      function property(path) {
        return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
      }
      function propertyOf(object) {
        return function(path) {
          return object == null ? undefined$1 : baseGet(object, path);
        };
      }
      var range = createRange();
      var rangeRight = createRange(true);
      function stubArray() {
        return [];
      }
      function stubFalse() {
        return false;
      }
      function stubObject() {
        return {};
      }
      function stubString() {
        return "";
      }
      function stubTrue() {
        return true;
      }
      function times(n, iteratee2) {
        n = toInteger(n);
        if (n < 1 || n > MAX_SAFE_INTEGER) {
          return [];
        }
        var index = MAX_ARRAY_LENGTH, length = nativeMin(n, MAX_ARRAY_LENGTH);
        iteratee2 = getIteratee(iteratee2);
        n -= MAX_ARRAY_LENGTH;
        var result2 = baseTimes(length, iteratee2);
        while (++index < n) {
          iteratee2(index);
        }
        return result2;
      }
      function toPath(value) {
        if (isArray(value)) {
          return arrayMap(value, toKey);
        }
        return isSymbol(value) ? [value] : copyArray(stringToPath(toString4(value)));
      }
      function uniqueId(prefix) {
        var id = ++idCounter;
        return toString4(prefix) + id;
      }
      var add = createMathOperation(function(augend, addend) {
        return augend + addend;
      }, 0);
      var ceil = createRound("ceil");
      var divide = createMathOperation(function(dividend, divisor) {
        return dividend / divisor;
      }, 1);
      var floor = createRound("floor");
      function max(array) {
        return array && array.length ? baseExtremum(array, identity, baseGt) : undefined$1;
      }
      function maxBy(array, iteratee2) {
        return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseGt) : undefined$1;
      }
      function mean(array) {
        return baseMean(array, identity);
      }
      function meanBy(array, iteratee2) {
        return baseMean(array, getIteratee(iteratee2, 2));
      }
      function min(array) {
        return array && array.length ? baseExtremum(array, identity, baseLt) : undefined$1;
      }
      function minBy(array, iteratee2) {
        return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseLt) : undefined$1;
      }
      var multiply = createMathOperation(function(multiplier, multiplicand) {
        return multiplier * multiplicand;
      }, 1);
      var round = createRound("round");
      var subtract = createMathOperation(function(minuend, subtrahend) {
        return minuend - subtrahend;
      }, 0);
      function sum(array) {
        return array && array.length ? baseSum(array, identity) : 0;
      }
      function sumBy(array, iteratee2) {
        return array && array.length ? baseSum(array, getIteratee(iteratee2, 2)) : 0;
      }
      lodash2.after = after;
      lodash2.ary = ary;
      lodash2.assign = assign2;
      lodash2.assignIn = assignIn;
      lodash2.assignInWith = assignInWith;
      lodash2.assignWith = assignWith;
      lodash2.at = at;
      lodash2.before = before;
      lodash2.bind = bind;
      lodash2.bindAll = bindAll;
      lodash2.bindKey = bindKey;
      lodash2.castArray = castArray;
      lodash2.chain = chain;
      lodash2.chunk = chunk;
      lodash2.compact = compact;
      lodash2.concat = concat;
      lodash2.cond = cond;
      lodash2.conforms = conforms;
      lodash2.constant = constant;
      lodash2.countBy = countBy;
      lodash2.create = create;
      lodash2.curry = curry;
      lodash2.curryRight = curryRight;
      lodash2.debounce = debounce;
      lodash2.defaults = defaults;
      lodash2.defaultsDeep = defaultsDeep;
      lodash2.defer = defer;
      lodash2.delay = delay;
      lodash2.difference = difference;
      lodash2.differenceBy = differenceBy;
      lodash2.differenceWith = differenceWith;
      lodash2.drop = drop;
      lodash2.dropRight = dropRight;
      lodash2.dropRightWhile = dropRightWhile;
      lodash2.dropWhile = dropWhile;
      lodash2.fill = fill;
      lodash2.filter = filter;
      lodash2.flatMap = flatMap;
      lodash2.flatMapDeep = flatMapDeep;
      lodash2.flatMapDepth = flatMapDepth;
      lodash2.flatten = flatten;
      lodash2.flattenDeep = flattenDeep;
      lodash2.flattenDepth = flattenDepth;
      lodash2.flip = flip;
      lodash2.flow = flow;
      lodash2.flowRight = flowRight;
      lodash2.fromPairs = fromPairs;
      lodash2.functions = functions;
      lodash2.functionsIn = functionsIn;
      lodash2.groupBy = groupBy;
      lodash2.initial = initial;
      lodash2.intersection = intersection;
      lodash2.intersectionBy = intersectionBy;
      lodash2.intersectionWith = intersectionWith;
      lodash2.invert = invert;
      lodash2.invertBy = invertBy;
      lodash2.invokeMap = invokeMap;
      lodash2.iteratee = iteratee;
      lodash2.keyBy = keyBy;
      lodash2.keys = keys;
      lodash2.keysIn = keysIn;
      lodash2.map = map2;
      lodash2.mapKeys = mapKeys;
      lodash2.mapValues = mapValues;
      lodash2.matches = matches;
      lodash2.matchesProperty = matchesProperty;
      lodash2.memoize = memoize;
      lodash2.merge = merge2;
      lodash2.mergeWith = mergeWith;
      lodash2.method = method;
      lodash2.methodOf = methodOf;
      lodash2.mixin = mixin;
      lodash2.negate = negate;
      lodash2.nthArg = nthArg;
      lodash2.omit = omit;
      lodash2.omitBy = omitBy;
      lodash2.once = once;
      lodash2.orderBy = orderBy;
      lodash2.over = over;
      lodash2.overArgs = overArgs;
      lodash2.overEvery = overEvery;
      lodash2.overSome = overSome;
      lodash2.partial = partial;
      lodash2.partialRight = partialRight;
      lodash2.partition = partition;
      lodash2.pick = pick;
      lodash2.pickBy = pickBy;
      lodash2.property = property;
      lodash2.propertyOf = propertyOf;
      lodash2.pull = pull;
      lodash2.pullAll = pullAll;
      lodash2.pullAllBy = pullAllBy;
      lodash2.pullAllWith = pullAllWith;
      lodash2.pullAt = pullAt;
      lodash2.range = range;
      lodash2.rangeRight = rangeRight;
      lodash2.rearg = rearg;
      lodash2.reject = reject;
      lodash2.remove = remove;
      lodash2.rest = rest;
      lodash2.reverse = reverse;
      lodash2.sampleSize = sampleSize;
      lodash2.set = set2;
      lodash2.setWith = setWith;
      lodash2.shuffle = shuffle;
      lodash2.slice = slice;
      lodash2.sortBy = sortBy;
      lodash2.sortedUniq = sortedUniq;
      lodash2.sortedUniqBy = sortedUniqBy;
      lodash2.split = split;
      lodash2.spread = spread;
      lodash2.tail = tail;
      lodash2.take = take;
      lodash2.takeRight = takeRight;
      lodash2.takeRightWhile = takeRightWhile;
      lodash2.takeWhile = takeWhile;
      lodash2.tap = tap;
      lodash2.throttle = throttle;
      lodash2.thru = thru;
      lodash2.toArray = toArray2;
      lodash2.toPairs = toPairs;
      lodash2.toPairsIn = toPairsIn;
      lodash2.toPath = toPath;
      lodash2.toPlainObject = toPlainObject;
      lodash2.transform = transform;
      lodash2.unary = unary;
      lodash2.union = union;
      lodash2.unionBy = unionBy;
      lodash2.unionWith = unionWith;
      lodash2.uniq = uniq;
      lodash2.uniqBy = uniqBy;
      lodash2.uniqWith = uniqWith;
      lodash2.unset = unset;
      lodash2.unzip = unzip;
      lodash2.unzipWith = unzipWith;
      lodash2.update = update;
      lodash2.updateWith = updateWith;
      lodash2.values = values;
      lodash2.valuesIn = valuesIn;
      lodash2.without = without;
      lodash2.words = words;
      lodash2.wrap = wrap;
      lodash2.xor = xor;
      lodash2.xorBy = xorBy;
      lodash2.xorWith = xorWith;
      lodash2.zip = zip;
      lodash2.zipObject = zipObject;
      lodash2.zipObjectDeep = zipObjectDeep;
      lodash2.zipWith = zipWith;
      lodash2.entries = toPairs;
      lodash2.entriesIn = toPairsIn;
      lodash2.extend = assignIn;
      lodash2.extendWith = assignInWith;
      mixin(lodash2, lodash2);
      lodash2.add = add;
      lodash2.attempt = attempt;
      lodash2.camelCase = camelCase;
      lodash2.capitalize = capitalize;
      lodash2.ceil = ceil;
      lodash2.clamp = clamp;
      lodash2.clone = clone;
      lodash2.cloneDeep = cloneDeep;
      lodash2.cloneDeepWith = cloneDeepWith;
      lodash2.cloneWith = cloneWith;
      lodash2.conformsTo = conformsTo;
      lodash2.deburr = deburr;
      lodash2.defaultTo = defaultTo;
      lodash2.divide = divide;
      lodash2.endsWith = endsWith;
      lodash2.eq = eq;
      lodash2.escape = escape;
      lodash2.escapeRegExp = escapeRegExp;
      lodash2.every = every;
      lodash2.find = find;
      lodash2.findIndex = findIndex;
      lodash2.findKey = findKey;
      lodash2.findLast = findLast;
      lodash2.findLastIndex = findLastIndex;
      lodash2.findLastKey = findLastKey;
      lodash2.floor = floor;
      lodash2.forEach = forEach;
      lodash2.forEachRight = forEachRight;
      lodash2.forIn = forIn;
      lodash2.forInRight = forInRight;
      lodash2.forOwn = forOwn;
      lodash2.forOwnRight = forOwnRight;
      lodash2.get = get;
      lodash2.gt = gt;
      lodash2.gte = gte;
      lodash2.has = has2;
      lodash2.hasIn = hasIn;
      lodash2.head = head;
      lodash2.identity = identity;
      lodash2.includes = includes;
      lodash2.indexOf = indexOf;
      lodash2.inRange = inRange;
      lodash2.invoke = invoke;
      lodash2.isArguments = isArguments;
      lodash2.isArray = isArray;
      lodash2.isArrayBuffer = isArrayBuffer;
      lodash2.isArrayLike = isArrayLike;
      lodash2.isArrayLikeObject = isArrayLikeObject;
      lodash2.isBoolean = isBoolean2;
      lodash2.isBuffer = isBuffer;
      lodash2.isDate = isDate;
      lodash2.isElement = isElement;
      lodash2.isEmpty = isEmpty;
      lodash2.isEqual = isEqual;
      lodash2.isEqualWith = isEqualWith;
      lodash2.isError = isError;
      lodash2.isFinite = isFinite;
      lodash2.isFunction = isFunction2;
      lodash2.isInteger = isInteger2;
      lodash2.isLength = isLength;
      lodash2.isMap = isMap;
      lodash2.isMatch = isMatch;
      lodash2.isMatchWith = isMatchWith;
      lodash2.isNaN = isNaN2;
      lodash2.isNative = isNative;
      lodash2.isNil = isNil;
      lodash2.isNull = isNull2;
      lodash2.isNumber = isNumber;
      lodash2.isObject = isObject2;
      lodash2.isObjectLike = isObjectLike;
      lodash2.isPlainObject = isPlainObject;
      lodash2.isRegExp = isRegExp2;
      lodash2.isSafeInteger = isSafeInteger;
      lodash2.isSet = isSet;
      lodash2.isString = isString;
      lodash2.isSymbol = isSymbol;
      lodash2.isTypedArray = isTypedArray;
      lodash2.isUndefined = isUndefined2;
      lodash2.isWeakMap = isWeakMap;
      lodash2.isWeakSet = isWeakSet;
      lodash2.join = join;
      lodash2.kebabCase = kebabCase;
      lodash2.last = last;
      lodash2.lastIndexOf = lastIndexOf;
      lodash2.lowerCase = lowerCase;
      lodash2.lowerFirst = lowerFirst;
      lodash2.lt = lt;
      lodash2.lte = lte;
      lodash2.max = max;
      lodash2.maxBy = maxBy;
      lodash2.mean = mean;
      lodash2.meanBy = meanBy;
      lodash2.min = min;
      lodash2.minBy = minBy;
      lodash2.stubArray = stubArray;
      lodash2.stubFalse = stubFalse;
      lodash2.stubObject = stubObject;
      lodash2.stubString = stubString;
      lodash2.stubTrue = stubTrue;
      lodash2.multiply = multiply;
      lodash2.nth = nth;
      lodash2.noConflict = noConflict;
      lodash2.noop = noop;
      lodash2.now = now;
      lodash2.pad = pad;
      lodash2.padEnd = padEnd;
      lodash2.padStart = padStart;
      lodash2.parseInt = parseInt2;
      lodash2.random = random;
      lodash2.reduce = reduce;
      lodash2.reduceRight = reduceRight;
      lodash2.repeat = repeat2;
      lodash2.replace = replace;
      lodash2.result = result;
      lodash2.round = round;
      lodash2.runInContext = runInContext2;
      lodash2.sample = sample;
      lodash2.size = size;
      lodash2.snakeCase = snakeCase;
      lodash2.some = some;
      lodash2.sortedIndex = sortedIndex;
      lodash2.sortedIndexBy = sortedIndexBy;
      lodash2.sortedIndexOf = sortedIndexOf;
      lodash2.sortedLastIndex = sortedLastIndex;
      lodash2.sortedLastIndexBy = sortedLastIndexBy;
      lodash2.sortedLastIndexOf = sortedLastIndexOf;
      lodash2.startCase = startCase;
      lodash2.startsWith = startsWith;
      lodash2.subtract = subtract;
      lodash2.sum = sum;
      lodash2.sumBy = sumBy;
      lodash2.template = template;
      lodash2.times = times;
      lodash2.toFinite = toFinite;
      lodash2.toInteger = toInteger;
      lodash2.toLength = toLength;
      lodash2.toLower = toLower;
      lodash2.toNumber = toNumber;
      lodash2.toSafeInteger = toSafeInteger;
      lodash2.toString = toString4;
      lodash2.toUpper = toUpper;
      lodash2.trim = trim;
      lodash2.trimEnd = trimEnd;
      lodash2.trimStart = trimStart;
      lodash2.truncate = truncate;
      lodash2.unescape = unescape2;
      lodash2.uniqueId = uniqueId;
      lodash2.upperCase = upperCase;
      lodash2.upperFirst = upperFirst;
      lodash2.each = forEach;
      lodash2.eachRight = forEachRight;
      lodash2.first = head;
      mixin(lodash2, function() {
        var source = {};
        baseForOwn(lodash2, function(func, methodName) {
          if (!hasOwnProperty.call(lodash2.prototype, methodName)) {
            source[methodName] = func;
          }
        });
        return source;
      }(), { "chain": false });
      lodash2.VERSION = VERSION;
      arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
        lodash2[methodName].placeholder = lodash2;
      });
      arrayEach(["drop", "take"], function(methodName, index) {
        LazyWrapper.prototype[methodName] = function(n) {
          n = n === undefined$1 ? 1 : nativeMax(toInteger(n), 0);
          var result2 = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();
          if (result2.__filtered__) {
            result2.__takeCount__ = nativeMin(n, result2.__takeCount__);
          } else {
            result2.__views__.push({
              "size": nativeMin(n, MAX_ARRAY_LENGTH),
              "type": methodName + (result2.__dir__ < 0 ? "Right" : "")
            });
          }
          return result2;
        };
        LazyWrapper.prototype[methodName + "Right"] = function(n) {
          return this.reverse()[methodName](n).reverse();
        };
      });
      arrayEach(["filter", "map", "takeWhile"], function(methodName, index) {
        var type2 = index + 1, isFilter2 = type2 == LAZY_FILTER_FLAG || type2 == LAZY_WHILE_FLAG;
        LazyWrapper.prototype[methodName] = function(iteratee2) {
          var result2 = this.clone();
          result2.__iteratees__.push({
            "iteratee": getIteratee(iteratee2, 3),
            "type": type2
          });
          result2.__filtered__ = result2.__filtered__ || isFilter2;
          return result2;
        };
      });
      arrayEach(["head", "last"], function(methodName, index) {
        var takeName = "take" + (index ? "Right" : "");
        LazyWrapper.prototype[methodName] = function() {
          return this[takeName](1).value()[0];
        };
      });
      arrayEach(["initial", "tail"], function(methodName, index) {
        var dropName = "drop" + (index ? "" : "Right");
        LazyWrapper.prototype[methodName] = function() {
          return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
        };
      });
      LazyWrapper.prototype.compact = function() {
        return this.filter(identity);
      };
      LazyWrapper.prototype.find = function(predicate) {
        return this.filter(predicate).head();
      };
      LazyWrapper.prototype.findLast = function(predicate) {
        return this.reverse().find(predicate);
      };
      LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
        if (typeof path == "function") {
          return new LazyWrapper(this);
        }
        return this.map(function(value) {
          return baseInvoke(value, path, args);
        });
      });
      LazyWrapper.prototype.reject = function(predicate) {
        return this.filter(negate(getIteratee(predicate)));
      };
      LazyWrapper.prototype.slice = function(start, end) {
        start = toInteger(start);
        var result2 = this;
        if (result2.__filtered__ && (start > 0 || end < 0)) {
          return new LazyWrapper(result2);
        }
        if (start < 0) {
          result2 = result2.takeRight(-start);
        } else if (start) {
          result2 = result2.drop(start);
        }
        if (end !== undefined$1) {
          end = toInteger(end);
          result2 = end < 0 ? result2.dropRight(-end) : result2.take(end - start);
        }
        return result2;
      };
      LazyWrapper.prototype.takeRightWhile = function(predicate) {
        return this.reverse().takeWhile(predicate).reverse();
      };
      LazyWrapper.prototype.toArray = function() {
        return this.take(MAX_ARRAY_LENGTH);
      };
      baseForOwn(LazyWrapper.prototype, function(func, methodName) {
        var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash2[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
        if (!lodashFunc) {
          return;
        }
        lodash2.prototype[methodName] = function() {
          var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper, iteratee2 = args[0], useLazy = isLazy || isArray(value);
          var interceptor = function(value2) {
            var result3 = lodashFunc.apply(lodash2, arrayPush([value2], args));
            return isTaker && chainAll ? result3[0] : result3;
          };
          if (useLazy && checkIteratee && typeof iteratee2 == "function" && iteratee2.length != 1) {
            isLazy = useLazy = false;
          }
          var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
          if (!retUnwrapped && useLazy) {
            value = onlyLazy ? value : new LazyWrapper(this);
            var result2 = func.apply(value, args);
            result2.__actions__.push({ "func": thru, "args": [interceptor], "thisArg": undefined$1 });
            return new LodashWrapper(result2, chainAll);
          }
          if (isUnwrapped && onlyLazy) {
            return func.apply(this, args);
          }
          result2 = this.thru(interceptor);
          return isUnwrapped ? isTaker ? result2.value()[0] : result2.value() : result2;
        };
      });
      arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
        var func = arrayProto[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
        lodash2.prototype[methodName] = function() {
          var args = arguments;
          if (retUnwrapped && !this.__chain__) {
            var value = this.value();
            return func.apply(isArray(value) ? value : [], args);
          }
          return this[chainName](function(value2) {
            return func.apply(isArray(value2) ? value2 : [], args);
          });
        };
      });
      baseForOwn(LazyWrapper.prototype, function(func, methodName) {
        var lodashFunc = lodash2[methodName];
        if (lodashFunc) {
          var key = lodashFunc.name + "";
          if (!hasOwnProperty.call(realNames, key)) {
            realNames[key] = [];
          }
          realNames[key].push({ "name": methodName, "func": lodashFunc });
        }
      });
      realNames[createHybrid(undefined$1, WRAP_BIND_KEY_FLAG).name] = [{
        "name": "wrapper",
        "func": undefined$1
      }];
      LazyWrapper.prototype.clone = lazyClone;
      LazyWrapper.prototype.reverse = lazyReverse;
      LazyWrapper.prototype.value = lazyValue;
      lodash2.prototype.at = wrapperAt;
      lodash2.prototype.chain = wrapperChain;
      lodash2.prototype.commit = wrapperCommit;
      lodash2.prototype.next = wrapperNext;
      lodash2.prototype.plant = wrapperPlant;
      lodash2.prototype.reverse = wrapperReverse;
      lodash2.prototype.toJSON = lodash2.prototype.valueOf = lodash2.prototype.value = wrapperValue;
      lodash2.prototype.first = lodash2.prototype.head;
      if (symIterator) {
        lodash2.prototype[symIterator] = wrapperToIterator;
      }
      return lodash2;
    };
    var _ = runInContext();
    if (freeModule) {
      (freeModule.exports = _)._ = _;
      freeExports._ = _;
    } else {
      root._ = _;
    }
  }).call(commonjsGlobal);
})(lodash, lodash.exports);
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$1(target, key, result);
  return result;
};
let KlDrawer = class extends Vue {
  constructor() {
    super(...arguments);
    this.styles = {};
    this.timestamp = 0;
  }
  onWidthChange(val, oldVal) {
    if (val === oldVal)
      return;
    this.getStyles(val);
  }
  onVisibleChange(val, oldVal) {
    if (val === oldVal)
      return;
    if (val) {
      document.addEventListener("click", this.handleClick, true);
      this.styles = lodash.exports.merge(this.styles, {
        [this.placement]: "0"
      });
      this.timestamp = Date.now();
      this.$emit("open", null);
    } else {
      document.removeEventListener("click", this.handleClick, false);
      this.styles = lodash.exports.merge(this.styles, {
        [this.placement]: `-${this.width}${this.unit}`
      });
    }
  }
  handleClick(evt) {
    var _a, _b, _c;
    if (this.lock)
      return;
    let drawer2 = (_a = this.$refs) == null ? void 0 : _a["drawer"];
    let paths = lodash.exports.compact((_b = lodash.exports.get(evt, "path")) == null ? void 0 : _b.map((el) => el.className));
    if (!paths.includes((_c = drawer2 == null ? void 0 : drawer2.className) != null ? _c : "")) {
      if (Date.now() - this.timestamp < 10)
        return;
      this.visible && this.$emit("close", null);
    }
  }
  getStyles(value) {
    let size = ["top", "bottom"].includes(this.placement) ? "height" : "width";
    let styles = {};
    if (["left", "right"].includes(this.placement)) {
      styles["top"] = `${this.offset}${this.unit}`;
    }
    if (this.zIndex) {
      styles["z-index"] = this.zIndex;
    }
    this.styles = lodash.exports.merge({
      [size]: `${value}${this.unit}`,
      [this.placement]: `-${value}${this.unit}`
    }, styles);
  }
};
__decorateClass$1([
  Prop({ default: "right" })
], KlDrawer.prototype, "placement", 2);
__decorateClass$1([
  Prop({ default: 360 })
], KlDrawer.prototype, "width", 2);
__decorateClass$1([
  Prop({ default: false })
], KlDrawer.prototype, "visible", 2);
__decorateClass$1([
  Prop({ default: false })
], KlDrawer.prototype, "lock", 2);
__decorateClass$1([
  Prop({ default: void 0 })
], KlDrawer.prototype, "zIndex", 2);
__decorateClass$1([
  Prop({ default: "px" })
], KlDrawer.prototype, "unit", 2);
__decorateClass$1([
  Prop({ default: 0 })
], KlDrawer.prototype, "offset", 2);
__decorateClass$1([
  Provide()
], KlDrawer.prototype, "styles", 2);
__decorateClass$1([
  Provide()
], KlDrawer.prototype, "timestamp", 2);
__decorateClass$1([
  Watch("width")
], KlDrawer.prototype, "onWidthChange", 1);
__decorateClass$1([
  Watch("visible")
], KlDrawer.prototype, "onVisibleChange", 1);
KlDrawer = __decorateClass$1([
  Component({
    name: "KlDrawer",
    created() {
      this.getStyles(this.width);
    }
  })
], KlDrawer);
var render$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    ref: "drawer",
    staticClass: "kl-drawer",
    class: _vm.placement,
    style: _vm.styles
  }, [_vm._t("header"), _vm._t("default"), _vm._t("footer")], 2);
};
var staticRenderFns$1 = [];
var drawer_vue_vue_type_style_index_0_lang = /* @__PURE__ */ (() => ".kl-drawer{position:fixed;box-shadow:0 2px 12px #0000001a;transition:all .5s;background-color:#fff;z-index:1000;display:flex;flex-direction:column;justify-content:space-between}.kl-drawer.top{top:0;left:0;right:0}.kl-drawer.bottom{bottom:0;left:0;right:0}.kl-drawer.left{top:0;bottom:0;left:0}.kl-drawer.right{top:0;bottom:0;right:0}\n")();
function normalizeComponent(scriptExports, render2, staticRenderFns2, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
  var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
  if (render2) {
    options.render = render2;
    options.staticRenderFns = staticRenderFns2;
    options._compiled = true;
  }
  if (functionalTemplate) {
    options.functional = true;
  }
  if (scopeId) {
    options._scopeId = "data-v-" + scopeId;
  }
  var hook;
  if (moduleIdentifier) {
    hook = function(context) {
      context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
      if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
        context = __VUE_SSR_CONTEXT__;
      }
      if (injectStyles) {
        injectStyles.call(this, context);
      }
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    };
    options._ssrRegister = hook;
  } else if (injectStyles) {
    hook = shadowMode ? function() {
      injectStyles.call(this, (options.functional ? this.parent : this).$root.$options.shadowRoot);
    } : injectStyles;
  }
  if (hook) {
    if (options.functional) {
      options._injectStyles = hook;
      var originalRender = options.render;
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }
  return {
    exports: scriptExports,
    options
  };
}
const __cssModules$1 = {};
var __component__$1 = /* @__PURE__ */ normalizeComponent(KlDrawer, render$1, staticRenderFns$1, false, __vue2_injectStyles$1, null, null, null);
function __vue2_injectStyles$1(context) {
  for (let o in __cssModules$1) {
    this[o] = __cssModules$1[o];
  }
}
var drawer = /* @__PURE__ */ function() {
  return __component__$1.exports;
}();
var dist$1 = {};
var engine = {};
Object.defineProperty(engine, "__esModule", { value: true });
engine.CommonEngine = void 0;
var CommonEngine = function() {
  function CommonEngine2() {
  }
  Object.defineProperty(CommonEngine2.prototype, "name", {
    get: function() {
      return "";
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(CommonEngine2.prototype, "app", {
    get: function() {
      return this.__application;
    },
    enumerable: false,
    configurable: true
  });
  return CommonEngine2;
}();
engine.CommonEngine = CommonEngine;
var datanode = {};
var dist = {};
var __read$2 = commonjsGlobal && commonjsGlobal.__read || function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
};
var __values$3 = commonjsGlobal && commonjsGlobal.__values || function(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m)
    return m.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function() {
        if (o && i >= o.length)
          o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __spread$1 = commonjsGlobal && commonjsGlobal.__spread || function() {
  for (var ar = [], i = 0; i < arguments.length; i++)
    ar = ar.concat(__read$2(arguments[i]));
  return ar;
};
Object.defineProperty(dist, "__esModule", { value: true });
dist.parseAssign = dist.emit = dist.isDateString = void 0;
var lodash_1$2 = lodash.exports;
var __BigInt;
try {
  __BigInt = BigInt;
} catch (error) {
  __BigInt = Number;
}
var operators = {
  $lt: function(a, b) {
    return toValue(a) < toValue(b);
  },
  $lte: function(a, b) {
    return toValue(a) <= toValue(b);
  },
  $gt: function(a, b) {
    return toValue(a) > toValue(b);
  },
  $gte: function(a, b) {
    return toValue(a) >= toValue(b);
  },
  $eq: function(a, b) {
    return lodash_1$2.isEqual(toValue(a), toValue(b));
  },
  $ne: function(a, b) {
    return !lodash_1$2.isEqual(toValue(a), toValue(b));
  },
  $regex: function(a, reg) {
    return reg.test(a);
  },
  $mod: function(a, mod) {
    var _a = __read$2(mod, 2), x = _a[0], y = _a[1];
    return __BigInt(a) % __BigInt(x || 0) === __BigInt(y || 0);
  },
  $in: function(a, b) {
    if (lodash_1$2.isArray(a)) {
      return lodash_1$2.intersection(toValue(a), toValue(b)).length > 0;
    }
    return toValue(b).includes(toValue(a));
  },
  $nin: function(a, b) {
    if (lodash_1$2.isArray(a)) {
      return lodash_1$2.intersection(toValue(a), toValue(b)).length === 0;
    }
    return !toValue(b).includes(toValue(a));
  },
  $_in: function(a, b) {
    if (lodash_1$2.isArray(b)) {
      return lodash_1$2.intersection(toValue(a), toValue(b)).length > 0;
    }
    return toValue(a).includes(toValue(b));
  },
  $_nin: function(a, b) {
    if (lodash_1$2.isArray(b)) {
      return lodash_1$2.intersection(toValue(a), toValue(b)).length === 0;
    }
    return !toValue(a).includes(toValue(b));
  },
  $size: function(a, query) {
    if (lodash_1$2.isNumber(query)) {
      return a.length === query;
    }
    return calculation(a.length, query);
  },
  $exists: function(a, exists) {
    return (lodash_1$2.isNull(a) || lodash_1$2.isUndefined(a)) != exists;
  },
  $type: function(a, type2) {
    return typeof a === type2;
  },
  $not: function(a, query) {
    return !calculation(a, query);
  },
  $or: function() {
    var __result = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      __result[_i] = arguments[_i];
    }
    return emit(__result.map(String).join(" || "));
  },
  $nor: function() {
    var __result = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      __result[_i] = arguments[_i];
    }
    return !emit(__result.map(String).join(" || "));
  },
  $and: function() {
    var __result = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      __result[_i] = arguments[_i];
    }
    return emit(__result.map(String).join(" && "));
  }
};
function isDateString(value) {
  var date = new Date(value);
  return String(date) === "Invalid Date" ? false : true;
}
dist.isDateString = isDateString;
function toValue(value) {
  var val = value;
  if (typeof value === "number") {
    val = __BigInt(value);
  } else if (lodash_1$2.isString(value) && isDateString(value)) {
    val = new Date(value).getTime();
  } else if (lodash_1$2.isDate(value)) {
    val = value.getTime();
  } else if (lodash_1$2.isArray(value)) {
    val = value.map(toValue);
  }
  return val;
}
function calculation(data, query) {
  var e_1, _a;
  var __result = [];
  try {
    for (var _b = __values$3(lodash_1$2.toPairs(query)), _c = _b.next(); !_c.done; _c = _b.next()) {
      var pairs2 = _c.value;
      var _d = __read$2(pairs2, 2), operator = _d[0], value = _d[1];
      if (["$and", "$or", "$nor"].includes(operator)) {
        __result.push(calculationJoin(data, value, operator));
      } else if (operator === "$where") {
        __result.push(query["$where"](data));
      } else if (/^\$((?!\.).)*$/.test(operator)) {
        __result.push(operators[operator](data, value));
      } else if (lodash_1$2.isPlainObject(value)) {
        if (/^\$((?!\.).)*$/.test(operator)) {
          __result.push(calculation(data, value));
        } else {
          __result.push(calculation(lodash_1$2.result(data, operator), value));
        }
      } else {
        __result.push(operators.$eq(lodash_1$2.result(data, operator), value));
      }
    }
  } catch (e_1_1) {
    e_1 = { error: e_1_1 };
  } finally {
    try {
      if (_c && !_c.done && (_a = _b.return))
        _a.call(_b);
    } finally {
      if (e_1)
        throw e_1.error;
    }
  }
  return operators.$and.apply(operators, __spread$1(__result));
}
function calculationJoin(data, query, mode) {
  var e_2, _a;
  if (mode === void 0) {
    mode = "$and";
  }
  var __result = [];
  try {
    for (var query_1 = __values$3(query), query_1_1 = query_1.next(); !query_1_1.done; query_1_1 = query_1.next()) {
      var item = query_1_1.value;
      for (var key in item) {
        __result.push(calculation(data, item));
      }
    }
  } catch (e_2_1) {
    e_2 = { error: e_2_1 };
  } finally {
    try {
      if (query_1_1 && !query_1_1.done && (_a = query_1.return))
        _a.call(query_1);
    } finally {
      if (e_2)
        throw e_2.error;
    }
  }
  return operators[mode].apply(operators, __spread$1(__result));
}
function judgment(data, query, options) {
  if (lodash_1$2.isEmpty(query))
    return true;
  query = parseAssign(query, options);
  var __result = [];
  for (var key in query) {
    if (["$and", "$or", "$nor"].includes(key)) {
      __result.push(calculationJoin(data, query[key], key));
    } else {
      __result.push(calculation(data, lodash_1$2.isPlainObject(query[key]) && !isOperator(query[key]) ? query[key] : query));
    }
  }
  return operators.$and.apply(operators, __spread$1(__result));
}
function isOperator(query) {
  var e_3, _a;
  try {
    for (var _b = __values$3(Object.keys(query)), _c = _b.next(); !_c.done; _c = _b.next()) {
      var key = _c.value;
      if (/^\$/.test(key)) {
        return true;
      }
    }
  } catch (e_3_1) {
    e_3 = { error: e_3_1 };
  } finally {
    try {
      if (_c && !_c.done && (_a = _b.return))
        _a.call(_b);
    } finally {
      if (e_3)
        throw e_3.error;
    }
  }
  return false;
}
function emit(value) {
  var fn = Function;
  return new fn("return " + value)();
}
dist.emit = emit;
function parseAssign(data, options) {
  var e_4, _a;
  if (!lodash_1$2.isPlainObject(options))
    return data;
  var str2 = JSON.stringify(data);
  try {
    for (var _b = __values$3(lodash_1$2.toPairs(options)), _c = _b.next(); !_c.done; _c = _b.next()) {
      var item = _c.value;
      var _d = __read$2(assign.apply(void 0, __spread$1(item)), 2), search = _d[0], value = _d[1];
      if (/^\$/.test(item[0])) {
        str2 = str2.replace(search, value);
      }
    }
  } catch (e_4_1) {
    e_4 = { error: e_4_1 };
  } finally {
    try {
      if (_c && !_c.done && (_a = _b.return))
        _a.call(_b);
    } finally {
      if (e_4)
        throw e_4.error;
    }
  }
  return JSON.parse(str2);
}
dist.parseAssign = parseAssign;
function assign(key, value) {
  var search;
  var str2 = /^\$/.test(key) ? "\\" + key : key;
  if (lodash_1$2.isString(value)) {
    search = new RegExp("" + str2, "gi");
  } else {
    search = new RegExp('\\"(' + str2 + ')\\"', "gi");
  }
  return [search, value];
}
function ruleJudgment(query, options) {
  return function(data) {
    return judgment(data, query, options);
  };
}
var _default = dist.default = ruleJudgment.bind(commonjsGlobal);
var __assign$1 = commonjsGlobal && commonjsGlobal.__assign || function() {
  __assign$1 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign$1.apply(this, arguments);
};
var __values$2 = commonjsGlobal && commonjsGlobal.__values || function(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m)
    return m.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function() {
        if (o && i >= o.length)
          o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read$1 = commonjsGlobal && commonjsGlobal.__read || function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
};
var __spread = commonjsGlobal && commonjsGlobal.__spread || function() {
  for (var ar = [], i = 0; i < arguments.length; i++)
    ar = ar.concat(__read$1(arguments[i]));
  return ar;
};
var __importDefault$1 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(datanode, "__esModule", { value: true });
datanode.removeMaps = datanode.initMaps = datanode.dataNodeProxy = datanode.DataNodeProxy = void 0;
var rule_judgment_1 = __importDefault$1(dist);
var lodash_1$1 = lodash.exports;
var DataNodeProxy = function() {
  function DataNodeProxy2(data) {
    this.__data = lodash_1$1.cloneDeep(data);
  }
  Object.defineProperty(DataNodeProxy2.prototype, "data", {
    get: function() {
      return this.__data;
    },
    enumerable: false,
    configurable: true
  });
  DataNodeProxy2.prototype.find = function(query, data) {
    var e_1, _a;
    if (data === void 0) {
      data = this.__data;
    }
    var __data;
    try {
      for (var data_1 = __values$2(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
        var item = data_1_1.value;
        if (!lodash_1$1.isEmpty(query) && rule_judgment_1.default(__assign$1({}, query))(item)) {
          __data = item;
          return __data;
        } else if (item.children) {
          __data = this.find(query, item.children);
          if (__data)
            return __data;
        }
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (data_1_1 && !data_1_1.done && (_a = data_1.return))
          _a.call(data_1);
      } finally {
        if (e_1)
          throw e_1.error;
      }
    }
    return __data;
  };
  DataNodeProxy2.prototype.add = function(key, items, data) {
    var _a;
    if (data === void 0) {
      data = this.__data;
    }
    var __items = lodash_1$1.isArray(items) ? items : [items];
    if (!key) {
      data.push.apply(data, __spread(__items));
      return;
    }
    var __data = this.find({ key }, data);
    if (__data) {
      if (!__data.children) {
        __data.children = [];
      }
      (_a = __data.children) === null || _a === void 0 ? void 0 : _a.push.apply(_a, __spread(__items));
    }
  };
  DataNodeProxy2.prototype.remove = function(key, data) {
    var e_2, _a;
    if (data === void 0) {
      data = this.__data;
    }
    var __data = data;
    try {
      for (var __data_1 = __values$2(__data), __data_1_1 = __data_1.next(); !__data_1_1.done; __data_1_1 = __data_1.next()) {
        var item = __data_1_1.value;
        if (item.key === key) {
          lodash_1$1.remove(__data, function(o) {
            return o.key === key;
          });
          return __data;
        } else if (item.children) {
          var __children = this.remove(key, item.children);
          if (!lodash_1$1.isEqual(__children, item.children))
            return __data;
        }
      }
    } catch (e_2_1) {
      e_2 = { error: e_2_1 };
    } finally {
      try {
        if (__data_1_1 && !__data_1_1.done && (_a = __data_1.return))
          _a.call(__data_1);
      } finally {
        if (e_2)
          throw e_2.error;
      }
    }
    return __data;
  };
  DataNodeProxy2.prototype.update = function(key, payload, data) {
    var e_3, _a;
    if (data === void 0) {
      data = this.__data;
    }
    var __data = data;
    var i = 0;
    try {
      for (var __data_2 = __values$2(__data), __data_2_1 = __data_2.next(); !__data_2_1.done; __data_2_1 = __data_2.next()) {
        var item = __data_2_1.value;
        if (item.key === key) {
          __data[i] = lodash_1$1.merge(item, payload);
          return __data;
        } else if (item.children) {
          var children = lodash_1$1.cloneDeep(item.children);
          var __children = this.update(key, payload, item.children);
          if (!lodash_1$1.isEqual(__children, children))
            return __data;
        }
        i++;
      }
    } catch (e_3_1) {
      e_3 = { error: e_3_1 };
    } finally {
      try {
        if (__data_2_1 && !__data_2_1.done && (_a = __data_2.return))
          _a.call(__data_2);
      } finally {
        if (e_3)
          throw e_3.error;
      }
    }
    return __data;
  };
  return DataNodeProxy2;
}();
datanode.DataNodeProxy = DataNodeProxy;
datanode.dataNodeProxy = function(data) {
  return new DataNodeProxy(data);
};
function initMaps(data, maps) {
  if (maps === void 0) {
    maps = [];
  }
  data.forEach(function(item, __v) {
    item.maps = __spread(maps);
    item.maps.push(lodash_1$1.pick(item, ["key", "name"]));
    if (item.children) {
      return initMaps(item.children, item.maps);
    }
  });
  return data;
}
datanode.initMaps = initMaps;
function removeMaps(data) {
  data.forEach(function(item, __v) {
    lodash_1$1.unset(item, "maps");
    if (item.children) {
      return removeMaps(item.children);
    }
  });
  return data;
}
datanode.removeMaps = removeMaps;
var channel = {};
var __values$1 = commonjsGlobal && commonjsGlobal.__values || function(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m)
    return m.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function() {
        if (o && i >= o.length)
          o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(channel, "__esModule", { value: true });
channel.getChannelKey = void 0;
function getChannelKey(channels, routePath, name) {
  var e_1, _a;
  if (name === void 0) {
    name = "key";
  }
  try {
    for (var channels_1 = __values$1(channels), channels_1_1 = channels_1.next(); !channels_1_1.done; channels_1_1 = channels_1.next()) {
      var channel2 = channels_1_1.value;
      if (routePath.replace(/^\/|\/$/g, "") === channel2.label) {
        return channel2.key;
      }
      if (channel2.children) {
        var __key = findChannelKey(channel2.children, channel2.key, routePath, name);
        if (__key) {
          return __key;
        }
      }
    }
  } catch (e_1_1) {
    e_1 = { error: e_1_1 };
  } finally {
    try {
      if (channels_1_1 && !channels_1_1.done && (_a = channels_1.return))
        _a.call(channels_1);
    } finally {
      if (e_1)
        throw e_1.error;
    }
  }
  return void 0;
}
channel.getChannelKey = getChannelKey;
function findChannelKey(navs, key, routePath, name) {
  var e_2, _a;
  if (name === void 0) {
    name = "key";
  }
  var __key;
  try {
    for (var navs_1 = __values$1(navs), navs_1_1 = navs_1.next(); !navs_1_1.done; navs_1_1 = navs_1.next()) {
      var nav = navs_1_1.value;
      if (nav.children) {
        var __nav = nav.children.find(function(o) {
          return o[name] === routePath;
        });
        if (__nav) {
          return key;
        } else {
          __key = findChannelKey(nav.children, key, routePath, name);
        }
      } else if (nav.route === routePath) {
        return key;
      }
    }
  } catch (e_2_1) {
    e_2 = { error: e_2_1 };
  } finally {
    try {
      if (navs_1_1 && !navs_1_1.done && (_a = navs_1.return))
        _a.call(navs_1);
    } finally {
      if (e_2)
        throw e_2.error;
    }
  }
  return __key;
}
var httpClient = {};
var queryString = {};
var strictUriEncode = (str2) => encodeURIComponent(str2).replace(/[!'()*]/g, (x) => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);
var token = "%[a-f0-9]{2}";
var singleMatcher = new RegExp(token, "gi");
var multiMatcher = new RegExp("(" + token + ")+", "gi");
function decodeComponents(components2, split) {
  try {
    return decodeURIComponent(components2.join(""));
  } catch (err) {
  }
  if (components2.length === 1) {
    return components2;
  }
  split = split || 1;
  var left = components2.slice(0, split);
  var right = components2.slice(split);
  return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}
function decode$1(input) {
  try {
    return decodeURIComponent(input);
  } catch (err) {
    var tokens = input.match(singleMatcher);
    for (var i = 1; i < tokens.length; i++) {
      input = decodeComponents(tokens, i).join("");
      tokens = input.match(singleMatcher);
    }
    return input;
  }
}
function customDecodeURIComponent(input) {
  var replaceMap = {
    "%FE%FF": "\uFFFD\uFFFD",
    "%FF%FE": "\uFFFD\uFFFD"
  };
  var match = multiMatcher.exec(input);
  while (match) {
    try {
      replaceMap[match[0]] = decodeURIComponent(match[0]);
    } catch (err) {
      var result = decode$1(match[0]);
      if (result !== match[0]) {
        replaceMap[match[0]] = result;
      }
    }
    match = multiMatcher.exec(input);
  }
  replaceMap["%C2"] = "\uFFFD";
  var entries = Object.keys(replaceMap);
  for (var i = 0; i < entries.length; i++) {
    var key = entries[i];
    input = input.replace(new RegExp(key, "g"), replaceMap[key]);
  }
  return input;
}
var decodeUriComponent = function(encodedURI) {
  if (typeof encodedURI !== "string") {
    throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof encodedURI + "`");
  }
  try {
    encodedURI = encodedURI.replace(/\+/g, " ");
    return decodeURIComponent(encodedURI);
  } catch (err) {
    return customDecodeURIComponent(encodedURI);
  }
};
var splitOnFirst = (string, separator) => {
  if (!(typeof string === "string" && typeof separator === "string")) {
    throw new TypeError("Expected the arguments to be of type `string`");
  }
  if (separator === "") {
    return [string];
  }
  const separatorIndex = string.indexOf(separator);
  if (separatorIndex === -1) {
    return [string];
  }
  return [
    string.slice(0, separatorIndex),
    string.slice(separatorIndex + separator.length)
  ];
};
var filterObj = function(obj, predicate) {
  var ret = {};
  var keys = Object.keys(obj);
  var isArr = Array.isArray(predicate);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var val = obj[key];
    if (isArr ? predicate.indexOf(key) !== -1 : predicate(key, val, obj)) {
      ret[key] = val;
    }
  }
  return ret;
};
(function(exports) {
  const strictUriEncode$1 = strictUriEncode;
  const decodeComponent = decodeUriComponent;
  const splitOnFirst$1 = splitOnFirst;
  const filterObject = filterObj;
  const isNullOrUndefined = (value) => value === null || value === void 0;
  function encoderForArrayFormat(options) {
    switch (options.arrayFormat) {
      case "index":
        return (key) => (result, value) => {
          const index = result.length;
          if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
            return result;
          }
          if (value === null) {
            return [...result, [encode2(key, options), "[", index, "]"].join("")];
          }
          return [
            ...result,
            [encode2(key, options), "[", encode2(index, options), "]=", encode2(value, options)].join("")
          ];
        };
      case "bracket":
        return (key) => (result, value) => {
          if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
            return result;
          }
          if (value === null) {
            return [...result, [encode2(key, options), "[]"].join("")];
          }
          return [...result, [encode2(key, options), "[]=", encode2(value, options)].join("")];
        };
      case "comma":
      case "separator":
        return (key) => (result, value) => {
          if (value === null || value === void 0 || value.length === 0) {
            return result;
          }
          if (result.length === 0) {
            return [[encode2(key, options), "=", encode2(value, options)].join("")];
          }
          return [[result, encode2(value, options)].join(options.arrayFormatSeparator)];
        };
      default:
        return (key) => (result, value) => {
          if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
            return result;
          }
          if (value === null) {
            return [...result, encode2(key, options)];
          }
          return [...result, [encode2(key, options), "=", encode2(value, options)].join("")];
        };
    }
  }
  function parserForArrayFormat(options) {
    let result;
    switch (options.arrayFormat) {
      case "index":
        return (key, value, accumulator) => {
          result = /\[(\d*)\]$/.exec(key);
          key = key.replace(/\[\d*\]$/, "");
          if (!result) {
            accumulator[key] = value;
            return;
          }
          if (accumulator[key] === void 0) {
            accumulator[key] = {};
          }
          accumulator[key][result[1]] = value;
        };
      case "bracket":
        return (key, value, accumulator) => {
          result = /(\[\])$/.exec(key);
          key = key.replace(/\[\]$/, "");
          if (!result) {
            accumulator[key] = value;
            return;
          }
          if (accumulator[key] === void 0) {
            accumulator[key] = [value];
            return;
          }
          accumulator[key] = [].concat(accumulator[key], value);
        };
      case "comma":
      case "separator":
        return (key, value, accumulator) => {
          const isArray = typeof value === "string" && value.includes(options.arrayFormatSeparator);
          const isEncodedArray = typeof value === "string" && !isArray && decode2(value, options).includes(options.arrayFormatSeparator);
          value = isEncodedArray ? decode2(value, options) : value;
          const newValue = isArray || isEncodedArray ? value.split(options.arrayFormatSeparator).map((item) => decode2(item, options)) : value === null ? value : decode2(value, options);
          accumulator[key] = newValue;
        };
      default:
        return (key, value, accumulator) => {
          if (accumulator[key] === void 0) {
            accumulator[key] = value;
            return;
          }
          accumulator[key] = [].concat(accumulator[key], value);
        };
    }
  }
  function validateArrayFormatSeparator(value) {
    if (typeof value !== "string" || value.length !== 1) {
      throw new TypeError("arrayFormatSeparator must be single character string");
    }
  }
  function encode2(value, options) {
    if (options.encode) {
      return options.strict ? strictUriEncode$1(value) : encodeURIComponent(value);
    }
    return value;
  }
  function decode2(value, options) {
    if (options.decode) {
      return decodeComponent(value);
    }
    return value;
  }
  function keysSorter(input) {
    if (Array.isArray(input)) {
      return input.sort();
    }
    if (typeof input === "object") {
      return keysSorter(Object.keys(input)).sort((a, b) => Number(a) - Number(b)).map((key) => input[key]);
    }
    return input;
  }
  function removeHash(input) {
    const hashStart = input.indexOf("#");
    if (hashStart !== -1) {
      input = input.slice(0, hashStart);
    }
    return input;
  }
  function getHash(url) {
    let hash = "";
    const hashStart = url.indexOf("#");
    if (hashStart !== -1) {
      hash = url.slice(hashStart);
    }
    return hash;
  }
  function extract(input) {
    input = removeHash(input);
    const queryStart = input.indexOf("?");
    if (queryStart === -1) {
      return "";
    }
    return input.slice(queryStart + 1);
  }
  function parseValue(value, options) {
    if (options.parseNumbers && !Number.isNaN(Number(value)) && (typeof value === "string" && value.trim() !== "")) {
      value = Number(value);
    } else if (options.parseBooleans && value !== null && (value.toLowerCase() === "true" || value.toLowerCase() === "false")) {
      value = value.toLowerCase() === "true";
    }
    return value;
  }
  function parse(query, options) {
    options = Object.assign({
      decode: true,
      sort: true,
      arrayFormat: "none",
      arrayFormatSeparator: ",",
      parseNumbers: false,
      parseBooleans: false
    }, options);
    validateArrayFormatSeparator(options.arrayFormatSeparator);
    const formatter = parserForArrayFormat(options);
    const ret = /* @__PURE__ */ Object.create(null);
    if (typeof query !== "string") {
      return ret;
    }
    query = query.trim().replace(/^[?#&]/, "");
    if (!query) {
      return ret;
    }
    for (const param of query.split("&")) {
      if (param === "") {
        continue;
      }
      let [key, value] = splitOnFirst$1(options.decode ? param.replace(/\+/g, " ") : param, "=");
      value = value === void 0 ? null : ["comma", "separator"].includes(options.arrayFormat) ? value : decode2(value, options);
      formatter(decode2(key, options), value, ret);
    }
    for (const key of Object.keys(ret)) {
      const value = ret[key];
      if (typeof value === "object" && value !== null) {
        for (const k of Object.keys(value)) {
          value[k] = parseValue(value[k], options);
        }
      } else {
        ret[key] = parseValue(value, options);
      }
    }
    if (options.sort === false) {
      return ret;
    }
    return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key) => {
      const value = ret[key];
      if (Boolean(value) && typeof value === "object" && !Array.isArray(value)) {
        result[key] = keysSorter(value);
      } else {
        result[key] = value;
      }
      return result;
    }, /* @__PURE__ */ Object.create(null));
  }
  exports.extract = extract;
  exports.parse = parse;
  exports.stringify = (object, options) => {
    if (!object) {
      return "";
    }
    options = Object.assign({
      encode: true,
      strict: true,
      arrayFormat: "none",
      arrayFormatSeparator: ","
    }, options);
    validateArrayFormatSeparator(options.arrayFormatSeparator);
    const shouldFilter = (key) => options.skipNull && isNullOrUndefined(object[key]) || options.skipEmptyString && object[key] === "";
    const formatter = encoderForArrayFormat(options);
    const objectCopy = {};
    for (const key of Object.keys(object)) {
      if (!shouldFilter(key)) {
        objectCopy[key] = object[key];
      }
    }
    const keys = Object.keys(objectCopy);
    if (options.sort !== false) {
      keys.sort(options.sort);
    }
    return keys.map((key) => {
      const value = object[key];
      if (value === void 0) {
        return "";
      }
      if (value === null) {
        return encode2(key, options);
      }
      if (Array.isArray(value)) {
        return value.reduce(formatter(key), []).join("&");
      }
      return encode2(key, options) + "=" + encode2(value, options);
    }).filter((x) => x.length > 0).join("&");
  };
  exports.parseUrl = (url, options) => {
    options = Object.assign({
      decode: true
    }, options);
    const [url_, hash] = splitOnFirst$1(url, "#");
    return Object.assign({
      url: url_.split("?")[0] || "",
      query: parse(extract(url), options)
    }, options && options.parseFragmentIdentifier && hash ? { fragmentIdentifier: decode2(hash, options) } : {});
  };
  exports.stringifyUrl = (object, options) => {
    options = Object.assign({
      encode: true,
      strict: true
    }, options);
    const url = removeHash(object.url).split("?")[0] || "";
    const queryFromUrl = exports.extract(object.url);
    const parsedQueryFromUrl = exports.parse(queryFromUrl, { sort: false });
    const query = Object.assign(parsedQueryFromUrl, object.query);
    let queryString2 = exports.stringify(query, options);
    if (queryString2) {
      queryString2 = `?${queryString2}`;
    }
    let hash = getHash(object.url);
    if (object.fragmentIdentifier) {
      hash = `#${encode2(object.fragmentIdentifier, options)}`;
    }
    return `${url}${queryString2}${hash}`;
  };
  exports.pick = (input, filter, options) => {
    options = Object.assign({
      parseFragmentIdentifier: true
    }, options);
    const { url, query, fragmentIdentifier } = exports.parseUrl(input, options);
    return exports.stringifyUrl({
      url,
      query: filterObject(query, filter),
      fragmentIdentifier
    }, options);
  };
  exports.exclude = (input, filter, options) => {
    const exclusionFilter = Array.isArray(filter) ? (key) => !filter.includes(key) : (key, value) => !filter(key, value);
    return exports.pick(input, exclusionFilter, options);
  };
})(queryString);
var requiresPort = function required(port2, protocol) {
  protocol = protocol.split(":")[0];
  port2 = +port2;
  if (!port2)
    return false;
  switch (protocol) {
    case "http":
    case "ws":
      return port2 !== 80;
    case "https":
    case "wss":
      return port2 !== 443;
    case "ftp":
      return port2 !== 21;
    case "gopher":
      return port2 !== 70;
    case "file":
      return false;
  }
  return port2 !== 0;
};
var querystringify$1 = {};
var has = Object.prototype.hasOwnProperty, undef;
function decode(input) {
  try {
    return decodeURIComponent(input.replace(/\+/g, " "));
  } catch (e) {
    return null;
  }
}
function encode(input) {
  try {
    return encodeURIComponent(input);
  } catch (e) {
    return null;
  }
}
function querystring(query) {
  var parser = /([^=?#&]+)=?([^&]*)/g, result = {}, part;
  while (part = parser.exec(query)) {
    var key = decode(part[1]), value = decode(part[2]);
    if (key === null || value === null || key in result)
      continue;
    result[key] = value;
  }
  return result;
}
function querystringify(obj, prefix) {
  prefix = prefix || "";
  var pairs2 = [], value, key;
  if (typeof prefix !== "string")
    prefix = "?";
  for (key in obj) {
    if (has.call(obj, key)) {
      value = obj[key];
      if (!value && (value === null || value === undef || isNaN(value))) {
        value = "";
      }
      key = encode(key);
      value = encode(value);
      if (key === null || value === null)
        continue;
      pairs2.push(key + "=" + value);
    }
  }
  return pairs2.length ? prefix + pairs2.join("&") : "";
}
querystringify$1.stringify = querystringify;
querystringify$1.parse = querystring;
var required2 = requiresPort, qs = querystringify$1, controlOrWhitespace = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/, CRHTLF = /[\n\r\t]/g, slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//, port = /:\d+$/, protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i, windowsDriveLetter = /^[a-zA-Z]:/;
function trimLeft(str2) {
  return (str2 ? str2 : "").toString().replace(controlOrWhitespace, "");
}
var rules = [
  ["#", "hash"],
  ["?", "query"],
  function sanitize(address, url) {
    return isSpecial(url.protocol) ? address.replace(/\\/g, "/") : address;
  },
  ["/", "pathname"],
  ["@", "auth", 1],
  [NaN, "host", void 0, 1, 1],
  [/:(\d*)$/, "port", void 0, 1],
  [NaN, "hostname", void 0, 1, 1]
];
var ignore = { hash: 1, query: 1 };
function lolcation(loc) {
  var globalVar;
  if (typeof window !== "undefined")
    globalVar = window;
  else if (typeof commonjsGlobal !== "undefined")
    globalVar = commonjsGlobal;
  else if (typeof self !== "undefined")
    globalVar = self;
  else
    globalVar = {};
  var location = globalVar.location || {};
  loc = loc || location;
  var finaldestination = {}, type2 = typeof loc, key;
  if (loc.protocol === "blob:") {
    finaldestination = new Url(unescape(loc.pathname), {});
  } else if (type2 === "string") {
    finaldestination = new Url(loc, {});
    for (key in ignore)
      delete finaldestination[key];
  } else if (type2 === "object") {
    for (key in loc) {
      if (key in ignore)
        continue;
      finaldestination[key] = loc[key];
    }
    if (finaldestination.slashes === void 0) {
      finaldestination.slashes = slashes.test(loc.href);
    }
  }
  return finaldestination;
}
function isSpecial(scheme) {
  return scheme === "file:" || scheme === "ftp:" || scheme === "http:" || scheme === "https:" || scheme === "ws:" || scheme === "wss:";
}
function extractProtocol(address, location) {
  address = trimLeft(address);
  address = address.replace(CRHTLF, "");
  location = location || {};
  var match = protocolre.exec(address);
  var protocol = match[1] ? match[1].toLowerCase() : "";
  var forwardSlashes = !!match[2];
  var otherSlashes = !!match[3];
  var slashesCount = 0;
  var rest;
  if (forwardSlashes) {
    if (otherSlashes) {
      rest = match[2] + match[3] + match[4];
      slashesCount = match[2].length + match[3].length;
    } else {
      rest = match[2] + match[4];
      slashesCount = match[2].length;
    }
  } else {
    if (otherSlashes) {
      rest = match[3] + match[4];
      slashesCount = match[3].length;
    } else {
      rest = match[4];
    }
  }
  if (protocol === "file:") {
    if (slashesCount >= 2) {
      rest = rest.slice(2);
    }
  } else if (isSpecial(protocol)) {
    rest = match[4];
  } else if (protocol) {
    if (forwardSlashes) {
      rest = rest.slice(2);
    }
  } else if (slashesCount >= 2 && isSpecial(location.protocol)) {
    rest = match[4];
  }
  return {
    protocol,
    slashes: forwardSlashes || isSpecial(protocol),
    slashesCount,
    rest
  };
}
function resolve(relative, base) {
  if (relative === "")
    return base;
  var path = (base || "/").split("/").slice(0, -1).concat(relative.split("/")), i = path.length, last = path[i - 1], unshift = false, up = 0;
  while (i--) {
    if (path[i] === ".") {
      path.splice(i, 1);
    } else if (path[i] === "..") {
      path.splice(i, 1);
      up++;
    } else if (up) {
      if (i === 0)
        unshift = true;
      path.splice(i, 1);
      up--;
    }
  }
  if (unshift)
    path.unshift("");
  if (last === "." || last === "..")
    path.push("");
  return path.join("/");
}
function Url(address, location, parser) {
  address = trimLeft(address);
  address = address.replace(CRHTLF, "");
  if (!(this instanceof Url)) {
    return new Url(address, location, parser);
  }
  var relative, extracted, parse, instruction, index, key, instructions = rules.slice(), type2 = typeof location, url = this, i = 0;
  if (type2 !== "object" && type2 !== "string") {
    parser = location;
    location = null;
  }
  if (parser && typeof parser !== "function")
    parser = qs.parse;
  location = lolcation(location);
  extracted = extractProtocol(address || "", location);
  relative = !extracted.protocol && !extracted.slashes;
  url.slashes = extracted.slashes || relative && location.slashes;
  url.protocol = extracted.protocol || location.protocol || "";
  address = extracted.rest;
  if (extracted.protocol === "file:" && (extracted.slashesCount !== 2 || windowsDriveLetter.test(address)) || !extracted.slashes && (extracted.protocol || extracted.slashesCount < 2 || !isSpecial(url.protocol))) {
    instructions[3] = [/(.*)/, "pathname"];
  }
  for (; i < instructions.length; i++) {
    instruction = instructions[i];
    if (typeof instruction === "function") {
      address = instruction(address, url);
      continue;
    }
    parse = instruction[0];
    key = instruction[1];
    if (parse !== parse) {
      url[key] = address;
    } else if (typeof parse === "string") {
      index = parse === "@" ? address.lastIndexOf(parse) : address.indexOf(parse);
      if (~index) {
        if (typeof instruction[2] === "number") {
          url[key] = address.slice(0, index);
          address = address.slice(index + instruction[2]);
        } else {
          url[key] = address.slice(index);
          address = address.slice(0, index);
        }
      }
    } else if (index = parse.exec(address)) {
      url[key] = index[1];
      address = address.slice(0, index.index);
    }
    url[key] = url[key] || (relative && instruction[3] ? location[key] || "" : "");
    if (instruction[4])
      url[key] = url[key].toLowerCase();
  }
  if (parser)
    url.query = parser(url.query);
  if (relative && location.slashes && url.pathname.charAt(0) !== "/" && (url.pathname !== "" || location.pathname !== "")) {
    url.pathname = resolve(url.pathname, location.pathname);
  }
  if (url.pathname.charAt(0) !== "/" && isSpecial(url.protocol)) {
    url.pathname = "/" + url.pathname;
  }
  if (!required2(url.port, url.protocol)) {
    url.host = url.hostname;
    url.port = "";
  }
  url.username = url.password = "";
  if (url.auth) {
    index = url.auth.indexOf(":");
    if (~index) {
      url.username = url.auth.slice(0, index);
      url.username = encodeURIComponent(decodeURIComponent(url.username));
      url.password = url.auth.slice(index + 1);
      url.password = encodeURIComponent(decodeURIComponent(url.password));
    } else {
      url.username = encodeURIComponent(decodeURIComponent(url.auth));
    }
    url.auth = url.password ? url.username + ":" + url.password : url.username;
  }
  url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
  url.href = url.toString();
}
function set$1(part, value, fn) {
  var url = this;
  switch (part) {
    case "query":
      if (typeof value === "string" && value.length) {
        value = (fn || qs.parse)(value);
      }
      url[part] = value;
      break;
    case "port":
      url[part] = value;
      if (!required2(value, url.protocol)) {
        url.host = url.hostname;
        url[part] = "";
      } else if (value) {
        url.host = url.hostname + ":" + value;
      }
      break;
    case "hostname":
      url[part] = value;
      if (url.port)
        value += ":" + url.port;
      url.host = value;
      break;
    case "host":
      url[part] = value;
      if (port.test(value)) {
        value = value.split(":");
        url.port = value.pop();
        url.hostname = value.join(":");
      } else {
        url.hostname = value;
        url.port = "";
      }
      break;
    case "protocol":
      url.protocol = value.toLowerCase();
      url.slashes = !fn;
      break;
    case "pathname":
    case "hash":
      if (value) {
        var char = part === "pathname" ? "/" : "#";
        url[part] = value.charAt(0) !== char ? char + value : value;
      } else {
        url[part] = value;
      }
      break;
    case "username":
    case "password":
      url[part] = encodeURIComponent(value);
      break;
    case "auth":
      var index = value.indexOf(":");
      if (~index) {
        url.username = value.slice(0, index);
        url.username = encodeURIComponent(decodeURIComponent(url.username));
        url.password = value.slice(index + 1);
        url.password = encodeURIComponent(decodeURIComponent(url.password));
      } else {
        url.username = encodeURIComponent(decodeURIComponent(value));
      }
  }
  for (var i = 0; i < rules.length; i++) {
    var ins = rules[i];
    if (ins[4])
      url[ins[1]] = url[ins[1]].toLowerCase();
  }
  url.auth = url.password ? url.username + ":" + url.password : url.username;
  url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
  url.href = url.toString();
  return url;
}
function toString(stringify) {
  if (!stringify || typeof stringify !== "function")
    stringify = qs.stringify;
  var query, url = this, host = url.host, protocol = url.protocol;
  if (protocol && protocol.charAt(protocol.length - 1) !== ":")
    protocol += ":";
  var result = protocol + (url.protocol && url.slashes || isSpecial(url.protocol) ? "//" : "");
  if (url.username) {
    result += url.username;
    if (url.password)
      result += ":" + url.password;
    result += "@";
  } else if (url.password) {
    result += ":" + url.password;
    result += "@";
  } else if (url.protocol !== "file:" && isSpecial(url.protocol) && !host && url.pathname !== "/") {
    result += "@";
  }
  if (host[host.length - 1] === ":" || port.test(url.hostname) && !url.port) {
    host += ":";
  }
  result += host + url.pathname;
  query = typeof url.query === "object" ? stringify(url.query) : url.query;
  if (query)
    result += query.charAt(0) !== "?" ? "?" + query : query;
  if (url.hash)
    result += url.hash;
  return result;
}
Url.prototype = { set: set$1, toString };
Url.extractProtocol = extractProtocol;
Url.location = lolcation;
Url.trimLeft = trimLeft;
Url.qs = qs;
var urlParse = Url;
var __assign = commonjsGlobal && commonjsGlobal.__assign || function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = commonjsGlobal && commonjsGlobal.__generator || function(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1)
      throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f)
      throw new TypeError("Generator is already executing.");
    while (_)
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
          return t;
        if (y = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
};
var __values = commonjsGlobal && commonjsGlobal.__values || function(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m)
    return m.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function() {
        if (o && i >= o.length)
          o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = commonjsGlobal && commonjsGlobal.__read || function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
};
var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(httpClient, "__esModule", { value: true });
httpClient.xhrClient = httpClient.HttpClient = httpClient.sendData = void 0;
var query_string_1 = __importDefault(queryString);
var url_parse_1 = __importDefault(urlParse);
var lodash_1 = lodash.exports;
function setHeader(options) {
  var _a;
  var headers = (_a = options === null || options === void 0 ? void 0 : options.headers) !== null && _a !== void 0 ? _a : {};
  if (options === null || options === void 0 ? void 0 : options.token) {
    headers.authorization = ["Bearer", options.token].join(" ");
  }
  return headers;
}
function onProgress(next, total) {
  return function(progressEvent) {
    var __total = total !== null && total !== void 0 ? total : progressEvent.total;
    var percentage = Math.round(progressEvent.loaded * 100 / __total);
    if (percentage <= 100) {
      next({
        percentage,
        total: __total,
        size: progressEvent.loaded
      });
    }
  };
}
function getResponseData(options, next) {
  var _this = this;
  return function(client) {
    return __awaiter(_this, void 0, void 0, function() {
      var response;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4, client(options)];
          case 1:
            response = _a.sent();
            next && next(response);
            if (!response)
              return [2, null];
            if (response.status >= 200 && response.status < 300) {
              return [2, response.data];
            }
            throw new Error(response.statusText);
        }
      });
    });
  };
}
function sendData(method, url, data) {
  return function(client, options) {
    var _a;
    var config = __assign({
      method,
      url,
      headers: setHeader(options),
      timeout: options === null || options === void 0 ? void 0 : options.timeout
    }, options === null || options === void 0 ? void 0 : options.config);
    if (options === null || options === void 0 ? void 0 : options.download) {
      config.responseType = (_a = options.responseType) !== null && _a !== void 0 ? _a : "blob";
      config.headers["Content-Type"] = "application/x-www-form-urlencoded";
      config.onDownloadProgress = onProgress(options.download, options.total);
    }
    if (options === null || options === void 0 ? void 0 : options.upload) {
      config.method = "post";
      config.headers["Content-Type"] = "multipart/form-data";
      config.onUploadProgress = onProgress(options.upload, options.total);
    }
    if (method.toLocaleLowerCase() === "get") {
      var _b = url_parse_1.default(url), query = _b.query, origin_1 = _b.origin, pathname = _b.pathname;
      config.params = __assign(__assign({}, query_string_1.default.parse(query)), data);
      config.url = origin_1 + pathname;
    } else {
      config.data = data;
    }
    return getResponseData(config, options === null || options === void 0 ? void 0 : options.success)(client);
  };
}
httpClient.sendData = sendData;
var HttpClient = function() {
  function HttpClient2(client, options) {
    var _this = this;
    this.get = function(url, data) {
      return sendData("GET", url, data)(_this.__client, _this.__options);
    };
    this.GET = this.get;
    this.post = function(url, data) {
      return sendData("POST", url, data)(_this.__client, _this.__options);
    };
    this.POST = this.post;
    this.put = function(url, data) {
      return sendData("PUT", url, data)(_this.__client, _this.__options);
    };
    this.PUT = this.put;
    this.delete = function(url, data) {
      return sendData("DELETE", url, data)(_this.__client, _this.__options);
    };
    this.DELETE = this.delete;
    this.download = function(url) {
      return sendData("GET", url, null)(_this.__client, __assign({ download: function(info) {
        return null;
      } }, _this.__options));
    };
    this.DOWNLOAD = this.download;
    this.upload = function(url, data) {
      return sendData("POST", url, data)(_this.__client, __assign({ upload: function(info) {
        return null;
      } }, _this.__options));
    };
    this.UPLOAD = this.upload;
    this.__client = client;
    this.__options = options !== null && options !== void 0 ? options : {};
  }
  return HttpClient2;
}();
httpClient.HttpClient = HttpClient;
function xhrClient(xhr) {
  return function(config) {
    return new Promise(function(resolve2, reject) {
      var e_1, _a;
      var method = config.method, url = config.url, timeout = config.timeout, data = config.data, params = config.params, onDownloadProgress = config.onDownloadProgress, onUploadProgress = config.onUploadProgress, headers = config.headers, responseType = config.responseType, timeoutErrorMessage = config.timeoutErrorMessage;
      var __url = method.toLocaleLowerCase() === "get" ? query_string_1.default.stringifyUrl({ url: url !== null && url !== void 0 ? url : "", query: params }) : url !== null && url !== void 0 ? url : "";
      xhr.open(method !== null && method !== void 0 ? method : "get", __url, true);
      xhr.timeout = timeout !== null && timeout !== void 0 ? timeout : 0;
      var __data = data;
      if (!lodash_1.get(headers, "content-type") && ["post", "put"].includes(method.toLowerCase())) {
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        __data = query_string_1.default.stringify(data);
      }
      if (headers) {
        try {
          for (var _b = __values(Object.entries(headers)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), key = _d[0], val = _d[1];
            xhr.setRequestHeader(key, val);
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a = _b.return))
              _a.call(_b);
          } finally {
            if (e_1)
              throw e_1.error;
          }
        }
      }
      xhr.onreadystatechange = function() {
        var _a2, _b2;
        if (xhr.readyState !== 4)
          return;
        var headers2 = lodash_1.fromPairs(lodash_1.compact(xhr.getAllResponseHeaders().split(/\r|\n/)).map(function(r) {
          return r.split(/\:/).map(lodash_1.trim);
        }));
        var response = {
          data: xhr.response,
          status: xhr.status,
          statusText: xhr.statusText,
          headers: headers2
        };
        if (["arraybuffer", "blob"].includes(responseType !== null && responseType !== void 0 ? responseType : "")) {
          response.data = new Blob([xhr.response], { type: xhr.getResponseHeader("content-type") });
        } else if (/^(application\/json)/.test((_a2 = headers2["content-type"]) !== null && _a2 !== void 0 ? _a2 : "")) {
          response.data = JSON.parse((_b2 = xhr.response) !== null && _b2 !== void 0 ? _b2 : "");
        }
        resolve2(response);
      };
      if (onDownloadProgress) {
        xhr.onprogress = onDownloadProgress;
      }
      if (onUploadProgress) {
        xhr.upload.onprogress = onUploadProgress;
      }
      xhr.onerror = function() {
        return reject("Error");
      };
      xhr.ontimeout = function() {
        return reject(timeoutErrorMessage !== null && timeoutErrorMessage !== void 0 ? timeoutErrorMessage : "\u7F51\u7EDC\u8BF7\u6C42\u8D85\u65F6\uFF01");
      };
      xhr.onabort = function() {
      };
      xhr.send(__data);
    });
  };
}
httpClient.xhrClient = xhrClient;
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var engine_1 = engine;
  Object.defineProperty(exports, "CommonEngine", { enumerable: true, get: function() {
    return engine_1.CommonEngine;
  } });
  var datanode_1 = datanode;
  Object.defineProperty(exports, "DataNodeProxy", { enumerable: true, get: function() {
    return datanode_1.DataNodeProxy;
  } });
  Object.defineProperty(exports, "dataNodeProxy", { enumerable: true, get: function() {
    return datanode_1.dataNodeProxy;
  } });
  Object.defineProperty(exports, "initMaps", { enumerable: true, get: function() {
    return datanode_1.initMaps;
  } });
  Object.defineProperty(exports, "removeMaps", { enumerable: true, get: function() {
    return datanode_1.removeMaps;
  } });
  var channel_1 = channel;
  Object.defineProperty(exports, "getChannelKey", { enumerable: true, get: function() {
    return channel_1.getChannelKey;
  } });
  var http_client_1 = httpClient;
  Object.defineProperty(exports, "HttpClient", { enumerable: true, get: function() {
    return http_client_1.HttpClient;
  } });
  Object.defineProperty(exports, "xhrClient", { enumerable: true, get: function() {
    return http_client_1.xhrClient;
  } });
})(dist$1);
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
let KlChannelSearchbar = class extends Vue {
  constructor() {
    super(...arguments);
    this.keywords = "";
    this.restaurants = [];
  }
  onKeywordsChange(val, oldVal) {
    if (val === oldVal)
      return;
    this.update(val);
  }
  onValueChange(val, oldVal) {
    if (val === oldVal)
      return;
    this.keywords = val;
  }
  onDataChange(val, oldVal) {
    if (val === oldVal)
      return;
    this.restaurants = dist$1.initMaps(val);
  }
  update(value) {
  }
  handleCommand(value) {
  }
  handleFocus(evt) {
  }
  handleBlur(evt) {
  }
  querySearch(queryString2, done) {
    let list = [];
    filterChannelDataNode(this.restaurants, lodash.exports.trim(queryString2), list);
    if (this.filter) {
      list = list.filter(_default(this.filter));
    }
    let props = lodash.exports.assign({
      value: "name",
      key: "key",
      description: "description",
      maps: "maps"
    }, this.props);
    done(list.map(parseProps(props)));
  }
  handleClear() {
    var _a;
    this.keywords = "";
    let searchbar = (_a = this.$refs) == null ? void 0 : _a["searchbar"];
    setTimeout(() => {
      searchbar.focus();
    }, 300);
  }
  keyWordsString(row) {
    var _a;
    let keywords = lodash.exports.trim(this.keywords);
    return (_a = row.name) == null ? void 0 : _a.replace(new RegExp(`(${keywords})`, "gi"), `<span class='keywords'>$1</span>`);
  }
  handleSelect(node) {
    this.handleCommand(node);
    this.handleClear();
  }
};
__decorateClass([
  Provide()
], KlChannelSearchbar.prototype, "item", 2);
__decorateClass([
  Prop({ default: "\u641C\u7D22\u5185\u5BB9" })
], KlChannelSearchbar.prototype, "placeholder", 2);
__decorateClass([
  Prop({ default: void 0 })
], KlChannelSearchbar.prototype, "data", 2);
__decorateClass([
  Prop({ default: void 0 })
], KlChannelSearchbar.prototype, "props", 2);
__decorateClass([
  Prop({ default: void 0 })
], KlChannelSearchbar.prototype, "filter", 2);
__decorateClass([
  Prop({ default: "searchbar-popper" })
], KlChannelSearchbar.prototype, "popperClass", 2);
__decorateClass([
  Prop({ default: "default" })
], KlChannelSearchbar.prototype, "size", 2);
__decorateClass([
  Provide()
], KlChannelSearchbar.prototype, "keywords", 2);
__decorateClass([
  Provide()
], KlChannelSearchbar.prototype, "restaurants", 2);
__decorateClass([
  Model("update")
], KlChannelSearchbar.prototype, "value", 2);
__decorateClass([
  Watch("keywords")
], KlChannelSearchbar.prototype, "onKeywordsChange", 1);
__decorateClass([
  Watch("value")
], KlChannelSearchbar.prototype, "onValueChange", 1);
__decorateClass([
  Watch("data")
], KlChannelSearchbar.prototype, "onDataChange", 1);
__decorateClass([
  Emit("update")
], KlChannelSearchbar.prototype, "update", 1);
__decorateClass([
  Emit("command")
], KlChannelSearchbar.prototype, "handleCommand", 1);
__decorateClass([
  Emit("focus")
], KlChannelSearchbar.prototype, "handleFocus", 1);
__decorateClass([
  Emit("blur")
], KlChannelSearchbar.prototype, "handleBlur", 1);
KlChannelSearchbar = __decorateClass([
  Component({
    name: "KlChannelSearchbar",
    mounted() {
      var _a;
      this.keywords = this.value;
      this.restaurants = dist$1.initMaps((_a = this.data) != null ? _a : []);
    }
  })
], KlChannelSearchbar);
var render = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("el-autocomplete", {
    ref: "searchbar",
    attrs: {
      "size": _vm.size,
      "prefix-icon": "el-icon-search",
      "popper-class": _vm.popperClass,
      "placeholder": _vm.placeholder,
      "fetch-suggestions": _vm.querySearch
    },
    on: {
      "focus": _vm.handleFocus,
      "blur": _vm.handleBlur,
      "select": _vm.handleSelect
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(_ref) {
        var item = _ref.item;
        return _c("div", {}, [item.maps ? _c("div", {
          staticClass: "name"
        }, _vm._l(item.maps, function(row, key) {
          return _c("fragment", {
            key
          }, [[key > 0 ? _c("span", [_vm._v(" > ")]) : _vm._e(), _c("span", {
            domProps: {
              "innerHTML": _vm._s(_vm.keyWordsString(row))
            }
          })]], 2);
        }), 1) : _c("div", {
          staticClass: "name"
        }, [_vm._v(_vm._s(item.name))]), item.description ? _c("span", {
          staticClass: "description"
        }, [_vm._v(_vm._s(item.description))]) : _vm._e()]);
      }
    }]),
    model: {
      value: _vm.keywords,
      callback: function($$v) {
        _vm.keywords = $$v;
      },
      expression: "keywords"
    }
  }, [_c("i", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.keywords,
      expression: "keywords"
    }],
    staticClass: "el-icon-error el-input__icon",
    attrs: {
      "slot": "suffix"
    },
    on: {
      "click": _vm.handleClear
    },
    slot: "suffix"
  })]);
};
var staticRenderFns = [];
var channelSearchbar_vue_vue_type_style_index_0_lang = /* @__PURE__ */ (() => '.searchbar-popper{border-radius:0;padding:10px 0 0;margin-top:11px!important;min-width:350px}.searchbar-popper .el-autocomplete-suggestion__wrap{padding-top:0;max-height:580px}.searchbar-popper .popper__arrow{display:block}.searchbar-popper li{line-height:normal!important;padding:0!important;pointer-events:none}.searchbar-popper li>div{padding:5px 20px 10px;pointer-events:visible}.searchbar-popper li>div.is-disabled{pointer-events:none;cursor:not-allowed;opacity:.4}.searchbar-popper li>div.is-disabled:after{content:""}.searchbar-popper li .name{line-height:2.4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.searchbar-popper li .description{display:block;font-size:12px;line-height:1.8;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.searchbar-popper li .keywords{color:#ef432c;font-weight:600}\n')();
const __cssModules = {};
var __component__ = /* @__PURE__ */ normalizeComponent(KlChannelSearchbar, render, staticRenderFns, false, __vue2_injectStyles, null, null, null);
function __vue2_injectStyles(context) {
  for (let o in __cssModules) {
    this[o] = __cssModules[o];
  }
}
var channelSearchbar = /* @__PURE__ */ function() {
  return __component__.exports;
}();
var components = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Drawer: drawer,
  ChannelSearchbar: channelSearchbar
}, Symbol.toStringTag, { value: "Module" }));
var jsYaml$1 = {};
var loader$1 = {};
var common$6 = {};
function isNothing(subject) {
  return typeof subject === "undefined" || subject === null;
}
function isObject(subject) {
  return typeof subject === "object" && subject !== null;
}
function toArray(sequence) {
  if (Array.isArray(sequence))
    return sequence;
  else if (isNothing(sequence))
    return [];
  return [sequence];
}
function extend(target, source) {
  var index, length, key, sourceKeys;
  if (source) {
    sourceKeys = Object.keys(source);
    for (index = 0, length = sourceKeys.length; index < length; index += 1) {
      key = sourceKeys[index];
      target[key] = source[key];
    }
  }
  return target;
}
function repeat(string, count) {
  var result = "", cycle;
  for (cycle = 0; cycle < count; cycle += 1) {
    result += string;
  }
  return result;
}
function isNegativeZero(number) {
  return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
}
common$6.isNothing = isNothing;
common$6.isObject = isObject;
common$6.toArray = toArray;
common$6.repeat = repeat;
common$6.isNegativeZero = isNegativeZero;
common$6.extend = extend;
function YAMLException$4(reason, mark2) {
  Error.call(this);
  this.name = "YAMLException";
  this.reason = reason;
  this.mark = mark2;
  this.message = (this.reason || "(unknown reason)") + (this.mark ? " " + this.mark.toString() : "");
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack || "";
  }
}
YAMLException$4.prototype = Object.create(Error.prototype);
YAMLException$4.prototype.constructor = YAMLException$4;
YAMLException$4.prototype.toString = function toString2(compact) {
  var result = this.name + ": ";
  result += this.reason || "(unknown reason)";
  if (!compact && this.mark) {
    result += " " + this.mark.toString();
  }
  return result;
};
var exception = YAMLException$4;
var common$5 = common$6;
function Mark$1(name, buffer, position, line, column) {
  this.name = name;
  this.buffer = buffer;
  this.position = position;
  this.line = line;
  this.column = column;
}
Mark$1.prototype.getSnippet = function getSnippet(indent, maxLength) {
  var head, start, tail, end, snippet;
  if (!this.buffer)
    return null;
  indent = indent || 4;
  maxLength = maxLength || 75;
  head = "";
  start = this.position;
  while (start > 0 && "\0\r\n\x85\u2028\u2029".indexOf(this.buffer.charAt(start - 1)) === -1) {
    start -= 1;
    if (this.position - start > maxLength / 2 - 1) {
      head = " ... ";
      start += 5;
      break;
    }
  }
  tail = "";
  end = this.position;
  while (end < this.buffer.length && "\0\r\n\x85\u2028\u2029".indexOf(this.buffer.charAt(end)) === -1) {
    end += 1;
    if (end - this.position > maxLength / 2 - 1) {
      tail = " ... ";
      end -= 5;
      break;
    }
  }
  snippet = this.buffer.slice(start, end);
  return common$5.repeat(" ", indent) + head + snippet + tail + "\n" + common$5.repeat(" ", indent + this.position - start + head.length) + "^";
};
Mark$1.prototype.toString = function toString3(compact) {
  var snippet, where = "";
  if (this.name) {
    where += 'in "' + this.name + '" ';
  }
  where += "at line " + (this.line + 1) + ", column " + (this.column + 1);
  if (!compact) {
    snippet = this.getSnippet();
    if (snippet) {
      where += ":\n" + snippet;
    }
  }
  return where;
};
var mark = Mark$1;
var YAMLException$3 = exception;
var TYPE_CONSTRUCTOR_OPTIONS = [
  "kind",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "defaultStyle",
  "styleAliases"
];
var YAML_NODE_KINDS = [
  "scalar",
  "sequence",
  "mapping"
];
function compileStyleAliases(map2) {
  var result = {};
  if (map2 !== null) {
    Object.keys(map2).forEach(function(style) {
      map2[style].forEach(function(alias) {
        result[String(alias)] = style;
      });
    });
  }
  return result;
}
function Type$h(tag, options) {
  options = options || {};
  Object.keys(options).forEach(function(name) {
    if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
      throw new YAMLException$3('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
    }
  });
  this.tag = tag;
  this.kind = options["kind"] || null;
  this.resolve = options["resolve"] || function() {
    return true;
  };
  this.construct = options["construct"] || function(data) {
    return data;
  };
  this.instanceOf = options["instanceOf"] || null;
  this.predicate = options["predicate"] || null;
  this.represent = options["represent"] || null;
  this.defaultStyle = options["defaultStyle"] || null;
  this.styleAliases = compileStyleAliases(options["styleAliases"] || null);
  if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
    throw new YAMLException$3('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
  }
}
var type = Type$h;
var common$4 = common$6;
var YAMLException$2 = exception;
var Type$g = type;
function compileList(schema2, name, result) {
  var exclude = [];
  schema2.include.forEach(function(includedSchema) {
    result = compileList(includedSchema, name, result);
  });
  schema2[name].forEach(function(currentType) {
    result.forEach(function(previousType, previousIndex) {
      if (previousType.tag === currentType.tag && previousType.kind === currentType.kind) {
        exclude.push(previousIndex);
      }
    });
    result.push(currentType);
  });
  return result.filter(function(type2, index) {
    return exclude.indexOf(index) === -1;
  });
}
function compileMap() {
  var result = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {}
  }, index, length;
  function collectType(type2) {
    result[type2.kind][type2.tag] = result["fallback"][type2.tag] = type2;
  }
  for (index = 0, length = arguments.length; index < length; index += 1) {
    arguments[index].forEach(collectType);
  }
  return result;
}
function Schema$5(definition) {
  this.include = definition.include || [];
  this.implicit = definition.implicit || [];
  this.explicit = definition.explicit || [];
  this.implicit.forEach(function(type2) {
    if (type2.loadKind && type2.loadKind !== "scalar") {
      throw new YAMLException$2("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    }
  });
  this.compiledImplicit = compileList(this, "implicit", []);
  this.compiledExplicit = compileList(this, "explicit", []);
  this.compiledTypeMap = compileMap(this.compiledImplicit, this.compiledExplicit);
}
Schema$5.DEFAULT = null;
Schema$5.create = function createSchema() {
  var schemas, types;
  switch (arguments.length) {
    case 1:
      schemas = Schema$5.DEFAULT;
      types = arguments[0];
      break;
    case 2:
      schemas = arguments[0];
      types = arguments[1];
      break;
    default:
      throw new YAMLException$2("Wrong number of arguments for Schema.create function");
  }
  schemas = common$4.toArray(schemas);
  types = common$4.toArray(types);
  if (!schemas.every(function(schema2) {
    return schema2 instanceof Schema$5;
  })) {
    throw new YAMLException$2("Specified list of super schemas (or a single Schema object) contains a non-Schema object.");
  }
  if (!types.every(function(type2) {
    return type2 instanceof Type$g;
  })) {
    throw new YAMLException$2("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  }
  return new Schema$5({
    include: schemas,
    explicit: types
  });
};
var schema = Schema$5;
var Type$f = type;
var str = new Type$f("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(data) {
    return data !== null ? data : "";
  }
});
var Type$e = type;
var seq = new Type$e("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(data) {
    return data !== null ? data : [];
  }
});
var Type$d = type;
var map = new Type$d("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(data) {
    return data !== null ? data : {};
  }
});
var Schema$4 = schema;
var failsafe = new Schema$4({
  explicit: [
    str,
    seq,
    map
  ]
});
var Type$c = type;
function resolveYamlNull(data) {
  if (data === null)
    return true;
  var max = data.length;
  return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
}
function constructYamlNull() {
  return null;
}
function isNull(object) {
  return object === null;
}
var _null = new Type$c("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: resolveYamlNull,
  construct: constructYamlNull,
  predicate: isNull,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    }
  },
  defaultStyle: "lowercase"
});
var Type$b = type;
function resolveYamlBoolean(data) {
  if (data === null)
    return false;
  var max = data.length;
  return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
}
function constructYamlBoolean(data) {
  return data === "true" || data === "True" || data === "TRUE";
}
function isBoolean(object) {
  return Object.prototype.toString.call(object) === "[object Boolean]";
}
var bool = new Type$b("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: resolveYamlBoolean,
  construct: constructYamlBoolean,
  predicate: isBoolean,
  represent: {
    lowercase: function(object) {
      return object ? "true" : "false";
    },
    uppercase: function(object) {
      return object ? "TRUE" : "FALSE";
    },
    camelcase: function(object) {
      return object ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
});
var common$3 = common$6;
var Type$a = type;
function isHexCode(c) {
  return 48 <= c && c <= 57 || 65 <= c && c <= 70 || 97 <= c && c <= 102;
}
function isOctCode(c) {
  return 48 <= c && c <= 55;
}
function isDecCode(c) {
  return 48 <= c && c <= 57;
}
function resolveYamlInteger(data) {
  if (data === null)
    return false;
  var max = data.length, index = 0, hasDigits = false, ch;
  if (!max)
    return false;
  ch = data[index];
  if (ch === "-" || ch === "+") {
    ch = data[++index];
  }
  if (ch === "0") {
    if (index + 1 === max)
      return true;
    ch = data[++index];
    if (ch === "b") {
      index++;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_")
          continue;
        if (ch !== "0" && ch !== "1")
          return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
    if (ch === "x") {
      index++;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_")
          continue;
        if (!isHexCode(data.charCodeAt(index)))
          return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
    for (; index < max; index++) {
      ch = data[index];
      if (ch === "_")
        continue;
      if (!isOctCode(data.charCodeAt(index)))
        return false;
      hasDigits = true;
    }
    return hasDigits && ch !== "_";
  }
  if (ch === "_")
    return false;
  for (; index < max; index++) {
    ch = data[index];
    if (ch === "_")
      continue;
    if (ch === ":")
      break;
    if (!isDecCode(data.charCodeAt(index))) {
      return false;
    }
    hasDigits = true;
  }
  if (!hasDigits || ch === "_")
    return false;
  if (ch !== ":")
    return true;
  return /^(:[0-5]?[0-9])+$/.test(data.slice(index));
}
function constructYamlInteger(data) {
  var value = data, sign = 1, ch, base, digits = [];
  if (value.indexOf("_") !== -1) {
    value = value.replace(/_/g, "");
  }
  ch = value[0];
  if (ch === "-" || ch === "+") {
    if (ch === "-")
      sign = -1;
    value = value.slice(1);
    ch = value[0];
  }
  if (value === "0")
    return 0;
  if (ch === "0") {
    if (value[1] === "b")
      return sign * parseInt(value.slice(2), 2);
    if (value[1] === "x")
      return sign * parseInt(value, 16);
    return sign * parseInt(value, 8);
  }
  if (value.indexOf(":") !== -1) {
    value.split(":").forEach(function(v) {
      digits.unshift(parseInt(v, 10));
    });
    value = 0;
    base = 1;
    digits.forEach(function(d) {
      value += d * base;
      base *= 60;
    });
    return sign * value;
  }
  return sign * parseInt(value, 10);
}
function isInteger(object) {
  return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 === 0 && !common$3.isNegativeZero(object));
}
var int = new Type$a("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: resolveYamlInteger,
  construct: constructYamlInteger,
  predicate: isInteger,
  represent: {
    binary: function(obj) {
      return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
    },
    octal: function(obj) {
      return obj >= 0 ? "0" + obj.toString(8) : "-0" + obj.toString(8).slice(1);
    },
    decimal: function(obj) {
      return obj.toString(10);
    },
    hexadecimal: function(obj) {
      return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
});
var common$2 = common$6;
var Type$9 = type;
var YAML_FLOAT_PATTERN = new RegExp("^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
function resolveYamlFloat(data) {
  if (data === null)
    return false;
  if (!YAML_FLOAT_PATTERN.test(data) || data[data.length - 1] === "_") {
    return false;
  }
  return true;
}
function constructYamlFloat(data) {
  var value, sign, base, digits;
  value = data.replace(/_/g, "").toLowerCase();
  sign = value[0] === "-" ? -1 : 1;
  digits = [];
  if ("+-".indexOf(value[0]) >= 0) {
    value = value.slice(1);
  }
  if (value === ".inf") {
    return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
  } else if (value === ".nan") {
    return NaN;
  } else if (value.indexOf(":") >= 0) {
    value.split(":").forEach(function(v) {
      digits.unshift(parseFloat(v, 10));
    });
    value = 0;
    base = 1;
    digits.forEach(function(d) {
      value += d * base;
      base *= 60;
    });
    return sign * value;
  }
  return sign * parseFloat(value, 10);
}
var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
function representYamlFloat(object, style) {
  var res;
  if (isNaN(object)) {
    switch (style) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  } else if (Number.POSITIVE_INFINITY === object) {
    switch (style) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  } else if (Number.NEGATIVE_INFINITY === object) {
    switch (style) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  } else if (common$2.isNegativeZero(object)) {
    return "-0.0";
  }
  res = object.toString(10);
  return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
}
function isFloat(object) {
  return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || common$2.isNegativeZero(object));
}
var float = new Type$9("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: resolveYamlFloat,
  construct: constructYamlFloat,
  predicate: isFloat,
  represent: representYamlFloat,
  defaultStyle: "lowercase"
});
var Schema$3 = schema;
var json = new Schema$3({
  include: [
    failsafe
  ],
  implicit: [
    _null,
    bool,
    int,
    float
  ]
});
var Schema$2 = schema;
var core = new Schema$2({
  include: [
    json
  ]
});
var Type$8 = type;
var YAML_DATE_REGEXP = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$");
var YAML_TIMESTAMP_REGEXP = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");
function resolveYamlTimestamp(data) {
  if (data === null)
    return false;
  if (YAML_DATE_REGEXP.exec(data) !== null)
    return true;
  if (YAML_TIMESTAMP_REGEXP.exec(data) !== null)
    return true;
  return false;
}
function constructYamlTimestamp(data) {
  var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
  match = YAML_DATE_REGEXP.exec(data);
  if (match === null)
    match = YAML_TIMESTAMP_REGEXP.exec(data);
  if (match === null)
    throw new Error("Date resolve error");
  year = +match[1];
  month = +match[2] - 1;
  day = +match[3];
  if (!match[4]) {
    return new Date(Date.UTC(year, month, day));
  }
  hour = +match[4];
  minute = +match[5];
  second = +match[6];
  if (match[7]) {
    fraction = match[7].slice(0, 3);
    while (fraction.length < 3) {
      fraction += "0";
    }
    fraction = +fraction;
  }
  if (match[9]) {
    tz_hour = +match[10];
    tz_minute = +(match[11] || 0);
    delta = (tz_hour * 60 + tz_minute) * 6e4;
    if (match[9] === "-")
      delta = -delta;
  }
  date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
  if (delta)
    date.setTime(date.getTime() - delta);
  return date;
}
function representYamlTimestamp(object) {
  return object.toISOString();
}
var timestamp = new Type$8("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: resolveYamlTimestamp,
  construct: constructYamlTimestamp,
  instanceOf: Date,
  represent: representYamlTimestamp
});
var Type$7 = type;
function resolveYamlMerge(data) {
  return data === "<<" || data === null;
}
var merge = new Type$7("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: resolveYamlMerge
});
var NodeBuffer;
try {
  var _require$1 = commonjsRequire;
  NodeBuffer = _require$1("buffer").Buffer;
} catch (__) {
}
var Type$6 = type;
var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
function resolveYamlBinary(data) {
  if (data === null)
    return false;
  var code, idx, bitlen = 0, max = data.length, map2 = BASE64_MAP;
  for (idx = 0; idx < max; idx++) {
    code = map2.indexOf(data.charAt(idx));
    if (code > 64)
      continue;
    if (code < 0)
      return false;
    bitlen += 6;
  }
  return bitlen % 8 === 0;
}
function constructYamlBinary(data) {
  var idx, tailbits, input = data.replace(/[\r\n=]/g, ""), max = input.length, map2 = BASE64_MAP, bits = 0, result = [];
  for (idx = 0; idx < max; idx++) {
    if (idx % 4 === 0 && idx) {
      result.push(bits >> 16 & 255);
      result.push(bits >> 8 & 255);
      result.push(bits & 255);
    }
    bits = bits << 6 | map2.indexOf(input.charAt(idx));
  }
  tailbits = max % 4 * 6;
  if (tailbits === 0) {
    result.push(bits >> 16 & 255);
    result.push(bits >> 8 & 255);
    result.push(bits & 255);
  } else if (tailbits === 18) {
    result.push(bits >> 10 & 255);
    result.push(bits >> 2 & 255);
  } else if (tailbits === 12) {
    result.push(bits >> 4 & 255);
  }
  if (NodeBuffer) {
    return NodeBuffer.from ? NodeBuffer.from(result) : new NodeBuffer(result);
  }
  return result;
}
function representYamlBinary(object) {
  var result = "", bits = 0, idx, tail, max = object.length, map2 = BASE64_MAP;
  for (idx = 0; idx < max; idx++) {
    if (idx % 3 === 0 && idx) {
      result += map2[bits >> 18 & 63];
      result += map2[bits >> 12 & 63];
      result += map2[bits >> 6 & 63];
      result += map2[bits & 63];
    }
    bits = (bits << 8) + object[idx];
  }
  tail = max % 3;
  if (tail === 0) {
    result += map2[bits >> 18 & 63];
    result += map2[bits >> 12 & 63];
    result += map2[bits >> 6 & 63];
    result += map2[bits & 63];
  } else if (tail === 2) {
    result += map2[bits >> 10 & 63];
    result += map2[bits >> 4 & 63];
    result += map2[bits << 2 & 63];
    result += map2[64];
  } else if (tail === 1) {
    result += map2[bits >> 2 & 63];
    result += map2[bits << 4 & 63];
    result += map2[64];
    result += map2[64];
  }
  return result;
}
function isBinary(object) {
  return NodeBuffer && NodeBuffer.isBuffer(object);
}
var binary = new Type$6("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: resolveYamlBinary,
  construct: constructYamlBinary,
  predicate: isBinary,
  represent: representYamlBinary
});
var Type$5 = type;
var _hasOwnProperty$3 = Object.prototype.hasOwnProperty;
var _toString$2 = Object.prototype.toString;
function resolveYamlOmap(data) {
  if (data === null)
    return true;
  var objectKeys = [], index, length, pair, pairKey, pairHasKey, object = data;
  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    pairHasKey = false;
    if (_toString$2.call(pair) !== "[object Object]")
      return false;
    for (pairKey in pair) {
      if (_hasOwnProperty$3.call(pair, pairKey)) {
        if (!pairHasKey)
          pairHasKey = true;
        else
          return false;
      }
    }
    if (!pairHasKey)
      return false;
    if (objectKeys.indexOf(pairKey) === -1)
      objectKeys.push(pairKey);
    else
      return false;
  }
  return true;
}
function constructYamlOmap(data) {
  return data !== null ? data : [];
}
var omap = new Type$5("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: resolveYamlOmap,
  construct: constructYamlOmap
});
var Type$4 = type;
var _toString$1 = Object.prototype.toString;
function resolveYamlPairs(data) {
  if (data === null)
    return true;
  var index, length, pair, keys, result, object = data;
  result = new Array(object.length);
  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    if (_toString$1.call(pair) !== "[object Object]")
      return false;
    keys = Object.keys(pair);
    if (keys.length !== 1)
      return false;
    result[index] = [keys[0], pair[keys[0]]];
  }
  return true;
}
function constructYamlPairs(data) {
  if (data === null)
    return [];
  var index, length, pair, keys, result, object = data;
  result = new Array(object.length);
  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    keys = Object.keys(pair);
    result[index] = [keys[0], pair[keys[0]]];
  }
  return result;
}
var pairs = new Type$4("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: resolveYamlPairs,
  construct: constructYamlPairs
});
var Type$3 = type;
var _hasOwnProperty$2 = Object.prototype.hasOwnProperty;
function resolveYamlSet(data) {
  if (data === null)
    return true;
  var key, object = data;
  for (key in object) {
    if (_hasOwnProperty$2.call(object, key)) {
      if (object[key] !== null)
        return false;
    }
  }
  return true;
}
function constructYamlSet(data) {
  return data !== null ? data : {};
}
var set = new Type$3("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: resolveYamlSet,
  construct: constructYamlSet
});
var Schema$1 = schema;
var default_safe = new Schema$1({
  include: [
    core
  ],
  implicit: [
    timestamp,
    merge
  ],
  explicit: [
    binary,
    omap,
    pairs,
    set
  ]
});
var Type$2 = type;
function resolveJavascriptUndefined() {
  return true;
}
function constructJavascriptUndefined() {
  return void 0;
}
function representJavascriptUndefined() {
  return "";
}
function isUndefined(object) {
  return typeof object === "undefined";
}
var _undefined = new Type$2("tag:yaml.org,2002:js/undefined", {
  kind: "scalar",
  resolve: resolveJavascriptUndefined,
  construct: constructJavascriptUndefined,
  predicate: isUndefined,
  represent: representJavascriptUndefined
});
var Type$1 = type;
function resolveJavascriptRegExp(data) {
  if (data === null)
    return false;
  if (data.length === 0)
    return false;
  var regexp2 = data, tail = /\/([gim]*)$/.exec(data), modifiers = "";
  if (regexp2[0] === "/") {
    if (tail)
      modifiers = tail[1];
    if (modifiers.length > 3)
      return false;
    if (regexp2[regexp2.length - modifiers.length - 1] !== "/")
      return false;
  }
  return true;
}
function constructJavascriptRegExp(data) {
  var regexp2 = data, tail = /\/([gim]*)$/.exec(data), modifiers = "";
  if (regexp2[0] === "/") {
    if (tail)
      modifiers = tail[1];
    regexp2 = regexp2.slice(1, regexp2.length - modifiers.length - 1);
  }
  return new RegExp(regexp2, modifiers);
}
function representJavascriptRegExp(object) {
  var result = "/" + object.source + "/";
  if (object.global)
    result += "g";
  if (object.multiline)
    result += "m";
  if (object.ignoreCase)
    result += "i";
  return result;
}
function isRegExp(object) {
  return Object.prototype.toString.call(object) === "[object RegExp]";
}
var regexp = new Type$1("tag:yaml.org,2002:js/regexp", {
  kind: "scalar",
  resolve: resolveJavascriptRegExp,
  construct: constructJavascriptRegExp,
  predicate: isRegExp,
  represent: representJavascriptRegExp
});
var esprima;
try {
  var _require = commonjsRequire;
  esprima = _require("esprima");
} catch (_) {
  if (typeof window !== "undefined")
    esprima = window.esprima;
}
var Type = type;
function resolveJavascriptFunction(data) {
  if (data === null)
    return false;
  try {
    var source = "(" + data + ")", ast = esprima.parse(source, { range: true });
    if (ast.type !== "Program" || ast.body.length !== 1 || ast.body[0].type !== "ExpressionStatement" || ast.body[0].expression.type !== "ArrowFunctionExpression" && ast.body[0].expression.type !== "FunctionExpression") {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
}
function constructJavascriptFunction(data) {
  var source = "(" + data + ")", ast = esprima.parse(source, { range: true }), params = [], body;
  if (ast.type !== "Program" || ast.body.length !== 1 || ast.body[0].type !== "ExpressionStatement" || ast.body[0].expression.type !== "ArrowFunctionExpression" && ast.body[0].expression.type !== "FunctionExpression") {
    throw new Error("Failed to resolve function");
  }
  ast.body[0].expression.params.forEach(function(param) {
    params.push(param.name);
  });
  body = ast.body[0].expression.body.range;
  if (ast.body[0].expression.body.type === "BlockStatement") {
    return new Function(params, source.slice(body[0] + 1, body[1] - 1));
  }
  return new Function(params, "return " + source.slice(body[0], body[1]));
}
function representJavascriptFunction(object) {
  return object.toString();
}
function isFunction(object) {
  return Object.prototype.toString.call(object) === "[object Function]";
}
var _function = new Type("tag:yaml.org,2002:js/function", {
  kind: "scalar",
  resolve: resolveJavascriptFunction,
  construct: constructJavascriptFunction,
  predicate: isFunction,
  represent: representJavascriptFunction
});
var Schema = schema;
var default_full = Schema.DEFAULT = new Schema({
  include: [
    default_safe
  ],
  explicit: [
    _undefined,
    regexp,
    _function
  ]
});
var common$1 = common$6;
var YAMLException$1 = exception;
var Mark = mark;
var DEFAULT_SAFE_SCHEMA$1 = default_safe;
var DEFAULT_FULL_SCHEMA$1 = default_full;
var _hasOwnProperty$1 = Object.prototype.hasOwnProperty;
var CONTEXT_FLOW_IN = 1;
var CONTEXT_FLOW_OUT = 2;
var CONTEXT_BLOCK_IN = 3;
var CONTEXT_BLOCK_OUT = 4;
var CHOMPING_CLIP = 1;
var CHOMPING_STRIP = 2;
var CHOMPING_KEEP = 3;
var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function _class(obj) {
  return Object.prototype.toString.call(obj);
}
function is_EOL(c) {
  return c === 10 || c === 13;
}
function is_WHITE_SPACE(c) {
  return c === 9 || c === 32;
}
function is_WS_OR_EOL(c) {
  return c === 9 || c === 32 || c === 10 || c === 13;
}
function is_FLOW_INDICATOR(c) {
  return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
}
function fromHexCode(c) {
  var lc;
  if (48 <= c && c <= 57) {
    return c - 48;
  }
  lc = c | 32;
  if (97 <= lc && lc <= 102) {
    return lc - 97 + 10;
  }
  return -1;
}
function escapedHexLen(c) {
  if (c === 120) {
    return 2;
  }
  if (c === 117) {
    return 4;
  }
  if (c === 85) {
    return 8;
  }
  return 0;
}
function fromDecimalCode(c) {
  if (48 <= c && c <= 57) {
    return c - 48;
  }
  return -1;
}
function simpleEscapeSequence(c) {
  return c === 48 ? "\0" : c === 97 ? "\x07" : c === 98 ? "\b" : c === 116 ? "	" : c === 9 ? "	" : c === 110 ? "\n" : c === 118 ? "\v" : c === 102 ? "\f" : c === 114 ? "\r" : c === 101 ? "\x1B" : c === 32 ? " " : c === 34 ? '"' : c === 47 ? "/" : c === 92 ? "\\" : c === 78 ? "\x85" : c === 95 ? "\xA0" : c === 76 ? "\u2028" : c === 80 ? "\u2029" : "";
}
function charFromCodepoint(c) {
  if (c <= 65535) {
    return String.fromCharCode(c);
  }
  return String.fromCharCode((c - 65536 >> 10) + 55296, (c - 65536 & 1023) + 56320);
}
var simpleEscapeCheck = new Array(256);
var simpleEscapeMap = new Array(256);
for (var i = 0; i < 256; i++) {
  simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
  simpleEscapeMap[i] = simpleEscapeSequence(i);
}
function State$1(input, options) {
  this.input = input;
  this.filename = options["filename"] || null;
  this.schema = options["schema"] || DEFAULT_FULL_SCHEMA$1;
  this.onWarning = options["onWarning"] || null;
  this.legacy = options["legacy"] || false;
  this.json = options["json"] || false;
  this.listener = options["listener"] || null;
  this.implicitTypes = this.schema.compiledImplicit;
  this.typeMap = this.schema.compiledTypeMap;
  this.length = input.length;
  this.position = 0;
  this.line = 0;
  this.lineStart = 0;
  this.lineIndent = 0;
  this.documents = [];
}
function generateError(state, message) {
  return new YAMLException$1(message, new Mark(state.filename, state.input, state.position, state.line, state.position - state.lineStart));
}
function throwError(state, message) {
  throw generateError(state, message);
}
function throwWarning(state, message) {
  if (state.onWarning) {
    state.onWarning.call(null, generateError(state, message));
  }
}
var directiveHandlers = {
  YAML: function handleYamlDirective(state, name, args) {
    var match, major, minor;
    if (state.version !== null) {
      throwError(state, "duplication of %YAML directive");
    }
    if (args.length !== 1) {
      throwError(state, "YAML directive accepts exactly one argument");
    }
    match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
    if (match === null) {
      throwError(state, "ill-formed argument of the YAML directive");
    }
    major = parseInt(match[1], 10);
    minor = parseInt(match[2], 10);
    if (major !== 1) {
      throwError(state, "unacceptable YAML version of the document");
    }
    state.version = args[0];
    state.checkLineBreaks = minor < 2;
    if (minor !== 1 && minor !== 2) {
      throwWarning(state, "unsupported YAML version of the document");
    }
  },
  TAG: function handleTagDirective(state, name, args) {
    var handle, prefix;
    if (args.length !== 2) {
      throwError(state, "TAG directive accepts exactly two arguments");
    }
    handle = args[0];
    prefix = args[1];
    if (!PATTERN_TAG_HANDLE.test(handle)) {
      throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
    }
    if (_hasOwnProperty$1.call(state.tagMap, handle)) {
      throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
    }
    if (!PATTERN_TAG_URI.test(prefix)) {
      throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
    }
    state.tagMap[handle] = prefix;
  }
};
function captureSegment(state, start, end, checkJson) {
  var _position, _length, _character, _result;
  if (start < end) {
    _result = state.input.slice(start, end);
    if (checkJson) {
      for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
        _character = _result.charCodeAt(_position);
        if (!(_character === 9 || 32 <= _character && _character <= 1114111)) {
          throwError(state, "expected valid JSON character");
        }
      }
    } else if (PATTERN_NON_PRINTABLE.test(_result)) {
      throwError(state, "the stream contains non-printable characters");
    }
    state.result += _result;
  }
}
function mergeMappings(state, destination, source, overridableKeys) {
  var sourceKeys, key, index, quantity;
  if (!common$1.isObject(source)) {
    throwError(state, "cannot merge mappings; the provided source object is unacceptable");
  }
  sourceKeys = Object.keys(source);
  for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
    key = sourceKeys[index];
    if (!_hasOwnProperty$1.call(destination, key)) {
      destination[key] = source[key];
      overridableKeys[key] = true;
    }
  }
}
function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startPos) {
  var index, quantity;
  if (Array.isArray(keyNode)) {
    keyNode = Array.prototype.slice.call(keyNode);
    for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
      if (Array.isArray(keyNode[index])) {
        throwError(state, "nested arrays are not supported inside keys");
      }
      if (typeof keyNode === "object" && _class(keyNode[index]) === "[object Object]") {
        keyNode[index] = "[object Object]";
      }
    }
  }
  if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") {
    keyNode = "[object Object]";
  }
  keyNode = String(keyNode);
  if (_result === null) {
    _result = {};
  }
  if (keyTag === "tag:yaml.org,2002:merge") {
    if (Array.isArray(valueNode)) {
      for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
        mergeMappings(state, _result, valueNode[index], overridableKeys);
      }
    } else {
      mergeMappings(state, _result, valueNode, overridableKeys);
    }
  } else {
    if (!state.json && !_hasOwnProperty$1.call(overridableKeys, keyNode) && _hasOwnProperty$1.call(_result, keyNode)) {
      state.line = startLine || state.line;
      state.position = startPos || state.position;
      throwError(state, "duplicated mapping key");
    }
    _result[keyNode] = valueNode;
    delete overridableKeys[keyNode];
  }
  return _result;
}
function readLineBreak(state) {
  var ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 10) {
    state.position++;
  } else if (ch === 13) {
    state.position++;
    if (state.input.charCodeAt(state.position) === 10) {
      state.position++;
    }
  } else {
    throwError(state, "a line break is expected");
  }
  state.line += 1;
  state.lineStart = state.position;
}
function skipSeparationSpace(state, allowComments, checkIndent) {
  var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    while (is_WHITE_SPACE(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }
    if (allowComments && ch === 35) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (ch !== 10 && ch !== 13 && ch !== 0);
    }
    if (is_EOL(ch)) {
      readLineBreak(state);
      ch = state.input.charCodeAt(state.position);
      lineBreaks++;
      state.lineIndent = 0;
      while (ch === 32) {
        state.lineIndent++;
        ch = state.input.charCodeAt(++state.position);
      }
    } else {
      break;
    }
  }
  if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
    throwWarning(state, "deficient indentation");
  }
  return lineBreaks;
}
function testDocumentSeparator(state) {
  var _position = state.position, ch;
  ch = state.input.charCodeAt(_position);
  if ((ch === 45 || ch === 46) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
    _position += 3;
    ch = state.input.charCodeAt(_position);
    if (ch === 0 || is_WS_OR_EOL(ch)) {
      return true;
    }
  }
  return false;
}
function writeFoldedLines(state, count) {
  if (count === 1) {
    state.result += " ";
  } else if (count > 1) {
    state.result += common$1.repeat("\n", count - 1);
  }
}
function readPlainScalar(state, nodeIndent, withinFlowCollection) {
  var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch;
  ch = state.input.charCodeAt(state.position);
  if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96) {
    return false;
  }
  if (ch === 63 || ch === 45) {
    following = state.input.charCodeAt(state.position + 1);
    if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
      return false;
    }
  }
  state.kind = "scalar";
  state.result = "";
  captureStart = captureEnd = state.position;
  hasPendingContent = false;
  while (ch !== 0) {
    if (ch === 58) {
      following = state.input.charCodeAt(state.position + 1);
      if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
        break;
      }
    } else if (ch === 35) {
      preceding = state.input.charCodeAt(state.position - 1);
      if (is_WS_OR_EOL(preceding)) {
        break;
      }
    } else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && is_FLOW_INDICATOR(ch)) {
      break;
    } else if (is_EOL(ch)) {
      _line = state.line;
      _lineStart = state.lineStart;
      _lineIndent = state.lineIndent;
      skipSeparationSpace(state, false, -1);
      if (state.lineIndent >= nodeIndent) {
        hasPendingContent = true;
        ch = state.input.charCodeAt(state.position);
        continue;
      } else {
        state.position = captureEnd;
        state.line = _line;
        state.lineStart = _lineStart;
        state.lineIndent = _lineIndent;
        break;
      }
    }
    if (hasPendingContent) {
      captureSegment(state, captureStart, captureEnd, false);
      writeFoldedLines(state, state.line - _line);
      captureStart = captureEnd = state.position;
      hasPendingContent = false;
    }
    if (!is_WHITE_SPACE(ch)) {
      captureEnd = state.position + 1;
    }
    ch = state.input.charCodeAt(++state.position);
  }
  captureSegment(state, captureStart, captureEnd, false);
  if (state.result) {
    return true;
  }
  state.kind = _kind;
  state.result = _result;
  return false;
}
function readSingleQuotedScalar(state, nodeIndent) {
  var ch, captureStart, captureEnd;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 39) {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  state.position++;
  captureStart = captureEnd = state.position;
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 39) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);
      if (ch === 39) {
        captureStart = state.position;
        state.position++;
        captureEnd = state.position;
      } else {
        return true;
      }
    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;
    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError(state, "unexpected end of the document within a single quoted scalar");
    } else {
      state.position++;
      captureEnd = state.position;
    }
  }
  throwError(state, "unexpected end of the stream within a single quoted scalar");
}
function readDoubleQuotedScalar(state, nodeIndent) {
  var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 34) {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  state.position++;
  captureStart = captureEnd = state.position;
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 34) {
      captureSegment(state, captureStart, state.position, true);
      state.position++;
      return true;
    } else if (ch === 92) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);
      if (is_EOL(ch)) {
        skipSeparationSpace(state, false, nodeIndent);
      } else if (ch < 256 && simpleEscapeCheck[ch]) {
        state.result += simpleEscapeMap[ch];
        state.position++;
      } else if ((tmp = escapedHexLen(ch)) > 0) {
        hexLength = tmp;
        hexResult = 0;
        for (; hexLength > 0; hexLength--) {
          ch = state.input.charCodeAt(++state.position);
          if ((tmp = fromHexCode(ch)) >= 0) {
            hexResult = (hexResult << 4) + tmp;
          } else {
            throwError(state, "expected hexadecimal character");
          }
        }
        state.result += charFromCodepoint(hexResult);
        state.position++;
      } else {
        throwError(state, "unknown escape sequence");
      }
      captureStart = captureEnd = state.position;
    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;
    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError(state, "unexpected end of the document within a double quoted scalar");
    } else {
      state.position++;
      captureEnd = state.position;
    }
  }
  throwError(state, "unexpected end of the stream within a double quoted scalar");
}
function readFlowCollection(state, nodeIndent) {
  var readNext = true, _line, _tag = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = {}, keyNode, keyTag, valueNode, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 91) {
    terminator = 93;
    isMapping = false;
    _result = [];
  } else if (ch === 123) {
    terminator = 125;
    isMapping = true;
    _result = {};
  } else {
    return false;
  }
  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }
  ch = state.input.charCodeAt(++state.position);
  while (ch !== 0) {
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if (ch === terminator) {
      state.position++;
      state.tag = _tag;
      state.anchor = _anchor;
      state.kind = isMapping ? "mapping" : "sequence";
      state.result = _result;
      return true;
    } else if (!readNext) {
      throwError(state, "missed comma between flow collection entries");
    }
    keyTag = keyNode = valueNode = null;
    isPair = isExplicitPair = false;
    if (ch === 63) {
      following = state.input.charCodeAt(state.position + 1);
      if (is_WS_OR_EOL(following)) {
        isPair = isExplicitPair = true;
        state.position++;
        skipSeparationSpace(state, true, nodeIndent);
      }
    }
    _line = state.line;
    composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
    keyTag = state.tag;
    keyNode = state.result;
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if ((isExplicitPair || state.line === _line) && ch === 58) {
      isPair = true;
      ch = state.input.charCodeAt(++state.position);
      skipSeparationSpace(state, true, nodeIndent);
      composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
      valueNode = state.result;
    }
    if (isMapping) {
      storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode);
    } else if (isPair) {
      _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode));
    } else {
      _result.push(keyNode);
    }
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if (ch === 44) {
      readNext = true;
      ch = state.input.charCodeAt(++state.position);
    } else {
      readNext = false;
    }
  }
  throwError(state, "unexpected end of the stream within a flow collection");
}
function readBlockScalar(state, nodeIndent) {
  var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 124) {
    folding = false;
  } else if (ch === 62) {
    folding = true;
  } else {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  while (ch !== 0) {
    ch = state.input.charCodeAt(++state.position);
    if (ch === 43 || ch === 45) {
      if (CHOMPING_CLIP === chomping) {
        chomping = ch === 43 ? CHOMPING_KEEP : CHOMPING_STRIP;
      } else {
        throwError(state, "repeat of a chomping mode identifier");
      }
    } else if ((tmp = fromDecimalCode(ch)) >= 0) {
      if (tmp === 0) {
        throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
      } else if (!detectedIndent) {
        textIndent = nodeIndent + tmp - 1;
        detectedIndent = true;
      } else {
        throwError(state, "repeat of an indentation width identifier");
      }
    } else {
      break;
    }
  }
  if (is_WHITE_SPACE(ch)) {
    do {
      ch = state.input.charCodeAt(++state.position);
    } while (is_WHITE_SPACE(ch));
    if (ch === 35) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (!is_EOL(ch) && ch !== 0);
    }
  }
  while (ch !== 0) {
    readLineBreak(state);
    state.lineIndent = 0;
    ch = state.input.charCodeAt(state.position);
    while ((!detectedIndent || state.lineIndent < textIndent) && ch === 32) {
      state.lineIndent++;
      ch = state.input.charCodeAt(++state.position);
    }
    if (!detectedIndent && state.lineIndent > textIndent) {
      textIndent = state.lineIndent;
    }
    if (is_EOL(ch)) {
      emptyLines++;
      continue;
    }
    if (state.lineIndent < textIndent) {
      if (chomping === CHOMPING_KEEP) {
        state.result += common$1.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
      } else if (chomping === CHOMPING_CLIP) {
        if (didReadContent) {
          state.result += "\n";
        }
      }
      break;
    }
    if (folding) {
      if (is_WHITE_SPACE(ch)) {
        atMoreIndented = true;
        state.result += common$1.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
      } else if (atMoreIndented) {
        atMoreIndented = false;
        state.result += common$1.repeat("\n", emptyLines + 1);
      } else if (emptyLines === 0) {
        if (didReadContent) {
          state.result += " ";
        }
      } else {
        state.result += common$1.repeat("\n", emptyLines);
      }
    } else {
      state.result += common$1.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
    }
    didReadContent = true;
    detectedIndent = true;
    emptyLines = 0;
    captureStart = state.position;
    while (!is_EOL(ch) && ch !== 0) {
      ch = state.input.charCodeAt(++state.position);
    }
    captureSegment(state, captureStart, state.position, false);
  }
  return true;
}
function readBlockSequence(state, nodeIndent) {
  var _line, _tag = state.tag, _anchor = state.anchor, _result = [], following, detected = false, ch;
  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }
  ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    if (ch !== 45) {
      break;
    }
    following = state.input.charCodeAt(state.position + 1);
    if (!is_WS_OR_EOL(following)) {
      break;
    }
    detected = true;
    state.position++;
    if (skipSeparationSpace(state, true, -1)) {
      if (state.lineIndent <= nodeIndent) {
        _result.push(null);
        ch = state.input.charCodeAt(state.position);
        continue;
      }
    }
    _line = state.line;
    composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
    _result.push(state.result);
    skipSeparationSpace(state, true, -1);
    ch = state.input.charCodeAt(state.position);
    if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
      throwError(state, "bad indentation of a sequence entry");
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }
  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = "sequence";
    state.result = _result;
    return true;
  }
  return false;
}
function readBlockMapping(state, nodeIndent, flowIndent) {
  var following, allowCompact, _line, _pos, _tag = state.tag, _anchor = state.anchor, _result = {}, overridableKeys = {}, keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }
  ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    following = state.input.charCodeAt(state.position + 1);
    _line = state.line;
    _pos = state.position;
    if ((ch === 63 || ch === 58) && is_WS_OR_EOL(following)) {
      if (ch === 63) {
        if (atExplicitKey) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
          keyTag = keyNode = valueNode = null;
        }
        detected = true;
        atExplicitKey = true;
        allowCompact = true;
      } else if (atExplicitKey) {
        atExplicitKey = false;
        allowCompact = true;
      } else {
        throwError(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
      }
      state.position += 1;
      ch = following;
    } else if (composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
      if (state.line === _line) {
        ch = state.input.charCodeAt(state.position);
        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        if (ch === 58) {
          ch = state.input.charCodeAt(++state.position);
          if (!is_WS_OR_EOL(ch)) {
            throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
          }
          if (atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
            keyTag = keyNode = valueNode = null;
          }
          detected = true;
          atExplicitKey = false;
          allowCompact = false;
          keyTag = state.tag;
          keyNode = state.result;
        } else if (detected) {
          throwError(state, "can not read an implicit mapping pair; a colon is missed");
        } else {
          state.tag = _tag;
          state.anchor = _anchor;
          return true;
        }
      } else if (detected) {
        throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
      } else {
        state.tag = _tag;
        state.anchor = _anchor;
        return true;
      }
    } else {
      break;
    }
    if (state.line === _line || state.lineIndent > nodeIndent) {
      if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
        if (atExplicitKey) {
          keyNode = state.result;
        } else {
          valueNode = state.result;
        }
      }
      if (!atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _pos);
        keyTag = keyNode = valueNode = null;
      }
      skipSeparationSpace(state, true, -1);
      ch = state.input.charCodeAt(state.position);
    }
    if (state.lineIndent > nodeIndent && ch !== 0) {
      throwError(state, "bad indentation of a mapping entry");
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }
  if (atExplicitKey) {
    storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
  }
  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = "mapping";
    state.result = _result;
  }
  return detected;
}
function readTagProperty(state) {
  var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 33)
    return false;
  if (state.tag !== null) {
    throwError(state, "duplication of a tag property");
  }
  ch = state.input.charCodeAt(++state.position);
  if (ch === 60) {
    isVerbatim = true;
    ch = state.input.charCodeAt(++state.position);
  } else if (ch === 33) {
    isNamed = true;
    tagHandle = "!!";
    ch = state.input.charCodeAt(++state.position);
  } else {
    tagHandle = "!";
  }
  _position = state.position;
  if (isVerbatim) {
    do {
      ch = state.input.charCodeAt(++state.position);
    } while (ch !== 0 && ch !== 62);
    if (state.position < state.length) {
      tagName = state.input.slice(_position, state.position);
      ch = state.input.charCodeAt(++state.position);
    } else {
      throwError(state, "unexpected end of the stream within a verbatim tag");
    }
  } else {
    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
      if (ch === 33) {
        if (!isNamed) {
          tagHandle = state.input.slice(_position - 1, state.position + 1);
          if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
            throwError(state, "named tag handle cannot contain such characters");
          }
          isNamed = true;
          _position = state.position + 1;
        } else {
          throwError(state, "tag suffix cannot contain exclamation marks");
        }
      }
      ch = state.input.charCodeAt(++state.position);
    }
    tagName = state.input.slice(_position, state.position);
    if (PATTERN_FLOW_INDICATORS.test(tagName)) {
      throwError(state, "tag suffix cannot contain flow indicator characters");
    }
  }
  if (tagName && !PATTERN_TAG_URI.test(tagName)) {
    throwError(state, "tag name cannot contain such characters: " + tagName);
  }
  if (isVerbatim) {
    state.tag = tagName;
  } else if (_hasOwnProperty$1.call(state.tagMap, tagHandle)) {
    state.tag = state.tagMap[tagHandle] + tagName;
  } else if (tagHandle === "!") {
    state.tag = "!" + tagName;
  } else if (tagHandle === "!!") {
    state.tag = "tag:yaml.org,2002:" + tagName;
  } else {
    throwError(state, 'undeclared tag handle "' + tagHandle + '"');
  }
  return true;
}
function readAnchorProperty(state) {
  var _position, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 38)
    return false;
  if (state.anchor !== null) {
    throwError(state, "duplication of an anchor property");
  }
  ch = state.input.charCodeAt(++state.position);
  _position = state.position;
  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }
  if (state.position === _position) {
    throwError(state, "name of an anchor node must contain at least one character");
  }
  state.anchor = state.input.slice(_position, state.position);
  return true;
}
function readAlias(state) {
  var _position, alias, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 42)
    return false;
  ch = state.input.charCodeAt(++state.position);
  _position = state.position;
  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }
  if (state.position === _position) {
    throwError(state, "name of an alias node must contain at least one character");
  }
  alias = state.input.slice(_position, state.position);
  if (!_hasOwnProperty$1.call(state.anchorMap, alias)) {
    throwError(state, 'unidentified alias "' + alias + '"');
  }
  state.result = state.anchorMap[alias];
  skipSeparationSpace(state, true, -1);
  return true;
}
function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
  var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, type2, flowIndent, blockIndent;
  if (state.listener !== null) {
    state.listener("open", state);
  }
  state.tag = null;
  state.anchor = null;
  state.kind = null;
  state.result = null;
  allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
  if (allowToSeek) {
    if (skipSeparationSpace(state, true, -1)) {
      atNewLine = true;
      if (state.lineIndent > parentIndent) {
        indentStatus = 1;
      } else if (state.lineIndent === parentIndent) {
        indentStatus = 0;
      } else if (state.lineIndent < parentIndent) {
        indentStatus = -1;
      }
    }
  }
  if (indentStatus === 1) {
    while (readTagProperty(state) || readAnchorProperty(state)) {
      if (skipSeparationSpace(state, true, -1)) {
        atNewLine = true;
        allowBlockCollections = allowBlockStyles;
        if (state.lineIndent > parentIndent) {
          indentStatus = 1;
        } else if (state.lineIndent === parentIndent) {
          indentStatus = 0;
        } else if (state.lineIndent < parentIndent) {
          indentStatus = -1;
        }
      } else {
        allowBlockCollections = false;
      }
    }
  }
  if (allowBlockCollections) {
    allowBlockCollections = atNewLine || allowCompact;
  }
  if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
    if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
      flowIndent = parentIndent;
    } else {
      flowIndent = parentIndent + 1;
    }
    blockIndent = state.position - state.lineStart;
    if (indentStatus === 1) {
      if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) {
        hasContent = true;
      } else {
        if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
          hasContent = true;
        } else if (readAlias(state)) {
          hasContent = true;
          if (state.tag !== null || state.anchor !== null) {
            throwError(state, "alias node should not have any properties");
          }
        } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
          hasContent = true;
          if (state.tag === null) {
            state.tag = "?";
          }
        }
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
      }
    } else if (indentStatus === 0) {
      hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
    }
  }
  if (state.tag !== null && state.tag !== "!") {
    if (state.tag === "?") {
      if (state.result !== null && state.kind !== "scalar") {
        throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
      }
      for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
        type2 = state.implicitTypes[typeIndex];
        if (type2.resolve(state.result)) {
          state.result = type2.construct(state.result);
          state.tag = type2.tag;
          if (state.anchor !== null) {
            state.anchorMap[state.anchor] = state.result;
          }
          break;
        }
      }
    } else if (_hasOwnProperty$1.call(state.typeMap[state.kind || "fallback"], state.tag)) {
      type2 = state.typeMap[state.kind || "fallback"][state.tag];
      if (state.result !== null && type2.kind !== state.kind) {
        throwError(state, "unacceptable node kind for !<" + state.tag + '> tag; it should be "' + type2.kind + '", not "' + state.kind + '"');
      }
      if (!type2.resolve(state.result)) {
        throwError(state, "cannot resolve a node with !<" + state.tag + "> explicit tag");
      } else {
        state.result = type2.construct(state.result);
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
      }
    } else {
      throwError(state, "unknown tag !<" + state.tag + ">");
    }
  }
  if (state.listener !== null) {
    state.listener("close", state);
  }
  return state.tag !== null || state.anchor !== null || hasContent;
}
function readDocument(state) {
  var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
  state.version = null;
  state.checkLineBreaks = state.legacy;
  state.tagMap = {};
  state.anchorMap = {};
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    skipSeparationSpace(state, true, -1);
    ch = state.input.charCodeAt(state.position);
    if (state.lineIndent > 0 || ch !== 37) {
      break;
    }
    hasDirectives = true;
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;
    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }
    directiveName = state.input.slice(_position, state.position);
    directiveArgs = [];
    if (directiveName.length < 1) {
      throwError(state, "directive name must not be less than one character in length");
    }
    while (ch !== 0) {
      while (is_WHITE_SPACE(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (ch === 35) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (ch !== 0 && !is_EOL(ch));
        break;
      }
      if (is_EOL(ch))
        break;
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      directiveArgs.push(state.input.slice(_position, state.position));
    }
    if (ch !== 0)
      readLineBreak(state);
    if (_hasOwnProperty$1.call(directiveHandlers, directiveName)) {
      directiveHandlers[directiveName](state, directiveName, directiveArgs);
    } else {
      throwWarning(state, 'unknown document directive "' + directiveName + '"');
    }
  }
  skipSeparationSpace(state, true, -1);
  if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 45 && state.input.charCodeAt(state.position + 1) === 45 && state.input.charCodeAt(state.position + 2) === 45) {
    state.position += 3;
    skipSeparationSpace(state, true, -1);
  } else if (hasDirectives) {
    throwError(state, "directives end mark is expected");
  }
  composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
  skipSeparationSpace(state, true, -1);
  if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
    throwWarning(state, "non-ASCII line breaks are interpreted as content");
  }
  state.documents.push(state.result);
  if (state.position === state.lineStart && testDocumentSeparator(state)) {
    if (state.input.charCodeAt(state.position) === 46) {
      state.position += 3;
      skipSeparationSpace(state, true, -1);
    }
    return;
  }
  if (state.position < state.length - 1) {
    throwError(state, "end of the stream or a document separator is expected");
  } else {
    return;
  }
}
function loadDocuments(input, options) {
  input = String(input);
  options = options || {};
  if (input.length !== 0) {
    if (input.charCodeAt(input.length - 1) !== 10 && input.charCodeAt(input.length - 1) !== 13) {
      input += "\n";
    }
    if (input.charCodeAt(0) === 65279) {
      input = input.slice(1);
    }
  }
  var state = new State$1(input, options);
  var nullpos = input.indexOf("\0");
  if (nullpos !== -1) {
    state.position = nullpos;
    throwError(state, "null byte is not allowed in input");
  }
  state.input += "\0";
  while (state.input.charCodeAt(state.position) === 32) {
    state.lineIndent += 1;
    state.position += 1;
  }
  while (state.position < state.length - 1) {
    readDocument(state);
  }
  return state.documents;
}
function loadAll(input, iterator, options) {
  if (iterator !== null && typeof iterator === "object" && typeof options === "undefined") {
    options = iterator;
    iterator = null;
  }
  var documents = loadDocuments(input, options);
  if (typeof iterator !== "function") {
    return documents;
  }
  for (var index = 0, length = documents.length; index < length; index += 1) {
    iterator(documents[index]);
  }
}
function load(input, options) {
  var documents = loadDocuments(input, options);
  if (documents.length === 0) {
    return void 0;
  } else if (documents.length === 1) {
    return documents[0];
  }
  throw new YAMLException$1("expected a single document in the stream, but found more");
}
function safeLoadAll(input, iterator, options) {
  if (typeof iterator === "object" && iterator !== null && typeof options === "undefined") {
    options = iterator;
    iterator = null;
  }
  return loadAll(input, iterator, common$1.extend({ schema: DEFAULT_SAFE_SCHEMA$1 }, options));
}
function safeLoad(input, options) {
  return load(input, common$1.extend({ schema: DEFAULT_SAFE_SCHEMA$1 }, options));
}
loader$1.loadAll = loadAll;
loader$1.load = load;
loader$1.safeLoadAll = safeLoadAll;
loader$1.safeLoad = safeLoad;
var dumper$1 = {};
var common = common$6;
var YAMLException = exception;
var DEFAULT_FULL_SCHEMA = default_full;
var DEFAULT_SAFE_SCHEMA = default_safe;
var _toString = Object.prototype.toString;
var _hasOwnProperty = Object.prototype.hasOwnProperty;
var CHAR_TAB = 9;
var CHAR_LINE_FEED = 10;
var CHAR_CARRIAGE_RETURN = 13;
var CHAR_SPACE = 32;
var CHAR_EXCLAMATION = 33;
var CHAR_DOUBLE_QUOTE = 34;
var CHAR_SHARP = 35;
var CHAR_PERCENT = 37;
var CHAR_AMPERSAND = 38;
var CHAR_SINGLE_QUOTE = 39;
var CHAR_ASTERISK = 42;
var CHAR_COMMA = 44;
var CHAR_MINUS = 45;
var CHAR_COLON = 58;
var CHAR_EQUALS = 61;
var CHAR_GREATER_THAN = 62;
var CHAR_QUESTION = 63;
var CHAR_COMMERCIAL_AT = 64;
var CHAR_LEFT_SQUARE_BRACKET = 91;
var CHAR_RIGHT_SQUARE_BRACKET = 93;
var CHAR_GRAVE_ACCENT = 96;
var CHAR_LEFT_CURLY_BRACKET = 123;
var CHAR_VERTICAL_LINE = 124;
var CHAR_RIGHT_CURLY_BRACKET = 125;
var ESCAPE_SEQUENCES = {};
ESCAPE_SEQUENCES[0] = "\\0";
ESCAPE_SEQUENCES[7] = "\\a";
ESCAPE_SEQUENCES[8] = "\\b";
ESCAPE_SEQUENCES[9] = "\\t";
ESCAPE_SEQUENCES[10] = "\\n";
ESCAPE_SEQUENCES[11] = "\\v";
ESCAPE_SEQUENCES[12] = "\\f";
ESCAPE_SEQUENCES[13] = "\\r";
ESCAPE_SEQUENCES[27] = "\\e";
ESCAPE_SEQUENCES[34] = '\\"';
ESCAPE_SEQUENCES[92] = "\\\\";
ESCAPE_SEQUENCES[133] = "\\N";
ESCAPE_SEQUENCES[160] = "\\_";
ESCAPE_SEQUENCES[8232] = "\\L";
ESCAPE_SEQUENCES[8233] = "\\P";
var DEPRECATED_BOOLEANS_SYNTAX = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
];
function compileStyleMap(schema2, map2) {
  var result, keys, index, length, tag, style, type2;
  if (map2 === null)
    return {};
  result = {};
  keys = Object.keys(map2);
  for (index = 0, length = keys.length; index < length; index += 1) {
    tag = keys[index];
    style = String(map2[tag]);
    if (tag.slice(0, 2) === "!!") {
      tag = "tag:yaml.org,2002:" + tag.slice(2);
    }
    type2 = schema2.compiledTypeMap["fallback"][tag];
    if (type2 && _hasOwnProperty.call(type2.styleAliases, style)) {
      style = type2.styleAliases[style];
    }
    result[tag] = style;
  }
  return result;
}
function encodeHex(character) {
  var string, handle, length;
  string = character.toString(16).toUpperCase();
  if (character <= 255) {
    handle = "x";
    length = 2;
  } else if (character <= 65535) {
    handle = "u";
    length = 4;
  } else if (character <= 4294967295) {
    handle = "U";
    length = 8;
  } else {
    throw new YAMLException("code point within a string may not be greater than 0xFFFFFFFF");
  }
  return "\\" + handle + common.repeat("0", length - string.length) + string;
}
function State(options) {
  this.schema = options["schema"] || DEFAULT_FULL_SCHEMA;
  this.indent = Math.max(1, options["indent"] || 2);
  this.noArrayIndent = options["noArrayIndent"] || false;
  this.skipInvalid = options["skipInvalid"] || false;
  this.flowLevel = common.isNothing(options["flowLevel"]) ? -1 : options["flowLevel"];
  this.styleMap = compileStyleMap(this.schema, options["styles"] || null);
  this.sortKeys = options["sortKeys"] || false;
  this.lineWidth = options["lineWidth"] || 80;
  this.noRefs = options["noRefs"] || false;
  this.noCompatMode = options["noCompatMode"] || false;
  this.condenseFlow = options["condenseFlow"] || false;
  this.implicitTypes = this.schema.compiledImplicit;
  this.explicitTypes = this.schema.compiledExplicit;
  this.tag = null;
  this.result = "";
  this.duplicates = [];
  this.usedDuplicates = null;
}
function indentString(string, spaces) {
  var ind = common.repeat(" ", spaces), position = 0, next = -1, result = "", line, length = string.length;
  while (position < length) {
    next = string.indexOf("\n", position);
    if (next === -1) {
      line = string.slice(position);
      position = length;
    } else {
      line = string.slice(position, next + 1);
      position = next + 1;
    }
    if (line.length && line !== "\n")
      result += ind;
    result += line;
  }
  return result;
}
function generateNextLine(state, level) {
  return "\n" + common.repeat(" ", state.indent * level);
}
function testImplicitResolving(state, str2) {
  var index, length, type2;
  for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
    type2 = state.implicitTypes[index];
    if (type2.resolve(str2)) {
      return true;
    }
  }
  return false;
}
function isWhitespace(c) {
  return c === CHAR_SPACE || c === CHAR_TAB;
}
function isPrintable(c) {
  return 32 <= c && c <= 126 || 161 <= c && c <= 55295 && c !== 8232 && c !== 8233 || 57344 <= c && c <= 65533 && c !== 65279 || 65536 <= c && c <= 1114111;
}
function isNsChar(c) {
  return isPrintable(c) && !isWhitespace(c) && c !== 65279 && c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
}
function isPlainSafe(c, prev) {
  return isPrintable(c) && c !== 65279 && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_COLON && (c !== CHAR_SHARP || prev && isNsChar(prev));
}
function isPlainSafeFirst(c) {
  return isPrintable(c) && c !== 65279 && !isWhitespace(c) && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_EQUALS && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
}
function needIndentIndicator(string) {
  var leadingSpaceRe = /^\n* /;
  return leadingSpaceRe.test(string);
}
var STYLE_PLAIN = 1, STYLE_SINGLE = 2, STYLE_LITERAL = 3, STYLE_FOLDED = 4, STYLE_DOUBLE = 5;
function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType) {
  var i;
  var char, prev_char;
  var hasLineBreak = false;
  var hasFoldableLine = false;
  var shouldTrackWidth = lineWidth !== -1;
  var previousLineBreak = -1;
  var plain = isPlainSafeFirst(string.charCodeAt(0)) && !isWhitespace(string.charCodeAt(string.length - 1));
  if (singleLineOnly) {
    for (i = 0; i < string.length; i++) {
      char = string.charCodeAt(i);
      if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      prev_char = i > 0 ? string.charCodeAt(i - 1) : null;
      plain = plain && isPlainSafe(char, prev_char);
    }
  } else {
    for (i = 0; i < string.length; i++) {
      char = string.charCodeAt(i);
      if (char === CHAR_LINE_FEED) {
        hasLineBreak = true;
        if (shouldTrackWidth) {
          hasFoldableLine = hasFoldableLine || i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
          previousLineBreak = i;
        }
      } else if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      prev_char = i > 0 ? string.charCodeAt(i - 1) : null;
      plain = plain && isPlainSafe(char, prev_char);
    }
    hasFoldableLine = hasFoldableLine || shouldTrackWidth && (i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ");
  }
  if (!hasLineBreak && !hasFoldableLine) {
    return plain && !testAmbiguousType(string) ? STYLE_PLAIN : STYLE_SINGLE;
  }
  if (indentPerLevel > 9 && needIndentIndicator(string)) {
    return STYLE_DOUBLE;
  }
  return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
}
function writeScalar(state, string, level, iskey) {
  state.dump = function() {
    if (string.length === 0) {
      return "''";
    }
    if (!state.noCompatMode && DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1) {
      return "'" + string + "'";
    }
    var indent = state.indent * Math.max(1, level);
    var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
    var singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
    function testAmbiguity(string2) {
      return testImplicitResolving(state, string2);
    }
    switch (chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth, testAmbiguity)) {
      case STYLE_PLAIN:
        return string;
      case STYLE_SINGLE:
        return "'" + string.replace(/'/g, "''") + "'";
      case STYLE_LITERAL:
        return "|" + blockHeader(string, state.indent) + dropEndingNewline(indentString(string, indent));
      case STYLE_FOLDED:
        return ">" + blockHeader(string, state.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
      case STYLE_DOUBLE:
        return '"' + escapeString(string) + '"';
      default:
        throw new YAMLException("impossible error: invalid scalar style");
    }
  }();
}
function blockHeader(string, indentPerLevel) {
  var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : "";
  var clip = string[string.length - 1] === "\n";
  var keep = clip && (string[string.length - 2] === "\n" || string === "\n");
  var chomp = keep ? "+" : clip ? "" : "-";
  return indentIndicator + chomp + "\n";
}
function dropEndingNewline(string) {
  return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
}
function foldString(string, width) {
  var lineRe = /(\n+)([^\n]*)/g;
  var result = function() {
    var nextLF = string.indexOf("\n");
    nextLF = nextLF !== -1 ? nextLF : string.length;
    lineRe.lastIndex = nextLF;
    return foldLine(string.slice(0, nextLF), width);
  }();
  var prevMoreIndented = string[0] === "\n" || string[0] === " ";
  var moreIndented;
  var match;
  while (match = lineRe.exec(string)) {
    var prefix = match[1], line = match[2];
    moreIndented = line[0] === " ";
    result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
    prevMoreIndented = moreIndented;
  }
  return result;
}
function foldLine(line, width) {
  if (line === "" || line[0] === " ")
    return line;
  var breakRe = / [^ ]/g;
  var match;
  var start = 0, end, curr = 0, next = 0;
  var result = "";
  while (match = breakRe.exec(line)) {
    next = match.index;
    if (next - start > width) {
      end = curr > start ? curr : next;
      result += "\n" + line.slice(start, end);
      start = end + 1;
    }
    curr = next;
  }
  result += "\n";
  if (line.length - start > width && curr > start) {
    result += line.slice(start, curr) + "\n" + line.slice(curr + 1);
  } else {
    result += line.slice(start);
  }
  return result.slice(1);
}
function escapeString(string) {
  var result = "";
  var char, nextChar;
  var escapeSeq;
  for (var i = 0; i < string.length; i++) {
    char = string.charCodeAt(i);
    if (char >= 55296 && char <= 56319) {
      nextChar = string.charCodeAt(i + 1);
      if (nextChar >= 56320 && nextChar <= 57343) {
        result += encodeHex((char - 55296) * 1024 + nextChar - 56320 + 65536);
        i++;
        continue;
      }
    }
    escapeSeq = ESCAPE_SEQUENCES[char];
    result += !escapeSeq && isPrintable(char) ? string[i] : escapeSeq || encodeHex(char);
  }
  return result;
}
function writeFlowSequence(state, level, object) {
  var _result = "", _tag = state.tag, index, length;
  for (index = 0, length = object.length; index < length; index += 1) {
    if (writeNode(state, level, object[index], false, false)) {
      if (index !== 0)
        _result += "," + (!state.condenseFlow ? " " : "");
      _result += state.dump;
    }
  }
  state.tag = _tag;
  state.dump = "[" + _result + "]";
}
function writeBlockSequence(state, level, object, compact) {
  var _result = "", _tag = state.tag, index, length;
  for (index = 0, length = object.length; index < length; index += 1) {
    if (writeNode(state, level + 1, object[index], true, true)) {
      if (!compact || index !== 0) {
        _result += generateNextLine(state, level);
      }
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        _result += "-";
      } else {
        _result += "- ";
      }
      _result += state.dump;
    }
  }
  state.tag = _tag;
  state.dump = _result || "[]";
}
function writeFlowMapping(state, level, object) {
  var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, pairBuffer;
  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
    pairBuffer = "";
    if (index !== 0)
      pairBuffer += ", ";
    if (state.condenseFlow)
      pairBuffer += '"';
    objectKey = objectKeyList[index];
    objectValue = object[objectKey];
    if (!writeNode(state, level, objectKey, false, false)) {
      continue;
    }
    if (state.dump.length > 1024)
      pairBuffer += "? ";
    pairBuffer += state.dump + (state.condenseFlow ? '"' : "") + ":" + (state.condenseFlow ? "" : " ");
    if (!writeNode(state, level, objectValue, false, false)) {
      continue;
    }
    pairBuffer += state.dump;
    _result += pairBuffer;
  }
  state.tag = _tag;
  state.dump = "{" + _result + "}";
}
function writeBlockMapping(state, level, object, compact) {
  var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, explicitPair, pairBuffer;
  if (state.sortKeys === true) {
    objectKeyList.sort();
  } else if (typeof state.sortKeys === "function") {
    objectKeyList.sort(state.sortKeys);
  } else if (state.sortKeys) {
    throw new YAMLException("sortKeys must be a boolean or a function");
  }
  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
    pairBuffer = "";
    if (!compact || index !== 0) {
      pairBuffer += generateNextLine(state, level);
    }
    objectKey = objectKeyList[index];
    objectValue = object[objectKey];
    if (!writeNode(state, level + 1, objectKey, true, true, true)) {
      continue;
    }
    explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
    if (explicitPair) {
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        pairBuffer += "?";
      } else {
        pairBuffer += "? ";
      }
    }
    pairBuffer += state.dump;
    if (explicitPair) {
      pairBuffer += generateNextLine(state, level);
    }
    if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
      continue;
    }
    if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
      pairBuffer += ":";
    } else {
      pairBuffer += ": ";
    }
    pairBuffer += state.dump;
    _result += pairBuffer;
  }
  state.tag = _tag;
  state.dump = _result || "{}";
}
function detectType(state, object, explicit) {
  var _result, typeList, index, length, type2, style;
  typeList = explicit ? state.explicitTypes : state.implicitTypes;
  for (index = 0, length = typeList.length; index < length; index += 1) {
    type2 = typeList[index];
    if ((type2.instanceOf || type2.predicate) && (!type2.instanceOf || typeof object === "object" && object instanceof type2.instanceOf) && (!type2.predicate || type2.predicate(object))) {
      state.tag = explicit ? type2.tag : "?";
      if (type2.represent) {
        style = state.styleMap[type2.tag] || type2.defaultStyle;
        if (_toString.call(type2.represent) === "[object Function]") {
          _result = type2.represent(object, style);
        } else if (_hasOwnProperty.call(type2.represent, style)) {
          _result = type2.represent[style](object, style);
        } else {
          throw new YAMLException("!<" + type2.tag + '> tag resolver accepts not "' + style + '" style');
        }
        state.dump = _result;
      }
      return true;
    }
  }
  return false;
}
function writeNode(state, level, object, block, compact, iskey) {
  state.tag = null;
  state.dump = object;
  if (!detectType(state, object, false)) {
    detectType(state, object, true);
  }
  var type2 = _toString.call(state.dump);
  if (block) {
    block = state.flowLevel < 0 || state.flowLevel > level;
  }
  var objectOrArray = type2 === "[object Object]" || type2 === "[object Array]", duplicateIndex, duplicate;
  if (objectOrArray) {
    duplicateIndex = state.duplicates.indexOf(object);
    duplicate = duplicateIndex !== -1;
  }
  if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) {
    compact = false;
  }
  if (duplicate && state.usedDuplicates[duplicateIndex]) {
    state.dump = "*ref_" + duplicateIndex;
  } else {
    if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
      state.usedDuplicates[duplicateIndex] = true;
    }
    if (type2 === "[object Object]") {
      if (block && Object.keys(state.dump).length !== 0) {
        writeBlockMapping(state, level, state.dump, compact);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + state.dump;
        }
      } else {
        writeFlowMapping(state, level, state.dump);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + " " + state.dump;
        }
      }
    } else if (type2 === "[object Array]") {
      var arrayLevel = state.noArrayIndent && level > 0 ? level - 1 : level;
      if (block && state.dump.length !== 0) {
        writeBlockSequence(state, arrayLevel, state.dump, compact);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + state.dump;
        }
      } else {
        writeFlowSequence(state, arrayLevel, state.dump);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + " " + state.dump;
        }
      }
    } else if (type2 === "[object String]") {
      if (state.tag !== "?") {
        writeScalar(state, state.dump, level, iskey);
      }
    } else {
      if (state.skipInvalid)
        return false;
      throw new YAMLException("unacceptable kind of an object to dump " + type2);
    }
    if (state.tag !== null && state.tag !== "?") {
      state.dump = "!<" + state.tag + "> " + state.dump;
    }
  }
  return true;
}
function getDuplicateReferences(object, state) {
  var objects = [], duplicatesIndexes = [], index, length;
  inspectNode(object, objects, duplicatesIndexes);
  for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
    state.duplicates.push(objects[duplicatesIndexes[index]]);
  }
  state.usedDuplicates = new Array(length);
}
function inspectNode(object, objects, duplicatesIndexes) {
  var objectKeyList, index, length;
  if (object !== null && typeof object === "object") {
    index = objects.indexOf(object);
    if (index !== -1) {
      if (duplicatesIndexes.indexOf(index) === -1) {
        duplicatesIndexes.push(index);
      }
    } else {
      objects.push(object);
      if (Array.isArray(object)) {
        for (index = 0, length = object.length; index < length; index += 1) {
          inspectNode(object[index], objects, duplicatesIndexes);
        }
      } else {
        objectKeyList = Object.keys(object);
        for (index = 0, length = objectKeyList.length; index < length; index += 1) {
          inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
        }
      }
    }
  }
}
function dump(input, options) {
  options = options || {};
  var state = new State(options);
  if (!state.noRefs)
    getDuplicateReferences(input, state);
  if (writeNode(state, 0, input, true, true))
    return state.dump + "\n";
  return "";
}
function safeDump(input, options) {
  return dump(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options));
}
dumper$1.dump = dump;
dumper$1.safeDump = safeDump;
var loader = loader$1;
var dumper = dumper$1;
function deprecated(name) {
  return function() {
    throw new Error("Function " + name + " is deprecated and cannot be used.");
  };
}
jsYaml$1.Type = type;
jsYaml$1.Schema = schema;
jsYaml$1.FAILSAFE_SCHEMA = failsafe;
jsYaml$1.JSON_SCHEMA = json;
jsYaml$1.CORE_SCHEMA = core;
jsYaml$1.DEFAULT_SAFE_SCHEMA = default_safe;
jsYaml$1.DEFAULT_FULL_SCHEMA = default_full;
jsYaml$1.load = loader.load;
jsYaml$1.loadAll = loader.loadAll;
jsYaml$1.safeLoad = loader.safeLoad;
jsYaml$1.safeLoadAll = loader.safeLoadAll;
jsYaml$1.dump = dumper.dump;
jsYaml$1.safeDump = dumper.safeDump;
jsYaml$1.YAMLException = exception;
jsYaml$1.MINIMAL_SCHEMA = failsafe;
jsYaml$1.SAFE_SCHEMA = default_safe;
jsYaml$1.DEFAULT_SCHEMA = default_full;
jsYaml$1.scan = deprecated("scan");
jsYaml$1.parse = deprecated("parse");
jsYaml$1.compose = deprecated("compose");
jsYaml$1.addConstructor = deprecated("addConstructor");
var yaml = jsYaml$1;
var jsYaml = yaml;
var nunjucks$1 = { exports: {} };
/*! Browser bundle of nunjucks 3.2.3  */
(function(module, exports) {
  (function webpackUniversalModuleDefinition(root, factory) {
    module.exports = factory();
  })(typeof self !== "undefined" ? self : commonjsGlobal, function() {
    return function(modules) {
      var installedModules = {};
      function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
          return installedModules[moduleId].exports;
        }
        var module2 = installedModules[moduleId] = {
          i: moduleId,
          l: false,
          exports: {}
        };
        modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
        module2.l = true;
        return module2.exports;
      }
      __webpack_require__.m = modules;
      __webpack_require__.c = installedModules;
      __webpack_require__.d = function(exports2, name, getter) {
        if (!__webpack_require__.o(exports2, name)) {
          Object.defineProperty(exports2, name, {
            configurable: false,
            enumerable: true,
            get: getter
          });
        }
      };
      __webpack_require__.n = function(module2) {
        var getter = module2 && module2.__esModule ? function getDefault() {
          return module2["default"];
        } : function getModuleExports() {
          return module2;
        };
        __webpack_require__.d(getter, "a", getter);
        return getter;
      };
      __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      __webpack_require__.p = "";
      return __webpack_require__(__webpack_require__.s = 11);
    }([
      function(module2, exports2, __webpack_require__) {
        var ArrayProto = Array.prototype;
        var ObjProto = Object.prototype;
        var escapeMap = {
          "&": "&amp;",
          '"': "&quot;",
          "'": "&#39;",
          "<": "&lt;",
          ">": "&gt;"
        };
        var escapeRegex = /[&"'<>]/g;
        var exports2 = module2.exports = {};
        function hasOwnProp(obj, k) {
          return ObjProto.hasOwnProperty.call(obj, k);
        }
        exports2.hasOwnProp = hasOwnProp;
        function lookupEscape(ch) {
          return escapeMap[ch];
        }
        function _prettifyError(path, withInternals, err) {
          if (!err.Update) {
            err = new exports2.TemplateError(err);
          }
          err.Update(path);
          if (!withInternals) {
            var old = err;
            err = new Error(old.message);
            err.name = old.name;
          }
          return err;
        }
        exports2._prettifyError = _prettifyError;
        function TemplateError(message, lineno, colno) {
          var err;
          var cause;
          if (message instanceof Error) {
            cause = message;
            message = cause.name + ": " + cause.message;
          }
          if (Object.setPrototypeOf) {
            err = new Error(message);
            Object.setPrototypeOf(err, TemplateError.prototype);
          } else {
            err = this;
            Object.defineProperty(err, "message", {
              enumerable: false,
              writable: true,
              value: message
            });
          }
          Object.defineProperty(err, "name", {
            value: "Template render error"
          });
          if (Error.captureStackTrace) {
            Error.captureStackTrace(err, this.constructor);
          }
          var getStack;
          if (cause) {
            var stackDescriptor = Object.getOwnPropertyDescriptor(cause, "stack");
            getStack = stackDescriptor && (stackDescriptor.get || function() {
              return stackDescriptor.value;
            });
            if (!getStack) {
              getStack = function getStack2() {
                return cause.stack;
              };
            }
          } else {
            var stack = new Error(message).stack;
            getStack = function getStack2() {
              return stack;
            };
          }
          Object.defineProperty(err, "stack", {
            get: function get() {
              return getStack.call(err);
            }
          });
          Object.defineProperty(err, "cause", {
            value: cause
          });
          err.lineno = lineno;
          err.colno = colno;
          err.firstUpdate = true;
          err.Update = function Update(path) {
            var msg = "(" + (path || "unknown path") + ")";
            if (this.firstUpdate) {
              if (this.lineno && this.colno) {
                msg += " [Line " + this.lineno + ", Column " + this.colno + "]";
              } else if (this.lineno) {
                msg += " [Line " + this.lineno + "]";
              }
            }
            msg += "\n ";
            if (this.firstUpdate) {
              msg += " ";
            }
            this.message = msg + (this.message || "");
            this.firstUpdate = false;
            return this;
          };
          return err;
        }
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(TemplateError.prototype, Error.prototype);
        } else {
          TemplateError.prototype = Object.create(Error.prototype, {
            constructor: {
              value: TemplateError
            }
          });
        }
        exports2.TemplateError = TemplateError;
        function escape(val) {
          return val.replace(escapeRegex, lookupEscape);
        }
        exports2.escape = escape;
        function isFunction2(obj) {
          return ObjProto.toString.call(obj) === "[object Function]";
        }
        exports2.isFunction = isFunction2;
        function isArray(obj) {
          return ObjProto.toString.call(obj) === "[object Array]";
        }
        exports2.isArray = isArray;
        function isString(obj) {
          return ObjProto.toString.call(obj) === "[object String]";
        }
        exports2.isString = isString;
        function isObject2(obj) {
          return ObjProto.toString.call(obj) === "[object Object]";
        }
        exports2.isObject = isObject2;
        function _prepareAttributeParts(attr) {
          if (!attr) {
            return [];
          }
          if (typeof attr === "string") {
            return attr.split(".");
          }
          return [attr];
        }
        function getAttrGetter(attribute) {
          var parts = _prepareAttributeParts(attribute);
          return function attrGetter(item) {
            var _item = item;
            for (var i = 0; i < parts.length; i++) {
              var part = parts[i];
              if (hasOwnProp(_item, part)) {
                _item = _item[part];
              } else {
                return void 0;
              }
            }
            return _item;
          };
        }
        exports2.getAttrGetter = getAttrGetter;
        function groupBy(obj, val, throwOnUndefined) {
          var result = {};
          var iterator = isFunction2(val) ? val : getAttrGetter(val);
          for (var i = 0; i < obj.length; i++) {
            var value = obj[i];
            var key = iterator(value, i);
            if (key === void 0 && throwOnUndefined === true) {
              throw new TypeError('groupby: attribute "' + val + '" resolved to undefined');
            }
            (result[key] || (result[key] = [])).push(value);
          }
          return result;
        }
        exports2.groupBy = groupBy;
        function toArray2(obj) {
          return Array.prototype.slice.call(obj);
        }
        exports2.toArray = toArray2;
        function without(array) {
          var result = [];
          if (!array) {
            return result;
          }
          var length = array.length;
          var contains = toArray2(arguments).slice(1);
          var index = -1;
          while (++index < length) {
            if (indexOf(contains, array[index]) === -1) {
              result.push(array[index]);
            }
          }
          return result;
        }
        exports2.without = without;
        function repeat2(char_, n) {
          var str2 = "";
          for (var i = 0; i < n; i++) {
            str2 += char_;
          }
          return str2;
        }
        exports2.repeat = repeat2;
        function each(obj, func, context) {
          if (obj == null) {
            return;
          }
          if (ArrayProto.forEach && obj.forEach === ArrayProto.forEach) {
            obj.forEach(func, context);
          } else if (obj.length === +obj.length) {
            for (var i = 0, l = obj.length; i < l; i++) {
              func.call(context, obj[i], i, obj);
            }
          }
        }
        exports2.each = each;
        function map2(obj, func) {
          var results = [];
          if (obj == null) {
            return results;
          }
          if (ArrayProto.map && obj.map === ArrayProto.map) {
            return obj.map(func);
          }
          for (var i = 0; i < obj.length; i++) {
            results[results.length] = func(obj[i], i);
          }
          if (obj.length === +obj.length) {
            results.length = obj.length;
          }
          return results;
        }
        exports2.map = map2;
        function asyncIter(arr, iter, cb) {
          var i = -1;
          function next() {
            i++;
            if (i < arr.length) {
              iter(arr[i], i, next, cb);
            } else {
              cb();
            }
          }
          next();
        }
        exports2.asyncIter = asyncIter;
        function asyncFor(obj, iter, cb) {
          var keys = keys_(obj || {});
          var len = keys.length;
          var i = -1;
          function next() {
            i++;
            var k = keys[i];
            if (i < len) {
              iter(k, obj[k], i, len, next);
            } else {
              cb();
            }
          }
          next();
        }
        exports2.asyncFor = asyncFor;
        function indexOf(arr, searchElement, fromIndex) {
          return Array.prototype.indexOf.call(arr || [], searchElement, fromIndex);
        }
        exports2.indexOf = indexOf;
        function keys_(obj) {
          var arr = [];
          for (var k in obj) {
            if (hasOwnProp(obj, k)) {
              arr.push(k);
            }
          }
          return arr;
        }
        exports2.keys = keys_;
        function _entries(obj) {
          return keys_(obj).map(function(k) {
            return [k, obj[k]];
          });
        }
        exports2._entries = _entries;
        function _values(obj) {
          return keys_(obj).map(function(k) {
            return obj[k];
          });
        }
        exports2._values = _values;
        function extend2(obj1, obj2) {
          obj1 = obj1 || {};
          keys_(obj2).forEach(function(k) {
            obj1[k] = obj2[k];
          });
          return obj1;
        }
        exports2._assign = exports2.extend = extend2;
        function inOperator(key, val) {
          if (isArray(val) || isString(val)) {
            return val.indexOf(key) !== -1;
          } else if (isObject2(val)) {
            return key in val;
          }
          throw new Error('Cannot use "in" operator to search for "' + key + '" in unexpected types.');
        }
        exports2.inOperator = inOperator;
      },
      function(module2, exports2, __webpack_require__) {
        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps)
            _defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            _defineProperties(Constructor, staticProps);
          return Constructor;
        }
        function _inheritsLoose(subClass, superClass) {
          subClass.prototype = Object.create(superClass.prototype);
          subClass.prototype.constructor = subClass;
          _setPrototypeOf(subClass, superClass);
        }
        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
            o2.__proto__ = p2;
            return o2;
          };
          return _setPrototypeOf(o, p);
        }
        var EventEmitter = __webpack_require__(16);
        var lib = __webpack_require__(0);
        function parentWrap(parent, prop) {
          if (typeof parent !== "function" || typeof prop !== "function") {
            return prop;
          }
          return function wrap() {
            var tmp = this.parent;
            this.parent = parent;
            var res = prop.apply(this, arguments);
            this.parent = tmp;
            return res;
          };
        }
        function extendClass(cls, name, props) {
          props = props || {};
          lib.keys(props).forEach(function(k) {
            props[k] = parentWrap(cls.prototype[k], props[k]);
          });
          var subclass = /* @__PURE__ */ function(_cls) {
            _inheritsLoose(subclass2, _cls);
            function subclass2() {
              return _cls.apply(this, arguments) || this;
            }
            _createClass(subclass2, [{
              key: "typename",
              get: function get() {
                return name;
              }
            }]);
            return subclass2;
          }(cls);
          lib._assign(subclass.prototype, props);
          return subclass;
        }
        var Obj = /* @__PURE__ */ function() {
          function Obj2() {
            this.init.apply(this, arguments);
          }
          var _proto = Obj2.prototype;
          _proto.init = function init() {
          };
          Obj2.extend = function extend2(name, props) {
            if (typeof name === "object") {
              props = name;
              name = "anonymous";
            }
            return extendClass(this, name, props);
          };
          _createClass(Obj2, [{
            key: "typename",
            get: function get() {
              return this.constructor.name;
            }
          }]);
          return Obj2;
        }();
        var EmitterObj = /* @__PURE__ */ function(_EventEmitter) {
          _inheritsLoose(EmitterObj2, _EventEmitter);
          function EmitterObj2() {
            var _this2;
            var _this;
            _this = _EventEmitter.call(this) || this;
            (_this2 = _this).init.apply(_this2, arguments);
            return _this;
          }
          var _proto2 = EmitterObj2.prototype;
          _proto2.init = function init() {
          };
          EmitterObj2.extend = function extend2(name, props) {
            if (typeof name === "object") {
              props = name;
              name = "anonymous";
            }
            return extendClass(this, name, props);
          };
          _createClass(EmitterObj2, [{
            key: "typename",
            get: function get() {
              return this.constructor.name;
            }
          }]);
          return EmitterObj2;
        }(EventEmitter);
        module2.exports = {
          Obj,
          EmitterObj
        };
      },
      function(module2, exports2, __webpack_require__) {
        var lib = __webpack_require__(0);
        var arrayFrom = Array.from;
        var supportsIterators = typeof Symbol === "function" && Symbol.iterator && typeof arrayFrom === "function";
        var Frame = /* @__PURE__ */ function() {
          function Frame2(parent, isolateWrites) {
            this.variables = /* @__PURE__ */ Object.create(null);
            this.parent = parent;
            this.topLevel = false;
            this.isolateWrites = isolateWrites;
          }
          var _proto = Frame2.prototype;
          _proto.set = function set2(name, val, resolveUp) {
            var parts = name.split(".");
            var obj = this.variables;
            var frame = this;
            if (resolveUp) {
              if (frame = this.resolve(parts[0], true)) {
                frame.set(name, val);
                return;
              }
            }
            for (var i = 0; i < parts.length - 1; i++) {
              var id = parts[i];
              if (!obj[id]) {
                obj[id] = {};
              }
              obj = obj[id];
            }
            obj[parts[parts.length - 1]] = val;
          };
          _proto.get = function get(name) {
            var val = this.variables[name];
            if (val !== void 0) {
              return val;
            }
            return null;
          };
          _proto.lookup = function lookup(name) {
            var p = this.parent;
            var val = this.variables[name];
            if (val !== void 0) {
              return val;
            }
            return p && p.lookup(name);
          };
          _proto.resolve = function resolve2(name, forWrite) {
            var p = forWrite && this.isolateWrites ? void 0 : this.parent;
            var val = this.variables[name];
            if (val !== void 0) {
              return this;
            }
            return p && p.resolve(name);
          };
          _proto.push = function push(isolateWrites) {
            return new Frame2(this, isolateWrites);
          };
          _proto.pop = function pop() {
            return this.parent;
          };
          return Frame2;
        }();
        function makeMacro(argNames, kwargNames, func) {
          return function macro() {
            for (var _len = arguments.length, macroArgs = new Array(_len), _key = 0; _key < _len; _key++) {
              macroArgs[_key] = arguments[_key];
            }
            var argCount = numArgs(macroArgs);
            var args;
            var kwargs = getKeywordArgs(macroArgs);
            if (argCount > argNames.length) {
              args = macroArgs.slice(0, argNames.length);
              macroArgs.slice(args.length, argCount).forEach(function(val, i2) {
                if (i2 < kwargNames.length) {
                  kwargs[kwargNames[i2]] = val;
                }
              });
              args.push(kwargs);
            } else if (argCount < argNames.length) {
              args = macroArgs.slice(0, argCount);
              for (var i = argCount; i < argNames.length; i++) {
                var arg = argNames[i];
                args.push(kwargs[arg]);
                delete kwargs[arg];
              }
              args.push(kwargs);
            } else {
              args = macroArgs;
            }
            return func.apply(this, args);
          };
        }
        function makeKeywordArgs(obj) {
          obj.__keywords = true;
          return obj;
        }
        function isKeywordArgs(obj) {
          return obj && Object.prototype.hasOwnProperty.call(obj, "__keywords");
        }
        function getKeywordArgs(args) {
          var len = args.length;
          if (len) {
            var lastArg = args[len - 1];
            if (isKeywordArgs(lastArg)) {
              return lastArg;
            }
          }
          return {};
        }
        function numArgs(args) {
          var len = args.length;
          if (len === 0) {
            return 0;
          }
          var lastArg = args[len - 1];
          if (isKeywordArgs(lastArg)) {
            return len - 1;
          } else {
            return len;
          }
        }
        function SafeString(val) {
          if (typeof val !== "string") {
            return val;
          }
          this.val = val;
          this.length = val.length;
        }
        SafeString.prototype = Object.create(String.prototype, {
          length: {
            writable: true,
            configurable: true,
            value: 0
          }
        });
        SafeString.prototype.valueOf = function valueOf() {
          return this.val;
        };
        SafeString.prototype.toString = function toString4() {
          return this.val;
        };
        function copySafeness(dest, target) {
          if (dest instanceof SafeString) {
            return new SafeString(target);
          }
          return target.toString();
        }
        function markSafe(val) {
          var type2 = typeof val;
          if (type2 === "string") {
            return new SafeString(val);
          } else if (type2 !== "function") {
            return val;
          } else {
            return function wrapSafe(args) {
              var ret = val.apply(this, arguments);
              if (typeof ret === "string") {
                return new SafeString(ret);
              }
              return ret;
            };
          }
        }
        function suppressValue(val, autoescape) {
          val = val !== void 0 && val !== null ? val : "";
          if (autoescape && !(val instanceof SafeString)) {
            val = lib.escape(val.toString());
          }
          return val;
        }
        function ensureDefined(val, lineno, colno) {
          if (val === null || val === void 0) {
            throw new lib.TemplateError("attempted to output null or undefined value", lineno + 1, colno + 1);
          }
          return val;
        }
        function memberLookup(obj, val) {
          if (obj === void 0 || obj === null) {
            return void 0;
          }
          if (typeof obj[val] === "function") {
            return function() {
              for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
              }
              return obj[val].apply(obj, args);
            };
          }
          return obj[val];
        }
        function callWrap(obj, name, context, args) {
          if (!obj) {
            throw new Error("Unable to call `" + name + "`, which is undefined or falsey");
          } else if (typeof obj !== "function") {
            throw new Error("Unable to call `" + name + "`, which is not a function");
          }
          return obj.apply(context, args);
        }
        function contextOrFrameLookup(context, frame, name) {
          var val = frame.lookup(name);
          return val !== void 0 ? val : context.lookup(name);
        }
        function handleError(error, lineno, colno) {
          if (error.lineno) {
            return error;
          } else {
            return new lib.TemplateError(error, lineno, colno);
          }
        }
        function asyncEach(arr, dimen, iter, cb) {
          if (lib.isArray(arr)) {
            var len = arr.length;
            lib.asyncIter(arr, function iterCallback(item, i, next) {
              switch (dimen) {
                case 1:
                  iter(item, i, len, next);
                  break;
                case 2:
                  iter(item[0], item[1], i, len, next);
                  break;
                case 3:
                  iter(item[0], item[1], item[2], i, len, next);
                  break;
                default:
                  item.push(i, len, next);
                  iter.apply(this, item);
              }
            }, cb);
          } else {
            lib.asyncFor(arr, function iterCallback(key, val, i, len2, next) {
              iter(key, val, i, len2, next);
            }, cb);
          }
        }
        function asyncAll(arr, dimen, func, cb) {
          var finished = 0;
          var len;
          var outputArr;
          function done(i2, output) {
            finished++;
            outputArr[i2] = output;
            if (finished === len) {
              cb(null, outputArr.join(""));
            }
          }
          if (lib.isArray(arr)) {
            len = arr.length;
            outputArr = new Array(len);
            if (len === 0) {
              cb(null, "");
            } else {
              for (var i = 0; i < arr.length; i++) {
                var item = arr[i];
                switch (dimen) {
                  case 1:
                    func(item, i, len, done);
                    break;
                  case 2:
                    func(item[0], item[1], i, len, done);
                    break;
                  case 3:
                    func(item[0], item[1], item[2], i, len, done);
                    break;
                  default:
                    item.push(i, len, done);
                    func.apply(this, item);
                }
              }
            }
          } else {
            var keys = lib.keys(arr || {});
            len = keys.length;
            outputArr = new Array(len);
            if (len === 0) {
              cb(null, "");
            } else {
              for (var _i = 0; _i < keys.length; _i++) {
                var k = keys[_i];
                func(k, arr[k], _i, len, done);
              }
            }
          }
        }
        function fromIterator(arr) {
          if (typeof arr !== "object" || arr === null || lib.isArray(arr)) {
            return arr;
          } else if (supportsIterators && Symbol.iterator in arr) {
            return arrayFrom(arr);
          } else {
            return arr;
          }
        }
        module2.exports = {
          Frame,
          makeMacro,
          makeKeywordArgs,
          numArgs,
          suppressValue,
          ensureDefined,
          memberLookup,
          contextOrFrameLookup,
          callWrap,
          handleError,
          isArray: lib.isArray,
          keys: lib.keys,
          SafeString,
          copySafeness,
          markSafe,
          asyncEach,
          asyncAll,
          inOperator: lib.inOperator,
          fromIterator
        };
      },
      function(module2, exports2, __webpack_require__) {
        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps)
            _defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            _defineProperties(Constructor, staticProps);
          return Constructor;
        }
        function _inheritsLoose(subClass, superClass) {
          subClass.prototype = Object.create(superClass.prototype);
          subClass.prototype.constructor = subClass;
          _setPrototypeOf(subClass, superClass);
        }
        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
            o2.__proto__ = p2;
            return o2;
          };
          return _setPrototypeOf(o, p);
        }
        var _require = __webpack_require__(1), Obj = _require.Obj;
        function traverseAndCheck(obj, type2, results) {
          if (obj instanceof type2) {
            results.push(obj);
          }
          if (obj instanceof Node) {
            obj.findAll(type2, results);
          }
        }
        var Node = /* @__PURE__ */ function(_Obj) {
          _inheritsLoose(Node2, _Obj);
          function Node2() {
            return _Obj.apply(this, arguments) || this;
          }
          var _proto = Node2.prototype;
          _proto.init = function init(lineno, colno) {
            var _arguments = arguments, _this = this;
            for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
              args[_key - 2] = arguments[_key];
            }
            this.lineno = lineno;
            this.colno = colno;
            this.fields.forEach(function(field, i) {
              var val = _arguments[i + 2];
              if (val === void 0) {
                val = null;
              }
              _this[field] = val;
            });
          };
          _proto.findAll = function findAll(type2, results) {
            var _this2 = this;
            results = results || [];
            if (this instanceof NodeList) {
              this.children.forEach(function(child) {
                return traverseAndCheck(child, type2, results);
              });
            } else {
              this.fields.forEach(function(field) {
                return traverseAndCheck(_this2[field], type2, results);
              });
            }
            return results;
          };
          _proto.iterFields = function iterFields(func) {
            var _this3 = this;
            this.fields.forEach(function(field) {
              func(_this3[field], field);
            });
          };
          return Node2;
        }(Obj);
        var Value = /* @__PURE__ */ function(_Node) {
          _inheritsLoose(Value2, _Node);
          function Value2() {
            return _Node.apply(this, arguments) || this;
          }
          _createClass(Value2, [{
            key: "typename",
            get: function get() {
              return "Value";
            }
          }, {
            key: "fields",
            get: function get() {
              return ["value"];
            }
          }]);
          return Value2;
        }(Node);
        var NodeList = /* @__PURE__ */ function(_Node2) {
          _inheritsLoose(NodeList2, _Node2);
          function NodeList2() {
            return _Node2.apply(this, arguments) || this;
          }
          var _proto2 = NodeList2.prototype;
          _proto2.init = function init(lineno, colno, nodes) {
            _Node2.prototype.init.call(this, lineno, colno, nodes || []);
          };
          _proto2.addChild = function addChild(node) {
            this.children.push(node);
          };
          _createClass(NodeList2, [{
            key: "typename",
            get: function get() {
              return "NodeList";
            }
          }, {
            key: "fields",
            get: function get() {
              return ["children"];
            }
          }]);
          return NodeList2;
        }(Node);
        var Root = NodeList.extend("Root");
        var Literal = Value.extend("Literal");
        var Symbol2 = Value.extend("Symbol");
        var Group = NodeList.extend("Group");
        var ArrayNode = NodeList.extend("Array");
        var Pair = Node.extend("Pair", {
          fields: ["key", "value"]
        });
        var Dict = NodeList.extend("Dict");
        var LookupVal = Node.extend("LookupVal", {
          fields: ["target", "val"]
        });
        var If = Node.extend("If", {
          fields: ["cond", "body", "else_"]
        });
        var IfAsync = If.extend("IfAsync");
        var InlineIf = Node.extend("InlineIf", {
          fields: ["cond", "body", "else_"]
        });
        var For = Node.extend("For", {
          fields: ["arr", "name", "body", "else_"]
        });
        var AsyncEach = For.extend("AsyncEach");
        var AsyncAll = For.extend("AsyncAll");
        var Macro = Node.extend("Macro", {
          fields: ["name", "args", "body"]
        });
        var Caller = Macro.extend("Caller");
        var Import = Node.extend("Import", {
          fields: ["template", "target", "withContext"]
        });
        var FromImport = /* @__PURE__ */ function(_Node3) {
          _inheritsLoose(FromImport2, _Node3);
          function FromImport2() {
            return _Node3.apply(this, arguments) || this;
          }
          var _proto3 = FromImport2.prototype;
          _proto3.init = function init(lineno, colno, template, names, withContext) {
            _Node3.prototype.init.call(this, lineno, colno, template, names || new NodeList(), withContext);
          };
          _createClass(FromImport2, [{
            key: "typename",
            get: function get() {
              return "FromImport";
            }
          }, {
            key: "fields",
            get: function get() {
              return ["template", "names", "withContext"];
            }
          }]);
          return FromImport2;
        }(Node);
        var FunCall = Node.extend("FunCall", {
          fields: ["name", "args"]
        });
        var Filter = FunCall.extend("Filter");
        var FilterAsync = Filter.extend("FilterAsync", {
          fields: ["name", "args", "symbol"]
        });
        var KeywordArgs = Dict.extend("KeywordArgs");
        var Block = Node.extend("Block", {
          fields: ["name", "body"]
        });
        var Super = Node.extend("Super", {
          fields: ["blockName", "symbol"]
        });
        var TemplateRef = Node.extend("TemplateRef", {
          fields: ["template"]
        });
        var Extends = TemplateRef.extend("Extends");
        var Include = Node.extend("Include", {
          fields: ["template", "ignoreMissing"]
        });
        var Set2 = Node.extend("Set", {
          fields: ["targets", "value"]
        });
        var Switch = Node.extend("Switch", {
          fields: ["expr", "cases", "default"]
        });
        var Case = Node.extend("Case", {
          fields: ["cond", "body"]
        });
        var Output = NodeList.extend("Output");
        var Capture = Node.extend("Capture", {
          fields: ["body"]
        });
        var TemplateData = Literal.extend("TemplateData");
        var UnaryOp = Node.extend("UnaryOp", {
          fields: ["target"]
        });
        var BinOp = Node.extend("BinOp", {
          fields: ["left", "right"]
        });
        var In = BinOp.extend("In");
        var Is = BinOp.extend("Is");
        var Or = BinOp.extend("Or");
        var And = BinOp.extend("And");
        var Not = UnaryOp.extend("Not");
        var Add = BinOp.extend("Add");
        var Concat = BinOp.extend("Concat");
        var Sub = BinOp.extend("Sub");
        var Mul = BinOp.extend("Mul");
        var Div = BinOp.extend("Div");
        var FloorDiv = BinOp.extend("FloorDiv");
        var Mod = BinOp.extend("Mod");
        var Pow = BinOp.extend("Pow");
        var Neg = UnaryOp.extend("Neg");
        var Pos = UnaryOp.extend("Pos");
        var Compare = Node.extend("Compare", {
          fields: ["expr", "ops"]
        });
        var CompareOperand = Node.extend("CompareOperand", {
          fields: ["expr", "type"]
        });
        var CallExtension = Node.extend("CallExtension", {
          init: function init(ext, prop, args, contentArgs) {
            this.parent();
            this.extName = ext.__name || ext;
            this.prop = prop;
            this.args = args || new NodeList();
            this.contentArgs = contentArgs || [];
            this.autoescape = ext.autoescape;
          },
          fields: ["extName", "prop", "args", "contentArgs"]
        });
        var CallExtensionAsync = CallExtension.extend("CallExtensionAsync");
        function print(str2, indent, inline) {
          var lines = str2.split("\n");
          lines.forEach(function(line, i) {
            if (line && (inline && i > 0 || !inline)) {
              process.stdout.write(" ".repeat(indent));
            }
            var nl = i === lines.length - 1 ? "" : "\n";
            process.stdout.write("" + line + nl);
          });
        }
        function printNodes(node, indent) {
          indent = indent || 0;
          print(node.typename + ": ", indent);
          if (node instanceof NodeList) {
            print("\n");
            node.children.forEach(function(n) {
              printNodes(n, indent + 2);
            });
          } else if (node instanceof CallExtension) {
            print(node.extName + "." + node.prop + "\n");
            if (node.args) {
              printNodes(node.args, indent + 2);
            }
            if (node.contentArgs) {
              node.contentArgs.forEach(function(n) {
                printNodes(n, indent + 2);
              });
            }
          } else {
            var nodes = [];
            var props = null;
            node.iterFields(function(val, fieldName) {
              if (val instanceof Node) {
                nodes.push([fieldName, val]);
              } else {
                props = props || {};
                props[fieldName] = val;
              }
            });
            if (props) {
              print(JSON.stringify(props, null, 2) + "\n", null, true);
            } else {
              print("\n");
            }
            nodes.forEach(function(_ref) {
              var fieldName = _ref[0], n = _ref[1];
              print("[" + fieldName + "] =>", indent + 2);
              printNodes(n, indent + 4);
            });
          }
        }
        module2.exports = {
          Node,
          Root,
          NodeList,
          Value,
          Literal,
          Symbol: Symbol2,
          Group,
          Array: ArrayNode,
          Pair,
          Dict,
          Output,
          Capture,
          TemplateData,
          If,
          IfAsync,
          InlineIf,
          For,
          AsyncEach,
          AsyncAll,
          Macro,
          Caller,
          Import,
          FromImport,
          FunCall,
          Filter,
          FilterAsync,
          KeywordArgs,
          Block,
          Super,
          Extends,
          Include,
          Set: Set2,
          Switch,
          Case,
          LookupVal,
          BinOp,
          In,
          Is,
          Or,
          And,
          Not,
          Add,
          Concat,
          Sub,
          Mul,
          Div,
          FloorDiv,
          Mod,
          Pow,
          Neg,
          Pos,
          Compare,
          CompareOperand,
          CallExtension,
          CallExtensionAsync,
          printNodes
        };
      },
      function(module2, exports2) {
      },
      function(module2, exports2, __webpack_require__) {
        function _inheritsLoose(subClass, superClass) {
          subClass.prototype = Object.create(superClass.prototype);
          subClass.prototype.constructor = subClass;
          _setPrototypeOf(subClass, superClass);
        }
        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
            o2.__proto__ = p2;
            return o2;
          };
          return _setPrototypeOf(o, p);
        }
        var parser = __webpack_require__(8);
        var transformer = __webpack_require__(17);
        var nodes = __webpack_require__(3);
        var _require = __webpack_require__(0), TemplateError = _require.TemplateError;
        var _require2 = __webpack_require__(2), Frame = _require2.Frame;
        var _require3 = __webpack_require__(1), Obj = _require3.Obj;
        var compareOps = {
          "==": "==",
          "===": "===",
          "!=": "!=",
          "!==": "!==",
          "<": "<",
          ">": ">",
          "<=": "<=",
          ">=": ">="
        };
        var Compiler = /* @__PURE__ */ function(_Obj) {
          _inheritsLoose(Compiler2, _Obj);
          function Compiler2() {
            return _Obj.apply(this, arguments) || this;
          }
          var _proto = Compiler2.prototype;
          _proto.init = function init(templateName, throwOnUndefined) {
            this.templateName = templateName;
            this.codebuf = [];
            this.lastId = 0;
            this.buffer = null;
            this.bufferStack = [];
            this._scopeClosers = "";
            this.inBlock = false;
            this.throwOnUndefined = throwOnUndefined;
          };
          _proto.fail = function fail(msg, lineno, colno) {
            if (lineno !== void 0) {
              lineno += 1;
            }
            if (colno !== void 0) {
              colno += 1;
            }
            throw new TemplateError(msg, lineno, colno);
          };
          _proto._pushBuffer = function _pushBuffer() {
            var id = this._tmpid();
            this.bufferStack.push(this.buffer);
            this.buffer = id;
            this._emit("var " + this.buffer + ' = "";');
            return id;
          };
          _proto._popBuffer = function _popBuffer() {
            this.buffer = this.bufferStack.pop();
          };
          _proto._emit = function _emit(code) {
            this.codebuf.push(code);
          };
          _proto._emitLine = function _emitLine(code) {
            this._emit(code + "\n");
          };
          _proto._emitLines = function _emitLines() {
            var _this = this;
            for (var _len = arguments.length, lines = new Array(_len), _key = 0; _key < _len; _key++) {
              lines[_key] = arguments[_key];
            }
            lines.forEach(function(line) {
              return _this._emitLine(line);
            });
          };
          _proto._emitFuncBegin = function _emitFuncBegin(node, name) {
            this.buffer = "output";
            this._scopeClosers = "";
            this._emitLine("function " + name + "(env, context, frame, runtime, cb) {");
            this._emitLine("var lineno = " + node.lineno + ";");
            this._emitLine("var colno = " + node.colno + ";");
            this._emitLine("var " + this.buffer + ' = "";');
            this._emitLine("try {");
          };
          _proto._emitFuncEnd = function _emitFuncEnd(noReturn) {
            if (!noReturn) {
              this._emitLine("cb(null, " + this.buffer + ");");
            }
            this._closeScopeLevels();
            this._emitLine("} catch (e) {");
            this._emitLine("  cb(runtime.handleError(e, lineno, colno));");
            this._emitLine("}");
            this._emitLine("}");
            this.buffer = null;
          };
          _proto._addScopeLevel = function _addScopeLevel() {
            this._scopeClosers += "})";
          };
          _proto._closeScopeLevels = function _closeScopeLevels() {
            this._emitLine(this._scopeClosers + ";");
            this._scopeClosers = "";
          };
          _proto._withScopedSyntax = function _withScopedSyntax(func) {
            var _scopeClosers = this._scopeClosers;
            this._scopeClosers = "";
            func.call(this);
            this._closeScopeLevels();
            this._scopeClosers = _scopeClosers;
          };
          _proto._makeCallback = function _makeCallback(res) {
            var err = this._tmpid();
            return "function(" + err + (res ? "," + res : "") + ") {\nif(" + err + ") { cb(" + err + "); return; }";
          };
          _proto._tmpid = function _tmpid() {
            this.lastId++;
            return "t_" + this.lastId;
          };
          _proto._templateName = function _templateName() {
            return this.templateName == null ? "undefined" : JSON.stringify(this.templateName);
          };
          _proto._compileChildren = function _compileChildren(node, frame) {
            var _this2 = this;
            node.children.forEach(function(child) {
              _this2.compile(child, frame);
            });
          };
          _proto._compileAggregate = function _compileAggregate(node, frame, startChar, endChar) {
            var _this3 = this;
            if (startChar) {
              this._emit(startChar);
            }
            node.children.forEach(function(child, i) {
              if (i > 0) {
                _this3._emit(",");
              }
              _this3.compile(child, frame);
            });
            if (endChar) {
              this._emit(endChar);
            }
          };
          _proto._compileExpression = function _compileExpression(node, frame) {
            this.assertType(node, nodes.Literal, nodes.Symbol, nodes.Group, nodes.Array, nodes.Dict, nodes.FunCall, nodes.Caller, nodes.Filter, nodes.LookupVal, nodes.Compare, nodes.InlineIf, nodes.In, nodes.Is, nodes.And, nodes.Or, nodes.Not, nodes.Add, nodes.Concat, nodes.Sub, nodes.Mul, nodes.Div, nodes.FloorDiv, nodes.Mod, nodes.Pow, nodes.Neg, nodes.Pos, nodes.Compare, nodes.NodeList);
            this.compile(node, frame);
          };
          _proto.assertType = function assertType(node) {
            for (var _len2 = arguments.length, types = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              types[_key2 - 1] = arguments[_key2];
            }
            if (!types.some(function(t) {
              return node instanceof t;
            })) {
              this.fail("assertType: invalid type: " + node.typename, node.lineno, node.colno);
            }
          };
          _proto.compileCallExtension = function compileCallExtension(node, frame, async) {
            var _this4 = this;
            var args = node.args;
            var contentArgs = node.contentArgs;
            var autoescape = typeof node.autoescape === "boolean" ? node.autoescape : true;
            if (!async) {
              this._emit(this.buffer + " += runtime.suppressValue(");
            }
            this._emit('env.getExtension("' + node.extName + '")["' + node.prop + '"](');
            this._emit("context");
            if (args || contentArgs) {
              this._emit(",");
            }
            if (args) {
              if (!(args instanceof nodes.NodeList)) {
                this.fail("compileCallExtension: arguments must be a NodeList, use `parser.parseSignature`");
              }
              args.children.forEach(function(arg, i) {
                _this4._compileExpression(arg, frame);
                if (i !== args.children.length - 1 || contentArgs.length) {
                  _this4._emit(",");
                }
              });
            }
            if (contentArgs.length) {
              contentArgs.forEach(function(arg, i) {
                if (i > 0) {
                  _this4._emit(",");
                }
                if (arg) {
                  _this4._emitLine("function(cb) {");
                  _this4._emitLine("if(!cb) { cb = function(err) { if(err) { throw err; }}}");
                  var id = _this4._pushBuffer();
                  _this4._withScopedSyntax(function() {
                    _this4.compile(arg, frame);
                    _this4._emitLine("cb(null, " + id + ");");
                  });
                  _this4._popBuffer();
                  _this4._emitLine("return " + id + ";");
                  _this4._emitLine("}");
                } else {
                  _this4._emit("null");
                }
              });
            }
            if (async) {
              var res = this._tmpid();
              this._emitLine(", " + this._makeCallback(res));
              this._emitLine(this.buffer + " += runtime.suppressValue(" + res + ", " + autoescape + " && env.opts.autoescape);");
              this._addScopeLevel();
            } else {
              this._emit(")");
              this._emit(", " + autoescape + " && env.opts.autoescape);\n");
            }
          };
          _proto.compileCallExtensionAsync = function compileCallExtensionAsync(node, frame) {
            this.compileCallExtension(node, frame, true);
          };
          _proto.compileNodeList = function compileNodeList(node, frame) {
            this._compileChildren(node, frame);
          };
          _proto.compileLiteral = function compileLiteral(node) {
            if (typeof node.value === "string") {
              var val = node.value.replace(/\\/g, "\\\\");
              val = val.replace(/"/g, '\\"');
              val = val.replace(/\n/g, "\\n");
              val = val.replace(/\r/g, "\\r");
              val = val.replace(/\t/g, "\\t");
              val = val.replace(/\u2028/g, "\\u2028");
              this._emit('"' + val + '"');
            } else if (node.value === null) {
              this._emit("null");
            } else {
              this._emit(node.value.toString());
            }
          };
          _proto.compileSymbol = function compileSymbol(node, frame) {
            var name = node.value;
            var v = frame.lookup(name);
            if (v) {
              this._emit(v);
            } else {
              this._emit('runtime.contextOrFrameLookup(context, frame, "' + name + '")');
            }
          };
          _proto.compileGroup = function compileGroup(node, frame) {
            this._compileAggregate(node, frame, "(", ")");
          };
          _proto.compileArray = function compileArray(node, frame) {
            this._compileAggregate(node, frame, "[", "]");
          };
          _proto.compileDict = function compileDict(node, frame) {
            this._compileAggregate(node, frame, "{", "}");
          };
          _proto.compilePair = function compilePair(node, frame) {
            var key = node.key;
            var val = node.value;
            if (key instanceof nodes.Symbol) {
              key = new nodes.Literal(key.lineno, key.colno, key.value);
            } else if (!(key instanceof nodes.Literal && typeof key.value === "string")) {
              this.fail("compilePair: Dict keys must be strings or names", key.lineno, key.colno);
            }
            this.compile(key, frame);
            this._emit(": ");
            this._compileExpression(val, frame);
          };
          _proto.compileInlineIf = function compileInlineIf(node, frame) {
            this._emit("(");
            this.compile(node.cond, frame);
            this._emit("?");
            this.compile(node.body, frame);
            this._emit(":");
            if (node.else_ !== null) {
              this.compile(node.else_, frame);
            } else {
              this._emit('""');
            }
            this._emit(")");
          };
          _proto.compileIn = function compileIn(node, frame) {
            this._emit("runtime.inOperator(");
            this.compile(node.left, frame);
            this._emit(",");
            this.compile(node.right, frame);
            this._emit(")");
          };
          _proto.compileIs = function compileIs(node, frame) {
            var right = node.right.name ? node.right.name.value : node.right.value;
            this._emit('env.getTest("' + right + '").call(context, ');
            this.compile(node.left, frame);
            if (node.right.args) {
              this._emit(",");
              this.compile(node.right.args, frame);
            }
            this._emit(") === true");
          };
          _proto._binOpEmitter = function _binOpEmitter(node, frame, str2) {
            this.compile(node.left, frame);
            this._emit(str2);
            this.compile(node.right, frame);
          };
          _proto.compileOr = function compileOr(node, frame) {
            return this._binOpEmitter(node, frame, " || ");
          };
          _proto.compileAnd = function compileAnd(node, frame) {
            return this._binOpEmitter(node, frame, " && ");
          };
          _proto.compileAdd = function compileAdd(node, frame) {
            return this._binOpEmitter(node, frame, " + ");
          };
          _proto.compileConcat = function compileConcat(node, frame) {
            return this._binOpEmitter(node, frame, ' + "" + ');
          };
          _proto.compileSub = function compileSub(node, frame) {
            return this._binOpEmitter(node, frame, " - ");
          };
          _proto.compileMul = function compileMul(node, frame) {
            return this._binOpEmitter(node, frame, " * ");
          };
          _proto.compileDiv = function compileDiv(node, frame) {
            return this._binOpEmitter(node, frame, " / ");
          };
          _proto.compileMod = function compileMod(node, frame) {
            return this._binOpEmitter(node, frame, " % ");
          };
          _proto.compileNot = function compileNot(node, frame) {
            this._emit("!");
            this.compile(node.target, frame);
          };
          _proto.compileFloorDiv = function compileFloorDiv(node, frame) {
            this._emit("Math.floor(");
            this.compile(node.left, frame);
            this._emit(" / ");
            this.compile(node.right, frame);
            this._emit(")");
          };
          _proto.compilePow = function compilePow(node, frame) {
            this._emit("Math.pow(");
            this.compile(node.left, frame);
            this._emit(", ");
            this.compile(node.right, frame);
            this._emit(")");
          };
          _proto.compileNeg = function compileNeg(node, frame) {
            this._emit("-");
            this.compile(node.target, frame);
          };
          _proto.compilePos = function compilePos(node, frame) {
            this._emit("+");
            this.compile(node.target, frame);
          };
          _proto.compileCompare = function compileCompare(node, frame) {
            var _this5 = this;
            this.compile(node.expr, frame);
            node.ops.forEach(function(op) {
              _this5._emit(" " + compareOps[op.type] + " ");
              _this5.compile(op.expr, frame);
            });
          };
          _proto.compileLookupVal = function compileLookupVal(node, frame) {
            this._emit("runtime.memberLookup((");
            this._compileExpression(node.target, frame);
            this._emit("),");
            this._compileExpression(node.val, frame);
            this._emit(")");
          };
          _proto._getNodeName = function _getNodeName(node) {
            switch (node.typename) {
              case "Symbol":
                return node.value;
              case "FunCall":
                return "the return value of (" + this._getNodeName(node.name) + ")";
              case "LookupVal":
                return this._getNodeName(node.target) + '["' + this._getNodeName(node.val) + '"]';
              case "Literal":
                return node.value.toString();
              default:
                return "--expression--";
            }
          };
          _proto.compileFunCall = function compileFunCall(node, frame) {
            this._emit("(lineno = " + node.lineno + ", colno = " + node.colno + ", ");
            this._emit("runtime.callWrap(");
            this._compileExpression(node.name, frame);
            this._emit(', "' + this._getNodeName(node.name).replace(/"/g, '\\"') + '", context, ');
            this._compileAggregate(node.args, frame, "[", "])");
            this._emit(")");
          };
          _proto.compileFilter = function compileFilter(node, frame) {
            var name = node.name;
            this.assertType(name, nodes.Symbol);
            this._emit('env.getFilter("' + name.value + '").call(context, ');
            this._compileAggregate(node.args, frame);
            this._emit(")");
          };
          _proto.compileFilterAsync = function compileFilterAsync(node, frame) {
            var name = node.name;
            var symbol = node.symbol.value;
            this.assertType(name, nodes.Symbol);
            frame.set(symbol, symbol);
            this._emit('env.getFilter("' + name.value + '").call(context, ');
            this._compileAggregate(node.args, frame);
            this._emitLine(", " + this._makeCallback(symbol));
            this._addScopeLevel();
          };
          _proto.compileKeywordArgs = function compileKeywordArgs(node, frame) {
            this._emit("runtime.makeKeywordArgs(");
            this.compileDict(node, frame);
            this._emit(")");
          };
          _proto.compileSet = function compileSet(node, frame) {
            var _this6 = this;
            var ids = [];
            node.targets.forEach(function(target) {
              var name = target.value;
              var id = frame.lookup(name);
              if (id === null || id === void 0) {
                id = _this6._tmpid();
                _this6._emitLine("var " + id + ";");
              }
              ids.push(id);
            });
            if (node.value) {
              this._emit(ids.join(" = ") + " = ");
              this._compileExpression(node.value, frame);
              this._emitLine(";");
            } else {
              this._emit(ids.join(" = ") + " = ");
              this.compile(node.body, frame);
              this._emitLine(";");
            }
            node.targets.forEach(function(target, i) {
              var id = ids[i];
              var name = target.value;
              _this6._emitLine('frame.set("' + name + '", ' + id + ", true);");
              _this6._emitLine("if(frame.topLevel) {");
              _this6._emitLine('context.setVariable("' + name + '", ' + id + ");");
              _this6._emitLine("}");
              if (name.charAt(0) !== "_") {
                _this6._emitLine("if(frame.topLevel) {");
                _this6._emitLine('context.addExport("' + name + '", ' + id + ");");
                _this6._emitLine("}");
              }
            });
          };
          _proto.compileSwitch = function compileSwitch(node, frame) {
            var _this7 = this;
            this._emit("switch (");
            this.compile(node.expr, frame);
            this._emit(") {");
            node.cases.forEach(function(c, i) {
              _this7._emit("case ");
              _this7.compile(c.cond, frame);
              _this7._emit(": ");
              _this7.compile(c.body, frame);
              if (c.body.children.length) {
                _this7._emitLine("break;");
              }
            });
            if (node.default) {
              this._emit("default:");
              this.compile(node.default, frame);
            }
            this._emit("}");
          };
          _proto.compileIf = function compileIf(node, frame, async) {
            var _this8 = this;
            this._emit("if(");
            this._compileExpression(node.cond, frame);
            this._emitLine(") {");
            this._withScopedSyntax(function() {
              _this8.compile(node.body, frame);
              if (async) {
                _this8._emit("cb()");
              }
            });
            if (node.else_) {
              this._emitLine("}\nelse {");
              this._withScopedSyntax(function() {
                _this8.compile(node.else_, frame);
                if (async) {
                  _this8._emit("cb()");
                }
              });
            } else if (async) {
              this._emitLine("}\nelse {");
              this._emit("cb()");
            }
            this._emitLine("}");
          };
          _proto.compileIfAsync = function compileIfAsync(node, frame) {
            this._emit("(function(cb) {");
            this.compileIf(node, frame, true);
            this._emit("})(" + this._makeCallback());
            this._addScopeLevel();
          };
          _proto._emitLoopBindings = function _emitLoopBindings(node, arr, i, len) {
            var _this9 = this;
            var bindings = [{
              name: "index",
              val: i + " + 1"
            }, {
              name: "index0",
              val: i
            }, {
              name: "revindex",
              val: len + " - " + i
            }, {
              name: "revindex0",
              val: len + " - " + i + " - 1"
            }, {
              name: "first",
              val: i + " === 0"
            }, {
              name: "last",
              val: i + " === " + len + " - 1"
            }, {
              name: "length",
              val: len
            }];
            bindings.forEach(function(b) {
              _this9._emitLine('frame.set("loop.' + b.name + '", ' + b.val + ");");
            });
          };
          _proto.compileFor = function compileFor(node, frame) {
            var _this10 = this;
            var i = this._tmpid();
            var len = this._tmpid();
            var arr = this._tmpid();
            frame = frame.push();
            this._emitLine("frame = frame.push();");
            this._emit("var " + arr + " = ");
            this._compileExpression(node.arr, frame);
            this._emitLine(";");
            this._emit("if(" + arr + ") {");
            this._emitLine(arr + " = runtime.fromIterator(" + arr + ");");
            if (node.name instanceof nodes.Array) {
              this._emitLine("var " + i + ";");
              this._emitLine("if(runtime.isArray(" + arr + ")) {");
              this._emitLine("var " + len + " = " + arr + ".length;");
              this._emitLine("for(" + i + "=0; " + i + " < " + arr + ".length; " + i + "++) {");
              node.name.children.forEach(function(child, u) {
                var tid = _this10._tmpid();
                _this10._emitLine("var " + tid + " = " + arr + "[" + i + "][" + u + "];");
                _this10._emitLine('frame.set("' + child + '", ' + arr + "[" + i + "][" + u + "]);");
                frame.set(node.name.children[u].value, tid);
              });
              this._emitLoopBindings(node, arr, i, len);
              this._withScopedSyntax(function() {
                _this10.compile(node.body, frame);
              });
              this._emitLine("}");
              this._emitLine("} else {");
              var _node$name$children = node.name.children, key = _node$name$children[0], val = _node$name$children[1];
              var k = this._tmpid();
              var v = this._tmpid();
              frame.set(key.value, k);
              frame.set(val.value, v);
              this._emitLine(i + " = -1;");
              this._emitLine("var " + len + " = runtime.keys(" + arr + ").length;");
              this._emitLine("for(var " + k + " in " + arr + ") {");
              this._emitLine(i + "++;");
              this._emitLine("var " + v + " = " + arr + "[" + k + "];");
              this._emitLine('frame.set("' + key.value + '", ' + k + ");");
              this._emitLine('frame.set("' + val.value + '", ' + v + ");");
              this._emitLoopBindings(node, arr, i, len);
              this._withScopedSyntax(function() {
                _this10.compile(node.body, frame);
              });
              this._emitLine("}");
              this._emitLine("}");
            } else {
              var _v = this._tmpid();
              frame.set(node.name.value, _v);
              this._emitLine("var " + len + " = " + arr + ".length;");
              this._emitLine("for(var " + i + "=0; " + i + " < " + arr + ".length; " + i + "++) {");
              this._emitLine("var " + _v + " = " + arr + "[" + i + "];");
              this._emitLine('frame.set("' + node.name.value + '", ' + _v + ");");
              this._emitLoopBindings(node, arr, i, len);
              this._withScopedSyntax(function() {
                _this10.compile(node.body, frame);
              });
              this._emitLine("}");
            }
            this._emitLine("}");
            if (node.else_) {
              this._emitLine("if (!" + len + ") {");
              this.compile(node.else_, frame);
              this._emitLine("}");
            }
            this._emitLine("frame = frame.pop();");
          };
          _proto._compileAsyncLoop = function _compileAsyncLoop(node, frame, parallel) {
            var _this11 = this;
            var i = this._tmpid();
            var len = this._tmpid();
            var arr = this._tmpid();
            var asyncMethod = parallel ? "asyncAll" : "asyncEach";
            frame = frame.push();
            this._emitLine("frame = frame.push();");
            this._emit("var " + arr + " = runtime.fromIterator(");
            this._compileExpression(node.arr, frame);
            this._emitLine(");");
            if (node.name instanceof nodes.Array) {
              var arrayLen = node.name.children.length;
              this._emit("runtime." + asyncMethod + "(" + arr + ", " + arrayLen + ", function(");
              node.name.children.forEach(function(name) {
                _this11._emit(name.value + ",");
              });
              this._emit(i + "," + len + ",next) {");
              node.name.children.forEach(function(name) {
                var id2 = name.value;
                frame.set(id2, id2);
                _this11._emitLine('frame.set("' + id2 + '", ' + id2 + ");");
              });
            } else {
              var id = node.name.value;
              this._emitLine("runtime." + asyncMethod + "(" + arr + ", 1, function(" + id + ", " + i + ", " + len + ",next) {");
              this._emitLine('frame.set("' + id + '", ' + id + ");");
              frame.set(id, id);
            }
            this._emitLoopBindings(node, arr, i, len);
            this._withScopedSyntax(function() {
              var buf;
              if (parallel) {
                buf = _this11._pushBuffer();
              }
              _this11.compile(node.body, frame);
              _this11._emitLine("next(" + i + (buf ? "," + buf : "") + ");");
              if (parallel) {
                _this11._popBuffer();
              }
            });
            var output = this._tmpid();
            this._emitLine("}, " + this._makeCallback(output));
            this._addScopeLevel();
            if (parallel) {
              this._emitLine(this.buffer + " += " + output + ";");
            }
            if (node.else_) {
              this._emitLine("if (!" + arr + ".length) {");
              this.compile(node.else_, frame);
              this._emitLine("}");
            }
            this._emitLine("frame = frame.pop();");
          };
          _proto.compileAsyncEach = function compileAsyncEach(node, frame) {
            this._compileAsyncLoop(node, frame);
          };
          _proto.compileAsyncAll = function compileAsyncAll(node, frame) {
            this._compileAsyncLoop(node, frame, true);
          };
          _proto._compileMacro = function _compileMacro(node, frame) {
            var _this12 = this;
            var args = [];
            var kwargs = null;
            var funcId = "macro_" + this._tmpid();
            var keepFrame = frame !== void 0;
            node.args.children.forEach(function(arg, i) {
              if (i === node.args.children.length - 1 && arg instanceof nodes.Dict) {
                kwargs = arg;
              } else {
                _this12.assertType(arg, nodes.Symbol);
                args.push(arg);
              }
            });
            var realNames = [].concat(args.map(function(n) {
              return "l_" + n.value;
            }), ["kwargs"]);
            var argNames = args.map(function(n) {
              return '"' + n.value + '"';
            });
            var kwargNames = (kwargs && kwargs.children || []).map(function(n) {
              return '"' + n.key.value + '"';
            });
            var currFrame;
            if (keepFrame) {
              currFrame = frame.push(true);
            } else {
              currFrame = new Frame();
            }
            this._emitLines("var " + funcId + " = runtime.makeMacro(", "[" + argNames.join(", ") + "], ", "[" + kwargNames.join(", ") + "], ", "function (" + realNames.join(", ") + ") {", "var callerFrame = frame;", "frame = " + (keepFrame ? "frame.push(true);" : "new runtime.Frame();"), "kwargs = kwargs || {};", 'if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {', 'frame.set("caller", kwargs.caller); }');
            args.forEach(function(arg) {
              _this12._emitLine('frame.set("' + arg.value + '", l_' + arg.value + ");");
              currFrame.set(arg.value, "l_" + arg.value);
            });
            if (kwargs) {
              kwargs.children.forEach(function(pair) {
                var name = pair.key.value;
                _this12._emit('frame.set("' + name + '", ');
                _this12._emit('Object.prototype.hasOwnProperty.call(kwargs, "' + name + '")');
                _this12._emit(' ? kwargs["' + name + '"] : ');
                _this12._compileExpression(pair.value, currFrame);
                _this12._emit(");");
              });
            }
            var bufferId = this._pushBuffer();
            this._withScopedSyntax(function() {
              _this12.compile(node.body, currFrame);
            });
            this._emitLine("frame = " + (keepFrame ? "frame.pop();" : "callerFrame;"));
            this._emitLine("return new runtime.SafeString(" + bufferId + ");");
            this._emitLine("});");
            this._popBuffer();
            return funcId;
          };
          _proto.compileMacro = function compileMacro(node, frame) {
            var funcId = this._compileMacro(node);
            var name = node.name.value;
            frame.set(name, funcId);
            if (frame.parent) {
              this._emitLine('frame.set("' + name + '", ' + funcId + ");");
            } else {
              if (node.name.value.charAt(0) !== "_") {
                this._emitLine('context.addExport("' + name + '");');
              }
              this._emitLine('context.setVariable("' + name + '", ' + funcId + ");");
            }
          };
          _proto.compileCaller = function compileCaller(node, frame) {
            this._emit("(function (){");
            var funcId = this._compileMacro(node, frame);
            this._emit("return " + funcId + ";})()");
          };
          _proto._compileGetTemplate = function _compileGetTemplate(node, frame, eagerCompile, ignoreMissing) {
            var parentTemplateId = this._tmpid();
            var parentName = this._templateName();
            var cb = this._makeCallback(parentTemplateId);
            var eagerCompileArg = eagerCompile ? "true" : "false";
            var ignoreMissingArg = ignoreMissing ? "true" : "false";
            this._emit("env.getTemplate(");
            this._compileExpression(node.template, frame);
            this._emitLine(", " + eagerCompileArg + ", " + parentName + ", " + ignoreMissingArg + ", " + cb);
            return parentTemplateId;
          };
          _proto.compileImport = function compileImport(node, frame) {
            var target = node.target.value;
            var id = this._compileGetTemplate(node, frame, false, false);
            this._addScopeLevel();
            this._emitLine(id + ".getExported(" + (node.withContext ? "context.getVariables(), frame, " : "") + this._makeCallback(id));
            this._addScopeLevel();
            frame.set(target, id);
            if (frame.parent) {
              this._emitLine('frame.set("' + target + '", ' + id + ");");
            } else {
              this._emitLine('context.setVariable("' + target + '", ' + id + ");");
            }
          };
          _proto.compileFromImport = function compileFromImport(node, frame) {
            var _this13 = this;
            var importedId = this._compileGetTemplate(node, frame, false, false);
            this._addScopeLevel();
            this._emitLine(importedId + ".getExported(" + (node.withContext ? "context.getVariables(), frame, " : "") + this._makeCallback(importedId));
            this._addScopeLevel();
            node.names.children.forEach(function(nameNode) {
              var name;
              var alias;
              var id = _this13._tmpid();
              if (nameNode instanceof nodes.Pair) {
                name = nameNode.key.value;
                alias = nameNode.value.value;
              } else {
                name = nameNode.value;
                alias = name;
              }
              _this13._emitLine("if(Object.prototype.hasOwnProperty.call(" + importedId + ', "' + name + '")) {');
              _this13._emitLine("var " + id + " = " + importedId + "." + name + ";");
              _this13._emitLine("} else {");
              _this13._emitLine(`cb(new Error("cannot import '` + name + `'")); return;`);
              _this13._emitLine("}");
              frame.set(alias, id);
              if (frame.parent) {
                _this13._emitLine('frame.set("' + alias + '", ' + id + ");");
              } else {
                _this13._emitLine('context.setVariable("' + alias + '", ' + id + ");");
              }
            });
          };
          _proto.compileBlock = function compileBlock(node) {
            var id = this._tmpid();
            if (!this.inBlock) {
              this._emit('(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : ');
            }
            this._emit('context.getBlock("' + node.name.value + '")');
            if (!this.inBlock) {
              this._emit(")");
            }
            this._emitLine("(env, context, frame, runtime, " + this._makeCallback(id));
            this._emitLine(this.buffer + " += " + id + ";");
            this._addScopeLevel();
          };
          _proto.compileSuper = function compileSuper(node, frame) {
            var name = node.blockName.value;
            var id = node.symbol.value;
            var cb = this._makeCallback(id);
            this._emitLine('context.getSuper(env, "' + name + '", b_' + name + ", frame, runtime, " + cb);
            this._emitLine(id + " = runtime.markSafe(" + id + ");");
            this._addScopeLevel();
            frame.set(id, id);
          };
          _proto.compileExtends = function compileExtends(node, frame) {
            var k = this._tmpid();
            var parentTemplateId = this._compileGetTemplate(node, frame, true, false);
            this._emitLine("parentTemplate = " + parentTemplateId);
            this._emitLine("for(var " + k + " in parentTemplate.blocks) {");
            this._emitLine("context.addBlock(" + k + ", parentTemplate.blocks[" + k + "]);");
            this._emitLine("}");
            this._addScopeLevel();
          };
          _proto.compileInclude = function compileInclude(node, frame) {
            this._emitLine("var tasks = [];");
            this._emitLine("tasks.push(");
            this._emitLine("function(callback) {");
            var id = this._compileGetTemplate(node, frame, false, node.ignoreMissing);
            this._emitLine("callback(null," + id + ");});");
            this._emitLine("});");
            var id2 = this._tmpid();
            this._emitLine("tasks.push(");
            this._emitLine("function(template, callback){");
            this._emitLine("template.render(context.getVariables(), frame, " + this._makeCallback(id2));
            this._emitLine("callback(null," + id2 + ");});");
            this._emitLine("});");
            this._emitLine("tasks.push(");
            this._emitLine("function(result, callback){");
            this._emitLine(this.buffer + " += result;");
            this._emitLine("callback(null);");
            this._emitLine("});");
            this._emitLine("env.waterfall(tasks, function(){");
            this._addScopeLevel();
          };
          _proto.compileTemplateData = function compileTemplateData(node, frame) {
            this.compileLiteral(node, frame);
          };
          _proto.compileCapture = function compileCapture(node, frame) {
            var _this14 = this;
            var buffer = this.buffer;
            this.buffer = "output";
            this._emitLine("(function() {");
            this._emitLine('var output = "";');
            this._withScopedSyntax(function() {
              _this14.compile(node.body, frame);
            });
            this._emitLine("return output;");
            this._emitLine("})()");
            this.buffer = buffer;
          };
          _proto.compileOutput = function compileOutput(node, frame) {
            var _this15 = this;
            var children = node.children;
            children.forEach(function(child) {
              if (child instanceof nodes.TemplateData) {
                if (child.value) {
                  _this15._emit(_this15.buffer + " += ");
                  _this15.compileLiteral(child, frame);
                  _this15._emitLine(";");
                }
              } else {
                _this15._emit(_this15.buffer + " += runtime.suppressValue(");
                if (_this15.throwOnUndefined) {
                  _this15._emit("runtime.ensureDefined(");
                }
                _this15.compile(child, frame);
                if (_this15.throwOnUndefined) {
                  _this15._emit("," + node.lineno + "," + node.colno + ")");
                }
                _this15._emit(", env.opts.autoescape);\n");
              }
            });
          };
          _proto.compileRoot = function compileRoot(node, frame) {
            var _this16 = this;
            if (frame) {
              this.fail("compileRoot: root node can't have frame");
            }
            frame = new Frame();
            this._emitFuncBegin(node, "root");
            this._emitLine("var parentTemplate = null;");
            this._compileChildren(node, frame);
            this._emitLine("if(parentTemplate) {");
            this._emitLine("parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);");
            this._emitLine("} else {");
            this._emitLine("cb(null, " + this.buffer + ");");
            this._emitLine("}");
            this._emitFuncEnd(true);
            this.inBlock = true;
            var blockNames = [];
            var blocks = node.findAll(nodes.Block);
            blocks.forEach(function(block, i) {
              var name = block.name.value;
              if (blockNames.indexOf(name) !== -1) {
                throw new Error('Block "' + name + '" defined more than once.');
              }
              blockNames.push(name);
              _this16._emitFuncBegin(block, "b_" + name);
              var tmpFrame = new Frame();
              _this16._emitLine("var frame = frame.push(true);");
              _this16.compile(block.body, tmpFrame);
              _this16._emitFuncEnd();
            });
            this._emitLine("return {");
            blocks.forEach(function(block, i) {
              var blockName = "b_" + block.name.value;
              _this16._emitLine(blockName + ": " + blockName + ",");
            });
            this._emitLine("root: root\n};");
          };
          _proto.compile = function compile(node, frame) {
            var _compile = this["compile" + node.typename];
            if (_compile) {
              _compile.call(this, node, frame);
            } else {
              this.fail("compile: Cannot compile node: " + node.typename, node.lineno, node.colno);
            }
          };
          _proto.getCode = function getCode() {
            return this.codebuf.join("");
          };
          return Compiler2;
        }(Obj);
        module2.exports = {
          compile: function compile(src, asyncFilters, extensions, name, opts) {
            if (opts === void 0) {
              opts = {};
            }
            var c = new Compiler(name, opts.throwOnUndefined);
            var preprocessors = (extensions || []).map(function(ext) {
              return ext.preprocess;
            }).filter(function(f) {
              return !!f;
            });
            var processedSrc = preprocessors.reduce(function(s, processor) {
              return processor(s);
            }, src);
            c.compile(transformer.transform(parser.parse(processedSrc, extensions, opts), asyncFilters, name));
            return c.getCode();
          },
          Compiler
        };
      },
      function(module2, exports2, __webpack_require__) {
        function _inheritsLoose(subClass, superClass) {
          subClass.prototype = Object.create(superClass.prototype);
          subClass.prototype.constructor = subClass;
          _setPrototypeOf(subClass, superClass);
        }
        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
            o2.__proto__ = p2;
            return o2;
          };
          return _setPrototypeOf(o, p);
        }
        var path = __webpack_require__(4);
        var _require = __webpack_require__(1), EmitterObj = _require.EmitterObj;
        module2.exports = /* @__PURE__ */ function(_EmitterObj) {
          _inheritsLoose(Loader, _EmitterObj);
          function Loader() {
            return _EmitterObj.apply(this, arguments) || this;
          }
          var _proto = Loader.prototype;
          _proto.resolve = function resolve2(from, to) {
            return path.resolve(path.dirname(from), to);
          };
          _proto.isRelative = function isRelative(filename) {
            return filename.indexOf("./") === 0 || filename.indexOf("../") === 0;
          };
          return Loader;
        }(EmitterObj);
      },
      function(module2, exports2, __webpack_require__) {
        function _inheritsLoose(subClass, superClass) {
          subClass.prototype = Object.create(superClass.prototype);
          subClass.prototype.constructor = subClass;
          _setPrototypeOf(subClass, superClass);
        }
        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
            o2.__proto__ = p2;
            return o2;
          };
          return _setPrototypeOf(o, p);
        }
        var asap = __webpack_require__(12);
        var _waterfall = __webpack_require__(15);
        var lib = __webpack_require__(0);
        var compiler = __webpack_require__(5);
        var filters = __webpack_require__(18);
        var _require = __webpack_require__(10), FileSystemLoader = _require.FileSystemLoader, WebLoader = _require.WebLoader, PrecompiledLoader = _require.PrecompiledLoader;
        var tests = __webpack_require__(20);
        var globals = __webpack_require__(21);
        var _require2 = __webpack_require__(1), Obj = _require2.Obj, EmitterObj = _require2.EmitterObj;
        var globalRuntime = __webpack_require__(2);
        var handleError = globalRuntime.handleError, Frame = globalRuntime.Frame;
        var expressApp = __webpack_require__(22);
        function callbackAsap(cb, err, res) {
          asap(function() {
            cb(err, res);
          });
        }
        var noopTmplSrc = {
          type: "code",
          obj: {
            root: function root(env, context, frame, runtime, cb) {
              try {
                cb(null, "");
              } catch (e) {
                cb(handleError(e, null, null));
              }
            }
          }
        };
        var Environment = /* @__PURE__ */ function(_EmitterObj) {
          _inheritsLoose(Environment2, _EmitterObj);
          function Environment2() {
            return _EmitterObj.apply(this, arguments) || this;
          }
          var _proto = Environment2.prototype;
          _proto.init = function init(loaders, opts) {
            var _this = this;
            opts = this.opts = opts || {};
            this.opts.dev = !!opts.dev;
            this.opts.autoescape = opts.autoescape != null ? opts.autoescape : true;
            this.opts.throwOnUndefined = !!opts.throwOnUndefined;
            this.opts.trimBlocks = !!opts.trimBlocks;
            this.opts.lstripBlocks = !!opts.lstripBlocks;
            this.loaders = [];
            if (!loaders) {
              if (FileSystemLoader) {
                this.loaders = [new FileSystemLoader("views")];
              } else if (WebLoader) {
                this.loaders = [new WebLoader("/views")];
              }
            } else {
              this.loaders = lib.isArray(loaders) ? loaders : [loaders];
            }
            if (typeof window !== "undefined" && window.nunjucksPrecompiled) {
              this.loaders.unshift(new PrecompiledLoader(window.nunjucksPrecompiled));
            }
            this._initLoaders();
            this.globals = globals();
            this.filters = {};
            this.tests = {};
            this.asyncFilters = [];
            this.extensions = {};
            this.extensionsList = [];
            lib._entries(filters).forEach(function(_ref) {
              var name = _ref[0], filter = _ref[1];
              return _this.addFilter(name, filter);
            });
            lib._entries(tests).forEach(function(_ref2) {
              var name = _ref2[0], test = _ref2[1];
              return _this.addTest(name, test);
            });
          };
          _proto._initLoaders = function _initLoaders() {
            var _this2 = this;
            this.loaders.forEach(function(loader2) {
              loader2.cache = {};
              if (typeof loader2.on === "function") {
                loader2.on("update", function(name, fullname) {
                  loader2.cache[name] = null;
                  _this2.emit("update", name, fullname, loader2);
                });
                loader2.on("load", function(name, source) {
                  _this2.emit("load", name, source, loader2);
                });
              }
            });
          };
          _proto.invalidateCache = function invalidateCache() {
            this.loaders.forEach(function(loader2) {
              loader2.cache = {};
            });
          };
          _proto.addExtension = function addExtension(name, extension) {
            extension.__name = name;
            this.extensions[name] = extension;
            this.extensionsList.push(extension);
            return this;
          };
          _proto.removeExtension = function removeExtension(name) {
            var extension = this.getExtension(name);
            if (!extension) {
              return;
            }
            this.extensionsList = lib.without(this.extensionsList, extension);
            delete this.extensions[name];
          };
          _proto.getExtension = function getExtension(name) {
            return this.extensions[name];
          };
          _proto.hasExtension = function hasExtension(name) {
            return !!this.extensions[name];
          };
          _proto.addGlobal = function addGlobal(name, value) {
            this.globals[name] = value;
            return this;
          };
          _proto.getGlobal = function getGlobal(name) {
            if (typeof this.globals[name] === "undefined") {
              throw new Error("global not found: " + name);
            }
            return this.globals[name];
          };
          _proto.addFilter = function addFilter(name, func, async) {
            var wrapped = func;
            if (async) {
              this.asyncFilters.push(name);
            }
            this.filters[name] = wrapped;
            return this;
          };
          _proto.getFilter = function getFilter2(name) {
            if (!this.filters[name]) {
              throw new Error("filter not found: " + name);
            }
            return this.filters[name];
          };
          _proto.addTest = function addTest(name, func) {
            this.tests[name] = func;
            return this;
          };
          _proto.getTest = function getTest(name) {
            if (!this.tests[name]) {
              throw new Error("test not found: " + name);
            }
            return this.tests[name];
          };
          _proto.resolveTemplate = function resolveTemplate(loader2, parentName, filename) {
            var isRelative = loader2.isRelative && parentName ? loader2.isRelative(filename) : false;
            return isRelative && loader2.resolve ? loader2.resolve(parentName, filename) : filename;
          };
          _proto.getTemplate = function getTemplate(name, eagerCompile, parentName, ignoreMissing, cb) {
            var _this3 = this;
            var that = this;
            var tmpl = null;
            if (name && name.raw) {
              name = name.raw;
            }
            if (lib.isFunction(parentName)) {
              cb = parentName;
              parentName = null;
              eagerCompile = eagerCompile || false;
            }
            if (lib.isFunction(eagerCompile)) {
              cb = eagerCompile;
              eagerCompile = false;
            }
            if (name instanceof Template) {
              tmpl = name;
            } else if (typeof name !== "string") {
              throw new Error("template names must be a string: " + name);
            } else {
              for (var i = 0; i < this.loaders.length; i++) {
                var loader2 = this.loaders[i];
                tmpl = loader2.cache[this.resolveTemplate(loader2, parentName, name)];
                if (tmpl) {
                  break;
                }
              }
            }
            if (tmpl) {
              if (eagerCompile) {
                tmpl.compile();
              }
              if (cb) {
                cb(null, tmpl);
                return void 0;
              } else {
                return tmpl;
              }
            }
            var syncResult;
            var createTemplate = function createTemplate2(err, info) {
              if (!info && !err && !ignoreMissing) {
                err = new Error("template not found: " + name);
              }
              if (err) {
                if (cb) {
                  cb(err);
                  return;
                } else {
                  throw err;
                }
              }
              var newTmpl;
              if (!info) {
                newTmpl = new Template(noopTmplSrc, _this3, "", eagerCompile);
              } else {
                newTmpl = new Template(info.src, _this3, info.path, eagerCompile);
                if (!info.noCache) {
                  info.loader.cache[name] = newTmpl;
                }
              }
              if (cb) {
                cb(null, newTmpl);
              } else {
                syncResult = newTmpl;
              }
            };
            lib.asyncIter(this.loaders, function(loader3, i2, next, done) {
              function handle(err, src) {
                if (err) {
                  done(err);
                } else if (src) {
                  src.loader = loader3;
                  done(null, src);
                } else {
                  next();
                }
              }
              name = that.resolveTemplate(loader3, parentName, name);
              if (loader3.async) {
                loader3.getSource(name, handle);
              } else {
                handle(null, loader3.getSource(name));
              }
            }, createTemplate);
            return syncResult;
          };
          _proto.express = function express(app) {
            return expressApp(this, app);
          };
          _proto.render = function render2(name, ctx, cb) {
            if (lib.isFunction(ctx)) {
              cb = ctx;
              ctx = null;
            }
            var syncResult = null;
            this.getTemplate(name, function(err, tmpl) {
              if (err && cb) {
                callbackAsap(cb, err);
              } else if (err) {
                throw err;
              } else {
                syncResult = tmpl.render(ctx, cb);
              }
            });
            return syncResult;
          };
          _proto.renderString = function renderString(src, ctx, opts, cb) {
            if (lib.isFunction(opts)) {
              cb = opts;
              opts = {};
            }
            opts = opts || {};
            var tmpl = new Template(src, this, opts.path);
            return tmpl.render(ctx, cb);
          };
          _proto.waterfall = function waterfall(tasks, callback, forceAsync) {
            return _waterfall(tasks, callback, forceAsync);
          };
          return Environment2;
        }(EmitterObj);
        var Context = /* @__PURE__ */ function(_Obj) {
          _inheritsLoose(Context2, _Obj);
          function Context2() {
            return _Obj.apply(this, arguments) || this;
          }
          var _proto2 = Context2.prototype;
          _proto2.init = function init(ctx, blocks, env) {
            var _this4 = this;
            this.env = env || new Environment();
            this.ctx = lib.extend({}, ctx);
            this.blocks = {};
            this.exported = [];
            lib.keys(blocks).forEach(function(name) {
              _this4.addBlock(name, blocks[name]);
            });
          };
          _proto2.lookup = function lookup(name) {
            if (name in this.env.globals && !(name in this.ctx)) {
              return this.env.globals[name];
            } else {
              return this.ctx[name];
            }
          };
          _proto2.setVariable = function setVariable(name, val) {
            this.ctx[name] = val;
          };
          _proto2.getVariables = function getVariables() {
            return this.ctx;
          };
          _proto2.addBlock = function addBlock(name, block) {
            this.blocks[name] = this.blocks[name] || [];
            this.blocks[name].push(block);
            return this;
          };
          _proto2.getBlock = function getBlock(name) {
            if (!this.blocks[name]) {
              throw new Error('unknown block "' + name + '"');
            }
            return this.blocks[name][0];
          };
          _proto2.getSuper = function getSuper(env, name, block, frame, runtime, cb) {
            var idx = lib.indexOf(this.blocks[name] || [], block);
            var blk = this.blocks[name][idx + 1];
            var context = this;
            if (idx === -1 || !blk) {
              throw new Error('no super block available for "' + name + '"');
            }
            blk(env, context, frame, runtime, cb);
          };
          _proto2.addExport = function addExport(name) {
            this.exported.push(name);
          };
          _proto2.getExported = function getExported() {
            var _this5 = this;
            var exported = {};
            this.exported.forEach(function(name) {
              exported[name] = _this5.ctx[name];
            });
            return exported;
          };
          return Context2;
        }(Obj);
        var Template = /* @__PURE__ */ function(_Obj2) {
          _inheritsLoose(Template2, _Obj2);
          function Template2() {
            return _Obj2.apply(this, arguments) || this;
          }
          var _proto3 = Template2.prototype;
          _proto3.init = function init(src, env, path, eagerCompile) {
            this.env = env || new Environment();
            if (lib.isObject(src)) {
              switch (src.type) {
                case "code":
                  this.tmplProps = src.obj;
                  break;
                case "string":
                  this.tmplStr = src.obj;
                  break;
                default:
                  throw new Error("Unexpected template object type " + src.type + "; expected 'code', or 'string'");
              }
            } else if (lib.isString(src)) {
              this.tmplStr = src;
            } else {
              throw new Error("src must be a string or an object describing the source");
            }
            this.path = path;
            if (eagerCompile) {
              try {
                this._compile();
              } catch (err) {
                throw lib._prettifyError(this.path, this.env.opts.dev, err);
              }
            } else {
              this.compiled = false;
            }
          };
          _proto3.render = function render2(ctx, parentFrame, cb) {
            var _this6 = this;
            if (typeof ctx === "function") {
              cb = ctx;
              ctx = {};
            } else if (typeof parentFrame === "function") {
              cb = parentFrame;
              parentFrame = null;
            }
            var forceAsync = !parentFrame;
            try {
              this.compile();
            } catch (e) {
              var err = lib._prettifyError(this.path, this.env.opts.dev, e);
              if (cb) {
                return callbackAsap(cb, err);
              } else {
                throw err;
              }
            }
            var context = new Context(ctx || {}, this.blocks, this.env);
            var frame = parentFrame ? parentFrame.push(true) : new Frame();
            frame.topLevel = true;
            var syncResult = null;
            var didError = false;
            this.rootRenderFunc(this.env, context, frame, globalRuntime, function(err2, res) {
              if (didError && cb && typeof res !== "undefined") {
                return;
              }
              if (err2) {
                err2 = lib._prettifyError(_this6.path, _this6.env.opts.dev, err2);
                didError = true;
              }
              if (cb) {
                if (forceAsync) {
                  callbackAsap(cb, err2, res);
                } else {
                  cb(err2, res);
                }
              } else {
                if (err2) {
                  throw err2;
                }
                syncResult = res;
              }
            });
            return syncResult;
          };
          _proto3.getExported = function getExported(ctx, parentFrame, cb) {
            if (typeof ctx === "function") {
              cb = ctx;
              ctx = {};
            }
            if (typeof parentFrame === "function") {
              cb = parentFrame;
              parentFrame = null;
            }
            try {
              this.compile();
            } catch (e) {
              if (cb) {
                return cb(e);
              } else {
                throw e;
              }
            }
            var frame = parentFrame ? parentFrame.push() : new Frame();
            frame.topLevel = true;
            var context = new Context(ctx || {}, this.blocks, this.env);
            this.rootRenderFunc(this.env, context, frame, globalRuntime, function(err) {
              if (err) {
                cb(err, null);
              } else {
                cb(null, context.getExported());
              }
            });
          };
          _proto3.compile = function compile() {
            if (!this.compiled) {
              this._compile();
            }
          };
          _proto3._compile = function _compile() {
            var props;
            if (this.tmplProps) {
              props = this.tmplProps;
            } else {
              var source = compiler.compile(this.tmplStr, this.env.asyncFilters, this.env.extensionsList, this.path, this.env.opts);
              var func = new Function(source);
              props = func();
            }
            this.blocks = this._getBlocks(props);
            this.rootRenderFunc = props.root;
            this.compiled = true;
          };
          _proto3._getBlocks = function _getBlocks(props) {
            var blocks = {};
            lib.keys(props).forEach(function(k) {
              if (k.slice(0, 2) === "b_") {
                blocks[k.slice(2)] = props[k];
              }
            });
            return blocks;
          };
          return Template2;
        }(Obj);
        module2.exports = {
          Environment,
          Template
        };
      },
      function(module2, exports2, __webpack_require__) {
        function _inheritsLoose(subClass, superClass) {
          subClass.prototype = Object.create(superClass.prototype);
          subClass.prototype.constructor = subClass;
          _setPrototypeOf(subClass, superClass);
        }
        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
            o2.__proto__ = p2;
            return o2;
          };
          return _setPrototypeOf(o, p);
        }
        var lexer = __webpack_require__(9);
        var nodes = __webpack_require__(3);
        var Obj = __webpack_require__(1).Obj;
        var lib = __webpack_require__(0);
        var Parser = /* @__PURE__ */ function(_Obj) {
          _inheritsLoose(Parser2, _Obj);
          function Parser2() {
            return _Obj.apply(this, arguments) || this;
          }
          var _proto = Parser2.prototype;
          _proto.init = function init(tokens) {
            this.tokens = tokens;
            this.peeked = null;
            this.breakOnBlocks = null;
            this.dropLeadingWhitespace = false;
            this.extensions = [];
          };
          _proto.nextToken = function nextToken(withWhitespace) {
            var tok;
            if (this.peeked) {
              if (!withWhitespace && this.peeked.type === lexer.TOKEN_WHITESPACE) {
                this.peeked = null;
              } else {
                tok = this.peeked;
                this.peeked = null;
                return tok;
              }
            }
            tok = this.tokens.nextToken();
            if (!withWhitespace) {
              while (tok && tok.type === lexer.TOKEN_WHITESPACE) {
                tok = this.tokens.nextToken();
              }
            }
            return tok;
          };
          _proto.peekToken = function peekToken() {
            this.peeked = this.peeked || this.nextToken();
            return this.peeked;
          };
          _proto.pushToken = function pushToken(tok) {
            if (this.peeked) {
              throw new Error("pushToken: can only push one token on between reads");
            }
            this.peeked = tok;
          };
          _proto.error = function error(msg, lineno, colno) {
            if (lineno === void 0 || colno === void 0) {
              var tok = this.peekToken() || {};
              lineno = tok.lineno;
              colno = tok.colno;
            }
            if (lineno !== void 0) {
              lineno += 1;
            }
            if (colno !== void 0) {
              colno += 1;
            }
            return new lib.TemplateError(msg, lineno, colno);
          };
          _proto.fail = function fail(msg, lineno, colno) {
            throw this.error(msg, lineno, colno);
          };
          _proto.skip = function skip(type2) {
            var tok = this.nextToken();
            if (!tok || tok.type !== type2) {
              this.pushToken(tok);
              return false;
            }
            return true;
          };
          _proto.expect = function expect(type2) {
            var tok = this.nextToken();
            if (tok.type !== type2) {
              this.fail("expected " + type2 + ", got " + tok.type, tok.lineno, tok.colno);
            }
            return tok;
          };
          _proto.skipValue = function skipValue(type2, val) {
            var tok = this.nextToken();
            if (!tok || tok.type !== type2 || tok.value !== val) {
              this.pushToken(tok);
              return false;
            }
            return true;
          };
          _proto.skipSymbol = function skipSymbol(val) {
            return this.skipValue(lexer.TOKEN_SYMBOL, val);
          };
          _proto.advanceAfterBlockEnd = function advanceAfterBlockEnd(name) {
            var tok;
            if (!name) {
              tok = this.peekToken();
              if (!tok) {
                this.fail("unexpected end of file");
              }
              if (tok.type !== lexer.TOKEN_SYMBOL) {
                this.fail("advanceAfterBlockEnd: expected symbol token or explicit name to be passed");
              }
              name = this.nextToken().value;
            }
            tok = this.nextToken();
            if (tok && tok.type === lexer.TOKEN_BLOCK_END) {
              if (tok.value.charAt(0) === "-") {
                this.dropLeadingWhitespace = true;
              }
            } else {
              this.fail("expected block end in " + name + " statement");
            }
            return tok;
          };
          _proto.advanceAfterVariableEnd = function advanceAfterVariableEnd() {
            var tok = this.nextToken();
            if (tok && tok.type === lexer.TOKEN_VARIABLE_END) {
              this.dropLeadingWhitespace = tok.value.charAt(tok.value.length - this.tokens.tags.VARIABLE_END.length - 1) === "-";
            } else {
              this.pushToken(tok);
              this.fail("expected variable end");
            }
          };
          _proto.parseFor = function parseFor() {
            var forTok = this.peekToken();
            var node;
            var endBlock;
            if (this.skipSymbol("for")) {
              node = new nodes.For(forTok.lineno, forTok.colno);
              endBlock = "endfor";
            } else if (this.skipSymbol("asyncEach")) {
              node = new nodes.AsyncEach(forTok.lineno, forTok.colno);
              endBlock = "endeach";
            } else if (this.skipSymbol("asyncAll")) {
              node = new nodes.AsyncAll(forTok.lineno, forTok.colno);
              endBlock = "endall";
            } else {
              this.fail("parseFor: expected for{Async}", forTok.lineno, forTok.colno);
            }
            node.name = this.parsePrimary();
            if (!(node.name instanceof nodes.Symbol)) {
              this.fail("parseFor: variable name expected for loop");
            }
            var type2 = this.peekToken().type;
            if (type2 === lexer.TOKEN_COMMA) {
              var key = node.name;
              node.name = new nodes.Array(key.lineno, key.colno);
              node.name.addChild(key);
              while (this.skip(lexer.TOKEN_COMMA)) {
                var prim = this.parsePrimary();
                node.name.addChild(prim);
              }
            }
            if (!this.skipSymbol("in")) {
              this.fail('parseFor: expected "in" keyword for loop', forTok.lineno, forTok.colno);
            }
            node.arr = this.parseExpression();
            this.advanceAfterBlockEnd(forTok.value);
            node.body = this.parseUntilBlocks(endBlock, "else");
            if (this.skipSymbol("else")) {
              this.advanceAfterBlockEnd("else");
              node.else_ = this.parseUntilBlocks(endBlock);
            }
            this.advanceAfterBlockEnd();
            return node;
          };
          _proto.parseMacro = function parseMacro() {
            var macroTok = this.peekToken();
            if (!this.skipSymbol("macro")) {
              this.fail("expected macro");
            }
            var name = this.parsePrimary(true);
            var args = this.parseSignature();
            var node = new nodes.Macro(macroTok.lineno, macroTok.colno, name, args);
            this.advanceAfterBlockEnd(macroTok.value);
            node.body = this.parseUntilBlocks("endmacro");
            this.advanceAfterBlockEnd();
            return node;
          };
          _proto.parseCall = function parseCall() {
            var callTok = this.peekToken();
            if (!this.skipSymbol("call")) {
              this.fail("expected call");
            }
            var callerArgs = this.parseSignature(true) || new nodes.NodeList();
            var macroCall = this.parsePrimary();
            this.advanceAfterBlockEnd(callTok.value);
            var body = this.parseUntilBlocks("endcall");
            this.advanceAfterBlockEnd();
            var callerName = new nodes.Symbol(callTok.lineno, callTok.colno, "caller");
            var callerNode = new nodes.Caller(callTok.lineno, callTok.colno, callerName, callerArgs, body);
            var args = macroCall.args.children;
            if (!(args[args.length - 1] instanceof nodes.KeywordArgs)) {
              args.push(new nodes.KeywordArgs());
            }
            var kwargs = args[args.length - 1];
            kwargs.addChild(new nodes.Pair(callTok.lineno, callTok.colno, callerName, callerNode));
            return new nodes.Output(callTok.lineno, callTok.colno, [macroCall]);
          };
          _proto.parseWithContext = function parseWithContext() {
            var tok = this.peekToken();
            var withContext = null;
            if (this.skipSymbol("with")) {
              withContext = true;
            } else if (this.skipSymbol("without")) {
              withContext = false;
            }
            if (withContext !== null) {
              if (!this.skipSymbol("context")) {
                this.fail("parseFrom: expected context after with/without", tok.lineno, tok.colno);
              }
            }
            return withContext;
          };
          _proto.parseImport = function parseImport() {
            var importTok = this.peekToken();
            if (!this.skipSymbol("import")) {
              this.fail("parseImport: expected import", importTok.lineno, importTok.colno);
            }
            var template = this.parseExpression();
            if (!this.skipSymbol("as")) {
              this.fail('parseImport: expected "as" keyword', importTok.lineno, importTok.colno);
            }
            var target = this.parseExpression();
            var withContext = this.parseWithContext();
            var node = new nodes.Import(importTok.lineno, importTok.colno, template, target, withContext);
            this.advanceAfterBlockEnd(importTok.value);
            return node;
          };
          _proto.parseFrom = function parseFrom() {
            var fromTok = this.peekToken();
            if (!this.skipSymbol("from")) {
              this.fail("parseFrom: expected from");
            }
            var template = this.parseExpression();
            if (!this.skipSymbol("import")) {
              this.fail("parseFrom: expected import", fromTok.lineno, fromTok.colno);
            }
            var names = new nodes.NodeList();
            var withContext;
            while (1) {
              var nextTok = this.peekToken();
              if (nextTok.type === lexer.TOKEN_BLOCK_END) {
                if (!names.children.length) {
                  this.fail("parseFrom: Expected at least one import name", fromTok.lineno, fromTok.colno);
                }
                if (nextTok.value.charAt(0) === "-") {
                  this.dropLeadingWhitespace = true;
                }
                this.nextToken();
                break;
              }
              if (names.children.length > 0 && !this.skip(lexer.TOKEN_COMMA)) {
                this.fail("parseFrom: expected comma", fromTok.lineno, fromTok.colno);
              }
              var name = this.parsePrimary();
              if (name.value.charAt(0) === "_") {
                this.fail("parseFrom: names starting with an underscore cannot be imported", name.lineno, name.colno);
              }
              if (this.skipSymbol("as")) {
                var alias = this.parsePrimary();
                names.addChild(new nodes.Pair(name.lineno, name.colno, name, alias));
              } else {
                names.addChild(name);
              }
              withContext = this.parseWithContext();
            }
            return new nodes.FromImport(fromTok.lineno, fromTok.colno, template, names, withContext);
          };
          _proto.parseBlock = function parseBlock() {
            var tag = this.peekToken();
            if (!this.skipSymbol("block")) {
              this.fail("parseBlock: expected block", tag.lineno, tag.colno);
            }
            var node = new nodes.Block(tag.lineno, tag.colno);
            node.name = this.parsePrimary();
            if (!(node.name instanceof nodes.Symbol)) {
              this.fail("parseBlock: variable name expected", tag.lineno, tag.colno);
            }
            this.advanceAfterBlockEnd(tag.value);
            node.body = this.parseUntilBlocks("endblock");
            this.skipSymbol("endblock");
            this.skipSymbol(node.name.value);
            var tok = this.peekToken();
            if (!tok) {
              this.fail("parseBlock: expected endblock, got end of file");
            }
            this.advanceAfterBlockEnd(tok.value);
            return node;
          };
          _proto.parseExtends = function parseExtends() {
            var tagName = "extends";
            var tag = this.peekToken();
            if (!this.skipSymbol(tagName)) {
              this.fail("parseTemplateRef: expected " + tagName);
            }
            var node = new nodes.Extends(tag.lineno, tag.colno);
            node.template = this.parseExpression();
            this.advanceAfterBlockEnd(tag.value);
            return node;
          };
          _proto.parseInclude = function parseInclude() {
            var tagName = "include";
            var tag = this.peekToken();
            if (!this.skipSymbol(tagName)) {
              this.fail("parseInclude: expected " + tagName);
            }
            var node = new nodes.Include(tag.lineno, tag.colno);
            node.template = this.parseExpression();
            if (this.skipSymbol("ignore") && this.skipSymbol("missing")) {
              node.ignoreMissing = true;
            }
            this.advanceAfterBlockEnd(tag.value);
            return node;
          };
          _proto.parseIf = function parseIf() {
            var tag = this.peekToken();
            var node;
            if (this.skipSymbol("if") || this.skipSymbol("elif") || this.skipSymbol("elseif")) {
              node = new nodes.If(tag.lineno, tag.colno);
            } else if (this.skipSymbol("ifAsync")) {
              node = new nodes.IfAsync(tag.lineno, tag.colno);
            } else {
              this.fail("parseIf: expected if, elif, or elseif", tag.lineno, tag.colno);
            }
            node.cond = this.parseExpression();
            this.advanceAfterBlockEnd(tag.value);
            node.body = this.parseUntilBlocks("elif", "elseif", "else", "endif");
            var tok = this.peekToken();
            switch (tok && tok.value) {
              case "elseif":
              case "elif":
                node.else_ = this.parseIf();
                break;
              case "else":
                this.advanceAfterBlockEnd();
                node.else_ = this.parseUntilBlocks("endif");
                this.advanceAfterBlockEnd();
                break;
              case "endif":
                node.else_ = null;
                this.advanceAfterBlockEnd();
                break;
              default:
                this.fail("parseIf: expected elif, else, or endif, got end of file");
            }
            return node;
          };
          _proto.parseSet = function parseSet() {
            var tag = this.peekToken();
            if (!this.skipSymbol("set")) {
              this.fail("parseSet: expected set", tag.lineno, tag.colno);
            }
            var node = new nodes.Set(tag.lineno, tag.colno, []);
            var target;
            while (target = this.parsePrimary()) {
              node.targets.push(target);
              if (!this.skip(lexer.TOKEN_COMMA)) {
                break;
              }
            }
            if (!this.skipValue(lexer.TOKEN_OPERATOR, "=")) {
              if (!this.skip(lexer.TOKEN_BLOCK_END)) {
                this.fail("parseSet: expected = or block end in set tag", tag.lineno, tag.colno);
              } else {
                node.body = new nodes.Capture(tag.lineno, tag.colno, this.parseUntilBlocks("endset"));
                node.value = null;
                this.advanceAfterBlockEnd();
              }
            } else {
              node.value = this.parseExpression();
              this.advanceAfterBlockEnd(tag.value);
            }
            return node;
          };
          _proto.parseSwitch = function parseSwitch() {
            var switchStart = "switch";
            var switchEnd = "endswitch";
            var caseStart = "case";
            var caseDefault = "default";
            var tag = this.peekToken();
            if (!this.skipSymbol(switchStart) && !this.skipSymbol(caseStart) && !this.skipSymbol(caseDefault)) {
              this.fail('parseSwitch: expected "switch," "case" or "default"', tag.lineno, tag.colno);
            }
            var expr = this.parseExpression();
            this.advanceAfterBlockEnd(switchStart);
            this.parseUntilBlocks(caseStart, caseDefault, switchEnd);
            var tok = this.peekToken();
            var cases = [];
            var defaultCase;
            do {
              this.skipSymbol(caseStart);
              var cond = this.parseExpression();
              this.advanceAfterBlockEnd(switchStart);
              var body = this.parseUntilBlocks(caseStart, caseDefault, switchEnd);
              cases.push(new nodes.Case(tok.line, tok.col, cond, body));
              tok = this.peekToken();
            } while (tok && tok.value === caseStart);
            switch (tok.value) {
              case caseDefault:
                this.advanceAfterBlockEnd();
                defaultCase = this.parseUntilBlocks(switchEnd);
                this.advanceAfterBlockEnd();
                break;
              case switchEnd:
                this.advanceAfterBlockEnd();
                break;
              default:
                this.fail('parseSwitch: expected "case," "default" or "endswitch," got EOF.');
            }
            return new nodes.Switch(tag.lineno, tag.colno, expr, cases, defaultCase);
          };
          _proto.parseStatement = function parseStatement() {
            var tok = this.peekToken();
            var node;
            if (tok.type !== lexer.TOKEN_SYMBOL) {
              this.fail("tag name expected", tok.lineno, tok.colno);
            }
            if (this.breakOnBlocks && lib.indexOf(this.breakOnBlocks, tok.value) !== -1) {
              return null;
            }
            switch (tok.value) {
              case "raw":
                return this.parseRaw();
              case "verbatim":
                return this.parseRaw("verbatim");
              case "if":
              case "ifAsync":
                return this.parseIf();
              case "for":
              case "asyncEach":
              case "asyncAll":
                return this.parseFor();
              case "block":
                return this.parseBlock();
              case "extends":
                return this.parseExtends();
              case "include":
                return this.parseInclude();
              case "set":
                return this.parseSet();
              case "macro":
                return this.parseMacro();
              case "call":
                return this.parseCall();
              case "import":
                return this.parseImport();
              case "from":
                return this.parseFrom();
              case "filter":
                return this.parseFilterStatement();
              case "switch":
                return this.parseSwitch();
              default:
                if (this.extensions.length) {
                  for (var i = 0; i < this.extensions.length; i++) {
                    var ext = this.extensions[i];
                    if (lib.indexOf(ext.tags || [], tok.value) !== -1) {
                      return ext.parse(this, nodes, lexer);
                    }
                  }
                }
                this.fail("unknown block tag: " + tok.value, tok.lineno, tok.colno);
            }
            return node;
          };
          _proto.parseRaw = function parseRaw(tagName) {
            tagName = tagName || "raw";
            var endTagName = "end" + tagName;
            var rawBlockRegex = new RegExp("([\\s\\S]*?){%\\s*(" + tagName + "|" + endTagName + ")\\s*(?=%})%}");
            var rawLevel = 1;
            var str2 = "";
            var matches = null;
            var begun = this.advanceAfterBlockEnd();
            while ((matches = this.tokens._extractRegex(rawBlockRegex)) && rawLevel > 0) {
              var all = matches[0];
              var pre = matches[1];
              var blockName = matches[2];
              if (blockName === tagName) {
                rawLevel += 1;
              } else if (blockName === endTagName) {
                rawLevel -= 1;
              }
              if (rawLevel === 0) {
                str2 += pre;
                this.tokens.backN(all.length - pre.length);
              } else {
                str2 += all;
              }
            }
            return new nodes.Output(begun.lineno, begun.colno, [new nodes.TemplateData(begun.lineno, begun.colno, str2)]);
          };
          _proto.parsePostfix = function parsePostfix(node) {
            var lookup;
            var tok = this.peekToken();
            while (tok) {
              if (tok.type === lexer.TOKEN_LEFT_PAREN) {
                node = new nodes.FunCall(tok.lineno, tok.colno, node, this.parseSignature());
              } else if (tok.type === lexer.TOKEN_LEFT_BRACKET) {
                lookup = this.parseAggregate();
                if (lookup.children.length > 1) {
                  this.fail("invalid index");
                }
                node = new nodes.LookupVal(tok.lineno, tok.colno, node, lookup.children[0]);
              } else if (tok.type === lexer.TOKEN_OPERATOR && tok.value === ".") {
                this.nextToken();
                var val = this.nextToken();
                if (val.type !== lexer.TOKEN_SYMBOL) {
                  this.fail("expected name as lookup value, got " + val.value, val.lineno, val.colno);
                }
                lookup = new nodes.Literal(val.lineno, val.colno, val.value);
                node = new nodes.LookupVal(tok.lineno, tok.colno, node, lookup);
              } else {
                break;
              }
              tok = this.peekToken();
            }
            return node;
          };
          _proto.parseExpression = function parseExpression() {
            var node = this.parseInlineIf();
            return node;
          };
          _proto.parseInlineIf = function parseInlineIf() {
            var node = this.parseOr();
            if (this.skipSymbol("if")) {
              var condNode = this.parseOr();
              var bodyNode = node;
              node = new nodes.InlineIf(node.lineno, node.colno);
              node.body = bodyNode;
              node.cond = condNode;
              if (this.skipSymbol("else")) {
                node.else_ = this.parseOr();
              } else {
                node.else_ = null;
              }
            }
            return node;
          };
          _proto.parseOr = function parseOr() {
            var node = this.parseAnd();
            while (this.skipSymbol("or")) {
              var node2 = this.parseAnd();
              node = new nodes.Or(node.lineno, node.colno, node, node2);
            }
            return node;
          };
          _proto.parseAnd = function parseAnd() {
            var node = this.parseNot();
            while (this.skipSymbol("and")) {
              var node2 = this.parseNot();
              node = new nodes.And(node.lineno, node.colno, node, node2);
            }
            return node;
          };
          _proto.parseNot = function parseNot() {
            var tok = this.peekToken();
            if (this.skipSymbol("not")) {
              return new nodes.Not(tok.lineno, tok.colno, this.parseNot());
            }
            return this.parseIn();
          };
          _proto.parseIn = function parseIn() {
            var node = this.parseIs();
            while (1) {
              var tok = this.nextToken();
              if (!tok) {
                break;
              }
              var invert = tok.type === lexer.TOKEN_SYMBOL && tok.value === "not";
              if (!invert) {
                this.pushToken(tok);
              }
              if (this.skipSymbol("in")) {
                var node2 = this.parseIs();
                node = new nodes.In(node.lineno, node.colno, node, node2);
                if (invert) {
                  node = new nodes.Not(node.lineno, node.colno, node);
                }
              } else {
                if (invert) {
                  this.pushToken(tok);
                }
                break;
              }
            }
            return node;
          };
          _proto.parseIs = function parseIs() {
            var node = this.parseCompare();
            if (this.skipSymbol("is")) {
              var not = this.skipSymbol("not");
              var node2 = this.parseCompare();
              node = new nodes.Is(node.lineno, node.colno, node, node2);
              if (not) {
                node = new nodes.Not(node.lineno, node.colno, node);
              }
            }
            return node;
          };
          _proto.parseCompare = function parseCompare() {
            var compareOps = ["==", "===", "!=", "!==", "<", ">", "<=", ">="];
            var expr = this.parseConcat();
            var ops = [];
            while (1) {
              var tok = this.nextToken();
              if (!tok) {
                break;
              } else if (compareOps.indexOf(tok.value) !== -1) {
                ops.push(new nodes.CompareOperand(tok.lineno, tok.colno, this.parseConcat(), tok.value));
              } else {
                this.pushToken(tok);
                break;
              }
            }
            if (ops.length) {
              return new nodes.Compare(ops[0].lineno, ops[0].colno, expr, ops);
            } else {
              return expr;
            }
          };
          _proto.parseConcat = function parseConcat() {
            var node = this.parseAdd();
            while (this.skipValue(lexer.TOKEN_TILDE, "~")) {
              var node2 = this.parseAdd();
              node = new nodes.Concat(node.lineno, node.colno, node, node2);
            }
            return node;
          };
          _proto.parseAdd = function parseAdd() {
            var node = this.parseSub();
            while (this.skipValue(lexer.TOKEN_OPERATOR, "+")) {
              var node2 = this.parseSub();
              node = new nodes.Add(node.lineno, node.colno, node, node2);
            }
            return node;
          };
          _proto.parseSub = function parseSub() {
            var node = this.parseMul();
            while (this.skipValue(lexer.TOKEN_OPERATOR, "-")) {
              var node2 = this.parseMul();
              node = new nodes.Sub(node.lineno, node.colno, node, node2);
            }
            return node;
          };
          _proto.parseMul = function parseMul() {
            var node = this.parseDiv();
            while (this.skipValue(lexer.TOKEN_OPERATOR, "*")) {
              var node2 = this.parseDiv();
              node = new nodes.Mul(node.lineno, node.colno, node, node2);
            }
            return node;
          };
          _proto.parseDiv = function parseDiv() {
            var node = this.parseFloorDiv();
            while (this.skipValue(lexer.TOKEN_OPERATOR, "/")) {
              var node2 = this.parseFloorDiv();
              node = new nodes.Div(node.lineno, node.colno, node, node2);
            }
            return node;
          };
          _proto.parseFloorDiv = function parseFloorDiv() {
            var node = this.parseMod();
            while (this.skipValue(lexer.TOKEN_OPERATOR, "//")) {
              var node2 = this.parseMod();
              node = new nodes.FloorDiv(node.lineno, node.colno, node, node2);
            }
            return node;
          };
          _proto.parseMod = function parseMod() {
            var node = this.parsePow();
            while (this.skipValue(lexer.TOKEN_OPERATOR, "%")) {
              var node2 = this.parsePow();
              node = new nodes.Mod(node.lineno, node.colno, node, node2);
            }
            return node;
          };
          _proto.parsePow = function parsePow() {
            var node = this.parseUnary();
            while (this.skipValue(lexer.TOKEN_OPERATOR, "**")) {
              var node2 = this.parseUnary();
              node = new nodes.Pow(node.lineno, node.colno, node, node2);
            }
            return node;
          };
          _proto.parseUnary = function parseUnary(noFilters) {
            var tok = this.peekToken();
            var node;
            if (this.skipValue(lexer.TOKEN_OPERATOR, "-")) {
              node = new nodes.Neg(tok.lineno, tok.colno, this.parseUnary(true));
            } else if (this.skipValue(lexer.TOKEN_OPERATOR, "+")) {
              node = new nodes.Pos(tok.lineno, tok.colno, this.parseUnary(true));
            } else {
              node = this.parsePrimary();
            }
            if (!noFilters) {
              node = this.parseFilter(node);
            }
            return node;
          };
          _proto.parsePrimary = function parsePrimary(noPostfix) {
            var tok = this.nextToken();
            var val;
            var node = null;
            if (!tok) {
              this.fail("expected expression, got end of file");
            } else if (tok.type === lexer.TOKEN_STRING) {
              val = tok.value;
            } else if (tok.type === lexer.TOKEN_INT) {
              val = parseInt(tok.value, 10);
            } else if (tok.type === lexer.TOKEN_FLOAT) {
              val = parseFloat(tok.value);
            } else if (tok.type === lexer.TOKEN_BOOLEAN) {
              if (tok.value === "true") {
                val = true;
              } else if (tok.value === "false") {
                val = false;
              } else {
                this.fail("invalid boolean: " + tok.value, tok.lineno, tok.colno);
              }
            } else if (tok.type === lexer.TOKEN_NONE) {
              val = null;
            } else if (tok.type === lexer.TOKEN_REGEX) {
              val = new RegExp(tok.value.body, tok.value.flags);
            }
            if (val !== void 0) {
              node = new nodes.Literal(tok.lineno, tok.colno, val);
            } else if (tok.type === lexer.TOKEN_SYMBOL) {
              node = new nodes.Symbol(tok.lineno, tok.colno, tok.value);
            } else {
              this.pushToken(tok);
              node = this.parseAggregate();
            }
            if (!noPostfix) {
              node = this.parsePostfix(node);
            }
            if (node) {
              return node;
            } else {
              throw this.error("unexpected token: " + tok.value, tok.lineno, tok.colno);
            }
          };
          _proto.parseFilterName = function parseFilterName() {
            var tok = this.expect(lexer.TOKEN_SYMBOL);
            var name = tok.value;
            while (this.skipValue(lexer.TOKEN_OPERATOR, ".")) {
              name += "." + this.expect(lexer.TOKEN_SYMBOL).value;
            }
            return new nodes.Symbol(tok.lineno, tok.colno, name);
          };
          _proto.parseFilterArgs = function parseFilterArgs(node) {
            if (this.peekToken().type === lexer.TOKEN_LEFT_PAREN) {
              var call = this.parsePostfix(node);
              return call.args.children;
            }
            return [];
          };
          _proto.parseFilter = function parseFilter(node) {
            while (this.skip(lexer.TOKEN_PIPE)) {
              var name = this.parseFilterName();
              node = new nodes.Filter(name.lineno, name.colno, name, new nodes.NodeList(name.lineno, name.colno, [node].concat(this.parseFilterArgs(node))));
            }
            return node;
          };
          _proto.parseFilterStatement = function parseFilterStatement() {
            var filterTok = this.peekToken();
            if (!this.skipSymbol("filter")) {
              this.fail("parseFilterStatement: expected filter");
            }
            var name = this.parseFilterName();
            var args = this.parseFilterArgs(name);
            this.advanceAfterBlockEnd(filterTok.value);
            var body = new nodes.Capture(name.lineno, name.colno, this.parseUntilBlocks("endfilter"));
            this.advanceAfterBlockEnd();
            var node = new nodes.Filter(name.lineno, name.colno, name, new nodes.NodeList(name.lineno, name.colno, [body].concat(args)));
            return new nodes.Output(name.lineno, name.colno, [node]);
          };
          _proto.parseAggregate = function parseAggregate() {
            var tok = this.nextToken();
            var node;
            switch (tok.type) {
              case lexer.TOKEN_LEFT_PAREN:
                node = new nodes.Group(tok.lineno, tok.colno);
                break;
              case lexer.TOKEN_LEFT_BRACKET:
                node = new nodes.Array(tok.lineno, tok.colno);
                break;
              case lexer.TOKEN_LEFT_CURLY:
                node = new nodes.Dict(tok.lineno, tok.colno);
                break;
              default:
                return null;
            }
            while (1) {
              var type2 = this.peekToken().type;
              if (type2 === lexer.TOKEN_RIGHT_PAREN || type2 === lexer.TOKEN_RIGHT_BRACKET || type2 === lexer.TOKEN_RIGHT_CURLY) {
                this.nextToken();
                break;
              }
              if (node.children.length > 0) {
                if (!this.skip(lexer.TOKEN_COMMA)) {
                  this.fail("parseAggregate: expected comma after expression", tok.lineno, tok.colno);
                }
              }
              if (node instanceof nodes.Dict) {
                var key = this.parsePrimary();
                if (!this.skip(lexer.TOKEN_COLON)) {
                  this.fail("parseAggregate: expected colon after dict key", tok.lineno, tok.colno);
                }
                var value = this.parseExpression();
                node.addChild(new nodes.Pair(key.lineno, key.colno, key, value));
              } else {
                var expr = this.parseExpression();
                node.addChild(expr);
              }
            }
            return node;
          };
          _proto.parseSignature = function parseSignature(tolerant, noParens) {
            var tok = this.peekToken();
            if (!noParens && tok.type !== lexer.TOKEN_LEFT_PAREN) {
              if (tolerant) {
                return null;
              } else {
                this.fail("expected arguments", tok.lineno, tok.colno);
              }
            }
            if (tok.type === lexer.TOKEN_LEFT_PAREN) {
              tok = this.nextToken();
            }
            var args = new nodes.NodeList(tok.lineno, tok.colno);
            var kwargs = new nodes.KeywordArgs(tok.lineno, tok.colno);
            var checkComma = false;
            while (1) {
              tok = this.peekToken();
              if (!noParens && tok.type === lexer.TOKEN_RIGHT_PAREN) {
                this.nextToken();
                break;
              } else if (noParens && tok.type === lexer.TOKEN_BLOCK_END) {
                break;
              }
              if (checkComma && !this.skip(lexer.TOKEN_COMMA)) {
                this.fail("parseSignature: expected comma after expression", tok.lineno, tok.colno);
              } else {
                var arg = this.parseExpression();
                if (this.skipValue(lexer.TOKEN_OPERATOR, "=")) {
                  kwargs.addChild(new nodes.Pair(arg.lineno, arg.colno, arg, this.parseExpression()));
                } else {
                  args.addChild(arg);
                }
              }
              checkComma = true;
            }
            if (kwargs.children.length) {
              args.addChild(kwargs);
            }
            return args;
          };
          _proto.parseUntilBlocks = function parseUntilBlocks() {
            var prev = this.breakOnBlocks;
            for (var _len = arguments.length, blockNames = new Array(_len), _key = 0; _key < _len; _key++) {
              blockNames[_key] = arguments[_key];
            }
            this.breakOnBlocks = blockNames;
            var ret = this.parse();
            this.breakOnBlocks = prev;
            return ret;
          };
          _proto.parseNodes = function parseNodes() {
            var tok;
            var buf = [];
            while (tok = this.nextToken()) {
              if (tok.type === lexer.TOKEN_DATA) {
                var data = tok.value;
                var nextToken = this.peekToken();
                var nextVal = nextToken && nextToken.value;
                if (this.dropLeadingWhitespace) {
                  data = data.replace(/^\s*/, "");
                  this.dropLeadingWhitespace = false;
                }
                if (nextToken && (nextToken.type === lexer.TOKEN_BLOCK_START && nextVal.charAt(nextVal.length - 1) === "-" || nextToken.type === lexer.TOKEN_VARIABLE_START && nextVal.charAt(this.tokens.tags.VARIABLE_START.length) === "-" || nextToken.type === lexer.TOKEN_COMMENT && nextVal.charAt(this.tokens.tags.COMMENT_START.length) === "-")) {
                  data = data.replace(/\s*$/, "");
                }
                buf.push(new nodes.Output(tok.lineno, tok.colno, [new nodes.TemplateData(tok.lineno, tok.colno, data)]));
              } else if (tok.type === lexer.TOKEN_BLOCK_START) {
                this.dropLeadingWhitespace = false;
                var n = this.parseStatement();
                if (!n) {
                  break;
                }
                buf.push(n);
              } else if (tok.type === lexer.TOKEN_VARIABLE_START) {
                var e = this.parseExpression();
                this.dropLeadingWhitespace = false;
                this.advanceAfterVariableEnd();
                buf.push(new nodes.Output(tok.lineno, tok.colno, [e]));
              } else if (tok.type === lexer.TOKEN_COMMENT) {
                this.dropLeadingWhitespace = tok.value.charAt(tok.value.length - this.tokens.tags.COMMENT_END.length - 1) === "-";
              } else {
                this.fail("Unexpected token at top-level: " + tok.type, tok.lineno, tok.colno);
              }
            }
            return buf;
          };
          _proto.parse = function parse() {
            return new nodes.NodeList(0, 0, this.parseNodes());
          };
          _proto.parseAsRoot = function parseAsRoot() {
            return new nodes.Root(0, 0, this.parseNodes());
          };
          return Parser2;
        }(Obj);
        module2.exports = {
          parse: function parse(src, extensions, opts) {
            var p = new Parser(lexer.lex(src, opts));
            if (extensions !== void 0) {
              p.extensions = extensions;
            }
            return p.parseAsRoot();
          },
          Parser
        };
      },
      function(module2, exports2, __webpack_require__) {
        var lib = __webpack_require__(0);
        var whitespaceChars = " \n	\r\xA0";
        var delimChars = "()[]{}%*-+~/#,:|.<>=!";
        var intChars = "0123456789";
        var BLOCK_START = "{%";
        var BLOCK_END = "%}";
        var VARIABLE_START = "{{";
        var VARIABLE_END = "}}";
        var COMMENT_START = "{#";
        var COMMENT_END = "#}";
        var TOKEN_STRING = "string";
        var TOKEN_WHITESPACE = "whitespace";
        var TOKEN_DATA = "data";
        var TOKEN_BLOCK_START = "block-start";
        var TOKEN_BLOCK_END = "block-end";
        var TOKEN_VARIABLE_START = "variable-start";
        var TOKEN_VARIABLE_END = "variable-end";
        var TOKEN_COMMENT = "comment";
        var TOKEN_LEFT_PAREN = "left-paren";
        var TOKEN_RIGHT_PAREN = "right-paren";
        var TOKEN_LEFT_BRACKET = "left-bracket";
        var TOKEN_RIGHT_BRACKET = "right-bracket";
        var TOKEN_LEFT_CURLY = "left-curly";
        var TOKEN_RIGHT_CURLY = "right-curly";
        var TOKEN_OPERATOR = "operator";
        var TOKEN_COMMA = "comma";
        var TOKEN_COLON = "colon";
        var TOKEN_TILDE = "tilde";
        var TOKEN_PIPE = "pipe";
        var TOKEN_INT = "int";
        var TOKEN_FLOAT = "float";
        var TOKEN_BOOLEAN = "boolean";
        var TOKEN_NONE = "none";
        var TOKEN_SYMBOL = "symbol";
        var TOKEN_SPECIAL = "special";
        var TOKEN_REGEX = "regex";
        function token2(type2, value, lineno, colno) {
          return {
            type: type2,
            value,
            lineno,
            colno
          };
        }
        var Tokenizer = /* @__PURE__ */ function() {
          function Tokenizer2(str2, opts) {
            this.str = str2;
            this.index = 0;
            this.len = str2.length;
            this.lineno = 0;
            this.colno = 0;
            this.in_code = false;
            opts = opts || {};
            var tags = opts.tags || {};
            this.tags = {
              BLOCK_START: tags.blockStart || BLOCK_START,
              BLOCK_END: tags.blockEnd || BLOCK_END,
              VARIABLE_START: tags.variableStart || VARIABLE_START,
              VARIABLE_END: tags.variableEnd || VARIABLE_END,
              COMMENT_START: tags.commentStart || COMMENT_START,
              COMMENT_END: tags.commentEnd || COMMENT_END
            };
            this.trimBlocks = !!opts.trimBlocks;
            this.lstripBlocks = !!opts.lstripBlocks;
          }
          var _proto = Tokenizer2.prototype;
          _proto.nextToken = function nextToken() {
            var lineno = this.lineno;
            var colno = this.colno;
            var tok;
            if (this.in_code) {
              var cur = this.current();
              if (this.isFinished()) {
                return null;
              } else if (cur === '"' || cur === "'") {
                return token2(TOKEN_STRING, this._parseString(cur), lineno, colno);
              } else if (tok = this._extract(whitespaceChars)) {
                return token2(TOKEN_WHITESPACE, tok, lineno, colno);
              } else if ((tok = this._extractString(this.tags.BLOCK_END)) || (tok = this._extractString("-" + this.tags.BLOCK_END))) {
                this.in_code = false;
                if (this.trimBlocks) {
                  cur = this.current();
                  if (cur === "\n") {
                    this.forward();
                  } else if (cur === "\r") {
                    this.forward();
                    cur = this.current();
                    if (cur === "\n") {
                      this.forward();
                    } else {
                      this.back();
                    }
                  }
                }
                return token2(TOKEN_BLOCK_END, tok, lineno, colno);
              } else if ((tok = this._extractString(this.tags.VARIABLE_END)) || (tok = this._extractString("-" + this.tags.VARIABLE_END))) {
                this.in_code = false;
                return token2(TOKEN_VARIABLE_END, tok, lineno, colno);
              } else if (cur === "r" && this.str.charAt(this.index + 1) === "/") {
                this.forwardN(2);
                var regexBody = "";
                while (!this.isFinished()) {
                  if (this.current() === "/" && this.previous() !== "\\") {
                    this.forward();
                    break;
                  } else {
                    regexBody += this.current();
                    this.forward();
                  }
                }
                var POSSIBLE_FLAGS = ["g", "i", "m", "y"];
                var regexFlags = "";
                while (!this.isFinished()) {
                  var isCurrentAFlag = POSSIBLE_FLAGS.indexOf(this.current()) !== -1;
                  if (isCurrentAFlag) {
                    regexFlags += this.current();
                    this.forward();
                  } else {
                    break;
                  }
                }
                return token2(TOKEN_REGEX, {
                  body: regexBody,
                  flags: regexFlags
                }, lineno, colno);
              } else if (delimChars.indexOf(cur) !== -1) {
                this.forward();
                var complexOps = ["==", "===", "!=", "!==", "<=", ">=", "//", "**"];
                var curComplex = cur + this.current();
                var type2;
                if (lib.indexOf(complexOps, curComplex) !== -1) {
                  this.forward();
                  cur = curComplex;
                  if (lib.indexOf(complexOps, curComplex + this.current()) !== -1) {
                    cur = curComplex + this.current();
                    this.forward();
                  }
                }
                switch (cur) {
                  case "(":
                    type2 = TOKEN_LEFT_PAREN;
                    break;
                  case ")":
                    type2 = TOKEN_RIGHT_PAREN;
                    break;
                  case "[":
                    type2 = TOKEN_LEFT_BRACKET;
                    break;
                  case "]":
                    type2 = TOKEN_RIGHT_BRACKET;
                    break;
                  case "{":
                    type2 = TOKEN_LEFT_CURLY;
                    break;
                  case "}":
                    type2 = TOKEN_RIGHT_CURLY;
                    break;
                  case ",":
                    type2 = TOKEN_COMMA;
                    break;
                  case ":":
                    type2 = TOKEN_COLON;
                    break;
                  case "~":
                    type2 = TOKEN_TILDE;
                    break;
                  case "|":
                    type2 = TOKEN_PIPE;
                    break;
                  default:
                    type2 = TOKEN_OPERATOR;
                }
                return token2(type2, cur, lineno, colno);
              } else {
                tok = this._extractUntil(whitespaceChars + delimChars);
                if (tok.match(/^[-+]?[0-9]+$/)) {
                  if (this.current() === ".") {
                    this.forward();
                    var dec = this._extract(intChars);
                    return token2(TOKEN_FLOAT, tok + "." + dec, lineno, colno);
                  } else {
                    return token2(TOKEN_INT, tok, lineno, colno);
                  }
                } else if (tok.match(/^(true|false)$/)) {
                  return token2(TOKEN_BOOLEAN, tok, lineno, colno);
                } else if (tok === "none") {
                  return token2(TOKEN_NONE, tok, lineno, colno);
                } else if (tok === "null") {
                  return token2(TOKEN_NONE, tok, lineno, colno);
                } else if (tok) {
                  return token2(TOKEN_SYMBOL, tok, lineno, colno);
                } else {
                  throw new Error("Unexpected value while parsing: " + tok);
                }
              }
            } else {
              var beginChars = this.tags.BLOCK_START.charAt(0) + this.tags.VARIABLE_START.charAt(0) + this.tags.COMMENT_START.charAt(0) + this.tags.COMMENT_END.charAt(0);
              if (this.isFinished()) {
                return null;
              } else if ((tok = this._extractString(this.tags.BLOCK_START + "-")) || (tok = this._extractString(this.tags.BLOCK_START))) {
                this.in_code = true;
                return token2(TOKEN_BLOCK_START, tok, lineno, colno);
              } else if ((tok = this._extractString(this.tags.VARIABLE_START + "-")) || (tok = this._extractString(this.tags.VARIABLE_START))) {
                this.in_code = true;
                return token2(TOKEN_VARIABLE_START, tok, lineno, colno);
              } else {
                tok = "";
                var data;
                var inComment = false;
                if (this._matches(this.tags.COMMENT_START)) {
                  inComment = true;
                  tok = this._extractString(this.tags.COMMENT_START);
                }
                while ((data = this._extractUntil(beginChars)) !== null) {
                  tok += data;
                  if ((this._matches(this.tags.BLOCK_START) || this._matches(this.tags.VARIABLE_START) || this._matches(this.tags.COMMENT_START)) && !inComment) {
                    if (this.lstripBlocks && this._matches(this.tags.BLOCK_START) && this.colno > 0 && this.colno <= tok.length) {
                      var lastLine = tok.slice(-this.colno);
                      if (/^\s+$/.test(lastLine)) {
                        tok = tok.slice(0, -this.colno);
                        if (!tok.length) {
                          return this.nextToken();
                        }
                      }
                    }
                    break;
                  } else if (this._matches(this.tags.COMMENT_END)) {
                    if (!inComment) {
                      throw new Error("unexpected end of comment");
                    }
                    tok += this._extractString(this.tags.COMMENT_END);
                    break;
                  } else {
                    tok += this.current();
                    this.forward();
                  }
                }
                if (data === null && inComment) {
                  throw new Error("expected end of comment, got end of file");
                }
                return token2(inComment ? TOKEN_COMMENT : TOKEN_DATA, tok, lineno, colno);
              }
            }
          };
          _proto._parseString = function _parseString(delimiter) {
            this.forward();
            var str2 = "";
            while (!this.isFinished() && this.current() !== delimiter) {
              var cur = this.current();
              if (cur === "\\") {
                this.forward();
                switch (this.current()) {
                  case "n":
                    str2 += "\n";
                    break;
                  case "t":
                    str2 += "	";
                    break;
                  case "r":
                    str2 += "\r";
                    break;
                  default:
                    str2 += this.current();
                }
                this.forward();
              } else {
                str2 += cur;
                this.forward();
              }
            }
            this.forward();
            return str2;
          };
          _proto._matches = function _matches(str2) {
            if (this.index + str2.length > this.len) {
              return null;
            }
            var m = this.str.slice(this.index, this.index + str2.length);
            return m === str2;
          };
          _proto._extractString = function _extractString(str2) {
            if (this._matches(str2)) {
              this.forwardN(str2.length);
              return str2;
            }
            return null;
          };
          _proto._extractUntil = function _extractUntil(charString) {
            return this._extractMatching(true, charString || "");
          };
          _proto._extract = function _extract(charString) {
            return this._extractMatching(false, charString);
          };
          _proto._extractMatching = function _extractMatching(breakOnMatch, charString) {
            if (this.isFinished()) {
              return null;
            }
            var first = charString.indexOf(this.current());
            if (breakOnMatch && first === -1 || !breakOnMatch && first !== -1) {
              var t = this.current();
              this.forward();
              var idx = charString.indexOf(this.current());
              while ((breakOnMatch && idx === -1 || !breakOnMatch && idx !== -1) && !this.isFinished()) {
                t += this.current();
                this.forward();
                idx = charString.indexOf(this.current());
              }
              return t;
            }
            return "";
          };
          _proto._extractRegex = function _extractRegex(regex) {
            var matches = this.currentStr().match(regex);
            if (!matches) {
              return null;
            }
            this.forwardN(matches[0].length);
            return matches;
          };
          _proto.isFinished = function isFinished() {
            return this.index >= this.len;
          };
          _proto.forwardN = function forwardN(n) {
            for (var i = 0; i < n; i++) {
              this.forward();
            }
          };
          _proto.forward = function forward() {
            this.index++;
            if (this.previous() === "\n") {
              this.lineno++;
              this.colno = 0;
            } else {
              this.colno++;
            }
          };
          _proto.backN = function backN(n) {
            for (var i = 0; i < n; i++) {
              this.back();
            }
          };
          _proto.back = function back() {
            this.index--;
            if (this.current() === "\n") {
              this.lineno--;
              var idx = this.src.lastIndexOf("\n", this.index - 1);
              if (idx === -1) {
                this.colno = this.index;
              } else {
                this.colno = this.index - idx;
              }
            } else {
              this.colno--;
            }
          };
          _proto.current = function current() {
            if (!this.isFinished()) {
              return this.str.charAt(this.index);
            }
            return "";
          };
          _proto.currentStr = function currentStr() {
            if (!this.isFinished()) {
              return this.str.substr(this.index);
            }
            return "";
          };
          _proto.previous = function previous() {
            return this.str.charAt(this.index - 1);
          };
          return Tokenizer2;
        }();
        module2.exports = {
          lex: function lex(src, opts) {
            return new Tokenizer(src, opts);
          },
          TOKEN_STRING,
          TOKEN_WHITESPACE,
          TOKEN_DATA,
          TOKEN_BLOCK_START,
          TOKEN_BLOCK_END,
          TOKEN_VARIABLE_START,
          TOKEN_VARIABLE_END,
          TOKEN_COMMENT,
          TOKEN_LEFT_PAREN,
          TOKEN_RIGHT_PAREN,
          TOKEN_LEFT_BRACKET,
          TOKEN_RIGHT_BRACKET,
          TOKEN_LEFT_CURLY,
          TOKEN_RIGHT_CURLY,
          TOKEN_OPERATOR,
          TOKEN_COMMA,
          TOKEN_COLON,
          TOKEN_TILDE,
          TOKEN_PIPE,
          TOKEN_INT,
          TOKEN_FLOAT,
          TOKEN_BOOLEAN,
          TOKEN_NONE,
          TOKEN_SYMBOL,
          TOKEN_SPECIAL,
          TOKEN_REGEX
        };
      },
      function(module2, exports2, __webpack_require__) {
        function _inheritsLoose(subClass, superClass) {
          subClass.prototype = Object.create(superClass.prototype);
          subClass.prototype.constructor = subClass;
          _setPrototypeOf(subClass, superClass);
        }
        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
            o2.__proto__ = p2;
            return o2;
          };
          return _setPrototypeOf(o, p);
        }
        var Loader = __webpack_require__(6);
        var _require = __webpack_require__(19), PrecompiledLoader = _require.PrecompiledLoader;
        var WebLoader = /* @__PURE__ */ function(_Loader) {
          _inheritsLoose(WebLoader2, _Loader);
          function WebLoader2(baseURL, opts) {
            var _this;
            _this = _Loader.call(this) || this;
            _this.baseURL = baseURL || ".";
            opts = opts || {};
            _this.useCache = !!opts.useCache;
            _this.async = !!opts.async;
            return _this;
          }
          var _proto = WebLoader2.prototype;
          _proto.resolve = function resolve2(from, to) {
            throw new Error("relative templates not support in the browser yet");
          };
          _proto.getSource = function getSource(name, cb) {
            var _this2 = this;
            var useCache = this.useCache;
            var result;
            this.fetch(this.baseURL + "/" + name, function(err, src) {
              if (err) {
                if (cb) {
                  cb(err.content);
                } else if (err.status === 404) {
                  result = null;
                } else {
                  throw err.content;
                }
              } else {
                result = {
                  src,
                  path: name,
                  noCache: !useCache
                };
                _this2.emit("load", name, result);
                if (cb) {
                  cb(null, result);
                }
              }
            });
            return result;
          };
          _proto.fetch = function fetch(url, cb) {
            if (typeof window === "undefined") {
              throw new Error("WebLoader can only by used in a browser");
            }
            var ajax = new XMLHttpRequest();
            var loading = true;
            ajax.onreadystatechange = function() {
              if (ajax.readyState === 4 && loading) {
                loading = false;
                if (ajax.status === 0 || ajax.status === 200) {
                  cb(null, ajax.responseText);
                } else {
                  cb({
                    status: ajax.status,
                    content: ajax.responseText
                  });
                }
              }
            };
            url += (url.indexOf("?") === -1 ? "?" : "&") + "s=" + new Date().getTime();
            ajax.open("GET", url, this.async);
            ajax.send();
          };
          return WebLoader2;
        }(Loader);
        module2.exports = {
          WebLoader,
          PrecompiledLoader
        };
      },
      function(module2, exports2, __webpack_require__) {
        var lib = __webpack_require__(0);
        var _require = __webpack_require__(7), Environment = _require.Environment, Template = _require.Template;
        var Loader = __webpack_require__(6);
        var loaders = __webpack_require__(10);
        var precompile = __webpack_require__(23);
        var compiler = __webpack_require__(5);
        var parser = __webpack_require__(8);
        var lexer = __webpack_require__(9);
        var runtime = __webpack_require__(2);
        var nodes = __webpack_require__(3);
        var installJinjaCompat = __webpack_require__(25);
        var e;
        function configure(templatesPath, opts) {
          opts = opts || {};
          if (lib.isObject(templatesPath)) {
            opts = templatesPath;
            templatesPath = null;
          }
          var TemplateLoader;
          if (loaders.FileSystemLoader) {
            TemplateLoader = new loaders.FileSystemLoader(templatesPath, {
              watch: opts.watch,
              noCache: opts.noCache
            });
          } else if (loaders.WebLoader) {
            TemplateLoader = new loaders.WebLoader(templatesPath, {
              useCache: opts.web && opts.web.useCache,
              async: opts.web && opts.web.async
            });
          }
          e = new Environment(TemplateLoader, opts);
          if (opts && opts.express) {
            e.express(opts.express);
          }
          return e;
        }
        module2.exports = {
          Environment,
          Template,
          Loader,
          FileSystemLoader: loaders.FileSystemLoader,
          NodeResolveLoader: loaders.NodeResolveLoader,
          PrecompiledLoader: loaders.PrecompiledLoader,
          WebLoader: loaders.WebLoader,
          compiler,
          parser,
          lexer,
          runtime,
          lib,
          nodes,
          installJinjaCompat,
          configure,
          reset: function reset() {
            e = void 0;
          },
          compile: function compile(src, env, path, eagerCompile) {
            if (!e) {
              configure();
            }
            return new Template(src, env, path, eagerCompile);
          },
          render: function render2(name, ctx, cb) {
            if (!e) {
              configure();
            }
            return e.render(name, ctx, cb);
          },
          renderString: function renderString(src, ctx, cb) {
            if (!e) {
              configure();
            }
            return e.renderString(src, ctx, cb);
          },
          precompile: precompile ? precompile.precompile : void 0,
          precompileString: precompile ? precompile.precompileString : void 0
        };
      },
      function(module2, exports2, __webpack_require__) {
        var rawAsap = __webpack_require__(13);
        var freeTasks = [];
        var pendingErrors = [];
        var requestErrorThrow = rawAsap.makeRequestCallFromTimer(throwFirstError);
        function throwFirstError() {
          if (pendingErrors.length) {
            throw pendingErrors.shift();
          }
        }
        module2.exports = asap;
        function asap(task) {
          var rawTask;
          if (freeTasks.length) {
            rawTask = freeTasks.pop();
          } else {
            rawTask = new RawTask();
          }
          rawTask.task = task;
          rawAsap(rawTask);
        }
        function RawTask() {
          this.task = null;
        }
        RawTask.prototype.call = function() {
          try {
            this.task.call();
          } catch (error) {
            if (asap.onerror) {
              asap.onerror(error);
            } else {
              pendingErrors.push(error);
              requestErrorThrow();
            }
          } finally {
            this.task = null;
            freeTasks[freeTasks.length] = this;
          }
        };
      },
      function(module2, exports2, __webpack_require__) {
        (function(global2) {
          module2.exports = rawAsap;
          function rawAsap(task) {
            if (!queue.length) {
              requestFlush();
            }
            queue[queue.length] = task;
          }
          var queue = [];
          var requestFlush;
          var index = 0;
          var capacity = 1024;
          function flush() {
            while (index < queue.length) {
              var currentIndex = index;
              index = index + 1;
              queue[currentIndex].call();
              if (index > capacity) {
                for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
                  queue[scan] = queue[scan + index];
                }
                queue.length -= index;
                index = 0;
              }
            }
            queue.length = 0;
            index = 0;
          }
          var scope = typeof global2 !== "undefined" ? global2 : self;
          var BrowserMutationObserver = scope.MutationObserver || scope.WebKitMutationObserver;
          if (typeof BrowserMutationObserver === "function") {
            requestFlush = makeRequestCallFromMutationObserver(flush);
          } else {
            requestFlush = makeRequestCallFromTimer(flush);
          }
          rawAsap.requestFlush = requestFlush;
          function makeRequestCallFromMutationObserver(callback) {
            var toggle = 1;
            var observer = new BrowserMutationObserver(callback);
            var node = document.createTextNode("");
            observer.observe(node, { characterData: true });
            return function requestCall() {
              toggle = -toggle;
              node.data = toggle;
            };
          }
          function makeRequestCallFromTimer(callback) {
            return function requestCall() {
              var timeoutHandle = setTimeout(handleTimer, 0);
              var intervalHandle = setInterval(handleTimer, 50);
              function handleTimer() {
                clearTimeout(timeoutHandle);
                clearInterval(intervalHandle);
                callback();
              }
            };
          }
          rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;
        }).call(exports2, __webpack_require__(14));
      },
      function(module2, exports2) {
        var g;
        g = function() {
          return this;
        }();
        try {
          g = g || Function("return this")() || (1, eval)("this");
        } catch (e) {
          if (typeof window === "object")
            g = window;
        }
        module2.exports = g;
      },
      function(module2, exports2, __webpack_require__) {
        var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
        (function(globals) {
          var executeSync = function() {
            var args = Array.prototype.slice.call(arguments);
            if (typeof args[0] === "function") {
              args[0].apply(null, args.splice(1));
            }
          };
          var executeAsync = function(fn) {
            if (typeof setImmediate === "function") {
              setImmediate(fn);
            } else if (typeof process !== "undefined" && process.nextTick) {
              process.nextTick(fn);
            } else {
              setTimeout(fn, 0);
            }
          };
          var makeIterator = function(tasks) {
            var makeCallback = function(index) {
              var fn = function() {
                if (tasks.length) {
                  tasks[index].apply(null, arguments);
                }
                return fn.next();
              };
              fn.next = function() {
                return index < tasks.length - 1 ? makeCallback(index + 1) : null;
              };
              return fn;
            };
            return makeCallback(0);
          };
          var _isArray = Array.isArray || function(maybeArray) {
            return Object.prototype.toString.call(maybeArray) === "[object Array]";
          };
          var waterfall = function(tasks, callback, forceAsync) {
            var nextTick = forceAsync ? executeAsync : executeSync;
            callback = callback || function() {
            };
            if (!_isArray(tasks)) {
              var err = new Error("First argument to waterfall must be an array of functions");
              return callback(err);
            }
            if (!tasks.length) {
              return callback();
            }
            var wrapIterator = function(iterator) {
              return function(err2) {
                if (err2) {
                  callback.apply(null, arguments);
                  callback = function() {
                  };
                } else {
                  var args = Array.prototype.slice.call(arguments, 1);
                  var next = iterator.next();
                  if (next) {
                    args.push(wrapIterator(next));
                  } else {
                    args.push(callback);
                  }
                  nextTick(function() {
                    iterator.apply(null, args);
                  });
                }
              };
            };
            wrapIterator(makeIterator(tasks))();
          };
          {
            !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
              return waterfall;
            }.apply(exports2, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module2.exports = __WEBPACK_AMD_DEFINE_RESULT__));
          }
        })();
      },
      function(module2, exports2, __webpack_require__) {
        var R = typeof Reflect === "object" ? Reflect : null;
        var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
          return Function.prototype.apply.call(target, receiver, args);
        };
        var ReflectOwnKeys;
        if (R && typeof R.ownKeys === "function") {
          ReflectOwnKeys = R.ownKeys;
        } else if (Object.getOwnPropertySymbols) {
          ReflectOwnKeys = function ReflectOwnKeys2(target) {
            return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
          };
        } else {
          ReflectOwnKeys = function ReflectOwnKeys2(target) {
            return Object.getOwnPropertyNames(target);
          };
        }
        function ProcessEmitWarning(warning) {
          if (console && console.warn)
            console.warn(warning);
        }
        var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
          return value !== value;
        };
        function EventEmitter() {
          EventEmitter.init.call(this);
        }
        module2.exports = EventEmitter;
        module2.exports.once = once;
        EventEmitter.EventEmitter = EventEmitter;
        EventEmitter.prototype._events = void 0;
        EventEmitter.prototype._eventsCount = 0;
        EventEmitter.prototype._maxListeners = void 0;
        var defaultMaxListeners = 10;
        function checkListener(listener) {
          if (typeof listener !== "function") {
            throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
          }
        }
        Object.defineProperty(EventEmitter, "defaultMaxListeners", {
          enumerable: true,
          get: function() {
            return defaultMaxListeners;
          },
          set: function(arg) {
            if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
              throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
            }
            defaultMaxListeners = arg;
          }
        });
        EventEmitter.init = function() {
          if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
            this._events = /* @__PURE__ */ Object.create(null);
            this._eventsCount = 0;
          }
          this._maxListeners = this._maxListeners || void 0;
        };
        EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
          if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
            throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
          }
          this._maxListeners = n;
          return this;
        };
        function _getMaxListeners(that) {
          if (that._maxListeners === void 0)
            return EventEmitter.defaultMaxListeners;
          return that._maxListeners;
        }
        EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
          return _getMaxListeners(this);
        };
        EventEmitter.prototype.emit = function emit2(type2) {
          var args = [];
          for (var i = 1; i < arguments.length; i++)
            args.push(arguments[i]);
          var doError = type2 === "error";
          var events = this._events;
          if (events !== void 0)
            doError = doError && events.error === void 0;
          else if (!doError)
            return false;
          if (doError) {
            var er;
            if (args.length > 0)
              er = args[0];
            if (er instanceof Error) {
              throw er;
            }
            var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
            err.context = er;
            throw err;
          }
          var handler = events[type2];
          if (handler === void 0)
            return false;
          if (typeof handler === "function") {
            ReflectApply(handler, this, args);
          } else {
            var len = handler.length;
            var listeners = arrayClone(handler, len);
            for (var i = 0; i < len; ++i)
              ReflectApply(listeners[i], this, args);
          }
          return true;
        };
        function _addListener(target, type2, listener, prepend) {
          var m;
          var events;
          var existing;
          checkListener(listener);
          events = target._events;
          if (events === void 0) {
            events = target._events = /* @__PURE__ */ Object.create(null);
            target._eventsCount = 0;
          } else {
            if (events.newListener !== void 0) {
              target.emit("newListener", type2, listener.listener ? listener.listener : listener);
              events = target._events;
            }
            existing = events[type2];
          }
          if (existing === void 0) {
            existing = events[type2] = listener;
            ++target._eventsCount;
          } else {
            if (typeof existing === "function") {
              existing = events[type2] = prepend ? [listener, existing] : [existing, listener];
            } else if (prepend) {
              existing.unshift(listener);
            } else {
              existing.push(listener);
            }
            m = _getMaxListeners(target);
            if (m > 0 && existing.length > m && !existing.warned) {
              existing.warned = true;
              var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type2) + " listeners added. Use emitter.setMaxListeners() to increase limit");
              w.name = "MaxListenersExceededWarning";
              w.emitter = target;
              w.type = type2;
              w.count = existing.length;
              ProcessEmitWarning(w);
            }
          }
          return target;
        }
        EventEmitter.prototype.addListener = function addListener(type2, listener) {
          return _addListener(this, type2, listener, false);
        };
        EventEmitter.prototype.on = EventEmitter.prototype.addListener;
        EventEmitter.prototype.prependListener = function prependListener(type2, listener) {
          return _addListener(this, type2, listener, true);
        };
        function onceWrapper() {
          if (!this.fired) {
            this.target.removeListener(this.type, this.wrapFn);
            this.fired = true;
            if (arguments.length === 0)
              return this.listener.call(this.target);
            return this.listener.apply(this.target, arguments);
          }
        }
        function _onceWrap(target, type2, listener) {
          var state = { fired: false, wrapFn: void 0, target, type: type2, listener };
          var wrapped = onceWrapper.bind(state);
          wrapped.listener = listener;
          state.wrapFn = wrapped;
          return wrapped;
        }
        EventEmitter.prototype.once = function once2(type2, listener) {
          checkListener(listener);
          this.on(type2, _onceWrap(this, type2, listener));
          return this;
        };
        EventEmitter.prototype.prependOnceListener = function prependOnceListener(type2, listener) {
          checkListener(listener);
          this.prependListener(type2, _onceWrap(this, type2, listener));
          return this;
        };
        EventEmitter.prototype.removeListener = function removeListener(type2, listener) {
          var list, events, position, i, originalListener;
          checkListener(listener);
          events = this._events;
          if (events === void 0)
            return this;
          list = events[type2];
          if (list === void 0)
            return this;
          if (list === listener || list.listener === listener) {
            if (--this._eventsCount === 0)
              this._events = /* @__PURE__ */ Object.create(null);
            else {
              delete events[type2];
              if (events.removeListener)
                this.emit("removeListener", type2, list.listener || listener);
            }
          } else if (typeof list !== "function") {
            position = -1;
            for (i = list.length - 1; i >= 0; i--) {
              if (list[i] === listener || list[i].listener === listener) {
                originalListener = list[i].listener;
                position = i;
                break;
              }
            }
            if (position < 0)
              return this;
            if (position === 0)
              list.shift();
            else {
              spliceOne(list, position);
            }
            if (list.length === 1)
              events[type2] = list[0];
            if (events.removeListener !== void 0)
              this.emit("removeListener", type2, originalListener || listener);
          }
          return this;
        };
        EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
        EventEmitter.prototype.removeAllListeners = function removeAllListeners(type2) {
          var listeners, events, i;
          events = this._events;
          if (events === void 0)
            return this;
          if (events.removeListener === void 0) {
            if (arguments.length === 0) {
              this._events = /* @__PURE__ */ Object.create(null);
              this._eventsCount = 0;
            } else if (events[type2] !== void 0) {
              if (--this._eventsCount === 0)
                this._events = /* @__PURE__ */ Object.create(null);
              else
                delete events[type2];
            }
            return this;
          }
          if (arguments.length === 0) {
            var keys = Object.keys(events);
            var key;
            for (i = 0; i < keys.length; ++i) {
              key = keys[i];
              if (key === "removeListener")
                continue;
              this.removeAllListeners(key);
            }
            this.removeAllListeners("removeListener");
            this._events = /* @__PURE__ */ Object.create(null);
            this._eventsCount = 0;
            return this;
          }
          listeners = events[type2];
          if (typeof listeners === "function") {
            this.removeListener(type2, listeners);
          } else if (listeners !== void 0) {
            for (i = listeners.length - 1; i >= 0; i--) {
              this.removeListener(type2, listeners[i]);
            }
          }
          return this;
        };
        function _listeners(target, type2, unwrap) {
          var events = target._events;
          if (events === void 0)
            return [];
          var evlistener = events[type2];
          if (evlistener === void 0)
            return [];
          if (typeof evlistener === "function")
            return unwrap ? [evlistener.listener || evlistener] : [evlistener];
          return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
        }
        EventEmitter.prototype.listeners = function listeners(type2) {
          return _listeners(this, type2, true);
        };
        EventEmitter.prototype.rawListeners = function rawListeners(type2) {
          return _listeners(this, type2, false);
        };
        EventEmitter.listenerCount = function(emitter, type2) {
          if (typeof emitter.listenerCount === "function") {
            return emitter.listenerCount(type2);
          } else {
            return listenerCount.call(emitter, type2);
          }
        };
        EventEmitter.prototype.listenerCount = listenerCount;
        function listenerCount(type2) {
          var events = this._events;
          if (events !== void 0) {
            var evlistener = events[type2];
            if (typeof evlistener === "function") {
              return 1;
            } else if (evlistener !== void 0) {
              return evlistener.length;
            }
          }
          return 0;
        }
        EventEmitter.prototype.eventNames = function eventNames() {
          return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
        };
        function arrayClone(arr, n) {
          var copy = new Array(n);
          for (var i = 0; i < n; ++i)
            copy[i] = arr[i];
          return copy;
        }
        function spliceOne(list, index) {
          for (; index + 1 < list.length; index++)
            list[index] = list[index + 1];
          list.pop();
        }
        function unwrapListeners(arr) {
          var ret = new Array(arr.length);
          for (var i = 0; i < ret.length; ++i) {
            ret[i] = arr[i].listener || arr[i];
          }
          return ret;
        }
        function once(emitter, name) {
          return new Promise(function(resolve2, reject) {
            function eventListener() {
              if (errorListener !== void 0) {
                emitter.removeListener("error", errorListener);
              }
              resolve2([].slice.call(arguments));
            }
            var errorListener;
            if (name !== "error") {
              errorListener = function errorListener2(err) {
                emitter.removeListener(name, eventListener);
                reject(err);
              };
              emitter.once("error", errorListener);
            }
            emitter.once(name, eventListener);
          });
        }
      },
      function(module2, exports2, __webpack_require__) {
        var nodes = __webpack_require__(3);
        var lib = __webpack_require__(0);
        var sym = 0;
        function gensym() {
          return "hole_" + sym++;
        }
        function mapCOW(arr, func) {
          var res = null;
          for (var i = 0; i < arr.length; i++) {
            var item = func(arr[i]);
            if (item !== arr[i]) {
              if (!res) {
                res = arr.slice();
              }
              res[i] = item;
            }
          }
          return res || arr;
        }
        function walk(ast, func, depthFirst) {
          if (!(ast instanceof nodes.Node)) {
            return ast;
          }
          if (!depthFirst) {
            var astT = func(ast);
            if (astT && astT !== ast) {
              return astT;
            }
          }
          if (ast instanceof nodes.NodeList) {
            var children = mapCOW(ast.children, function(node) {
              return walk(node, func, depthFirst);
            });
            if (children !== ast.children) {
              ast = new nodes[ast.typename](ast.lineno, ast.colno, children);
            }
          } else if (ast instanceof nodes.CallExtension) {
            var args = walk(ast.args, func, depthFirst);
            var contentArgs = mapCOW(ast.contentArgs, function(node) {
              return walk(node, func, depthFirst);
            });
            if (args !== ast.args || contentArgs !== ast.contentArgs) {
              ast = new nodes[ast.typename](ast.extName, ast.prop, args, contentArgs);
            }
          } else {
            var props = ast.fields.map(function(field) {
              return ast[field];
            });
            var propsT = mapCOW(props, function(prop) {
              return walk(prop, func, depthFirst);
            });
            if (propsT !== props) {
              ast = new nodes[ast.typename](ast.lineno, ast.colno);
              propsT.forEach(function(prop, i) {
                ast[ast.fields[i]] = prop;
              });
            }
          }
          return depthFirst ? func(ast) || ast : ast;
        }
        function depthWalk(ast, func) {
          return walk(ast, func, true);
        }
        function _liftFilters(node, asyncFilters, prop) {
          var children = [];
          var walked = depthWalk(prop ? node[prop] : node, function(descNode) {
            var symbol;
            if (descNode instanceof nodes.Block) {
              return descNode;
            } else if (descNode instanceof nodes.Filter && lib.indexOf(asyncFilters, descNode.name.value) !== -1 || descNode instanceof nodes.CallExtensionAsync) {
              symbol = new nodes.Symbol(descNode.lineno, descNode.colno, gensym());
              children.push(new nodes.FilterAsync(descNode.lineno, descNode.colno, descNode.name, descNode.args, symbol));
            }
            return symbol;
          });
          if (prop) {
            node[prop] = walked;
          } else {
            node = walked;
          }
          if (children.length) {
            children.push(node);
            return new nodes.NodeList(node.lineno, node.colno, children);
          } else {
            return node;
          }
        }
        function liftFilters(ast, asyncFilters) {
          return depthWalk(ast, function(node) {
            if (node instanceof nodes.Output) {
              return _liftFilters(node, asyncFilters);
            } else if (node instanceof nodes.Set) {
              return _liftFilters(node, asyncFilters, "value");
            } else if (node instanceof nodes.For) {
              return _liftFilters(node, asyncFilters, "arr");
            } else if (node instanceof nodes.If) {
              return _liftFilters(node, asyncFilters, "cond");
            } else if (node instanceof nodes.CallExtension) {
              return _liftFilters(node, asyncFilters, "args");
            } else {
              return void 0;
            }
          });
        }
        function liftSuper(ast) {
          return walk(ast, function(blockNode) {
            if (!(blockNode instanceof nodes.Block)) {
              return;
            }
            var hasSuper = false;
            var symbol = gensym();
            blockNode.body = walk(blockNode.body, function(node) {
              if (node instanceof nodes.FunCall && node.name.value === "super") {
                hasSuper = true;
                return new nodes.Symbol(node.lineno, node.colno, symbol);
              }
            });
            if (hasSuper) {
              blockNode.body.children.unshift(new nodes.Super(0, 0, blockNode.name, new nodes.Symbol(0, 0, symbol)));
            }
          });
        }
        function convertStatements(ast) {
          return depthWalk(ast, function(node) {
            if (!(node instanceof nodes.If) && !(node instanceof nodes.For)) {
              return void 0;
            }
            var async = false;
            walk(node, function(child) {
              if (child instanceof nodes.FilterAsync || child instanceof nodes.IfAsync || child instanceof nodes.AsyncEach || child instanceof nodes.AsyncAll || child instanceof nodes.CallExtensionAsync) {
                async = true;
                return child;
              }
              return void 0;
            });
            if (async) {
              if (node instanceof nodes.If) {
                return new nodes.IfAsync(node.lineno, node.colno, node.cond, node.body, node.else_);
              } else if (node instanceof nodes.For && !(node instanceof nodes.AsyncAll)) {
                return new nodes.AsyncEach(node.lineno, node.colno, node.arr, node.name, node.body, node.else_);
              }
            }
            return void 0;
          });
        }
        function cps(ast, asyncFilters) {
          return convertStatements(liftSuper(liftFilters(ast, asyncFilters)));
        }
        function transform(ast, asyncFilters) {
          return cps(ast, asyncFilters || []);
        }
        module2.exports = {
          transform
        };
      },
      function(module2, exports2, __webpack_require__) {
        var lib = __webpack_require__(0);
        var r = __webpack_require__(2);
        var exports2 = module2.exports = {};
        function normalize(value, defaultValue) {
          if (value === null || value === void 0 || value === false) {
            return defaultValue;
          }
          return value;
        }
        exports2.abs = Math.abs;
        function isNaN2(num) {
          return num !== num;
        }
        function batch(arr, linecount, fillWith) {
          var i;
          var res = [];
          var tmp = [];
          for (i = 0; i < arr.length; i++) {
            if (i % linecount === 0 && tmp.length) {
              res.push(tmp);
              tmp = [];
            }
            tmp.push(arr[i]);
          }
          if (tmp.length) {
            if (fillWith) {
              for (i = tmp.length; i < linecount; i++) {
                tmp.push(fillWith);
              }
            }
            res.push(tmp);
          }
          return res;
        }
        exports2.batch = batch;
        function capitalize(str2) {
          str2 = normalize(str2, "");
          var ret = str2.toLowerCase();
          return r.copySafeness(str2, ret.charAt(0).toUpperCase() + ret.slice(1));
        }
        exports2.capitalize = capitalize;
        function center(str2, width) {
          str2 = normalize(str2, "");
          width = width || 80;
          if (str2.length >= width) {
            return str2;
          }
          var spaces = width - str2.length;
          var pre = lib.repeat(" ", spaces / 2 - spaces % 2);
          var post = lib.repeat(" ", spaces / 2);
          return r.copySafeness(str2, pre + str2 + post);
        }
        exports2.center = center;
        function default_(val, def, bool2) {
          if (bool2) {
            return val || def;
          } else {
            return val !== void 0 ? val : def;
          }
        }
        exports2["default"] = default_;
        function dictsort(val, caseSensitive, by) {
          if (!lib.isObject(val)) {
            throw new lib.TemplateError("dictsort filter: val must be an object");
          }
          var array = [];
          for (var k in val) {
            array.push([k, val[k]]);
          }
          var si;
          if (by === void 0 || by === "key") {
            si = 0;
          } else if (by === "value") {
            si = 1;
          } else {
            throw new lib.TemplateError("dictsort filter: You can only sort by either key or value");
          }
          array.sort(function(t1, t2) {
            var a = t1[si];
            var b = t2[si];
            if (!caseSensitive) {
              if (lib.isString(a)) {
                a = a.toUpperCase();
              }
              if (lib.isString(b)) {
                b = b.toUpperCase();
              }
            }
            return a > b ? 1 : a === b ? 0 : -1;
          });
          return array;
        }
        exports2.dictsort = dictsort;
        function dump2(obj, spaces) {
          return JSON.stringify(obj, null, spaces);
        }
        exports2.dump = dump2;
        function escape(str2) {
          if (str2 instanceof r.SafeString) {
            return str2;
          }
          str2 = str2 === null || str2 === void 0 ? "" : str2;
          return r.markSafe(lib.escape(str2.toString()));
        }
        exports2.escape = escape;
        function safe(str2) {
          if (str2 instanceof r.SafeString) {
            return str2;
          }
          str2 = str2 === null || str2 === void 0 ? "" : str2;
          return r.markSafe(str2.toString());
        }
        exports2.safe = safe;
        function first(arr) {
          return arr[0];
        }
        exports2.first = first;
        function forceescape(str2) {
          str2 = str2 === null || str2 === void 0 ? "" : str2;
          return r.markSafe(lib.escape(str2.toString()));
        }
        exports2.forceescape = forceescape;
        function groupby(arr, attr) {
          return lib.groupBy(arr, attr, this.env.opts.throwOnUndefined);
        }
        exports2.groupby = groupby;
        function indent(str2, width, indentfirst) {
          str2 = normalize(str2, "");
          if (str2 === "") {
            return "";
          }
          width = width || 4;
          var lines = str2.split("\n");
          var sp = lib.repeat(" ", width);
          var res = lines.map(function(l, i) {
            return i === 0 && !indentfirst ? l : "" + sp + l;
          }).join("\n");
          return r.copySafeness(str2, res);
        }
        exports2.indent = indent;
        function join(arr, del, attr) {
          del = del || "";
          if (attr) {
            arr = lib.map(arr, function(v) {
              return v[attr];
            });
          }
          return arr.join(del);
        }
        exports2.join = join;
        function last(arr) {
          return arr[arr.length - 1];
        }
        exports2.last = last;
        function lengthFilter(val) {
          var value = normalize(val, "");
          if (value !== void 0) {
            if (typeof Map === "function" && value instanceof Map || typeof Set === "function" && value instanceof Set) {
              return value.size;
            }
            if (lib.isObject(value) && !(value instanceof r.SafeString)) {
              return lib.keys(value).length;
            }
            return value.length;
          }
          return 0;
        }
        exports2.length = lengthFilter;
        function list(val) {
          if (lib.isString(val)) {
            return val.split("");
          } else if (lib.isObject(val)) {
            return lib._entries(val || {}).map(function(_ref) {
              var key = _ref[0], value = _ref[1];
              return {
                key,
                value
              };
            });
          } else if (lib.isArray(val)) {
            return val;
          } else {
            throw new lib.TemplateError("list filter: type not iterable");
          }
        }
        exports2.list = list;
        function lower(str2) {
          str2 = normalize(str2, "");
          return str2.toLowerCase();
        }
        exports2.lower = lower;
        function nl2br(str2) {
          if (str2 === null || str2 === void 0) {
            return "";
          }
          return r.copySafeness(str2, str2.replace(/\r\n|\n/g, "<br />\n"));
        }
        exports2.nl2br = nl2br;
        function random(arr) {
          return arr[Math.floor(Math.random() * arr.length)];
        }
        exports2.random = random;
        function getSelectOrReject(expectedTestResult) {
          function filter(arr, testName, secondArg) {
            if (testName === void 0) {
              testName = "truthy";
            }
            var context = this;
            var test = context.env.getTest(testName);
            return lib.toArray(arr).filter(function examineTestResult(item) {
              return test.call(context, item, secondArg) === expectedTestResult;
            });
          }
          return filter;
        }
        exports2.reject = getSelectOrReject(false);
        function rejectattr(arr, attr) {
          return arr.filter(function(item) {
            return !item[attr];
          });
        }
        exports2.rejectattr = rejectattr;
        exports2.select = getSelectOrReject(true);
        function selectattr(arr, attr) {
          return arr.filter(function(item) {
            return !!item[attr];
          });
        }
        exports2.selectattr = selectattr;
        function replace(str2, old, new_, maxCount) {
          var originalStr = str2;
          if (old instanceof RegExp) {
            return str2.replace(old, new_);
          }
          if (typeof maxCount === "undefined") {
            maxCount = -1;
          }
          var res = "";
          if (typeof old === "number") {
            old = "" + old;
          } else if (typeof old !== "string") {
            return str2;
          }
          if (typeof str2 === "number") {
            str2 = "" + str2;
          }
          if (typeof str2 !== "string" && !(str2 instanceof r.SafeString)) {
            return str2;
          }
          if (old === "") {
            res = new_ + str2.split("").join(new_) + new_;
            return r.copySafeness(str2, res);
          }
          var nextIndex = str2.indexOf(old);
          if (maxCount === 0 || nextIndex === -1) {
            return str2;
          }
          var pos = 0;
          var count = 0;
          while (nextIndex > -1 && (maxCount === -1 || count < maxCount)) {
            res += str2.substring(pos, nextIndex) + new_;
            pos = nextIndex + old.length;
            count++;
            nextIndex = str2.indexOf(old, pos);
          }
          if (pos < str2.length) {
            res += str2.substring(pos);
          }
          return r.copySafeness(originalStr, res);
        }
        exports2.replace = replace;
        function reverse(val) {
          var arr;
          if (lib.isString(val)) {
            arr = list(val);
          } else {
            arr = lib.map(val, function(v) {
              return v;
            });
          }
          arr.reverse();
          if (lib.isString(val)) {
            return r.copySafeness(val, arr.join(""));
          }
          return arr;
        }
        exports2.reverse = reverse;
        function round(val, precision, method) {
          precision = precision || 0;
          var factor = Math.pow(10, precision);
          var rounder;
          if (method === "ceil") {
            rounder = Math.ceil;
          } else if (method === "floor") {
            rounder = Math.floor;
          } else {
            rounder = Math.round;
          }
          return rounder(val * factor) / factor;
        }
        exports2.round = round;
        function slice(arr, slices, fillWith) {
          var sliceLength = Math.floor(arr.length / slices);
          var extra = arr.length % slices;
          var res = [];
          var offset = 0;
          for (var i = 0; i < slices; i++) {
            var start = offset + i * sliceLength;
            if (i < extra) {
              offset++;
            }
            var end = offset + (i + 1) * sliceLength;
            var currSlice = arr.slice(start, end);
            if (fillWith && i >= extra) {
              currSlice.push(fillWith);
            }
            res.push(currSlice);
          }
          return res;
        }
        exports2.slice = slice;
        function sum(arr, attr, start) {
          if (start === void 0) {
            start = 0;
          }
          if (attr) {
            arr = lib.map(arr, function(v) {
              return v[attr];
            });
          }
          return start + arr.reduce(function(a, b) {
            return a + b;
          }, 0);
        }
        exports2.sum = sum;
        exports2.sort = r.makeMacro(["value", "reverse", "case_sensitive", "attribute"], [], function sortFilter(arr, reversed, caseSens, attr) {
          var _this = this;
          var array = lib.map(arr, function(v) {
            return v;
          });
          var getAttribute = lib.getAttrGetter(attr);
          array.sort(function(a, b) {
            var x = attr ? getAttribute(a) : a;
            var y = attr ? getAttribute(b) : b;
            if (_this.env.opts.throwOnUndefined && attr && (x === void 0 || y === void 0)) {
              throw new TypeError('sort: attribute "' + attr + '" resolved to undefined');
            }
            if (!caseSens && lib.isString(x) && lib.isString(y)) {
              x = x.toLowerCase();
              y = y.toLowerCase();
            }
            if (x < y) {
              return reversed ? 1 : -1;
            } else if (x > y) {
              return reversed ? -1 : 1;
            } else {
              return 0;
            }
          });
          return array;
        });
        function string(obj) {
          return r.copySafeness(obj, obj);
        }
        exports2.string = string;
        function striptags(input, preserveLinebreaks) {
          input = normalize(input, "");
          var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>|<!--[\s\S]*?-->/gi;
          var trimmedInput = trim(input.replace(tags, ""));
          var res = "";
          if (preserveLinebreaks) {
            res = trimmedInput.replace(/^ +| +$/gm, "").replace(/ +/g, " ").replace(/(\r\n)/g, "\n").replace(/\n\n\n+/g, "\n\n");
          } else {
            res = trimmedInput.replace(/\s+/gi, " ");
          }
          return r.copySafeness(input, res);
        }
        exports2.striptags = striptags;
        function title(str2) {
          str2 = normalize(str2, "");
          var words = str2.split(" ").map(function(word) {
            return capitalize(word);
          });
          return r.copySafeness(str2, words.join(" "));
        }
        exports2.title = title;
        function trim(str2) {
          return r.copySafeness(str2, str2.replace(/^\s*|\s*$/g, ""));
        }
        exports2.trim = trim;
        function truncate(input, length, killwords, end) {
          var orig = input;
          input = normalize(input, "");
          length = length || 255;
          if (input.length <= length) {
            return input;
          }
          if (killwords) {
            input = input.substring(0, length);
          } else {
            var idx = input.lastIndexOf(" ", length);
            if (idx === -1) {
              idx = length;
            }
            input = input.substring(0, idx);
          }
          input += end !== void 0 && end !== null ? end : "...";
          return r.copySafeness(orig, input);
        }
        exports2.truncate = truncate;
        function upper(str2) {
          str2 = normalize(str2, "");
          return str2.toUpperCase();
        }
        exports2.upper = upper;
        function urlencode(obj) {
          var enc = encodeURIComponent;
          if (lib.isString(obj)) {
            return enc(obj);
          } else {
            var keyvals = lib.isArray(obj) ? obj : lib._entries(obj);
            return keyvals.map(function(_ref2) {
              var k = _ref2[0], v = _ref2[1];
              return enc(k) + "=" + enc(v);
            }).join("&");
          }
        }
        exports2.urlencode = urlencode;
        var puncRe = /^(?:\(|<|&lt;)?(.*?)(?:\.|,|\)|\n|&gt;)?$/;
        var emailRe = /^[\w.!#$%&'*+\-\/=?\^`{|}~]+@[a-z\d\-]+(\.[a-z\d\-]+)+$/i;
        var httpHttpsRe = /^https?:\/\/.*$/;
        var wwwRe = /^www\./;
        var tldRe = /\.(?:org|net|com)(?:\:|\/|$)/;
        function urlize(str2, length, nofollow) {
          if (isNaN2(length)) {
            length = Infinity;
          }
          var noFollowAttr = nofollow === true ? ' rel="nofollow"' : "";
          var words = str2.split(/(\s+)/).filter(function(word) {
            return word && word.length;
          }).map(function(word) {
            var matches = word.match(puncRe);
            var possibleUrl = matches ? matches[1] : word;
            var shortUrl = possibleUrl.substr(0, length);
            if (httpHttpsRe.test(possibleUrl)) {
              return '<a href="' + possibleUrl + '"' + noFollowAttr + ">" + shortUrl + "</a>";
            }
            if (wwwRe.test(possibleUrl)) {
              return '<a href="http://' + possibleUrl + '"' + noFollowAttr + ">" + shortUrl + "</a>";
            }
            if (emailRe.test(possibleUrl)) {
              return '<a href="mailto:' + possibleUrl + '">' + possibleUrl + "</a>";
            }
            if (tldRe.test(possibleUrl)) {
              return '<a href="http://' + possibleUrl + '"' + noFollowAttr + ">" + shortUrl + "</a>";
            }
            return word;
          });
          return words.join("");
        }
        exports2.urlize = urlize;
        function wordcount(str2) {
          str2 = normalize(str2, "");
          var words = str2 ? str2.match(/\w+/g) : null;
          return words ? words.length : null;
        }
        exports2.wordcount = wordcount;
        function float2(val, def) {
          var res = parseFloat(val);
          return isNaN2(res) ? def : res;
        }
        exports2.float = float2;
        var intFilter = r.makeMacro(["value", "default", "base"], [], function doInt(value, defaultValue, base) {
          if (base === void 0) {
            base = 10;
          }
          var res = parseInt(value, base);
          return isNaN2(res) ? defaultValue : res;
        });
        exports2.int = intFilter;
        exports2.d = exports2.default;
        exports2.e = exports2.escape;
      },
      function(module2, exports2, __webpack_require__) {
        function _inheritsLoose(subClass, superClass) {
          subClass.prototype = Object.create(superClass.prototype);
          subClass.prototype.constructor = subClass;
          _setPrototypeOf(subClass, superClass);
        }
        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
            o2.__proto__ = p2;
            return o2;
          };
          return _setPrototypeOf(o, p);
        }
        var Loader = __webpack_require__(6);
        var PrecompiledLoader = /* @__PURE__ */ function(_Loader) {
          _inheritsLoose(PrecompiledLoader2, _Loader);
          function PrecompiledLoader2(compiledTemplates) {
            var _this;
            _this = _Loader.call(this) || this;
            _this.precompiled = compiledTemplates || {};
            return _this;
          }
          var _proto = PrecompiledLoader2.prototype;
          _proto.getSource = function getSource(name) {
            if (this.precompiled[name]) {
              return {
                src: {
                  type: "code",
                  obj: this.precompiled[name]
                },
                path: name
              };
            }
            return null;
          };
          return PrecompiledLoader2;
        }(Loader);
        module2.exports = {
          PrecompiledLoader
        };
      },
      function(module2, exports2, __webpack_require__) {
        var SafeString = __webpack_require__(2).SafeString;
        function callable(value) {
          return typeof value === "function";
        }
        exports2.callable = callable;
        function defined(value) {
          return value !== void 0;
        }
        exports2.defined = defined;
        function divisibleby(one, two) {
          return one % two === 0;
        }
        exports2.divisibleby = divisibleby;
        function escaped(value) {
          return value instanceof SafeString;
        }
        exports2.escaped = escaped;
        function equalto(one, two) {
          return one === two;
        }
        exports2.equalto = equalto;
        exports2.eq = exports2.equalto;
        exports2.sameas = exports2.equalto;
        function even(value) {
          return value % 2 === 0;
        }
        exports2.even = even;
        function falsy(value) {
          return !value;
        }
        exports2.falsy = falsy;
        function ge(one, two) {
          return one >= two;
        }
        exports2.ge = ge;
        function greaterthan(one, two) {
          return one > two;
        }
        exports2.greaterthan = greaterthan;
        exports2.gt = exports2.greaterthan;
        function le(one, two) {
          return one <= two;
        }
        exports2.le = le;
        function lessthan(one, two) {
          return one < two;
        }
        exports2.lessthan = lessthan;
        exports2.lt = exports2.lessthan;
        function lower(value) {
          return value.toLowerCase() === value;
        }
        exports2.lower = lower;
        function ne(one, two) {
          return one !== two;
        }
        exports2.ne = ne;
        function nullTest(value) {
          return value === null;
        }
        exports2.null = nullTest;
        function number(value) {
          return typeof value === "number";
        }
        exports2.number = number;
        function odd(value) {
          return value % 2 === 1;
        }
        exports2.odd = odd;
        function string(value) {
          return typeof value === "string";
        }
        exports2.string = string;
        function truthy(value) {
          return !!value;
        }
        exports2.truthy = truthy;
        function undefinedTest(value) {
          return value === void 0;
        }
        exports2.undefined = undefinedTest;
        function upper(value) {
          return value.toUpperCase() === value;
        }
        exports2.upper = upper;
        function iterable(value) {
          if (typeof Symbol !== "undefined") {
            return !!value[Symbol.iterator];
          } else {
            return Array.isArray(value) || typeof value === "string";
          }
        }
        exports2.iterable = iterable;
        function mapping(value) {
          var bool2 = value !== null && value !== void 0 && typeof value === "object" && !Array.isArray(value);
          if (Set) {
            return bool2 && !(value instanceof Set);
          } else {
            return bool2;
          }
        }
        exports2.mapping = mapping;
      },
      function(module2, exports2, __webpack_require__) {
        function _cycler(items) {
          var index = -1;
          return {
            current: null,
            reset: function reset() {
              index = -1;
              this.current = null;
            },
            next: function next() {
              index++;
              if (index >= items.length) {
                index = 0;
              }
              this.current = items[index];
              return this.current;
            }
          };
        }
        function _joiner(sep) {
          sep = sep || ",";
          var first = true;
          return function() {
            var val = first ? "" : sep;
            first = false;
            return val;
          };
        }
        function globals() {
          return {
            range: function range(start, stop, step) {
              if (typeof stop === "undefined") {
                stop = start;
                start = 0;
                step = 1;
              } else if (!step) {
                step = 1;
              }
              var arr = [];
              if (step > 0) {
                for (var i = start; i < stop; i += step) {
                  arr.push(i);
                }
              } else {
                for (var _i = start; _i > stop; _i += step) {
                  arr.push(_i);
                }
              }
              return arr;
            },
            cycler: function cycler() {
              return _cycler(Array.prototype.slice.call(arguments));
            },
            joiner: function joiner(sep) {
              return _joiner(sep);
            }
          };
        }
        module2.exports = globals;
      },
      function(module2, exports2, __webpack_require__) {
        var path = __webpack_require__(4);
        module2.exports = function express(env, app) {
          function NunjucksView(name, opts) {
            this.name = name;
            this.path = name;
            this.defaultEngine = opts.defaultEngine;
            this.ext = path.extname(name);
            if (!this.ext && !this.defaultEngine) {
              throw new Error("No default engine was specified and no extension was provided.");
            }
            if (!this.ext) {
              this.name += this.ext = (this.defaultEngine[0] !== "." ? "." : "") + this.defaultEngine;
            }
          }
          NunjucksView.prototype.render = function render2(opts, cb) {
            env.render(this.name, opts, cb);
          };
          app.set("view", NunjucksView);
          app.set("nunjucksEnv", env);
          return env;
        };
      },
      function(module2, exports2, __webpack_require__) {
        var fs = __webpack_require__(4);
        var path = __webpack_require__(4);
        var _require = __webpack_require__(0), _prettifyError = _require._prettifyError;
        var compiler = __webpack_require__(5);
        var _require2 = __webpack_require__(7), Environment = _require2.Environment;
        var precompileGlobal = __webpack_require__(24);
        function match(filename, patterns) {
          if (!Array.isArray(patterns)) {
            return false;
          }
          return patterns.some(function(pattern) {
            return filename.match(pattern);
          });
        }
        function precompileString(str2, opts) {
          opts = opts || {};
          opts.isString = true;
          var env = opts.env || new Environment([]);
          var wrapper = opts.wrapper || precompileGlobal;
          if (!opts.name) {
            throw new Error('the "name" option is required when compiling a string');
          }
          return wrapper([_precompile(str2, opts.name, env)], opts);
        }
        function precompile(input, opts) {
          opts = opts || {};
          var env = opts.env || new Environment([]);
          var wrapper = opts.wrapper || precompileGlobal;
          if (opts.isString) {
            return precompileString(input, opts);
          }
          var pathStats = fs.existsSync(input) && fs.statSync(input);
          var precompiled = [];
          var templates = [];
          function addTemplates(dir) {
            fs.readdirSync(dir).forEach(function(file) {
              var filepath = path.join(dir, file);
              var subpath = filepath.substr(path.join(input, "/").length);
              var stat = fs.statSync(filepath);
              if (stat && stat.isDirectory()) {
                subpath += "/";
                if (!match(subpath, opts.exclude)) {
                  addTemplates(filepath);
                }
              } else if (match(subpath, opts.include)) {
                templates.push(filepath);
              }
            });
          }
          if (pathStats.isFile()) {
            precompiled.push(_precompile(fs.readFileSync(input, "utf-8"), opts.name || input, env));
          } else if (pathStats.isDirectory()) {
            addTemplates(input);
            for (var i = 0; i < templates.length; i++) {
              var name = templates[i].replace(path.join(input, "/"), "");
              try {
                precompiled.push(_precompile(fs.readFileSync(templates[i], "utf-8"), name, env));
              } catch (e) {
                if (opts.force) {
                  console.error(e);
                } else {
                  throw e;
                }
              }
            }
          }
          return wrapper(precompiled, opts);
        }
        function _precompile(str2, name, env) {
          env = env || new Environment([]);
          var asyncFilters = env.asyncFilters;
          var extensions = env.extensionsList;
          var template;
          name = name.replace(/\\/g, "/");
          try {
            template = compiler.compile(str2, asyncFilters, extensions, name, env.opts);
          } catch (err) {
            throw _prettifyError(name, false, err);
          }
          return {
            name,
            template
          };
        }
        module2.exports = {
          precompile,
          precompileString
        };
      },
      function(module2, exports2, __webpack_require__) {
        function precompileGlobal(templates, opts) {
          var out = "";
          opts = opts || {};
          for (var i = 0; i < templates.length; i++) {
            var name = JSON.stringify(templates[i].name);
            var template = templates[i].template;
            out += "(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})[" + name + "] = (function() {\n" + template + "\n})();\n";
            if (opts.asFunction) {
              out += "return function(ctx, cb) { return nunjucks.render(" + name + ", ctx, cb); }\n";
            }
            out += "})();\n";
          }
          return out;
        }
        module2.exports = precompileGlobal;
      },
      function(module2, exports2, __webpack_require__) {
        function installCompat() {
          var runtime = this.runtime;
          var lib = this.lib;
          var Compiler = this.compiler.Compiler;
          var Parser = this.parser.Parser;
          var nodes = this.nodes;
          var lexer = this.lexer;
          var orig_contextOrFrameLookup = runtime.contextOrFrameLookup;
          var orig_memberLookup = runtime.memberLookup;
          var orig_Compiler_assertType;
          var orig_Parser_parseAggregate;
          if (Compiler) {
            orig_Compiler_assertType = Compiler.prototype.assertType;
          }
          if (Parser) {
            orig_Parser_parseAggregate = Parser.prototype.parseAggregate;
          }
          function uninstall() {
            runtime.contextOrFrameLookup = orig_contextOrFrameLookup;
            runtime.memberLookup = orig_memberLookup;
            if (Compiler) {
              Compiler.prototype.assertType = orig_Compiler_assertType;
            }
            if (Parser) {
              Parser.prototype.parseAggregate = orig_Parser_parseAggregate;
            }
          }
          runtime.contextOrFrameLookup = function contextOrFrameLookup(context, frame, key) {
            var val = orig_contextOrFrameLookup.apply(this, arguments);
            if (val !== void 0) {
              return val;
            }
            switch (key) {
              case "True":
                return true;
              case "False":
                return false;
              case "None":
                return null;
              default:
                return void 0;
            }
          };
          function getTokensState(tokens) {
            return {
              index: tokens.index,
              lineno: tokens.lineno,
              colno: tokens.colno
            };
          }
          if (nodes && Compiler && Parser) {
            var Slice = nodes.Node.extend("Slice", {
              fields: ["start", "stop", "step"],
              init: function init(lineno, colno, start, stop, step) {
                start = start || new nodes.Literal(lineno, colno, null);
                stop = stop || new nodes.Literal(lineno, colno, null);
                step = step || new nodes.Literal(lineno, colno, 1);
                this.parent(lineno, colno, start, stop, step);
              }
            });
            Compiler.prototype.assertType = function assertType(node) {
              if (node instanceof Slice) {
                return;
              }
              orig_Compiler_assertType.apply(this, arguments);
            };
            Compiler.prototype.compileSlice = function compileSlice(node, frame) {
              this._emit("(");
              this._compileExpression(node.start, frame);
              this._emit("),(");
              this._compileExpression(node.stop, frame);
              this._emit("),(");
              this._compileExpression(node.step, frame);
              this._emit(")");
            };
            Parser.prototype.parseAggregate = function parseAggregate() {
              var _this = this;
              var origState = getTokensState(this.tokens);
              origState.colno--;
              origState.index--;
              try {
                return orig_Parser_parseAggregate.apply(this);
              } catch (e) {
                var errState = getTokensState(this.tokens);
                var rethrow = function rethrow2() {
                  lib._assign(_this.tokens, errState);
                  return e;
                };
                lib._assign(this.tokens, origState);
                this.peeked = false;
                var tok = this.peekToken();
                if (tok.type !== lexer.TOKEN_LEFT_BRACKET) {
                  throw rethrow();
                } else {
                  this.nextToken();
                }
                var node = new Slice(tok.lineno, tok.colno);
                var isSlice = false;
                for (var i = 0; i <= node.fields.length; i++) {
                  if (this.skip(lexer.TOKEN_RIGHT_BRACKET)) {
                    break;
                  }
                  if (i === node.fields.length) {
                    if (isSlice) {
                      this.fail("parseSlice: too many slice components", tok.lineno, tok.colno);
                    } else {
                      break;
                    }
                  }
                  if (this.skip(lexer.TOKEN_COLON)) {
                    isSlice = true;
                  } else {
                    var field = node.fields[i];
                    node[field] = this.parseExpression();
                    isSlice = this.skip(lexer.TOKEN_COLON) || isSlice;
                  }
                }
                if (!isSlice) {
                  throw rethrow();
                }
                return new nodes.Array(tok.lineno, tok.colno, [node]);
              }
            };
          }
          function sliceLookup(obj, start, stop, step) {
            obj = obj || [];
            if (start === null) {
              start = step < 0 ? obj.length - 1 : 0;
            }
            if (stop === null) {
              stop = step < 0 ? -1 : obj.length;
            } else if (stop < 0) {
              stop += obj.length;
            }
            if (start < 0) {
              start += obj.length;
            }
            var results = [];
            for (var i = start; ; i += step) {
              if (i < 0 || i > obj.length) {
                break;
              }
              if (step > 0 && i >= stop) {
                break;
              }
              if (step < 0 && i <= stop) {
                break;
              }
              results.push(runtime.memberLookup(obj, i));
            }
            return results;
          }
          function hasOwnProp(obj, key) {
            return Object.prototype.hasOwnProperty.call(obj, key);
          }
          var ARRAY_MEMBERS = {
            pop: function pop(index) {
              if (index === void 0) {
                return this.pop();
              }
              if (index >= this.length || index < 0) {
                throw new Error("KeyError");
              }
              return this.splice(index, 1);
            },
            append: function append(element) {
              return this.push(element);
            },
            remove: function remove(element) {
              for (var i = 0; i < this.length; i++) {
                if (this[i] === element) {
                  return this.splice(i, 1);
                }
              }
              throw new Error("ValueError");
            },
            count: function count(element) {
              var count2 = 0;
              for (var i = 0; i < this.length; i++) {
                if (this[i] === element) {
                  count2++;
                }
              }
              return count2;
            },
            index: function index(element) {
              var i;
              if ((i = this.indexOf(element)) === -1) {
                throw new Error("ValueError");
              }
              return i;
            },
            find: function find(element) {
              return this.indexOf(element);
            },
            insert: function insert(index, elem) {
              return this.splice(index, 0, elem);
            }
          };
          var OBJECT_MEMBERS = {
            items: function items() {
              return lib._entries(this);
            },
            values: function values() {
              return lib._values(this);
            },
            keys: function keys() {
              return lib.keys(this);
            },
            get: function get(key, def) {
              var output = this[key];
              if (output === void 0) {
                output = def;
              }
              return output;
            },
            has_key: function has_key(key) {
              return hasOwnProp(this, key);
            },
            pop: function pop(key, def) {
              var output = this[key];
              if (output === void 0 && def !== void 0) {
                output = def;
              } else if (output === void 0) {
                throw new Error("KeyError");
              } else {
                delete this[key];
              }
              return output;
            },
            popitem: function popitem() {
              var keys = lib.keys(this);
              if (!keys.length) {
                throw new Error("KeyError");
              }
              var k = keys[0];
              var val = this[k];
              delete this[k];
              return [k, val];
            },
            setdefault: function setdefault(key, def) {
              if (def === void 0) {
                def = null;
              }
              if (!(key in this)) {
                this[key] = def;
              }
              return this[key];
            },
            update: function update(kwargs) {
              lib._assign(this, kwargs);
              return null;
            }
          };
          OBJECT_MEMBERS.iteritems = OBJECT_MEMBERS.items;
          OBJECT_MEMBERS.itervalues = OBJECT_MEMBERS.values;
          OBJECT_MEMBERS.iterkeys = OBJECT_MEMBERS.keys;
          runtime.memberLookup = function memberLookup(obj, val, autoescape) {
            if (arguments.length === 4) {
              return sliceLookup.apply(this, arguments);
            }
            obj = obj || {};
            if (lib.isArray(obj) && hasOwnProp(ARRAY_MEMBERS, val)) {
              return ARRAY_MEMBERS[val].bind(obj);
            }
            if (lib.isObject(obj) && hasOwnProp(OBJECT_MEMBERS, val)) {
              return OBJECT_MEMBERS[val].bind(obj);
            }
            return orig_memberLookup.apply(this, arguments);
          };
          return uninstall;
        }
        module2.exports = installCompat;
      }
    ]);
  });
})(nunjucks$1);
var nunjucks = /* @__PURE__ */ getDefaultExportFromCjs(nunjucks$1.exports);
function parseCommand(value, tag) {
  if (!value)
    return null;
  let tags = lodash.exports.compact(["dialog", "action", "command", "router", "https?", tag]).join("|");
  let regex = new RegExp(`^(${tags})\\:(\\S+)$`);
  let command = value.match(regex);
  if (!command)
    return null;
  let [, type2, path] = command;
  if (/^(https?)/.test(type2)) {
    return { type: "http", path: value };
  }
  return { type: type2, path };
}
function runCommand(self2, commands) {
  return (value, row, component) => {
    let command = parseCommand(value);
    if (!command)
      return;
    if (command.type === "command") {
      let [name, ...props] = command.path.split("|");
      let runScript = lodash.exports.get(commands != null ? commands : self2, name);
      if (lodash.exports.isFunction(runScript)) {
        runScript(...props);
      }
    } else if (command.type === "action") {
      if (commands == null ? void 0 : commands.action) {
        commands == null ? void 0 : commands.action(command.path, row, component, self2);
      }
    } else if (command.type === "dialog") {
      if (commands == null ? void 0 : commands.dialog) {
        commands == null ? void 0 : commands.dialog(command.path, row, component, self2);
      }
    } else if (command.type === "router") {
      if (!(self2 == null ? void 0 : self2.$router))
        return;
      self2.$router.push(command.path);
    } else if (command.type === "http") {
      if (!document)
        return;
      let link = document.createElement("a");
      let [href, target] = command.path.split("|");
      link.href = href;
      if (target) {
        link.target = target;
      }
      link.click();
    }
  };
}
function filterChannelDataNode(data, keywords, list = []) {
  if (!keywords)
    return;
  let keys = lodash.exports.map(list, "key");
  let query = {
    $or: [
      { name: { $regex: new RegExp(keywords, "i") } },
      { keywords: { $_in: [keywords.toLocaleLowerCase()] } }
    ]
  };
  let item = dist$1.dataNodeProxy(data).find({ $and: [{ key: { $nin: keys } }, query, { children: { $exists: false } }] });
  if (item) {
    list.push(item);
    filterChannelDataNode(data, keywords, list);
  }
  return;
}
function isDisabled(env) {
  return (disabled, props) => {
    if (!disabled)
      return false;
    let query = disabled;
    let data = lodash.exports.assign({}, env, props);
    if (lodash.exports.isString(disabled)) {
      query = jsYaml.safeLoad(parseTemplate(disabled, data));
      if (!lodash.exports.isPlainObject(query))
        return false;
    }
    if (lodash.exports.isBoolean(query))
      return query;
    let filter = _default(query);
    return filter(data);
  };
}
function isFilter(env) {
  return (conditions, props) => {
    if (!conditions)
      return true;
    let query = conditions;
    let data = lodash.exports.assign({}, env, props);
    if (lodash.exports.isString(conditions)) {
      query = jsYaml.safeLoad(parseTemplate(conditions, data));
      if (!lodash.exports.isPlainObject(query))
        return true;
    }
    let filter = _default(query);
    return filter(data);
  };
}
function getFilter(conditions, props = {}) {
  if (!conditions)
    return (data) => true;
  let query = conditions;
  if (lodash.exports.isString(conditions)) {
    query = jsYaml.safeLoad(parseTemplate(conditions, { ...props }));
  }
  if (!lodash.exports.isPlainObject(query))
    return (data) => true;
  return _default(query);
}
function getConditions(conditions, props = {}) {
  if (!conditions)
    return null;
  let query = conditions;
  if (lodash.exports.isString(conditions)) {
    query = jsYaml.safeLoad(parseTemplate(conditions, { ...props }));
  }
  if (!lodash.exports.isPlainObject(query))
    return null;
  return query;
}
function parseTemplate(tpl, context) {
  let env = new nunjucks.Environment(null, { autoescape: false });
  env.addFilter(parseDate.name, (value) => String(parseDate(value)));
  env.addFilter(parseContent.name, (value) => String.raw`${parseContent(value, context)}`);
  return env.renderString(tpl, context);
}
function parseDate(value, nowValue) {
  if (lodash.exports.isDate(value))
    return value;
  if (/(\_)/.test(value)) {
    let dates = value.split(/\_/);
    let now = null;
    for (let item of dates) {
      if (now && !/(day?(s|e)|week?(s|e))$/.test(item))
        break;
      now = parseDate(item, now);
    }
    return now;
  }
  let dateValue = parseDateString(value);
  let today = nowValue != null ? nowValue : new Date();
  let nowDayOfWeek = today.getDay() - 1;
  if (value === "now") {
    return new Date();
  } else if (["yesterday", "today", "tomorrow"].includes(value)) {
    let index = ["yesterday", "today", "tomorrow"].indexOf(value) - 1;
    return parseDate([index, "days"].join(" "));
  } else if (/(day)$/.test(value)) {
    return new Date(today.setDate(today.getDate() + dateValue));
  } else if (/(days)$/.test(value)) {
    return new Date(new Date(today.setDate(today.getDate() + dateValue)).setHours(0, 0, 0, 0));
  } else if (/(daye)$/.test(value)) {
    return new Date(new Date(today.setDate(today.getDate() + dateValue)).setHours(23, 59, 59, 999));
  } else if (/(week)$/.test(value)) {
    let date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - nowDayOfWeek + dateValue * 7 + nowDayOfWeek).setHours(today.getHours(), today.getMinutes(), today.getSeconds(), today.getMilliseconds());
    return new Date(date);
  } else if (/(weeks)$/.test(value)) {
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() - nowDayOfWeek + dateValue * 7 + 0);
  } else if (/(weeke)$/.test(value)) {
    let date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - nowDayOfWeek + dateValue * 7 + 6).setHours(23, 59, 59, 999);
    return new Date(date);
  } else if (/(month)$/.test(value)) {
    return new Date(new Date(new Date().setMonth(dateValue)));
  } else if (/(months)$/.test(value)) {
    return new Date(new Date(new Date().setMonth(dateValue, 1)).setHours(0, 0, 0, 0));
  } else if (/(monthe)$/.test(value)) {
    let offset = dateValue - new Date().getMonth() + 1;
    return new Date(parseDate(`${offset} months`).getTime() - 1);
  } else if (/(year)$/.test(value)) {
    return new Date(new Date().setFullYear(dateValue));
  } else if (/(years)$/.test(value)) {
    return new Date(new Date(new Date().setFullYear(dateValue, 0, 1)).setHours(0, 0, 0, 0));
  } else if (/(yeare)$/.test(value)) {
    return new Date(new Date(new Date().setFullYear(dateValue, 11, 31)).setHours(23, 59, 59, 999));
  }
  return null;
}
function parseContent(path, env) {
  let val = lodash.exports.get(env, path, "");
  return val.split("\n").join("\n\n").replace(/\"/g, '\\"');
}
function parseProps(props) {
  return (data) => {
    if (!props)
      return data;
    let result = data;
    let keys = [];
    for (let [key, val] of Object.entries(props)) {
      result[key] = /(\{)/.test(val) ? parseTemplate(val, data) : lodash.exports.get(data, val);
      if (key !== val) {
        keys.push(val);
      }
    }
    return lodash.exports.omit(result, keys);
  };
}
function parseDateString(value) {
  var _a, _b;
  let [label] = value.split(/\s+/);
  let [type2] = (_a = value.match(/(year|month|day|week)/)) != null ? _a : [];
  let date = {
    day: 0,
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  };
  let val = (_b = date == null ? void 0 : date[type2]) != null ? _b : 0;
  if (/(\d+){4}/.test(label)) {
    val = Number(label);
  } else if (!lodash.exports.isNaN(Number(label))) {
    val += Number(label);
  }
  return val;
}
const Plugin = {
  install: (vue) => {
    for (let [, component] of Object.entries(components)) {
      vue.component(`${component.name}`, component);
    }
  }
};
export { channelSearchbar as ChannelSearchbar, drawer as Drawer, Plugin, filterChannelDataNode, getConditions, getFilter, isDisabled, isFilter, parseCommand, parseContent, parseDate, parseProps, parseTemplate, runCommand };
