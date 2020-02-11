import { shallowMount } from "@vue/test-utils";
import TableContainer from "../../src/components/TableContainer";
import { blocks } from "./blocks.fixtures";
import Vue from "vue";
import Vuetify from "vuetify";
Vue.use(Vuetify);
jest.mock("../../src/modules/fetch-most-recent-blocks");

describe("TableContainer.vue", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallowMount(TableContainer, {
      provide: {
        snackHandler: jest.fn(),
        successSnack: jest.fn(),
        errorSnack: jest.fn()
      }
    });
  });

  it("renders Load Most Recent 10 Blocks button on mount", async () => {
    expect(
      wrapper.text().includes("Load the most recent 10 blocks")
    ).toBeTruthy();
  });

  it("loads blocks when user clicks the button", async () => {
    const button = wrapper.find({ name: "v-btn" });
    button.vm.$emit("click");
    await Vue.nextTick();
    expect(wrapper.vm.mostRecentBlocks).toEqual(blocks);
  });

  it("renders loading message when loading", async () => {
    wrapper.setData({ loading: true, mostRecentBlocks: [] });
    await Vue.nextTick();
    expect(
      wrapper.text().includes("Please wait as we load the latest blocks...")
    ).toBeTruthy();
  });

  it("renders table and refresh button when blocks are loaded", async () => {
    wrapper.setData({ mostRecentBlocks: blocks, loading: false });
    await Vue.nextTick();
    expect(wrapper.text().includes("Most recent blocks")).toBeTruthy();
    expect(wrapper.text().includes("Refresh")).toBeTruthy();
  });

  it("renders Refreshing... button when blocks are already loaded, but in the process of loading new ones", async () => {
    wrapper.setData({ mostRecentBlocks: blocks, loading: true });
    await Vue.nextTick();
    expect(wrapper.text().includes("Most recent blocks")).toBeTruthy();
    expect(wrapper.text().includes("Refreshing...")).toBeTruthy();
  });
});
