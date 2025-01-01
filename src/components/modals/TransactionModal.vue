<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="close" class="relative z-50">
      <!-- Backdrop -->
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

      <!-- Modal -->
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
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium text-gray-900 mb-4"
              >
                Add Transaction
              </DialogTitle>

              <form @submit.prevent="handleSubmit" class="space-y-4 text-black">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Amount</label
                  >
                  <input
                    type="number"
                    v-model="form.amount"
                    class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Category</label
                  >
                  <select
                    v-model="form.category"
                    class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Select category</option>
                    <option v-for="cat in categories" :key="cat" :value="cat">
                      {{ cat }}
                    </option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Narration</label
                  >
                  <textarea
                    v-model="form.narration"
                    rows="2"
                    class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Transaction Narration..."
                  ></textarea>
                </div>

                <div class="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    @click="close"
                    class="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 text-black"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    :disabled="!form.amount || !form.category"
                    class="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Add Transaction
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
});
const emit = defineEmits(["close", "submit"]);
const categories = [
  "Food & Drinks",
  "Shopping",
  "Transport",
  "Entertainment",
  "Bills",
  "Salary",
  "Investment",
  "Other",
];
const form = reactive({
  amount: "",
  category: "",
  narration: "",
});
const close = () => {
  emit("close");
};
const handleSubmit = () => {
  emit("submit", { ...form });
  close();
};
</script>