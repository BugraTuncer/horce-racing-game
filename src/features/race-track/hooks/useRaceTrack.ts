import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import type { Horse } from "../../../store/modules/horses";

export function useRaceTrack() {
  const store = useStore();

  const raceStarted = ref(false);
  const raceFinished = ref(false);
  const raceInterval = ref<number | null>(null);
  const horsePositions = ref<Map<number, number>>(new Map());

  const isPaused = computed(() => store.getters["race/getIsPaused"]);
  const raceSchedule = computed(() => store.getters["race/getRaceSchedule"]);
  const currentRound = ref(0);

  const currentRoundData = computed(() => {
    if (!raceSchedule.value.rounds || raceSchedule.value.rounds.length === 0) {
      return null;
    }
    return raceSchedule.value.rounds[currentRound.value];
  });

  const horses = computed(() => {
    if (!currentRoundData.value) return [];
    return currentRoundData.value.horses;
  });

  const displayHorses = computed(() => {
    return horses.value;
  });

  watch(
    () => store.getters["race/getRaceInProgress"],
    (inProgress) => {
      if (inProgress && !raceStarted.value) {
        startRace();
      }
    }
  );

  watch(
    () => raceSchedule.value,
    () => {
      resetRace();
    },
    { deep: true }
  );

  const startRace = () => {
    if (raceStarted.value) return;

    resetRace();
    raceStarted.value = true;

    if (horses.value) {
      horses.value.forEach((horse: Horse) => {
        horsePositions.value.set(horse.id, 0);
      });
    }

    raceInterval.value = setInterval(() => {
      if (isPaused.value) return;
      const allFinished =
        horses.value &&
        horses.value.every(
          (horse: Horse) => (horsePositions.value.get(horse.id) ?? 0) >= 100
        );

      if (allFinished) {
        finishRace();
        return;
      }

      updateHorsePositions();
    }, 80);
  };

  const updateHorsePositions = () => {
    if (!horses.value) return;

    horses.value.forEach((horse: Horse) => {
      const baseSpeed = (horse.condition / 100) * 3;
      const minSpeed = 1.1;
      const speedFactor = Math.max(baseSpeed, minSpeed);

      horsePositions.value.set(
        horse.id,
        Math.min(100, (horsePositions.value.get(horse.id) ?? 0) + speedFactor)
      );
    });
  };

  const finishRace = () => {
    if (raceInterval.value) {
      clearInterval(raceInterval.value);
      raceInterval.value = null;
    }

    raceFinished.value = true;
    raceStarted.value = false;

    store.dispatch("race/saveRaceResult", currentRound.value);

    setTimeout(() => {
      if (currentRound.value < raceSchedule.value.rounds.length - 1) {
        currentRound.value += 1;
        startRace();
      }
    }, 1000);
  };

  const resetRace = () => {
    if (raceInterval.value) {
      clearInterval(raceInterval.value);
      raceInterval.value = null;
    }

    raceStarted.value = false;
    raceFinished.value = false;
    horsePositions.value = new Map();

    if (isPaused.value) {
      store.dispatch("race/setPaused", false);
    }
  };

  const getHorsePosition = (horse: Horse) => {
    const position = Math.min(87, horsePositions.value.get(horse.id) ?? 0);
    return `${position}%`;
  };

  const cleanup = () => {
    if (raceInterval.value) {
      clearInterval(raceInterval.value);
    }
  };

  return {
    currentRoundData,
    horses,
    displayHorses,
    getHorsePosition,
    cleanup,
  };
}
