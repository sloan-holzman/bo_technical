const fetchMostRecentBlocks = require("./fetch-most-recent-blocks");
const { blocks } = require("../block_one_front_end/tests/unit/blocks.fixtures");

jest.setTimeout(100 * 1000);

const state = {};

describe("fetchMostRecentBlocks", () => {
  beforeAll(async () => {
    state.blocks = await fetchMostRecentBlocks(10);
  });

  test("should return ten blocks", async () => {
    expect(state.blocks.length).toBe(10);
  });

  test("should return blocks in order", async () => {
    const numBlocks = state.blocks.length;
    expect(state.blocks.every((block, index) => {
      return index === numBlocks - 1 || block.block_num === (state.blocks[index + 1].block_num + 1);
    })).toBeTruthy();
  });

});
