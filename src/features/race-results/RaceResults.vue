<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import RaceResultItem from "./components/RaceResultItem.vue";
import type { RaceSchedule } from "../../store/modules/race";

const store = useStore();

const raceResults = computed<RaceSchedule>(
  () => store.getters["race/getRaceResults"]
);
</script>

<template>
  <div class="race-results" data-testid="race-results">
    <div class="race-results-header" data-testid="race-results-header">
      <h3>Race Results</h3>
    </div>

    <div class="race-results-content" data-testid="race-results-content">
      <div
        v-if="!raceResults || raceResults.rounds.length === 0"
        class="no-results"
        data-testid="no-results"
      >
        No race results available yet.
      </div>
      <template v-else>
        <RaceResultItem
          v-for="round in raceResults.rounds"
          :key="round.id"
          :round="round"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>
.race-results {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.race-results-header {
  background-color: #2ecc71;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.race-results-header h3 {
  font-size: 14px;
  font-weight: bold;
  color: white;
  margin: 0;
}

.race-results-content {
  padding: 8px;
  flex: 1;
  overflow-y: auto;
}

.no-results {
  padding: 20px;
  text-align: center;
  color: #666;
}
</style>
