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
            <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-xl bg-white shadow-xl transition-all">
            
              <div class="bg-black text-white p-6">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="font-medium">{{ dateFormatted }}</h3>
                  <button @click="close">
                    <X class="w-5 h-5" />
                  </button>
                </div>
                <div class="space-y-2">
                  <div class="flex justify-between items-center">
                    <span class="text-gray-400">Total income</span>
                    <span class="text-green-400">{{ formatNaira(totalIncome) }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-400">Total spending</span>
                    <span class="text-red-400">{{ formatNaira(totalSpending) }}</span>
                  </div>
                </div>
              </div>

              <div class="p-6">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="font-medium">Transactions</h3>
                  <button 
                    @click="$emit('addTransaction')"
                    class="text-sm text-primary hover:text-primary-600"
                  >
                    + Add
                  </button>
                </div>
                <div class="space-y-4">
                  <div 
                    v-for="transaction in transactions" 
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

                  <div v-if="!transactions.length" class="text-center text-gray-500 py-4">
                    No transactions for this day
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { computed } from 'vue'
import { format } from 'date-fns'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from '@headlessui/vue'
import { X } from 'lucide-vue-next'
import { formatNaira } from '../../utils/currency'

const props = defineProps({
  isOpen: Boolean,
  date: Date,
  transactions: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close', 'addTransaction'])

const dateFormatted = computed(() => {
  return format(props.date, 'MMMM d, yyyy')
})

const totalIncome = computed(() => {
  return props.transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0)
})

const totalSpending = computed(() => {
  return Math.abs(props.transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0))
})

const close = () => {
  emit('close')
}
</script>