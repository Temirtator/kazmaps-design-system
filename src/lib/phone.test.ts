import { findRegion } from "../data/regions";
import {
  formatE164,
  formatNational,
  isComplete,
  isEmptyNational,
  isKazakhstanMobile,
  literalDigits,
  maskDigitCount,
  maskFor,
  normalizeNational,
  parseE164,
  toE164,
  GENERIC_MASK,
} from "./phone";

const KZ = findRegion("KZ")!;
const RU = findRegion("RU")!;
const UZ = findRegion("UZ")!;
const US = findRegion("US")!;

describe("mask helpers", () => {
  it("counts digits incl. literal ones", () => {
    expect(maskDigitCount(KZ.mask!)).toBe(10);
    expect(maskDigitCount(UZ.mask!)).toBe(9);
    expect(maskDigitCount(GENERIC_MASK)).toBe(15);
    expect(literalDigits(KZ.mask!)).toBe("7");
    expect(literalDigits(RU.mask!)).toBe("");
    expect(maskFor(US)).toBe(GENERIC_MASK);
  });
  it("treats template-only KZ value as empty", () => {
    expect(isEmptyNational(KZ, "")).toBe(true);
    expect(isEmptyNational(KZ, "7")).toBe(true);
    expect(isEmptyNational(KZ, "70")).toBe(false);
    expect(isEmptyNational(US, "")).toBe(true);
  });
  it("completeness: masked regions by slot count, generic by E.164 length", () => {
    expect(isComplete(KZ, "7012345678")).toBe(true);
    expect(isComplete(KZ, "701234567")).toBe(false);
    expect(isComplete(US, "2125551234")).toBe(true);
    expect(isComplete(US, "212555")).toBe(false);
    expect(isComplete(US, "212555123456789")).toBe(false);
  });
});

describe("E.164", () => {
  it("toE164 only when complete", () => {
    expect(toE164(KZ, "7012345678")).toBe("+77012345678");
    expect(toE164(KZ, "70123")).toBe("");
    expect(toE164(UZ, "901234567")).toBe("+998901234567");
  });
  it("parseE164 picks longest dial and splits +7 by first national digit", () => {
    expect(parseE164("+77012345678")).toEqual({ region: KZ, national: "7012345678" });
    expect(parseE164("+79161234567")).toEqual({ region: RU, national: "9161234567" });
    expect(parseE164("+998 90 123-45-67")).toEqual({ region: UZ, national: "901234567" });
    expect(parseE164("+12125551234")?.region.iso).toBe("US");
    expect(parseE164("")).toBeNull();
    expect(parseE164("7012345678")).toBeNull();
  });
  it("formatNational applies the mask without trailing placeholders", () => {
    expect(formatNational(KZ, "")).toBe("");
    expect(formatNational(KZ, "70")).toBe("(70");
    expect(formatNational(KZ, "7012345678")).toBe("(701) 234-56-78");
    expect(formatNational(KZ, "0123456789")).toBe("(701) 234-56-78");
    expect(formatNational(US, "2125551234")).toBe("212 555 123 4");
  });
  it("formatE164 for labels", () => {
    expect(formatE164("+77012345678")).toBe("+7 701 234-56-78");
    expect(formatE164("+998901234567")).toBe("+998 90 123-45-67");
    expect(formatE164("+12125551234")).toBe("+1 212 555 123 4");
    expect(formatE164("garbage")).toBe("garbage");
  });
  it("isKazakhstanMobile follows the identity operator whitelist", () => {
    expect(isKazakhstanMobile("+77012345678")).toBe(true);
    expect(isKazakhstanMobile("+77772345678")).toBe(true);
    expect(isKazakhstanMobile("+77172345678")).toBe(false);
    expect(isKazakhstanMobile("+79161234567")).toBe(false);
    expect(isKazakhstanMobile("+7 701 234-56-78")).toBe(true);
  });
});

describe("normalizeNational", () => {
  it("drops a leading 8 or 7 when +7 national would exceed 10 digits", () => {
    expect(normalizeNational("87012345678", KZ)).toEqual({ region: KZ, national: "7012345678" });
    expect(normalizeNational("77012345678", KZ)).toEqual({ region: KZ, national: "7012345678" });
    expect(normalizeNational("7012345678", KZ)).toEqual({ region: KZ, national: "7012345678" });
    expect(normalizeNational("70", KZ)).toEqual({ region: KZ, national: "70" });
  });
  it("strips the region's own dial prefix when input starts with +", () => {
    expect(normalizeNational("+7 701 234 56 78", KZ)).toEqual({
      region: KZ,
      national: "7012345678",
    });
    expect(normalizeNational("+998 90 123 45 67", UZ)).toEqual({
      region: UZ,
      national: "901234567",
    });
  });
  it("switches region when a foreign + dial is pasted", () => {
    expect(normalizeNational("+998901234567", KZ)).toEqual({ region: UZ, national: "901234567" });
    expect(normalizeNational("+79161234567", KZ)).toEqual({ region: RU, national: "9161234567" });
    expect(normalizeNational("+77012345678", RU)).toEqual({ region: KZ, national: "7012345678" });
  });
  it("caps national at the mask capacity", () => {
    expect(normalizeNational("701234567890", KZ).national).toBe("7012345678");
    expect(normalizeNational("2125551234567890", US).national).toBe("212555123456789");
  });
});
