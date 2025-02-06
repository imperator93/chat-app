import { useEffect, useState } from "react";

export const UserLoadingComponent = () => {
  const base = "Fetching users...";

  const [loadingAnim, setLoadingAnim] = useState<{
    toBeSliced: string;
    direction: boolean;
    iterator: number;
  }>({
    toBeSliced: "Loading...",
    direction: true,
    iterator: 1,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingAnim((prev) => ({
        ...prev,
        toBeSliced: base.slice(0, prev.iterator),
        iterator: prev.toBeSliced.length != base.length ? prev.iterator++ : 0,
      }));
    }, 50);

    return () => clearTimeout(timeout);
  }, [loadingAnim]);
  return <div style={{ height: "20px" }}>{loadingAnim.toBeSliced}</div>;
};
