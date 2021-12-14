<template>
  <nav class="flex gap-4 items-center mb-10">
    <h1 class="text-2xl text-gray-800 font-bold tracking-wider">Nuxt3 Auth</h1>

    <!-- for all users -->
    <NuxtLink class="ml-auto text-gray-700 text-xl font-bold hover:text-gray-400" to="/">Home</NuxtLink>

    <!-- for logged in users -->

    <span>Logged in as ...</span>
    <button class="bg-teal-600 rounded-3xl px-4 py-2 text-slate-50" @click="logout">Logout</button>

    <!-- for logged out users -->
    <NuxtLink class="text-gray-700 text-xl font-bold hover:text-gray-400" to="/login">Login</NuxtLink>
    <NuxtLink class="text-gray-700 text-xl font-bold hover:text-gray-400" to="/signup">Signup</NuxtLink>
  </nav>
</template>

<script></script>
