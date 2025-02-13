const debounce = (fn: (arg: string) => void, ms: number): ((arg: string) => void) => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const debounced = (arg: string) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(arg);
    }, ms);
  };

  return debounced;
};

export default debounce;

