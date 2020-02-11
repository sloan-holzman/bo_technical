const fetchMostRecentBlocks = require("./fetch-most-recent-blocks");
const { blocks } = require("../block_one_front_end/tests/unit/blocks.fixtures");

jest.setTimeout(100 * 1000);

describe("fetchMostRecentBlocks", () => {
  test("should return ten blocks", async () => {
    const blocks = await fetchMostRecentBlocks(10);
    expect(blocks.length).toBe(10);
  });
});
