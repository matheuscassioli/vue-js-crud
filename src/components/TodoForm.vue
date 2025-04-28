<script setup>

import { ref, onMounted, computed } from 'vue';
import { Trash2 } from 'lucide-vue-next';
import { exportExcel, exportPDF } from "../helpers.js";

const newTask = ref("");
const tasks = ref([]);
const searchParam = ref('')

onMounted(() => {
  loadTasksFromLocalStorage();
});

const loadTasksFromLocalStorage = () => {
  const tasksSaveInLocalStorage = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.value = tasksSaveInLocalStorage;
};

const handleSubmit = () => {
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
  searchParam.value = "";
}

const handleDelete = (id) => {
  const tasksInLocalStorage = JSON.parse(localStorage.getItem('tasks')) || [];
  const newTasks = tasksInLocalStorage.filter((task) => task.id !== id);
  localStorage.setItem('tasks', JSON.stringify(newTasks));
  loadTasksFromLocalStorage();
}

const filteredTasks = computed(() => {
  return tasks.value.filter(task =>
    task.task.trim().toLowerCase().includes(searchParam.value.toLowerCase())
  )
})


</script>

<template>
  <div class="form-container">


    <div class="title-container">
      <p>Gerencie suas tarefas</p>
      <div v-if="filteredTasks.length !== 0" class="exports-container">
        <button
          @click="exportExcel(tasks, `lsTarefa${filteredTasks.length > 1 ? 's' : ''}`, `Lista de tarefa${filteredTasks.length > 1 ? 's' : ''}`)">
          <v-icon name="vi-file-type-excel" />
        </button>
        <button @click="exportPDF(tasks)">
          <v-icon name="vi-file-type-pdf" />
        </button>
      </div>
    </div>

    <div class="inputs-container">
      <form @submit.prevent="handleSubmit">
        <input v-model="newTask" placeholder="Digite uma tarefa" />
        <button type="submit">Adicionar</button>
      </form>

      <form>
        <input v-model="searchParam" placeholder="Filtrar" />
      </form>
    </div>

    <div class="list-context-container">
      <ul v-if="filteredTasks.length !== 0" class="list-container">
        <li v-for="(task, index) in filteredTasks" :key="index">
          {{ task.task }}
          <button @click="handleDelete(task.id)">
            <Trash2 :size="16" />
          </button>
        </li>
      </ul>

      <div class="list-empty" v-else>
        Não há tarefas.
      </div>

    </div>
  </div>

</template>

<style scoped>
.list-context-container {
  min-height: 350px;
}

.list-container {
  display: flex;
  list-style-type: none;
  flex-direction: column;
  padding: 0;
  height: 350px;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  box-sizing: border-box;
  scrollbar-gutter: stable;
}

.list-container li {
  padding: 8px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-container>p {
  text-align: center;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 20px;
  padding: 1rem 0;
}

.list-container li button:hover {
  color: rgba(233, 64, 64, 0.69);
  transition: .3s;
}

.list-container::-webkit-scrollbar {
  width: 4px;
}

.list-container::-webkit-scrollbar-thumb {
  background-color: rgba(209, 209, 209, 0.2);
  border-radius: 10px;
}

.list-container::-webkit-scrollbar-track {
  background: transparent;
}

.list-empty {
  padding: 1rem;
  border-radius: 6px;
  background: gray
}

.exports-container {
  display: flex;
  justify-content: end;
  gap: 4px;
}

.exports-container button {
  height: auto;
  padding: 2px;
}

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
