<script setup>
import { Toaster } from 'vue-sonner';
import Footer from './components/Footer.vue';
import TodoList from './components/TodoList.vue';
import { Clock } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';

const currentDate = ref('')

onMounted(() => {
  updateDate()
  setInterval(updateDate, 1000)
})

function updateDate() {
  const now = new Date();

  const newHour = now.toLocaleString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const formattedDate = newHour.replace(/:(?=[^:]*$)/, '<span class="highlight">:</span>');
  currentDate.value = formattedDate
}
</script>

<template>

  <div class="clock-box">
    <div class="clock-icon">
      <Clock :size="18" />
    </div>
    <div class="clock-text" v-html="currentDate"></div>
  </div>

  <div class="application-container">
    <Toaster position="top-center" />

    <main class="main-container">
      <TodoList />
    </main>

    <Footer />
  </div>

</template>

<style scoped>
.application-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}

.main-container {
  width: 60%;
}

.clock-box {
  position: absolute;
  min-width: 340px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 8px 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', sans-serif;
  color: #fff;
  width: fit-content;
  transition: box-shadow 0.2s ease;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 22px;
}

.clock-box:hover {
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
}

.clock-icon {
  margin-right: 10px;
  color: #9810fa;
  display: flex;
  align-items: center;
}

.clock-icon svg {
  animation: spin 5s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.clock-text {
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  animation: oscillate 1.5s infinite;
  transition: opacity 0.3s ease-in-out;
}

@keyframes oscillate {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.7;
  }

  100% {
    opacity: 1;
  }
}

@media screen and (max-width:768px) {
  .main-container {
    width: 90%;
  }

  .application-container {
    height: 95vh;
    justify-content: space-between;
  }
}
</style>
