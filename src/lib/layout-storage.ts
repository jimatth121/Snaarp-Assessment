const hasWindow = typeof window !== "undefined";

export function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export function readStoredOrder(key: string) {
  if (!hasWindow) return null;

  try {
    const rawValue = window.localStorage.getItem(key);
    if (!rawValue) return null;

    const parsed = JSON.parse(rawValue);
    return Array.isArray(parsed) && parsed.every((item) => typeof item === "string") ? parsed : null;
  } catch {
    return null;
  }
}

export function saveStoredOrder<T extends { id: string }>(key: string, items: T[]) {
  if (!hasWindow) return;

  try {
    window.localStorage.setItem(key, JSON.stringify(items.map((item) => item.id)));
  } catch {
    // Ignore storage write failures so drag-and-drop still works.
  }
}

export function applyStoredOrder<T extends { id: string }>(items: T[], storedIds: string[] | null) {
  if (!storedIds?.length) return items;

  const itemMap = new Map(items.map((item) => [item.id, item]));
  const orderedItems = storedIds.map((id) => itemMap.get(id)).filter((item): item is T => Boolean(item));
  const missingItems = items.filter((item) => !storedIds.includes(item.id));

  return [...orderedItems, ...missingItems];
}
