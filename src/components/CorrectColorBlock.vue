<script setup lang="ts">
import { computed } from 'vue'
import type { Color } from '../gameplay/game'

const props = defineProps<{
  color: Color
  show: boolean
}>()

const localColor = computed(() => props.show ? props.color : '#000')
</script>

<template>
  <div
    class="w-16 h-16 box-border border-solid transition transition-all duration-250"
    :class="
      [color !== '#FFFFFF' ? `border-2 border-color` : 'border-2 border-black']
    "
  >
    <div
      id="color-block-interact-space" class="w-full h-full transition transition-all duration-250 scale-90 mdi-set text-white text-2xl flex justify-center items-center"
      :class="{
        'mdi-help': !show,
      }"
    />
  </div>
</template>

<style lang="less" scoped>
.border-color {
  border-color: v-bind(localColor) !important;
}
#color-block-interact-space {
  background-color: v-bind(localColor);
}
</style>
