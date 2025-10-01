// shared/units.ts
export const UNITS = [
  'g','kg','ml','dl','l','EL','TL','Stk','Bund','Zweig','Prise','n. B.'
] as const;

export type Unit = typeof UNITS[number];

// note: Set is constructed with `new`, and later we call `.has(...)`
export const UNIT_SET = new Set<string>(UNITS as readonly string[]);

export function isUnit(v: unknown): v is Unit {
  return typeof v === 'string' && UNIT_SET.has(v);
}

export function parseUnit(raw: string | null | undefined): Unit | undefined {
  return raw && UNIT_SET.has(raw) ? (raw as Unit) : undefined;
}
