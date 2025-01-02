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
            <DialogPanel class="w-[95%] max-w-md transform overflow-hidden rounded-xl bg-white shadow-xl transition-all">
              <div class="p-6">
                <div class="flex items-center justify-between mb-6">
                  <DialogTitle as="h3" class="text-lg font-medium text-gray-900">
                    {{ savings.name }}
                  </DialogTitle>
                  <button @click="close" class="text-gray-400 hover:text-gray-500">
                    <X class="w-5 h-5" />
                  </button>
                </div>

                <div class="space-y-6">
              
                  <div>
                    <div class="flex items-baseline justify-between mb-2">
                      <span class="text-2xl font-bold">{{ formatNaira(savings.current) }}</span>
                      <span class="text-gray-500">of {{ formatNaira(savings.target) }}</span>
                    </div>
                    <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        class="h-full bg-primary transition-all duration-500"
                        :style="{ width: `${percentage}%` }"
                      ></div>
                    </div>
                    <p class="text-sm text-gray-500 mt-1">{{ percentage }}% completed</p>
                  </div>

                  
                  <div class="space-y-4">
                    <div class="flex justify-between items-center">
                      <span class="text-gray-600">Started</span>
                      <span class="font-medium">{{ savings.startDate }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-gray-600">Target Date</span>
                      <span class="font-medium">{{ savings.endDate }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-gray-600">Monthly Target</span>
                      <span class="font-medium">{{ formatNaira(savings.monthlyTarget) }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-gray-600">Amount Left</span>
                      <span class="font-medium text-primary">{{ formatNaira(savings.target - savings.current) }}</span>
                    </div>
                  </div>

                
                  <div>
                    <h4 class="font-medium text-gray-900 mb-2">Description</h4>
                    <p class="text-gray-600">{{ savings.description }}</p>
                  </div>

                
                  <div class="flex gap-3">
                    <button
                      @click="$emit('deposit')"
                      class="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600"
                    >
                      Add Money
                    </button>
                    <button
                      @click="$emit('withdraw')"
                      class="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                      Withdraw
                    </button>
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
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { X } from 'lucide-vue-next'
import { formatNaira } from '../../utils/currency'

const props = defineProps({
  isOpen: Boolean,
  savings: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'deposit', 'withdraw'])

const percentage = computed(() => {
  return Math.min(Math.round((props.savings.current / props.savings.target) * 100), 100)
})

const close = () => {
  emit('close')
}
</script>