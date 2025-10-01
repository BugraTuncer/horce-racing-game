import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import HorseList from "../HorseList.vue";
import HorseListItem from "../components/HorseListItem.vue";
import type { Horse } from "../../../store/modules/horses";

const createMockStore = (horses: Horse[] = []) => {
  return createStore({
    modules: {
      horses: {
        namespaced: true,
        state: {
          horses,
        },
        getters: {
          getHorses: (state) => state.horses,
        },
        actions: {
          generateHorses: vi.fn(),
        },
      },
    },
  });
};

const mockHorses = [
  { id: 1, name: "Thunder", color: "#FF5733", condition: 85 },
  { id: 2, name: "Lightning", color: "#33FF57", condition: 92 },
  { id: 3, name: "Storm", color: "#3357FF", condition: 78 },
];

describe("HorseList.vue", () => {
  let store;

  beforeEach(() => {
    store = createMockStore(mockHorses);
  });

  it("renders the component with correct title", () => {
    const wrapper = mount(HorseList, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.find('[data-testid="horse-list"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="horse-list-header"]').text()).toContain(
      "Horse List (1-20)"
    );
  });

  it("renders the correct number of horse items", () => {
    const wrapper = mount(HorseList, {
      global: {
        plugins: [store],
      },
    });

    const horseItems = wrapper.findAllComponents(HorseListItem);
    expect(horseItems.length).toBe(mockHorses.length);
  });

  it("renders the table with correct headers", () => {
    const wrapper = mount(HorseList, {
      global: {
        plugins: [store],
      },
    });

    const headers = wrapper.findAll("th");
    expect(headers.length).toBe(3);
    expect(headers[0].text()).toBe("Name");
    expect(headers[1].text()).toBe("Condition");
    expect(headers[2].text()).toBe("Color");
  });

  it("displays the horse list content", () => {
    const wrapper = mount(HorseList, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.find('[data-testid="horse-list-content"]').exists()).toBe(
      true
    );
    expect(wrapper.find(".horse-table").exists()).toBe(true);
  });
});
