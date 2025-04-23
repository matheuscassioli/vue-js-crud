<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="newTask" placeholder="Digite uma tarefa" />
    <button type="submit">Adicionar</button> 
  </form>

  <ul>
    <li v-for="(task, index) in tasks" :key="index">{{ task }}</li>
  </ul>

</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["add-task"]);
const newTask = ref("");
const tasks = ref([])  

function addTask(task) {
  tasks.value.push(task) 
} 

function handleSubmit() {
  if (newTask.value.trim() === "") return; 
  tasks.value.push(newTask.value);          
  newTask.value = "";                      
}

</script>

<style scoped>
form {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
input {
  flex: 1;
  padding: 8px;
}
button {
  padding: 8px 12px;
}
</style>
