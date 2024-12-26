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
            <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 shadow-xl transition-all">
              <DialogTitle as="h3" class="text-lg font-medium text-gray-900 mb-4">
                Add Transaction
              </DialogTitle>

              <form @submit.prevent="handleSubmit" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <div class="flex gap-4">
                    <label class="flex items-center gap-2">
                      <input type="radio" v-model="form.type" value="expense" class="text-primary">
                      <span>Expense</span>
                    </label>
                    <label class="flex items-center gap-2">
                      <input type="radio" v-model="form.type" value="income" class="text-primary">
                      <span>Income</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <input
                    type="number"
                    v-model="form.amount"
                    class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  >
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
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
                  <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    v-model="form.date"
                    class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Note</label>
                  <textarea
                    v-model="form.note"
                    rows="2"
                    class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Add a note..."
                  ></textarea>
                </div>

                <div class="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    @click="close"
                    class="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-600"
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
import { ref, reactive } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

const props = defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['close', 'submit'])

const categories = [
  'Food & Drinks',
  'Shopping',
  'Transport',
  'Entertainment',
  'Bills',
  'Salary',
  'Investment',
  'Other'
]

const form = reactive({
  type: 'expense',
  amount: '',
  category: '',
  date: new Date().toISOString().split('T')[0],
  note: ''
})

const close = () => {
  emit('close')
}

const handleSubmit = () => {
  emit('submit', { ...form })
  close()
}
</script>