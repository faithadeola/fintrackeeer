<template>
  <button
    @click="$emit('click')"
    class="w-full flex items-center justify-center gap-2 p-3 border rounded-lg hover:bg-gray-50"
  >
    <img :src="iconSrc" :alt="provider" class="w-5 h-5" />
    <span>Log in with {{ provider }}</span>
  </button>
</template>

<script setup>
defineProps({
  provider: {
    type: String,
    required: true
  },
  iconSrc: {
    type: String,
    required: true
  }
})

defineEmits(['click'])
</script>