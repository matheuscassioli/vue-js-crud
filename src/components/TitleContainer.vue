<script setup>
import { exportExcel, exportPDF } from "../helpers.js";
import { defineProps } from 'vue';

const props = defineProps({
    filteredTasks: {
        type: Array,
        required: true
    },
    tasks: {
        type: Array,
        required: true
    }
})
</script>


<template>
    <div class="title-container">
        <p>Gerencie suas tarefas</p>
        <div v-if="filteredTasks.length !== 0" class="exports-container">
            <button v-tooltip="'Exportar CSV'"
                @click="exportExcel(tasks, `Tarefa${filteredTasks.length > 1 ? 's' : ''}`, `Lista de tarefa${filteredTasks.length > 1 ? 's' : ''}`)">
                <v-icon name="vi-file-type-excel" />
            </button>
            <button v-tooltip="'Exportar PDF'"
                @click="exportPDF(tasks, `Tarefa${filteredTasks.length > 1 ? 's' : ''}`, `Lista de tarefa${filteredTasks.length > 1 ? 's' : ''}`)">
                <v-icon name="vi-file-type-pdf" />
            </button>
        </div>
    </div>

</template>

<style scoped>
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

.exports-container {
    display: flex;
    justify-content: end;
    gap: 4px;
}

.exports-container button {
    height: auto;
    padding: 2px;
}
</style>