import { Key } from './mac-layouts';

interface NavEntry {
  up: string | null;
  down: string | null;
  left: string | null;
  right: string | null;
}

export type NavigationGrid = Record<string, NavEntry>;

export function buildNavigationGrid(keys: Key[]): NavigationGrid {
  const rows: { y: number; keys: Key[] }[] = [];
  const ROW_TOLERANCE = 5;

  for (const key of keys) {
    let row = rows.find(r => Math.abs(r.y - key.y) <= ROW_TOLERANCE);
    if (!row) {
      row = { y: key.y, keys: [] };
      rows.push(row);
    }
    row.keys.push(key);
  }
  rows.sort((a, b) => a.y - b.y);
  for (const row of rows) {
    row.keys.sort((a, b) => a.x - b.x);
  }

  const grid: NavigationGrid = {};

  for (const key of keys) {
    const cx = key.x + key.width / 2;
    const cy = key.y + key.height / 2;

    const rowIdx = rows.findIndex(r => Math.abs(r.y - key.y) <= ROW_TOLERANCE);
    const row = rows[rowIdx];
    const colIdx = row.keys.indexOf(key);

    const left = colIdx > 0 ? row.keys[colIdx - 1].id : null;
    const right = colIdx < row.keys.length - 1 ? row.keys[colIdx + 1].id : null;

    let up: string | null = null;
    if (rowIdx > 0) {
      const aboveRow = rows[rowIdx - 1].keys;
      let bestDist = Infinity;
      for (const above of aboveRow) {
        const aboveCx = above.x + above.width / 2;
        const dist = Math.abs(aboveCx - cx);
        if (dist < bestDist) {
          bestDist = dist;
          up = above.id;
        }
      }
    }

    let down: string | null = null;
    if (rowIdx < rows.length - 1) {
      const belowRow = rows[rowIdx + 1].keys;
      let bestDist = Infinity;
      for (const below of belowRow) {
        const belowCx = below.x + below.width / 2;
        const dist = Math.abs(belowCx - cx);
        if (dist < bestDist) {
          bestDist = dist;
          down = below.id;
        }
      }
    }

    grid[key.id] = { up, down, left, right };
  }

  return grid;
}
