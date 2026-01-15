  export const debounce = <F extends (...args: any[]) => void>(
    func: F,
    delay: number
  ) => {
    let debounceTimer: number;
    return function (this: any, ...args: Parameters<F>) {
      clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(() => func.apply(this, args), delay);
    };
  };