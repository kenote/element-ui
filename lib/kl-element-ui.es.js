import Vue from "vue";
import _, { merge, compact, trim, assign, pickBy, get, isFunction, map, isString, isPlainObject, isBoolean, isDate, omit, isNaN, template } from "lodash";
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
        get: function get2() {
          return vm[key2];
        },
        set: function set(value) {
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
__decorateClass$7([
  Prop({ default: "right" })
], KlDrawer.prototype, "placement", 2);
__decorateClass$7([
  Prop({ default: 360 })
], KlDrawer.prototype, "width", 2);
__decorateClass$7([
  Prop({ default: false })
], KlDrawer.prototype, "visible", 2);
__decorateClass$7([
  Prop({ default: false })
], KlDrawer.prototype, "lock", 2);
__decorateClass$7([
  Prop({ default: void 0 })
], KlDrawer.prototype, "zIndex", 2);
__decorateClass$7([
  Prop({ default: "px" })
], KlDrawer.prototype, "unit", 2);
__decorateClass$7([
  Prop({ default: 0 })
], KlDrawer.prototype, "offset", 2);
__decorateClass$7([
  Provide()
], KlDrawer.prototype, "styles", 2);
__decorateClass$7([
  Provide()
], KlDrawer.prototype, "timestamp", 2);
__decorateClass$7([
  Watch("width")
], KlDrawer.prototype, "onWidthChange", 1);
__decorateClass$7([
  Watch("visible")
], KlDrawer.prototype, "onVisibleChange", 1);
KlDrawer = __decorateClass$7([
  Component({
    name: "KlDrawer",
    created() {
      this.getStyles(this.width);
    }
  })
], KlDrawer);
var render$6 = function() {
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
var staticRenderFns$6 = [];
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
const __cssModules$6 = {};
var __component__$6 = /* @__PURE__ */ normalizeComponent(
  KlDrawer,
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
var drawer = /* @__PURE__ */ function() {
  return __component__$6.exports;
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
  querySearch(queryString, done) {
    let list = [];
    filterChannelDataNode(this.restaurants, trim(queryString), list);
    if (this.filter) {
      list = list.filter(ruleJudgment(this.filter));
    }
    let props = assign({
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
    let keywords = trim(this.keywords);
    return (_a = row.name) == null ? void 0 : _a.replace(new RegExp(`(${keywords})`, "gi"), `<span class='keywords'>$1</span>`);
  }
  handleSelect(node) {
    this.handleCommand(node);
    this.handleClear();
  }
};
__decorateClass$6([
  Provide()
], KlChannelSearchbar.prototype, "item", 2);
__decorateClass$6([
  Prop({ default: "\u641C\u7D22\u5185\u5BB9" })
], KlChannelSearchbar.prototype, "placeholder", 2);
__decorateClass$6([
  Prop({ default: void 0 })
], KlChannelSearchbar.prototype, "data", 2);
__decorateClass$6([
  Prop({ default: void 0 })
], KlChannelSearchbar.prototype, "props", 2);
__decorateClass$6([
  Prop({ default: void 0 })
], KlChannelSearchbar.prototype, "filter", 2);
__decorateClass$6([
  Prop({ default: "searchbar-popper" })
], KlChannelSearchbar.prototype, "popperClass", 2);
__decorateClass$6([
  Prop({ default: "default" })
], KlChannelSearchbar.prototype, "size", 2);
__decorateClass$6([
  Provide()
], KlChannelSearchbar.prototype, "keywords", 2);
__decorateClass$6([
  Provide()
], KlChannelSearchbar.prototype, "restaurants", 2);
__decorateClass$6([
  Model("update")
], KlChannelSearchbar.prototype, "value", 2);
__decorateClass$6([
  Watch("keywords")
], KlChannelSearchbar.prototype, "onKeywordsChange", 1);
__decorateClass$6([
  Watch("value")
], KlChannelSearchbar.prototype, "onValueChange", 1);
__decorateClass$6([
  Watch("data")
], KlChannelSearchbar.prototype, "onDataChange", 1);
__decorateClass$6([
  Emit("update")
], KlChannelSearchbar.prototype, "update", 1);
__decorateClass$6([
  Emit("command")
], KlChannelSearchbar.prototype, "handleCommand", 1);
__decorateClass$6([
  Emit("focus")
], KlChannelSearchbar.prototype, "handleFocus", 1);
__decorateClass$6([
  Emit("blur")
], KlChannelSearchbar.prototype, "handleBlur", 1);
KlChannelSearchbar = __decorateClass$6([
  Component({
    name: "KlChannelSearchbar",
    mounted() {
      var _a;
      this.keywords = this.value;
      this.restaurants = initMaps((_a = this.data) != null ? _a : []);
    }
  })
], KlChannelSearchbar);
var render$5 = function() {
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
var staticRenderFns$5 = [];
var channelSearchbar_vue_vue_type_style_index_0_lang = "";
const __cssModules$5 = {};
var __component__$5 = /* @__PURE__ */ normalizeComponent(
  KlChannelSearchbar,
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
var channelSearchbar = /* @__PURE__ */ function() {
  return __component__$5.exports;
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
let KlBaseMixin = class extends Vue {
  constructor() {
    super(...arguments);
    this._ = _;
    this.isDisabled = isDisabled(this.env);
    this.parseProps = parseProps;
    this.toFormatString = toFormatString;
  }
  parseTag(value, name) {
    let [label, type] = value.split("_");
    return _.get({ label, type }, name);
  }
};
__decorateClass$5([
  Prop({ default: void 0 })
], KlBaseMixin.prototype, "env", 2);
KlBaseMixin = __decorateClass$5([
  Component({
    name: "KlBaseMixin"
  })
], KlBaseMixin);
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
let KlSidebarItem = class extends mixins(KlBaseMixin) {
};
__decorateClass$4([
  Prop({ default: "" })
], KlSidebarItem.prototype, "name", 2);
__decorateClass$4([
  Prop({ default: "" })
], KlSidebarItem.prototype, "icon", 2);
__decorateClass$4([
  Prop({ default: void 0 })
], KlSidebarItem.prototype, "children", 2);
__decorateClass$4([
  Prop({ default: "" })
], KlSidebarItem.prototype, "index", 2);
__decorateClass$4([
  Prop({ default: "" })
], KlSidebarItem.prototype, "tag", 2);
__decorateClass$4([
  Prop({ default: false })
], KlSidebarItem.prototype, "disabled", 2);
__decorateClass$4([
  Prop({ default: "" })
], KlSidebarItem.prototype, "popperClass", 2);
__decorateClass$4([
  Prop({ default: "" })
], KlSidebarItem.prototype, "tagClass", 2);
KlSidebarItem = __decorateClass$4([
  Component({
    name: "KlSidebarItem"
  })
], KlSidebarItem);
var render$4 = function() {
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
var staticRenderFns$4 = [];
var sidebarItem_vue_vue_type_style_index_0_lang = "";
const __cssModules$4 = {};
var __component__$4 = /* @__PURE__ */ normalizeComponent(
  KlSidebarItem,
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
var SidebarItem = /* @__PURE__ */ function() {
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
let KlSidebar = class extends mixins(KlBaseMixin) {
  handleSelect(index) {
  }
};
__decorateClass$3([
  Prop({ default: "" })
], KlSidebar.prototype, "defaultActive", 2);
__decorateClass$3([
  Prop({ default: false })
], KlSidebar.prototype, "collapse", 2);
__decorateClass$3([
  Prop({ default: false })
], KlSidebar.prototype, "uniqueOpened", 2);
__decorateClass$3([
  Prop({ default: false })
], KlSidebar.prototype, "router", 2);
__decorateClass$3([
  Prop({ default: void 0 })
], KlSidebar.prototype, "data", 2);
__decorateClass$3([
  Prop({ default: "" })
], KlSidebar.prototype, "popperClass", 2);
__decorateClass$3([
  Prop({ default: "" })
], KlSidebar.prototype, "tagClass", 2);
__decorateClass$3([
  Emit("select")
], KlSidebar.prototype, "handleSelect", 1);
KlSidebar = __decorateClass$3([
  Component({
    name: "KlSidebar",
    components: {
      SidebarItem
    }
  })
], KlSidebar);
var render$3 = function() {
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
var staticRenderFns$3 = [];
var sidebar_vue_vue_type_style_index_0_lang = "";
const __cssModules$3 = {};
var __component__$3 = /* @__PURE__ */ normalizeComponent(
  KlSidebar,
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
var sidebar = /* @__PURE__ */ function() {
  return __component__$3.exports;
}();
var message = "";
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
__decorateClass$2([
  Prop({ default: false })
], KlLoginForm.prototype, "loading", 2);
__decorateClass$2([
  Prop({ default: "\u7528\u6237\u540D" })
], KlLoginForm.prototype, "usernameLabel", 2);
__decorateClass$2([
  Prop({ default: "\u7528\u6237\u540D" })
], KlLoginForm.prototype, "usernamePlaceholder", 2);
__decorateClass$2([
  Prop({ default: "\u8BF7\u8F93\u5165\u7528\u6237\u540D" })
], KlLoginForm.prototype, "usernameMessage", 2);
__decorateClass$2([
  Prop({ default: "\u5BC6\u7801" })
], KlLoginForm.prototype, "passwordLabel", 2);
__decorateClass$2([
  Prop({ default: "\u5BC6\u7801" })
], KlLoginForm.prototype, "passwordPlaceholder", 2);
__decorateClass$2([
  Prop({ default: "\u8BF7\u8F93\u5165\u5BC6\u7801" })
], KlLoginForm.prototype, "passwordMessage", 2);
__decorateClass$2([
  Prop({ default: "\u767B \u5F55" })
], KlLoginForm.prototype, "submitName", 2);
__decorateClass$2([
  Prop({ default: "primary" })
], KlLoginForm.prototype, "buttonType", 2);
__decorateClass$2([
  Prop({ default: "\u5176\u4ED6\u65B9\u5F0F" })
], KlLoginForm.prototype, "thirdpartyLoginText", 2);
__decorateClass$2([
  Prop({ default: false })
], KlLoginForm.prototype, "thirdpartyLogin", 2);
__decorateClass$2([
  Prop({ default: false })
], KlLoginForm.prototype, "qrcodeLogin", 2);
__decorateClass$2([
  Prop({ default: 5 })
], KlLoginForm.prototype, "waitStep", 2);
__decorateClass$2([
  Prop({ default: "\u8BF7\u5728 {{step}} \u79D2\u540E\u518D\u505A\u63D0\u4EA4" })
], KlLoginForm.prototype, "waitMessage", 2);
__decorateClass$2([
  Provide()
], KlLoginForm.prototype, "times", 2);
__decorateClass$2([
  Provide()
], KlLoginForm.prototype, "values", 2);
__decorateClass$2([
  Provide()
], KlLoginForm.prototype, "rules", 2);
__decorateClass$2([
  Emit("submit")
], KlLoginForm.prototype, "submit", 1);
KlLoginForm = __decorateClass$2([
  Component({
    name: "KlLoginForm"
  })
], KlLoginForm);
var render$2 = function() {
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
var staticRenderFns$2 = [];
var login_vue_vue_type_style_index_0_lang = "";
const __cssModules$2 = {};
var __component__$2 = /* @__PURE__ */ normalizeComponent(
  KlLoginForm,
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
var login = /* @__PURE__ */ function() {
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
let KlQrcode = class extends Vue {
};
__decorateClass$1([
  Prop({ default: void 0 })
], KlQrcode.prototype, "title", 2);
KlQrcode = __decorateClass$1([
  Component({
    name: "KlQrcode"
  })
], KlQrcode);
var render$1 = function() {
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
var staticRenderFns$1 = [];
var qrcode_vue_vue_type_style_index_0_lang = "";
const __cssModules$1 = {};
var __component__$1 = /* @__PURE__ */ normalizeComponent(
  KlQrcode,
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
var qrcode = /* @__PURE__ */ function() {
  return __component__$1.exports;
}();
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
let KlFormItem = class extends mixins(KlBaseMixin) {
  constructor() {
    super(...arguments);
    this.values = "";
    this.style = {};
    this.propData = [];
  }
  update(value) {
  }
  change(value, oldVal) {
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
  toStyleSize(value) {
    if (!value)
      return void 0;
    if (typeof value == "number" || /^([0-9]+)?(\.)?([0-9]+)$/.test(value)) {
      return `${value}px`;
    }
    if (/^([0-9]+)?(\.)?([0-9]+)(px|pt|em|rem|%)$|^auto$/.test(value)) {
      return value;
    }
    return void 0;
  }
  updateStyle(values) {
    this.style = pickBy({ ...this.style, ...values }, (v) => v !== void 0);
  }
};
__decorateClass([
  Prop({ default: "input" })
], KlFormItem.prototype, "type", 2);
__decorateClass([
  Prop()
], KlFormItem.prototype, "width", 2);
__decorateClass([
  Prop({ default: void 0 })
], KlFormItem.prototype, "placeholder", 2);
__decorateClass([
  Prop({ default: false })
], KlFormItem.prototype, "disabled", 2);
__decorateClass([
  Prop({ default: false })
], KlFormItem.prototype, "readonly", 2);
__decorateClass([
  Prop({ default: void 0 })
], KlFormItem.prototype, "size", 2);
__decorateClass([
  Prop({ default: void 0 })
], KlFormItem.prototype, "options", 2);
__decorateClass([
  Prop({ default: void 0 })
], KlFormItem.prototype, "data", 2);
__decorateClass([
  Prop({ default: void 0 })
], KlFormItem.prototype, "props", 2);
__decorateClass([
  Prop({ default: void 0 })
], KlFormItem.prototype, "format", 2);
__decorateClass([
  Prop({ default: void 0 })
], KlFormItem.prototype, "valueFormat", 2);
__decorateClass([
  Provide()
], KlFormItem.prototype, "values", 2);
__decorateClass([
  Provide()
], KlFormItem.prototype, "style", 2);
__decorateClass([
  Provide()
], KlFormItem.prototype, "propData", 2);
__decorateClass([
  Model("update")
], KlFormItem.prototype, "value", 2);
__decorateClass([
  Emit("update")
], KlFormItem.prototype, "update", 1);
__decorateClass([
  Emit("change")
], KlFormItem.prototype, "change", 1);
__decorateClass([
  Watch("value")
], KlFormItem.prototype, "onValueChange", 1);
__decorateClass([
  Watch("values")
], KlFormItem.prototype, "onValuesChange", 1);
__decorateClass([
  Watch("width")
], KlFormItem.prototype, "onWidthChange", 1);
KlFormItem = __decorateClass([
  Component({
    name: "KlFormItem",
    created() {
      var _a, _b;
      this.propData = (_b = (_a = this.data) == null ? void 0 : _a.map(parseProps(this.props))) != null ? _b : [];
      this.values = this.getValue(this.value);
      this.updateStyle({ width: this.toStyleSize(this.width) });
    }
  })
], KlFormItem);
var render = function() {
  var _vm$options, _vm$options2, _vm$options3, _vm$options4, _vm$options5, _vm$options6, _vm$options7, _vm$options8, _vm$options9, _vm$options10, _vm$options11, _vm$options12, _vm$options13, _vm$options14, _vm$options15, _vm$options16, _vm$options17, _vm$options18, _vm$options19, _vm$options20, _vm$options21, _vm$options22, _vm$options23, _vm$options24, _vm$options25, _vm$options26, _vm$options27, _vm$options28, _vm$options29, _vm$options30, _vm$options31;
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
        "label": item.key,
        "disabled": item.disabled
      }
    }, [_vm._v(" " + _vm._s(_vm.toFormatString(_vm.props)(item, _vm.format)) + " ")]);
  }) : _vm._l(_vm.propData, function(item, key) {
    return _c("el-radio", {
      key,
      attrs: {
        "label": item.key,
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
        "label": item.key,
        "disabled": item.disabled
      }
    }, [_vm._v(" " + _vm._s(_vm.toFormatString(_vm.props)(item, _vm.format)) + " ")]);
  }) : _vm._l(_vm.propData, function(item, key) {
    return _c("el-checkbox", {
      key,
      attrs: {
        "label": item.key,
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
    return ["options" in item ? _c("el-option-group", {
      key: item.label,
      attrs: {
        "label": item.label
      }
    }, _vm._l(item.options, function(ele, ekey) {
      return _c("el-option", {
        key: ekey,
        attrs: {
          "label": _vm.toFormatString(_vm.props)(ele, _vm.format),
          "value": ele.key,
          "disabled": ele === null || ele === void 0 ? void 0 : ele.disabled
        }
      });
    }), 1) : _c("el-option", {
      key,
      attrs: {
        "label": _vm.toFormatString(_vm.props)(item, _vm.format),
        "value": item.key,
        "disabled": item === null || item === void 0 ? void 0 : item.disabled
      }
    })];
  })], 2) : ["year", "month", "date", "dates", "week", "datetime"].includes(_vm.type) ? _c("el-date-picker", {
    style: _vm.style,
    attrs: {
      "type": _vm.type,
      "placeholder": _vm.placeholder,
      "disabled": _vm.disabled,
      "format": _vm.format,
      "value-format": _vm.valueFormat,
      "size": _vm.size
    },
    model: {
      value: _vm.values,
      callback: function($$v) {
        _vm.values = $$v;
      },
      expression: "values"
    }
  }) : _c("el-input", {
    style: _vm.style,
    attrs: {
      "placeholder": _vm.placeholder,
      "disabled": _vm.disabled,
      "clearable": (_vm$options26 = _vm.options) === null || _vm$options26 === void 0 ? void 0 : _vm$options26.clearable,
      "minlength": (_vm$options27 = _vm.options) === null || _vm$options27 === void 0 ? void 0 : _vm$options27.minlength,
      "maxlength": (_vm$options28 = _vm.options) === null || _vm$options28 === void 0 ? void 0 : _vm$options28.maxlength,
      "show-word-limit": (_vm$options29 = _vm.options) === null || _vm$options29 === void 0 ? void 0 : _vm$options29.showWordLimit,
      "prefix-icon": (_vm$options30 = _vm.options) === null || _vm$options30 === void 0 ? void 0 : _vm$options30.prefixIcon,
      "suffix-icon": (_vm$options31 = _vm.options) === null || _vm$options31 === void 0 ? void 0 : _vm$options31.suffixIcon,
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
var staticRenderFns = [];
var formItem_vue_vue_type_style_index_0_lang = "";
const __cssModules = {};
var __component__ = /* @__PURE__ */ normalizeComponent(
  KlFormItem,
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
var formItem = /* @__PURE__ */ function() {
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
  FormItem: formItem
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
function runCommand(self, commands) {
  return (value, row, component) => {
    let command = parseCommand(value);
    if (!command)
      return;
    if (command.type === "command") {
      let [name, ...props] = command.path.split("|");
      let runScript = get(commands != null ? commands : self, name);
      if (isFunction(runScript)) {
        runScript(...props);
      }
    } else if (command.type === "action") {
      if (commands == null ? void 0 : commands.action) {
        commands == null ? void 0 : commands.action(command.path, row, component, self);
      }
    } else if (command.type === "dialog") {
      if (commands == null ? void 0 : commands.dialog) {
        commands == null ? void 0 : commands.dialog(command.path, row, component, self);
      }
    } else if (command.type === "router") {
      if (!(self == null ? void 0 : self.$router))
        return;
      self.$router.push(command.path);
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
    let result = data;
    let keys = [];
    for (let [key, val] of Object.entries(props)) {
      result[key] = /(\{)/.test(val) ? parseTemplate(val, data) : get(data, val);
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
  } else if (!isNaN(Number(label))) {
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
Vue.prototype.$message = Message;
const Plugin = {
  install: (vue) => {
    for (let [, component] of Object.entries(components)) {
      vue.component(`${component.name}`, component);
    }
  }
};
export { channelSearchbar as ChannelSearchbar, drawer as Drawer, formItem as FormItem, KlBaseMixin, login as LoginForm, Plugin, qrcode as Qrcode, sidebar as Sidebar, SidebarItem, filterChannelDataNode, getConditions, getFilter, isDisabled, isFilter, parseCommand, parseContent, parseDate, parseMouseEvent, parseProps, parseTemplate, runCommand, toFormatString };
