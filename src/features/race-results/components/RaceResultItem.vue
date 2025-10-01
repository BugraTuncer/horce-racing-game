<script setup lang="ts">
import type { RaceRound } from "../../../store/modules/race";

interface Props {
  round: RaceRound;
}

defineProps<Props>();
</script>

<template>
  <div class="race-result" data-testid="race-result">
    <div class="race-result-header" data-testid="race-result-header">
      <h4>Lap {{ round.id }} - {{ round.distance }} meters</h4>
    </div>
    <div class="race-result-horses" data-testid="race-result-horses">
      <div
        v-for="(horse, index) in round.horses"
        :key="horse.id"
        class="race-horse-result"
        data-testid="race-horse-result"
      >
        <span class="horse-position" data-testid="horse-position">{{
          index + 1
        }}</span>
        <span class="horse-name" data-testid="horse-name">{{
          horse.name
        }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.race-result {
  margin-bottom: 16px;
  border: 1px solid gray;
  border-radius: 4px;
  overflow: hidden;
}

.race-result-header {
  background-color: #27ae60;
  padding: 8px 16px;
  border-bottom: 1px solid #27ae60;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.race-result-header h4 {
  margin: 0;
  font-size: 14px;
}

.race-result-horses {
  padding: 8px;
}

.race-horse-result {
  display: flex;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid gray;
  gap: 16px;
}

.race-horse-result:last-child {
  border-bottom: none;
}

.horse-position {
  font-weight: bold;
  margin-right: 16px;
  min-width: 24px;
  color: #666;
  text-align: center;
}

.horse-name {
  flex-grow: 1;
  color: #666;
}
</style>
