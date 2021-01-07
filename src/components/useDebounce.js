import { useState, useEffect } from 'react';

const useDebounce = (value) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    // Cleanup function
    return () => {
      clearTimeout(handler);
    };
  }, [value]);
  return debouncedValue;
};

export default useDebounce;
