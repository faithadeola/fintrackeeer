<template>
  <div class="bg-white rounded-xl p-6 shadow-sm sticky top-24">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold text-gray-800">Total Balance</h2>
      <button 
        @click="$emit('showTransaction')" 
        class="text-sm text-primary hover:text-primary/80"
      >
        + Transaction
      </button>
    </div>
    
    <div class="space-y-4">
      <div>
        <p class="text-4xl font-bold text-gray-900">{{ formatNaira(15300) }}</p>
        <p class="text-sm text-gray-500">Monthly spending limit</p>
        <div class="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div class="h-full bg-primary" style="width: 65%"></div>
        </div>
      </div>
      
      <div class="space-y-4 mt-6">
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600">Credit Card</span>
          <span class="text-sm font-medium">{{ formatNaira(5400) }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600">Savings</span>
          <span class="text-sm font-medium">{{ formatNaira(2800) }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600">Investment</span>
          <span class="text-sm font-medium">{{ formatNaira(7100) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatNaira } from '../../utils/currency'

defineEmits(['showTransaction'])
</script>