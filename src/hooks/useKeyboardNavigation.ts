import { useState, useEffect, Key } from 'react';
const useKeyboardNavigation = (targetKey: string) => {
  const [keyPressed, setKeyPressed] = useState(false);

  function downHandler({ key }: { key: Key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  const upHandler = ({ key }: { key: Key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  });

  return keyPressed;
};

export default useKeyboardNavigation;
