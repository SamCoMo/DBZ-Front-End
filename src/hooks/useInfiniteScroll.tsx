import { useEffect, useRef } from "react";

interface InfiniteScrollType {
  bottomDiv: () => JSX.Element;
}

const useInfiniteScroll = (
  callback: () => void,
  hasNextPage: boolean
): InfiniteScrollType => {
  const target = useRef<HTMLDivElement>(null);

  const observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[], _observer) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    },
    {
      threshold: 1.0,
    }
  );

  useEffect(() => {
    if (target.current) {
      observer.observe(target.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [target.current, hasNextPage]);

  const bottomDiv = () => <>{hasNextPage && <div ref={target}></div>}</>;

  return {
    bottomDiv,
  };
};

export default useInfiniteScroll;
