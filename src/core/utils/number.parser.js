export function parseNumber(value) {
  if (value === null || value === undefined) return null;

  if (typeof value === 'number') return value;

  const normalized = String(value)
    .trim()
    .replace(',', '.')
    .replace(/\s/g, '');

  if (normalized === '') return null;

  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : null;
}