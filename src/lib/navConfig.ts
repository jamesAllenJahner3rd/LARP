import React from "react";

export type NavGroup = {
  heading: string[];
  hyperRef: string[];
  requiresAuth?: boolean;
  roles?: string[];
};
export const navConfig: Record<string, NavGroup> = {
  home: {
    heading: ["Welcome", "Explore", "Members", "Shop"],
    hyperRef: [
      "/",
      "/about",
      "/login",
      "https://armstreet.com/collections/fireside-family-larp-costume-basics-and-more",
    ],
  },
  login: {
    heading: ["Welcome", "Explore", "Members", "Shop"],
    hyperRef: [
      "/",
      "/about",
      "/register",
      "https://armstreet.com/collections/fireside-family-larp-costume-basics-and-more",
    ],
  },
  about: {
    heading: ["Events", "Pantheon", "Storyline", "Resources"],
    hyperRef: ["/events", "/pantheon", "/storyline", "/resources"],
  },
  events: {
    heading: ["About", "Pantheon", "Resources", "Storyline"],
    hyperRef: ["/about", "/pantheon", "/resources", "/storyline"],
  },
  pantheon: {
    heading: ["Events", "About", "Resources", "Storyline"],
    hyperRef: ["/events", "/about", "/resources", "/storyline"],
  },
  resources: {
    heading: ["Events", "Pantheon", "Rules", "Storyline"],
    hyperRef: ["/events", "/pantheon", "/rules", "/storyline"],
  },
  rules: {
    heading: ["Events", "Pantheon", "Resources", "Storyline"],
    hyperRef: ["/events", "/pantheon", "/resources", "/storyline"],
  },
  storyline: {
    heading: ["Events", "Pantheon", "Resources", "About"],
    hyperRef: ["/events", "/pantheon", "/resources", "/about"],
  },
  members: {
    heading: ["Events", "Pantheon", "Resources", "Log Out"],
    hyperRef: ["/events", "/pantheon", "/resources", "/about"],
  },
};
export function getNavForPath(pathname: string): NavGroup {
  if (pathname.startsWith("/about")) return navConfig.about;
  if (pathname.startsWith("/resources")) return navConfig.resources;
  if (pathname.startsWith("/pantheon")) return navConfig.pantheon;
  if (pathname.startsWith("/events")) return navConfig.events;
  if (pathname.startsWith("/rules")) return navConfig.rules;
  if (pathname.startsWith("/login")) return navConfig.login;
  if (pathname === "/") return navConfig.home;
  return navConfig.home;
}
