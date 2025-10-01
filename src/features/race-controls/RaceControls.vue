<script setup lang="ts">
import { useStore } from "vuex";
import { computed, ref } from "vue";

const store = useStore();
const isPaused = ref(false);

const raceInProgress = computed(() => store.getters["race/getRaceInProgress"]);
const raceSchedule = computed(() => store.getters["race/getRaceSchedule"]);
const hasRaceSchedule = computed(
  () =>
    raceSchedule.value &&
    raceSchedule.value.rounds &&
    raceSchedule.value.rounds.length > 0
);

const generateRaceSchedule = () => {
  store.dispatch("race/generateRaceSchedule");
};

const startRace = () => {
  store.dispatch("race/startRace");
  isPaused.value = false;
};

const pauseResumeRace = () => {
  isPaused.value = !isPaused.value;
  store.dispatch("race/setPaused", isPaused.value);
};
</script>

<template>
  <div class="race-controls" data-testid="race-controls">
    <div class="race-controls-header" data-testid="race-controls-header">
      <h3>Horse Racing</h3>
      <div class="race-buttons">
        <button
          @click="generateRaceSchedule"
          class="generate-button"
          data-testid="generate-button"
          :disabled="hasRaceSchedule"
        >
          Generate
        </button>
        <button
          v-if="hasRaceSchedule && !raceInProgress"
          @click="startRace"
          class="start-button"
          data-testid="start-button"
        >
          Start Race
        </button>
        <button
          v-if="raceInProgress"
          @click="pauseResumeRace"
          :class="isPaused ? 'resume-button' : 'pause-button'"
          data-testid="pause-resume-button"
        >
          {{ isPaused ? "Resume Race" : "Pause Race" }}
        </button>
      </div>
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

.race-buttons {
  display: flex;
  gap: 8px;
}

.start-button {
  background-color: white;
  color: #4caf50;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.start-button:hover {
  background-color: #4caf50;
  color: white;
}

.pause-button {
  background-color: white;
  color: #f44336;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.pause-button:hover {
  background-color: #f44336;
  color: white;
}

.resume-button {
  background-color: white;
  color: #2196f3;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.resume-button:hover {
  background-color: #2196f3;
  color: white;
}

.generate-button:disabled {
  background-color: #cccccc;
  color: #666666;
  cursor: not-allowed;
}

.generate-button:disabled:hover {
  background-color: #cccccc;
  color: #666666;
}
</style>
