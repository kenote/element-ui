import Vue from "vue";
import _, { merge, compact, trim, assign, pickBy, unset, isString, isFunction, map, pick, isEqual, omitBy, isUndefined, cloneDeep, set, omit, zipObject, get, orderBy, chunk, isArray, isPlainObject, isBoolean, isDate, isNaN as isNaN$1, template } from "lodash";
import { initMaps, dataNodeProxy } from "@kenote/common";
import ruleJudgment from "rule-judgment";
import { Message } from "element-ui";
import "vue-router";
import jsYaml from "js-yaml";
import nunjucks from "nunjucks";
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
function _defineProperty$2(obj, key, value) {
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
function copyReflectionMetadata(to, from2) {
  forwardMetadata(to, from2);
  Object.getOwnPropertyNames(from2.prototype).forEach(function(key) {
    forwardMetadata(to.prototype, from2.prototype, key);
  });
  Object.getOwnPropertyNames(from2).forEach(function(key) {
    forwardMetadata(to, from2, key);
  });
}
function forwardMetadata(to, from2, propertyKey) {
  var metaKeys = propertyKey ? Reflect.getOwnMetadataKeys(from2, propertyKey) : Reflect.getOwnMetadataKeys(from2);
  metaKeys.forEach(function(metaKey) {
    var metadata = propertyKey ? Reflect.getOwnMetadata(metaKey, from2, propertyKey) : Reflect.getOwnMetadata(metaKey, from2);
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
function mixins() {
  for (var _len = arguments.length, Ctors = new Array(_len), _key = 0; _key < _len; _key++) {
    Ctors[_key] = arguments[_key];
  }
  return Vue.extend({
    mixins: Ctors
  });
}
function isPrimitive(value) {
  var type = _typeof(value);
  return value == null || type !== "object" && type !== "function";
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
        get: function get15() {
          return vm[key2];
        },
        set: function set6(value) {
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
            return _defineProperty$2({}, key, descriptor.value);
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
var hyphenate = function(str) {
  return str.replace(hyphenateRE, "-$1").toLowerCase();
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
      var emit = function(returnValue2) {
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
        returnValue.then(emit);
      } else {
        emit(returnValue);
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
      var type = Reflect.getMetadata("design:type", target, key);
      if (type !== Object) {
        options.type = type;
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
var __defProp$g = Object.defineProperty;
var __getOwnPropDesc$g = Object.getOwnPropertyDescriptor;
var __decorateClass$g = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$g(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$g(target, key, result);
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
      this.styles = merge(this.styles, {
        [this.placement]: "0"
      });
      this.timestamp = Date.now();
      this.$emit("open", null);
    } else {
      document.removeEventListener("click", this.handleClick, false);
      this.styles = merge(this.styles, {
        [this.placement]: `-${this.width}${this.unit}`
      });
    }
  }
  handleClick(evt) {
    var _a, _b, _c;
    if (this.lock)
      return;
    let drawer2 = (_a = this.$refs) == null ? void 0 : _a["drawer"];
    let paths = compact((_b = parseMouseEvent(evt).path) == null ? void 0 : _b.map((el) => el.className));
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
    this.styles = merge({
      [size]: `${value}${this.unit}`,
      [this.placement]: `-${value}${this.unit}`
    }, styles);
  }
};
__decorateClass$g([
  Prop({ default: "right" })
], KlDrawer.prototype, "placement", 2);
__decorateClass$g([
  Prop({ default: 360 })
], KlDrawer.prototype, "width", 2);
__decorateClass$g([
  Prop({ default: false })
], KlDrawer.prototype, "visible", 2);
__decorateClass$g([
  Prop({ default: false })
], KlDrawer.prototype, "lock", 2);
__decorateClass$g([
  Prop({ default: void 0 })
], KlDrawer.prototype, "zIndex", 2);
__decorateClass$g([
  Prop({ default: "px" })
], KlDrawer.prototype, "unit", 2);
__decorateClass$g([
  Prop({ default: 0 })
], KlDrawer.prototype, "offset", 2);
__decorateClass$g([
  Provide()
], KlDrawer.prototype, "styles", 2);
__decorateClass$g([
  Provide()
], KlDrawer.prototype, "timestamp", 2);
__decorateClass$g([
  Watch("width")
], KlDrawer.prototype, "onWidthChange", 1);
__decorateClass$g([
  Watch("visible")
], KlDrawer.prototype, "onVisibleChange", 1);
KlDrawer = __decorateClass$g([
  Component({
    name: "KlDrawer",
    created() {
      this.getStyles(this.width);
    }
  })
], KlDrawer);
var render$e = function() {
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
var staticRenderFns$e = [];
var drawer_vue_vue_type_style_index_0_lang = "";
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
      injectStyles.call(
        this,
        (options.functional ? this.parent : this).$root.$options.shadowRoot
      );
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
const __cssModules$e = {};
var __component__$e = /* @__PURE__ */ normalizeComponent(
  KlDrawer,
  render$e,
  staticRenderFns$e,
  false,
  __vue2_injectStyles$e,
  null,
  null,
  null
);
function __vue2_injectStyles$e(context) {
  for (let o in __cssModules$e) {
    this[o] = __cssModules$e[o];
  }
}
var drawer = /* @__PURE__ */ function() {
  return __component__$e.exports;
}();
var __defProp$f = Object.defineProperty;
var __getOwnPropDesc$f = Object.getOwnPropertyDescriptor;
var __decorateClass$f = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$f(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$f(target, key, result);
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
    this.restaurants = initMaps(val);
  }
  update(value) {
  }
  handleCommand(value) {
  }
  handleFocus(evt) {
  }
  handleBlur(evt) {
  }
  querySearch(queryString, done2) {
    let list = [];
    filterChannelDataNode(this.restaurants, trim(queryString), list);
    if (this.filter) {
      list = list.filter(ruleJudgment(this.filter));
    }
    let props = assign({
      value: "name",
      key: "key",
      description: "description"
    }, this.props);
    done2(list.map(parseProps(props)));
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
    let keywords = trim(this.keywords);
    return (_a = row.name) == null ? void 0 : _a.replace(new RegExp(`(${keywords})`, "gi"), `<span class='keywords'>$1</span>`);
  }
  handleSelect(node) {
    this.handleCommand(node);
    this.handleClear();
  }
};
__decorateClass$f([
  Provide()
], KlChannelSearchbar.prototype, "item", 2);
__decorateClass$f([
  Prop({ default: "\u641C\u7D22\u5185\u5BB9" })
], KlChannelSearchbar.prototype, "placeholder", 2);
__decorateClass$f([
  Prop({ default: void 0 })
], KlChannelSearchbar.prototype, "data", 2);
__decorateClass$f([
  Prop({ default: void 0 })
], KlChannelSearchbar.prototype, "props", 2);
__decorateClass$f([
  Prop({ default: void 0 })
], KlChannelSearchbar.prototype, "filter", 2);
__decorateClass$f([
  Prop({ default: "searchbar-popper" })
], KlChannelSearchbar.prototype, "popperClass", 2);
__decorateClass$f([
  Prop({ default: "default" })
], KlChannelSearchbar.prototype, "size", 2);
__decorateClass$f([
  Provide()
], KlChannelSearchbar.prototype, "keywords", 2);
__decorateClass$f([
  Provide()
], KlChannelSearchbar.prototype, "restaurants", 2);
__decorateClass$f([
  Model("update")
], KlChannelSearchbar.prototype, "value", 2);
__decorateClass$f([
  Watch("keywords")
], KlChannelSearchbar.prototype, "onKeywordsChange", 1);
__decorateClass$f([
  Watch("value")
], KlChannelSearchbar.prototype, "onValueChange", 1);
__decorateClass$f([
  Watch("data")
], KlChannelSearchbar.prototype, "onDataChange", 1);
__decorateClass$f([
  Emit("update")
], KlChannelSearchbar.prototype, "update", 1);
__decorateClass$f([
  Emit("command")
], KlChannelSearchbar.prototype, "handleCommand", 1);
__decorateClass$f([
  Emit("focus")
], KlChannelSearchbar.prototype, "handleFocus", 1);
__decorateClass$f([
  Emit("blur")
], KlChannelSearchbar.prototype, "handleBlur", 1);
KlChannelSearchbar = __decorateClass$f([
  Component({
    name: "KlChannelSearchbar",
    mounted() {
      var _a;
      this.keywords = this.value;
      this.restaurants = initMaps((_a = this.data) != null ? _a : []);
    }
  })
], KlChannelSearchbar);
var render$d = function() {
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
var staticRenderFns$d = [];
var channelSearchbar_vue_vue_type_style_index_0_lang = "";
const __cssModules$d = {};
var __component__$d = /* @__PURE__ */ normalizeComponent(
  KlChannelSearchbar,
  render$d,
  staticRenderFns$d,
  false,
  __vue2_injectStyles$d,
  null,
  null,
  null
);
function __vue2_injectStyles$d(context) {
  for (let o in __cssModules$d) {
    this[o] = __cssModules$d[o];
  }
}
var channelSearchbar = /* @__PURE__ */ function() {
  return __component__$d.exports;
}();
var __defProp$e = Object.defineProperty;
var __getOwnPropDesc$e = Object.getOwnPropertyDescriptor;
var __decorateClass$e = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$e(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$e(target, key, result);
  return result;
};
let KlBaseMixin = class extends Vue {
  constructor() {
    super(...arguments);
    this._ = _;
    this.isDisabled = isDisabled(this.env);
    this.isFilter = isFilter(this.env);
    this.parseProps = parseProps;
    this.parseTemplate = parseTemplate;
    this.toFormatString = toFormatString;
    this.getFilter = getFilter;
    this.toStyleSize = toStyleSize;
  }
  parseTag(value, name) {
    let [label, type] = value.split("_");
    return _.get({ label, type }, name);
  }
  command(type, row, component) {
  }
};
__decorateClass$e([
  Prop({ default: void 0 })
], KlBaseMixin.prototype, "env", 2);
__decorateClass$e([
  Emit("command")
], KlBaseMixin.prototype, "command", 1);
KlBaseMixin = __decorateClass$e([
  Component({
    name: "KlBaseMixin"
  })
], KlBaseMixin);
var __defProp$d = Object.defineProperty;
var __getOwnPropDesc$d = Object.getOwnPropertyDescriptor;
var __decorateClass$d = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$d(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$d(target, key, result);
  return result;
};
let KlSidebarItem = class extends mixins(KlBaseMixin) {
};
__decorateClass$d([
  Prop({ default: "" })
], KlSidebarItem.prototype, "name", 2);
__decorateClass$d([
  Prop({ default: "" })
], KlSidebarItem.prototype, "icon", 2);
__decorateClass$d([
  Prop({ default: void 0 })
], KlSidebarItem.prototype, "children", 2);
__decorateClass$d([
  Prop({ default: "" })
], KlSidebarItem.prototype, "index", 2);
__decorateClass$d([
  Prop({ default: "" })
], KlSidebarItem.prototype, "tag", 2);
__decorateClass$d([
  Prop({ default: false })
], KlSidebarItem.prototype, "disabled", 2);
__decorateClass$d([
  Prop({ default: "" })
], KlSidebarItem.prototype, "popperClass", 2);
__decorateClass$d([
  Prop({ default: "" })
], KlSidebarItem.prototype, "tagClass", 2);
KlSidebarItem = __decorateClass$d([
  Component({
    name: "KlSidebarItem"
  })
], KlSidebarItem);
var render$c = function() {
  var _vm$children;
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", [((_vm$children = _vm.children) === null || _vm$children === void 0 ? void 0 : _vm$children.length) > 0 ? _c("el-submenu", {
    attrs: {
      "index": _vm.index,
      "popper-class": _vm.popperClass
    }
  }, [_c("template", {
    slot: "title"
  }, [_vm.icon ? _c("i", {
    class: _vm.icon
  }) : _vm._e(), _vm._v(" " + _vm._s(_vm.name) + " ")]), _vm._l(_vm.children, function(item, key) {
    var _item$route;
    return _c("kl-sidebar-item", {
      key,
      attrs: {
        "name": item.name,
        "icon": item.icon,
        "index": (_item$route = item.route) !== null && _item$route !== void 0 ? _item$route : item.key,
        "children": item.children,
        "tag": item.tag,
        "disabled": item.disabled,
        "eenv": _vm.env,
        "popper-class": _vm.popperClass,
        "tag-class": _vm.tagClass
      }
    });
  })], 2) : _c("el-menu-item", {
    attrs: {
      "index": _vm.index,
      "disabled": _vm.isDisabled(_vm.disabled)
    }
  }, [_vm.icon ? _c("i", {
    class: _vm.icon
  }) : _vm._e(), _vm._v(" " + _vm._s(_vm.name) + " "), _vm.tag ? _c("el-tag", {
    staticClass: "kl-sidebar-item_tag",
    class: _vm.tagClass,
    attrs: {
      "type": _vm.parseTag(_vm.tag, "type"),
      "effect": "dark"
    }
  }, [_vm._v(_vm._s(_vm.parseTag(_vm.tag, "label")))]) : _vm._e()], 1)], 1);
};
var staticRenderFns$c = [];
var sidebarItem_vue_vue_type_style_index_0_lang = "";
const __cssModules$c = {};
var __component__$c = /* @__PURE__ */ normalizeComponent(
  KlSidebarItem,
  render$c,
  staticRenderFns$c,
  false,
  __vue2_injectStyles$c,
  null,
  null,
  null
);
function __vue2_injectStyles$c(context) {
  for (let o in __cssModules$c) {
    this[o] = __cssModules$c[o];
  }
}
var SidebarItem = /* @__PURE__ */ function() {
  return __component__$c.exports;
}();
var __defProp$c = Object.defineProperty;
var __getOwnPropDesc$c = Object.getOwnPropertyDescriptor;
var __decorateClass$c = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$c(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$c(target, key, result);
  return result;
};
let KlSidebar = class extends mixins(KlBaseMixin) {
  handleSelect(index) {
  }
};
__decorateClass$c([
  Prop({ default: "" })
], KlSidebar.prototype, "defaultActive", 2);
__decorateClass$c([
  Prop({ default: false })
], KlSidebar.prototype, "collapse", 2);
__decorateClass$c([
  Prop({ default: false })
], KlSidebar.prototype, "uniqueOpened", 2);
__decorateClass$c([
  Prop({ default: false })
], KlSidebar.prototype, "router", 2);
__decorateClass$c([
  Prop({ default: void 0 })
], KlSidebar.prototype, "data", 2);
__decorateClass$c([
  Prop({ default: "" })
], KlSidebar.prototype, "popperClass", 2);
__decorateClass$c([
  Prop({ default: "" })
], KlSidebar.prototype, "tagClass", 2);
__decorateClass$c([
  Emit("select")
], KlSidebar.prototype, "handleSelect", 1);
KlSidebar = __decorateClass$c([
  Component({
    name: "KlSidebar",
    components: {
      SidebarItem
    }
  })
], KlSidebar);
var render$b = function() {
  var _vm$data;
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    staticClass: "kl-sidebar"
  }, [_vm.$slots.header ? _c("div", {
    staticClass: "header"
  }, [_vm._t("header")], 2) : _vm._e(), _c("perfect-scrollbar", {
    staticStyle: {
      "flex": "1"
    },
    attrs: {
      "options": {
        suppressScrollX: true
      }
    }
  }, [_c("el-menu", {
    attrs: {
      "mode": "vertical",
      "default-active": _vm.defaultActive,
      "collapse": _vm.collapse,
      "unique-opened": _vm.uniqueOpened,
      "router": _vm.router
    },
    on: {
      "select": _vm.handleSelect
    }
  }, _vm._l((_vm$data = _vm.data) !== null && _vm$data !== void 0 ? _vm$data : [], function(item, key) {
    var _item$route;
    return _c("sidebar-item", {
      key,
      attrs: {
        "name": item.name,
        "icon": item.icon,
        "children": item.children,
        "index": (_item$route = item.route) !== null && _item$route !== void 0 ? _item$route : item.key,
        "tag": item.tag,
        "popper-class": _vm.popperClass,
        "tag-class": _vm.tagClass,
        "env": _vm.env
      }
    });
  }), 1)], 1), _vm.$slots.footer ? _c("div", {
    staticClass: "footer"
  }, [_vm._t("footer")], 2) : _vm._e()], 1);
};
var staticRenderFns$b = [];
var sidebar_vue_vue_type_style_index_0_lang = "";
const __cssModules$b = {};
var __component__$b = /* @__PURE__ */ normalizeComponent(
  KlSidebar,
  render$b,
  staticRenderFns$b,
  false,
  __vue2_injectStyles$b,
  null,
  null,
  null
);
function __vue2_injectStyles$b(context) {
  for (let o in __cssModules$b) {
    this[o] = __cssModules$b[o];
  }
}
var sidebar = /* @__PURE__ */ function() {
  return __component__$b.exports;
}();
var message = "";
var __defProp$b = Object.defineProperty;
var __getOwnPropDesc$b = Object.getOwnPropertyDescriptor;
var __decorateClass$b = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$b(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$b(target, key, result);
  return result;
};
let KlLoginForm = class extends Vue {
  constructor() {
    super(...arguments);
    this.times = 0;
    this.values = {};
    this.rules = {
      username: [
        { required: true, message: this.usernameMessage }
      ],
      password: [
        { required: true, message: this.passwordMessage }
      ]
    };
  }
  submit(values, cb) {
  }
  handleSubmit() {
    if (this.times > 0) {
      Message.warning(parseTemplate(this.waitMessage, { step: this.times }));
      return;
    }
    let theForm = this.$refs["theForm"];
    theForm.validate((valid) => {
      if (valid) {
        this.submit(this.values, this.callback);
      } else {
        return false;
      }
    });
  }
  callback(err, res) {
    if (err) {
      this.sendWait(this.waitStep);
    } else {
      let theForm = this.$refs["theForm"];
      theForm.resetFields();
    }
  }
  sendWait(step) {
    this.times = step;
    let timer = setInterval(() => {
      this.times--;
      if (this.times <= 0) {
        clearTimeout(timer);
        timer = null;
      }
    }, 1e3);
  }
};
__decorateClass$b([
  Prop({ default: false })
], KlLoginForm.prototype, "loading", 2);
__decorateClass$b([
  Prop({ default: "\u7528\u6237\u540D" })
], KlLoginForm.prototype, "usernameLabel", 2);
__decorateClass$b([
  Prop({ default: "\u7528\u6237\u540D" })
], KlLoginForm.prototype, "usernamePlaceholder", 2);
__decorateClass$b([
  Prop({ default: "\u8BF7\u8F93\u5165\u7528\u6237\u540D" })
], KlLoginForm.prototype, "usernameMessage", 2);
__decorateClass$b([
  Prop({ default: "\u5BC6\u7801" })
], KlLoginForm.prototype, "passwordLabel", 2);
__decorateClass$b([
  Prop({ default: "\u5BC6\u7801" })
], KlLoginForm.prototype, "passwordPlaceholder", 2);
__decorateClass$b([
  Prop({ default: "\u8BF7\u8F93\u5165\u5BC6\u7801" })
], KlLoginForm.prototype, "passwordMessage", 2);
__decorateClass$b([
  Prop({ default: "\u767B \u5F55" })
], KlLoginForm.prototype, "submitName", 2);
__decorateClass$b([
  Prop({ default: "primary" })
], KlLoginForm.prototype, "buttonType", 2);
__decorateClass$b([
  Prop({ default: "\u5176\u4ED6\u65B9\u5F0F" })
], KlLoginForm.prototype, "thirdpartyLoginText", 2);
__decorateClass$b([
  Prop({ default: false })
], KlLoginForm.prototype, "thirdpartyLogin", 2);
__decorateClass$b([
  Prop({ default: false })
], KlLoginForm.prototype, "qrcodeLogin", 2);
__decorateClass$b([
  Prop({ default: 5 })
], KlLoginForm.prototype, "waitStep", 2);
__decorateClass$b([
  Prop({ default: "\u8BF7\u5728 {{step}} \u79D2\u540E\u518D\u505A\u63D0\u4EA4" })
], KlLoginForm.prototype, "waitMessage", 2);
__decorateClass$b([
  Provide()
], KlLoginForm.prototype, "times", 2);
__decorateClass$b([
  Provide()
], KlLoginForm.prototype, "values", 2);
__decorateClass$b([
  Provide()
], KlLoginForm.prototype, "rules", 2);
__decorateClass$b([
  Emit("submit")
], KlLoginForm.prototype, "submit", 1);
KlLoginForm = __decorateClass$b([
  Component({
    name: "KlLoginForm"
  })
], KlLoginForm);
var render$a = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    staticClass: "landing-body",
    style: _vm.qrcodeLogin ? "padding: 40px 0 60px 0" : ""
  }, [_vm.qrcodeLogin ? [_c("div", {
    staticClass: "protocol"
  }, [_vm._t("protocol")], 2), _c("div", {
    staticClass: "qr-method"
  }, [_vm._t("qrcode")], 2)] : _vm._e(), _c("div", {
    staticClass: "wrapper"
  }, [_c("el-form", {
    ref: "theForm",
    attrs: {
      "model": _vm.values,
      "rules": _vm.rules,
      "label-position": "top",
      "hide-required-asterisk": ""
    },
    nativeOn: {
      "submit": function($event) {
        $event.preventDefault();
        return _vm.handleSubmit.apply(null, arguments);
      }
    }
  }, [_c("el-form-item", {
    staticClass: "h-96px",
    attrs: {
      "prop": "username",
      "rules": _vm.rules.username,
      "label": _vm.usernameLabel
    }
  }, [_c("el-input", {
    attrs: {
      "placeholder": _vm.usernamePlaceholder
    },
    model: {
      value: _vm.values.username,
      callback: function($$v) {
        _vm.$set(_vm.values, "username", $$v);
      },
      expression: "values.username"
    }
  })], 1), _c("el-form-item", {
    staticClass: "h-96px",
    attrs: {
      "prop": "password",
      "rules": _vm.rules.password,
      "label": _vm.passwordLabel
    }
  }, [_c("el-input", {
    attrs: {
      "type": "password",
      "placeholder": _vm.passwordPlaceholder
    },
    model: {
      value: _vm.values.password,
      callback: function($$v) {
        _vm.$set(_vm.values, "password", $$v);
      },
      expression: "values.password"
    }
  })], 1), _c("el-form-item", [_c("el-button", {
    attrs: {
      "type": _vm.buttonType,
      "native-type": "submit",
      "loading": _vm.loading
    }
  }, [_vm._v(_vm._s(_vm.submitName))]), _c("p", {
    staticClass: "service-terms"
  }, [_vm._t("service-terms")], 2)], 1)], 1), _vm.thirdpartyLogin ? _c("div", {
    staticClass: "third-party-login-wrap"
  }, [_c("div", {
    staticClass: "third-party-login-text"
  }, [_vm._v(_vm._s(_vm.thirdpartyLoginText))]), _c("div", {
    staticClass: "third-party-login"
  }, [_vm._t("third-party-login")], 2)]) : _vm._e()], 1)], 2);
};
var staticRenderFns$a = [];
var login_vue_vue_type_style_index_0_lang = "";
const __cssModules$a = {};
var __component__$a = /* @__PURE__ */ normalizeComponent(
  KlLoginForm,
  render$a,
  staticRenderFns$a,
  false,
  __vue2_injectStyles$a,
  null,
  null,
  null
);
function __vue2_injectStyles$a(context) {
  for (let o in __cssModules$a) {
    this[o] = __cssModules$a[o];
  }
}
var login = /* @__PURE__ */ function() {
  return __component__$a.exports;
}();
var __defProp$a = Object.defineProperty;
var __getOwnPropDesc$a = Object.getOwnPropertyDescriptor;
var __decorateClass$a = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$a(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$a(target, key, result);
  return result;
};
let KlQrcode = class extends Vue {
};
__decorateClass$a([
  Prop({ default: void 0 })
], KlQrcode.prototype, "title", 2);
KlQrcode = __decorateClass$a([
  Component({
    name: "KlQrcode"
  })
], KlQrcode);
var render$9 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    staticClass: "next-loading-wrap"
  }, [_vm.title ? _c("div", {
    staticClass: "qrlogin-title"
  }, [_vm._v(_vm._s(_vm.title))]) : _vm._e(), _c("div", {
    staticClass: "qrcode-wrap"
  }, [_vm._t("default")], 2), _c("div", {
    staticClass: "qrcode-text"
  }, [_vm._t("description")], 2)]);
};
var staticRenderFns$9 = [];
var qrcode_vue_vue_type_style_index_0_lang = "";
const __cssModules$9 = {};
var __component__$9 = /* @__PURE__ */ normalizeComponent(
  KlQrcode,
  render$9,
  staticRenderFns$9,
  false,
  __vue2_injectStyles$9,
  null,
  null,
  null
);
function __vue2_injectStyles$9(context) {
  for (let o in __cssModules$9) {
    this[o] = __cssModules$9[o];
  }
}
var qrcode = /* @__PURE__ */ function() {
  return __component__$9.exports;
}();
var __defProp$9 = Object.defineProperty;
var __getOwnPropDesc$9 = Object.getOwnPropertyDescriptor;
var __decorateClass$9 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$9(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$9(target, key, result);
  return result;
};
let KlFormItem$1 = class extends mixins(KlBaseMixin) {
  constructor() {
    super(...arguments);
    this.values = "";
    this.style = {};
    this.propData = [];
    this.filterMethod = null;
    this.filter = {};
    this.merge = merge;
  }
  update(value) {
  }
  change(value, oldVal) {
  }
  getData(request, options, next2) {
  }
  onValueChange(val, oldVal) {
    if (val === oldVal)
      return;
    this.values = this.getValue(val);
  }
  onValuesChange(val, oldVal) {
    if (val === oldVal)
      return;
    this.update(val);
    this.change(val, oldVal);
  }
  onWidthChange(val, oldVal) {
    if (val === oldVal)
      return;
    this.updateStyle({ width: this.toStyleSize(this.width) });
  }
  getValue(value) {
    let _value = ruleJudgment({ $regex: /transfer|checkbox|datanode/i })(this.type) ? [] : value;
    return value != null ? value : _value;
  }
  updateStyle(values) {
    this.style = pickBy({ ...this.style, ...values }, (v) => v !== void 0);
  }
  toProps(name) {
    var _a, _b, _c;
    let props = merge(this.props, { [name]: !((_a = this.props) == null ? void 0 : _a.value) || ((_b = this.props) == null ? void 0 : _b.value) == name ? "value" : (_c = this.props) == null ? void 0 : _c.value });
    if (!name || name !== "value") {
      unset(props, "value");
    }
    return props;
  }
};
__decorateClass$9([
  Prop({ default: "input" })
], KlFormItem$1.prototype, "type", 2);
__decorateClass$9([
  Prop()
], KlFormItem$1.prototype, "width", 2);
__decorateClass$9([
  Prop({ default: void 0 })
], KlFormItem$1.prototype, "placeholder", 2);
__decorateClass$9([
  Prop({ default: false })
], KlFormItem$1.prototype, "disabled", 2);
__decorateClass$9([
  Prop({ default: false })
], KlFormItem$1.prototype, "readonly", 2);
__decorateClass$9([
  Prop({ default: void 0 })
], KlFormItem$1.prototype, "size", 2);
__decorateClass$9([
  Prop({ default: void 0 })
], KlFormItem$1.prototype, "options", 2);
__decorateClass$9([
  Prop({ default: void 0 })
], KlFormItem$1.prototype, "data", 2);
__decorateClass$9([
  Prop({ default: void 0 })
], KlFormItem$1.prototype, "props", 2);
__decorateClass$9([
  Prop({ default: void 0 })
], KlFormItem$1.prototype, "format", 2);
__decorateClass$9([
  Prop({ default: void 0 })
], KlFormItem$1.prototype, "valueFormat", 2);
__decorateClass$9([
  Prop({ default: void 0 })
], KlFormItem$1.prototype, "pickerOptions", 2);
__decorateClass$9([
  Prop({ default: void 0 })
], KlFormItem$1.prototype, "requestOptions", 2);
__decorateClass$9([
  Provide()
], KlFormItem$1.prototype, "values", 2);
__decorateClass$9([
  Provide()
], KlFormItem$1.prototype, "style", 2);
__decorateClass$9([
  Provide()
], KlFormItem$1.prototype, "propData", 2);
__decorateClass$9([
  Provide()
], KlFormItem$1.prototype, "filterMethod", 2);
__decorateClass$9([
  Provide()
], KlFormItem$1.prototype, "filter", 2);
__decorateClass$9([
  Model("update")
], KlFormItem$1.prototype, "value", 2);
__decorateClass$9([
  Emit("update")
], KlFormItem$1.prototype, "update", 1);
__decorateClass$9([
  Emit("change")
], KlFormItem$1.prototype, "change", 1);
__decorateClass$9([
  Emit("get-data")
], KlFormItem$1.prototype, "getData", 1);
__decorateClass$9([
  Watch("value")
], KlFormItem$1.prototype, "onValueChange", 1);
__decorateClass$9([
  Watch("values")
], KlFormItem$1.prototype, "onValuesChange", 1);
__decorateClass$9([
  Watch("width")
], KlFormItem$1.prototype, "onWidthChange", 1);
KlFormItem$1 = __decorateClass$9([
  Component({
    name: "KlFormItem",
    created() {
      var _a, _b, _c;
      this.propData = (_b = (_a = this.data) == null ? void 0 : _a.map(parseProps(this.props))) != null ? _b : [];
      if (this.requestOptions) {
        this.getData(this.requestOptions, null, (data) => {
          var _a2;
          this.propData = (_a2 = data == null ? void 0 : data.map(parseProps(this.props))) != null ? _a2 : [];
        });
      }
      this.values = this.getValue(this.value);
      this.updateStyle({ width: this.toStyleSize(this.width) });
      let { filterMethod } = (_c = this.options) != null ? _c : {};
      if (filterMethod) {
        let __filterMethod = filterMethod;
        if (isString(filterMethod)) {
          try {
            __filterMethod = jsYaml.load(filterMethod);
          } catch (error) {
            if (error instanceof Error) {
              console.error(error.message);
            }
          }
        }
        if (isFunction(__filterMethod)) {
          this.filterMethod = __filterMethod;
        }
      }
    }
  })
], KlFormItem$1);
var render$8 = function() {
  var _vm$options, _vm$options2, _vm$options3, _vm$options4, _vm$options5, _vm$options6, _vm$options7, _vm$options8, _vm$options9, _vm$options10, _vm$options11, _vm$options12, _vm$options13, _vm$options14, _vm$options15, _vm$options16, _vm$options17, _vm$options18, _vm$options19, _vm$options20, _vm$options21, _vm$options22, _vm$options23, _vm$options24, _vm$options25, _vm$options30, _vm$options31, _vm$options32, _vm$options33, _vm$placeholder, _vm$placeholder2, _vm$options34, _vm$options35, _vm$options36, _vm$options37, _vm$options38, _vm$options39, _vm$options40, _vm$options41, _vm$options42, _vm$placeholder3, _vm$placeholder4, _vm$options43, _vm$options44, _vm$options45, _vm$options46, _vm$options47, _vm$options48, _vm$options49, _vm$options50, _vm$options51, _vm$options52, _vm$options53, _vm$options54, _vm$options55, _vm$options56, _vm$options57, _vm$options58, _vm$options59, _vm$options60, _vm$options61, _vm$options62, _vm$options63, _vm$options64, _vm$options65, _vm$options66, _vm$options67, _vm$options68, _vm$options69, _vm$options70, _vm$options71, _vm$options72, _vm$options73, _vm$options74, _vm$options75, _vm$options76, _vm$options77, _vm$options78, _vm$options79;
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.type == "password" ? _c("el-input", {
    style: _vm.style,
    attrs: {
      "type": "password",
      "placeholder": _vm.placeholder,
      "disabled": _vm.disabled,
      "clearable": (_vm$options = _vm.options) === null || _vm$options === void 0 ? void 0 : _vm$options.clearable,
      "minlength": (_vm$options2 = _vm.options) === null || _vm$options2 === void 0 ? void 0 : _vm$options2.minlength,
      "maxlength": (_vm$options3 = _vm.options) === null || _vm$options3 === void 0 ? void 0 : _vm$options3.maxlength,
      "show-password": (_vm$options4 = _vm.options) === null || _vm$options4 === void 0 ? void 0 : _vm$options4.showPassword,
      "size": _vm.size,
      "readonly": _vm.readonly
    },
    model: {
      value: _vm.values,
      callback: function($$v) {
        _vm.values = $$v;
      },
      expression: "values"
    }
  }) : _vm.type == "input-number" ? _c("el-input-number", {
    style: _vm.style,
    attrs: {
      "placeholder": _vm.placeholder,
      "disabled": _vm.disabled,
      "min": (_vm$options5 = _vm.options) === null || _vm$options5 === void 0 ? void 0 : _vm$options5.min,
      "max": (_vm$options6 = _vm.options) === null || _vm$options6 === void 0 ? void 0 : _vm$options6.max,
      "step": (_vm$options7 = _vm.options) === null || _vm$options7 === void 0 ? void 0 : _vm$options7.step,
      "precision": (_vm$options8 = _vm.options) === null || _vm$options8 === void 0 ? void 0 : _vm$options8.precision,
      "step-strictly": (_vm$options9 = _vm.options) === null || _vm$options9 === void 0 ? void 0 : _vm$options9.stepStrictly,
      "controls": (_vm$options10 = _vm.options) === null || _vm$options10 === void 0 ? void 0 : _vm$options10.controls,
      "controls-position": (_vm$options11 = _vm.options) === null || _vm$options11 === void 0 ? void 0 : _vm$options11.controlsPosition,
      "label": (_vm$options12 = _vm.options) === null || _vm$options12 === void 0 ? void 0 : _vm$options12.label,
      "size": _vm.size,
      "readonly": _vm.readonly
    },
    model: {
      value: _vm.values,
      callback: function($$v) {
        _vm.values = $$v;
      },
      expression: "values"
    }
  }) : _vm.type == "textarea" ? _c("el-input", {
    style: _vm.style,
    attrs: {
      "type": "textarea",
      "placeholder": _vm.placeholder,
      "disabled": _vm.disabled,
      "clearable": (_vm$options13 = _vm.options) === null || _vm$options13 === void 0 ? void 0 : _vm$options13.clearable,
      "minlength": (_vm$options14 = _vm.options) === null || _vm$options14 === void 0 ? void 0 : _vm$options14.minlength,
      "maxlength": (_vm$options15 = _vm.options) === null || _vm$options15 === void 0 ? void 0 : _vm$options15.maxlength,
      "show-word-limit": (_vm$options16 = _vm.options) === null || _vm$options16 === void 0 ? void 0 : _vm$options16.showWordLimit,
      "rows": (_vm$options17 = _vm.options) === null || _vm$options17 === void 0 ? void 0 : _vm$options17.rows,
      "autosize": (_vm$options18 = _vm.options) === null || _vm$options18 === void 0 ? void 0 : _vm$options18.autosize,
      "resize": (_vm$options19 = _vm.options) === null || _vm$options19 === void 0 ? void 0 : _vm$options19.resize,
      "readonly": _vm.readonly
    },
    model: {
      value: _vm.values,
      callback: function($$v) {
        _vm.values = $$v;
      },
      expression: "values"
    }
  }) : /^(radio)/.test(_vm.type) ? _c("el-radio-group", {
    style: _vm.style,
    attrs: {
      "disabled": _vm.disabled,
      "size": _vm.size
    },
    model: {
      value: _vm.values,
      callback: function($$v) {
        _vm.values = $$v;
      },
      expression: "values"
    }
  }, [/(button)$/.test(_vm.type) ? _vm._l(_vm.propData, function(item, key) {
    return _c("el-radio-button", {
      key,
      attrs: {
        "label": item.value,
        "disabled": item.disabled
      }
    }, [_vm._v(" " + _vm._s(_vm.toFormatString(_vm.props)(item, _vm.format)) + " ")]);
  }) : _vm._l(_vm.propData, function(item, key) {
    return _c("el-radio", {
      key,
      attrs: {
        "label": item.value,
        "disabled": item.disabled
      }
    }, [_vm._v(" " + _vm._s(_vm.toFormatString(_vm.props)(item, _vm.format)) + " ")]);
  })], 2) : /^(checkbox)/.test(_vm.type) ? _c("el-checkbox-group", {
    style: _vm.style,
    attrs: {
      "disabled": _vm.disabled,
      "size": _vm.size
    },
    model: {
      value: _vm.values,
      callback: function($$v) {
        _vm.values = $$v;
      },
      expression: "values"
    }
  }, [/(button)$/.test(_vm.type) ? _vm._l(_vm.propData, function(item, key) {
    return _c("el-checkbox-button", {
      key,
      attrs: {
        "label": item.value,
        "disabled": item.disabled
      }
    }, [_vm._v(" " + _vm._s(_vm.toFormatString(_vm.props)(item, _vm.format)) + " ")]);
  }) : _vm._l(_vm.propData, function(item, key) {
    return _c("el-checkbox", {
      key,
      attrs: {
        "label": item.value,
        "disabled": item.disabled
      }
    }, [_vm._v(" " + _vm._s(_vm.toFormatString(_vm.props)(item, _vm.format)) + " ")]);
  })], 2) : _vm.type == "select" ? _c("el-select", {
    style: _vm.style,
    attrs: {
      "disabled": _vm.disabled,
      "size": _vm.size,
      "placeholder": _vm.placeholder,
      "clearable": (_vm$options20 = _vm.options) === null || _vm$options20 === void 0 ? void 0 : _vm$options20.clearable,
      "filterable": (_vm$options21 = _vm.options) === null || _vm$options21 === void 0 ? void 0 : _vm$options21.filterable,
      "multiple": (_vm$options22 = _vm.options) === null || _vm$options22 === void 0 ? void 0 : _vm$options22.multiple,
      "multiple-limit": (_vm$options23 = _vm.options) === null || _vm$options23 === void 0 ? void 0 : _vm$options23.multipleLimit,
      "allow-create": (_vm$options24 = _vm.options) === null || _vm$options24 === void 0 ? void 0 : _vm$options24.allowCreate,
      "popper-class": (_vm$options25 = _vm.options) === null || _vm$options25 === void 0 ? void 0 : _vm$options25.popperClass,
      "collapse-tags": ""
    },
    model: {
      value: _vm.values,
      callback: function($$v) {
        _vm.values = $$v;
      },
      expression: "values"
    }
  }, [_vm._l(_vm.propData, function(item, key) {
    var _vm$options28, _vm$options29;
    return ["children" in item ? _c("el-option-group", {
      key: item.label,
      attrs: {
        "label": item.label
      }
    }, _vm._l(item.children, function(ele, ekey) {
      var _vm$options26, _vm$options27;
      return _c("el-option", {
        key: ekey,
        attrs: {
          "label": _vm.toFormatString(_vm.props)(ele, _vm.format),
          "value": ele === null || ele === void 0 ? void 0 : ele.value,
          "disabled": ele === null || ele === void 0 ? void 0 : ele.disabled
        }
      }, [(_vm$options26 = _vm.options) !== null && _vm$options26 !== void 0 && _vm$options26.template ? _c("div", {
        domProps: {
          "innerHTML": _vm._s(_vm.toFormatString(_vm.props)(item, (_vm$options27 = _vm.options) === null || _vm$options27 === void 0 ? void 0 : _vm$options27.template))
        }
      }) : _vm._e()]);
    }), 1) : _c("el-option", {
      key,
      attrs: {
        "label": _vm.toFormatString(_vm.props)(item, _vm.format),
        "value": item.value,
        "disabled": item === null || item === void 0 ? void 0 : item.disabled
      }
    }, [(_vm$options28 = _vm.options) !== null && _vm$options28 !== void 0 && _vm$options28.template ? _c("div", {
      domProps: {
        "innerHTML": _vm._s(_vm.toFormatString(_vm.props)(item, (_vm$options29 = _vm.options) === null || _vm$options29 === void 0 ? void 0 : _vm$options29.template))
      }
    }) : _vm._e()])];
  })], 2) : ["year", "years", "month", "months", "date", "dates", "week", "datetime"].includes(_vm.type) ? _c("el-date-picker", {
    style: _vm.style,
    attrs: {
      "type": _vm.type,
      "placeholder": _vm.placeholder,
      "disabled": _vm.disabled,
      "format": _vm.format,
      "value-format": _vm.valueFormat,
      "size": _vm.size,
      "picker-options": _vm.pickerOptions,
      "align": (_vm$options30 = _vm.options) === null || _vm$options30 === void 0 ? void 0 : _vm$options30.align,
      "clearable": (_vm$options31 = _vm.options) === null || _vm$options31 === void 0 ? void 0 : _vm$options31.clearable,
      "editable": (_vm$options32 = _vm.options) === null || _vm$options32 === void 0 ? void 0 : _vm$options32.editable,
      "default-time": (_vm$options33 = _vm.options) === null || _vm$options33 === void 0 ? void 0 : _vm$options33.defaultTime,
      "readonly": _vm.readonly
    },
    model: {
      value: _vm.values,
      callback: function($$v) {
        _vm.values = $$v;
      },
      expression: "values"
    }
  }) : ["datetimerange", "daterange", "monthrange"].includes(_vm.type) ? _c("el-date-picker", {
    style: _vm.style,
    attrs: {
      "type": _vm.type,
      "start-placeholder": (_vm$placeholder = _vm.placeholder) === null || _vm$placeholder === void 0 ? void 0 : _vm$placeholder[0],
      "end-placeholder": (_vm$placeholder2 = _vm.placeholder) === null || _vm$placeholder2 === void 0 ? void 0 : _vm$placeholder2[1],
      "disabled": _vm.disabled,
      "format": _vm.format,
      "value-format": _vm.valueFormat,
      "size": _vm.size,
      "picker-options": _vm.pickerOptions,
      "align": (_vm$options34 = _vm.options) === null || _vm$options34 === void 0 ? void 0 : _vm$options34.align,
      "clearable": (_vm$options35 = _vm.options) === null || _vm$options35 === void 0 ? void 0 : _vm$options35.clearable,
      "editable": (_vm$options36 = _vm.options) === null || _vm$options36 === void 0 ? void 0 : _vm$options36.editable,
      "range-separator": (_vm$options37 = _vm.options) === null || _vm$options37 === void 0 ? void 0 : _vm$options37.rangeSeparator,
      "default-time": (_vm$options38 = _vm.options) === null || _vm$options38 === void 0 ? void 0 : _vm$options38.defaultTime,
      "readonly": _vm.readonly
    },
    model: {
      value: _vm.values,
      callback: function($$v) {
        _vm.values = $$v;
      },
      expression: "values"
    }
  }) : _vm.type == "time" ? _c("el-time-picker", {
    style: _vm.style,
    attrs: {
      "placeholder": _vm.placeholder,
      "disabled": _vm.disabled,
      "value-format": _vm.valueFormat,
      "size": _vm.size,
      "picker-options": _vm.pickerOptions,
      "align": (_vm$options39 = _vm.options) === null || _vm$options39 === void 0 ? void 0 : _vm$options39.align,
      "clearable": (_vm$options40 = _vm.options) === null || _vm$options40 === void 0 ? void 0 : _vm$options40.clearable,
      "editable": (_vm$options41 = _vm.options) === null || _vm$options41 === void 0 ? void 0 : _vm$options41.editable,
      "arrow-control": (_vm$options42 = _vm.options) === null || _vm$options42 === void 0 ? void 0 : _vm$options42.arrowControl,
      "readonly": _vm.readonly
    },
    model: {
      value: _vm.values,
      callback: function($$v) {
        _vm.values = $$v;
      },
      expression: "values"
    }
  }) : _vm.type == "timerange" ? _c("el-time-picker", {
    style: _vm.style,
    attrs: {
      "is-range": "",
      "start-placeholder": (_vm$placeholder3 = _vm.placeholder) === null || _vm$placeholder3 === void 0 ? void 0 : _vm$placeholder3[0],
      "end-placeholder": (_vm$placeholder4 = _vm.placeholder) === null || _vm$placeholder4 === void 0 ? void 0 : _vm$placeholder4[1],
      "disabled": _vm.disabled,
      "value-format": _vm.valueFormat,
      "size": _vm.size,
      "picker-options": _vm.pickerOptions,
      "align": (_vm$options43 = _vm.options) === null || _vm$options43 === void 0 ? void 0 : _vm$options43.align,
      "clearable": (_vm$options44 = _vm.options) === null || _vm$options44 === void 0 ? void 0 : _vm$options44.clearable,
      "editable": (_vm$options45 = _vm.options) === null || _vm$options45 === void 0 ? void 0 : _vm$options45.editable,
      "arrow-control": (_vm$options46 = _vm.options) === null || _vm$options46 === void 0 ? void 0 : _vm$options46.arrowControl,
      "readonly": _vm.readonly
    },
    model: {
      value: _vm.values,
      callback: function($$v) {
        _vm.values = $$v;
      },
      expression: "values"
    }
  }) : _vm.type == "switch" ? _c("el-switch", {
    attrs: {
      "disabled": _vm.disabled,
      "active-text": (_vm$options47 = _vm.options) === null || _vm$options47 === void 0 ? void 0 : _vm$options47.activeText,
      "inactive-text": (_vm$options48 = _vm.options) === null || _vm$options48 === void 0 ? void 0 : _vm$options48.inactiveText,
      "active-color": (_vm$options49 = _vm.options) === null || _vm$options49 === void 0 ? void 0 : _vm$options49.activeColor,
      "inactive-color": (_vm$options50 = _vm.options) === null || _vm$options50 === void 0 ? void 0 : _vm$options50.inactiveColor,
      "active-value": (_vm$options51 = _vm.options) === null || _vm$options51 === void 0 ? void 0 : _vm$options51.activeValue,
      "inactive-value": (_vm$options52 = _vm.options) === null || _vm$options52 === void 0 ? void 0 : _vm$options52.inactiveValue,
      "active-icon-class": (_vm$options53 = _vm.options) === null || _vm$options53 === void 0 ? void 0 : _vm$options53.activeIconClass,
      "inactive-icon-class": (_vm$options54 = _vm.options) === null || _vm$options54 === void 0 ? void 0 : _vm$options54.inactiveIconClass
    },
    model: {
      value: _vm.values,
      callback: function($$v) {
        _vm.values = $$v;
      },
      expression: "values"
    }
  }) : _vm.type == "slider" ? _c("el-slider", {
    attrs: {
      "disabled": _vm.disabled,
      "min": (_vm$options55 = _vm.options) === null || _vm$options55 === void 0 ? void 0 : _vm$options55.min,
      "max": (_vm$options56 = _vm.options) === null || _vm$options56 === void 0 ? void 0 : _vm$options56.max,
      "step": (_vm$options57 = _vm.options) === null || _vm$options57 === void 0 ? void 0 : _vm$options57.step,
      "range": (_vm$options58 = _vm.options) === null || _vm$options58 === void 0 ? void 0 : _vm$options58.range,
      "marks": (_vm$options59 = _vm.options) === null || _vm$options59 === void 0 ? void 0 : _vm$options59.marks,
      "show-stops": (_vm$options60 = _vm.options) === null || _vm$options60 === void 0 ? void 0 : _vm$options60.showStops,
      "show-tooltip": (_vm$options61 = _vm.options) === null || _vm$options61 === void 0 ? void 0 : _vm$options61.showTooltip,
      "vertical": (_vm$options62 = _vm.options) === null || _vm$options62 === void 0 ? void 0 : _vm$options62.vertical
    },
    model: {
      value: _vm.values,
      callback: function($$v) {
        _vm.values = $$v;
      },
      expression: "values"
    }
  }) : _vm.type == "transfer" ? _c("el-form", {
    attrs: {
      "disabled": _vm.disabled
    }
  }, [_c("el-transfer", {
    attrs: {
      "data": _vm.propData,
      "props": _vm.toProps("key"),
      "filterable": (_vm$options63 = _vm.options) === null || _vm$options63 === void 0 ? void 0 : _vm$options63.filterable,
      "filter-method": _vm.filterMethod,
      "filter-placeholder": (_vm$options64 = _vm.options) === null || _vm$options64 === void 0 ? void 0 : _vm$options64.filterPlaceholder,
      "titles": (_vm$options65 = _vm.options) === null || _vm$options65 === void 0 ? void 0 : _vm$options65.titles,
      "button-texts": (_vm$options66 = _vm.options) === null || _vm$options66 === void 0 ? void 0 : _vm$options66.buttonTexts,
      "target-order": (_vm$options67 = _vm.options) === null || _vm$options67 === void 0 ? void 0 : _vm$options67.targetOrder,
      "left-default-checked": (_vm$options68 = _vm.options) === null || _vm$options68 === void 0 ? void 0 : _vm$options68.leftDefaultChecked,
      "right-default-checked": (_vm$options69 = _vm.options) === null || _vm$options69 === void 0 ? void 0 : _vm$options69.rightDefaultChecked
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(_ref) {
        var option = _ref.option;
        return _c("span", {}, [_vm._v(_vm._s(_vm.toFormatString(_vm.props)(option, _vm.format)))]);
      }
    }]),
    model: {
      value: _vm.values,
      callback: function($$v) {
        _vm.values = $$v;
      },
      expression: "values"
    }
  })], 1) : _vm.type == "cascader" ? _c("el-cascader", {
    style: _vm.style,
    attrs: {
      "placeholder": _vm.placeholder,
      "disabled": _vm.disabled,
      "options": _vm.propData,
      "props": _vm.props,
      "clearable": (_vm$options70 = _vm.options) === null || _vm$options70 === void 0 ? void 0 : _vm$options70.clearable,
      "filterable": (_vm$options71 = _vm.options) === null || _vm$options71 === void 0 ? void 0 : _vm$options71.filterable,
      "filter-method": _vm.filterMethod,
      "show-all-levels": (_vm$options72 = _vm.options) === null || _vm$options72 === void 0 ? void 0 : _vm$options72.showAllLevels,
      "separator": (_vm$options73 = _vm.options) === null || _vm$options73 === void 0 ? void 0 : _vm$options73.separator,
      "size": _vm.size,
      "collapse-tags": ""
    },
    model: {
      value: _vm.values,
      callback: function($$v) {
        _vm.values = $$v;
      },
      expression: "values"
    }
  }) : _vm.type == "cascader-panel" ? _c("div", {
    style: Object.assign({
      width: "fit-content"
    }, _vm.disabled ? {
      cursor: "not-allowed",
      opacity: 0.5
    } : null)
  }, [_c("el-cascader-panel", {
    style: Object.assign({
      display: "inline-flex"
    }, _vm.style, {
      pointerEvents: _vm.disabled ? "none" : "inherit"
    }),
    attrs: {
      "options": _vm.propData,
      "props": _vm.props,
      "size": _vm.size
    },
    model: {
      value: _vm.values,
      callback: function($$v) {
        _vm.values = $$v;
      },
      expression: "values"
    }
  })], 1) : _c("el-input", {
    style: _vm.style,
    attrs: {
      "placeholder": _vm.placeholder,
      "disabled": _vm.disabled,
      "clearable": (_vm$options74 = _vm.options) === null || _vm$options74 === void 0 ? void 0 : _vm$options74.clearable,
      "minlength": (_vm$options75 = _vm.options) === null || _vm$options75 === void 0 ? void 0 : _vm$options75.minlength,
      "maxlength": (_vm$options76 = _vm.options) === null || _vm$options76 === void 0 ? void 0 : _vm$options76.maxlength,
      "show-word-limit": (_vm$options77 = _vm.options) === null || _vm$options77 === void 0 ? void 0 : _vm$options77.showWordLimit,
      "prefix-icon": (_vm$options78 = _vm.options) === null || _vm$options78 === void 0 ? void 0 : _vm$options78.prefixIcon,
      "suffix-icon": (_vm$options79 = _vm.options) === null || _vm$options79 === void 0 ? void 0 : _vm$options79.suffixIcon,
      "size": _vm.size,
      "readonly": _vm.readonly
    },
    model: {
      value: _vm.values,
      callback: function($$v) {
        _vm.values = $$v;
      },
      expression: "values"
    }
  });
};
var staticRenderFns$8 = [];
var formItem_vue_vue_type_style_index_0_lang = "";
const __cssModules$8 = {};
var __component__$8 = /* @__PURE__ */ normalizeComponent(
  KlFormItem$1,
  render$8,
  staticRenderFns$8,
  false,
  __vue2_injectStyles$8,
  null,
  null,
  null
);
function __vue2_injectStyles$8(context) {
  for (let o in __cssModules$8) {
    this[o] = __cssModules$8[o];
  }
}
var KlFormItem = /* @__PURE__ */ function() {
  return __component__$8.exports;
}();
var __defProp$8 = Object.defineProperty;
var __getOwnPropDesc$8 = Object.getOwnPropertyDescriptor;
var __decorateClass$8 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$8(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$8(target, key, result);
  return result;
};
let KlFormMixin = class extends mixins(KlBaseMixin) {
  submit(values, action, options) {
  }
};
__decorateClass$8([
  Prop({ default: false })
], KlFormMixin.prototype, "loading", 2);
__decorateClass$8([
  Prop({ default: false })
], KlFormMixin.prototype, "inline", 2);
__decorateClass$8([
  Prop({ default: false })
], KlFormMixin.prototype, "border", 2);
__decorateClass$8([
  Prop()
], KlFormMixin.prototype, "columns", 2);
__decorateClass$8([
  Prop()
], KlFormMixin.prototype, "rules", 2);
__decorateClass$8([
  Prop({ default: void 0 })
], KlFormMixin.prototype, "defaultValues", 2);
__decorateClass$8([
  Prop({ default: 120 })
], KlFormMixin.prototype, "labelWidth", 2);
__decorateClass$8([
  Prop({ default: "right" })
], KlFormMixin.prototype, "labelPosition", 2);
__decorateClass$8([
  Prop({ default: "" })
], KlFormMixin.prototype, "labelSuffix", 2);
__decorateClass$8([
  Prop()
], KlFormMixin.prototype, "validate", 2);
__decorateClass$8([
  Prop({ default: "\u63D0 \u4EA4" })
], KlFormMixin.prototype, "submitName", 2);
__decorateClass$8([
  Prop()
], KlFormMixin.prototype, "options", 2);
__decorateClass$8([
  Prop()
], KlFormMixin.prototype, "uniqueMethod", 2);
__decorateClass$8([
  Prop({ default: false })
], KlFormMixin.prototype, "hideRequiredAsterisk", 2);
__decorateClass$8([
  Prop({ default: false })
], KlFormMixin.prototype, "inlineMessage", 2);
__decorateClass$8([
  Prop({ default: false })
], KlFormMixin.prototype, "statusIcon", 2);
__decorateClass$8([
  Prop({ default: false })
], KlFormMixin.prototype, "disabled", 2);
__decorateClass$8([
  Prop()
], KlFormMixin.prototype, "mergeField", 2);
__decorateClass$8([
  Prop()
], KlFormMixin.prototype, "exclude", 2);
__decorateClass$8([
  Prop()
], KlFormMixin.prototype, "valueFormat", 2);
__decorateClass$8([
  Prop()
], KlFormMixin.prototype, "action", 2);
__decorateClass$8([
  Emit("submit")
], KlFormMixin.prototype, "submit", 1);
KlFormMixin = __decorateClass$8([
  Component({
    name: "KlFormMixin"
  })
], KlFormMixin);
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getAugmentedNamespace(n) {
  if (n.__esModule)
    return n;
  var a = Object.defineProperty({}, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
var dist = {};
var inherits_browser = { exports: {} };
if (typeof Object.create === "function") {
  inherits_browser.exports = function inherits2(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    }
  };
} else {
  inherits_browser.exports = function inherits2(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function() {
      };
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    }
  };
}
var safeBuffer = { exports: {} };
var buffer = {};
var base64Js = {};
base64Js.byteLength = byteLength;
base64Js.toByteArray = toByteArray;
base64Js.fromByteArray = fromByteArray;
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i];
  revLookup[code.charCodeAt(i)] = i;
}
revLookup["-".charCodeAt(0)] = 62;
revLookup["_".charCodeAt(0)] = 63;
function getLens(b64) {
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error("Invalid string. Length must be a multiple of 4");
  }
  var validLen = b64.indexOf("=");
  if (validLen === -1)
    validLen = len;
  var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
  return [validLen, placeHoldersLen];
}
function byteLength(b64) {
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function _byteLength(b64, validLen, placeHoldersLen) {
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function toByteArray(b64) {
  var tmp;
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
  var curByte = 0;
  var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
  var i;
  for (i = 0; i < len; i += 4) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[curByte++] = tmp >> 16 & 255;
    arr[curByte++] = tmp >> 8 & 255;
    arr[curByte++] = tmp & 255;
  }
  if (placeHoldersLen === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[curByte++] = tmp & 255;
  }
  if (placeHoldersLen === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[curByte++] = tmp >> 8 & 255;
    arr[curByte++] = tmp & 255;
  }
  return arr;
}
function tripletToBase64(num) {
  return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
}
function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16 & 16711680) + (uint8[i + 1] << 8 & 65280) + (uint8[i + 2] & 255);
    output.push(tripletToBase64(tmp));
  }
  return output.join("");
}
function fromByteArray(uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3;
  var parts = [];
  var maxChunkLength = 16383;
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  }
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    parts.push(
      lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
    );
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    parts.push(
      lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
    );
  }
  return parts.join("");
}
var ieee754 = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
ieee754.read = function(buffer2, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer2[offset + i];
  i += d;
  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer2[offset + i], i += d, nBits -= 8) {
  }
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer2[offset + i], i += d, nBits -= 8) {
  }
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};
ieee754.write = function(buffer2, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  value = Math.abs(value);
  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer2[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
  }
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer2[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
  }
  buffer2[offset + i - d] |= s * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(exports) {
  var base64 = base64Js;
  var ieee754$1 = ieee754;
  var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
  exports.Buffer = Buffer2;
  exports.SlowBuffer = SlowBuffer;
  exports.INSPECT_MAX_BYTES = 50;
  var K_MAX_LENGTH = 2147483647;
  exports.kMaxLength = K_MAX_LENGTH;
  Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
  if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
    console.error(
      "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
    );
  }
  function typedArraySupport() {
    try {
      var arr = new Uint8Array(1);
      var proto = { foo: function() {
        return 42;
      } };
      Object.setPrototypeOf(proto, Uint8Array.prototype);
      Object.setPrototypeOf(arr, proto);
      return arr.foo() === 42;
    } catch (e) {
      return false;
    }
  }
  Object.defineProperty(Buffer2.prototype, "parent", {
    enumerable: true,
    get: function() {
      if (!Buffer2.isBuffer(this))
        return void 0;
      return this.buffer;
    }
  });
  Object.defineProperty(Buffer2.prototype, "offset", {
    enumerable: true,
    get: function() {
      if (!Buffer2.isBuffer(this))
        return void 0;
      return this.byteOffset;
    }
  });
  function createBuffer(length) {
    if (length > K_MAX_LENGTH) {
      throw new RangeError('The value "' + length + '" is invalid for option "size"');
    }
    var buf = new Uint8Array(length);
    Object.setPrototypeOf(buf, Buffer2.prototype);
    return buf;
  }
  function Buffer2(arg, encodingOrOffset, length) {
    if (typeof arg === "number") {
      if (typeof encodingOrOffset === "string") {
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      }
      return allocUnsafe(arg);
    }
    return from2(arg, encodingOrOffset, length);
  }
  Buffer2.poolSize = 8192;
  function from2(value, encodingOrOffset, length) {
    if (typeof value === "string") {
      return fromString(value, encodingOrOffset);
    }
    if (ArrayBuffer.isView(value)) {
      return fromArrayView(value);
    }
    if (value == null) {
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
      );
    }
    if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
      return fromArrayBuffer(value, encodingOrOffset, length);
    }
    if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
      return fromArrayBuffer(value, encodingOrOffset, length);
    }
    if (typeof value === "number") {
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    }
    var valueOf = value.valueOf && value.valueOf();
    if (valueOf != null && valueOf !== value) {
      return Buffer2.from(valueOf, encodingOrOffset, length);
    }
    var b = fromObject(value);
    if (b)
      return b;
    if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
      return Buffer2.from(
        value[Symbol.toPrimitive]("string"),
        encodingOrOffset,
        length
      );
    }
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
    );
  }
  Buffer2.from = function(value, encodingOrOffset, length) {
    return from2(value, encodingOrOffset, length);
  };
  Object.setPrototypeOf(Buffer2.prototype, Uint8Array.prototype);
  Object.setPrototypeOf(Buffer2, Uint8Array);
  function assertSize(size) {
    if (typeof size !== "number") {
      throw new TypeError('"size" argument must be of type number');
    } else if (size < 0) {
      throw new RangeError('The value "' + size + '" is invalid for option "size"');
    }
  }
  function alloc(size, fill, encoding) {
    assertSize(size);
    if (size <= 0) {
      return createBuffer(size);
    }
    if (fill !== void 0) {
      return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
    }
    return createBuffer(size);
  }
  Buffer2.alloc = function(size, fill, encoding) {
    return alloc(size, fill, encoding);
  };
  function allocUnsafe(size) {
    assertSize(size);
    return createBuffer(size < 0 ? 0 : checked(size) | 0);
  }
  Buffer2.allocUnsafe = function(size) {
    return allocUnsafe(size);
  };
  Buffer2.allocUnsafeSlow = function(size) {
    return allocUnsafe(size);
  };
  function fromString(string, encoding) {
    if (typeof encoding !== "string" || encoding === "") {
      encoding = "utf8";
    }
    if (!Buffer2.isEncoding(encoding)) {
      throw new TypeError("Unknown encoding: " + encoding);
    }
    var length = byteLength2(string, encoding) | 0;
    var buf = createBuffer(length);
    var actual = buf.write(string, encoding);
    if (actual !== length) {
      buf = buf.slice(0, actual);
    }
    return buf;
  }
  function fromArrayLike(array) {
    var length = array.length < 0 ? 0 : checked(array.length) | 0;
    var buf = createBuffer(length);
    for (var i = 0; i < length; i += 1) {
      buf[i] = array[i] & 255;
    }
    return buf;
  }
  function fromArrayView(arrayView) {
    if (isInstance(arrayView, Uint8Array)) {
      var copy = new Uint8Array(arrayView);
      return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
    }
    return fromArrayLike(arrayView);
  }
  function fromArrayBuffer(array, byteOffset, length) {
    if (byteOffset < 0 || array.byteLength < byteOffset) {
      throw new RangeError('"offset" is outside of buffer bounds');
    }
    if (array.byteLength < byteOffset + (length || 0)) {
      throw new RangeError('"length" is outside of buffer bounds');
    }
    var buf;
    if (byteOffset === void 0 && length === void 0) {
      buf = new Uint8Array(array);
    } else if (length === void 0) {
      buf = new Uint8Array(array, byteOffset);
    } else {
      buf = new Uint8Array(array, byteOffset, length);
    }
    Object.setPrototypeOf(buf, Buffer2.prototype);
    return buf;
  }
  function fromObject(obj) {
    if (Buffer2.isBuffer(obj)) {
      var len = checked(obj.length) | 0;
      var buf = createBuffer(len);
      if (buf.length === 0) {
        return buf;
      }
      obj.copy(buf, 0, 0, len);
      return buf;
    }
    if (obj.length !== void 0) {
      if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
        return createBuffer(0);
      }
      return fromArrayLike(obj);
    }
    if (obj.type === "Buffer" && Array.isArray(obj.data)) {
      return fromArrayLike(obj.data);
    }
  }
  function checked(length) {
    if (length >= K_MAX_LENGTH) {
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
    }
    return length | 0;
  }
  function SlowBuffer(length) {
    if (+length != length) {
      length = 0;
    }
    return Buffer2.alloc(+length);
  }
  Buffer2.isBuffer = function isBuffer(b) {
    return b != null && b._isBuffer === true && b !== Buffer2.prototype;
  };
  Buffer2.compare = function compare(a, b) {
    if (isInstance(a, Uint8Array))
      a = Buffer2.from(a, a.offset, a.byteLength);
    if (isInstance(b, Uint8Array))
      b = Buffer2.from(b, b.offset, b.byteLength);
    if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    }
    if (a === b)
      return 0;
    var x = a.length;
    var y = b.length;
    for (var i = 0, len = Math.min(x, y); i < len; ++i) {
      if (a[i] !== b[i]) {
        x = a[i];
        y = b[i];
        break;
      }
    }
    if (x < y)
      return -1;
    if (y < x)
      return 1;
    return 0;
  };
  Buffer2.isEncoding = function isEncoding2(encoding) {
    switch (String(encoding).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return true;
      default:
        return false;
    }
  };
  Buffer2.concat = function concat(list, length) {
    if (!Array.isArray(list)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }
    if (list.length === 0) {
      return Buffer2.alloc(0);
    }
    var i;
    if (length === void 0) {
      length = 0;
      for (i = 0; i < list.length; ++i) {
        length += list[i].length;
      }
    }
    var buffer2 = Buffer2.allocUnsafe(length);
    var pos = 0;
    for (i = 0; i < list.length; ++i) {
      var buf = list[i];
      if (isInstance(buf, Uint8Array)) {
        if (pos + buf.length > buffer2.length) {
          Buffer2.from(buf).copy(buffer2, pos);
        } else {
          Uint8Array.prototype.set.call(
            buffer2,
            buf,
            pos
          );
        }
      } else if (!Buffer2.isBuffer(buf)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      } else {
        buf.copy(buffer2, pos);
      }
      pos += buf.length;
    }
    return buffer2;
  };
  function byteLength2(string, encoding) {
    if (Buffer2.isBuffer(string)) {
      return string.length;
    }
    if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
      return string.byteLength;
    }
    if (typeof string !== "string") {
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
      );
    }
    var len = string.length;
    var mustMatch = arguments.length > 2 && arguments[2] === true;
    if (!mustMatch && len === 0)
      return 0;
    var loweredCase = false;
    for (; ; ) {
      switch (encoding) {
        case "ascii":
        case "latin1":
        case "binary":
          return len;
        case "utf8":
        case "utf-8":
          return utf8ToBytes(string).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return len * 2;
        case "hex":
          return len >>> 1;
        case "base64":
          return base64ToBytes(string).length;
        default:
          if (loweredCase) {
            return mustMatch ? -1 : utf8ToBytes(string).length;
          }
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer2.byteLength = byteLength2;
  function slowToString(encoding, start, end) {
    var loweredCase = false;
    if (start === void 0 || start < 0) {
      start = 0;
    }
    if (start > this.length) {
      return "";
    }
    if (end === void 0 || end > this.length) {
      end = this.length;
    }
    if (end <= 0) {
      return "";
    }
    end >>>= 0;
    start >>>= 0;
    if (end <= start) {
      return "";
    }
    if (!encoding)
      encoding = "utf8";
    while (true) {
      switch (encoding) {
        case "hex":
          return hexSlice(this, start, end);
        case "utf8":
        case "utf-8":
          return utf8Slice(this, start, end);
        case "ascii":
          return asciiSlice(this, start, end);
        case "latin1":
        case "binary":
          return latin1Slice(this, start, end);
        case "base64":
          return base64Slice(this, start, end);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return utf16leSlice(this, start, end);
        default:
          if (loweredCase)
            throw new TypeError("Unknown encoding: " + encoding);
          encoding = (encoding + "").toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer2.prototype._isBuffer = true;
  function swap(b, n, m) {
    var i = b[n];
    b[n] = b[m];
    b[m] = i;
  }
  Buffer2.prototype.swap16 = function swap16() {
    var len = this.length;
    if (len % 2 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    }
    for (var i = 0; i < len; i += 2) {
      swap(this, i, i + 1);
    }
    return this;
  };
  Buffer2.prototype.swap32 = function swap32() {
    var len = this.length;
    if (len % 4 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    }
    for (var i = 0; i < len; i += 4) {
      swap(this, i, i + 3);
      swap(this, i + 1, i + 2);
    }
    return this;
  };
  Buffer2.prototype.swap64 = function swap64() {
    var len = this.length;
    if (len % 8 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    }
    for (var i = 0; i < len; i += 8) {
      swap(this, i, i + 7);
      swap(this, i + 1, i + 6);
      swap(this, i + 2, i + 5);
      swap(this, i + 3, i + 4);
    }
    return this;
  };
  Buffer2.prototype.toString = function toString() {
    var length = this.length;
    if (length === 0)
      return "";
    if (arguments.length === 0)
      return utf8Slice(this, 0, length);
    return slowToString.apply(this, arguments);
  };
  Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
  Buffer2.prototype.equals = function equals(b) {
    if (!Buffer2.isBuffer(b))
      throw new TypeError("Argument must be a Buffer");
    if (this === b)
      return true;
    return Buffer2.compare(this, b) === 0;
  };
  Buffer2.prototype.inspect = function inspect2() {
    var str = "";
    var max = exports.INSPECT_MAX_BYTES;
    str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
    if (this.length > max)
      str += " ... ";
    return "<Buffer " + str + ">";
  };
  if (customInspectSymbol) {
    Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
  }
  Buffer2.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
    if (isInstance(target, Uint8Array)) {
      target = Buffer2.from(target, target.offset, target.byteLength);
    }
    if (!Buffer2.isBuffer(target)) {
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
      );
    }
    if (start === void 0) {
      start = 0;
    }
    if (end === void 0) {
      end = target ? target.length : 0;
    }
    if (thisStart === void 0) {
      thisStart = 0;
    }
    if (thisEnd === void 0) {
      thisEnd = this.length;
    }
    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
      throw new RangeError("out of range index");
    }
    if (thisStart >= thisEnd && start >= end) {
      return 0;
    }
    if (thisStart >= thisEnd) {
      return -1;
    }
    if (start >= end) {
      return 1;
    }
    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;
    if (this === target)
      return 0;
    var x = thisEnd - thisStart;
    var y = end - start;
    var len = Math.min(x, y);
    var thisCopy = this.slice(thisStart, thisEnd);
    var targetCopy = target.slice(start, end);
    for (var i = 0; i < len; ++i) {
      if (thisCopy[i] !== targetCopy[i]) {
        x = thisCopy[i];
        y = targetCopy[i];
        break;
      }
    }
    if (x < y)
      return -1;
    if (y < x)
      return 1;
    return 0;
  };
  function bidirectionalIndexOf(buffer2, val, byteOffset, encoding, dir) {
    if (buffer2.length === 0)
      return -1;
    if (typeof byteOffset === "string") {
      encoding = byteOffset;
      byteOffset = 0;
    } else if (byteOffset > 2147483647) {
      byteOffset = 2147483647;
    } else if (byteOffset < -2147483648) {
      byteOffset = -2147483648;
    }
    byteOffset = +byteOffset;
    if (numberIsNaN(byteOffset)) {
      byteOffset = dir ? 0 : buffer2.length - 1;
    }
    if (byteOffset < 0)
      byteOffset = buffer2.length + byteOffset;
    if (byteOffset >= buffer2.length) {
      if (dir)
        return -1;
      else
        byteOffset = buffer2.length - 1;
    } else if (byteOffset < 0) {
      if (dir)
        byteOffset = 0;
      else
        return -1;
    }
    if (typeof val === "string") {
      val = Buffer2.from(val, encoding);
    }
    if (Buffer2.isBuffer(val)) {
      if (val.length === 0) {
        return -1;
      }
      return arrayIndexOf(buffer2, val, byteOffset, encoding, dir);
    } else if (typeof val === "number") {
      val = val & 255;
      if (typeof Uint8Array.prototype.indexOf === "function") {
        if (dir) {
          return Uint8Array.prototype.indexOf.call(buffer2, val, byteOffset);
        } else {
          return Uint8Array.prototype.lastIndexOf.call(buffer2, val, byteOffset);
        }
      }
      return arrayIndexOf(buffer2, [val], byteOffset, encoding, dir);
    }
    throw new TypeError("val must be string, number or Buffer");
  }
  function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
    var indexSize = 1;
    var arrLength = arr.length;
    var valLength = val.length;
    if (encoding !== void 0) {
      encoding = String(encoding).toLowerCase();
      if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
        if (arr.length < 2 || val.length < 2) {
          return -1;
        }
        indexSize = 2;
        arrLength /= 2;
        valLength /= 2;
        byteOffset /= 2;
      }
    }
    function read(buf, i2) {
      if (indexSize === 1) {
        return buf[i2];
      } else {
        return buf.readUInt16BE(i2 * indexSize);
      }
    }
    var i;
    if (dir) {
      var foundIndex = -1;
      for (i = byteOffset; i < arrLength; i++) {
        if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
          if (foundIndex === -1)
            foundIndex = i;
          if (i - foundIndex + 1 === valLength)
            return foundIndex * indexSize;
        } else {
          if (foundIndex !== -1)
            i -= i - foundIndex;
          foundIndex = -1;
        }
      }
    } else {
      if (byteOffset + valLength > arrLength)
        byteOffset = arrLength - valLength;
      for (i = byteOffset; i >= 0; i--) {
        var found = true;
        for (var j = 0; j < valLength; j++) {
          if (read(arr, i + j) !== read(val, j)) {
            found = false;
            break;
          }
        }
        if (found)
          return i;
      }
    }
    return -1;
  }
  Buffer2.prototype.includes = function includes2(val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1;
  };
  Buffer2.prototype.indexOf = function indexOf2(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
  };
  Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
  };
  function hexWrite(buf, string, offset, length) {
    offset = Number(offset) || 0;
    var remaining = buf.length - offset;
    if (!length) {
      length = remaining;
    } else {
      length = Number(length);
      if (length > remaining) {
        length = remaining;
      }
    }
    var strLen = string.length;
    if (length > strLen / 2) {
      length = strLen / 2;
    }
    for (var i = 0; i < length; ++i) {
      var parsed = parseInt(string.substr(i * 2, 2), 16);
      if (numberIsNaN(parsed))
        return i;
      buf[offset + i] = parsed;
    }
    return i;
  }
  function utf8Write(buf, string, offset, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
  }
  function asciiWrite(buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length);
  }
  function base64Write(buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length);
  }
  function ucs2Write(buf, string, offset, length) {
    return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
  }
  Buffer2.prototype.write = function write(string, offset, length, encoding) {
    if (offset === void 0) {
      encoding = "utf8";
      length = this.length;
      offset = 0;
    } else if (length === void 0 && typeof offset === "string") {
      encoding = offset;
      length = this.length;
      offset = 0;
    } else if (isFinite(offset)) {
      offset = offset >>> 0;
      if (isFinite(length)) {
        length = length >>> 0;
        if (encoding === void 0)
          encoding = "utf8";
      } else {
        encoding = length;
        length = void 0;
      }
    } else {
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    }
    var remaining = this.length - offset;
    if (length === void 0 || length > remaining)
      length = remaining;
    if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
      throw new RangeError("Attempt to write outside buffer bounds");
    }
    if (!encoding)
      encoding = "utf8";
    var loweredCase = false;
    for (; ; ) {
      switch (encoding) {
        case "hex":
          return hexWrite(this, string, offset, length);
        case "utf8":
        case "utf-8":
          return utf8Write(this, string, offset, length);
        case "ascii":
        case "latin1":
        case "binary":
          return asciiWrite(this, string, offset, length);
        case "base64":
          return base64Write(this, string, offset, length);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ucs2Write(this, string, offset, length);
        default:
          if (loweredCase)
            throw new TypeError("Unknown encoding: " + encoding);
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  };
  Buffer2.prototype.toJSON = function toJSON() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) {
      return base64.fromByteArray(buf);
    } else {
      return base64.fromByteArray(buf.slice(start, end));
    }
  }
  function utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end);
    var res = [];
    var i = start;
    while (i < end) {
      var firstByte = buf[i];
      var codePoint = null;
      var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
      if (i + bytesPerSequence <= end) {
        var secondByte, thirdByte, fourthByte, tempCodePoint;
        switch (bytesPerSequence) {
          case 1:
            if (firstByte < 128) {
              codePoint = firstByte;
            }
            break;
          case 2:
            secondByte = buf[i + 1];
            if ((secondByte & 192) === 128) {
              tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
              if (tempCodePoint > 127) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 3:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
              if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 4:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            fourthByte = buf[i + 3];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
              if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                codePoint = tempCodePoint;
              }
            }
        }
      }
      if (codePoint === null) {
        codePoint = 65533;
        bytesPerSequence = 1;
      } else if (codePoint > 65535) {
        codePoint -= 65536;
        res.push(codePoint >>> 10 & 1023 | 55296);
        codePoint = 56320 | codePoint & 1023;
      }
      res.push(codePoint);
      i += bytesPerSequence;
    }
    return decodeCodePointsArray(res);
  }
  var MAX_ARGUMENTS_LENGTH = 4096;
  function decodeCodePointsArray(codePoints) {
    var len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) {
      return String.fromCharCode.apply(String, codePoints);
    }
    var res = "";
    var i = 0;
    while (i < len) {
      res += String.fromCharCode.apply(
        String,
        codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
      );
    }
    return res;
  }
  function asciiSlice(buf, start, end) {
    var ret = "";
    end = Math.min(buf.length, end);
    for (var i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i] & 127);
    }
    return ret;
  }
  function latin1Slice(buf, start, end) {
    var ret = "";
    end = Math.min(buf.length, end);
    for (var i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i]);
    }
    return ret;
  }
  function hexSlice(buf, start, end) {
    var len = buf.length;
    if (!start || start < 0)
      start = 0;
    if (!end || end < 0 || end > len)
      end = len;
    var out = "";
    for (var i = start; i < end; ++i) {
      out += hexSliceLookupTable[buf[i]];
    }
    return out;
  }
  function utf16leSlice(buf, start, end) {
    var bytes = buf.slice(start, end);
    var res = "";
    for (var i = 0; i < bytes.length - 1; i += 2) {
      res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    }
    return res;
  }
  Buffer2.prototype.slice = function slice(start, end) {
    var len = this.length;
    start = ~~start;
    end = end === void 0 ? len : ~~end;
    if (start < 0) {
      start += len;
      if (start < 0)
        start = 0;
    } else if (start > len) {
      start = len;
    }
    if (end < 0) {
      end += len;
      if (end < 0)
        end = 0;
    } else if (end > len) {
      end = len;
    }
    if (end < start)
      end = start;
    var newBuf = this.subarray(start, end);
    Object.setPrototypeOf(newBuf, Buffer2.prototype);
    return newBuf;
  };
  function checkOffset(offset, ext, length) {
    if (offset % 1 !== 0 || offset < 0)
      throw new RangeError("offset is not uint");
    if (offset + ext > length)
      throw new RangeError("Trying to access beyond buffer length");
  }
  Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE(offset, byteLength3, noAssert) {
    offset = offset >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert)
      checkOffset(offset, byteLength3, this.length);
    var val = this[offset];
    var mul = 1;
    var i = 0;
    while (++i < byteLength3 && (mul *= 256)) {
      val += this[offset + i] * mul;
    }
    return val;
  };
  Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength3, noAssert) {
    offset = offset >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert) {
      checkOffset(offset, byteLength3, this.length);
    }
    var val = this[offset + --byteLength3];
    var mul = 1;
    while (byteLength3 > 0 && (mul *= 256)) {
      val += this[offset + --byteLength3] * mul;
    }
    return val;
  };
  Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 1, this.length);
    return this[offset];
  };
  Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    return this[offset] | this[offset + 1] << 8;
  };
  Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    return this[offset] << 8 | this[offset + 1];
  };
  Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
  };
  Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
  };
  Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength3, noAssert) {
    offset = offset >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert)
      checkOffset(offset, byteLength3, this.length);
    var val = this[offset];
    var mul = 1;
    var i = 0;
    while (++i < byteLength3 && (mul *= 256)) {
      val += this[offset + i] * mul;
    }
    mul *= 128;
    if (val >= mul)
      val -= Math.pow(2, 8 * byteLength3);
    return val;
  };
  Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength3, noAssert) {
    offset = offset >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert)
      checkOffset(offset, byteLength3, this.length);
    var i = byteLength3;
    var mul = 1;
    var val = this[offset + --i];
    while (i > 0 && (mul *= 256)) {
      val += this[offset + --i] * mul;
    }
    mul *= 128;
    if (val >= mul)
      val -= Math.pow(2, 8 * byteLength3);
    return val;
  };
  Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 1, this.length);
    if (!(this[offset] & 128))
      return this[offset];
    return (255 - this[offset] + 1) * -1;
  };
  Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    var val = this[offset] | this[offset + 1] << 8;
    return val & 32768 ? val | 4294901760 : val;
  };
  Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    var val = this[offset + 1] | this[offset] << 8;
    return val & 32768 ? val | 4294901760 : val;
  };
  Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
  };
  Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
  };
  Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return ieee754$1.read(this, offset, true, 23, 4);
  };
  Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return ieee754$1.read(this, offset, false, 23, 4);
  };
  Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 8, this.length);
    return ieee754$1.read(this, offset, true, 52, 8);
  };
  Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 8, this.length);
    return ieee754$1.read(this, offset, false, 52, 8);
  };
  function checkInt(buf, value, offset, ext, max, min) {
    if (!Buffer2.isBuffer(buf))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (value > max || value < min)
      throw new RangeError('"value" argument is out of bounds');
    if (offset + ext > buf.length)
      throw new RangeError("Index out of range");
  }
  Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength3, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert) {
      var maxBytes = Math.pow(2, 8 * byteLength3) - 1;
      checkInt(this, value, offset, byteLength3, maxBytes, 0);
    }
    var mul = 1;
    var i = 0;
    this[offset] = value & 255;
    while (++i < byteLength3 && (mul *= 256)) {
      this[offset + i] = value / mul & 255;
    }
    return offset + byteLength3;
  };
  Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength3, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert) {
      var maxBytes = Math.pow(2, 8 * byteLength3) - 1;
      checkInt(this, value, offset, byteLength3, maxBytes, 0);
    }
    var i = byteLength3 - 1;
    var mul = 1;
    this[offset + i] = value & 255;
    while (--i >= 0 && (mul *= 256)) {
      this[offset + i] = value / mul & 255;
    }
    return offset + byteLength3;
  };
  Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 1, 255, 0);
    this[offset] = value & 255;
    return offset + 1;
  };
  Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 65535, 0);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    return offset + 2;
  };
  Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 65535, 0);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 255;
    return offset + 2;
  };
  Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 4294967295, 0);
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 255;
    return offset + 4;
  };
  Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 4294967295, 0);
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 255;
    return offset + 4;
  };
  Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength3, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength3 - 1);
      checkInt(this, value, offset, byteLength3, limit - 1, -limit);
    }
    var i = 0;
    var mul = 1;
    var sub = 0;
    this[offset] = value & 255;
    while (++i < byteLength3 && (mul *= 256)) {
      if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = (value / mul >> 0) - sub & 255;
    }
    return offset + byteLength3;
  };
  Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength3, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength3 - 1);
      checkInt(this, value, offset, byteLength3, limit - 1, -limit);
    }
    var i = byteLength3 - 1;
    var mul = 1;
    var sub = 0;
    this[offset + i] = value & 255;
    while (--i >= 0 && (mul *= 256)) {
      if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = (value / mul >> 0) - sub & 255;
    }
    return offset + byteLength3;
  };
  Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 1, 127, -128);
    if (value < 0)
      value = 255 + value + 1;
    this[offset] = value & 255;
    return offset + 1;
  };
  Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 32767, -32768);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    return offset + 2;
  };
  Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 32767, -32768);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 255;
    return offset + 2;
  };
  Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 2147483647, -2147483648);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
    return offset + 4;
  };
  Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 2147483647, -2147483648);
    if (value < 0)
      value = 4294967295 + value + 1;
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 255;
    return offset + 4;
  };
  function checkIEEE754(buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length)
      throw new RangeError("Index out of range");
    if (offset < 0)
      throw new RangeError("Index out of range");
  }
  function writeFloat(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 4);
    }
    ieee754$1.write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4;
  }
  Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
    return writeFloat(this, value, offset, true, noAssert);
  };
  Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
    return writeFloat(this, value, offset, false, noAssert);
  };
  function writeDouble(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 8);
    }
    ieee754$1.write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8;
  }
  Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
    return writeDouble(this, value, offset, true, noAssert);
  };
  Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
    return writeDouble(this, value, offset, false, noAssert);
  };
  Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
    if (!Buffer2.isBuffer(target))
      throw new TypeError("argument should be a Buffer");
    if (!start)
      start = 0;
    if (!end && end !== 0)
      end = this.length;
    if (targetStart >= target.length)
      targetStart = target.length;
    if (!targetStart)
      targetStart = 0;
    if (end > 0 && end < start)
      end = start;
    if (end === start)
      return 0;
    if (target.length === 0 || this.length === 0)
      return 0;
    if (targetStart < 0) {
      throw new RangeError("targetStart out of bounds");
    }
    if (start < 0 || start >= this.length)
      throw new RangeError("Index out of range");
    if (end < 0)
      throw new RangeError("sourceEnd out of bounds");
    if (end > this.length)
      end = this.length;
    if (target.length - targetStart < end - start) {
      end = target.length - targetStart + start;
    }
    var len = end - start;
    if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
      this.copyWithin(targetStart, start, end);
    } else {
      Uint8Array.prototype.set.call(
        target,
        this.subarray(start, end),
        targetStart
      );
    }
    return len;
  };
  Buffer2.prototype.fill = function fill(val, start, end, encoding) {
    if (typeof val === "string") {
      if (typeof start === "string") {
        encoding = start;
        start = 0;
        end = this.length;
      } else if (typeof end === "string") {
        encoding = end;
        end = this.length;
      }
      if (encoding !== void 0 && typeof encoding !== "string") {
        throw new TypeError("encoding must be a string");
      }
      if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      if (val.length === 1) {
        var code2 = val.charCodeAt(0);
        if (encoding === "utf8" && code2 < 128 || encoding === "latin1") {
          val = code2;
        }
      }
    } else if (typeof val === "number") {
      val = val & 255;
    } else if (typeof val === "boolean") {
      val = Number(val);
    }
    if (start < 0 || this.length < start || this.length < end) {
      throw new RangeError("Out of range index");
    }
    if (end <= start) {
      return this;
    }
    start = start >>> 0;
    end = end === void 0 ? this.length : end >>> 0;
    if (!val)
      val = 0;
    var i;
    if (typeof val === "number") {
      for (i = start; i < end; ++i) {
        this[i] = val;
      }
    } else {
      var bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
      var len = bytes.length;
      if (len === 0) {
        throw new TypeError('The value "' + val + '" is invalid for argument "value"');
      }
      for (i = 0; i < end - start; ++i) {
        this[i + start] = bytes[i % len];
      }
    }
    return this;
  };
  var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
  function base64clean(str) {
    str = str.split("=")[0];
    str = str.trim().replace(INVALID_BASE64_RE, "");
    if (str.length < 2)
      return "";
    while (str.length % 4 !== 0) {
      str = str + "=";
    }
    return str;
  }
  function utf8ToBytes(string, units) {
    units = units || Infinity;
    var codePoint;
    var length = string.length;
    var leadSurrogate = null;
    var bytes = [];
    for (var i = 0; i < length; ++i) {
      codePoint = string.charCodeAt(i);
      if (codePoint > 55295 && codePoint < 57344) {
        if (!leadSurrogate) {
          if (codePoint > 56319) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            continue;
          } else if (i + 1 === length) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            continue;
          }
          leadSurrogate = codePoint;
          continue;
        }
        if (codePoint < 56320) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
          leadSurrogate = codePoint;
          continue;
        }
        codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
      } else if (leadSurrogate) {
        if ((units -= 3) > -1)
          bytes.push(239, 191, 189);
      }
      leadSurrogate = null;
      if (codePoint < 128) {
        if ((units -= 1) < 0)
          break;
        bytes.push(codePoint);
      } else if (codePoint < 2048) {
        if ((units -= 2) < 0)
          break;
        bytes.push(
          codePoint >> 6 | 192,
          codePoint & 63 | 128
        );
      } else if (codePoint < 65536) {
        if ((units -= 3) < 0)
          break;
        bytes.push(
          codePoint >> 12 | 224,
          codePoint >> 6 & 63 | 128,
          codePoint & 63 | 128
        );
      } else if (codePoint < 1114112) {
        if ((units -= 4) < 0)
          break;
        bytes.push(
          codePoint >> 18 | 240,
          codePoint >> 12 & 63 | 128,
          codePoint >> 6 & 63 | 128,
          codePoint & 63 | 128
        );
      } else {
        throw new Error("Invalid code point");
      }
    }
    return bytes;
  }
  function asciiToBytes(str) {
    var byteArray = [];
    for (var i = 0; i < str.length; ++i) {
      byteArray.push(str.charCodeAt(i) & 255);
    }
    return byteArray;
  }
  function utf16leToBytes(str, units) {
    var c, hi, lo;
    var byteArray = [];
    for (var i = 0; i < str.length; ++i) {
      if ((units -= 2) < 0)
        break;
      c = str.charCodeAt(i);
      hi = c >> 8;
      lo = c % 256;
      byteArray.push(lo);
      byteArray.push(hi);
    }
    return byteArray;
  }
  function base64ToBytes(str) {
    return base64.toByteArray(base64clean(str));
  }
  function blitBuffer(src, dst, offset, length) {
    for (var i = 0; i < length; ++i) {
      if (i + offset >= dst.length || i >= src.length)
        break;
      dst[i + offset] = src[i];
    }
    return i;
  }
  function isInstance(obj, type) {
    return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
  }
  function numberIsNaN(obj) {
    return obj !== obj;
  }
  var hexSliceLookupTable = function() {
    var alphabet = "0123456789abcdef";
    var table2 = new Array(256);
    for (var i = 0; i < 16; ++i) {
      var i16 = i * 16;
      for (var j = 0; j < 16; ++j) {
        table2[i16 + j] = alphabet[i] + alphabet[j];
      }
    }
    return table2;
  }();
})(buffer);
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
(function(module, exports) {
  var buffer$1 = buffer;
  var Buffer2 = buffer$1.Buffer;
  function copyProps(src, dst) {
    for (var key in src) {
      dst[key] = src[key];
    }
  }
  if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
    module.exports = buffer$1;
  } else {
    copyProps(buffer$1, exports);
    exports.Buffer = SafeBuffer;
  }
  function SafeBuffer(arg, encodingOrOffset, length) {
    return Buffer2(arg, encodingOrOffset, length);
  }
  SafeBuffer.prototype = Object.create(Buffer2.prototype);
  copyProps(Buffer2, SafeBuffer);
  SafeBuffer.from = function(arg, encodingOrOffset, length) {
    if (typeof arg === "number") {
      throw new TypeError("Argument must not be a number");
    }
    return Buffer2(arg, encodingOrOffset, length);
  };
  SafeBuffer.alloc = function(size, fill, encoding) {
    if (typeof size !== "number") {
      throw new TypeError("Argument must be a number");
    }
    var buf = Buffer2(size);
    if (fill !== void 0) {
      if (typeof encoding === "string") {
        buf.fill(fill, encoding);
      } else {
        buf.fill(fill);
      }
    } else {
      buf.fill(0);
    }
    return buf;
  };
  SafeBuffer.allocUnsafe = function(size) {
    if (typeof size !== "number") {
      throw new TypeError("Argument must be a number");
    }
    return Buffer2(size);
  };
  SafeBuffer.allocUnsafeSlow = function(size) {
    if (typeof size !== "number") {
      throw new TypeError("Argument must be a number");
    }
    return buffer$1.SlowBuffer(size);
  };
})(safeBuffer, safeBuffer.exports);
var readableBrowser = { exports: {} };
var __viteBrowserExternal = {};
var __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": __viteBrowserExternal
}, Symbol.toStringTag, { value: "Module" }));
var require$$3 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
var streamBrowser = require$$3.EventEmitter;
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty$1(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$1(obj, key, value) {
  key = _toPropertyKey$1(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey$1(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _toPropertyKey$1(arg) {
  var key = _toPrimitive$1(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
function _toPrimitive$1(input, hint) {
  if (typeof input !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var _require$2 = buffer, Buffer$5 = _require$2.Buffer;
var _require2 = require$$3, inspect = _require2.inspect;
var custom = inspect && inspect.custom || "inspect";
function copyBuffer(src, target, offset) {
  Buffer$5.prototype.copy.call(src, target, offset);
}
var buffer_list = /* @__PURE__ */ function() {
  function BufferList2() {
    _classCallCheck(this, BufferList2);
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  _createClass(BufferList2, [{
    key: "push",
    value: function push(v) {
      var entry = {
        data: v,
        next: null
      };
      if (this.length > 0)
        this.tail.next = entry;
      else
        this.head = entry;
      this.tail = entry;
      ++this.length;
    }
  }, {
    key: "unshift",
    value: function unshift(v) {
      var entry = {
        data: v,
        next: this.head
      };
      if (this.length === 0)
        this.tail = entry;
      this.head = entry;
      ++this.length;
    }
  }, {
    key: "shift",
    value: function shift() {
      if (this.length === 0)
        return;
      var ret = this.head.data;
      if (this.length === 1)
        this.head = this.tail = null;
      else
        this.head = this.head.next;
      --this.length;
      return ret;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.head = this.tail = null;
      this.length = 0;
    }
  }, {
    key: "join",
    value: function join(s) {
      if (this.length === 0)
        return "";
      var p = this.head;
      var ret = "" + p.data;
      while (p = p.next)
        ret += s + p.data;
      return ret;
    }
  }, {
    key: "concat",
    value: function concat(n) {
      if (this.length === 0)
        return Buffer$5.alloc(0);
      var ret = Buffer$5.allocUnsafe(n >>> 0);
      var p = this.head;
      var i = 0;
      while (p) {
        copyBuffer(p.data, ret, i);
        i += p.data.length;
        p = p.next;
      }
      return ret;
    }
  }, {
    key: "consume",
    value: function consume(n, hasStrings) {
      var ret;
      if (n < this.head.data.length) {
        ret = this.head.data.slice(0, n);
        this.head.data = this.head.data.slice(n);
      } else if (n === this.head.data.length) {
        ret = this.shift();
      } else {
        ret = hasStrings ? this._getString(n) : this._getBuffer(n);
      }
      return ret;
    }
  }, {
    key: "first",
    value: function first() {
      return this.head.data;
    }
  }, {
    key: "_getString",
    value: function _getString(n) {
      var p = this.head;
      var c = 1;
      var ret = p.data;
      n -= ret.length;
      while (p = p.next) {
        var str = p.data;
        var nb = n > str.length ? str.length : n;
        if (nb === str.length)
          ret += str;
        else
          ret += str.slice(0, n);
        n -= nb;
        if (n === 0) {
          if (nb === str.length) {
            ++c;
            if (p.next)
              this.head = p.next;
            else
              this.head = this.tail = null;
          } else {
            this.head = p;
            p.data = str.slice(nb);
          }
          break;
        }
        ++c;
      }
      this.length -= c;
      return ret;
    }
  }, {
    key: "_getBuffer",
    value: function _getBuffer(n) {
      var ret = Buffer$5.allocUnsafe(n);
      var p = this.head;
      var c = 1;
      p.data.copy(ret);
      n -= p.data.length;
      while (p = p.next) {
        var buf = p.data;
        var nb = n > buf.length ? buf.length : n;
        buf.copy(ret, ret.length - n, 0, nb);
        n -= nb;
        if (n === 0) {
          if (nb === buf.length) {
            ++c;
            if (p.next)
              this.head = p.next;
            else
              this.head = this.tail = null;
          } else {
            this.head = p;
            p.data = buf.slice(nb);
          }
          break;
        }
        ++c;
      }
      this.length -= c;
      return ret;
    }
  }, {
    key: custom,
    value: function value(_2, options) {
      return inspect(this, _objectSpread(_objectSpread({}, options), {}, {
        depth: 0,
        customInspect: false
      }));
    }
  }]);
  return BufferList2;
}();
function destroy(err, cb) {
  var _this = this;
  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;
  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err) {
      if (!this._writableState) {
        process.nextTick(emitErrorNT, this, err);
      } else if (!this._writableState.errorEmitted) {
        this._writableState.errorEmitted = true;
        process.nextTick(emitErrorNT, this, err);
      }
    }
    return this;
  }
  if (this._readableState) {
    this._readableState.destroyed = true;
  }
  if (this._writableState) {
    this._writableState.destroyed = true;
  }
  this._destroy(err || null, function(err2) {
    if (!cb && err2) {
      if (!_this._writableState) {
        process.nextTick(emitErrorAndCloseNT, _this, err2);
      } else if (!_this._writableState.errorEmitted) {
        _this._writableState.errorEmitted = true;
        process.nextTick(emitErrorAndCloseNT, _this, err2);
      } else {
        process.nextTick(emitCloseNT, _this);
      }
    } else if (cb) {
      process.nextTick(emitCloseNT, _this);
      cb(err2);
    } else {
      process.nextTick(emitCloseNT, _this);
    }
  });
  return this;
}
function emitErrorAndCloseNT(self2, err) {
  emitErrorNT(self2, err);
  emitCloseNT(self2);
}
function emitCloseNT(self2) {
  if (self2._writableState && !self2._writableState.emitClose)
    return;
  if (self2._readableState && !self2._readableState.emitClose)
    return;
  self2.emit("close");
}
function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }
  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finalCalled = false;
    this._writableState.prefinished = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}
function emitErrorNT(self2, err) {
  self2.emit("error", err);
}
function errorOrDestroy$2(stream, err) {
  var rState = stream._readableState;
  var wState = stream._writableState;
  if (rState && rState.autoDestroy || wState && wState.autoDestroy)
    stream.destroy(err);
  else
    stream.emit("error", err);
}
var destroy_1 = {
  destroy,
  undestroy,
  errorOrDestroy: errorOrDestroy$2
};
var errorsBrowser = {};
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
var codes = {};
function createErrorType(code2, message2, Base) {
  if (!Base) {
    Base = Error;
  }
  function getMessage(arg1, arg2, arg3) {
    if (typeof message2 === "string") {
      return message2;
    } else {
      return message2(arg1, arg2, arg3);
    }
  }
  var NodeError = /* @__PURE__ */ function(_Base) {
    _inheritsLoose(NodeError2, _Base);
    function NodeError2(arg1, arg2, arg3) {
      return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
    }
    return NodeError2;
  }(Base);
  NodeError.prototype.name = Base.name;
  NodeError.prototype.code = code2;
  codes[code2] = NodeError;
}
function oneOf(expected, thing) {
  if (Array.isArray(expected)) {
    var len = expected.length;
    expected = expected.map(function(i) {
      return String(i);
    });
    if (len > 2) {
      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(", "), ", or ") + expected[len - 1];
    } else if (len === 2) {
      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
    } else {
      return "of ".concat(thing, " ").concat(expected[0]);
    }
  } else {
    return "of ".concat(thing, " ").concat(String(expected));
  }
}
function startsWith(str, search, pos) {
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
}
function endsWith(str, search, this_len) {
  if (this_len === void 0 || this_len > str.length) {
    this_len = str.length;
  }
  return str.substring(this_len - search.length, this_len) === search;
}
function includes(str, search, start) {
  if (typeof start !== "number") {
    start = 0;
  }
  if (start + search.length > str.length) {
    return false;
  } else {
    return str.indexOf(search, start) !== -1;
  }
}
createErrorType("ERR_INVALID_OPT_VALUE", function(name, value) {
  return 'The value "' + value + '" is invalid for option "' + name + '"';
}, TypeError);
createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
  var determiner;
  if (typeof expected === "string" && startsWith(expected, "not ")) {
    determiner = "must not be";
    expected = expected.replace(/^not /, "");
  } else {
    determiner = "must be";
  }
  var msg;
  if (endsWith(name, " argument")) {
    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
  } else {
    var type = includes(name, ".") ? "property" : "argument";
    msg = 'The "'.concat(name, '" ').concat(type, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
  }
  msg += ". Received type ".concat(typeof actual);
  return msg;
}, TypeError);
createErrorType("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
createErrorType("ERR_METHOD_NOT_IMPLEMENTED", function(name) {
  return "The " + name + " method is not implemented";
});
createErrorType("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
createErrorType("ERR_STREAM_DESTROYED", function(name) {
  return "Cannot call " + name + " after a stream was destroyed";
});
createErrorType("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
createErrorType("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
createErrorType("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
createErrorType("ERR_UNKNOWN_ENCODING", function(arg) {
  return "Unknown encoding: " + arg;
}, TypeError);
createErrorType("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
errorsBrowser.codes = codes;
var ERR_INVALID_OPT_VALUE = errorsBrowser.codes.ERR_INVALID_OPT_VALUE;
function highWaterMarkFrom(options, isDuplex, duplexKey) {
  return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
}
function getHighWaterMark$2(state2, options, duplexKey, isDuplex) {
  var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
  if (hwm != null) {
    if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
      var name = isDuplex ? duplexKey : "highWaterMark";
      throw new ERR_INVALID_OPT_VALUE(name, hwm);
    }
    return Math.floor(hwm);
  }
  return state2.objectMode ? 16 : 16 * 1024;
}
var state = {
  getHighWaterMark: getHighWaterMark$2
};
var browser = deprecate;
function deprecate(fn, msg) {
  if (config("noDeprecation")) {
    return fn;
  }
  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config("throwDeprecation")) {
        throw new Error(msg);
      } else if (config("traceDeprecation")) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }
  return deprecated;
}
function config(name) {
  try {
    if (!commonjsGlobal.localStorage)
      return false;
  } catch (_2) {
    return false;
  }
  var val = commonjsGlobal.localStorage[name];
  if (null == val)
    return false;
  return String(val).toLowerCase() === "true";
}
var _stream_writable = Writable$1;
function CorkedRequest(state2) {
  var _this = this;
  this.next = null;
  this.entry = null;
  this.finish = function() {
    onCorkedFinish(_this, state2);
  };
}
var Duplex$3;
Writable$1.WritableState = WritableState;
var internalUtil = {
  deprecate: browser
};
var Stream$1 = streamBrowser;
var Buffer$4 = buffer.Buffer;
var OurUint8Array$1 = (typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
};
function _uint8ArrayToBuffer$1(chunk2) {
  return Buffer$4.from(chunk2);
}
function _isUint8Array$1(obj) {
  return Buffer$4.isBuffer(obj) || obj instanceof OurUint8Array$1;
}
var destroyImpl$1 = destroy_1;
var _require$1 = state, getHighWaterMark$1 = _require$1.getHighWaterMark;
var _require$codes$3 = errorsBrowser.codes, ERR_INVALID_ARG_TYPE$1 = _require$codes$3.ERR_INVALID_ARG_TYPE, ERR_METHOD_NOT_IMPLEMENTED$2 = _require$codes$3.ERR_METHOD_NOT_IMPLEMENTED, ERR_MULTIPLE_CALLBACK$1 = _require$codes$3.ERR_MULTIPLE_CALLBACK, ERR_STREAM_CANNOT_PIPE = _require$codes$3.ERR_STREAM_CANNOT_PIPE, ERR_STREAM_DESTROYED$1 = _require$codes$3.ERR_STREAM_DESTROYED, ERR_STREAM_NULL_VALUES = _require$codes$3.ERR_STREAM_NULL_VALUES, ERR_STREAM_WRITE_AFTER_END = _require$codes$3.ERR_STREAM_WRITE_AFTER_END, ERR_UNKNOWN_ENCODING = _require$codes$3.ERR_UNKNOWN_ENCODING;
var errorOrDestroy$1 = destroyImpl$1.errorOrDestroy;
inherits_browser.exports(Writable$1, Stream$1);
function nop() {
}
function WritableState(options, stream, isDuplex) {
  Duplex$3 = Duplex$3 || _stream_duplex;
  options = options || {};
  if (typeof isDuplex !== "boolean")
    isDuplex = stream instanceof Duplex$3;
  this.objectMode = !!options.objectMode;
  if (isDuplex)
    this.objectMode = this.objectMode || !!options.writableObjectMode;
  this.highWaterMark = getHighWaterMark$1(this, options, "writableHighWaterMark", isDuplex);
  this.finalCalled = false;
  this.needDrain = false;
  this.ending = false;
  this.ended = false;
  this.finished = false;
  this.destroyed = false;
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;
  this.defaultEncoding = options.defaultEncoding || "utf8";
  this.length = 0;
  this.writing = false;
  this.corked = 0;
  this.sync = true;
  this.bufferProcessing = false;
  this.onwrite = function(er) {
    onwrite(stream, er);
  };
  this.writecb = null;
  this.writelen = 0;
  this.bufferedRequest = null;
  this.lastBufferedRequest = null;
  this.pendingcb = 0;
  this.prefinished = false;
  this.errorEmitted = false;
  this.emitClose = options.emitClose !== false;
  this.autoDestroy = !!options.autoDestroy;
  this.bufferedRequestCount = 0;
  this.corkedRequestsFree = new CorkedRequest(this);
}
WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};
(function() {
  try {
    Object.defineProperty(WritableState.prototype, "buffer", {
      get: internalUtil.deprecate(function writableStateBufferGetter() {
        return this.getBuffer();
      }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
    });
  } catch (_2) {
  }
})();
var realHasInstance;
if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable$1, Symbol.hasInstance, {
    value: function value(object) {
      if (realHasInstance.call(this, object))
        return true;
      if (this !== Writable$1)
        return false;
      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function realHasInstance2(object) {
    return object instanceof this;
  };
}
function Writable$1(options) {
  Duplex$3 = Duplex$3 || _stream_duplex;
  var isDuplex = this instanceof Duplex$3;
  if (!isDuplex && !realHasInstance.call(Writable$1, this))
    return new Writable$1(options);
  this._writableState = new WritableState(options, this, isDuplex);
  this.writable = true;
  if (options) {
    if (typeof options.write === "function")
      this._write = options.write;
    if (typeof options.writev === "function")
      this._writev = options.writev;
    if (typeof options.destroy === "function")
      this._destroy = options.destroy;
    if (typeof options.final === "function")
      this._final = options.final;
  }
  Stream$1.call(this);
}
Writable$1.prototype.pipe = function() {
  errorOrDestroy$1(this, new ERR_STREAM_CANNOT_PIPE());
};
function writeAfterEnd(stream, cb) {
  var er = new ERR_STREAM_WRITE_AFTER_END();
  errorOrDestroy$1(stream, er);
  process.nextTick(cb, er);
}
function validChunk(stream, state2, chunk2, cb) {
  var er;
  if (chunk2 === null) {
    er = new ERR_STREAM_NULL_VALUES();
  } else if (typeof chunk2 !== "string" && !state2.objectMode) {
    er = new ERR_INVALID_ARG_TYPE$1("chunk", ["string", "Buffer"], chunk2);
  }
  if (er) {
    errorOrDestroy$1(stream, er);
    process.nextTick(cb, er);
    return false;
  }
  return true;
}
Writable$1.prototype.write = function(chunk2, encoding, cb) {
  var state2 = this._writableState;
  var ret = false;
  var isBuf = !state2.objectMode && _isUint8Array$1(chunk2);
  if (isBuf && !Buffer$4.isBuffer(chunk2)) {
    chunk2 = _uint8ArrayToBuffer$1(chunk2);
  }
  if (typeof encoding === "function") {
    cb = encoding;
    encoding = null;
  }
  if (isBuf)
    encoding = "buffer";
  else if (!encoding)
    encoding = state2.defaultEncoding;
  if (typeof cb !== "function")
    cb = nop;
  if (state2.ending)
    writeAfterEnd(this, cb);
  else if (isBuf || validChunk(this, state2, chunk2, cb)) {
    state2.pendingcb++;
    ret = writeOrBuffer(this, state2, isBuf, chunk2, encoding, cb);
  }
  return ret;
};
Writable$1.prototype.cork = function() {
  this._writableState.corked++;
};
Writable$1.prototype.uncork = function() {
  var state2 = this._writableState;
  if (state2.corked) {
    state2.corked--;
    if (!state2.writing && !state2.corked && !state2.bufferProcessing && state2.bufferedRequest)
      clearBuffer(this, state2);
  }
};
Writable$1.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  if (typeof encoding === "string")
    encoding = encoding.toLowerCase();
  if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1))
    throw new ERR_UNKNOWN_ENCODING(encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};
Object.defineProperty(Writable$1.prototype, "writableBuffer", {
  enumerable: false,
  get: function get2() {
    return this._writableState && this._writableState.getBuffer();
  }
});
function decodeChunk(state2, chunk2, encoding) {
  if (!state2.objectMode && state2.decodeStrings !== false && typeof chunk2 === "string") {
    chunk2 = Buffer$4.from(chunk2, encoding);
  }
  return chunk2;
}
Object.defineProperty(Writable$1.prototype, "writableHighWaterMark", {
  enumerable: false,
  get: function get3() {
    return this._writableState.highWaterMark;
  }
});
function writeOrBuffer(stream, state2, isBuf, chunk2, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state2, chunk2, encoding);
    if (chunk2 !== newChunk) {
      isBuf = true;
      encoding = "buffer";
      chunk2 = newChunk;
    }
  }
  var len = state2.objectMode ? 1 : chunk2.length;
  state2.length += len;
  var ret = state2.length < state2.highWaterMark;
  if (!ret)
    state2.needDrain = true;
  if (state2.writing || state2.corked) {
    var last = state2.lastBufferedRequest;
    state2.lastBufferedRequest = {
      chunk: chunk2,
      encoding,
      isBuf,
      callback: cb,
      next: null
    };
    if (last) {
      last.next = state2.lastBufferedRequest;
    } else {
      state2.bufferedRequest = state2.lastBufferedRequest;
    }
    state2.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state2, false, len, chunk2, encoding, cb);
  }
  return ret;
}
function doWrite(stream, state2, writev, len, chunk2, encoding, cb) {
  state2.writelen = len;
  state2.writecb = cb;
  state2.writing = true;
  state2.sync = true;
  if (state2.destroyed)
    state2.onwrite(new ERR_STREAM_DESTROYED$1("write"));
  else if (writev)
    stream._writev(chunk2, state2.onwrite);
  else
    stream._write(chunk2, encoding, state2.onwrite);
  state2.sync = false;
}
function onwriteError(stream, state2, sync, er, cb) {
  --state2.pendingcb;
  if (sync) {
    process.nextTick(cb, er);
    process.nextTick(finishMaybe, stream, state2);
    stream._writableState.errorEmitted = true;
    errorOrDestroy$1(stream, er);
  } else {
    cb(er);
    stream._writableState.errorEmitted = true;
    errorOrDestroy$1(stream, er);
    finishMaybe(stream, state2);
  }
}
function onwriteStateUpdate(state2) {
  state2.writing = false;
  state2.writecb = null;
  state2.length -= state2.writelen;
  state2.writelen = 0;
}
function onwrite(stream, er) {
  var state2 = stream._writableState;
  var sync = state2.sync;
  var cb = state2.writecb;
  if (typeof cb !== "function")
    throw new ERR_MULTIPLE_CALLBACK$1();
  onwriteStateUpdate(state2);
  if (er)
    onwriteError(stream, state2, sync, er, cb);
  else {
    var finished2 = needFinish(state2) || stream.destroyed;
    if (!finished2 && !state2.corked && !state2.bufferProcessing && state2.bufferedRequest) {
      clearBuffer(stream, state2);
    }
    if (sync) {
      process.nextTick(afterWrite, stream, state2, finished2, cb);
    } else {
      afterWrite(stream, state2, finished2, cb);
    }
  }
}
function afterWrite(stream, state2, finished2, cb) {
  if (!finished2)
    onwriteDrain(stream, state2);
  state2.pendingcb--;
  cb();
  finishMaybe(stream, state2);
}
function onwriteDrain(stream, state2) {
  if (state2.length === 0 && state2.needDrain) {
    state2.needDrain = false;
    stream.emit("drain");
  }
}
function clearBuffer(stream, state2) {
  state2.bufferProcessing = true;
  var entry = state2.bufferedRequest;
  if (stream._writev && entry && entry.next) {
    var l = state2.bufferedRequestCount;
    var buffer2 = new Array(l);
    var holder = state2.corkedRequestsFree;
    holder.entry = entry;
    var count = 0;
    var allBuffers = true;
    while (entry) {
      buffer2[count] = entry;
      if (!entry.isBuf)
        allBuffers = false;
      entry = entry.next;
      count += 1;
    }
    buffer2.allBuffers = allBuffers;
    doWrite(stream, state2, true, state2.length, buffer2, "", holder.finish);
    state2.pendingcb++;
    state2.lastBufferedRequest = null;
    if (holder.next) {
      state2.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state2.corkedRequestsFree = new CorkedRequest(state2);
    }
    state2.bufferedRequestCount = 0;
  } else {
    while (entry) {
      var chunk2 = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state2.objectMode ? 1 : chunk2.length;
      doWrite(stream, state2, false, len, chunk2, encoding, cb);
      entry = entry.next;
      state2.bufferedRequestCount--;
      if (state2.writing) {
        break;
      }
    }
    if (entry === null)
      state2.lastBufferedRequest = null;
  }
  state2.bufferedRequest = entry;
  state2.bufferProcessing = false;
}
Writable$1.prototype._write = function(chunk2, encoding, cb) {
  cb(new ERR_METHOD_NOT_IMPLEMENTED$2("_write()"));
};
Writable$1.prototype._writev = null;
Writable$1.prototype.end = function(chunk2, encoding, cb) {
  var state2 = this._writableState;
  if (typeof chunk2 === "function") {
    cb = chunk2;
    chunk2 = null;
    encoding = null;
  } else if (typeof encoding === "function") {
    cb = encoding;
    encoding = null;
  }
  if (chunk2 !== null && chunk2 !== void 0)
    this.write(chunk2, encoding);
  if (state2.corked) {
    state2.corked = 1;
    this.uncork();
  }
  if (!state2.ending)
    endWritable(this, state2, cb);
  return this;
};
Object.defineProperty(Writable$1.prototype, "writableLength", {
  enumerable: false,
  get: function get4() {
    return this._writableState.length;
  }
});
function needFinish(state2) {
  return state2.ending && state2.length === 0 && state2.bufferedRequest === null && !state2.finished && !state2.writing;
}
function callFinal(stream, state2) {
  stream._final(function(err) {
    state2.pendingcb--;
    if (err) {
      errorOrDestroy$1(stream, err);
    }
    state2.prefinished = true;
    stream.emit("prefinish");
    finishMaybe(stream, state2);
  });
}
function prefinish$1(stream, state2) {
  if (!state2.prefinished && !state2.finalCalled) {
    if (typeof stream._final === "function" && !state2.destroyed) {
      state2.pendingcb++;
      state2.finalCalled = true;
      process.nextTick(callFinal, stream, state2);
    } else {
      state2.prefinished = true;
      stream.emit("prefinish");
    }
  }
}
function finishMaybe(stream, state2) {
  var need = needFinish(state2);
  if (need) {
    prefinish$1(stream, state2);
    if (state2.pendingcb === 0) {
      state2.finished = true;
      stream.emit("finish");
      if (state2.autoDestroy) {
        var rState = stream._readableState;
        if (!rState || rState.autoDestroy && rState.endEmitted) {
          stream.destroy();
        }
      }
    }
  }
  return need;
}
function endWritable(stream, state2, cb) {
  state2.ending = true;
  finishMaybe(stream, state2);
  if (cb) {
    if (state2.finished)
      process.nextTick(cb);
    else
      stream.once("finish", cb);
  }
  state2.ended = true;
  stream.writable = false;
}
function onCorkedFinish(corkReq, state2, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;
  while (entry) {
    var cb = entry.callback;
    state2.pendingcb--;
    cb(err);
    entry = entry.next;
  }
  state2.corkedRequestsFree.next = corkReq;
}
Object.defineProperty(Writable$1.prototype, "destroyed", {
  enumerable: false,
  get: function get5() {
    if (this._writableState === void 0) {
      return false;
    }
    return this._writableState.destroyed;
  },
  set: function set2(value) {
    if (!this._writableState) {
      return;
    }
    this._writableState.destroyed = value;
  }
});
Writable$1.prototype.destroy = destroyImpl$1.destroy;
Writable$1.prototype._undestroy = destroyImpl$1.undestroy;
Writable$1.prototype._destroy = function(err, cb) {
  cb(err);
};
var objectKeys = Object.keys || function(obj) {
  var keys = [];
  for (var key in obj)
    keys.push(key);
  return keys;
};
var _stream_duplex = Duplex$2;
var Readable$1 = _stream_readable;
var Writable = _stream_writable;
inherits_browser.exports(Duplex$2, Readable$1);
{
  var keys = objectKeys(Writable.prototype);
  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex$2.prototype[method])
      Duplex$2.prototype[method] = Writable.prototype[method];
  }
}
function Duplex$2(options) {
  if (!(this instanceof Duplex$2))
    return new Duplex$2(options);
  Readable$1.call(this, options);
  Writable.call(this, options);
  this.allowHalfOpen = true;
  if (options) {
    if (options.readable === false)
      this.readable = false;
    if (options.writable === false)
      this.writable = false;
    if (options.allowHalfOpen === false) {
      this.allowHalfOpen = false;
      this.once("end", onend);
    }
  }
}
Object.defineProperty(Duplex$2.prototype, "writableHighWaterMark", {
  enumerable: false,
  get: function get6() {
    return this._writableState.highWaterMark;
  }
});
Object.defineProperty(Duplex$2.prototype, "writableBuffer", {
  enumerable: false,
  get: function get7() {
    return this._writableState && this._writableState.getBuffer();
  }
});
Object.defineProperty(Duplex$2.prototype, "writableLength", {
  enumerable: false,
  get: function get8() {
    return this._writableState.length;
  }
});
function onend() {
  if (this._writableState.ended)
    return;
  process.nextTick(onEndNT, this);
}
function onEndNT(self2) {
  self2.end();
}
Object.defineProperty(Duplex$2.prototype, "destroyed", {
  enumerable: false,
  get: function get9() {
    if (this._readableState === void 0 || this._writableState === void 0) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function set3(value) {
    if (this._readableState === void 0 || this._writableState === void 0) {
      return;
    }
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});
var string_decoder = {};
var Buffer$3 = safeBuffer.exports.Buffer;
var isEncoding = Buffer$3.isEncoding || function(encoding) {
  encoding = "" + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case "hex":
    case "utf8":
    case "utf-8":
    case "ascii":
    case "binary":
    case "base64":
    case "ucs2":
    case "ucs-2":
    case "utf16le":
    case "utf-16le":
    case "raw":
      return true;
    default:
      return false;
  }
};
function _normalizeEncoding(enc) {
  if (!enc)
    return "utf8";
  var retried;
  while (true) {
    switch (enc) {
      case "utf8":
      case "utf-8":
        return "utf8";
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return "utf16le";
      case "latin1":
      case "binary":
        return "latin1";
      case "base64":
      case "ascii":
      case "hex":
        return enc;
      default:
        if (retried)
          return;
        enc = ("" + enc).toLowerCase();
        retried = true;
    }
  }
}
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== "string" && (Buffer$3.isEncoding === isEncoding || !isEncoding(enc)))
    throw new Error("Unknown encoding: " + enc);
  return nenc || enc;
}
string_decoder.StringDecoder = StringDecoder$1;
function StringDecoder$1(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case "utf16le":
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case "utf8":
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case "base64":
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer$3.allocUnsafe(nb);
}
StringDecoder$1.prototype.write = function(buf) {
  if (buf.length === 0)
    return "";
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === void 0)
      return "";
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length)
    return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || "";
};
StringDecoder$1.prototype.end = utf8End;
StringDecoder$1.prototype.text = utf8Text;
StringDecoder$1.prototype.fillLast = function(buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};
function utf8CheckByte(byte) {
  if (byte <= 127)
    return 0;
  else if (byte >> 5 === 6)
    return 2;
  else if (byte >> 4 === 14)
    return 3;
  else if (byte >> 3 === 30)
    return 4;
  return byte >> 6 === 2 ? -1 : -2;
}
function utf8CheckIncomplete(self2, buf, i) {
  var j = buf.length - 1;
  if (j < i)
    return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0)
      self2.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2)
    return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0)
      self2.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2)
    return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2)
        nb = 0;
      else
        self2.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}
function utf8CheckExtraBytes(self2, buf, p) {
  if ((buf[0] & 192) !== 128) {
    self2.lastNeed = 0;
    return "\uFFFD";
  }
  if (self2.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 192) !== 128) {
      self2.lastNeed = 1;
      return "\uFFFD";
    }
    if (self2.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 192) !== 128) {
        self2.lastNeed = 2;
        return "\uFFFD";
      }
    }
  }
}
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf);
  if (r !== void 0)
    return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed)
    return buf.toString("utf8", i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString("utf8", i, end);
}
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : "";
  if (this.lastNeed)
    return r + "\uFFFD";
  return r;
}
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString("utf16le", i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 55296 && c <= 56319) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString("utf16le", i, buf.length - 1);
}
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : "";
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString("utf16le", 0, end);
  }
  return r;
}
function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0)
    return buf.toString("base64", i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString("base64", i, buf.length - n);
}
function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : "";
  if (this.lastNeed)
    return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
  return r;
}
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}
function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : "";
}
var ERR_STREAM_PREMATURE_CLOSE = errorsBrowser.codes.ERR_STREAM_PREMATURE_CLOSE;
function once$1(callback) {
  var called = false;
  return function() {
    if (called)
      return;
    called = true;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    callback.apply(this, args);
  };
}
function noop$1() {
}
function isRequest$1(stream) {
  return stream.setHeader && typeof stream.abort === "function";
}
function eos$1(stream, opts, callback) {
  if (typeof opts === "function")
    return eos$1(stream, null, opts);
  if (!opts)
    opts = {};
  callback = once$1(callback || noop$1);
  var readable = opts.readable || opts.readable !== false && stream.readable;
  var writable = opts.writable || opts.writable !== false && stream.writable;
  var onlegacyfinish = function onlegacyfinish2() {
    if (!stream.writable)
      onfinish();
  };
  var writableEnded = stream._writableState && stream._writableState.finished;
  var onfinish = function onfinish2() {
    writable = false;
    writableEnded = true;
    if (!readable)
      callback.call(stream);
  };
  var readableEnded = stream._readableState && stream._readableState.endEmitted;
  var onend2 = function onend3() {
    readable = false;
    readableEnded = true;
    if (!writable)
      callback.call(stream);
  };
  var onerror = function onerror2(err) {
    callback.call(stream, err);
  };
  var onclose = function onclose2() {
    var err;
    if (readable && !readableEnded) {
      if (!stream._readableState || !stream._readableState.ended)
        err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }
    if (writable && !writableEnded) {
      if (!stream._writableState || !stream._writableState.ended)
        err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }
  };
  var onrequest = function onrequest2() {
    stream.req.on("finish", onfinish);
  };
  if (isRequest$1(stream)) {
    stream.on("complete", onfinish);
    stream.on("abort", onclose);
    if (stream.req)
      onrequest();
    else
      stream.on("request", onrequest);
  } else if (writable && !stream._writableState) {
    stream.on("end", onlegacyfinish);
    stream.on("close", onlegacyfinish);
  }
  stream.on("end", onend2);
  stream.on("finish", onfinish);
  if (opts.error !== false)
    stream.on("error", onerror);
  stream.on("close", onclose);
  return function() {
    stream.removeListener("complete", onfinish);
    stream.removeListener("abort", onclose);
    stream.removeListener("request", onrequest);
    if (stream.req)
      stream.req.removeListener("finish", onfinish);
    stream.removeListener("end", onlegacyfinish);
    stream.removeListener("close", onlegacyfinish);
    stream.removeListener("finish", onfinish);
    stream.removeListener("end", onend2);
    stream.removeListener("error", onerror);
    stream.removeListener("close", onclose);
  };
}
var endOfStream = eos$1;
var _Object$setPrototypeO;
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var finished = endOfStream;
var kLastResolve = Symbol("lastResolve");
var kLastReject = Symbol("lastReject");
var kError = Symbol("error");
var kEnded = Symbol("ended");
var kLastPromise = Symbol("lastPromise");
var kHandlePromise = Symbol("handlePromise");
var kStream = Symbol("stream");
function createIterResult(value, done2) {
  return {
    value,
    done: done2
  };
}
function readAndResolve(iter) {
  var resolve = iter[kLastResolve];
  if (resolve !== null) {
    var data = iter[kStream].read();
    if (data !== null) {
      iter[kLastPromise] = null;
      iter[kLastResolve] = null;
      iter[kLastReject] = null;
      resolve(createIterResult(data, false));
    }
  }
}
function onReadable(iter) {
  process.nextTick(readAndResolve, iter);
}
function wrapForNext(lastPromise, iter) {
  return function(resolve, reject) {
    lastPromise.then(function() {
      if (iter[kEnded]) {
        resolve(createIterResult(void 0, true));
        return;
      }
      iter[kHandlePromise](resolve, reject);
    }, reject);
  };
}
var AsyncIteratorPrototype = Object.getPrototypeOf(function() {
});
var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
  get stream() {
    return this[kStream];
  },
  next: function next() {
    var _this = this;
    var error = this[kError];
    if (error !== null) {
      return Promise.reject(error);
    }
    if (this[kEnded]) {
      return Promise.resolve(createIterResult(void 0, true));
    }
    if (this[kStream].destroyed) {
      return new Promise(function(resolve, reject) {
        process.nextTick(function() {
          if (_this[kError]) {
            reject(_this[kError]);
          } else {
            resolve(createIterResult(void 0, true));
          }
        });
      });
    }
    var lastPromise = this[kLastPromise];
    var promise;
    if (lastPromise) {
      promise = new Promise(wrapForNext(lastPromise, this));
    } else {
      var data = this[kStream].read();
      if (data !== null) {
        return Promise.resolve(createIterResult(data, false));
      }
      promise = new Promise(this[kHandlePromise]);
    }
    this[kLastPromise] = promise;
    return promise;
  }
}, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function() {
  return this;
}), _defineProperty(_Object$setPrototypeO, "return", function _return() {
  var _this2 = this;
  return new Promise(function(resolve, reject) {
    _this2[kStream].destroy(null, function(err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(createIterResult(void 0, true));
    });
  });
}), _Object$setPrototypeO), AsyncIteratorPrototype);
var createReadableStreamAsyncIterator$1 = function createReadableStreamAsyncIterator(stream) {
  var _Object$create;
  var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
    value: stream,
    writable: true
  }), _defineProperty(_Object$create, kLastResolve, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kLastReject, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kError, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kEnded, {
    value: stream._readableState.endEmitted,
    writable: true
  }), _defineProperty(_Object$create, kHandlePromise, {
    value: function value(resolve, reject) {
      var data = iterator[kStream].read();
      if (data) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        resolve(createIterResult(data, false));
      } else {
        iterator[kLastResolve] = resolve;
        iterator[kLastReject] = reject;
      }
    },
    writable: true
  }), _Object$create));
  iterator[kLastPromise] = null;
  finished(stream, function(err) {
    if (err && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
      var reject = iterator[kLastReject];
      if (reject !== null) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        reject(err);
      }
      iterator[kError] = err;
      return;
    }
    var resolve = iterator[kLastResolve];
    if (resolve !== null) {
      iterator[kLastPromise] = null;
      iterator[kLastResolve] = null;
      iterator[kLastReject] = null;
      resolve(createIterResult(void 0, true));
    }
    iterator[kEnded] = true;
  });
  stream.on("readable", onReadable.bind(null, iterator));
  return iterator;
};
var async_iterator = createReadableStreamAsyncIterator$1;
var fromBrowser = function() {
  throw new Error("Readable.from is not available in the browser");
};
var _stream_readable = Readable;
var Duplex$1;
Readable.ReadableState = ReadableState;
require$$3.EventEmitter;
var EElistenerCount = function EElistenerCount2(emitter, type) {
  return emitter.listeners(type).length;
};
var Stream = streamBrowser;
var Buffer$2 = buffer.Buffer;
var OurUint8Array = (typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
};
function _uint8ArrayToBuffer(chunk2) {
  return Buffer$2.from(chunk2);
}
function _isUint8Array(obj) {
  return Buffer$2.isBuffer(obj) || obj instanceof OurUint8Array;
}
var debugUtil = require$$3;
var debug;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog("stream");
} else {
  debug = function debug2() {
  };
}
var BufferList = buffer_list;
var destroyImpl = destroy_1;
var _require = state, getHighWaterMark = _require.getHighWaterMark;
var _require$codes$2 = errorsBrowser.codes, ERR_INVALID_ARG_TYPE = _require$codes$2.ERR_INVALID_ARG_TYPE, ERR_STREAM_PUSH_AFTER_EOF = _require$codes$2.ERR_STREAM_PUSH_AFTER_EOF, ERR_METHOD_NOT_IMPLEMENTED$1 = _require$codes$2.ERR_METHOD_NOT_IMPLEMENTED, ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes$2.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
var StringDecoder;
var createReadableStreamAsyncIterator2;
var from;
inherits_browser.exports(Readable, Stream);
var errorOrDestroy = destroyImpl.errorOrDestroy;
var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
function prependListener(emitter, event, fn) {
  if (typeof emitter.prependListener === "function")
    return emitter.prependListener(event, fn);
  if (!emitter._events || !emitter._events[event])
    emitter.on(event, fn);
  else if (Array.isArray(emitter._events[event]))
    emitter._events[event].unshift(fn);
  else
    emitter._events[event] = [fn, emitter._events[event]];
}
function ReadableState(options, stream, isDuplex) {
  Duplex$1 = Duplex$1 || _stream_duplex;
  options = options || {};
  if (typeof isDuplex !== "boolean")
    isDuplex = stream instanceof Duplex$1;
  this.objectMode = !!options.objectMode;
  if (isDuplex)
    this.objectMode = this.objectMode || !!options.readableObjectMode;
  this.highWaterMark = getHighWaterMark(this, options, "readableHighWaterMark", isDuplex);
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;
  this.sync = true;
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;
  this.paused = true;
  this.emitClose = options.emitClose !== false;
  this.autoDestroy = !!options.autoDestroy;
  this.destroyed = false;
  this.defaultEncoding = options.defaultEncoding || "utf8";
  this.awaitDrain = 0;
  this.readingMore = false;
  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder)
      StringDecoder = string_decoder.StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}
function Readable(options) {
  Duplex$1 = Duplex$1 || _stream_duplex;
  if (!(this instanceof Readable))
    return new Readable(options);
  var isDuplex = this instanceof Duplex$1;
  this._readableState = new ReadableState(options, this, isDuplex);
  this.readable = true;
  if (options) {
    if (typeof options.read === "function")
      this._read = options.read;
    if (typeof options.destroy === "function")
      this._destroy = options.destroy;
  }
  Stream.call(this);
}
Object.defineProperty(Readable.prototype, "destroyed", {
  enumerable: false,
  get: function get10() {
    if (this._readableState === void 0) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function set4(value) {
    if (!this._readableState) {
      return;
    }
    this._readableState.destroyed = value;
  }
});
Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function(err, cb) {
  cb(err);
};
Readable.prototype.push = function(chunk2, encoding) {
  var state2 = this._readableState;
  var skipChunkCheck;
  if (!state2.objectMode) {
    if (typeof chunk2 === "string") {
      encoding = encoding || state2.defaultEncoding;
      if (encoding !== state2.encoding) {
        chunk2 = Buffer$2.from(chunk2, encoding);
        encoding = "";
      }
      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }
  return readableAddChunk(this, chunk2, encoding, false, skipChunkCheck);
};
Readable.prototype.unshift = function(chunk2) {
  return readableAddChunk(this, chunk2, null, true, false);
};
function readableAddChunk(stream, chunk2, encoding, addToFront, skipChunkCheck) {
  debug("readableAddChunk", chunk2);
  var state2 = stream._readableState;
  if (chunk2 === null) {
    state2.reading = false;
    onEofChunk(stream, state2);
  } else {
    var er;
    if (!skipChunkCheck)
      er = chunkInvalid(state2, chunk2);
    if (er) {
      errorOrDestroy(stream, er);
    } else if (state2.objectMode || chunk2 && chunk2.length > 0) {
      if (typeof chunk2 !== "string" && !state2.objectMode && Object.getPrototypeOf(chunk2) !== Buffer$2.prototype) {
        chunk2 = _uint8ArrayToBuffer(chunk2);
      }
      if (addToFront) {
        if (state2.endEmitted)
          errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
        else
          addChunk(stream, state2, chunk2, true);
      } else if (state2.ended) {
        errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
      } else if (state2.destroyed) {
        return false;
      } else {
        state2.reading = false;
        if (state2.decoder && !encoding) {
          chunk2 = state2.decoder.write(chunk2);
          if (state2.objectMode || chunk2.length !== 0)
            addChunk(stream, state2, chunk2, false);
          else
            maybeReadMore(stream, state2);
        } else {
          addChunk(stream, state2, chunk2, false);
        }
      }
    } else if (!addToFront) {
      state2.reading = false;
      maybeReadMore(stream, state2);
    }
  }
  return !state2.ended && (state2.length < state2.highWaterMark || state2.length === 0);
}
function addChunk(stream, state2, chunk2, addToFront) {
  if (state2.flowing && state2.length === 0 && !state2.sync) {
    state2.awaitDrain = 0;
    stream.emit("data", chunk2);
  } else {
    state2.length += state2.objectMode ? 1 : chunk2.length;
    if (addToFront)
      state2.buffer.unshift(chunk2);
    else
      state2.buffer.push(chunk2);
    if (state2.needReadable)
      emitReadable(stream);
  }
  maybeReadMore(stream, state2);
}
function chunkInvalid(state2, chunk2) {
  var er;
  if (!_isUint8Array(chunk2) && typeof chunk2 !== "string" && chunk2 !== void 0 && !state2.objectMode) {
    er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk2);
  }
  return er;
}
Readable.prototype.isPaused = function() {
  return this._readableState.flowing === false;
};
Readable.prototype.setEncoding = function(enc) {
  if (!StringDecoder)
    StringDecoder = string_decoder.StringDecoder;
  var decoder = new StringDecoder(enc);
  this._readableState.decoder = decoder;
  this._readableState.encoding = this._readableState.decoder.encoding;
  var p = this._readableState.buffer.head;
  var content = "";
  while (p !== null) {
    content += decoder.write(p.data);
    p = p.next;
  }
  this._readableState.buffer.clear();
  if (content !== "")
    this._readableState.buffer.push(content);
  this._readableState.length = content.length;
  return this;
};
var MAX_HWM = 1073741824;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}
function howMuchToRead(n, state2) {
  if (n <= 0 || state2.length === 0 && state2.ended)
    return 0;
  if (state2.objectMode)
    return 1;
  if (n !== n) {
    if (state2.flowing && state2.length)
      return state2.buffer.head.data.length;
    else
      return state2.length;
  }
  if (n > state2.highWaterMark)
    state2.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state2.length)
    return n;
  if (!state2.ended) {
    state2.needReadable = true;
    return 0;
  }
  return state2.length;
}
Readable.prototype.read = function(n) {
  debug("read", n);
  n = parseInt(n, 10);
  var state2 = this._readableState;
  var nOrig = n;
  if (n !== 0)
    state2.emittedReadable = false;
  if (n === 0 && state2.needReadable && ((state2.highWaterMark !== 0 ? state2.length >= state2.highWaterMark : state2.length > 0) || state2.ended)) {
    debug("read: emitReadable", state2.length, state2.ended);
    if (state2.length === 0 && state2.ended)
      endReadable(this);
    else
      emitReadable(this);
    return null;
  }
  n = howMuchToRead(n, state2);
  if (n === 0 && state2.ended) {
    if (state2.length === 0)
      endReadable(this);
    return null;
  }
  var doRead = state2.needReadable;
  debug("need readable", doRead);
  if (state2.length === 0 || state2.length - n < state2.highWaterMark) {
    doRead = true;
    debug("length less than watermark", doRead);
  }
  if (state2.ended || state2.reading) {
    doRead = false;
    debug("reading or ended", doRead);
  } else if (doRead) {
    debug("do read");
    state2.reading = true;
    state2.sync = true;
    if (state2.length === 0)
      state2.needReadable = true;
    this._read(state2.highWaterMark);
    state2.sync = false;
    if (!state2.reading)
      n = howMuchToRead(nOrig, state2);
  }
  var ret;
  if (n > 0)
    ret = fromList(n, state2);
  else
    ret = null;
  if (ret === null) {
    state2.needReadable = state2.length <= state2.highWaterMark;
    n = 0;
  } else {
    state2.length -= n;
    state2.awaitDrain = 0;
  }
  if (state2.length === 0) {
    if (!state2.ended)
      state2.needReadable = true;
    if (nOrig !== n && state2.ended)
      endReadable(this);
  }
  if (ret !== null)
    this.emit("data", ret);
  return ret;
};
function onEofChunk(stream, state2) {
  debug("onEofChunk");
  if (state2.ended)
    return;
  if (state2.decoder) {
    var chunk2 = state2.decoder.end();
    if (chunk2 && chunk2.length) {
      state2.buffer.push(chunk2);
      state2.length += state2.objectMode ? 1 : chunk2.length;
    }
  }
  state2.ended = true;
  if (state2.sync) {
    emitReadable(stream);
  } else {
    state2.needReadable = false;
    if (!state2.emittedReadable) {
      state2.emittedReadable = true;
      emitReadable_(stream);
    }
  }
}
function emitReadable(stream) {
  var state2 = stream._readableState;
  debug("emitReadable", state2.needReadable, state2.emittedReadable);
  state2.needReadable = false;
  if (!state2.emittedReadable) {
    debug("emitReadable", state2.flowing);
    state2.emittedReadable = true;
    process.nextTick(emitReadable_, stream);
  }
}
function emitReadable_(stream) {
  var state2 = stream._readableState;
  debug("emitReadable_", state2.destroyed, state2.length, state2.ended);
  if (!state2.destroyed && (state2.length || state2.ended)) {
    stream.emit("readable");
    state2.emittedReadable = false;
  }
  state2.needReadable = !state2.flowing && !state2.ended && state2.length <= state2.highWaterMark;
  flow(stream);
}
function maybeReadMore(stream, state2) {
  if (!state2.readingMore) {
    state2.readingMore = true;
    process.nextTick(maybeReadMore_, stream, state2);
  }
}
function maybeReadMore_(stream, state2) {
  while (!state2.reading && !state2.ended && (state2.length < state2.highWaterMark || state2.flowing && state2.length === 0)) {
    var len = state2.length;
    debug("maybeReadMore read 0");
    stream.read(0);
    if (len === state2.length)
      break;
  }
  state2.readingMore = false;
}
Readable.prototype._read = function(n) {
  errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED$1("_read()"));
};
Readable.prototype.pipe = function(dest, pipeOpts) {
  var src = this;
  var state2 = this._readableState;
  switch (state2.pipesCount) {
    case 0:
      state2.pipes = dest;
      break;
    case 1:
      state2.pipes = [state2.pipes, dest];
      break;
    default:
      state2.pipes.push(dest);
      break;
  }
  state2.pipesCount += 1;
  debug("pipe count=%d opts=%j", state2.pipesCount, pipeOpts);
  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
  var endFn = doEnd ? onend2 : unpipe;
  if (state2.endEmitted)
    process.nextTick(endFn);
  else
    src.once("end", endFn);
  dest.on("unpipe", onunpipe);
  function onunpipe(readable, unpipeInfo) {
    debug("onunpipe");
    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }
  function onend2() {
    debug("onend");
    dest.end();
  }
  var ondrain = pipeOnDrain(src);
  dest.on("drain", ondrain);
  var cleanedUp = false;
  function cleanup() {
    debug("cleanup");
    dest.removeListener("close", onclose);
    dest.removeListener("finish", onfinish);
    dest.removeListener("drain", ondrain);
    dest.removeListener("error", onerror);
    dest.removeListener("unpipe", onunpipe);
    src.removeListener("end", onend2);
    src.removeListener("end", unpipe);
    src.removeListener("data", ondata);
    cleanedUp = true;
    if (state2.awaitDrain && (!dest._writableState || dest._writableState.needDrain))
      ondrain();
  }
  src.on("data", ondata);
  function ondata(chunk2) {
    debug("ondata");
    var ret = dest.write(chunk2);
    debug("dest.write", ret);
    if (ret === false) {
      if ((state2.pipesCount === 1 && state2.pipes === dest || state2.pipesCount > 1 && indexOf(state2.pipes, dest) !== -1) && !cleanedUp) {
        debug("false write response, pause", state2.awaitDrain);
        state2.awaitDrain++;
      }
      src.pause();
    }
  }
  function onerror(er) {
    debug("onerror", er);
    unpipe();
    dest.removeListener("error", onerror);
    if (EElistenerCount(dest, "error") === 0)
      errorOrDestroy(dest, er);
  }
  prependListener(dest, "error", onerror);
  function onclose() {
    dest.removeListener("finish", onfinish);
    unpipe();
  }
  dest.once("close", onclose);
  function onfinish() {
    debug("onfinish");
    dest.removeListener("close", onclose);
    unpipe();
  }
  dest.once("finish", onfinish);
  function unpipe() {
    debug("unpipe");
    src.unpipe(dest);
  }
  dest.emit("pipe", src);
  if (!state2.flowing) {
    debug("pipe resume");
    src.resume();
  }
  return dest;
};
function pipeOnDrain(src) {
  return function pipeOnDrainFunctionResult() {
    var state2 = src._readableState;
    debug("pipeOnDrain", state2.awaitDrain);
    if (state2.awaitDrain)
      state2.awaitDrain--;
    if (state2.awaitDrain === 0 && EElistenerCount(src, "data")) {
      state2.flowing = true;
      flow(src);
    }
  };
}
Readable.prototype.unpipe = function(dest) {
  var state2 = this._readableState;
  var unpipeInfo = {
    hasUnpiped: false
  };
  if (state2.pipesCount === 0)
    return this;
  if (state2.pipesCount === 1) {
    if (dest && dest !== state2.pipes)
      return this;
    if (!dest)
      dest = state2.pipes;
    state2.pipes = null;
    state2.pipesCount = 0;
    state2.flowing = false;
    if (dest)
      dest.emit("unpipe", this, unpipeInfo);
    return this;
  }
  if (!dest) {
    var dests = state2.pipes;
    var len = state2.pipesCount;
    state2.pipes = null;
    state2.pipesCount = 0;
    state2.flowing = false;
    for (var i = 0; i < len; i++)
      dests[i].emit("unpipe", this, {
        hasUnpiped: false
      });
    return this;
  }
  var index = indexOf(state2.pipes, dest);
  if (index === -1)
    return this;
  state2.pipes.splice(index, 1);
  state2.pipesCount -= 1;
  if (state2.pipesCount === 1)
    state2.pipes = state2.pipes[0];
  dest.emit("unpipe", this, unpipeInfo);
  return this;
};
Readable.prototype.on = function(ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);
  var state2 = this._readableState;
  if (ev === "data") {
    state2.readableListening = this.listenerCount("readable") > 0;
    if (state2.flowing !== false)
      this.resume();
  } else if (ev === "readable") {
    if (!state2.endEmitted && !state2.readableListening) {
      state2.readableListening = state2.needReadable = true;
      state2.flowing = false;
      state2.emittedReadable = false;
      debug("on readable", state2.length, state2.reading);
      if (state2.length) {
        emitReadable(this);
      } else if (!state2.reading) {
        process.nextTick(nReadingNextTick, this);
      }
    }
  }
  return res;
};
Readable.prototype.addListener = Readable.prototype.on;
Readable.prototype.removeListener = function(ev, fn) {
  var res = Stream.prototype.removeListener.call(this, ev, fn);
  if (ev === "readable") {
    process.nextTick(updateReadableListening, this);
  }
  return res;
};
Readable.prototype.removeAllListeners = function(ev) {
  var res = Stream.prototype.removeAllListeners.apply(this, arguments);
  if (ev === "readable" || ev === void 0) {
    process.nextTick(updateReadableListening, this);
  }
  return res;
};
function updateReadableListening(self2) {
  var state2 = self2._readableState;
  state2.readableListening = self2.listenerCount("readable") > 0;
  if (state2.resumeScheduled && !state2.paused) {
    state2.flowing = true;
  } else if (self2.listenerCount("data") > 0) {
    self2.resume();
  }
}
function nReadingNextTick(self2) {
  debug("readable nexttick read 0");
  self2.read(0);
}
Readable.prototype.resume = function() {
  var state2 = this._readableState;
  if (!state2.flowing) {
    debug("resume");
    state2.flowing = !state2.readableListening;
    resume(this, state2);
  }
  state2.paused = false;
  return this;
};
function resume(stream, state2) {
  if (!state2.resumeScheduled) {
    state2.resumeScheduled = true;
    process.nextTick(resume_, stream, state2);
  }
}
function resume_(stream, state2) {
  debug("resume", state2.reading);
  if (!state2.reading) {
    stream.read(0);
  }
  state2.resumeScheduled = false;
  stream.emit("resume");
  flow(stream);
  if (state2.flowing && !state2.reading)
    stream.read(0);
}
Readable.prototype.pause = function() {
  debug("call pause flowing=%j", this._readableState.flowing);
  if (this._readableState.flowing !== false) {
    debug("pause");
    this._readableState.flowing = false;
    this.emit("pause");
  }
  this._readableState.paused = true;
  return this;
};
function flow(stream) {
  var state2 = stream._readableState;
  debug("flow", state2.flowing);
  while (state2.flowing && stream.read() !== null)
    ;
}
Readable.prototype.wrap = function(stream) {
  var _this = this;
  var state2 = this._readableState;
  var paused = false;
  stream.on("end", function() {
    debug("wrapped end");
    if (state2.decoder && !state2.ended) {
      var chunk2 = state2.decoder.end();
      if (chunk2 && chunk2.length)
        _this.push(chunk2);
    }
    _this.push(null);
  });
  stream.on("data", function(chunk2) {
    debug("wrapped data");
    if (state2.decoder)
      chunk2 = state2.decoder.write(chunk2);
    if (state2.objectMode && (chunk2 === null || chunk2 === void 0))
      return;
    else if (!state2.objectMode && (!chunk2 || !chunk2.length))
      return;
    var ret = _this.push(chunk2);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });
  for (var i in stream) {
    if (this[i] === void 0 && typeof stream[i] === "function") {
      this[i] = function methodWrap(method) {
        return function methodWrapReturnFunction() {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  }
  this._read = function(n2) {
    debug("wrapped _read", n2);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };
  return this;
};
if (typeof Symbol === "function") {
  Readable.prototype[Symbol.asyncIterator] = function() {
    if (createReadableStreamAsyncIterator2 === void 0) {
      createReadableStreamAsyncIterator2 = async_iterator;
    }
    return createReadableStreamAsyncIterator2(this);
  };
}
Object.defineProperty(Readable.prototype, "readableHighWaterMark", {
  enumerable: false,
  get: function get11() {
    return this._readableState.highWaterMark;
  }
});
Object.defineProperty(Readable.prototype, "readableBuffer", {
  enumerable: false,
  get: function get12() {
    return this._readableState && this._readableState.buffer;
  }
});
Object.defineProperty(Readable.prototype, "readableFlowing", {
  enumerable: false,
  get: function get13() {
    return this._readableState.flowing;
  },
  set: function set5(state2) {
    if (this._readableState) {
      this._readableState.flowing = state2;
    }
  }
});
Readable._fromList = fromList;
Object.defineProperty(Readable.prototype, "readableLength", {
  enumerable: false,
  get: function get14() {
    return this._readableState.length;
  }
});
function fromList(n, state2) {
  if (state2.length === 0)
    return null;
  var ret;
  if (state2.objectMode)
    ret = state2.buffer.shift();
  else if (!n || n >= state2.length) {
    if (state2.decoder)
      ret = state2.buffer.join("");
    else if (state2.buffer.length === 1)
      ret = state2.buffer.first();
    else
      ret = state2.buffer.concat(state2.length);
    state2.buffer.clear();
  } else {
    ret = state2.buffer.consume(n, state2.decoder);
  }
  return ret;
}
function endReadable(stream) {
  var state2 = stream._readableState;
  debug("endReadable", state2.endEmitted);
  if (!state2.endEmitted) {
    state2.ended = true;
    process.nextTick(endReadableNT, state2, stream);
  }
}
function endReadableNT(state2, stream) {
  debug("endReadableNT", state2.endEmitted, state2.length);
  if (!state2.endEmitted && state2.length === 0) {
    state2.endEmitted = true;
    stream.readable = false;
    stream.emit("end");
    if (state2.autoDestroy) {
      var wState = stream._writableState;
      if (!wState || wState.autoDestroy && wState.finished) {
        stream.destroy();
      }
    }
  }
}
if (typeof Symbol === "function") {
  Readable.from = function(iterable, opts) {
    if (from === void 0) {
      from = fromBrowser;
    }
    return from(Readable, iterable, opts);
  };
}
function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x)
      return i;
  }
  return -1;
}
var _stream_transform = Transform$2;
var _require$codes$1 = errorsBrowser.codes, ERR_METHOD_NOT_IMPLEMENTED = _require$codes$1.ERR_METHOD_NOT_IMPLEMENTED, ERR_MULTIPLE_CALLBACK = _require$codes$1.ERR_MULTIPLE_CALLBACK, ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes$1.ERR_TRANSFORM_ALREADY_TRANSFORMING, ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes$1.ERR_TRANSFORM_WITH_LENGTH_0;
var Duplex = _stream_duplex;
inherits_browser.exports(Transform$2, Duplex);
function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;
  var cb = ts.writecb;
  if (cb === null) {
    return this.emit("error", new ERR_MULTIPLE_CALLBACK());
  }
  ts.writechunk = null;
  ts.writecb = null;
  if (data != null)
    this.push(data);
  cb(er);
  var rs = this._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}
function Transform$2(options) {
  if (!(this instanceof Transform$2))
    return new Transform$2(options);
  Duplex.call(this, options);
  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  };
  this._readableState.needReadable = true;
  this._readableState.sync = false;
  if (options) {
    if (typeof options.transform === "function")
      this._transform = options.transform;
    if (typeof options.flush === "function")
      this._flush = options.flush;
  }
  this.on("prefinish", prefinish);
}
function prefinish() {
  var _this = this;
  if (typeof this._flush === "function" && !this._readableState.destroyed) {
    this._flush(function(er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}
Transform$2.prototype.push = function(chunk2, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk2, encoding);
};
Transform$2.prototype._transform = function(chunk2, encoding, cb) {
  cb(new ERR_METHOD_NOT_IMPLEMENTED("_transform()"));
};
Transform$2.prototype._write = function(chunk2, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk2;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark)
      this._read(rs.highWaterMark);
  }
};
Transform$2.prototype._read = function(n) {
  var ts = this._transformState;
  if (ts.writechunk !== null && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    ts.needTransform = true;
  }
};
Transform$2.prototype._destroy = function(err, cb) {
  Duplex.prototype._destroy.call(this, err, function(err2) {
    cb(err2);
  });
};
function done(stream, er, data) {
  if (er)
    return stream.emit("error", er);
  if (data != null)
    stream.push(data);
  if (stream._writableState.length)
    throw new ERR_TRANSFORM_WITH_LENGTH_0();
  if (stream._transformState.transforming)
    throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
  return stream.push(null);
}
var _stream_passthrough = PassThrough;
var Transform$1 = _stream_transform;
inherits_browser.exports(PassThrough, Transform$1);
function PassThrough(options) {
  if (!(this instanceof PassThrough))
    return new PassThrough(options);
  Transform$1.call(this, options);
}
PassThrough.prototype._transform = function(chunk2, encoding, cb) {
  cb(null, chunk2);
};
var eos;
function once(callback) {
  var called = false;
  return function() {
    if (called)
      return;
    called = true;
    callback.apply(void 0, arguments);
  };
}
var _require$codes = errorsBrowser.codes, ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS, ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
function noop(err) {
  if (err)
    throw err;
}
function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === "function";
}
function destroyer(stream, reading, writing, callback) {
  callback = once(callback);
  var closed = false;
  stream.on("close", function() {
    closed = true;
  });
  if (eos === void 0)
    eos = endOfStream;
  eos(stream, {
    readable: reading,
    writable: writing
  }, function(err) {
    if (err)
      return callback(err);
    closed = true;
    callback();
  });
  var destroyed = false;
  return function(err) {
    if (closed)
      return;
    if (destroyed)
      return;
    destroyed = true;
    if (isRequest(stream))
      return stream.abort();
    if (typeof stream.destroy === "function")
      return stream.destroy();
    callback(err || new ERR_STREAM_DESTROYED("pipe"));
  };
}
function call(fn) {
  fn();
}
function pipe(from2, to) {
  return from2.pipe(to);
}
function popCallback(streams) {
  if (!streams.length)
    return noop;
  if (typeof streams[streams.length - 1] !== "function")
    return noop;
  return streams.pop();
}
function pipeline() {
  for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
    streams[_key] = arguments[_key];
  }
  var callback = popCallback(streams);
  if (Array.isArray(streams[0]))
    streams = streams[0];
  if (streams.length < 2) {
    throw new ERR_MISSING_ARGS("streams");
  }
  var error;
  var destroys = streams.map(function(stream, i) {
    var reading = i < streams.length - 1;
    var writing = i > 0;
    return destroyer(stream, reading, writing, function(err) {
      if (!error)
        error = err;
      if (err)
        destroys.forEach(call);
      if (reading)
        return;
      destroys.forEach(call);
      callback(error);
    });
  });
  return streams.reduce(pipe);
}
var pipeline_1 = pipeline;
(function(module, exports) {
  exports = module.exports = _stream_readable;
  exports.Stream = exports;
  exports.Readable = exports;
  exports.Writable = _stream_writable;
  exports.Duplex = _stream_duplex;
  exports.Transform = _stream_transform;
  exports.PassThrough = _stream_passthrough;
  exports.finished = endOfStream;
  exports.pipeline = pipeline_1;
})(readableBrowser, readableBrowser.exports);
var Buffer$1 = safeBuffer.exports.Buffer;
var Transform = readableBrowser.exports.Transform;
var inherits$1 = inherits_browser.exports;
function throwIfNotStringOrBuffer(val, prefix) {
  if (!Buffer$1.isBuffer(val) && typeof val !== "string") {
    throw new TypeError(prefix + " must be a string or a buffer");
  }
}
function HashBase$1(blockSize) {
  Transform.call(this);
  this._block = Buffer$1.allocUnsafe(blockSize);
  this._blockSize = blockSize;
  this._blockOffset = 0;
  this._length = [0, 0, 0, 0];
  this._finalized = false;
}
inherits$1(HashBase$1, Transform);
HashBase$1.prototype._transform = function(chunk2, encoding, callback) {
  var error = null;
  try {
    this.update(chunk2, encoding);
  } catch (err) {
    error = err;
  }
  callback(error);
};
HashBase$1.prototype._flush = function(callback) {
  var error = null;
  try {
    this.push(this.digest());
  } catch (err) {
    error = err;
  }
  callback(error);
};
HashBase$1.prototype.update = function(data, encoding) {
  throwIfNotStringOrBuffer(data, "Data");
  if (this._finalized)
    throw new Error("Digest already called");
  if (!Buffer$1.isBuffer(data))
    data = Buffer$1.from(data, encoding);
  var block = this._block;
  var offset = 0;
  while (this._blockOffset + data.length - offset >= this._blockSize) {
    for (var i = this._blockOffset; i < this._blockSize; )
      block[i++] = data[offset++];
    this._update();
    this._blockOffset = 0;
  }
  while (offset < data.length)
    block[this._blockOffset++] = data[offset++];
  for (var j = 0, carry = data.length * 8; carry > 0; ++j) {
    this._length[j] += carry;
    carry = this._length[j] / 4294967296 | 0;
    if (carry > 0)
      this._length[j] -= 4294967296 * carry;
  }
  return this;
};
HashBase$1.prototype._update = function() {
  throw new Error("_update is not implemented");
};
HashBase$1.prototype.digest = function(encoding) {
  if (this._finalized)
    throw new Error("Digest already called");
  this._finalized = true;
  var digest = this._digest();
  if (encoding !== void 0)
    digest = digest.toString(encoding);
  this._block.fill(0);
  this._blockOffset = 0;
  for (var i = 0; i < 4; ++i)
    this._length[i] = 0;
  return digest;
};
HashBase$1.prototype._digest = function() {
  throw new Error("_digest is not implemented");
};
var hashBase = HashBase$1;
var inherits = inherits_browser.exports;
var HashBase = hashBase;
var Buffer = safeBuffer.exports.Buffer;
var ARRAY16 = new Array(16);
function MD5$1() {
  HashBase.call(this, 64);
  this._a = 1732584193;
  this._b = 4023233417;
  this._c = 2562383102;
  this._d = 271733878;
}
inherits(MD5$1, HashBase);
MD5$1.prototype._update = function() {
  var M = ARRAY16;
  for (var i = 0; i < 16; ++i)
    M[i] = this._block.readInt32LE(i * 4);
  var a = this._a;
  var b = this._b;
  var c = this._c;
  var d = this._d;
  a = fnF(a, b, c, d, M[0], 3614090360, 7);
  d = fnF(d, a, b, c, M[1], 3905402710, 12);
  c = fnF(c, d, a, b, M[2], 606105819, 17);
  b = fnF(b, c, d, a, M[3], 3250441966, 22);
  a = fnF(a, b, c, d, M[4], 4118548399, 7);
  d = fnF(d, a, b, c, M[5], 1200080426, 12);
  c = fnF(c, d, a, b, M[6], 2821735955, 17);
  b = fnF(b, c, d, a, M[7], 4249261313, 22);
  a = fnF(a, b, c, d, M[8], 1770035416, 7);
  d = fnF(d, a, b, c, M[9], 2336552879, 12);
  c = fnF(c, d, a, b, M[10], 4294925233, 17);
  b = fnF(b, c, d, a, M[11], 2304563134, 22);
  a = fnF(a, b, c, d, M[12], 1804603682, 7);
  d = fnF(d, a, b, c, M[13], 4254626195, 12);
  c = fnF(c, d, a, b, M[14], 2792965006, 17);
  b = fnF(b, c, d, a, M[15], 1236535329, 22);
  a = fnG(a, b, c, d, M[1], 4129170786, 5);
  d = fnG(d, a, b, c, M[6], 3225465664, 9);
  c = fnG(c, d, a, b, M[11], 643717713, 14);
  b = fnG(b, c, d, a, M[0], 3921069994, 20);
  a = fnG(a, b, c, d, M[5], 3593408605, 5);
  d = fnG(d, a, b, c, M[10], 38016083, 9);
  c = fnG(c, d, a, b, M[15], 3634488961, 14);
  b = fnG(b, c, d, a, M[4], 3889429448, 20);
  a = fnG(a, b, c, d, M[9], 568446438, 5);
  d = fnG(d, a, b, c, M[14], 3275163606, 9);
  c = fnG(c, d, a, b, M[3], 4107603335, 14);
  b = fnG(b, c, d, a, M[8], 1163531501, 20);
  a = fnG(a, b, c, d, M[13], 2850285829, 5);
  d = fnG(d, a, b, c, M[2], 4243563512, 9);
  c = fnG(c, d, a, b, M[7], 1735328473, 14);
  b = fnG(b, c, d, a, M[12], 2368359562, 20);
  a = fnH(a, b, c, d, M[5], 4294588738, 4);
  d = fnH(d, a, b, c, M[8], 2272392833, 11);
  c = fnH(c, d, a, b, M[11], 1839030562, 16);
  b = fnH(b, c, d, a, M[14], 4259657740, 23);
  a = fnH(a, b, c, d, M[1], 2763975236, 4);
  d = fnH(d, a, b, c, M[4], 1272893353, 11);
  c = fnH(c, d, a, b, M[7], 4139469664, 16);
  b = fnH(b, c, d, a, M[10], 3200236656, 23);
  a = fnH(a, b, c, d, M[13], 681279174, 4);
  d = fnH(d, a, b, c, M[0], 3936430074, 11);
  c = fnH(c, d, a, b, M[3], 3572445317, 16);
  b = fnH(b, c, d, a, M[6], 76029189, 23);
  a = fnH(a, b, c, d, M[9], 3654602809, 4);
  d = fnH(d, a, b, c, M[12], 3873151461, 11);
  c = fnH(c, d, a, b, M[15], 530742520, 16);
  b = fnH(b, c, d, a, M[2], 3299628645, 23);
  a = fnI(a, b, c, d, M[0], 4096336452, 6);
  d = fnI(d, a, b, c, M[7], 1126891415, 10);
  c = fnI(c, d, a, b, M[14], 2878612391, 15);
  b = fnI(b, c, d, a, M[5], 4237533241, 21);
  a = fnI(a, b, c, d, M[12], 1700485571, 6);
  d = fnI(d, a, b, c, M[3], 2399980690, 10);
  c = fnI(c, d, a, b, M[10], 4293915773, 15);
  b = fnI(b, c, d, a, M[1], 2240044497, 21);
  a = fnI(a, b, c, d, M[8], 1873313359, 6);
  d = fnI(d, a, b, c, M[15], 4264355552, 10);
  c = fnI(c, d, a, b, M[6], 2734768916, 15);
  b = fnI(b, c, d, a, M[13], 1309151649, 21);
  a = fnI(a, b, c, d, M[4], 4149444226, 6);
  d = fnI(d, a, b, c, M[11], 3174756917, 10);
  c = fnI(c, d, a, b, M[2], 718787259, 15);
  b = fnI(b, c, d, a, M[9], 3951481745, 21);
  this._a = this._a + a | 0;
  this._b = this._b + b | 0;
  this._c = this._c + c | 0;
  this._d = this._d + d | 0;
};
MD5$1.prototype._digest = function() {
  this._block[this._blockOffset++] = 128;
  if (this._blockOffset > 56) {
    this._block.fill(0, this._blockOffset, 64);
    this._update();
    this._blockOffset = 0;
  }
  this._block.fill(0, this._blockOffset, 56);
  this._block.writeUInt32LE(this._length[0], 56);
  this._block.writeUInt32LE(this._length[1], 60);
  this._update();
  var buffer2 = Buffer.allocUnsafe(16);
  buffer2.writeInt32LE(this._a, 0);
  buffer2.writeInt32LE(this._b, 4);
  buffer2.writeInt32LE(this._c, 8);
  buffer2.writeInt32LE(this._d, 12);
  return buffer2;
};
function rotl(x, n) {
  return x << n | x >>> 32 - n;
}
function fnF(a, b, c, d, m, k, s) {
  return rotl(a + (b & c | ~b & d) + m + k | 0, s) + b | 0;
}
function fnG(a, b, c, d, m, k, s) {
  return rotl(a + (b & d | c & ~d) + m + k | 0, s) + b | 0;
}
function fnH(a, b, c, d, m, k, s) {
  return rotl(a + (b ^ c ^ d) + m + k | 0, s) + b | 0;
}
function fnI(a, b, c, d, m, k, s) {
  return rotl(a + (c ^ (b | ~d)) + m + k | 0, s) + b | 0;
}
var md5_js = MD5$1;
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
var __spread = commonjsGlobal && commonjsGlobal.__spread || function() {
  for (var ar = [], i = 0; i < arguments.length; i++)
    ar = ar.concat(__read(arguments[i]));
  return ar;
};
Object.defineProperty(dist, "__esModule", { value: true });
dist.toValue = formatData_1 = dist.formatData = dist.parseBody = dist.parseData = dist.checkLength = dist.errorInfo = dist.validSign = dist.filterData = void 0;
var lodash_1 = _;
var rule_judgment_1 = ruleJudgment;
var MD5 = md5_js;
function filterData(options, customize) {
  return function(data, errorCode) {
    var e_1, _a;
    var _b;
    var values = {};
    var _loop_1 = function(item2) {
      var key = item2.key, type = item2.type, rules = item2.rules, format = item2.format, defaultValue = item2.defaultValue, md5 = item2.md5, separator = item2.separator;
      var value = data[key];
      if (/\[\]$/.test(type) && !lodash_1.isArray(value)) {
        value = toValue("string")(value || "").split(separator || /\,/);
      }
      if (/\[\]$/.test(type) && lodash_1.isArray(value)) {
        var _a2 = __read((_b = type.match(/(\S+)(\[\])$/)) !== null && _b !== void 0 ? _b : [], 2), itype = _a2[1];
        value = lodash_1.compact(value).map(toValue(itype));
        if (rules) {
          value.forEach(function(v) {
            return validateRule(rules || [], customize)(v, errorCode);
          });
        }
        if (defaultValue && value.length === 0) {
          value = defaultValue;
        }
        if (format) {
          value = value.map(formatData(format, customize));
        }
      } else {
        value = toValue(type)(value);
        if (rules) {
          validateRule(rules, customize)(value, errorCode);
        }
        value = value !== null && value !== void 0 ? value : defaultValue;
        if (format) {
          value = formatData(format, customize)(value);
        }
        if (md5) {
          value = new MD5().update(lodash_1.template(md5)(values)).digest("hex");
        }
      }
      lodash_1.set(values, key, value);
    };
    try {
      for (var options_1 = __values(options), options_1_1 = options_1.next(); !options_1_1.done; options_1_1 = options_1.next()) {
        var item = options_1_1.value;
        _loop_1(item);
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (options_1_1 && !options_1_1.done && (_a = options_1.return))
          _a.call(options_1);
      } finally {
        if (e_1)
          throw e_1.error;
      }
    }
    return values;
  };
}
dist.filterData = filterData;
function validSign(options, sign) {
  if (sign === void 0) {
    sign = "sign";
  }
  return function(data) {
    var md5 = new MD5().update(lodash_1.template(options)(data)).digest("hex");
    return data[sign] === md5;
  };
}
dist.validSign = validSign;
function validateRule(rules, customize) {
  return function(value, errorCode) {
    var e_2, _a;
    try {
      for (var rules_1 = __values(rules), rules_1_1 = rules_1.next(); !rules_1_1.done; rules_1_1 = rules_1.next()) {
        var rule = rules_1_1.value;
        var required = rule.required, message2 = rule.message, min = rule.min, max = rule.max, pattern = rule.pattern, validator = rule.validator, code2 = rule.code;
        if (required && (lodash_1.isUndefined(value) || value === "")) {
          throw errorInfo(message2, code2 || errorCode);
        }
        if (lodash_1.isString(value)) {
          if (min && checkLength(value) < min) {
            throw errorInfo(message2, code2 || errorCode);
          }
          if (max && checkLength(value) > max) {
            throw errorInfo(message2, code2 || errorCode);
          }
          if (pattern) {
            var reg = getRegexp(pattern);
            if (!reg.test(value)) {
              throw errorInfo(message2, code2 || errorCode);
            }
          }
        }
        if (validator && lodash_1.isString(validator)) {
          if (customize) {
            validator = lodash_1.get(customize, validator);
          }
        }
        if (validator && lodash_1.isFunction(validator)) {
          if (!validator(value) || String(value) === "Invalid Date") {
            throw errorInfo(message2, code2 || errorCode);
          }
        }
      }
    } catch (e_2_1) {
      e_2 = { error: e_2_1 };
    } finally {
      try {
        if (rules_1_1 && !rules_1_1.done && (_a = rules_1.return))
          _a.call(rules_1);
      } finally {
        if (e_2)
          throw e_2.error;
      }
    }
  };
}
function errorInfo(message2, code2) {
  var error = new Error(message2);
  if (code2) {
    error.code = code2;
  }
  return error;
}
dist.errorInfo = errorInfo;
function checkLength(str) {
  var e_3, _a;
  var size = 0;
  if (lodash_1.isNull(str))
    return size;
  var arr = str.split("");
  try {
    for (var arr_1 = __values(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
      var word = arr_1_1.value;
      size++;
      /[^\x00-\xff]/g.test(word) && size++;
    }
  } catch (e_3_1) {
    e_3 = { error: e_3_1 };
  } finally {
    try {
      if (arr_1_1 && !arr_1_1.done && (_a = arr_1.return))
        _a.call(arr_1);
    } finally {
      if (e_3)
        throw e_3.error;
    }
  }
  return size;
}
dist.checkLength = checkLength;
function parseData(options, customize) {
  return function(data) {
    var e_4, _a;
    if (!options)
      return data;
    var separator = options.separator, collection = options.collection, omits = options.omits;
    var list = data.split(separator);
    var notResults = collection.filter(rule_judgment_1.default({ result: { $exists: false } }));
    var values = list.map(function(v, i) {
      var _a2 = notResults[i] || {}, type = _a2.type, format = _a2.format;
      var value = formatData(format, customize)(toValue(type)(v));
      return value;
    });
    var obj = lodash_1.zipObject(lodash_1.map(collection, "key"), values);
    var results = collection.filter(rule_judgment_1.default({ result: { $exists: true } }));
    try {
      for (var results_1 = __values(results), results_1_1 = results_1.next(); !results_1_1.done; results_1_1 = results_1.next()) {
        var item = results_1_1.value;
        lodash_1.set(obj, item.key, formatData(item.format, customize)(getResultValue(item.result, customize)(obj)));
      }
    } catch (e_4_1) {
      e_4 = { error: e_4_1 };
    } finally {
      try {
        if (results_1_1 && !results_1_1.done && (_a = results_1.return))
          _a.call(results_1);
      } finally {
        if (e_4)
          throw e_4.error;
      }
    }
    return lodash_1.omit(obj, omits || []);
  };
}
dist.parseData = parseData;
function parseBody(options, customize) {
  return function(msgbody) {
    if (!options)
      return msgbody;
    for (var key in msgbody) {
      var opts = options.find(rule_judgment_1.default({ key }));
      if (opts) {
        var parser = parseData(opts, customize);
        var value = msgbody[key];
        if (lodash_1.isArray(value)) {
          value = value.map(parser);
          if (opts.orderBy) {
            var _a = opts.orderBy, iteratees = _a.iteratees, orders = _a.orders;
            value = lodash_1.orderBy(value, iteratees, orders);
          }
        } else {
          parser(value);
        }
        lodash_1.set(msgbody, key, value);
      }
    }
    return msgbody;
  };
}
dist.parseBody = parseBody;
function formatData(formats, customize) {
  return function(value) {
    var e_5, _a;
    formats = lodash_1.isArray(formats) ? formats : lodash_1.compact([formats]);
    if (formats.length === 0)
      return value;
    try {
      for (var formats_1 = __values(formats), formats_1_1 = formats_1.next(); !formats_1_1.done; formats_1_1 = formats_1.next()) {
        var format = formats_1_1.value;
        value = formatUtil(format, customize)(value);
      }
    } catch (e_5_1) {
      e_5 = { error: e_5_1 };
    } finally {
      try {
        if (formats_1_1 && !formats_1_1.done && (_a = formats_1.return))
          _a.call(formats_1);
      } finally {
        if (e_5)
          throw e_5.error;
      }
    }
    return value;
  };
}
var formatData_1 = dist.formatData = formatData;
function formatUtil(format, customize) {
  return function(value) {
    if (!format)
      return value;
    var val = toValue(format.type)(value);
    if (format.regexp && lodash_1.isString(val)) {
      val = formatUtilRegexp(format.regexp, format.substr || "")(val);
    } else if (format.maps) {
      val = formatUtilMap(format.maps)(val);
    } else if (format.func) {
      val = formatUtilFunc(format.func, format.options, customize)(val);
    }
    return val;
  };
}
function formatUtilRegexp(regexp, substr) {
  return function(value) {
    return value.replace(getRegexp(regexp), substr);
  };
}
function formatUtilMap(options) {
  return function(value) {
    if (lodash_1.isString(options) && lodash_1.isPlainObject(value)) {
      return lodash_1.get(value, options);
    }
    if (lodash_1.isNumber(options) && lodash_1.isArray(value)) {
      return value[options] || value;
    }
    if (lodash_1.isPlainObject(options) && ["string", "number"].includes(typeof value)) {
      return options[value] || value;
    }
    return value;
  };
}
function formatUtilFunc(name, options, customize) {
  return function(value) {
    var _a;
    try {
      value = value[name || "toLocaleString"].apply(value, __spread(options || []));
    } catch (error) {
      value = (_a = lodash_1.get(customize, name)) === null || _a === void 0 ? void 0 : _a.apply(void 0, __spread([value], options || []));
    }
    return value;
  };
}
function getResultValue(options, customize) {
  return function(data) {
    var _a, _b;
    var defaultValue = options.defaultValue, formula = options.formula;
    if (formula) {
      var exec = formula.exec;
      var opts = (formula.opts || []).map(getValue(data, customize));
      if (typeof exec === "function") {
        return exec.apply(void 0, __spread(opts));
      }
      if (customize) {
        return (_a = lodash_1.get(customize, exec)) === null || _a === void 0 ? void 0 : _a.apply(void 0, __spread(opts));
      }
    }
    return (_b = getValue(data, customize)) === null || _b === void 0 ? void 0 : _b(defaultValue);
  };
}
function getValue(data, customize) {
  return function(value) {
    var _a;
    if (lodash_1.isString(value) && /^\$(\_){2}/.test(value)) {
      var _b = __read(value.match(/^\$(\_){2}([a-zA-Z0-9\_\-\.]+)/) || [], 3), key = _b[2];
      return lodash_1.get(data, key);
    }
    if (lodash_1.isArray(value)) {
      var _c = __read(value), exec = _c[0], opts = _c.slice(1);
      if (customize) {
        return (_a = lodash_1.get(customize, exec)) === null || _a === void 0 ? void 0 : _a.apply(void 0, __spread(opts));
      }
    }
    return value;
  };
}
function getRegexp(regexp) {
  if (lodash_1.isRegExp(regexp))
    return regexp;
  try {
    return new RegExp(regexp);
  } catch (error) {
    throw Error("This is not a regular expression.");
  }
}
function toValue(type) {
  if (type === void 0) {
    type = "string";
  }
  return function(value) {
    if (type === "any")
      return value;
    var val = value;
    if (lodash_1.isString(value)) {
      if (/^([\d\.]+)\%$/.test(value)) {
        val = Number(value.replace(/\%$/i, "")) / 100;
        val = String(val);
      } else if (type === "date") {
        val = new Date(rule_judgment_1.isDateString(value) ? value : /^\d+$/.test(value) ? Number(value) : value);
      } else if (type === "map") {
        try {
          val = rule_judgment_1.emit(value);
        } catch (error) {
          val = void 0;
        }
      }
    } else {
      if (type === "string" && !lodash_1.isUndefined(value)) {
        val = lodash_1.isPlainObject(value) ? JSON.stringify(value) : String(value);
      } else if (type === "date" && lodash_1.isNumber(value)) {
        val = new Date(value);
      }
    }
    if (type === "number") {
      if (lodash_1.isString(val) && !/^\d+$/.test(val) && rule_judgment_1.isDateString(val)) {
        val = new Date(val);
      }
      val = Number(val);
    }
    return val;
  };
}
dist.toValue = toValue;
var __defProp$7 = Object.defineProperty;
var __getOwnPropDesc$7 = Object.getOwnPropertyDescriptor;
var __decorateClass$7 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$7(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$7(target, key, result);
  return result;
};
let KlFormExpand$1 = class extends mixins(KlBaseMixin) {
};
__decorateClass$7([
  Prop()
], KlFormExpand$1.prototype, "data", 2);
__decorateClass$7([
  Prop()
], KlFormExpand$1.prototype, "values", 2);
KlFormExpand$1 = __decorateClass$7([
  Component({
    name: "KlFormExpand"
  })
], KlFormExpand$1);
var render$7 = function() {
  var _vm$data;
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("fragment", [_vm._l((_vm$data = _vm.data) !== null && _vm$data !== void 0 ? _vm$data : [], function(item, key) {
    var _item$children;
    return [_vm.isFilter(item.conditions, _vm.env) ? [item.type == "button" ? _c("el-button", {
      key,
      attrs: {
        "type": item.style,
        "disabled": _vm.isDisabled(item.disabled, {
          values: _vm.values
        }),
        "plain": ""
      },
      on: {
        "click": function($event) {
          var _item$command;
          return _vm.command((_item$command = item.command) !== null && _item$command !== void 0 ? _item$command : "", {});
        }
      }
    }, [_vm._v(" " + _vm._s(_vm.parseTemplate(item.name, _vm.env)) + " ")]) : item.type == "dropdown" ? _c("el-dropdown", {
      key,
      class: _vm.isDisabled(item.disabled, {
        values: _vm.values
      }) && "disabled",
      attrs: {
        "disabled": _vm.isDisabled(item.disabled, {
          values: _vm.values
        }),
        "hide-on-click": true
      },
      on: {
        "command": function(v) {
          return _vm.command(v, {});
        }
      }
    }, [_c("el-button", {
      attrs: {
        "plain": ""
      }
    }, [_vm._v(" " + _vm._s(item.name)), _c("i", {
      staticClass: "el-icon-arrow-down el-icon--right"
    })]), _c("el-dropdown-menu", {
      attrs: {
        "slot": "dropdown"
      },
      slot: "dropdown"
    }, [_vm._l((_item$children = item.children) !== null && _item$children !== void 0 ? _item$children : [], function(opt) {
      return [_c("el-dropdown-item", {
        key: opt.key,
        attrs: {
          "command": opt.command,
          "disabled": _vm.isDisabled(opt.disabled, {
            values: _vm.values
          })
        }
      }, [_vm._v(" " + _vm._s(opt.name) + " ")])];
    })], 2)], 1) : _vm._e()] : _vm._e()];
  })], 2);
};
var staticRenderFns$7 = [];
const __cssModules$7 = {};
var __component__$7 = /* @__PURE__ */ normalizeComponent(
  KlFormExpand$1,
  render$7,
  staticRenderFns$7,
  false,
  __vue2_injectStyles$7,
  null,
  null,
  null
);
function __vue2_injectStyles$7(context) {
  for (let o in __cssModules$7) {
    this[o] = __cssModules$7[o];
  }
}
var KlFormExpand = /* @__PURE__ */ function() {
  return __component__$7.exports;
}();
var __defProp$6 = Object.defineProperty;
var __getOwnPropDesc$6 = Object.getOwnPropertyDescriptor;
var __decorateClass$6 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$6(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$6(target, key, result);
  return result;
};
let KlPlanPicker$1 = class extends mixins(KlBaseMixin) {
  constructor() {
    super(...arguments);
    this.selected = "";
    this.data = [];
  }
  onDrafts(val) {
    this.data = val.filter((v) => v.associate == this.associate);
  }
  onValue(val, oldVal) {
    if (val === oldVal)
      return;
    if (val === this.selected)
      return;
    this.selected = val;
  }
  onSelected(val, oldVal) {
    if (val === oldVal)
      return;
    if (val === this.value)
      return;
    this.update(val);
  }
  update(value) {
  }
  change(value) {
  }
  updatePlan(type, options, next2) {
  }
  handleChange(value) {
    var _a;
    let item = (_a = this.drafts) == null ? void 0 : _a.find((v) => v.value == value);
    if (item) {
      this.change(item.content);
    }
  }
  handleCommand(value) {
    if (value == "create") {
      this.createData();
    } else if (value == "remove") {
      this.removeData();
    } else if (value == "clear") {
      this.selected = "";
      this.$emit("clear");
    }
  }
  handleSaveData() {
    if (this.selected) {
      this.updatePlan("update", { value: this.selected }, (node) => {
        var _a;
        this.selected = (_a = node == null ? void 0 : node.value) != null ? _a : "";
        this.$message.success(`${this.name}-[${node.label}]\u5DF2\u66F4\u65B0`);
      });
    } else {
      this.createData();
    }
  }
  async createData() {
    let options = {
      confirmButtonText: "\u786E\u5B9A",
      cancelButtonText: "\u53D6\u6D88",
      inputValidator: (value) => !!value.trim(),
      inputErrorMessage: `\u8BF7\u586B\u5199${this.name}\u540D\u79F0`,
      inputPlaceholder: `\u8BBE\u7F6E${this.name}\u540D\u79F0`,
      inputType: "text"
    };
    try {
      let result = await this.$prompt("", `\u521B\u5EFA${this.name}`, options);
      this.updatePlan("create", { label: result.value }, (node) => {
        var _a;
        this.selected = (_a = node == null ? void 0 : node.value) != null ? _a : "";
        this.$message.success(`${this.name}-[${node.label}]\u5DF2\u4FDD\u5B58`);
      });
    } catch (error) {
      this.$message.warning("\u60A8\u5DF2\u53D6\u6D88\u4FDD\u5B58\u64CD\u4F5C");
    }
  }
  removeData() {
    this.updatePlan("remove", { value: this.selected }, (node) => {
      if (node) {
        this.selected = "";
      }
    });
  }
};
__decorateClass$6([
  Prop()
], KlPlanPicker$1.prototype, "drafts", 2);
__decorateClass$6([
  Prop({ default: "\u8349\u7A3F" })
], KlPlanPicker$1.prototype, "name", 2);
__decorateClass$6([
  Prop()
], KlPlanPicker$1.prototype, "width", 2);
__decorateClass$6([
  Prop({ default: void 0 })
], KlPlanPicker$1.prototype, "placeholder", 2);
__decorateClass$6([
  Prop({ default: void 0 })
], KlPlanPicker$1.prototype, "associate", 2);
__decorateClass$6([
  Provide()
], KlPlanPicker$1.prototype, "selected", 2);
__decorateClass$6([
  Provide()
], KlPlanPicker$1.prototype, "data", 2);
__decorateClass$6([
  Watch("drafts")
], KlPlanPicker$1.prototype, "onDrafts", 1);
__decorateClass$6([
  Watch("value")
], KlPlanPicker$1.prototype, "onValue", 1);
__decorateClass$6([
  Watch("selected")
], KlPlanPicker$1.prototype, "onSelected", 1);
__decorateClass$6([
  Model("update")
], KlPlanPicker$1.prototype, "value", 2);
__decorateClass$6([
  Emit("update")
], KlPlanPicker$1.prototype, "update", 1);
__decorateClass$6([
  Emit("change")
], KlPlanPicker$1.prototype, "change", 1);
__decorateClass$6([
  Emit("update-plan")
], KlPlanPicker$1.prototype, "updatePlan", 1);
KlPlanPicker$1 = __decorateClass$6([
  Component({
    name: "KlPlanPicker",
    components: {
      KlFormItem
    },
    created() {
      this.data = this.drafts.filter((v) => v.associate === this.associate);
      this.selected = this.value;
    }
  })
], KlPlanPicker$1);
var render$6 = function() {
  var _vm$data;
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return ((_vm$data = _vm.data) === null || _vm$data === void 0 ? void 0 : _vm$data.length) > 0 ? _c("div", {
    staticClass: "inline"
  }, [_c("el-select", {
    style: {
      width: _vm.toStyleSize(_vm.width)
    },
    attrs: {
      "placeholder": _vm.placeholder,
      "filterable": ""
    },
    on: {
      "change": _vm.handleChange
    },
    model: {
      value: _vm.selected,
      callback: function($$v) {
        _vm.selected = $$v;
      },
      expression: "selected"
    }
  }, _vm._l(_vm.data, function(item, key) {
    return _c("el-option", {
      key,
      attrs: {
        "label": item.label,
        "value": item.value
      }
    });
  }), 1), _c("el-dropdown", {
    style: {
      marginLeft: 0
    },
    attrs: {
      "trigger": "click",
      "split-button": ""
    },
    on: {
      "click": _vm.handleSaveData,
      "command": _vm.handleCommand
    }
  }, [_c("span", [_vm._v("\u4FDD\u5B58" + _vm._s(_vm.name))]), _c("el-dropdown-menu", {
    attrs: {
      "slot": "dropdown"
    },
    slot: "dropdown"
  }, [_c("el-dropdown-item", {
    attrs: {
      "command": "create",
      "disabled": !_vm.selected
    }
  }, [_vm._v("\u53E6\u5B58")]), _c("el-dropdown-item", {
    attrs: {
      "command": "remove",
      "disabled": !_vm.selected
    }
  }, [_vm._v("\u5220\u9664")]), _c("el-dropdown-item", {
    attrs: {
      "command": "clear"
    }
  }, [_vm._v("\u6E05\u9664")])], 1)], 1)], 1) : _c("el-button", {
    attrs: {
      "plain": ""
    },
    on: {
      "click": _vm.handleSaveData
    }
  }, [_vm._v("\u4FDD\u5B58" + _vm._s(_vm.name))]);
};
var staticRenderFns$6 = [];
const __cssModules$6 = {};
var __component__$6 = /* @__PURE__ */ normalizeComponent(
  KlPlanPicker$1,
  render$6,
  staticRenderFns$6,
  false,
  __vue2_injectStyles$6,
  null,
  null,
  null
);
function __vue2_injectStyles$6(context) {
  for (let o in __cssModules$6) {
    this[o] = __cssModules$6[o];
  }
}
var KlPlanPicker = /* @__PURE__ */ function() {
  return __component__$6.exports;
}();
var __defProp$5 = Object.defineProperty;
var __getOwnPropDesc$5 = Object.getOwnPropertyDescriptor;
var __decorateClass$5 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$5(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$5(target, key, result);
  return result;
};
let KlForm$1 = class extends mixins(KlFormMixin) {
  constructor() {
    super(...arguments);
    this.Rules = {};
    this.DefaultValues = {};
    this.values = {};
    this.selectedDraft = "";
    this.parseRules = parseRules(this.validate);
  }
  getData(request, options, next2) {
  }
  updatePlan(type, options, next2) {
  }
  handleUpdatePlan(type, options, next2) {
    this.updatePlan(type, merge(options, { content: jsYaml.dump(this.values) }), next2);
  }
  handleSetValues(values) {
    if (isString(values)) {
      this.values = jsYaml.load(values);
    } else {
      this.values = values;
    }
  }
  handleChange() {
    console.log(this.values);
  }
  handleSubmit() {
    var _a;
    let theForm = (_a = this.$refs) == null ? void 0 : _a["theForm"];
    theForm.validate((valid) => {
      var _a2;
      if (valid) {
        let keys = map(this.columns.filter((v) => this.isFilter(v.conditions)), "key");
        let values = this.parseValues(pick(this.values, keys));
        let original = this.parseValues(pick(this.DefaultValues, keys));
        let { changeSubmit } = (_a2 = this.options) != null ? _a2 : {};
        if (changeSubmit && isEqual(omitBy(values, isUndefined), original)) {
          this.$message.warning(changeSubmit != null ? changeSubmit : "\u6570\u636E\u597D\u50CF\u6CA1\u4EC0\u4E48\u6539\u53D8\uFF0C\u65E0\u9700\u63D0\u4EA4");
          return;
        }
        let submitOptions = {
          ...this.options,
          next: (val) => {
            this.DefaultValues = assign(this.DefaultValues, val);
            this.values = cloneDeep(this.DefaultValues);
          }
        };
        let labelKeys = map(this.columns.filter(ruleJudgment({ labelOptions: { $exists: true } })), "labelOptions.key");
        values = merge(values, pick(this.values, labelKeys));
        this.submit(values, this.action, submitOptions);
      } else {
        return false;
      }
    });
  }
  parseValues(value) {
    var _a, _b;
    for (let [key, val] of Object.entries((_a = this.mergeField) != null ? _a : {})) {
      set(value, key, pick(value, val));
    }
    let values = this.exclude ? omit(value, this.exclude) : value;
    let items = this.columns.filter((v) => ["datetimerange", "daterange", "monthrange"].includes(v.type));
    for (let item of items) {
      let keys = item.key.split(/\_{2}/);
      if (keys.length === 2) {
        values = merge(values, zipObject(keys, values == null ? void 0 : values[item.key]));
        unset(values, item.key);
      }
    }
    for (let [key, format] of Object.entries((_b = this.valueFormat) != null ? _b : {})) {
      values[key] = formatData_1(format)(values == null ? void 0 : values[key]);
    }
    return values;
  }
  handleRest() {
    var _a;
    let theForm = (_a = this.$refs) == null ? void 0 : _a["theForm"];
    theForm.resetFields();
    this.$emit("reset", this.DefaultValues);
    this.values = cloneDeep(this.DefaultValues);
    this.selectedDraft = "";
  }
};
__decorateClass$5([
  Provide()
], KlForm$1.prototype, "Rules", 2);
__decorateClass$5([
  Provide()
], KlForm$1.prototype, "DefaultValues", 2);
__decorateClass$5([
  Provide()
], KlForm$1.prototype, "values", 2);
__decorateClass$5([
  Provide()
], KlForm$1.prototype, "selectedDraft", 2);
__decorateClass$5([
  Emit("get-data")
], KlForm$1.prototype, "getData", 1);
__decorateClass$5([
  Emit("update-plan")
], KlForm$1.prototype, "updatePlan", 1);
KlForm$1 = __decorateClass$5([
  Component({
    name: "KlForm",
    components: {
      KlFormItem,
      KlFormExpand,
      KlPlanPicker
    },
    created() {
      this.Rules = parseRules(this.validate)(this.rules, this);
      this.DefaultValues = parseParams(this.defaultValues)(this.env);
      this.values = cloneDeep(this.DefaultValues);
    }
  })
], KlForm$1);
var render$5 = function() {
  var _vm$options, _vm$options2, _vm$options3, _vm$options4, _vm$options5, _vm$options6, _vm$options6$draft, _vm$options7, _vm$options7$draft, _vm$options8, _vm$options8$draft, _vm$options$draft$dat, _vm$options9, _vm$options9$draft, _vm$options10, _vm$options10$draft;
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    staticClass: "form-container",
    class: _vm.border && "border"
  }, [_c("el-form", {
    ref: "theForm",
    attrs: {
      "model": _vm.values,
      "rules": _vm.Rules,
      "label-width": _vm.toStyleSize(_vm.labelWidth),
      "label-position": _vm.labelPosition,
      "label-suffix": _vm.labelSuffix,
      "inline": _vm.inline,
      "inline-message": _vm.inlineMessage,
      "status-icon": _vm.statusIcon,
      "hide-required-asterisk": _vm.hideRequiredAsterisk,
      "disabled": _vm.disabled
    },
    nativeOn: {
      "keyup": function($event) {
        if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter"))
          return null;
        return _vm.handleSubmit.apply(null, arguments);
      },
      "submit": function($event) {
        $event.preventDefault();
        return _vm.handleSubmit.apply(null, arguments);
      }
    }
  }, [_c("el-row", {
    attrs: {
      "gutter": 20
    }
  }, [_c("el-col", {
    attrs: {
      "span": 24
    }
  }, [_vm._l(_vm.columns, function(item, key) {
    var _vm$Rules;
    return [_c("el-form-item", {
      key,
      ref: item.key,
      refInFor: true,
      style: {
        paddingRight: 0
      },
      attrs: {
        "label": item.label,
        "rules": (_vm$Rules = _vm.Rules) === null || _vm$Rules === void 0 ? void 0 : _vm$Rules[item.key],
        "prop": item.key,
        "label-width": _vm.toStyleSize(item.labelWidth)
      }
    }, [item.labelOptions ? _c("template", {
      slot: "label"
    }, [_c("el-select", {
      style: {
        width: "calc(100% - 14px)"
      },
      model: {
        value: _vm.values[item.labelOptions.key],
        callback: function($$v) {
          _vm.$set(_vm.values, item.labelOptions.key, $$v);
        },
        expression: "values[item.labelOptions.key]"
      }
    }, _vm._l(item.labelOptions.options, function(name, key2) {
      return _c("el-option", {
        key: key2,
        attrs: {
          "label": name,
          "value": key2
        }
      });
    }), 1)], 1) : _vm._e(), _c("kl-form-item", {
      attrs: {
        "type": item.type,
        "placeholder": item === null || item === void 0 ? void 0 : item.placeholder,
        "disabled": _vm.isDisabled(item === null || item === void 0 ? void 0 : item.disabled),
        "width": item === null || item === void 0 ? void 0 : item.width,
        "size": item === null || item === void 0 ? void 0 : item.size,
        "format": item === null || item === void 0 ? void 0 : item.format,
        "value-format": item === null || item === void 0 ? void 0 : item.valueFormat,
        "options": item === null || item === void 0 ? void 0 : item.options,
        "data": item === null || item === void 0 ? void 0 : item.data,
        "props": item === null || item === void 0 ? void 0 : item.props,
        "pickerOptions": item === null || item === void 0 ? void 0 : item.pickerOptions,
        "readonly": item === null || item === void 0 ? void 0 : item.readonly,
        "request-options": item === null || item === void 0 ? void 0 : item.requestOptions
      },
      on: {
        "get-data": _vm.getData,
        "change": _vm.handleChange
      },
      model: {
        value: _vm.values[item.key],
        callback: function($$v) {
          _vm.$set(_vm.values, item.key, $$v);
        },
        expression: "values[item.key]"
      }
    })], 2)];
  })], 2)], 1), !((_vm$options = _vm.options) !== null && _vm$options !== void 0 && _vm$options.hide) ? _c("el-row", {
    attrs: {
      "gutter": 20
    }
  }, [_c("el-col", {
    attrs: {
      "span": 24
    }
  }, [_c("div", {
    staticClass: "el-form-item",
    class: _vm.inline ? "footer" : "",
    style: {
      marginLeft: `${_vm.toStyleSize(_vm.labelWidth)}`
    }
  }, [_c("el-button", {
    attrs: {
      "type": "primary",
      "native-type": "submit",
      "loading": _vm.loading
    }
  }, [_vm._v(" " + _vm._s(_vm.submitName) + " ")]), (_vm$options2 = _vm.options) !== null && _vm$options2 !== void 0 && _vm$options2.reset ? _c("el-button", {
    attrs: {
      "plain": ""
    },
    on: {
      "click": _vm.handleRest
    }
  }, [_vm._v(_vm._s((_vm$options3 = _vm.options) === null || _vm$options3 === void 0 ? void 0 : _vm$options3.reset))]) : _vm._e(), _c("kl-form-expand", {
    attrs: {
      "data": (_vm$options4 = _vm.options) === null || _vm$options4 === void 0 ? void 0 : _vm$options4.emits,
      "env": _vm.env,
      "values": _vm.values
    },
    on: {
      "command": _vm.command
    }
  }), (_vm$options5 = _vm.options) !== null && _vm$options5 !== void 0 && _vm$options5.draft ? _c("kl-plan-picker", {
    attrs: {
      "name": (_vm$options6 = _vm.options) === null || _vm$options6 === void 0 ? void 0 : (_vm$options6$draft = _vm$options6.draft) === null || _vm$options6$draft === void 0 ? void 0 : _vm$options6$draft.name,
      "placeholder": (_vm$options7 = _vm.options) === null || _vm$options7 === void 0 ? void 0 : (_vm$options7$draft = _vm$options7.draft) === null || _vm$options7$draft === void 0 ? void 0 : _vm$options7$draft.placeholder,
      "width": (_vm$options8 = _vm.options) === null || _vm$options8 === void 0 ? void 0 : (_vm$options8$draft = _vm$options8.draft) === null || _vm$options8$draft === void 0 ? void 0 : _vm$options8$draft.width,
      "drafts": (_vm$options$draft$dat = (_vm$options9 = _vm.options) === null || _vm$options9 === void 0 ? void 0 : (_vm$options9$draft = _vm$options9.draft) === null || _vm$options9$draft === void 0 ? void 0 : _vm$options9$draft.data) !== null && _vm$options$draft$dat !== void 0 ? _vm$options$draft$dat : [],
      "associate": (_vm$options10 = _vm.options) === null || _vm$options10 === void 0 ? void 0 : (_vm$options10$draft = _vm$options10.draft) === null || _vm$options10$draft === void 0 ? void 0 : _vm$options10$draft.associate
    },
    on: {
      "update-plan": _vm.handleUpdatePlan,
      "clear": _vm.handleRest,
      "change": _vm.handleSetValues
    },
    model: {
      value: _vm.selectedDraft,
      callback: function($$v) {
        _vm.selectedDraft = $$v;
      },
      expression: "selectedDraft"
    }
  }) : _vm._e()], 1)])], 1) : _vm._e()], 1)], 1);
};
var staticRenderFns$5 = [];
var form_vue_vue_type_style_index_0_lang = "";
const __cssModules$5 = {};
var __component__$5 = /* @__PURE__ */ normalizeComponent(
  KlForm$1,
  render$5,
  staticRenderFns$5,
  false,
  __vue2_injectStyles$5,
  null,
  null,
  null
);
function __vue2_injectStyles$5(context) {
  for (let o in __cssModules$5) {
    this[o] = __cssModules$5[o];
  }
}
var KlForm = /* @__PURE__ */ function() {
  return __component__$5.exports;
}();
var __defProp$4 = Object.defineProperty;
var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
var __decorateClass$4 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$4(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$4(target, key, result);
  return result;
};
let KlDialog$1 = class extends mixins(KlBaseMixin) {
  constructor() {
    super(...arguments);
    this.fullscreen = false;
  }
  onVisibleChange(val, oldVal) {
    if (val === oldVal)
      return;
    if (val && this.showFullscreen == "open") {
      this.fullscreen = true;
    }
  }
  handleClose() {
    this.$emit("close");
    this.fullscreen = false;
  }
  handleSubmit() {
    this.$emit("submit");
    this.fullscreen = false;
  }
};
__decorateClass$4([
  Prop({ default: false })
], KlDialog$1.prototype, "loading", 2);
__decorateClass$4([
  Prop({ default: "" })
], KlDialog$1.prototype, "title", 2);
__decorateClass$4([
  Prop({ default: false })
], KlDialog$1.prototype, "visible", 2);
__decorateClass$4([
  Prop()
], KlDialog$1.prototype, "width", 2);
__decorateClass$4([
  Prop({ default: "100px" })
], KlDialog$1.prototype, "height", 2);
__decorateClass$4([
  Prop({ default: false })
], KlDialog$1.prototype, "center", 2);
__decorateClass$4([
  Prop({ default: true })
], KlDialog$1.prototype, "closeOnClickModal", 2);
__decorateClass$4([
  Prop({ default: true })
], KlDialog$1.prototype, "closeOnPressEscape", 2);
__decorateClass$4([
  Prop({ default: true })
], KlDialog$1.prototype, "showClose", 2);
__decorateClass$4([
  Prop({ default: false })
], KlDialog$1.prototype, "showFullscreen", 2);
__decorateClass$4([
  Prop({ default: false })
], KlDialog$1.prototype, "showFooter", 2);
__decorateClass$4([
  Prop({ default: "\u786E \u5B9A" })
], KlDialog$1.prototype, "confirmButtonText", 2);
__decorateClass$4([
  Prop({ default: "\u53D6 \u6D88" })
], KlDialog$1.prototype, "cancelButtonText", 2);
__decorateClass$4([
  Provide()
], KlDialog$1.prototype, "fullscreen", 2);
__decorateClass$4([
  Watch("visible")
], KlDialog$1.prototype, "onVisibleChange", 1);
KlDialog$1 = __decorateClass$4([
  Component({
    name: "KlDialog"
  })
], KlDialog$1);
var render$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("el-dialog", {
    attrs: {
      "title": _vm.title,
      "width": _vm.toStyleSize(_vm.width),
      "fullscreen": _vm.fullscreen,
      "visible": _vm.visible,
      "append-to-body": true,
      "close-on-click-modal": _vm.closeOnClickModal,
      "close-on-press-escape": _vm.closeOnPressEscape,
      "destroy-on-close": true,
      "show-close": _vm.showClose,
      "center": _vm.center
    },
    on: {
      "close": _vm.handleClose
    }
  }, [_c("div", {
    staticClass: "el-dialog__header_left",
    attrs: {
      "slot": "title"
    },
    slot: "title"
  }, [_c("span", {
    staticClass: "el-dialog__title"
  }, [_vm._v(_vm._s(_vm.title))]), _vm.showFullscreen ? _c("el-button", {
    staticStyle: {
      "float": "right"
    },
    attrs: {
      "icon": _vm.fullscreen ? "el-icon-copy-document" : "el-icon-full-screen"
    },
    on: {
      "click": function($event) {
        _vm.fullscreen = !_vm.fullscreen;
      }
    }
  }) : _vm._e()], 1), _c("section", {
    style: Object.assign({
      minHeight: `${_vm.toStyleSize(_vm.height)}`,
      display: "flex"
    }, !_vm.fullscreen ? {
      maxHeight: `${_vm.toStyleSize(_vm.height)}`
    } : null)
  }, [_c("perfect-scrollbar", {
    staticStyle: {
      "flex": "1"
    },
    attrs: {
      "options": {
        suppressScrollX: true
      }
    }
  }, [_vm._t("default")], 2)], 1), _vm.showFooter ? _c("span", {
    staticClass: "dialog-footer",
    attrs: {
      "slot": "footer"
    },
    slot: "footer"
  }, [_c("div", {
    staticClass: "dialog-footer-left"
  }, [_vm._t("tools")], 2), _c("el-button", {
    on: {
      "click": _vm.handleClose
    }
  }, [_vm._v(_vm._s(_vm.cancelButtonText))]), _vm.showFooter == "confirm" ? _c("el-button", {
    attrs: {
      "type": "primary",
      "loading": _vm.loading
    },
    on: {
      "click": _vm.handleSubmit
    }
  }, [_vm._v(_vm._s(_vm.confirmButtonText))]) : _vm._e()], 1) : _vm._e()]);
};
var staticRenderFns$4 = [];
var dialog_vue_vue_type_style_index_0_lang = "";
const __cssModules$4 = {};
var __component__$4 = /* @__PURE__ */ normalizeComponent(
  KlDialog$1,
  render$4,
  staticRenderFns$4,
  false,
  __vue2_injectStyles$4,
  null,
  null,
  null
);
function __vue2_injectStyles$4(context) {
  for (let o in __cssModules$4) {
    this[o] = __cssModules$4[o];
  }
}
var KlDialog = /* @__PURE__ */ function() {
  return __component__$4.exports;
}();
var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$3(target, key, result);
  return result;
};
let KlDiakogForm = class extends mixins(KlFormMixin) {
  handleClose(submit) {
    let dialogForm2 = this.$refs["dialogForm"];
    if (submit) {
      dialogForm2.handleSubmit();
    } else {
      this.$emit("close");
    }
  }
};
__decorateClass$3([
  Prop({ default: "\u6807\u9898" })
], KlDiakogForm.prototype, "title", 2);
__decorateClass$3([
  Prop({ default: false })
], KlDiakogForm.prototype, "visible", 2);
__decorateClass$3([
  Prop({ default: 500 })
], KlDiakogForm.prototype, "width", 2);
__decorateClass$3([
  Prop({ default: "fit-content" })
], KlDiakogForm.prototype, "height", 2);
__decorateClass$3([
  Prop({ default: false })
], KlDiakogForm.prototype, "center", 2);
__decorateClass$3([
  Prop({ default: true })
], KlDiakogForm.prototype, "closeOnClickModal", 2);
__decorateClass$3([
  Prop({ default: true })
], KlDiakogForm.prototype, "closeOnPressEscape", 2);
__decorateClass$3([
  Prop({ default: false })
], KlDiakogForm.prototype, "showClose", 2);
__decorateClass$3([
  Prop({ default: "\u786E \u5B9A" })
], KlDiakogForm.prototype, "confirmButtonText", 2);
__decorateClass$3([
  Prop({ default: "\u53D6 \u6D88" })
], KlDiakogForm.prototype, "cancelButtonText", 2);
KlDiakogForm = __decorateClass$3([
  Component({
    name: "KlDiakogForm",
    components: {
      KlDialog,
      KlForm,
      KlFormExpand
    }
  })
], KlDiakogForm);
var render$3 = function() {
  var _vm$options;
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("kl-dialog", {
    attrs: {
      "title": _vm.title,
      "width": _vm.width,
      "height": _vm.height,
      "visible": _vm.visible,
      "center": _vm.center,
      "show-footer": "confirm",
      "show-close": _vm.showClose,
      "loading": _vm.loading,
      "close-on-click-modal": _vm.closeOnClickModal,
      "close-on-press-escape": _vm.closeOnPressEscape,
      "confirm-button-text": _vm.confirmButtonText,
      "cancel-button-text": _vm.cancelButtonText
    },
    on: {
      "submit": function($event) {
        return _vm.handleClose(true);
      },
      "close": function($event) {
        return _vm.handleClose(false);
      }
    }
  }, [_c("kl-form", {
    ref: "dialogForm",
    attrs: {
      "columns": _vm.columns,
      "rules": _vm.rules,
      "default-values": _vm.defaultValues,
      "label-width": _vm.labelWidth,
      "label-position": _vm.labelPosition,
      "label-suffix": _vm.labelSuffix,
      "validate": _vm.validate,
      "options": {
        hide: true
      },
      "hide-required-asterisk": _vm.hideRequiredAsterisk,
      "status-icon": _vm.statusIcon,
      "value-format": _vm.valueFormat,
      "exclude": _vm.exclude,
      "merge-field": _vm.mergeField,
      "unique-method": _vm.uniqueMethod,
      "action": _vm.action,
      "loading": _vm.loading
    },
    on: {
      "submit": _vm.submit
    }
  }), _c("template", {
    slot: "tools"
  }, [_c("kl-form-expand", {
    attrs: {
      "data": (_vm$options = _vm.options) === null || _vm$options === void 0 ? void 0 : _vm$options.emits,
      "env": _vm.env
    },
    on: {
      "command": _vm.command
    }
  })], 1)], 2);
};
var staticRenderFns$3 = [];
const __cssModules$3 = {};
var __component__$3 = /* @__PURE__ */ normalizeComponent(
  KlDiakogForm,
  render$3,
  staticRenderFns$3,
  false,
  __vue2_injectStyles$3,
  null,
  null,
  null
);
function __vue2_injectStyles$3(context) {
  for (let o in __cssModules$3) {
    this[o] = __cssModules$3[o];
  }
}
var dialogForm = /* @__PURE__ */ function() {
  return __component__$3.exports;
}();
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$2(target, key, result);
  return result;
};
let KlTableColumnCell = class extends mixins(KlBaseMixin) {
  constructor() {
    super(...arguments);
    this.get = get;
  }
  getValue(row, key) {
    let value = get(row, key);
    let { format, defaultValue } = this.column;
    return formatString(this.customize)(value, format, defaultValue);
  }
  getAlpha(conditions, scope) {
    let isFilter2 = this.isFilter(conditions, scope);
    return isFilter2 ? "" : "opacoty:.7";
  }
  handleClipboard(value) {
    return value;
  }
  blockData(data, query, row) {
    let filter = this.getFilter(query, { ...this.env, row });
    let tmpData = [];
    for (let item of data) {
      if (filter(item)) {
        item.disabled = true;
      }
      tmpData.push(item);
    }
    return tmpData;
  }
};
__decorateClass$2([
  Prop()
], KlTableColumnCell.prototype, "scope", 2);
__decorateClass$2([
  Prop()
], KlTableColumnCell.prototype, "column", 2);
__decorateClass$2([
  Prop({ default: void 0 })
], KlTableColumnCell.prototype, "customize", 2);
KlTableColumnCell = __decorateClass$2([
  Component({
    name: "KlTableColumnCell"
  })
], KlTableColumnCell);
var render$2 = function() {
  var _vm$column2, _vm$column3, _vm$column4, _vm$scope13, _vm$scope14, _vm$scope15, _vm$column5, _vm$scope16, _vm$scope18, _vm$column7, _vm$column8, _vm$column9, _vm$column10, _vm$column11, _vm$scope21, _vm$column12, _vm$scope22, _vm$scope23, _vm$scope24;
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.column.emits ? _c("fragment", [_vm._l(_vm.column.emits, function(emit) {
    var _vm$scope, _vm$scope2, _emit$children, _vm$scope7, _emit$formitem, _emit$dataBlock$key, _emit$dataBlock, _emit$dataBlock2, _vm$scope9, _emit$formitem2, _emit$formitem3, _vm$scope10, _vm$scope11, _vm$column;
    return [_vm.isFilter(emit.conditions, {
      row: (_vm$scope = _vm.scope) === null || _vm$scope === void 0 ? void 0 : _vm$scope.row
    }) ? [emit.type == "dropdown" ? _c("el-dropdown", {
      key: emit.key,
      class: _vm.isDisabled(emit.disabled, {
        row: (_vm$scope2 = _vm.scope) === null || _vm$scope2 === void 0 ? void 0 : _vm$scope2.row
      }) && "el-dropdown-disabled",
      attrs: {
        "size": "small",
        "trigger": "click",
        "split-button": ""
      },
      on: {
        "click": function($event) {
          var _vm$scope3, _emit$command, _vm$scope4;
          !_vm.isDisabled(emit.disabled, {
            row: (_vm$scope3 = _vm.scope) === null || _vm$scope3 === void 0 ? void 0 : _vm$scope3.row
          }) && _vm.command((_emit$command = emit === null || emit === void 0 ? void 0 : emit.command) !== null && _emit$command !== void 0 ? _emit$command : "", (_vm$scope4 = _vm.scope) === null || _vm$scope4 === void 0 ? void 0 : _vm$scope4.row);
        },
        "command": function(value) {
          var _vm$scope5, _vm$$parent, _vm$$parent$$children;
          return _vm.command(value, (_vm$scope5 = _vm.scope) === null || _vm$scope5 === void 0 ? void 0 : _vm$scope5.row, (_vm$$parent = _vm.$parent) === null || _vm$$parent === void 0 ? void 0 : (_vm$$parent$$children = _vm$$parent.$children) === null || _vm$$parent$$children === void 0 ? void 0 : _vm$$parent$$children[0]);
        }
      }
    }, [_c("span", [_vm._v(_vm._s(emit.name))]), _c("el-dropdown-menu", {
      attrs: {
        "slot": "dropdown"
      },
      slot: "dropdown"
    }, [_vm._l((_emit$children = emit.children) !== null && _emit$children !== void 0 ? _emit$children : [], function(item) {
      var _vm$scope6;
      return [_vm.isFilter(item.conditions, {
        row: _vm.scope.row
      }) ? _c("el-dropdown-item", {
        key: item.key,
        attrs: {
          "command": item.command,
          "disabled": _vm.isDisabled(item.disabled, {
            row: (_vm$scope6 = _vm.scope) === null || _vm$scope6 === void 0 ? void 0 : _vm$scope6.row
          })
        }
      }, [_vm._v(" " + _vm._s(item.name) + " ")]) : _vm._e()];
    })], 2)], 1) : emit.type == "button" ? _c("el-button", {
      key: emit.key,
      attrs: {
        "size": "small",
        "type": emit.style,
        "disabled": _vm.isDisabled(emit.disabled, {
          row: (_vm$scope7 = _vm.scope) === null || _vm$scope7 === void 0 ? void 0 : _vm$scope7.row
        })
      },
      on: {
        "click": function($event) {
          var _emit$command2, _vm$scope8;
          return _vm.command((_emit$command2 = emit === null || emit === void 0 ? void 0 : emit.command) !== null && _emit$command2 !== void 0 ? _emit$command2 : "", (_vm$scope8 = _vm.scope) === null || _vm$scope8 === void 0 ? void 0 : _vm$scope8.row);
        }
      }
    }, [_vm._v(" " + _vm._s(emit.name) + " ")]) : emit.type == "select" ? _c("kl-form-item", {
      key: emit.key,
      attrs: {
        "size": "small",
        "type": emit.type,
        "data": _vm.blockData(((_emit$formitem = emit.formitem) === null || _emit$formitem === void 0 ? void 0 : _emit$formitem.data) || _vm.get(_vm.env, (_emit$dataBlock$key = (_emit$dataBlock = emit.dataBlock) === null || _emit$dataBlock === void 0 ? void 0 : _emit$dataBlock.key) !== null && _emit$dataBlock$key !== void 0 ? _emit$dataBlock$key : ""), (_emit$dataBlock2 = emit.dataBlock) === null || _emit$dataBlock2 === void 0 ? void 0 : _emit$dataBlock2.query, (_vm$scope9 = _vm.scope) === null || _vm$scope9 === void 0 ? void 0 : _vm$scope9.row),
        "format": (_emit$formitem2 = emit.formitem) === null || _emit$formitem2 === void 0 ? void 0 : _emit$formitem2.format,
        "props": (_emit$formitem3 = emit.formitem) === null || _emit$formitem3 === void 0 ? void 0 : _emit$formitem3.props,
        "disabled": _vm.isDisabled(emit.disabled, {
          row: (_vm$scope10 = _vm.scope) === null || _vm$scope10 === void 0 ? void 0 : _vm$scope10.row
        }),
        "value": _vm.get((_vm$scope11 = _vm.scope) === null || _vm$scope11 === void 0 ? void 0 : _vm$scope11.row, (_vm$column = _vm.column) === null || _vm$column === void 0 ? void 0 : _vm$column.key)
      },
      on: {
        "change": function(value) {
          var _emit$command3, _vm$scope12, _vm$command;
          return _vm.command((_emit$command3 = emit.command) !== null && _emit$command3 !== void 0 ? _emit$command3 : "", (_vm$scope12 = _vm.scope) === null || _vm$scope12 === void 0 ? void 0 : _vm$scope12.row, (_vm$command = {}, _vm$command[_vm.column.key] = value, _vm$command));
        }
      }
    }) : _vm._e()] : _vm._e()];
  })], 2) : (_vm$column2 = _vm.column) !== null && _vm$column2 !== void 0 && _vm$column2.clipboard ? _c("el-tooltip", {
    attrs: {
      "content": ((_vm$column3 = _vm.column) === null || _vm$column3 === void 0 ? void 0 : _vm$column3.clipboard) == true ? "\u70B9\u51FB\u590D\u5236" : (_vm$column4 = _vm.column) === null || _vm$column4 === void 0 ? void 0 : _vm$column4.clipboard,
      "placement": "top"
    }
  }, [_c("el-link", {
    directives: [{
      name: "clipboard",
      rawName: "v-clipboard",
      value: _vm.handleClipboard(_vm.getValue((_vm$scope13 = _vm.scope) === null || _vm$scope13 === void 0 ? void 0 : _vm$scope13.row, _vm.column.key)),
      expression: "handleClipboard(getValue(scope?.row, column.key))"
    }],
    style: _vm.getAlpha(_vm.column.alpha, {
      row: (_vm$scope14 = _vm.scope) === null || _vm$scope14 === void 0 ? void 0 : _vm$scope14.row
    })
  }, [_vm._v(" " + _vm._s(_vm.getValue((_vm$scope15 = _vm.scope) === null || _vm$scope15 === void 0 ? void 0 : _vm$scope15.row, _vm.column.key)) + " ")])], 1) : (_vm$column5 = _vm.column) !== null && _vm$column5 !== void 0 && _vm$column5.click ? _c("el-link", {
    style: _vm.getAlpha(_vm.column.alpha, {
      row: (_vm$scope16 = _vm.scope) === null || _vm$scope16 === void 0 ? void 0 : _vm$scope16.row
    }),
    on: {
      "click": function($event) {
        var _vm$column6, _vm$scope17;
        return _vm.command((_vm$column6 = _vm.column) === null || _vm$column6 === void 0 ? void 0 : _vm$column6.click, (_vm$scope17 = _vm.scope) === null || _vm$scope17 === void 0 ? void 0 : _vm$scope17.row);
      }
    }
  }, [_vm._v(" " + _vm._s(_vm.getValue((_vm$scope18 = _vm.scope) === null || _vm$scope18 === void 0 ? void 0 : _vm$scope18.row, _vm.column.key)) + " ")]) : (_vm$column7 = _vm.column) !== null && _vm$column7 !== void 0 && _vm$column7.status ? _c("fragment", [_vm._l((_vm$column8 = _vm.column) === null || _vm$column8 === void 0 ? void 0 : _vm$column8.status, function(item) {
    var _vm$scope19;
    return [_vm.isFilter(item.conditions, {
      row: (_vm$scope19 = _vm.scope) === null || _vm$scope19 === void 0 ? void 0 : _vm$scope19.row
    }) ? _c("el-tag", {
      key: item.key,
      attrs: {
        "type": item.style
      }
    }, [_vm._v(_vm._s(item.name))]) : _vm._e()];
  })], 2) : (_vm$column9 = _vm.column) !== null && _vm$column9 !== void 0 && _vm$column9.dots ? _c("fragment", [_vm._l((_vm$column10 = _vm.column) === null || _vm$column10 === void 0 ? void 0 : _vm$column10.dots, function(item) {
    var _vm$scope20;
    return [_vm.isFilter(item.conditions, {
      row: (_vm$scope20 = _vm.scope) === null || _vm$scope20 === void 0 ? void 0 : _vm$scope20.row
    }) ? [item.name ? _c("i", {
      key: item.key,
      staticClass: "dot",
      class: item.name
    }) : _c("span", {
      key: item.key,
      staticClass: "dot",
      style: item.style
    }, [_vm._v("\u25CF")])] : _vm._e()];
  })], 2) : (_vm$column11 = _vm.column) !== null && _vm$column11 !== void 0 && _vm$column11.template ? _c("span", {
    style: _vm.getAlpha(_vm.column.alpha, {
      row: (_vm$scope21 = _vm.scope) === null || _vm$scope21 === void 0 ? void 0 : _vm$scope21.row
    })
  }, [_vm._v(_vm._s(_vm.parseTemplate((_vm$column12 = _vm.column) === null || _vm$column12 === void 0 ? void 0 : _vm$column12.template, (_vm$scope22 = _vm.scope) === null || _vm$scope22 === void 0 ? void 0 : _vm$scope22.row)))]) : _c("span", {
    style: _vm.getAlpha(_vm.column.alpha, {
      row: (_vm$scope23 = _vm.scope) === null || _vm$scope23 === void 0 ? void 0 : _vm$scope23.row
    })
  }, [_vm._v(_vm._s(_vm.getValue((_vm$scope24 = _vm.scope) === null || _vm$scope24 === void 0 ? void 0 : _vm$scope24.row, _vm.column.key)))]);
};
var staticRenderFns$2 = [];
var columnCell_vue_vue_type_style_index_0_lang = "";
const __cssModules$2 = {};
var __component__$2 = /* @__PURE__ */ normalizeComponent(
  KlTableColumnCell,
  render$2,
  staticRenderFns$2,
  false,
  __vue2_injectStyles$2,
  null,
  null,
  null
);
function __vue2_injectStyles$2(context) {
  for (let o in __cssModules$2) {
    this[o] = __cssModules$2[o];
  }
}
var KlColumnCell = /* @__PURE__ */ function() {
  return __component__$2.exports;
}();
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
let KlTable = class extends mixins(KlBaseMixin) {
  constructor() {
    super(...arguments);
    this.cdata = [];
    this.pdata = [];
    this.current = 1;
    this.total = 0;
  }
  toPage(page) {
  }
  currentChange(values) {
  }
  selectionChange(values) {
  }
  onData(val, oldVal) {
    if (val === oldVal)
      return;
    this.initialData(val);
  }
  initialData(data) {
    var _a;
    this.cdata = data != null ? data : [];
    if (this.counts > -1) {
      this.total == this.counts;
      this.pdata = data != null ? data : [];
      this.current = this.pageno;
    } else {
      let theTable = (_a = this.$refs) == null ? void 0 : _a["filterTable"];
      theTable.clearFilter();
      this.total = data.length;
      let size = this.pagination || 10;
      let pageno = (this.total + size - 1) / size;
      pageno = parseInt(pageno.toString()) || 1;
      this.handleCurrentChange(this.pageno > pageno ? pageno : this.pageno, data);
    }
  }
  handleCurrentChange(page, data) {
    var _a, _b;
    let size = this.pagination || 10;
    if (this.counts > -1) {
      if (this.current == page)
        return;
      this.current = page;
      if (this.sortOptions) {
        this.sortOptions;
      }
      this.toPage(page);
      return;
    }
    this.current = page;
    if (this.pageno !== page) {
      this.toPage(page);
    }
    let tmpData = cloneDeep(data != null ? data : this.cdata);
    if ((_a = this.sortOptions) == null ? void 0 : _a.order) {
      let { prop, order } = this.sortOptions;
      tmpData = orderBy(tmpData, [prop], [order.replace(/(ending)$/, "")]);
    }
    this.total = tmpData.length;
    if (this.pagination) {
      this.pdata = (_b = chunk(tmpData, size)) == null ? void 0 : _b[page - 1];
    } else {
      this.pdata = tmpData != null ? tmpData : [];
    }
  }
  handleSortChange(column) {
    let { prop, order } = column;
    this.sortOptions = order && { prop, order };
    if (this.sorter && this.counts > (this.pagination || 10)) {
      this.sorter;
      ({ size: this.pagination || 10, page: this.current });
    }
    this.handleCurrentChange(this.current);
  }
  getSelection(value) {
    if (!value)
      return void 0;
    if (value == true) {
      return { open: value };
    }
    return value;
  }
  isTooltip(column) {
    let filter = ruleJudgment({
      $or: [
        { clipboard: { $exists: true } },
        { dots: { $exists: true } }
      ]
    });
    if (filter(column)) {
      return false;
    }
    return true;
  }
};
__decorateClass$1([
  Prop({ default: void 0 })
], KlTable.prototype, "data", 2);
__decorateClass$1([
  Prop({ default: false })
], KlTable.prototype, "loading", 2);
__decorateClass$1([
  Prop()
], KlTable.prototype, "columns", 2);
__decorateClass$1([
  Prop({ default: false })
], KlTable.prototype, "border", 2);
__decorateClass$1([
  Prop({ default: void 0 })
], KlTable.prototype, "selection", 2);
__decorateClass$1([
  Prop({ default: void 0 })
], KlTable.prototype, "expand", 2);
__decorateClass$1([
  Prop({ default: false })
], KlTable.prototype, "highlightCurrentRow", 2);
__decorateClass$1([
  Prop({ default: 1 })
], KlTable.prototype, "pageno", 2);
__decorateClass$1([
  Prop({ default: false })
], KlTable.prototype, "pagination", 2);
__decorateClass$1([
  Prop({ default: -1 })
], KlTable.prototype, "counts", 2);
__decorateClass$1([
  Prop({ default: void 0 })
], KlTable.prototype, "customize", 2);
__decorateClass$1([
  Prop({ default: void 0 })
], KlTable.prototype, "sorter", 2);
__decorateClass$1([
  Provide()
], KlTable.prototype, "cdata", 2);
__decorateClass$1([
  Provide()
], KlTable.prototype, "pdata", 2);
__decorateClass$1([
  Provide()
], KlTable.prototype, "current", 2);
__decorateClass$1([
  Provide()
], KlTable.prototype, "total", 2);
__decorateClass$1([
  Provide()
], KlTable.prototype, "sortOptions", 2);
__decorateClass$1([
  Emit("to-page")
], KlTable.prototype, "toPage", 1);
__decorateClass$1([
  Emit("current-change")
], KlTable.prototype, "currentChange", 1);
__decorateClass$1([
  Emit("selection-change")
], KlTable.prototype, "selectionChange", 1);
__decorateClass$1([
  Watch("data")
], KlTable.prototype, "onData", 1);
KlTable = __decorateClass$1([
  Component({
    name: "KlTable",
    components: {
      KlColumnCell
    },
    mounted() {
      if (this.data) {
        this.initialData(this.data);
      }
    }
  })
], KlTable);
var render$1 = function() {
  var _vm$getSelection;
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("fragment", [_c("el-table", {
    directives: [{
      name: "loading",
      rawName: "v-loading",
      value: _vm.loading,
      expression: "loading"
    }],
    ref: "filterTable",
    attrs: {
      "data": _vm.pdata,
      "border": _vm.border,
      "highlight-current-row": _vm.highlightCurrentRow
    },
    on: {
      "sort-change": _vm.handleSortChange,
      "current-change": _vm.currentChange,
      "selection-change": _vm.selectionChange
    }
  }, [(_vm$getSelection = _vm.getSelection(_vm.selection)) !== null && _vm$getSelection !== void 0 && _vm$getSelection.open ? _c("el-table-column", {
    attrs: {
      "type": "selection",
      "fixed": "left",
      "width": "50",
      "selectable": function(row) {
        var _vm$getSelection2;
        return !_vm.isDisabled((_vm$getSelection2 = _vm.getSelection(_vm.selection)) === null || _vm$getSelection2 === void 0 ? void 0 : _vm$getSelection2.disabled, {
          row
        });
      }
    }
  }) : _vm._e(), _vm._l(_vm.columns, function(column, key) {
    return _c("el-table-column", {
      key,
      attrs: {
        "label": column.name,
        "prop": column.key,
        "width": _vm.toStyleSize(column === null || column === void 0 ? void 0 : column.width),
        "min-width": _vm.toStyleSize((column === null || column === void 0 ? void 0 : column.minWidth) || 100),
        "fixed": column === null || column === void 0 ? void 0 : column.fixed,
        "align": column === null || column === void 0 ? void 0 : column.align,
        "sortable": column === null || column === void 0 ? void 0 : column.sortable,
        "show-overflow-tooltip": _vm.isTooltip(column)
      },
      scopedSlots: _vm._u([{
        key: "default",
        fn: function(scope) {
          return [_c("kl-column-cell", {
            attrs: {
              "scope": scope,
              "column": column,
              "customize": _vm.customize,
              "env": _vm.env
            },
            on: {
              "command": _vm.command
            }
          })];
        }
      }], null, true)
    });
  }), _vm.expand ? _c("el-table-column", {
    attrs: {
      "type": "expand",
      "fixed": "left"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(props) {
        return [_vm._v(" " + _vm._s(_vm.parseTemplate(_vm.expand, Object.assign({}, _vm.env, {
          row: props === null || props === void 0 ? void 0 : props.row
        }))) + " ")];
      }
    }], null, false, 2134650507)
  }) : _vm._e()], 2), _vm.pagination ? _c("el-pagination", {
    attrs: {
      "current-page": _vm.current,
      "page-size": _vm.pagination,
      "total": _vm.total,
      "layout": "total, prev, pager, next, jumper",
      "background": ""
    },
    on: {
      "current-change": _vm.handleCurrentChange
    }
  }) : _vm._e()], 1);
};
var staticRenderFns$1 = [];
var table_vue_vue_type_style_index_0_lang = "";
const __cssModules$1 = {};
var __component__$1 = /* @__PURE__ */ normalizeComponent(
  KlTable,
  render$1,
  staticRenderFns$1,
  false,
  __vue2_injectStyles$1,
  null,
  null,
  null
);
function __vue2_injectStyles$1(context) {
  for (let o in __cssModules$1) {
    this[o] = __cssModules$1[o];
  }
}
var table = /* @__PURE__ */ function() {
  return __component__$1.exports;
}();
function _broadcast(componentName, eventName, params) {
  this.$children.forEach(function(child) {
    var name = child.$options.componentName;
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
var _default = {
  methods: {
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    }
  }
};
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
let KlCodemirror = class extends mixins(KlBaseMixin, _default) {
  constructor() {
    super(...arguments);
    this.code = "";
    this.options = {
      tabSize: 2,
      foldGutter: true,
      styleActiveLine: true,
      lineNumbers: true,
      lineWrapping: true,
      styleSelectedText: false,
      line: true,
      mode: "text/javascript",
      theme: "monokai",
      placeholder: "...",
      readOnly: false
    };
  }
  update(value) {
  }
  change(value) {
  }
  onValueChange(val, oldVal) {
    if (val === oldVal)
      return;
    this.code = val;
  }
  onCodeChange(val, oldVal) {
    if (val === oldVal)
      return;
    this == null ? void 0 : this.dispatch("ElFormItem", "el.form.change", val);
    this.change(val);
    this.update(val);
  }
};
__decorateClass([
  Provide()
], KlCodemirror.prototype, "code", 2);
__decorateClass([
  Provide()
], KlCodemirror.prototype, "options", 2);
__decorateClass([
  Model("update")
], KlCodemirror.prototype, "value", 2);
__decorateClass([
  Emit("update")
], KlCodemirror.prototype, "update", 1);
__decorateClass([
  Emit("change")
], KlCodemirror.prototype, "change", 1);
__decorateClass([
  Watch("value")
], KlCodemirror.prototype, "onValueChange", 1);
__decorateClass([
  Watch("code")
], KlCodemirror.prototype, "onCodeChange", 1);
KlCodemirror = __decorateClass([
  Component({
    name: "KlCodemirror",
    mounted() {
      var _a;
      this.code = (_a = this.value) != null ? _a : "";
    }
  })
], KlCodemirror);
var render = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("section", [_c("codemirror", {
    attrs: {
      "options": _vm.options
    },
    model: {
      value: _vm.code,
      callback: function($$v) {
        _vm.code = $$v;
      },
      expression: "code"
    }
  })], 1);
};
var staticRenderFns = [];
const __cssModules = {};
var __component__ = /* @__PURE__ */ normalizeComponent(
  KlCodemirror,
  render,
  staticRenderFns,
  false,
  __vue2_injectStyles,
  null,
  null,
  null
);
function __vue2_injectStyles(context) {
  for (let o in __cssModules) {
    this[o] = __cssModules[o];
  }
}
var codemirror = /* @__PURE__ */ function() {
  return __component__.exports;
}();
var components = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Drawer: drawer,
  ChannelSearchbar: channelSearchbar,
  Sidebar: sidebar,
  SidebarItem,
  LoginForm: login,
  Qrcode: qrcode,
  FormItem: KlFormItem,
  Form: KlForm,
  DialogForm: dialogForm,
  FormExpand: KlFormExpand,
  PlanPicker: KlPlanPicker,
  Dialog: KlDialog,
  Table: table,
  ColumnCell: KlColumnCell,
  Codemirror: codemirror
}, Symbol.toStringTag, { value: "Module" }));
function parseCommand(value, tag) {
  if (!value)
    return null;
  let tags = compact(["dialog", "action", "command", "router", "https?", tag]).join("|");
  let regex = new RegExp(`^(${tags})\\:(\\S+)$`);
  let command = value.match(regex);
  if (!command)
    return null;
  let [, type, path] = command;
  if (/^(https?)/.test(type)) {
    return { type: "http", path: value };
  }
  return { type, path };
}
function runCommand(self2, commands) {
  return (value, row, component) => {
    let command = parseCommand(value);
    if (!command)
      return;
    if (command.type === "command") {
      let [name, ...props] = command.path.split("|");
      let runScript = get(commands != null ? commands : self2, name);
      if (isFunction(runScript)) {
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
  let keys = map(list, "key");
  let query = {
    $or: [
      { name: { $regex: new RegExp(keywords, "i") } },
      { keywords: { $_in: [keywords.toLocaleLowerCase()] } }
    ]
  };
  let item = dataNodeProxy(data).find({ $and: [{ key: { $nin: keys } }, query, { children: { $exists: false } }] });
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
    let data = assign({}, env, props);
    if (isString(disabled)) {
      query = jsYaml.safeLoad(parseTemplate(disabled, data));
      if (!isPlainObject(query))
        return false;
    }
    if (isBoolean(query))
      return query;
    let filter = ruleJudgment(query);
    return filter(data);
  };
}
function isFilter(env) {
  return (conditions, props) => {
    if (!conditions)
      return true;
    let query = conditions;
    let data = assign({}, env, props);
    if (isString(conditions)) {
      query = jsYaml.safeLoad(parseTemplate(conditions, data));
      if (!isPlainObject(query))
        return true;
    }
    let filter = ruleJudgment(query);
    return filter(data);
  };
}
function getFilter(conditions, props = {}) {
  if (!conditions)
    return (data) => true;
  let query = conditions;
  if (isString(conditions)) {
    query = jsYaml.safeLoad(parseTemplate(conditions, { ...props }));
  }
  if (!isPlainObject(query))
    return (data) => true;
  return ruleJudgment(query);
}
function getConditions(conditions, props = {}) {
  if (!conditions)
    return null;
  let query = conditions;
  if (isString(conditions)) {
    query = jsYaml.safeLoad(parseTemplate(conditions, { ...props }));
  }
  if (!isPlainObject(query))
    return null;
  return query;
}
function parseTemplate(tpl, context, opts) {
  let env = new nunjucks.Environment(null, merge({ autoescape: false }, opts));
  env.addFilter(parseDate.name, (value) => String(parseDate(value)));
  env.addFilter(parseContent.name, (value) => String.raw`${parseContent(value, context)}`);
  return env.renderString(tpl, context);
}
function parseDate(value, nowValue) {
  if (isDate(value))
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
  let val = get(env, path, "");
  return val.split("\n").join("\n\n").replace(/\"/g, '\\"');
}
function parseProps(props) {
  return (data) => {
    if (!props)
      return data;
    let result = cloneDeep(data);
    let keys = [];
    for (let [key, val] of Object.entries(props)) {
      let ret = get(data, val);
      if (isArray(ret)) {
        result[key] = ret == null ? void 0 : ret.map((v) => isPlainObject(v) ? parseProps(props)(v) : v);
      } else {
        result[key] = /(\{)/.test(val) ? parseTemplate(val, data) : ret;
      }
      if (key !== val) {
        keys.push(val);
      }
    }
    return omit(result, keys);
  };
}
function parseDateString(value) {
  var _a, _b;
  let [label] = value.split(/\s+/);
  let [type] = (_a = value.match(/(year|month|day|week)/)) != null ? _a : [];
  let date = {
    day: 0,
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  };
  let val = (_b = date == null ? void 0 : date[type]) != null ? _b : 0;
  if (/(\d+){4}/.test(label)) {
    val = Number(label);
  } else if (!isNaN$1(Number(label))) {
    val += Number(label);
  }
  return val;
}
function parseMouseEvent(evt) {
  if (evt.path) {
    return evt;
  }
  let target = evt.target;
  evt.path = [];
  while (target.parentNode !== null) {
    evt.path.push(target);
    target = target.parentNode;
  }
  evt.path.push(document, window);
  return evt;
}
function toFormatString(props) {
  return (data, format = "{label}") => {
    if (props) {
      for (let item in Object.keys(props)) {
        if (props == null ? void 0 : props[item]) {
          format = format.replace(new RegExp(`{${item}}`, "g"), `{${props == null ? void 0 : props[item]}}`);
        }
      }
    }
    return template(format, { interpolate: /{([\s\S]+?)}/g })(data);
  };
}
function toStyleSize(value) {
  if (!value)
    return void 0;
  if (typeof value == "number" || /^([0-9]+)?(\.)?([0-9]+)$/.test(value)) {
    return `${value}px`;
  }
  if (/^([0-9]+)?(\.)?([0-9]+)(px|pt|em|rem|%)$|^(auto|fit-content)$/.test(value)) {
    return value;
  }
  return void 0;
}
function parseRules(validate) {
  return (rules, self2) => {
    if (!rules)
      return rules;
    for (let [key, rule] of Object.entries(rules)) {
      rules[key] = rule.map((item) => {
        if (isArray(item.validator)) {
          let [name, ...props] = item.validator;
          let validator = validate == null ? void 0 : validate[name];
          if (validator) {
            return merge(item, { validator: validator(...props, self2) });
          }
        }
        return item;
      });
    }
    return rules;
  };
}
function parseParams(params) {
  return (data) => {
    let parseData2 = merge(data, {});
    let str = isString(params) ? params : jsYaml.safeDump(params != null ? params : "");
    let val = parseTemplate(str, parseData2);
    return jsYaml.safeLoad(val) || parseData2;
  };
}
function formatString(customize) {
  return (value, format, replace) => {
    if (!value && value !== 0)
      return replace != null ? replace : value;
    if (!format)
      return value;
    return formatData_1(format, customize)(value);
  };
}
Vue.prototype.$message = Message;
const Plugin = {
  install: (vue) => {
    for (let [, component] of Object.entries(components)) {
      vue.component(`${component.name}`, component);
    }
  }
};
export { channelSearchbar as ChannelSearchbar, codemirror as Codemirror, KlColumnCell as ColumnCell, KlDialog as Dialog, dialogForm as DialogForm, drawer as Drawer, KlForm as Form, KlFormExpand as FormExpand, KlFormItem as FormItem, KlBaseMixin, KlFormMixin, login as LoginForm, KlPlanPicker as PlanPicker, Plugin, qrcode as Qrcode, sidebar as Sidebar, SidebarItem, table as Table, filterChannelDataNode, formatString, getConditions, getFilter, isDisabled, isFilter, parseCommand, parseContent, parseDate, parseMouseEvent, parseParams, parseProps, parseRules, parseTemplate, runCommand, toFormatString, toStyleSize };
