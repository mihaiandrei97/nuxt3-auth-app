<template>
  <div class="home">
      <div class="border-t-2 border-t-gray-100 py-6">
        <h3 class="text-2xl text-teal-500 mb-6 font-bold">Tokens</h3>

        <p v-if="!getAccessToken" class="text-xl text-gray-500">
          You are not logged in.
        </p>
        <p v-if="getAccessToken" class="text-xl text-gray-500 break-all">
          You are logged in with access token: {{getAccessToken}}
        </p>

      </div>
    </div>
</template>

<script lang="ts">
import { getAccessToken } from "~~/auth";


export default {
  setup() {
    return {getAccessToken}
  },
};
</script>
