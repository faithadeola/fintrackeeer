<template>
  <div class="bg-white rounded-xl p-6 shadow-sm">
    <div class="flex flex-col sm:flex-row items-start justify-between gap-4">
      <!-- Left side -->
      <div class="flex items-start gap-4 w-full sm:w-auto">
        <div class="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-xl">
          <span class="text-xl">{{ icon }}</span>
        </div>
        <div class="flex-1">
          <div class="flex flex-wrap items-center gap-2 sm:gap-4 mb-1">
            <h3 class="font-medium text-gray-900">{{ name }}</h3>
            <span class="text-sm text-gray-500">{{ dateRange }}</span>
            <span class="text-xs text-gray-400">{{ timestamp }}</span>
          </div>
          <p v-if="note" class="text-sm text-gray-500 mb-4">{{ note }}</p>
          <div class="flex items-baseline gap-2">
            <span class="font-medium">${{ formatNumber(spent || received) }}</span>
            <span class="text-sm text-gray-500">of ${{ formatNumber(amount) }}</span>
          </div>
        </div>
      </div>

      <!-- Right side -->
      <div class="flex flex-col items-end gap-2">
        <span 
          class="text-sm font-medium"
          :class="[
            type === 'warning' ? 'text-yellow-600' : 'text-primary'
          ]"
        >
          {{ calculatePercentage }}%
        </span>
        <div class="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            class="h-full transition-all duration-500"
            :class="[
              type === 'warning' ? 'bg-yellow-500' : 'bg-primary'
            ]"
            :style="{ width: `${calculatePercentage}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  dateRange: {
    type: String,
    required: true
  },
  timestamp: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  spent: {
    type: Number,
    default: null
  },
  received: {
    type: Number,
    default: null
  },
  note: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'success'
  }
})

const formatNumber = (num) => {
  return num.toLocaleString()
}

const calculatePercentage = computed(() => {
  const current = props.spent || props.received || 0
  return Math.round((current / props.amount) * 100)
})
</script>