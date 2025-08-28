import { useEffect, useRef } from "react";
import { gaEvent } from "../analytics";

export function useFeatureTimer(featureName: string) {
  const visibleStartRef = useRef<number>(performance.now());
  const accumulatedRef = useRef<number>(0);

  useEffect(() => {
    function onVisibility() {
      const now = performance.now();
      if (document.hidden) {
        accumulatedRef.current += (now - visibleStartRef.current);
      } else {
        visibleStartRef.current = now;
      }
    }
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      const now = performance.now();
      if (!document.hidden) accumulatedRef.current += (now - visibleStartRef.current);
      gaEvent("feature_engagement", {
        feature_name: featureName,
        engagement_time_msec: Math.round(accumulatedRef.current),
      });
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [featureName]);
}
