<template>
  <div>
    <button
      class="py-4 px-8 bg-teal-600 rounded-2xl text-gray-100"
      @click="submit"
    >
      Refresh token
    </button>
    <p v-if="error" class="p-4 text-2xl text-red-700">{{error}}</p>
    <p v-if="success" class="p-4 text-2xl text-green-700">{{success}}</p>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { setAccessToken } from "~~/auth";
import { ref } from "vue"
export default {
  setup() {
    const error = ref("")
    const success = ref("")

    const submit = async () => {
      try {
        error.value = ""
        const response = await axios.post("/server-api/v1/auth/refresh_token");
        const { data } = response
        console.log(data.accessToken);
        setAccessToken(data.accessToken);
        success.value = "Access token generated. Go to / to see the token."
      } catch (err) {
        error.value = err.response.data.message || err.message;
        setAccessToken("")
        console.log(err);
      }
    };

    return { submit, error , success};
  },
};
</script>
