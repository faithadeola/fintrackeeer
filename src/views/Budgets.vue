<template>
  <div class="min-h-screen bg-gray-50 lg:pl-64">
    <Sidebar />
    <Navbar />

    <main class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
    
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
      >
        <div class="flex items-center gap-4">
        
        </div>
        <div class="flex gap-3">
          <button
            @click="showBudgetModal = true"
            class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Add Budget
          </button>
        </div>
      </div>

    
        <div v-if="budgets.length === 0 && !loading" class="w-full p-4 text-center text-gray-500">
          You do not have any budgets yet.
        </div>
      <div class="grid gap-4 sm:grid-cols-2 mb-8">
        <BudgetOverviewCard
          :title="budget?.title"
          :total="budget?.total_amount"
          type="warning"
          :date="new Date(budget?.createdAt).toLocaleDateString()"
          :message="budget?.duration"
          v-for="budget in budgets" :key="budget._id"
          @click="openViewModal(budget)"
        />
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
    <BudgetViewModal
      :is-open="isViewModalOpen"
      :budget="selectedBudget"
      @close="closeViewModal"
      @edit="handleBudgetUpdate"
      @delete="handleBudgetDelete"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'
import Sidebar from '../components/layout/Sidebar.vue'
import Navbar from '../components/layout/Navbar.vue'
import BudgetOverviewCard from '../components/budgets/BudgetOverviewCard.vue'
import BudgetViewModal from "../components/modals/BudgetViewModal.vue";
import TransactionModal from '../components/modals/TransactionModal.vue'
import BudgetModal from '../components/modals/BudgetModal.vue'
import { APIService } from '../services/api.service'
const toast = useToast()
const showTransactionModal = ref(false)
const showBudgetModal = ref(false)
const isViewModalOpen = ref(false)
const budgets = ref([])
const loading = ref(false)
const error = ref(false)
const selectedBudget = ref(null)
onMounted (()=>{
  fetchUserBudgets()
})
const closeViewModal = () => {
  isViewModalOpen.value = false
  // selectedBudget.value = null
}
const openViewModal = (budget) => {
  selectedBudget.value = budget
  isViewModalOpen.value = true
}
const  fetchUserBudgets = async () =>{
  loading.value = true
  toast(budgets.value.length === 0 ? "loading..." : "Reloading transactions", {timeout :false, closeButton:  false })
  try {
    const response = await APIService.getUserBudgets()
    if (!response.error) {
      budgets.value = response
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
const handleBudgetSubmit = async (data) => {
  loading.value = true
  console.log('Budget submitted:', data)
  toast('Creating Budget...',{timeout :false, closeButton:  false })
  try {
    const response = await APIService.createUserBudget(data)
    toast.clear()
    if (!response.error) {
      toast.success('Budget created successfully!')
      fetchUserBudgets()
    }
    else {
      toast.error('Budget Creation failed!')
    }
  }
  catch (error) {
    toast.clear()
      toast.error('Budget Creation failed!')
  }
  finally {
    loading.value = false
  }
}
const handleBudgetUpdate = async (data) => {
  loading.value = true
  console.log('Budget updated:', data)
  toast('Updating Budget...',{timeout :false, closeButton:  false })
  try {
    const response = await APIService.updateUserBudgetByID(data)
    toast.clear()
    if (!response.error) {
      toast.success('Budget updated successfully!')
      fetchUserBudgets()
    }
    else {
      toast.error('Budget Update failed!')
    }
  }
  catch (error) {
    toast.clear()
    toast.error('Budget Update failed!')
  }
  finally {
    loading.value = false
  }
}
const handleBudgetDelete = async (data) => {
  loading.value = true
  toast('Deleting Budget...',{timeout :false, closeButton:  false })
  try {
    const response = await APIService.deleteUserBudgetByID(data)
    toast.clear()
    if (!response.error) {
      toast.success('Budget deleted successfully!')
      fetchUserBudgets()
    }
    else {
      toast.error('Budget Deletion failed!')
    }
  }
  catch (error) {
    toast.clear()
    toast.error('Budget Deletion failed!')
  }
  finally {
    loading.value = false
  }
}
</script>