<template>
  <div class="home">
    <div v-for="blog in blogs" :key="blog.id">
      <div class="border-t-2 border-t-gray-100 py-6">
        <h3 class="text-2xl text-teal-500 mb-6 font-bold">{{ blog.title }}</h3>
        <p class="text-xl text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          aspernatur consectetur doloremque sunt ducimus enim iure animi fugit
          nulla et! Perferendis autem deleniti quo eum corrupti reiciendis
          voluptatem ab ducimus?
        </p>
        <div class="text-xl mt-6 text-gray-500">
          <span>upvote or downvote this article: </span>
          <span class="cursor-pointer opacity-80 hover:opacity-100">👍</span>
          <span class="cursor-pointer opacity-80 hover:opacity-100">👎</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  setup() {
    const blogs = ref([
      { title: "Why Coffee is Better than Tea", id: 1 },
      { title: "...Then I Took an Arrow in the Knee", id: 2 },
      { title: "Mario vs Luigi, Ultimate Showdown", id: 3 },
    ]);
    

    return {
      blogs
    };
  },
};
</script>
