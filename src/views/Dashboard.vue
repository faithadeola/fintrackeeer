<template>
  <div class="min-h-screen bg-gray-50 lg:pl-64">
    <Sidebar />
    <Navbar />

    <!-- Main Content -->
    <main
      class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex flex-col gap-6"
      :v-if="!loading"
    >
      <div class="w-full flex flex-col sm:flex-row gap-2">
        <div
          class="bg-white rounded-xl p-2 sm:p-6 shadow-sm sticky top-24 sm:w-1/2"
        >
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-sm sm:text-xl font-semibold text-gray-800">
              Total Transactions Amount
            </h2>
          </div>

          <div class="space-y-4">
            <div>
              <p class="text-4xl font-bold text-gray-900">
                {{ formatNaira(totalTransactionsAmount) }}
              </p>
              <p class="text-sm text-gray-500">Sum of all transactions added</p>
            </div>
          </div>
        </div>
        <div
          class="bg-white rounded-xl p-2 sm:p-6 shadow-sm sticky top-24 sm:w-1/2"
        >
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-sm sm:text-xl font-semibold text-gray-800">
              Number of Transactions
            </h2>
          </div>

          <div class="space-y-4">
            <div>
              <p class="text-4xl font-bold text-gray-900">
                {{ totalNumberOfTransactions }}
              </p>
              <p class="text-sm text-gray-500">
                Total number of transactions added
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full flex flex-col sm:flex-row gap-2">
        <div
          class="bg-white rounded-xl p-2 sm:p-6 shadow-sm sticky top-24 sm:w-1/2"
        >
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-sm sm:text-xl font-semibold text-gray-800">
              Total Budget Amount
            </h2>
          </div>

          <div class="space-y-4">
            <div>
              <p class="text-4xl font-bold text-gray-900">
                {{ formatNaira(totalBudgetAmount) }}
              </p>
              <p class="text-sm text-gray-500">Sum of all budgets created</p>
            </div>
          </div>
        </div>
        <div
          class="bg-white rounded-xl p-2 sm:p-6 shadow-sm sticky top-24 sm:w-1/2"
        >
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-sm sm:text-xl font-semibold text-gray-800">
              Number of Budgets
            </h2>
          </div>

          <div class="space-y-4">
            <div>
              <p class="text-4xl font-bold text-gray-900">
                {{ totalNumberOfBudgets }}
              </p>
              <p class="text-sm text-gray-500">
                Total number of budgets created
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import Navbar from "../components/layout/Navbar.vue";
import Sidebar from "../components/layout/Sidebar.vue";
import { formatNaira } from "../utils/currency";
import { APIService } from "../services/api.service";
  
const toast = useToast();
const totalNumberOfBudgets = ref(0);
const totalBudgetAmount = ref(0);
const totalNumberOfTransactions = ref(0);
const totalTransactionsAmount = ref(0);
const loading = ref(false);
onMounted(() => {
  toast("Getting Dashboard Data...", {
    timeout: false,
    closeButton: false,
  });
  fetchUserBudgets();
});
const fetchUserBudgets = async () => {
  loading.value = true;
  try {
    const response = await APIService.getUserBudgets();
    if (!response.error) {
      const budgets = response || [];
      totalNumberOfBudgets.value = budgets.length;
      let totalAmount = 0;
      budgets.forEach((budget) => {
        totalAmount += budget.total_amount;
      });
      totalBudgetAmount.value = totalAmount;
      fetchUserTransactions();
    } else {
      toast.clear();
      toast.error("Request failed!");
    }
  } catch (error) {
    toast.clear();
    console.log(error);
    toast.error("Request failed!..");
  }
};
const fetchUserTransactions = async () => {
  loading.value = true;
  try {
    const response = await APIService.getUserTransactions();
    if (!response.error) {
      toast.clear();
      const transactions = response || [];
      totalNumberOfTransactions.value = transactions.length;
      let totalAmount = 0;
      transactions.forEach((transaction) => {
        totalAmount += transaction.amount;
      });
      totalTransactionsAmount.value = totalAmount;
      loading.value = false;
    } else {
      toast.clear();
      toast.error("Request failed!");
    }
  } catch (error) {
    toast.clear();
    toast.error("Request failed!.");
  } finally {
    loading.value = false;
  }
};
</script>