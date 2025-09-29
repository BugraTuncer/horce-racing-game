<script setup lang="ts">
import { ref, onMounted } from "vue";
import HorseListItem from "./components/HorseListItem.vue";
import type { Horse } from "./components/HorseListItem.vue";

const horseNames = [
  "Thunder",
  "Lightning",
  "Storm",
  "Wind",
  "Fire",
  "Ice",
  "Shadow",
  "Sun",
  "Moon",
  "Star",
  "Rainbow",
  "Zebra",
  "Unicorn",
  "Pegasus",
  "Phoenix",
  "Dragon",
  "Kraken",
  "Mermaid",
  "Siren",
  "Centaur",
];
const horseColors = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#F1C40F",
  "#9B59B6",
  "#1ABC9C",
  "#E67E22",
  "#E74C3C",
  "#2ECC71",
  "#3498DB",
  "#34495E",
  "#95A5A6",
  "#16A085",
  "#F39C12",
  "#D35400",
  "#C0392B",
  "#7F8C8D",
  "#8E44AD",
  "#27AE60",
  "#2980B9",
];

const randomizeArray = <T>(array: T[]): T[] => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i]!;
    array[i] = array[j]!;
    array[j] = temp;
  }
  return array;
};

const generateHorses = (): Horse[] => {
  const names = randomizeArray(horseNames);
  const colors = randomizeArray(horseColors);

  return Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: names[i]!,
    color: colors[i]!,
    condition: Math.floor(Math.random() * 100) + 1,
  }));
};

const horses = ref<Horse[]>([]);

onMounted(() => {
  horses.value = generateHorses();
});
</script>

<template>
  <div class="horse-list" data-testid="horse-list">
    <div class="horse-list-header" data-testid="horse-list-header">
      <h3>Horse List (1-20)</h3>
    </div>

    <div class="horse-list-content" data-testid="horse-list-content">
      <HorseListItem v-for="horse in horses" :key="horse.id" :horse="horse" />
    </div>
  </div>
</template>

<style scoped>
.horse-list {
  display: flex;
  flex-direction: column;
}

.horse-list-header {
  background-color: darkgoldenrod;
  padding: 16px;
}

.horse-list-header h3 {
  font-size: 14px;
  font-weight: bold;
}

.horse-list-content {
  padding: 8px;
}
</style>
