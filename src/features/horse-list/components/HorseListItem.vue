<script setup lang="ts">
export type Horse = {
  id: number;
  name: string;
  color: string;
  condition: number;
};
interface Props {
  horse: Horse;
}

defineProps<Props>();
</script>

<template>
  <div class="horse-item" data-testid="horse-item">
    <div class="horse-number" data-testid="horse-number">{{ horse.id }} -</div>
    <div>
      <div class="horse-name" data-testid="horse-name">{{ horse.name }}</div>
      <div class="horse-details" data-testid="horse-details">
        {{ horse.condition }}

        <div class="horse-color-text" data-testid="horse-color-text">
          {{ horse.color }}
        </div>
        <div
          class="horse-color-indicator"
          data-testid="horse-color-indicator"
          :style="{ backgroundColor: horse.color || '#ccc' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.horse-item {
  display: flex;
  align-items: center;
  padding: 4px;
  gap: 8px;
  border-bottom: 1px solid #ffff;
}

.horse-number {
  text-align: center;
  font-weight: bold;
  color: white;
  margin-right: 8px;
}

.horse-name {
  font-weight: bold;
  font-size: 14px;
  text-align: left;
}

.horse-details {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 14px;
  color: gray;
}

.horse-color-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid #333;
}

.horse-color-text {
  font-size: 12px;
}
</style>
