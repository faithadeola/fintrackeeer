<template>
  <div class="bg-white rounded-xl p-6 shadow-sm">
    <div class="flex justify-between items-start mb-4">
      <div class="flex items-center gap-3">
        <div :class="['w-10 h-10 rounded-full flex items-center justify-center', bgColor]">
          <component :is="icon" class="w-5 h-5" />
        </div>
        <div>
          <h3 class="font-medium text-gray-900">{{ name }}</h3>
          <p class="text-sm text-gray-500">{{ subtitle }}</p>
        </div>
      </div>
      <Menu as="div" class="relative">
        <MenuButton class="p-1 hover:bg-gray-100 rounded">
          <MoreHorizontal class="w-5 h-5" />
        </MenuButton>
        <MenuItems class="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-1 ring-1 ring-black ring-opacity-5">
          <MenuItem v-slot="{ active }">
            <button 
              class="w-full text-left px-4 py-2 text-sm"
              :class="[active ? 'bg-gray-50 text-gray-900' : 'text-gray-700']"
              @click="$emit('edit')"
            >
              Edit Goal
            </button>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <button 
              class="w-full text-left px-4 py-2 text-sm"
              :class="[active ? 'bg-gray-50 text-gray-900' : 'text-gray-700']"
              @click="$emit('delete')"
            >
              Delete Goal
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>

    <div class="space-y-2">
      <div class="flex items-baseline justify-between">
        <span class="text-2xl font-bold">{{ formatNaira(current) }}</span>
        <span class="text-gray-500">of {{ formatNaira(target) }}</span>
      </div>
      <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          class="h-full transition-all duration-500"
          :class="progressColor"
          :style="{ width: `${percentage}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { MoreHorizontal } from 'lucide-vue-next'
import { formatNaira } from '../../utils/currency'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  current: {
    type: Number,
    required: true
  },
  target: {
    type: Number,
    required: true
  },
  icon: {
    type: Object,
    required: true
  },
  bgColor: {
    type: String,
    default: 'bg-primary-100'
  },
  type: {
    type: String,
    default: 'primary'
  }
})

defineEmits(['edit', 'delete'])

const percentage = computed(() => {
  return Math.min(Math.round((props.current / props.target) * 100), 100)
})

const progressColor = computed(() => {
  switch (props.type) {
    case 'warning':
      return 'bg-yellow-500'
    case 'success':
      return 'bg-green-500'
    default:
      return 'bg-primary'
  }
})
</script>