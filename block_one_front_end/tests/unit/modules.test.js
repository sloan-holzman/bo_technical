const getActionCount = require("../../src/modules/get-action-count");
const { blocks } = require("./blocks.fixtures");

jest.setTimeout(60 * 1000);

describe("Utils", () => {
  test("should correctly count the number of actions on a block", async () => {
    const actionCount = getActionCount(blocks[0]);
    expect(actionCount).toBe(102);
  });
});
