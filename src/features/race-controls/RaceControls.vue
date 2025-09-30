<script setup lang="ts">
import { useStore } from "vuex";

const store = useStore();

const generateRaceSchedule = () => {
  store.dispatch("race/generateRaceSchedule");
};
</script>

<template>
  <div class="race-controls" data-testid="race-controls">
    <div class="race-controls-header" data-testid="race-controls-header">
      <h3>Race Controls</h3>
      <button
        @click="generateRaceSchedule"
        class="generate-button"
        data-testid="generate-button"
      >
        Generate
      </button>
    </div>
  </div>
</template>

<style scoped>
.race-controls {
  grid-column: 1 / -1;
  width: 100%;
}

.race-controls-header {
  background-color: #ec8e87;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.race-controls-header h3 {
  font-size: 14px;
  font-weight: bold;
  color: white;
  margin: 0;
}

.generate-button {
  background-color: white;
  color: #ec8e87;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.generate-button:hover {
  background-color: #ec8e87;
  color: white;
}
</style>
