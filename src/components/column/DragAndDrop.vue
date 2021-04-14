<template>
  <draggable v-model="list" @end="onEnd">
    <slot></slot>
  </draggable>
</template>
<script>
import draggable from 'vuedraggable'
export default {
  name: 'DragAndDrop',
  components: {
    draggable
  },
  props: {
    deals: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    list: {
      get () {
        return this.deals
      },
      set (list) {
        this.$emit('update:deals', list)
      }
    }
  },
  methods: {
    onEnd (e) {
      this.list = this.list.map((item, index) => {
        if (e.newIndex === index) return this.list[index]
        else return item
      })
    }
  }
}
</script>
