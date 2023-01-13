import { DEFAULT_DELAY_IN_MS } from 'constant';
import { useState, useEffect } from 'react';

const useDebounce = (value: string, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay || DEFAULT_DELAY_IN_MS);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
