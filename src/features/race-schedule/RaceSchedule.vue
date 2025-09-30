<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import RaceRoundItem from "./components/RaceRoundItem.vue";
import type { RaceSchedule } from "../../store/modules/race";

const store = useStore();

const raceSchedule = computed<RaceSchedule>(
  () => store.getters["race/getRaceSchedule"]
);
</script>

<template>
  <div class="race-schedule" data-testid="race-schedule">
    <div class="race-schedule-header" data-testid="race-schedule-header">
      <h3>Race Schedule</h3>
    </div>

    <div class="race-schedule-content" data-testid="race-schedule-content">
      <div
        v-if="raceSchedule.rounds.length === 0"
        class="no-schedule"
        data-testid="no-schedule"
      >
        Click the Generate button to create a schedule.
      </div>
      <template v-else>
        <RaceRoundItem
          v-for="round in raceSchedule.rounds"
          :key="round.id"
          :round="round"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>
.race-schedule {
  display: flex;
  flex-direction: column;
}

.race-schedule-header {
  background-color: #4f85ea;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.race-schedule-header h3 {
  font-size: 14px;
  font-weight: bold;
  color: white;
  margin: 0;
}

.race-schedule-content {
  padding: 8px;
}

.no-schedule {
  padding: 20px;
  text-align: center;
  color: #666;
}
</style>
