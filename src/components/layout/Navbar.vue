<template>
  <header class="bg-white border-b sticky top-0 z-30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16 w-full">
        <div class="flex items-center gap-4">
          <h1 class="text-xl font-semibold text-gray-900 capitalize">{{ route.name }}</h1>
        </div>

        <div class="flex items-center gap-2 sm:gap-4">
          <div class="hidden sm:block">
            <div class="hidden items-center gap-2">
              <span class="text-sm text-gray-500">Balance</span>
              <span class="text-lg font-semibold">{{ formatNaira(15300) }}</span>
            </div>
          </div>

          <button 
            @click="showTransactionModal = true"
            class="hidden px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            + Transaction
          </button>

          <Menu as="div" class="relative">
            <MenuButton class="flex items-center gap-2">
              <img 
                :src="user?.photo || 'https://ui-avatars.com/api/?name=User'" 
                :alt="user?.username || 'User'"
                class="w-8 h-8 rounded-full"
              />
              <ChevronDown class="w-4 h-4" />
            </MenuButton>

            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <MenuItems 
                class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 ring-1 ring-black ring-opacity-5"
              >
                <MenuItem v-slot="{ active }">
                  <a 
                    @click.prevent="navigateToProfile"
                    :class="[
                      active ? 'bg-gray-50' : '',
                      'block px-4 py-2 text-sm text-gray-700'
                    ]"
                  >
                    Profile
                  </a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a 
                    href="#" 
                    @click="handleLogout"
                    :class="[
                      active ? 'bg-gray-50' : '',
                      'block px-4 py-2 text-sm text-gray-700'
                    ]"
                  >
                    Logout
                  </a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>
    
    <TransactionModal 
      :is-open="showTransactionModal"
      @close="showTransactionModal = false"
      @submit="handleTransactionSubmit"
    />
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ChevronDown } from 'lucide-vue-next'
import { auth } from '../../utils/auth'
import { useToast } from 'vue-toastification'
import { formatNaira } from '../../utils/currency'
import TransactionModal from '../modals/TransactionModal.vue'
const route = useRoute()
const router = useRouter()
const toast = useToast()
const user = auth.getUser()
const showTransactionModal = ref(false)
const handleLogout = () => {
  auth.removeUser()
  toast.success('Successfully logged out!')
  router.push('/')
}
const handleTransactionSubmit = (data) => {
  console.log('Transaction submitted:', data)
  toast.success('Transaction added successfully!')
}
const navigateToProfile = () => {
  router.push('/profile')
}
</script>
