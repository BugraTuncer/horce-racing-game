<script setup lang="ts">
import type { Horse } from "../../../store/modules/horses";
import HorseComponent from "./Horse.vue";

defineProps<{
  horse: Horse;
  position: string;
}>();
</script>

<template>
  <div class="race-lane">
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

.lane-track {
  flex: 1;
  height: 100%;
  position: relative;
  background-color: #f0f0f0;
  border-left: 1px dashed #ccc;
  overflow: hidden;
}

.lane-track::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 5px;
  height: 100%;
  background-color: #000;
  background: repeating-linear-gradient(
    45deg,
    #000,
    #000 10px,
    #fff 10px,
    #fff 20px
  );
}
</style>
