<script setup>

import { ref, onMounted, computed } from 'vue';
import { Trash2 } from 'lucide-vue-next';
import { fillInErrorsInTheFields, showToast } from "../helpers.js";
import TitleContainer from './TitleContainer.vue';
import InputsContainer from './InputsContainer.vue';


const newTask = ref("");
const tasks = ref([]);
const searchParam = ref('')
const inputField = ref(null)

onMounted(() => {
  loadTasksFromLocalStorage();
});

const loadTasksFromLocalStorage = () => {
  const tasksSaveInLocalStorage = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.value = tasksSaveInLocalStorage;
};

const handleSubmit = () => {
  inputField.value.classList.remove('danger')

  if (newTask.value.trim() === "") {
    fillInErrorsInTheFields(inputField)
    return
  }

  const taskExists = tasks.value.some(task => task.task === newTask.value.trim());

  if (taskExists) {
    showToast('Esse item já está na lista!', 'error');
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
  showToast('Tarefa criada com sucesso!', 'success', 2000)
}

const handleDelete = (id) => {
  const tasksInLocalStorage = JSON.parse(localStorage.getItem('tasks')) || [];
  const newTasks = tasksInLocalStorage.filter((task) => task.id !== id);
  localStorage.setItem('tasks', JSON.stringify(newTasks));
  loadTasksFromLocalStorage();
  showToast('Tarefa deletada com sucesso!', 'success', 2000)
}

const filteredTasks = computed(() => {
  return tasks.value.filter(task =>
    task.task.trim().toLowerCase().includes(searchParam.value.toLowerCase())
  )
})

</script>

<template>
  <div class="form-container">

    <TitleContainer :filteredTasks="filteredTasks" :tasks="tasks" />

    <InputsContainer :newTask="newTask" :searchParam="searchParam" :handleSubmit="handleSubmit"
      :inputField="inputField" />

    <div class="list-context-container">
      <ul v-if="filteredTasks.length !== 0" class="list-container">
        <li v-for="(task, index) in filteredTasks" :key="index">
          {{ task.task }}
          <button @click="handleDelete(task.id)">
            <Trash2 :size="14" />
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

.list-container li button:hover {
  color: rgba(233, 64, 64, 0.69);
  transition: .3s;
}

.list-empty {
  padding: 1rem;
  border-radius: 6px;
  background: gray
}

/* SCROOLBAR LIST */
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
</style>
