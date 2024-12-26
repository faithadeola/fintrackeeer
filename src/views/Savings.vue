<template>
  <div class="min-h-screen bg-gray-50 lg:pl-64">
    <Sidebar />
    <Navbar />
    <main class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-semibold text-gray-900">All savings</h1>
        <button 
          @click="showTransactionModal = true"
          class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600"
        >
          + Transaction
        </button>
      </div>

      <!-- Savings Goals Grid -->
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SavingsGoalCard
          v-for="goal in savingsGoals"
          :key="goal.id"
          v-bind="goal"
          @click="handleGoalClick(goal)"
        />
        <NewSavingsCard @click="showNewSavingsModal = true" />
      </div>
    </main>

    <TransactionModal 
      :is-open="showTransactionModal"
      @close="showTransactionModal = false"
      @submit="handleTransactionSubmit"
    />
    
    <NewSavingsModal
      :is-open="showNewSavingsModal"
      @close="showNewSavingsModal = false"
      @submit="handleNewSavings"
    />
    
    <SavingsDetailsModal
      v-if="selectedSavings"
      :is-open="showSavingsDetailsModal"
      :savings="selectedSavings"
      @close="showSavingsDetailsModal = false"
      @deposit="handleDeposit"
      @withdraw="handleWithdraw"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Car, Gift } from 'lucide-vue-next'
import { useToast } from 'vue-toastification'
import Sidebar from '../components/layout/Sidebar.vue'
import Navbar from '../components/layout/Navbar.vue'
import SavingsGoalCard from '../components/savings/SavingsGoalCard.vue'
import NewSavingsCard from '../components/savings/NewSavingsCard.vue'
import TransactionModal from '../components/modals/TransactionModal.vue'
import NewSavingsModal from '../components/modals/NewSavingsModal.vue'
import SavingsDetailsModal from '../components/modals/SavingsDetailsModal.vue'

const toast = useToast()
const showTransactionModal = ref(false)
const showNewSavingsModal = ref(false)
const showSavingsDetailsModal = ref(false)
const selectedSavings = ref(null)

const savingsGoals = [
  {
    id: 1,
    name: 'Savings for a car',
    subtitle: 'Vehicle purchase fund',
    current: 4560000,
    target: 12000000,
    icon: Car,
    bgColor: 'bg-green-100',
    type: 'primary',
    startDate: '01 Jan, 2024',
    endDate: '31 Dec, 2024',
    monthlyTarget: 1000000,
    description: 'Saving up for a new car. Planning to buy a reliable used vehicle for daily commute.'
  },
  {
    id: 2,
    name: 'Savings for gift for Mom',
    subtitle: 'Birthday present',
    current: 300000,
    target: 400000,
    icon: Gift,
    bgColor: 'bg-blue-100',
    type: 'success',
    startDate: '01 Mar, 2024',
    endDate: '30 Apr, 2024',
    monthlyTarget: 200000,
    description: 'Birthday gift fund for mom\'s special day.'
  }
]

const handleTransactionSubmit = (data) => {
  console.log('Transaction submitted:', data)
  toast.success('Transaction added successfully!')
  showTransactionModal.value = false
}

const handleNewSavings = (data) => {
  console.log('New savings:', data)
  toast.success('Savings goal created successfully!')
}

const handleGoalClick = (goal) => {
  selectedSavings.value = goal
  showSavingsDetailsModal.value = true
}

const handleDeposit = () => {
  showTransactionModal.value = true
  showSavingsDetailsModal.value = false
}

const handleWithdraw = () => {
  showTransactionModal.value = true
  showSavingsDetailsModal.value = false
}
</script>