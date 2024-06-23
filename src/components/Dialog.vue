<script setup lang="ts">
const showDialog = defineModel<boolean>()
</script>

<template>
  <Transition
    appear
    leave-active-class="transition duration-250"
    enter-active-class="transition duration-250"
    leave-to-class="opacity-0"
    enter-from-class="opacity-0"
  >
    <div v-if="showDialog" class="absolute w-full h-full transition duration-250 bg-black/20" />
  </Transition>
  <Transition
    appear
    leave-active-class="transition duration-250"
    enter-active-class="transition duration-250"
    leave-to-class="transform -translate-y-4rem opacity-0"
    enter-from-class="transform -translate-y-4rem opacity-0"
  >
    <div v-if="showDialog" class="absolute bg-white border-2 border-black border-solid">
      <slot />
    </div>
  </Transition>
</template>
