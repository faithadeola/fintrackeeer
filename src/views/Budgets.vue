<template>
  <div class="min-h-screen bg-gray-50 lg:pl-64">
    <Sidebar />
    <Navbar />
    
    <main class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <!-- Header with Actions -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div class="flex items-center gap-4">
          <h1 class="text-2xl font-semibold text-gray-900">Monthly Budget</h1>
          <div class="hidden sm:flex items-center gap-2 text-sm text-gray-500">
            <Calendar class="w-4 h-4" />
            <span>05 Jun, 24 - 05 Jul, 24</span>
          </div>
        </div>
        <div class="flex gap-3">
          <button 
            @click="showBudgetModal = true"
            class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            + Budget
          </button>
          <button 
            @click="showTransactionModal = true"
            class="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            + Transaction
          </button>
        </div>
      </div>

      <!-- Overview Cards -->
      <div class="grid gap-4 sm:grid-cols-2 mb-8">
        <BudgetOverviewCard 
          title="Personal expenses"
          current="4,500"
          total="7,400"
          percentage="64"
          type="warning"
          message="You've spent over half your budget. Review your goals below."
          v-for="budget in budgets" :key="budget?._id"
        />
        
      </div>

      <!-- Spending Categories -->
      <div class="space-y-6 hidden">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold text-gray-800">Spending</h2>
          <button class="text-sm text-primary hover:text-primary-600">
            Add Category
          </button>
        </div>
        
        <div class="space-y-4 hidden">
          <BudgetCategoryCard 
            v-for="category in spendingCategories" 
            :key="category.id"
            v-bind="category"
          />
        </div>
      </div>

      <!-- Income Section -->
      <div class="mt-8 space-y-6 hidden">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold text-gray-800">Income</h2>
          <button class="text-sm text-primary hover:text-primary-600">
            Add Income
          </button>
        </div>
        
        <div class="space-y-4 hidden">
          <BudgetCategoryCard 
            v-for="income in incomeCategories" 
            :key="income.id"
            v-bind="income"
          />
        </div>
      </div>
    </main>
    
    <TransactionModal 
      :is-open="showTransactionModal"
      @close="showTransactionModal = false"
      @submit="handleTransactionSubmit"
    />
    
    <BudgetModal
      :is-open="showBudgetModal"
      @close="showBudgetModal = false"
      @submit="handleBudgetSubmit"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Calendar } from 'lucide-vue-next'
import { useToast } from 'vue-toastification'
import Sidebar from '../components/layout/Sidebar.vue'
import Navbar from '../components/layout/Navbar.vue'
import BudgetOverviewCard from '../components/budgets/BudgetOverviewCard.vue'
import BudgetCategoryCard from '../components/budgets/BudgetCategoryCard.vue'
import TransactionModal from '../components/modals/TransactionModal.vue'
import BudgetModal from '../components/modals/BudgetModal.vue'
import { APIService } from '../services/api.service'

const toast = useToast()
const showTransactionModal = ref(false)
const showBudgetModal = ref(false)
const budgets = ref([])
const loading = ref(false)
const error = ref(false)

onMounted (()=>{
  fetchUserBudgets()
})
const  fetchUserBudgets = async () =>{
  loading.value = true
  toast('loading...',{timeout :false})
  try {
    const response = await APIService.getUserBudgets()
    if (!response.error) {
      budgets.value = response.data
    }
    else {
      toast.error('Request failed!')
    }
  }
  catch(error) {
    toast.error('Request failed!')
  }
  finally{
    loading.value = false
    toast.clear()
  }
}

const handleTransactionSubmit = (data) => {
  console.log('Transaction submitted:', data)
  toast.success('Transaction added successfully!')
}

const handleBudgetSubmit = (data) => {
  console.log('Budget submitted:', data)
  toast.success('Budget created successfully!')
}

const spendingCategories = [
  {
    id: 1,
    icon: '🛒',
    name: 'Groceries',
    dateRange: 'June 5 to July 5',
    timestamp: '2024-10:35',
    amount: 1800,
    spent: 1200,
    note: "I'm eating more fish this month",
    type: 'warning'
  },
  {
    id: 2,
    icon: '⛽',
    name: 'Petrol',
    dateRange: 'June 5 to July 5',
    timestamp: '2024-10:35',
    amount: 800,
    spent: 200,
    note: 'Budget for 2 cars',
    type: 'success'
  },
  {
    id: 3,
    icon: '✈️',
    name: 'Holidays',
    dateRange: 'June 5 to July 5',
    timestamp: '2024-10:35',
    amount: 3500,
    spent: 2200,
    type: 'warning'
  }
]

const incomeCategories = [
  {
    id: 1,
    icon: '💼',
    name: 'Salary',
    dateRange: 'June 5 to July 5',
    timestamp: '2024-10:35',
    amount: 5000,
    received: 3800,
    type: 'success'
  },
  {
    id: 2,
    icon: '💼',
    name: 'Salary 2',
    dateRange: 'June 5 to July 5',
    timestamp: '2024-10:35',
    amount: 3000,
    received: 700,
    type: 'warning'
  }
]

</script>