<template>
  <div class="bg-white rounded-xl p-6 shadow-sm">
    <h2 class="text-xl font-semibold text-gray-800 mb-6">Information</h2>
    
    <div class="space-y-4">
      <div class="flex justify-between items-center">
        <span class="text-gray-600">Duration</span>
        <span class="font-medium">24 months</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-gray-600">Open date</span>
        <span class="font-medium">13 January, 2024</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-gray-600">Next payment</span>
        <span class="font-medium">05 Jun, 2024</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-gray-600">Monthly payment</span>
        <span class="font-medium">{{ formatNaira(150) }}</span>
      </div>
      
      <button class="w-full mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600">
        Recharge now
      </button>
    </div>
  </div>
</template>

<script setup>
import { formatNaira } from '../../utils/currency'
</script>