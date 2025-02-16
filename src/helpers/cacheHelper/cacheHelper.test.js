import { describe, it, expect } from "vitest";
import * as cacheHelper from "./cacheHelper";

describe("CacheHelper", () => {
  it("shouldClearCache returns false if no init timestamp is given", () => {
    const result = cacheHelper.shouldClearCache(null, 1);
    expect(result).toBeFalsy();
  });
  it("shouldClearCache returns false if time passed is less than time limit", () => {
    const result = cacheHelper.shouldClearCache(
      Date.now(),
      Number.POSITIVE_INFINITY
    );
    expect(result).toBeFalsy();
  });
  it("shouldClearCache returns true if time passed is greater than time limit", () => {
    const result = cacheHelper.shouldClearCache(Date.now(), 0);
    expect(result).toBeTruthy();
  });
});
