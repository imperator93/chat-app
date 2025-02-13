import { useEffect, useState } from "react";

export const LoadingComponent = ({ loadingType }: { loadingType: string }) => {
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
        toBeSliced: loadingType.slice(0, prev.iterator),
        iterator:
          prev.toBeSliced.length != loadingType.length ? prev.iterator++ : 0,
      }));
    }, 50);

    return () => clearTimeout(timeout);
  }, [loadingAnim, loadingType]);
  return <div style={{ height: "20px" }}>{loadingAnim.toBeSliced}</div>;
};
