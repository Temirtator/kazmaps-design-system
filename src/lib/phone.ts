import { findRegion, REGIONS, type Region } from "../data/regions";

export const GENERIC_MASK = "999 999 999 999 999";
export const E164_MIN_DIGITS = 8;
export const E164_MAX_DIGITS = 15;

const KZ_MOBILE_CODES = new Set([
  "700",
  "701",
  "702",
  "705",
  "706",
  "707",
  "708",
  "747",
  "750",
  "751",
  "760",
  "761",
  "762",
  "763",
  "764",
  "771",
  "775",
  "776",
  "777",
  "778",
]);

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

export function maskFor(region: Region): string {
  return region.mask ?? GENERIC_MASK;
}

export function maskDigitCount(mask: string): number {
  return digitsOnly(mask).length;
}

export function literalDigits(mask: string): string {
  return mask.replace(/[^0-8]/g, "");
}

export function isEmptyNational(region: Region, national: string): boolean {
  return national === "" || national === literalDigits(maskFor(region));
}

export function isComplete(region: Region, national: string): boolean {
  if (region.mask) return national.length === maskDigitCount(region.mask);
  const total = region.dial.length + national.length;
  return total >= E164_MIN_DIGITS && total <= E164_MAX_DIGITS;
}

export function toE164(region: Region, national: string): string {
  return isComplete(region, national) ? `+${region.dial}${national}` : "";
}

function regionForPlusSeven(national: string): Region {
  const first = national[0];
  const iso = first === "6" || first === "7" ? "KZ" : "RU";
  return findRegion(iso)!;
}

const REGIONS_BY_DIAL_LENGTH_DESC = [...REGIONS].sort((a, b) => b.dial.length - a.dial.length);

export function parseE164(value: string): { region: Region; national: string } | null {
  const trimmed = value.trim();
  if (!trimmed.startsWith("+")) return null;
  const digits = digitsOnly(trimmed);
  if (digits.length < E164_MIN_DIGITS) return null;
  const match = REGIONS_BY_DIAL_LENGTH_DESC.find((r) => digits.startsWith(r.dial));
  if (!match) return null;
  const national = digits.slice(match.dial.length);
  const region =
    match.dial === "7"
      ? regionForPlusSeven(national)
      : match.dial === "1"
        ? findRegion("US")!
        : match;
  return { region, national };
}

export function formatNational(region: Region, national: string): string {
  const mask = maskFor(region);
  let out = "";
  let i = 0;
  for (const ch of mask) {
    if (i >= national.length) break;
    if (ch === "9") {
      out += national[i++];
    } else if (/[0-8]/.test(ch)) {
      if (national[i] === ch) i++;
      out += ch;
    } else {
      out += ch;
    }
  }
  return out.replace(/[\s\-(]+$/, "");
}

export function formatE164(value: string): string {
  const parsed = parseE164(value);
  if (!parsed) return value;
  const { region, national } = parsed;
  const body = region.mask
    ? formatNational(region, national).replace(/[()]/g, "")
    : formatNational(region, national);
  return `+${region.dial} ${body}`;
}

export function isKazakhstanMobile(value: string): boolean {
  const digits = digitsOnly(value);
  return digits.length === 11 && digits.startsWith("77") && KZ_MOBILE_CODES.has(digits.slice(1, 4));
}

function capacity(region: Region): number {
  return region.mask ? maskDigitCount(region.mask) : E164_MAX_DIGITS - region.dial.length;
}

export function normalizeNational(
  raw: string,
  region: Region,
): { region: Region; national: string } {
  const trimmed = raw.trim();
  if (trimmed.startsWith("+")) {
    const parsed = parseE164(trimmed);
    if (parsed) {
      return { region: parsed.region, national: parsed.national.slice(0, capacity(parsed.region)) };
    }
    const digits = digitsOnly(trimmed);
    const stripped = digits.startsWith(region.dial) ? digits.slice(region.dial.length) : digits;
    return { region, national: stripped.slice(0, capacity(region)) };
  }
  let digits = digitsOnly(trimmed);
  const cap = capacity(region);
  if (
    region.dial === "7" &&
    digits.length === cap + 1 &&
    (digits.startsWith("8") || digits.startsWith("7"))
  ) {
    digits = digits.slice(1);
  }
  return { region, national: digits.slice(0, cap) };
}
