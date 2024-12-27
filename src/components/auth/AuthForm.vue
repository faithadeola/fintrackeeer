<template>
  <form @submit.prevent="handleSubmit" class="space-y-4 relative">
    <div v-if="isSignup">
      <label class="block text-sm font-medium mb-2">Name</label>
      <input
        v-model="form.name"
        type="text"
        placeholder="Jeremy Martins"
        :class="[
          'w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-black',
          { 'border-red-500': errors.name }
        ]"
      />
      <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
    </div>

    <div>
      <label class="block text-sm font-medium mb-2">Email address</label>
      <input
        v-model="form.email"
        type="email"
        placeholder="martins@43.com"
        :class="[
          'w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-black',
          { 'border-red-500': errors.email }
        ]"
      />
      <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
    </div>

    <div>
      <label class="block text-sm font-medium mb-2">Password</label>
      <div class="relative">
        <input
          v-model="form.password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="min 8 chars"
          :class="[
            'w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-black',
            { 'border-red-500': errors.password }
          ]"
        />
        <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        <button
          type="button"
          @click="showPassword = !showPassword"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          <span v-if="showPassword">Hide</span>
          <span v-else>Show</span>
        </button>
      </div>
    </div>
    <button
      type="submit"
      class="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition-colors"
    >
      {{ isSignup ? 'Sign up' : 'Log in' }}
    </button>
  </form>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

const props = defineProps({
  isSignup: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit'])

const error = ref('')
const errors = reactive({
  name: '',
  email: '',
  password: ''

})

const showPassword = ref(false)
const form = reactive({
  name: '',
  email: '',
  password: ''
})

const validateForm = () => {
  let isValid = true
  
  // Reset errors
  error.value = ''
  Object.keys(errors).forEach(key => errors[key] = '')

  // Name validation (only for signup)
  if (props.isSignup && !form.name.trim()) {
    errors.name = 'Name is required'
    isValid = false
  }

  // Email validation
  if (!form.email) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Invalid email format'
    isValid = false
  }

  // Password validation
  if (!form.password) {
    errors.password = 'Password is required'
    isValid = false
  } else if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
    isValid = false
  }

  // Terms validation (only for signup)
//   if (props.isSignup && !form.terms) {
//     errors.terms = 'You must agree to the Terms and Privacy Policy'
//     isValid = false
//   }
 return isValid
 }
const handleSubmit = () => {
  if (validateForm()) {
    error.value = ''
    emit('submit', { form, setError: (msg) => error.value = msg })
  }
}
</script>