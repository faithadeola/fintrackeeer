<template>
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="close" class="relative z-50">
      
        <TransitionChild
          enter="ease-out duration-300"
          enter-from="opacity-0" 
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>
   

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              enter="ease-out duration-300"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 shadow-xl transition-all">
                <DialogTitle as="h3" class="text-lg font-medium text-gray-900 mb-4">
                  Budget Details
                </DialogTitle>
   
                <div v-if="!isEditing" class="space-y-4 text-black">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <p class="p-2 bg-gray-50 rounded-lg capitalize">{{ budget.title }}</p>
                  </div>
   
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                    <p class="p-2 bg-gray-50 rounded-lg">{{ formatNaira(budget.total_amount) }}</p>
                  </div>
   
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <p class="p-2 bg-gray-50 rounded-lg capitalize">{{ budget.duration }}</p>
                  </div>
   
                  <div class="flex justify-end gap-3 mt-6">
                    <button
                      @click="close"
                      class="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 text-black"
                    >
                      Close
                    </button>
                    <button
                      @click="handleDelete"
                      class="px-4 py-2 text-sm border rounded-lg hover:bg-red-50 text-red-600"
                    >
                      Delete
                    </button>
                    <button
                      @click="startEdit"
                      class="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-600"
                    >
                      Edit
                    </button>
                  </div>
                </div>
   
                <form v-else @submit.prevent="handleSave" class="space-y-4 text-black">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      v-model="editForm.title"
                      class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="e.g., Monthly Groceries"
                    >
                  </div>
   
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                    <input
                      type="number"
                      v-model="editForm.total_amount"
                      class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    >
                  </div>
   
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <select
                      v-model="editForm.duration"
                      class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
   
                  <div class="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      @click="cancelEdit"
                      class="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 text-black"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      :disabled="!editForm.title || !editForm.total_amount || !editForm.duration"
                      class="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Save Budget
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
   </template>
   
   <script setup>
   import { formatNaira } from "../../utils/currency";
   import { ref, reactive } from "vue";
   import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
   } from "@headlessui/vue";
   const props = defineProps({
    isOpen: Boolean,
    budget: {
      type: Object,
      required: true
    }
   });
   const emit = defineEmits(["close", "edit", "delete"]);
   const isEditing = ref(false);
   const editForm = reactive({
    title: "",
    total_amount: "",
    duration: ""
   });
   const startEdit = () => {
    editForm.title = props.budget.title;
    editForm.total_amount = props.budget.total_amount;
    editForm.duration = props.budget.duration;
    isEditing.value = true;
   };
   const cancelEdit = () => {
    isEditing.value = false;
   };
   const close = () => {
    isEditing.value = false;
    emit("close");
   };
   const handleDelete = () => {
    emit("delete", props.budget);
    close();
   };
   const handleSave = () => {
    emit("edit", { ...editForm, _id: props.budget._id });
    isEditing.value = false;
    //close();
   };
   </script>