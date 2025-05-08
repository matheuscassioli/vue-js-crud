<template>
    <div class="user-container" @click="toggleDropdown">
        <span>A</span>

        <ul v-if="showDropdown" class="dropdown-menu">
            <li>Admin</li>

            <hr />

            <li>admin@admin.com</li>
            <li @click="logout">Sair</li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const showDropdown = ref(false)

function toggleDropdown() {
    showDropdown.value = !showDropdown.value
}

function logout() {
    localStorage.removeItem('auth')
    window.location.href = '/vue-js-crud/#/login'
}
</script>

<style scoped>
.user-container {
    position: absolute;
    right: 6px;
    top: 6px;
    border-radius: 50%;
    padding: 12px;
    background-color: #9810fa;
    justify-content: center;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 30px;
    height: 30px;
    font-weight: 600;
    color: white;
    cursor: pointer;
}

.dropdown-menu {
    position: absolute;
    top: 38px;
    right: 0;
    background: #4d4d4d;
    border-radius: 8px;
    box-shadow: 1px 1px 10px -4px white;
    list-style: none;
    padding: 8px 0;
    margin: 0;
    z-index: 999;
    min-width: 160px;
    right: 10px;
}

.dropdown-menu li {
    padding: 8px 16px;
    white-space: nowrap;
    cursor: pointer;
}

.dropdown-menu li:hover {
    transition: 0.3s;
    background-color: #f0f0f0;
    color: black;
}
</style>