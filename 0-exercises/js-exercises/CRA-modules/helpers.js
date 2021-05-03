function choice(items) {
  const idx = Math.floor(Math.random() * items.length);
  return items[idx];
}

function remove(items, item) {
  for (let i = 0; i < items.length; i++) {
    if (items[i] === item) {
      const removed = items[i];
      items.splice(i, 1);
      return removed;
    }
  }
}

export { choice, remove };
