<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  type?: 'outlined' | 'filled'
  color?: string
}>(), {
  type: 'filled',
  color: 'black',
})

const classes = computed(() => [
  {
    'button-outlined': props.type === 'outlined',
    'button-filled': props.type === 'filled',
  },
])
</script>

<template>
  <button
    class="p-0 m-0 box-border" :class="[classes]"
  >
    <div
      id="interact-space"
      class="w-full h-full"
    >
      <slot />
    </div>
  </button>
</template>

<style lang="less" scoped>
.button-filled {
  #interact-space {
    background-color: v-bind(color);
    transition: transform 250ms;
    color: white;
    transform: scale(0.9);
  }

  &:hover {
    #interact-space {
      transform: scale(0.85);
    }
  }
  &:active {
    #interact-space {
      transform: scale(0.8);
    }
  }
}

.button-outlined {
  #interact-space {
    color: v-bind(color);
    transition: all 250ms;
    background-color: white;
  }
  &:hover {
    #interact-space {
      background-color: v-bind(color);
      color: white;
    }
  }
  &:active {
    #interact-space {
      transform: scale(0.9);
    }
  }
}

.button-outlined, .button-filled {
  border: v-bind(color) 2px solid;
  background-color: white;
}
</style>
