<template>
  <div 
    class="p-6 rounded-xl"
    :class="[
      type === 'warning' ? 'bg-black text-white' : 'bg-primary text-white'
    ]"
  >
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-medium">{{ title }}</h3>
      <div class="flex items-center gap-2 text-sm opacity-80">
        <Clock class="w-4 h-4" />
        <span>05.24</span>
      </div>
    </div>

    <div class="flex items-baseline gap-1 mb-2">
      <span class="text-2xl font-bold">${{ current }}</span>
      <span class="opacity-80">of ${{ total }}</span>
    </div>

    <div class="space-y-2">
      <div class="h-2 bg-white/20 rounded-full overflow-hidden">
        <div 
          class="h-full bg-white transition-all duration-500"
          :style="{ width: `${percentage}%` }"
        ></div>
      </div>
      <p class="text-sm opacity-80">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { Clock } from 'lucide-vue-next'

defineProps({
  title: {
    type: String,
    required: true
  },
  current: {
    type: String,
    required: true
  },
  total: {
    type: String,
    required: true
  },
  percentage: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'success'
  },
  message: {
    type: String,
    required: true
  }
})
</script>