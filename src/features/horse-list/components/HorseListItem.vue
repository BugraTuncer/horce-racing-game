<script setup lang="ts">
import type { Horse } from "../../../store/modules/horses";
interface Props {
  horse: Horse;
}

defineProps<Props>();
</script>

<template>
  <tr class="horse-item" data-testid="horse-item">
    <td class="horse-name" data-testid="horse-name">
      {{ horse.name }}
    </td>
    <td class="horse-condition" data-testid="horse-condition">
      {{ horse.condition }}
    </td>
    <td data-testid="horse-color">
      <div
        class="horse-color-indicator"
        data-testid="horse-color-indicator"
        :style="{ backgroundColor: horse.color || '#ccc' }"
      ></div>
    </td>
  </tr>
</template>

<style scoped>
.horse-item {
  border-bottom: 1px solid #ddd;
}

.horse-item:hover {
  background-color: #f9f9f9;
}

td {
  padding: 8px;
}

.horse-name {
  font-weight: bold;
  font-size: 14px;
  color: #333;
}

.horse-condition {
  text-align: center;
  font-weight: bold;
  color: #333;
}

.horse-color-indicator {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
</style>
