<template>
  <div>
    <p class="text-2xl uppercase text-gray-900">Register</p>
    <p class="text-red-800" v-if="error">{{ error }}</p>
    <form @submit.prevent="submit" class="py-4 w-96">
      <label class="block text-xl italic text-gray-700 mb-4">
        Email:
        <input
          v-model="email"
          type="email"
          placeholder="Enter Email..."
          class="w-full p-4 border-teal-600 border-2"
        />
      </label>
      <label class="block text-xl italic text-gray-700">
        Password:
        <input
          v-model="password"
          type="password"
          placeholder="Enter Password..."
          class="w-full p-4 border-teal-600 border-2"
        />
      </label>
      <button
        type="submit"
        class="bg-teal-400 px-8 py-4 rounded-2xl text-white mt-4"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import axios from 'axios';
import { setAccessToken } from "~~/auth";
import { useRouter } from 'vue-router'

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const error = ref("");
    const router = useRouter()

    const submit = async () => {
      try {
        error.value = "";
        const response = await axios.post('/server-api/v1/auth/register', {
          email: email.value,
          password: password.value
        })
        const { data } = response;

        console.log(data, data.accessToken);
        setAccessToken(data.accessToken)
        router.push('/')
        
        email.value = ''
        password.value = ''
      } catch(err) {
        console.log(err);
        error.value = err.response.data.message || err.message;
      }
    };

    return {
      email,
      password,
      submit,
      error,
    };
  },
};
</script>
