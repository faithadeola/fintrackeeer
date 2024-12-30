<template>
  <div class="min-h-screen flex">
    <!-- Left side - Auth form -->
    <div class="w-full lg:w-1/2 p-8 flex items-center justify-center">
      <div class="w-full max-w-md">
        <!-- Logo -->
        <div>
        <div class="mb-8 text-primary text-6xl font-extrabold gap-4">SEEDR  
        </div>
      </div>
        <!-- Auth Form -->
        <div>
          <h1 class="text-heading-1 font-semibold mb-2">Get started now</h1>
          <p class="text-gray-600 mb-8">Enter your details to access your account</p>

          <!-- Social Login Buttons -->
          
          <AuthForm
            :is-signup="isSignup"
            @submit="handleSubmit"
          />

          <!-- Toggle Auth Mode -->
          <p class="mt-6 text-center text-sm text-gray-600">
            {{ isSignup ? 'Already have an account?' : "Don't have an account?" }}
            <a href="#" @click.prevent="isSignup = !isSignup" class="text-primary">
              {{ isSignup ? 'Log in' : 'Sign up' }}
            </a>
          </p>
        </div>
      </div>
    </div>

    <!-- Right side - Preview -->
    <div class="hidden lg:block w-1/2 bg-black p-8">
      <div class="h-full flex flex-col justify-center items-center text-white">
        <h2 class="text-heading-1 font-semibold mb-4">The simplest way to manage your finance</h2>
        <p class="text-gray-400 mb-8">Enter your details to access your account</p>
        <div class="relative w-full max-w-lg">
          <img src="/desktop.png" alt="Dashboard Preview" class="w-full rounded-lg shadow-xl" />
          
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { APIService } from '../services/api.service'
import { auth } from '../utils/auth'
import SocialButton from '../components/auth/SocialButton.vue'
import AuthForm from '../components/auth/AuthForm.vue'

const router = useRouter()
const toast = useToast()
const isSignup = ref(false)

const handleSubmit = async ({ form: formData, setError }) => {
  try {
    const response = isSignup.value
      ? await APIService.signup(formData)
      : await APIService.login(formData)
    console.log(response)
    if (!response.error) {
      auth.setUser(response)
      toast.success(response?.message || 'User successfully logged in')
      router.push('/dashboard')
    } else {
      setError(response?.message || 'Authentication failed')
      toast.error(response?.message || 'Authentication failed')
    }
  } catch (error) {
    const errorMessage = error.response?.message || 'An unexpected error occurred'
    setError(errorMessage)
    toast.error(errorMessage)
    console.error('Auth error:', error)
  }
}

const handleSocialLogin = async (provider) => {
  try {
    const response = await APIService.socialLogin(provider)
    if (response.status === 200) {
      auth.setUser(response.data)
      toast.success('Successfully logged in!')
      router.push('/dashboard')
    } else {
      toast.error(response.data?.message || 'Social login failed')
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Social login failed'
    toast.error(errorMessage)
    console.error('Social login error:', error)
  }
}
</script>