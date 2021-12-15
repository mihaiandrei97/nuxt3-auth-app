import { ref, computed } from "vue";

const state = ref({ accessToken: "" });

function setAccessToken(accessToken: string) {
  state.value.accessToken = accessToken;
}

const getAccessToken = computed(() => state.value.accessToken);

export { setAccessToken, getAccessToken };
