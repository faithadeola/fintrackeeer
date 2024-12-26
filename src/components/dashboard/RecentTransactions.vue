<template>
  <div class="bg-white rounded-xl p-6 shadow-sm">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold text-gray-800">Last Transactions</h2>
      <button class="text-sm text-primary hover:text-primary/80">View All</button>
    </div>
    
    <div class="space-y-4">
      <div v-for="transaction in transactions" :key="transaction.id" 
           class="flex items-center justify-between py-3 border-b last:border-0">
        <div class="flex items-center gap-3">
          <div :class="['w-10 h-10 rounded-full flex items-center justify-center', transaction.bgColor]">
            <component :is="transaction.icon" class="w-5 h-5" />
          </div>
          <div>
            <p class="font-medium text-gray-900">{{ transaction.name }}</p>
            <p class="text-sm text-gray-500">{{ transaction.date }}</p>
          </div>
        </div>
        <p :class="['font-medium', transaction.amount.startsWith('+') ? 'text-primary' : 'text-gray-900']">
          {{ transaction.amount }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ShoppingBag, Gift, Heart } from 'lucide-vue-next'

const transactions = [
  {
    id: 1,
    name: 'Entertainment',
    date: '2024-02-20',
    amount: '-$350.00',
    icon: ShoppingBag,
    bgColor: 'bg-blue-100'
  },
  {
    id: 2,
    name: 'Food',
    date: '2024-02-19',
    amount: '-$155.00',
    icon: Gift,
    bgColor: 'bg-red-100'
  },
  {
    id: 3,
    name: 'Charity',
    date: '2024-02-18',
    amount: '-$250.00',
    icon: Heart,
    bgColor: 'bg-green-100'
  }
]
</script>