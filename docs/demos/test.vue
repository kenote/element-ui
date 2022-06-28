<template>
  <div>
    1234
    <el-button>Button</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component<Demo>({
  name: 'demo',
})
export default class Demo extends Vue {
  
  
}
</script>