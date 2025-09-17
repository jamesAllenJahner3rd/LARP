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
      "/explore/about",
      "/login",
      "https://armstreet.com/collections/fireside-family-larp-costume-basics-and-more",
    ],
  },
  login: {
    heading: ["Welcome", "Explore", "Members", "Shop"],
    hyperRef: [
      "/",
      "/explore/about",
      "/register",
      "https://armstreet.com/collections/fireside-family-larp-costume-basics-and-more",
    ],
  },
  about: {
    heading: ["Events", "Pantheon", "Resources", "Storyline"],
    hyperRef: [
      "/explore/events",
      "/explore/pantheon",
      "/explore/resources",
      "/explore/storyline",
    ],
  },
  events: {
    heading: ["About", "Pantheon", "Resources", "Storyline"],
    hyperRef: [
      "/explore/about",
      "/explore/pantheon",
      "/explore/resources",
      "/explore/storyline",
    ],
  },
  pantheon: {
    heading: ["Events", "About", "Resources", "Storyline"],
    hyperRef: [
      "/explore/events",
      "/explore/about",
      "/explore/resources",
      "/explore/storyline",
    ],
  },
  resources: {
    heading: ["Events", "Pantheon", "Rules", "Storyline"],
    hyperRef: [
      "/explore/events",
      "/explore/pantheon",
      "/explore/rules",
      "/explore/storyline",
    ],
  },
  rules: {
    heading: ["Events", "Pantheon", "Resources", "Storyline"],
    hyperRef: [
      "/explore/events",
      "/explore/pantheon",
      "/explore/resources",
      "/explore/storyline",
    ],
  },
  storyline: {
    heading: ["Events", "Pantheon", "Resources", "About"],
    hyperRef: [
      "/explore/events",
      "/explore/pantheon",
      "/explore/resources",
      "/explore/about",
    ],
  },
  members: {
    heading: ["Events", "Pantheon", "Resources", "Log Out"],
    hyperRef: [
      "/explore/events",
      "/explore/pantheon",
      "/explore/resources",
      "/explore/about",
    ],
  },
};
export function getNavForPath(pathname: string): NavGroup {
  if (pathname.startsWith("/explore/about")) return navConfig.about;
  if (pathname.startsWith("/explore/resources")) return navConfig.resources;
  if (pathname.startsWith("/explore/pantheon")) return navConfig.pantheon;
  if (pathname.startsWith("/explore/events")) return navConfig.events;
  if (pathname.startsWith("/explore/rules")) return navConfig.rules;
  if (pathname.startsWith("/login")) return navConfig.login;
  if (pathname === "/") return navConfig.home;
  return navConfig.home;
}
