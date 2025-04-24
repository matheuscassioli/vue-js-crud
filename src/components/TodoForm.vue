<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="newTask" placeholder="Digite uma tarefa" />
    <button type="submit">Adicionar</button>
  </form>

  <ul>
    <li v-for="(task, index) in tasks" :key="index">{{ task.task }}
      <button @click="(e) => handleDelete(index)">deletar</button>
    </li>
  </ul>

  <p v-if="tasks.length === 0">Não há tarefas. Adicione uma!</p>

</template>

<script setup>
import { ref, onMounted } from 'vue';

const newTask = ref("");
const tasks = ref([]);

onMounted(() => {
  loadTasksFromLocalStorage();
});

const loadTasksFromLocalStorage = () => {
  const tasksSaveInLocalStorage = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.value = tasksSaveInLocalStorage;
};

function handleSubmit() {
  if (newTask.value.trim() === "") return;

  const taskExists = tasks.value.some(task => task.task === newTask.value.trim());

  if (taskExists) {
    alert('Esse item já está na lista!');
    return;
  }

  const newId = tasks.value.length ? tasks.value[tasks.value.length - 1].id + 1 : 0;

  const newTaskObj = {
    id: newId,
    task: newTask.value,
  };

  const tasksInLocalStorage = JSON.parse(localStorage.getItem('tasks')) || [];
  tasksInLocalStorage.push(newTaskObj);
  localStorage.setItem('tasks', JSON.stringify(tasksInLocalStorage));
  loadTasksFromLocalStorage();
  newTask.value = "";
}

const handleDelete = (id) => {
  const tasksInLocalStorage = JSON.parse(localStorage.getItem('tasks')) || [];
  const newTasks = tasksInLocalStorage.filter((task) => task.id !== id);
  console.log(newTasks)
  localStorage.setItem('tasks', JSON.stringify(newTasks));
  loadTasksFromLocalStorage();
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
