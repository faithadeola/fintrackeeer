<template>
  <div>
    <!-- Mobile Menu Button -->
    <button 
      @click="isOpen = !isOpen"
      class="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg"
    >
      <Menu v-if="!isOpen" class="w-6 h-6" />
      <X v-else class="w-6 h-6" />
    </button>

    <!-- Sidebar -->
    <div 
      :class="[
        'fixed inset-y-0 left-0 z-40 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <!-- Logo -->
      <div class="p-2 border-b">
        <div class="font-inter text-4xl font-extrabold text-green-400">SEEDR</div>
    
      </div>

      <!-- Navigation -->
      <nav class="p-4 space-y-2">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-black"
          :class="{ 'bg-primary-50 text-primary-600': isActive(item.path) }"
        >
          <component :is="item.icon" class="w-5 h-5" />
          <span>{{ item.name }}</span>
        </router-link>
      </nav>
    </div>

    <!-- Overlay -->
    <div 
      v-if="isOpen"
      @click="isOpen = false"
      class="fixed inset-0 bg-black/20 z-30 lg:hidden"
    ></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { 
  LayoutDashboard, 
  PiggyBank, 
  Calendar, 
  Wallet, 
  CoinsIcon, 
  CreditCard,
  Menu,
  X
} from 'lucide-vue-next'

const route = useRoute()
const isOpen = ref(false)

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Budgets', path: '/budgets', icon: PiggyBank },
  { name: 'Transactions', path: '/transactions', icon: Wallet },
  //{ name: 'Accounts', path: '/accounts', icon: Wallet },
  { name: 'Savings', path: '/savings', icon: CoinsIcon },
  //{ name: 'Debts', path: '/debts', icon: CreditCard },
]

const isActive = (path) => route.path === path
</script>