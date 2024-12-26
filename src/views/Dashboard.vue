<template>
  <div class="min-h-screen bg-gray-50 lg:pl-64">
    <Sidebar />
    <Navbar />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div class="grid gap-6 md:gap-8 lg:grid-cols-3">
        <!-- Left Column -->
        <div class="lg:col-span-2 space-y-6">
          <TransactionsChart />
          <div class="grid gap-6 sm:grid-cols-2">
            <InvestmentsCard />
            <RecentTransactions />
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-6 mt-6 lg:mt-0">
          <BalanceCard @showTransaction="showTransactionModal = true" />
        </div>
      </div>
    </main>
    
    <TransactionModal 
      :is-open="showTransactionModal"
      @close="showTransactionModal = false"
      @submit="handleTransactionSubmit"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import Sidebar from '../components/layout/Sidebar.vue'
import Navbar from '../components/layout/Navbar.vue'
import TransactionsChart from '../components/dashboard/TransactionsChart.vue'
import BalanceCard from '../components/dashboard/BalanceCard.vue'
import InvestmentsCard from '../components/dashboard/InvestmentsCard.vue'
import RecentTransactions from '../components/dashboard/RecentTransactions.vue'
import TransactionModal from '../components/modals/TransactionModal.vue'

const toast = useToast()
const showTransactionModal = ref(false)

const handleTransactionSubmit = (data) => {
  console.log('Transaction submitted:', data)
  toast.success('Transaction added successfully!')
  showTransactionModal.value = false
}
</script>