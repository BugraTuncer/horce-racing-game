<script setup lang="ts">
import type { Horse } from "../../../store/modules/horses";
import HorseComponent from "./Horse.vue";

const props = defineProps<{
  horse: Horse;
  position: string;
  index: number;
}>();
</script>

<template>
  <div class="race-lane">
    <div class="lane-number">{{ props.index + 1 }}</div>
    <div class="lane-track">
      <HorseComponent :horse="horse" :position="position" />
    </div>
  </div>
</template>

<style scoped>
.race-lane {
  display: flex;
  align-items: center;
  height: 60px;
  margin-bottom: 8px;
  border-radius: 4px;
  background-color: #f9f9f9;
  overflow: hidden;
}

.lane-number {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: green;
  color: white;
  font-weight: bold;
  margin-left: 10px;
  margin-right: 10px;
}

.lane-track {
  flex: 1;
  height: 100%;
  position: relative;
  background-color: #f0f0f0;
  overflow: hidden;
}
</style>
