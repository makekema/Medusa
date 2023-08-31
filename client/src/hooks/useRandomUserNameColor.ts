import { useEffect, useState } from "react";
import { getRandomColor } from "../utils";

export default function useRandomUserNameColor (username: string) {
  const [colorMap, setColorMap] = useState<Map<string, string>>(new Map());
  const [color, ] = useState(
    '#' + ((Math.random() * 0xffffff) << 0).toString(16)
  );

  useEffect(() => {
    setColorMap((prevColorMap) => {
      return prevColorMap.set(username, getRandomColor());
    });
  }, [username, color]);

  function getColor (username: string) {
    if (!colorMap.get(username)) {
      setColorMap((prevColorMap) => {
        return prevColorMap.set(username, getRandomColor());
      });
    }
    return colorMap.get(username);
  }

  return { getColor };
}