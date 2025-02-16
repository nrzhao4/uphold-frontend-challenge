import { describe, it, expect } from "vitest";
import * as exchangeRatesHelper from "./exchangeRatesHelper";

const mockSupportedCurrencies = [
  {
    id: "foo",
    name: "foo",
  },
  {
    id: "bar",
    name: "bar",
  },
];

describe("ExchangeRatesHelper", () => {
  describe("getPairs", () => {
    it("should return correct pairs", () => {
      const result = exchangeRatesHelper.getPairs(
        "foo",
        mockSupportedCurrencies
      );
      expect(result).toEqual({
        foobar: null,
      });
    });
  });
  describe("handleTickersResult", () => {
    it("should return {} if no pairs or rates are given", () => {
      const result = exchangeRatesHelper.handleTickersResult();
      expect(result).toEqual({});
    });
    it("should return pairs with correct rates", () => {
      const mockRates = [
        { pair: "foobar", bid: 123, currency: "bar" },
        { pair: "foobar2", bid: 456, currency: "bar2" },
      ];
      const mockPairs = { foobar: null };
      const result = exchangeRatesHelper.handleTickersResult(
        mockPairs,
        mockRates
      );
      expect(result).toEqual({
        foobar: {
          bid: 123,
          currency: "bar",
        },
      });
    });
  });
  describe("adjustAmountPrecision", () => {
    it("should return entire string if integer part is less than limit and string is shorter than substring length", () => {
      const amount = 12345;
      const result = exchangeRatesHelper.adjustAmountPrecision(amount);
      expect(result).toEqual("12345");
    });
    it("should return substring if integer part is less than limit and string is longer than substring length", () => {
      const amount = 12345.6789;
      const result = exchangeRatesHelper.adjustAmountPrecision(amount);
      expect(result).toEqual("12345.67");
    });
    it("should return two decimal points if integer part is greater than limit", () => {
      const amount = 1234567.89012;
      const result = exchangeRatesHelper.adjustAmountPrecision(amount);
      expect(result).toEqual("1234567.89");
    });
    it("should return integer if integer part is greater than limit and has no decimals", () => {
      const amount = 12345678;
      const result = exchangeRatesHelper.adjustAmountPrecision(amount);
      expect(result).toEqual("12345678");
    });
  });
});
