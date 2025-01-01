<template>
    <div class="min-h-screen bg-gray-50 lg:pl-64">
      <Sidebar />
      <Navbar />
      <div class="w-full p-12">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold text-gray-800">Your Transactions</h2>
          <button
            @click="showTransactionModal = true"
            class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Add Transaction
          </button>
        </div>
  
        <div class="space-y-4 bg-white">
          <div
            v-if="transactions.length === 0 && !loading"
            class="w-full p-4 text-center text-gray-500"
          >
            You do not have any transactions yet.
          </div>
          <div
            v-for="(transaction, index) in transactions"
            :key="transaction.id"
            class="flex items-center justify-between p-3 border-b last:border-0 cursor-pointer"
            @click="
              selectedTransaction = transaction;
              isViewModalOpen = true;
            "
          >
            <div class="flex items-center gap-3">
              <div
                :class="[
                  'w-10 h-10 rounded-full flex items-center justify-center text-black',
                  transaction.bgColor,
                ]"
              >
                <ShoppingBag class="w-5 h-5" v-if="index % 2 === 0" />
                <Gift class="w-5 h-5" v-else />
              </div>
              <div>
                <p class="font-medium text-gray-900">
                  {{ transaction.category }}
                </p>
                <p class="text-sm text-gray-500">{{ transaction.narration }}</p>
              </div>
            </div>
            <p :class="['font-medium', 'text-gray-900']">
              {{ formatNaira(transaction.amount) }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <TransactionModal
      :is-open="showTransactionModal"
      @close="showTransactionModal = false"
      @submit="handleTransactionSubmit"
    />
    <TransactionViewModal
      :is-open="isViewModalOpen"
      :transaction="selectedTransaction"
      @close="closeViewModal"
      @edit="handleTransactionUpdate"
      @delete="handleTransactionDelete"
    />
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useToast } from "vue-toastification";
  import Sidebar from "../components/layout/Sidebar.vue";
  import Navbar from "../components/layout/Navbar.vue";
  import TransactionModal from "../components/modals/TransactionModal.vue";
  import TransactionViewModal from "../components/modals/TransactionViewModal.vue";
  import { APIService } from "../services/api.service";
  import { ShoppingBag, Gift } from "lucide-vue-next";
  import { formatNaira } from "../utils/currency";
  const showTransactionModal = ref(false);
  const toast = useToast();
  const transactions = ref([]);
  const isViewModalOpen = ref(false);
  const loading = ref(false);
  const error = ref(false);
  const selectedTransaction = ref(null);
  onMounted(() => {
    fetchUserTransactions();
  });
  const fetchUserTransactions = async () => {
    loading.value = true;
    toast(
      transactions.value.length === 0 ? "loading..." : "Reloading transactions",
      { timeout: false, closeButton: false }
    );
    try {
      const response = await APIService.getUserTransactions();
      if (!response.error) {
        transactions.value = response;
      } else {
        toast.error("Request failed!");
      }
    } catch (error) {
      toast.error("Request failed!");
    } finally {
      loading.value = false;
      toast.clear();
    }
  };
  const handleTransactionSubmit = async (data) => {
    console.log("Transaction submitte:", data);
    loading.value = true;
    toast("Creating Transaction...", { timeout: false, closeButton: false });
    try {
      const response = await APIService.createUserTransaction(data);
      toast.clear();
      if (!response.error) {
        toast.success("Transaction added successfully!");
        fetchUserTransactions();
      } else {
        toast.error("Transaction Creation failed!");
      }
    } catch (error) {
      toast.clear();
      console.log(error);
      toast.error("Transaction Creation failed!");
    } finally {
      loading.value = false;
    }
  };
  const handleTransactionDelete = async (id) => {
    loading.value = true;
    toast("Deleting Transaction...", { timeout: false, closeButton: false });
    try {
      const response = await APIService.deleteUserTransactionByID(id);
      toast.clear();
      if (!response.error) {
        toast.success("Transaction deleted successfully!");
        fetchUserTransactions();
      } else {
        toast.error("Transaction Deletion failed!");
      }
    } catch (error) {
      toast.clear();
      console.log(error);
      toast.error("Transaction Deletion failed!");
    } finally {
      loading.value = false;
    }
  };
  const handleTransactionUpdate = async (data) => {
    loading.value = true;
    toast("Updating Transaction...", { timeout: false, closeButton: false });
    try {
      const response = await APIService.updateUserTransactionByID(data);
      toast.clear();
      if (!response.error) {
        toast.success("Transaction updated successfully!");
        fetchUserTransactions();
      } else {
        toast.error("Transaction Update failed!");
      }
    } catch (error) {
      toast.clear();
      console.log(error);
      toast.error("Transaction Update failed!");
    } finally {
      loading.value = false;
    }
  };
  const closeViewModal = () => {
    isViewModalOpen.value = false;
  };
  </script>