<template>
  <div class="bg-white rounded-xl p-6 shadow-sm">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold text-gray-800">My Investments</h2>
      <button class="text-sm text-primary hover:text-primary/80">See All</button>
    </div>
    
    <div class="space-y-4 text">
      <div v-for="investment in investments" :key="investment.name" 
           class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div class="flex items-center gap-3">
          <div :class="['w-10 h-10 rounded-full flex items-center justify-center', investment.bgColor]">
            <img :src="investment.icon" :alt="investment.name" class="w-6 h-6" />
          </div>
          <div>
            <p class="font-medium text-gray-900">{{ investment.name }}</p>
            <p class="text-sm text-gray-500">{{ investment.type }}</p>
          </div>
        </div>
        <div class="text-right">
          <p :class="['font-medium', investment.change.startsWith('+') ? 'text-primary' : 'text-red-500']">
            {{ investment.change }}
          </p>
          <p class="text-sm text-gray-500">{{ formatNaira(parseInt(investment.amount)) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatNaira } from '../../utils/currency'

const investments = [
  {
    name: 'Apple Inc.',
    type: 'Technology',
    icon: '/apple-icon.svg',
    bgColor: 'bg-gray-100',
    change: '+0.34%',
    amount: '12484'
  },
  {
    name: 'MSFT',
    type: 'Technology',
    icon: '/microsoft-icon.svg',
    bgColor: 'bg-blue-100',
    change: '-0.52%',
    amount: '8764'
  },
  {
    name: 'BTC',
    type: 'Crypto',
    icon: '/bitcoin-icon.svg',
    bgColor: 'bg-yellow-100',
    change: '+1.22%',
    amount: '23764'
  }
]
</script>