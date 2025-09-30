<script setup lang="ts">
import type { RaceRound } from "../../../store/modules/race";

interface Props {
  round: RaceRound;
}

defineProps<Props>();
</script>

<template>
  <div class="race-round" data-testid="race-round">
    <div class="race-round-header" data-testid="race-round-header">
      <h4>Lap {{ round.id }} - {{ round.distance }} meters</h4>
    </div>
    <div class="race-round-horses" data-testid="race-round-horses">
      <div
        v-for="(horse, index) in round.horses"
        :key="horse.id"
        class="race-horse-item"
        data-testid="race-horse-item"
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
.race-round {
  margin-bottom: 16px;
  border: 1px solid gray;
  border-radius: 4px;
  overflow: hidden;
}

.race-round-header {
  background-color: gray;
  padding: 8px 16px;
  border-bottom: 1px solid gray;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.race-round-header h4 {
  margin: 0;
  font-size: 14px;
}

.race-round-horses {
  padding: 8px;
}

.race-horse-item {
  display: flex;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid gray;
  gap: 16px;
}

.race-horse-item:last-child {
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
