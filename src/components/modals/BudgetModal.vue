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
                Create Budget
              </DialogTitle>

              <form @submit.prevent="handleSubmit" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    v-model="form.name"
                    class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="e.g., Monthly Groceries"
                  >
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
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Period</label>
                  <div class="grid grid-cols-2 gap-4">
                    <input
                      type="date"
                      v-model="form.startDate"
                      class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                    <input
                      type="date"
                      v-model="form.endDate"
                      class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                  </div>
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
                    Create Budget
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

const form = reactive({
  name: '',
  amount: '',
  category: '',
  startDate: new Date().toISOString().split('T')[0],
  endDate: new Date().toISOString().split('T')[0],
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