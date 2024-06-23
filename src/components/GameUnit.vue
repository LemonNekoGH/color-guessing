<script setup lang="ts">
import type { Color } from '../gameplay/game'
import ColorBlock from './ColorBlock.vue'
import Button from './Button.vue'

defineProps<{
  hint: number[]
  colors: Color[]
  current: boolean
}>()

const emit = defineEmits<{
  (e: 'unselect', index: number): void
  (e: 'confirm'): void
}>()
</script>

<template>
  <div
    class="border-white border-2 border-solid p-4  gap-4 transition-colors duration-250"
    :class="{ '!border-black': current }"
  >
    <div v-if="colors.includes('#FFFFFF') || !current" id="hint" class="w-16">
      <div id="first-line" class="flex justify-between">
        <div
          id="hint-item" :class="{
            'border-dashed': hint[0] === 0,
            'border-solid': hint[0] === 1 || hint[0] === 2,
          }"
          class="transition-all duration-250 box-border"
        >
          <div v-if="hint[0] === 2" class="bg-black w-full h-full box-border scale-80" />
        </div>
        <div
          id="hint-item" :class="{
            'border-dashed': hint[1] === 0,
            'border-solid': hint[1] === 1 || hint[1] === 2,
          }"
          class="transition-all duration-250"
        >
          <div v-if="hint[1] === 2" class="bg-black w-full h-full box-border scale-80" />
        </div>
      </div>
      <div id="second-line" class="flex justify-between mt-2">
        <div
          id="hint-item" :class="{
            'border-dashed': hint[2] === 0,
            'border-solid': hint[2] === 1 || hint[2] === 2,
          }"
          class="transition-all duration-250"
        >
          <div v-if="hint[2] === 2" class="bg-black w-full h-full box-border scale-80" />
        </div>
        <div
          id="hint-item" :class="{
            'border-dashed': hint[3] === 0,
            'border-solid': hint[3] === 1 || hint[3] === 2,
          }"
          class="transition-all duration-250"
        >
          <div v-if="hint[3] === 2" class="bg-black w-full h-full box-border scale-80" />
        </div>
      </div>
    </div>
    <div v-else>
      <Button id="confirm" class="w-16 h-16" @click="emit('confirm')">
        <div class="flex justify-center items-center w-full h-full text-xl">
          确认
        </div>
      </Button>
    </div>
    <div
      id="selected-colors" class="flex flex-col gap-4 mt-4"
    >
      <ColorBlock
        v-for="(color, index) in colors"
        :key="index"
        :color="color"
        class="w-16 h-16"
        @click="current && emit('unselect', index)"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
#hint-item {
  --uno: w-7 h-7 border-2 border-black box-border;
}
</style>
