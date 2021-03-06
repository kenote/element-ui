import Vue, { VNode } from 'vue'
import { ComponentRenderProxy } from '@vue/composition-api'

declare global {

  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    interface ElementClass extends ComponentRenderProxy {}
    interface ElementAttributesProperty {
      // $props: any; // 定义要使用的属性名称
    }
    interface IntrinsicElements extends Record<string, any> {}
  }
}