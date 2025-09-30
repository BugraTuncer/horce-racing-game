<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import HorseListItem from "./components/HorseListItem.vue";
import type { Horse } from "../../store/modules/horses";

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
      <table class="horse-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Condition</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          <HorseListItem
            v-for="horse in horses"
            :key="horse.id"
            :horse="horse"
          />
        </tbody>
      </table>
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

.horse-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}

.horse-table th {
  background-color: #f2f2f2;
  color: #333;
  font-weight: bold;
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.horse-table th:first-child {
  border-top-left-radius: 4px;
}

.horse-table th:last-child {
  border-top-right-radius: 4px;
}
</style>
