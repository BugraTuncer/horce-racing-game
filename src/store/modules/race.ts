import type { Module, ActionContext } from "vuex";
import type { Horse } from "../../features/horse-list/components/HorseListItem.vue";

const roundDistances = [1200, 1400, 1600, 1800, 2000, 2200];

export interface RaceRound {
  id: number;
  horses: Horse[];
  distance: number;
}

export interface RaceSchedule {
  rounds: RaceRound[];
}

interface RaceState {
  raceSchedule: RaceSchedule;
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
  }),

  getters: {
    getRaceSchedule: (state: RaceState) => state.raceSchedule,
  },

  mutations: {
    SET_RACE_SCHEDULE(state: RaceState, raceSchedule: RaceSchedule) {
      state.raceSchedule = raceSchedule;
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
        const selectedHorses = shuffledHorses.slice(0, 6);
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
    },
  },
};

export default race;
