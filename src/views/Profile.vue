<template>
    <div class="p-6 max-w-4xl mx-auto">
    
      <!-- Profile View Section -->
      <div v-if="!editing" class="bg-white shadow-md rounded p-4">
        <p><strong>Name:</strong> {{ profile.name }}</p>
        <p><strong>Email:</strong> {{ profile.email }}</p>
        <p><strong>Phone:</strong> {{ profile.phone }}</p>
  
        <!-- Actions -->
        <div class="mt-4">
          <button 
            @click="editProfile" 
            class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
            Edit Profile
          </button>
          <button 
            @click="deleteProfile" 
            class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 ml-2">
            Delete Profile
          </button>
        </div>
      </div>
  
      <!-- Edit Profile Form -->
      <div v-else class="bg-white shadow-md rounded p-4">
        <label class="block mb-2">Name</label>
        <input 
          v-model="profile.name" 
          type="text" 
          class="w-full border rounded p-2 mb-4" 
        />
  
        <label class="block mb-2">Email</label>
        <input 
          v-model="profile.email" 
          type="email" 
          class="w-full border rounded p-2 mb-4" 
        />
  
        <label class="block mb-2">Phone</label>
        <input 
          v-model="profile.phone" 
          type="text" 
          class="w-full border rounded p-2 mb-4" 
        />
  
        <!-- Actions -->
        <div class="mt-4">
          <button 
            @click="updateProfile" 
            class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
            Save Changes
          </button>
          <button 
            @click="cancelEdit" 
            class="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 ml-2">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { APIService } from '../services/api.service'
  
  export default {
    data() {
      return {
        profile: {
          name: "",
          email: "",
          phone: "",
        },
        editing: false,
      };
    },
    async mounted() {
      try {
        const response = await APIService.getUserProfile();
        this.profile = response.data;
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    },
    methods: {
      editProfile() {
        this.editing = true;
      },
      cancelEdit() {
        this.editing = false;
      },
      async updateProfile() {
        try {
          await APIService.updateUserProfile(this.profile);
          this.editing = false;
          alert("Profile updated successfully!");
        } catch (error) {
          console.error("Error updating profile:", error);
          alert("Failed to update profile.");
        }
      },
      async deleteProfile() {
        if (confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
          try {
            await APIService.deleteUserProfile();
            alert("Profile deleted successfully!");
            localStorage.removeItem("token");
            this.$router.push("/login");
          } catch (error) {
            console.error("Error deleting profile:", error);
            alert("Failed to delete profile.");
          }
        }
      },
    },
  };
  </script>
  
 