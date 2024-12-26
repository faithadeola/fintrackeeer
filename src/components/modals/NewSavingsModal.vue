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
                    Create New Savings Goal
                  </DialogTitle>
                  <button @click="close" class="text-gray-400 hover:text-gray-500">
                    <X class="w-5 h-5" />
                  </button>
                </div>

                <form @submit.prevent="handleSubmit" class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      v-model="form.title"
                      type="text"
                      class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="e.g., New Car Fund"
                    >
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Target Amount</label>
                    <input
                      v-model="form.target"
                      type="number"
                      class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="0"
                      min="0"
                    >
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Duration (months)</label>
                    <input
                      v-model="form.duration"
                      type="number"
                      class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="12"
                      min="1"
                    >
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      v-model="form.description"
                      rows="3"
                      class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Add details about your savings goal..."
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
                      Create Goal
                    </button>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { X } from 'lucide-vue-next'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close', 'submit'])

const form = reactive({
  title: '',
  target: '',
  duration: '',
  description: ''
})

const close = () => {
  emit('close')
}

const handleSubmit = () => {
  emit('submit', { ...form })
  close()
}
</script>