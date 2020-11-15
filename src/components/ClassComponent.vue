<template lang="pug">
div
  p {{ title }}
  ul
    li(v-for='todo in todos' :key='todo.id' @click='increment')
      | {{ todo.id }} - {{ todo.content }}
  p Count: {{ todoCount }} / {{ meta.totalCount }}
  p Clicks on todos: {{ clickCount }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Todo, Meta } from './models'

@Component
export default class ClassComponent extends Vue {
  private model = ''
  @Prop({ type: String, required: true }) readonly title!: string;
  @Prop({ type: Array, default: () => [] }) readonly todos!: Todo[];
  @Prop({ type: Object, required: true }) readonly meta!: Meta;
  @Prop(Boolean) readonly active!: boolean;

  clickCount = 0;

  increment () {
    this.clickCount += 1
  }

  get todoCount () {
    return this.todos.length
  }
}
</script>
