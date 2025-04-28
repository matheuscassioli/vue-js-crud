<script setup>
import { Toaster } from 'vue-sonner';
import Footer from './components/Footer.vue';
import TodoList from './components/TodoList.vue';
 
</script>

<template>

  <div class="application-container">
    <Toaster position="top-center" />

    <main class="main-container">
      <TodoList />

    </main>

    <Footer />
  </div>

</template>

<style scoped>
.application-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}

.main-container {
  width: 60%;
}
</style>
