<script setup>
import { Plus } from 'lucide-vue-next';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    newTask: {
        type: String,
        required: true
    },
    searchParam: {
        type: String,
        required: true
    },
    handleSubmit: {
        type: Function,
        required: true
    },
    inputField: {
        type: Object,
        required: true
    }
});


const emit = defineEmits(['update:newTask', 'update:searchParam', 'handleSubmit']);

</script>

<template>
    <div class="inputs-container">
        <form @submit.prevent="$emit('handleSubmit')">
            <input ref="inputField" :value="newTask" @input="$emit('update:newTask', $event.target.value)"
                placeholder="Digite uma tarefa" />
            <button type="submit">
                <Plus :size="16" />
            </button>
        </form>

        <form>
            <input :value="searchParam" @input="$emit('update:searchParam', $event.target.value)"
                placeholder="Filtrar" />
        </form>
    </div>
</template>

<style scoped>
form {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
}
</style>