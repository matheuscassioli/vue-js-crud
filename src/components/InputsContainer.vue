<template>
    <div class="inputs-container">
        <form @submit.prevent="onSubmit">
            <input ref="inputField" :value="newTask" @input="$emit('update:newTask', $event.target.value)"
                placeholder="Digite uma tarefa" />
            <button v-tooltip="'Adicionar tarefa'" type="submit">
                <Plus :size="16" />
            </button>
        </form>

        <form class="form-search">
            <Search v-tooltip="'Filtrar'" :size="20" />
            <input :value="searchParam" @input="$emit('update:searchParam', $event.target.value)"
                placeholder="Filtrar" />
        </form>
    </div>
</template>

<script setup>
import { Plus, Search } from 'lucide-vue-next';


const props = defineProps({
    newTask: {
        type: String,
        required: true
    },
    searchParam: {
        type: String,
        required: true
    },
    inputField: {
        type: [Object, null],
        required: true
    }
});

const emit = defineEmits(['update:newTask', 'update:searchParam', 'handleSubmit']);

const onSubmit = () => {
    emit('handleSubmit');
};
</script>

<style scoped>
form {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
}

.form-search {
    display: flex;
    position: relative;
}

.form-search>svg {
    position: absolute;
    top: 7px;
    left: 10px;
}

.form-search input {
    padding-left: 40px;
}
</style>