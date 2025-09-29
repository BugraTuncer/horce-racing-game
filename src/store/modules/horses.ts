import type { Module, ActionContext } from "vuex";
import type { Horse } from "../../features/horse-list/components/HorseListItem.vue";

interface HorsesState {
  horses: Horse[];
  horseNames: string[];
  horseColors: string[];
}

interface RootState {}

const horseNames = [
  "Thunder",
  "Lightning",
  "Storm",
  "Wind",
  "Fire",
  "Ice",
  "Shadow",
  "Sun",
  "Moon",
  "Star",
  "Rainbow",
  "Zebra",
  "Unicorn",
  "Pegasus",
  "Phoenix",
  "Dragon",
  "Kraken",
  "Mermaid",
  "Siren",
  "Centaur",
];

const horseColors = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#F1C40F",
  "#9B59B6",
  "#1ABC9C",
  "#E67E22",
  "#E74C3C",
  "#2ECC71",
  "#3498DB",
  "#34495E",
  "#95A5A6",
  "#16A085",
  "#F39C12",
  "#D35400",
  "#C0392B",
  "#7F8C8D",
  "#8E44AD",
  "#27AE60",
  "#2980B9",
];

const horses: Module<HorsesState, RootState> = {
  namespaced: true,

  state: () => ({
    horses: [],
    horseNames,
    horseColors,
  }),

  getters: {
    getHorses: (state: HorsesState) => state.horses,
  },

  mutations: {
    SET_HORSES(state: HorsesState, horses: Horse[]) {
      state.horses = horses;
    },
  },

  actions: {
    generateHorses({ commit, state }: ActionContext<HorsesState, RootState>) {
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

      const names = randomizeArray([...state.horseNames]);
      const colors = randomizeArray([...state.horseColors]);

      const horses = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: names[i]!,
        color: colors[i]!,
        condition: Math.floor(Math.random() * 100) + 1,
      }));

      commit("SET_HORSES", horses);
    },
  },
};

export default horses;
