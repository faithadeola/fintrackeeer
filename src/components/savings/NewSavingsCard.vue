<template>
  <div 
    @click="$emit('click')"
    class="bg-white rounded-xl p-6 shadow-sm border-2 border-dashed border-gray-200 hover:border-primary cursor-pointer transition-colors"
  >
    <div class="flex flex-col items-center justify-center text-center space-y-2">
      <div class="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
        <Plus class="w-5 h-5 text-primary" />
      </div>
      <div>
        <h3 class="font-medium text-gray-900">New save</h3>
        <p class="text-sm text-gray-500">Create savings, set a financial goal</p>
      </div>
      <button class="text-sm text-primary">Add new save</button>
    </div>
  </div>
</template>

<script setup>
import { Plus } from 'lucide-vue-next'

defineEmits(['click'])
</script>