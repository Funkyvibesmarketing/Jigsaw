// Live section scroll progress, shared outside React so per-frame animations can follow
// scrolling without re-rendering the whole page every frame.
type Listener = (progress: number) => void;

function createProgressStore() {
  let value = 0;
  const listeners = new Set<Listener>();
  return {
    get: () => value,
    set(progress: number) {
      if (progress === value) return;
      value = progress;
      listeners.forEach((l) => l(progress));
    },
    subscribe(listener: Listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

export const reviewsProgress = createProgressStore();
export const processProgress = createProgressStore();
export const contactProgress = createProgressStore();
