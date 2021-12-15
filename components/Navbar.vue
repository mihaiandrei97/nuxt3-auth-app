<template>
  <nav class="flex gap-4 items-center mb-10">
    <h1 class="text-2xl text-gray-800 font-bold tracking-wider">Nuxt3 Auth</h1>

    <!-- for all users -->
    <NuxtLink class="ml-auto text-gray-700 text-xl font-bold hover:text-gray-400" to="/">Home</NuxtLink>

    <button v-if="getAccessToken" class="bg-teal-600 rounded-3xl px-4 py-2 text-slate-50" @click="logout">Logout</button>

    <template v-if="!getAccessToken">
      <NuxtLink class="text-gray-700 text-xl font-bold hover:text-gray-400" to="/login">Login</NuxtLink>
      <NuxtLink class="text-gray-700 text-xl font-bold hover:text-gray-400" to="/signup">Signup</NuxtLink>
    </template>

    <NuxtLink
      class="text-gray-700 text-xl font-bold hover:text-gray-400"
      to="/refresh_token"
    >Refresh token</NuxtLink>
  </nav>
</template>

<script lang="ts">
import { getAccessToken, setAccessToken } from "~~/auth";

export default {
  setup() {

    const logout = () => {
      setAccessToken("")
    }
    return { getAccessToken, logout };
  },
};
</script>
