// Deterministic hash → stable color per seed (used by Avatar + call sites).
const PALETTE = [
  "#5e6ad2",
  "#26a69a",
  "#e0a13a",
  "#e5598a",
  "#8b5cf6",
  "#27a644",
  "#4ea7fc",
  "#e0823d",
];

export function colorFor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return PALETTE[Math.abs(hash) % PALETTE.length];
}
