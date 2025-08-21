// analytics.ts
import ReactGA from "react-ga4";

// Usa un Measurement ID ficticio para demo
const MEASUREMENT_ID = "G-XXXXXXX";

export const initGA = (): void => {
  ReactGA.initialize(MEASUREMENT_ID);
};

export const logPageView = (page: string): void => {
  ReactGA.send({ hitType: "pageview", page });
};

export const logEvent = (
  category: string,
  action: string,
  label?: string
): void => {
  ReactGA.event({ category, action, label });
};
