<script setup lang="ts">
import type { Horse } from "../../../store/modules/horses";

defineProps<{
  horse: Horse;
  position: string;
}>();
</script>

<template>
  <div
    class="horse-icon"
    :style="{
      left: position,
      backgroundColor: horse.color,
    }"
  >
    <span class="horse-emoji">🐎</span>
    <span class="horse-name-label">{{ horse.name }}</span>
  </div>
</template>

<style scoped>
.horse-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  min-width: 30px;
  height: 30px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  padding: 0 8px 0 0;
  transition: left 0.1s linear;
  z-index: 10;
}

.horse-emoji {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
}

.horse-name-label {
  font-size: 12px;
  font-weight: bold;
  color: white;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  white-space: nowrap;
  margin-left: 4px;
}

.finished {
  border: 2px solid gold;
  box-shadow: 0 0 5px gold;
}
</style>
