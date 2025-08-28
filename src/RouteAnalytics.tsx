import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pageView, gaEvent } from "./analytics";

export default function RouteAnalytics() {
  const location = useLocation();
  useEffect(() => {
    pageView(location.pathname + location.search, document.title);
    gaEvent("feature_used", { feature_name: "NAV", action: "navigate", route: location.pathname });
  }, [location]);
  return null;
}
