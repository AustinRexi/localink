export const enum ROUTES {
  issues = "/issues",
  subscriptions = "/subscriptions",
  subscribers = "/subscribers",
  reports = "/reports",
}

export type NavLinkType = {
  name: string;
  url: ROUTES;
  icon: {
    normal: string;
    active: string;
  };
};

export const navLinks: NavLinkType[] = [
  {
    name: "Issues",
    url: ROUTES.issues,
    icon: {
      normal: "/icons/sidebar/issues.svg",
      active: "/icons/sidebar/issues-active.svg",
    },
  },
  {
    name: "Subscriptions",
    url: ROUTES.subscriptions,
    icon: {
      normal: "/icons/sidebar/subscriptions.svg",
      active: "/icons/sidebar/subscriptions-active.svg",
    },
  },
  {
    name: "Subscribers",
    url: ROUTES.subscribers,
    icon: {
      normal: "/icons/sidebar/subscribers.svg",
      active: "/icons/sidebar/subscribers-active.svg",
    },
  },
  {
    name: "Reports",
    url: ROUTES.reports,
    icon: {
      normal: "/icons/sidebar/reports.svg",
      active: "/icons/sidebar/reports-active.svg",
    },
  },
];
