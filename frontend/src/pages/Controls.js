import { useEffect, useState } from "react";

export default function useControls() {
  const [keys, setKeys] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key.toLowerCase()) {
        case "w":
        case "arrowup":
          setKeys((k) => ({ ...k, forward: true }));
          break;
        case "s":
        case "arrowdown":
          setKeys((k) => ({ ...k, backward: true }));
          break;
        case "a":
        case "arrowleft":
          setKeys((k) => ({ ...k, left: true }));
          break;
        case "d":
        case "arrowright":
          setKeys((k) => ({ ...k, right: true }));
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (e) => {
      switch (e.key.toLowerCase()) {
        case "w":
        case "arrowup":
          setKeys((k) => ({ ...k, forward: false }));
          break;
        case "s":
        case "arrowdown":
          setKeys((k) => ({ ...k, backward: false }));
          break;
        case "a":
        case "arrowleft":
          setKeys((k) => ({ ...k, left: false }));
          break;
        case "d":
        case "arrowright":
          setKeys((k) => ({ ...k, right: false }));
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return keys;
}