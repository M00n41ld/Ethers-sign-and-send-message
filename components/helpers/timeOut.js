export const handleTimeout = (callback, setIsVisible) => {
    setTimeout(() => {
      callback(null);
      setIsVisible(false);
    }, 4000);
  };