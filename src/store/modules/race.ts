import type { Module, ActionContext } from "vuex";
import type { Horse } from "./horses";

const roundDistances = [1200, 1400, 1600, 1800, 2000, 2200];

export interface RaceRound {
  id: number;
  horses: Horse[];
  distance: number;
  completed?: boolean;
}

export interface RaceSchedule {
  rounds: RaceRound[];
}

interface RaceState {
  raceSchedule: RaceSchedule;
  raceResults: RaceSchedule;
  raceInProgress: boolean;
  currentRound: number;
  raceProgress: number;
  isPaused: boolean;
}

interface RootState {
  horses?: {
    horses: Horse[];
  };
}

const race: Module<RaceState, RootState> = {
  namespaced: true,

  state: () => ({
    raceSchedule: {
      rounds: [],
    },
    raceResults: {
      rounds: [],
    },
    raceInProgress: false,
    currentRound: 0,
    raceProgress: 0,
    isPaused: false,
  }),

  getters: {
    getRaceSchedule: (state: RaceState) => state.raceSchedule,
    getRaceResults: (state: RaceState) => state.raceResults,
    getRaceInProgress: (state: RaceState) => state.raceInProgress,
    getCurrentRound: (state: RaceState) => state.currentRound,
    getRaceProgress: (state: RaceState) => state.raceProgress,
    getIsPaused: (state: RaceState) => state.isPaused,
    getCurrentRoundData: (state: RaceState) => {
      if (
        !state.raceSchedule.rounds ||
        state.raceSchedule.rounds.length === 0
      ) {
        return null;
      }
      return state.raceSchedule.rounds[state.currentRound];
    },
  },

  mutations: {
    SET_RACE_SCHEDULE(state: RaceState, raceSchedule: RaceSchedule) {
      state.raceSchedule = raceSchedule;
      state.currentRound = 0;
      state.raceProgress = 0;
    },
    SET_RACE_IN_PROGRESS(state: RaceState, inProgress: boolean) {
      state.raceInProgress = inProgress;
    },
    SET_CURRENT_ROUND(state: RaceState, round: number) {
      state.currentRound = round;
    },
    SET_RACE_PROGRESS(state: RaceState, progress: number) {
      state.raceProgress = progress;
    },
    SET_RACE_PAUSED(state: RaceState, isPaused: boolean) {
      state.isPaused = isPaused;
    },
    ADD_RACE_RESULT(state: RaceState, round: RaceRound) {
      state.raceResults.rounds.push({ ...round, completed: true });
    },
    RESET_RACE_RESULTS(state: RaceState) {
      state.raceResults.rounds = [];
    },
    RESET_RACE(state: RaceState) {
      state.raceInProgress = false;
      state.raceProgress = 0;
      state.isPaused = false;
    },
  },

  actions: {
    generateRaceSchedule({
      commit,
      rootState,
    }: ActionContext<RaceState, RootState>) {
      const horses = rootState.horses?.horses || [];
      if (horses.length === 0) {
        return;
      }

      const randomizeArray = <T>(array: T[]): T[] => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = newArray[i]!;
          newArray[i] = newArray[j]!;
          newArray[j] = temp;
        }
        return newArray;
      };

      const rounds: RaceRound[] = [];

      for (let i = 0; i < 6; i++) {
        const shuffledHorses = randomizeArray([...horses]);
        const selectedHorses = shuffledHorses.slice(0, 10);
        const distance = roundDistances[i] || 1200;

        rounds.push({
          id: i + 1,
          horses: selectedHorses,
          distance,
        });
      }

      const raceSchedule: RaceSchedule = {
        rounds,
      };

      commit("SET_RACE_SCHEDULE", raceSchedule);
      commit("RESET_RACE_RESULTS");
      commit("RESET_RACE");
    },

    startRace({ commit, state }: ActionContext<RaceState, RootState>) {
      if (state.raceSchedule.rounds.length === 0) return;

      commit("SET_RACE_IN_PROGRESS", true);
      commit("SET_RACE_PROGRESS", 0);
    },

    updateRaceProgress(
      { commit, state }: ActionContext<RaceState, RootState>,
      progress: number
    ) {
      commit("SET_RACE_PROGRESS", progress);

      if (progress >= 100) {
        commit("SET_RACE_IN_PROGRESS", false);
      }
    },

    saveRaceResult(
      { commit, state }: ActionContext<RaceState, RootState>,
      roundIndex?: number
    ) {
      const roundToSave =
        typeof roundIndex === "number" ? roundIndex : state.currentRound;

      if (roundToSave < state.raceSchedule.rounds.length) {
        const currentRound = state.raceSchedule.rounds[roundToSave];
        if (currentRound) {
          const sortedHorses = [...currentRound.horses].sort(
            (a, b) => b.condition - a.condition
          );

          const resultRound = {
            ...currentRound,
            horses: sortedHorses,
          };

          commit("ADD_RACE_RESULT", resultRound);
        }
      }
    },

    nextRound({ commit, state }: ActionContext<RaceState, RootState>) {
      if (state.currentRound < state.raceSchedule.rounds.length - 1) {
        commit("SET_CURRENT_ROUND", state.currentRound + 1);
        commit("SET_RACE_PROGRESS", 0);
      }
    },

    resetRace({ commit }: ActionContext<RaceState, RootState>) {
      commit("RESET_RACE");
      commit("SET_CURRENT_ROUND", 0);
      commit("RESET_RACE_RESULTS");
    },

    setPaused(
      { commit }: ActionContext<RaceState, RootState>,
      isPaused: boolean
    ) {
      commit("SET_RACE_PAUSED", isPaused);
    },
  },
};

export default race;
