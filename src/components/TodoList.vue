  <template>
    <div class="form-container">

      <TitleContainer :deleteInBulk="deleteInBulk" :tasksDelete="tasksDelete" :filteredTasks="filteredTasks"
        :tasks="tasks" />

      <InputsContainer :newTask="newTask" :searchParam="searchParam" @update:newTask="newTask = $event"
        @update:searchParam="searchParam = $event" @handleSubmit="handleSubmit" />

      <div class="list-context-container">

        <div v-if="loadingTable" class="loader-table">
          <RingLoader color="#9810fa" />
        </div>

        <ul v-if="filteredTasks.length !== 0" class="list-container">
          <li v-for="(task, index) in filteredTasks" :key="index">
            <div class="task-item">
              <span>
                <input @change="(e) => constructArrDeleteTasks(e, task)" :checked="tasksDelete.includes(task.id)"
                  type="checkbox" />
              </span>
              {{ task.task }}
            </div>
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

<script setup>

import { ref, onMounted, computed } from 'vue';
import { Trash2 } from 'lucide-vue-next';
import { fillInErrorsInTheFields, showToast } from "../helpers.js";
import TitleContainer from './TitleContainer.vue';
import InputsContainer from './InputsContainer.vue';

import RingLoader from 'vue-spinner/src/RingLoader.vue'

const newTask = ref("");
const tasks = ref([]);
const tasksDelete = ref([]);
const searchParam = ref('')
const loadingTable = ref(false)

onMounted(() => {
  loadTasksFromLocalStorage();
});

const loadTasksFromLocalStorage = () => {
  const tasksSaveInLocalStorage = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.value = tasksSaveInLocalStorage;
};

const handleSubmit = () => {
  const captureNewTextField = document.querySelector('#add-task')

  captureNewTextField.classList.remove('danger')
  captureNewTextField.parentElement.nextElementSibling.innerHTML = ''

  const taskExists = tasks.value.some(task => task.task === newTask.value.trim());

  if (!newTask.value.trim()) {
    fillInErrorsInTheFields(captureNewTextField)
    return
  }

  if (taskExists) {
    showToast('Esse item já está na lista!', 'error');
    fillInErrorsInTheFields(captureNewTextField, false)
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


  setTimeout(() => {
    newTask.value = "";
    searchParam.value = "";
    loadTasksFromLocalStorage();
    showToast('Tarefa criada com sucesso!', 'success', 1500)
  }, 1000)

  loadingFakeFront()
}

const handleDelete = (id) => {
  const tasksInLocalStorage = JSON.parse(localStorage.getItem('tasks')) || [];
  const newTasks = tasksInLocalStorage.filter((task) => task.id !== id);
  localStorage.setItem('tasks', JSON.stringify(newTasks));
  loadTasksFromLocalStorage();
  loadingFakeFront()
  showToast('Tarefa deletada com sucesso!', 'success', 2000)
}

const loadingFakeFront = () => {
  loadingTable.value = true
  setTimeout(() => {
    loadingTable.value = false
  }, 1000)
}

const filteredTasks = computed(() => {
  return tasks.value.filter(task =>
    task.task.trim().toLowerCase().includes(searchParam.value.toLowerCase())
  )
})

const constructArrDeleteTasks = (e, task) => {
  const isChecked = e.target.checked;
  const idTask = task.id

  if (isChecked) {
    if (!tasksDelete.value.includes(idTask)) {
      tasksDelete.value.push(idTask)
      return
    }
  }
  tasksDelete.value = tasksDelete.value.filter(id => id !== idTask);
}

const deleteInBulk = () => { 
  const tasksToDelete = tasksDelete.value
  const tasksInLocalStorage = JSON.parse(localStorage.getItem('tasks'));
  const newTasks = tasksInLocalStorage.filter(task => !tasksToDelete.includes(task.id));
  localStorage.setItem('tasks', JSON.stringify(newTasks));
  loadTasksFromLocalStorage()
  tasksDelete.value = []
  const isSingularTasks = tasksToDelete.length > 1
  const message = `Tarefa${isSingularTasks ? 's' : ''} deletada${isSingularTasks ? 's' : ''} com sucesso!`
  showToast(message, 'success')
}

</script>

<style scoped>
.list-context-container {
  min-height: 350px;
  position: relative;
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
  border-bottom: 1px solid #333333;
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

.task-item {
  display: flex;
  gap: 10px;
}

.task-item input {
  width: 12px;
  cursor: pointer;
}


.loader-table {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #7c7c7c3b;
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
