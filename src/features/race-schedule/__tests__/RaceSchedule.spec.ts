import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import RaceSchedule from "../RaceSchedule.vue";
import RaceRoundItem from "../components/RaceRoundItem.vue";
import type {
  RaceRound,
  RaceSchedule as RaceScheduleType,
} from "../../../store/modules/race";
import type { Horse } from "../../../store/modules/horses";

const mockHorses: Horse[] = [
  { id: 1, name: "Thunder", color: "#FF5733", condition: 85 },
  { id: 2, name: "Lightning", color: "#33FF57", condition: 92 },
  { id: 3, name: "Storm", color: "#3357FF", condition: 78 },
  { id: 4, name: "Blizzard", color: "#8A33FF", condition: 88 },
];

const createMockRounds = (): RaceRound[] => {
  return [
    {
      id: 1,
      horses: mockHorses.slice(0, 3),
      distance: 1200,
    },
    {
      id: 2,
      horses: mockHorses.slice(1, 4),
      distance: 1400,
    },
  ];
};

const createMockStore = (hasSchedule: boolean = true) => {
  const raceSchedule: RaceScheduleType = {
    rounds: hasSchedule ? createMockRounds() : [],
  };

  return createStore({
    modules: {
      race: {
        namespaced: true,
        state: {
          raceSchedule,
          raceInProgress: false,
          currentRound: 0,
          raceProgress: 0,
          isPaused: false,
        },
        getters: {
          getRaceSchedule: (state) => state.raceSchedule,
        },
      },
    },
  });
};

describe("RaceSchedule.vue", () => {
  it("renders the component with correct title", () => {
    const store = createMockStore();
    const wrapper = mount(RaceSchedule, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.find('[data-testid="race-schedule"]').exists()).toBe(true);
    expect(
      wrapper.find('[data-testid="race-schedule-header"]').text()
    ).toContain("Race Schedule");
  });

  it("displays message when no schedule is available", () => {
    const store = createMockStore(false);
    const wrapper = mount(RaceSchedule, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.find('[data-testid="no-schedule"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="no-schedule"]').text()).toContain(
      "Click the Generate button to create a schedule."
    );
  });

  it("renders race rounds when schedule is available", () => {
    const store = createMockStore();
    const wrapper = mount(RaceSchedule, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.find('[data-testid="no-schedule"]').exists()).toBe(false);
    const raceRoundItems = wrapper.findAllComponents(RaceRoundItem);
    expect(raceRoundItems.length).toBe(2);
  });

  it("passes correct props to RaceRoundItem components", () => {
    const store = createMockStore();
    const wrapper = mount(RaceSchedule, {
      global: {
        plugins: [store],
      },
    });

    const raceRoundItems = wrapper.findAllComponents(RaceRoundItem);

    expect(raceRoundItems[0].props("round")).toEqual({
      id: 1,
      horses: mockHorses.slice(0, 3),
      distance: 1200,
    });

    expect(raceRoundItems[1].props("round")).toEqual({
      id: 2,
      horses: mockHorses.slice(1, 4),
      distance: 1400,
    });
  });
});
