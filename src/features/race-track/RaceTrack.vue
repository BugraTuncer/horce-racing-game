<script setup lang="ts">
import { onMounted } from "vue";
import type { Horse } from "../../store/modules/horses";
import { useRaceTrack } from "./hooks/useRaceTrack";
import HorseLane from "./components/HorseLane.vue";

const { currentRoundData, horses, displayHorses, getHorsePosition, cleanup } =
  useRaceTrack();

onMounted(() => {
  return cleanup;
});
</script>

<template>
  <div class="race-track-container" data-testid="race-track">
    <div class="race-track-header">
      <h3>Race Track</h3>
      <div v-if="currentRoundData" class="race-info">
        <span>Round {{ currentRoundData.id }}</span>
        <span>{{ currentRoundData.distance }}m</span>
      </div>
    </div>

    <div class="race-track" v-if="horses.length > 0">
      <HorseLane
        v-for="(horse, index) in displayHorses"
        :key="horse.id"
        :horse="horse"
        :position="getHorsePosition(horse)"
        :index="index"
      />
    </div>

    <div v-else class="no-race-message">Generate a race schedule to start</div>
  </div>
</template>

<style scoped>
.race-track-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.race-track-header {
  background-color: #3498db;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.race-track-header h3 {
  font-size: 14px;
  font-weight: bold;
  color: white;
  margin: 0;
}

.race-info {
  display: flex;
  gap: 16px;
  color: white;
  font-weight: bold;
}

.race-track {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 8px;
}

.no-race-message {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-style: italic;
}
</style>
