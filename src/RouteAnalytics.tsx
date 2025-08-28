import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pageView, gaEvent } from "./analytics";

const routeToPageName: Record<string, string> = {
  "/": "Home",
  "/promptlab": "PromptLab",
  "/hackathon": "Hackathon",
  "/editor": "SandboxEditor",
};

export default function RouteAnalytics() {
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    const pageName = routeToPageName[path] || path;

    pageView(path, pageName); // 👈 pass a friendly title

    gaEvent("feature_used", {
      feature_name: "NAV",
      action: "navigate",
      route: path,
      page_name: pageName,
    });
  }, [location]);
  return null;
}
