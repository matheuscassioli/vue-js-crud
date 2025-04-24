<script setup>

import { ref, onMounted } from 'vue';
import { Trash2 } from 'lucide-vue-next';

const newTask = ref("");
const tasks = ref([]);

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

  // setTimeout(() => {
  //   document.querySelector('.list-container').classList.remove('opacity')
  // }, 1000)
}

const handleDelete = (id) => {
  const tasksInLocalStorage = JSON.parse(localStorage.getItem('tasks')) || [];
  const newTasks = tasksInLocalStorage.filter((task) => task.id !== id);
  localStorage.setItem('tasks', JSON.stringify(newTasks));
  loadTasksFromLocalStorage();
}

const handleSearch = () => {
  console.log('filtar')
}

</script>

<template>
  <div class="form-container">

    <p>Gerencie suas tarefas</p>

    <div class="inputs-container">

      <form @submit.prevent="handleSearch">
        <input placeholder="Filtrar" />
        <button type="submit">Filtrar</button>
        <button>Limpar</button>
      </form>

      <form @submit.prevent="handleSubmit">
        <input v-model="newTask" placeholder="Digite uma tarefa" />
        <button type="submit">Adicionar</button>
      </form>

    </div>

    <ul class="list-container">
      <li v-for="(task, index) in tasks" :key="index">{{ task.task }}
        <button @click="handleDelete(task.id)">
          <Trash2 :size="16" />
        </button>
      </li>

      <div class="list-empty" v-if="tasks.length === 0">
        Não há tarefas. Adicione uma!
      </div>
    </ul>

  </div>

</template>

<style scoped>
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

.form-container>p {
  text-align: center;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 20px;
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

.inputs-container {
  display: flex;
  justify-content: space-between;
}

.list-empty {
  padding: 1rem;
  border-radius: 6px;
  background: gray
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
