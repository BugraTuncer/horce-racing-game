<script setup lang="ts">
import HorseList from "./features/horse-list/HorseList.vue";
import RaceSchedule from "./features/race-schedule/RaceSchedule.vue";
import RaceControls from "./features/race-controls/RaceControls.vue";
import RaceTrack from "./features/race-track/RaceTrack.vue";
</script>

<template>
  <div class="app-container">
    <RaceControls />
    <div class="main-container">
      <HorseList />
      <RaceTrack />
      <RaceSchedule />
    </div>
  </div>
</template>

<style scoped>
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
}
.main-container {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1.75fr 1.25fr;
  gap: 2px;
}
</style>
