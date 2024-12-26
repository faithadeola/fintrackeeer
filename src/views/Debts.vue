<template>
    <div class="p-6 max-w-4xl mx-auto">
      <h1 class="text-2xl font-semibold mb-4">Debts Management</h1>
  
      <!-- Add Debt Button -->
      <button
        @click="openAddDebtModal"
        class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4"
      >
        Add New Debt
      </button>
  
      <!-- Debts List -->
      <div v-if="debts.length > 0" class="grid gap-4">
        <div
          v-for="debt in debts"
          :key="debt.id"
          class="bg-white shadow-md rounded p-4 flex justify-between items-center"
        >
          <div>
            <p><strong>Lender:</strong> {{ debt.lender }}</p>
            <p><strong>Amount:</strong> ${{ debt.amount }}</p>
            <p><strong>Due Date:</strong> {{ debt.dueDate }}</p>
          </div>
          <div>
            <button
              @click="editDebt(debt)"
              class="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
            >
              Edit
            </button>
            <button
              @click="deleteDebt(debt.id)"
              class="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 ml-2"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
  
      <!-- No Debts Message -->
      <div v-else class="text-gray-500">
        No debts recorded. Click "Add New Debt" to get started.
      </div>
  
      <!-- Add/Edit Debt Modal -->
      <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
        <div class="bg-white rounded shadow-md p-6 max-w-md w-full">
          <h2 class="text-xl font-semibold mb-4">
            {{ isEditing ? "Edit Debt" : "Add New Debt" }}
          </h2>
  
          <label class="block mb-2">Lender</label>
          <input
            v-model="currentDebt.lender"
            type="text"
            class="w-full border rounded p-2 mb-4"
          />
  
          <label class="block mb-2">Amount</label>
          <input
            v-model="currentDebt.amount"
            type="number"
            class="w-full border rounded p-2 mb-4"
          />
  
          <label class="block mb-2">Due Date</label>
          <input
            v-model="currentDebt.dueDate"
            type="date"
            class="w-full border rounded p-2 mb-4"
          />
  
          <!-- Modal Actions -->
          <div class="mt-4">
            <button
              @click="saveDebt"
              class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              @click="closeModal"
              class="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        debts: [], // List of debts
        showModal: false, // Controls the modal visibility
        isEditing: false, // Determines if the modal is in edit mode
        currentDebt: {
          id: null,
          lender: "",
          amount: "",
          dueDate: "",
        },
      };
    },
    methods: {
      openAddDebtModal() {
        this.resetCurrentDebt();
        this.showModal = true;
      },
      closeModal() {
        this.showModal = false;
      },
      saveDebt() {
        if (this.isEditing) {
          // Update existing debt
          const index = this.debts.findIndex((d) => d.id === this.currentDebt.id);
          if (index !== -1) this.debts.splice(index, 1, { ...this.currentDebt });
        } else {
          // Add new debt
          this.debts.push({
            ...this.currentDebt,
            id: Date.now(), // Generate a unique ID
          });
        }
        this.closeModal();
      },
      editDebt(debt) {
        this.currentDebt = { ...debt };
        this.isEditing = true;
        this.showModal = true;
      },
      deleteDebt(id) {
        if (confirm("Are you sure you want to delete this debt?")) {
          this.debts = this.debts.filter((d) => d.id !== id);
        }
      },
      resetCurrentDebt() {
        this.currentDebt = {
          id: null,
          lender: "",
          amount: "",
          dueDate: "",
        };
        this.isEditing = false;
      },
    },
  };
  </script>
  
  
  