import Vue from 'vue'
import * as components from '.'

export const Plugin: Vue.PluginObject<any> = {
  install: (vue: typeof Vue) => {
    for (let [, component] of Object.entries(components)) {
      vue.component(`${component.name}`, component)
    }
  }
}