<template>
  <fragment>
    <template v-for="(item, key) in data??[]">
      <template v-if="isFilter(item.conditions, env)">
        <el-button v-if="item.type == 'button'" :key="key" 
          :type="item.style" 
          :disabled="isDisabled(item.disabled, { values })"
          @click="command(item.command??'', {})"
          plain>
          {{ parseTemplate(item.name, env) }}
        </el-button>
        <el-dropdown v-else-if="item.type == 'dropdown'" :key="key"
          :disabled="isDisabled(item.disabled, { values })"
          :class="isDisabled(item.disabled, { values }) && 'disabled'"
          @command=" v => command(v, {})"
          :hide-on-click="true">
          <el-button plain>
            {{  item.name }}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <template v-for="opt in item.children??[]">
              <el-dropdown-item :key="opt.key" :command="opt.command" :disabled="isDisabled(opt.disabled, { values })">
                {{ opt.name }}
              </el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </template>
  </fragment>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator'
import KlBaseMixin from '../../mixins/base'
import type { EmitOptions } from '../../../types'

@Component<KlFormExpand>({
  name: 'KlFormExpand'
})
export default class KlFormExpand extends Mixins(KlBaseMixin) {

  @Prop()
  data!: EmitOptions[]

  @Prop()
  values!: Record<string, any>
}
</script>