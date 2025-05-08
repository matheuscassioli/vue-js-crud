<template>
    <form @submit.prevent="login" class="login-container">
        <h2>Login</h2>
        <p> usuário: {{ userForLogin }} senha: <strong>{{ passwordForLogin }}</strong></p>
        <input v-model="username" placeholder="Usuário" />
        <input v-model="password" type="password" placeholder="Senha" />
        <button ref="loginButton">Entrar</button>
    </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from '../helpers'

const username = ref('')
const password = ref('')
const router = useRouter()
const userForLogin = 'admin'
const passwordForLogin = '1234'
const loginButton = ref('')

const login = async () => {
    try {
        loginButton.value.innerText = 'Carregando...'
        if (username.value === 'admin' && password.value === '1234') {
            setTimeout(() => {
                localStorage.setItem('auth', 'true');
                router.push('/lista');
                loginButton.value.innerText = 'Entrar'
            }, 1500);
            return
        }
        loginButton.value.innerText = 'Entrar'
        throw new Error('Credenciais inválidas');
    } catch (error) {
        showToast(error.message, 'error');
    }
} 
</script>

<style scoped>
.login-container {
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: 100px auto;
    gap: 1rem;
}

input {
    padding: 8px;
    font-size: 1rem;
}

button {
    padding: 10px;
    font-weight: bold;
    background-color: #9810fa;
    color: white;
    border: none;
    cursor: pointer;
}
</style>