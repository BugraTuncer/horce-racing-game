<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import HorseListItem from "./components/HorseListItem.vue";
import type { Horse } from "./components/HorseListItem.vue";

const store = useStore();

const horses = computed<Horse[]>(() => store.getters["horses/getHorses"]);

onMounted(() => {
  store.dispatch("horses/generateHorses");
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
