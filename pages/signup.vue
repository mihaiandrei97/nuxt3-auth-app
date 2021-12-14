<template>
  <div>
    <p class="text-2xl uppercase text-gray-900">Register</p>
    <form @submit.prevent="submit" class="py-4 w-96">
      <label class="block text-xl italic text-gray-700 mb-4">
        Email:
        <input v-model="email" type="email" placeholder="Enter Email..." class="w-full p-4 border-teal-600 border-2">
      </label>
      <label class="block text-xl italic text-gray-700">
        Password:
        <input v-model="password" type="password" placeholder="Enter Password..." class="w-full p-4 border-teal-600 border-2">
      </label>
      <button  type="submit" class="bg-teal-400 px-8 py-4 rounded-2xl text-white mt-4">Register</button>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
  setup(){
    const email = ref('')
    const password = ref('')
    
    const submit = () => {
      console.log(email.value, password.value)
    }

    return {
      email, password, submit
    }
  }
}
</script>