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
      "/player",
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
};
export function getNavForPath(pathname: string): NavGroup {
  if (pathname.startsWith("/explore/about")) return navConfig.about;
  if (pathname.startsWith("/explore/resources")) return navConfig.resources;
  if (pathname.startsWith("/explore/pantheon")) return navConfig.pantheon;
  if (pathname.startsWith("/explore/events")) return navConfig.events;
  if (pathname.startsWith("/explore/rules")) return navConfig.rules;
  if (pathname === "/") return navConfig.home;
  return navConfig.home;
}

//   home: [
//     { heading: "Welcome", hyperRef: "/" },
//     { heading: "Explore", hyperRef: "/explore/about" },
//     { heading: "Members", hyperRef: "/player" },
//     {
//       heading: "Shop",
//       hyperRef: "https://armstreet.com/collections/fireside-family-larp-costume-basics-and-more",
//     },
//   ],
//   about: [
//     { heading: "Events", hyperRef: "/explore/events" },
//     { heading: "Pantheon", hyperRef: "/explore/pantheon" },
//     { heading: "Resources", hyperRef: "/explore/resources" },
//     {
//       heading: "Storyline",
//       hyperRef: "/explore/storyline",
//     },
//   ],
//   events: [
//     { heading: "About", hyperRef: "/explore/about" },
//     { heading: "Pantheon", hyperRef: "/explore/pantheon" },
//     { heading: "Resources", hyperRef: "/explore/resources" },
//     {
//       heading: "Storyline",
//       hyperRef: "/explore/storyline",
//     },
//   ],
//   pantheon: [
//     { heading: "Events", hyperRef: "/explore/events" },
//     { heading: "About", hyperRef: "/explore/about" },
//     { heading: "Resources", hyperRef: "/explore/resources" },
//     {
//       heading: "Storyline",
//       hyperRef: "/explore/storyline",
//     },
//   ],
//   resources: [
//     { heading: "Events", hyperRef: "/explore/events" },
//     { heading: "Pantheon", hyperRef: "/explore/pantheon" },
//     { heading: "Rules", hyperRef: "/explore/rules" },
//     {
//       heading: "Storyline",
//       hyperRef: "/explore/storyline",
//     },
//   ],
//   rules: [
//     { heading: "Events", hyperRef: "/explore/events" },
//     { heading: "Pantheon", hyperRef: "/explore/pantheon" },
//     { heading: "Resources", hyperRef: "/explore/resources" },
//     {
//       heading: "Storyline",
//       hyperRef: "/explore/storyline",
//     },
//   ],
//   storyline: [
//     { heading: "Events", hyperRef: "/explore/events" },
//     { heading: "Pantheon", hyperRef: "/explore/pantheon" },
//     { heading: "Resources", hyperRef: "/explore/resources" },
//     { heading: "About", hyperRef: "/explore/about" },
//   ],
// };
