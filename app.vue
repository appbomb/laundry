<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Управление прачечной</h1>
    <div>
      <h2 class="text-lg font-semibold">Стиральная машина:</h2>
      <div v-for="machine in washingMachines" :key="machine.id" class="p-2 border-b">
        <span>Машина {{ machine.id }} - {{ machine.status }}</span>
        <button @click="toggleStatus(machine)" class="ml-2 bg-blue-500 text-white py-1 px-2 rounded">
          {{ machine.status === 'Свободна' ? 'Занята' : 'Свободна' }}
        </button>
      </div>
    </div>
    <div class="mt-4">
      <h2 class="text-lg font-semibold">Сушилка:</h2>
      <div v-for="machine in dryers" :key="machine.id" class="p-2 border-b">
        <span>Машина {{ machine.id }} - {{ machine.status }}</span>
        <button @click="toggleStatus(machine)" class="ml-2 bg-blue-500 text-white py-1 px-2 rounded">
          {{ machine.status === 'Свободна' ? 'Занята' : 'Свободна' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      washingMachines: Array.from({ length: 12 }, (_, i) => ({ id: i + 1, status: 'Свободна' })),
      dryers: Array.from({ length: 12 }, (_, i) => ({ id: i + 17, status: 'Свободна' })),
    };
  },
  methods: {
    toggleStatus(machine) {
      machine.status = machine.status === 'Свободна' ? 'Занята' : 'Свободна';
      this.updateMachineStatus(machine);
    },
    async updateMachineStatus(machine) {
      try {
        await fetch('http://localhost:3000/api/updateStatus', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: machine.id, status: machine.status }),
        });
      } catch (error) {
        console.error('Ошибка при обновлении статуса машины:', error);
      }
    },
  },
};
</script>

<style>
.container {
  max-width: 400px;
}
</style>