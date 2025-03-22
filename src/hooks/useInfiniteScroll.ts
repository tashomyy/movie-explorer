import { useEffect, useRef } from "react";

interface UseInfiniteScrollOptions {
  callback: () => void;
  root?: HTMLElement | null;
  direction?: "vertical" | "horizontal";
}

const useInfiniteScroll = ({
  callback,
  root = null,
}: UseInfiniteScrollOptions) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      {
        root,
        rootMargin: "100px",
        threshold: 1.0,
      }
    );

    observer.observe(loaderRef.current);

    return () => {
      observer.disconnect();
    };
  }, [callback, root]);

  return loaderRef;
};

export default useInfiniteScroll;
