<script setup>
import Footer from './components/Footer.vue';
import TodoForm from './components/TodoForm.vue'

</script>

<template>

  <div class="application-container"> 

    <main class="main-container">
      <TodoForm />

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
