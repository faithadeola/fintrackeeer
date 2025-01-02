<template>
  <div class="min-h-screen bg-gray-50 lg:pl-64">
    <Sidebar />
    <Navbar />
    
    <main class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Calendar Section -->
        <div class="flex-1">
          <div class="bg-white rounded-xl p-4 sm:p-6 shadow-sm overflow-x-auto">
            <!-- Calendar Header -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div class="flex items-center gap-4">
                <h2 class="text-xl font-semibold">{{ currentMonth }}</h2>
                <div class="flex items-center gap-2 text-sm">
                  <button @click="previousMonth" class="p-1 hover:bg-gray-100 rounded">
                    <ChevronLeft class="w-5 h-5" />
                  </button>
                  <button @click="nextMonth" class="p-1 hover:bg-gray-100 rounded">
                    <ChevronRight class="w-5 h-5" />
                  </button>
                </div>
              </div>
              <button 
                @click="showTransactionModal = true"
                class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600"
              >
                + Transaction
              </button>
            </div>

            <!-- Calendar Grid -->
            <div class="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden min-w-[280px] sm:min-w-[768px]">
              <!-- Day Headers -->
              <div 
                v-for="day in weekDays" 
                :key="day"
                class="bg-white p-2 sm:p-4 text-center text-xs sm:text-sm font-medium text-gray-500"
              >
                {{ day }}
              </div>

              <!-- Calendar Days -->
              <div
                v-for="(day, index) in calendarDays"
                :key="index"
                :class="[
                  'bg-white min-h-[80px] sm:min-h-[120px] p-1 sm:p-2 cursor-pointer hover:bg-gray-50',
                  { 'opacity-50': !day.isCurrentMonth },
                  { 'bg-primary-50': isSelectedDate(day.date) }
                ]"
                @click="handleDateClick(day)"
              >
                <div class="flex flex-col h-full">
                  <span 
                    :class="[
                      'text-xs sm:text-sm font-medium mb-1',
                      isToday(day.date) ? 'text-primary' : 'text-gray-900'
                    ]"
                  >
                    {{ day.dayOfMonth }}
                  </span>
                  
                  <!-- Transactions for the day -->
                  <div class="space-y-1">
                    <div
                      v-for="transaction in day.transactions.slice(0, 2)"
                      :key="transaction.id"
                      :class="[
                        'text-[10px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-full truncate whitespace-nowrap',
                        transaction.amount > 0 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      ]"
                    >
                      {{ formatNaira(transaction.amount) }}
                    </div>
                    <div
                      v-if="day.transactions.length > 2"
                      class="text-[10px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-full bg-gray-100 text-gray-700 text-center"
                    >
                      +{{ day.transactions.length - 2 }} more
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div class="hidden lg:block w-80">
          <!-- Report Card -->
          <div class="bg-black text-white rounded-xl p-6 mb-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-medium">Report on {{ selectedDateFormatted }}</h3>
              <PlusCircle class="w-4 h-4" />
            </div>
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-gray-400">Total income</span>
                <span class="text-green-400">{{ formatNaira(1400) }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-400">Total spending</span>
                <span class="text-red-400">{{ formatNaira(600) }}</span>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-sm">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-medium">Transactions</h3>
              <button class="text-sm text-gray-500">All</button>
            </div>
            <div class="space-y-4">
              <div 
                v-for="transaction in selectedDateTransactions" 
                :key="transaction.id"
                class="flex items-center justify-between"
              >
                <div>
                  <p class="font-medium">{{ transaction.category }}</p>
                  <p class="text-sm text-gray-500">{{ transaction.time }}</p>
                </div>
                <span 
                  :class="[
                    'font-medium',
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  ]"
                >
                  {{ formatNaira(transaction.amount) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <TransactionModal 
      :is-open="showTransactionModal"
      @close="showTransactionModal = false"
      @submit="handleTransactionSubmit"
    />
    
    <DayDetailsModal
      :is-open="showDayDetailsModal"
      :date="selectedDate"
      :transactions="selectedDateTransactions"
      @close="showDayDetailsModal = false"
      @addTransaction="showTransactionModal = true"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns'
import { ChevronLeft, ChevronRight, PlusCircle } from 'lucide-vue-next'
import { useMediaQuery } from '@vueuse/core'
import { useToast } from 'vue-toastification'
import { formatNaira } from '../utils/currency'
import Sidebar from '../components/layout/Sidebar.vue'
import Navbar from '../components/layout/Navbar.vue'
import TransactionModal from '../components/modals/TransactionModal.vue'
import DayDetailsModal from '../components/modals/DayDetailsModal.vue'

const toast = useToast()
const showTransactionModal = ref(false)
const showDayDetailsModal = ref(false)
const currentDate = ref(new Date())
const selectedDate = ref(new Date())
const isMobile = useMediaQuery('(max-width: 768px)')

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const currentMonth = computed(() => {
  return format(currentDate.value, 'MMMM yyyy')
})

const selectedDateFormatted = computed(() => {
  return format(selectedDate.value, 'MMM d')
})

const calendarDays = computed(() => {
  const start = startOfMonth(currentDate.value)
  const end = endOfMonth(currentDate.value)
  const days = eachDayOfInterval({ start, end })

  return days.map(date => ({
    date,
    dayOfMonth: format(date, 'd'),
    isCurrentMonth: isSameMonth(date, currentDate.value),
    transactions: getMockTransactions(date)
  }))
})

const selectedDateTransactions = computed(() => {
  return getMockTransactions(selectedDate.value)
})

const nextMonth = () => {
  currentDate.value = addMonths(currentDate.value, 1)
}

const previousMonth = () => {
  currentDate.value = subMonths(currentDate.value, 1)
}

const handleDateClick = (day) => {
  selectedDate.value = day.date
  if (isMobile.value) {
    showDayDetailsModal.value = true
  }
}

const isSelectedDate = (date) => {
  return isSameDay(date, selectedDate.value)
}

const handleTransactionSubmit = (data) => {
  console.log('Transaction submitted:', data)
  toast.success('Transaction added successfully!')
}

// Mock data helper
const getMockTransactions = (date) => {
  const day = format(date, 'd')
  if (day === '9') {
    return [
      { id: 1, amount: -3500, category: 'Entertainment', time: '10:35' },
      { id: 2, amount: -500, category: 'Food', time: '12:40' }
    ]
  }
  if (day === '14') {
    return [
      { id: 3, amount: -300, category: 'Shopping', time: '15:20' }
    ]
  }
  if (day === '29') {
    return [
      { id: 4, amount: 15000, category: 'Salary', time: '09:00' }
    ]
  }
  return []
}
</script>