import { Changelog, defineConfig } from "vocs/config";
import { version } from "../packages/keelog/package.json";

export default defineConfig({
  baseUrl:
    process.env.VERCEL_ENV === "production"
      ? "https://keelog.vercel.app"
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "https://keelog.vercel.app",
  cacheDir: ".vocs/cache",
  changelog: Changelog.github({ repo: "thelastofinusa/keelog-package" }),
  checkDeadlinks: true,
  description:
    "A lightweight zero-config console logger with automatic context, clean tree output, and production-ready JSON.",
  editLink: {
    link: "https://github.com/thelastofinusa/keelog-package/edit/rc/site/src/pages/:path",
  },
  iconUrl: {
    light: "/icon-light.svg",
    dark: "/icon-dark.svg",
  },
  logoUrl: {
    light: "/logo-tight-light.svg",
    dark: "/logo-tight-dark.svg",
  },
  ogImageUrl: (path, { baseUrl }) => {
    if (path === "/") {
      const homeOgDescription =
        "A lightweight zero-config console logger with automatic context, clean tree output, and production-ready JSON.";
      const homeOgTitle = "Console logger";

      return `${baseUrl ?? ""}/api/og?logo=%logo&title=${encodeURIComponent(homeOgTitle)}&description=${encodeURIComponent(homeOgDescription)}`;
    }

    return `${baseUrl ?? ""}/api/og?logo=%logo&title=%title&description=%description`;
  },
  sidebar: [
    {
      text: "Introduction",
      collapsed: false,
      items: [
        { text: "What is Keelog?", link: "/introduction/what-is-keelog" },
        { text: "Getting Started", link: "/introduction/getting-started" },
      ],
    },
    {
      text: "API",
      collapsed: false,
      items: [
        { text: "Simple Log", link: "/api/simple-log" },
        { text: "Leveled Logs", link: "/api/leveled-logs" },
        { text: "Modifiers", link: "/api/modifiers" },
      ],
    },
    {
      text: "Configuration",
      collapsed: false,
      items: [
        {
          text: "Environment Variables",
          link: "/configuration/environment-variables",
        },
      ],
    },
    {
      text: "Features",
      collapsed: false,
      items: [
        { text: "Context Extraction", link: "/features/context-extraction" },
        { text: "Pretty-Printing", link: "/features/pretty-printing" },
        { text: "Deferred Output", link: "/features/deferred-output" },
      ],
    },
  ],
  socials: [
    {
      icon: "github",
      link: "https://github.com/thelastofinusa/keelog-package",
    },
    { icon: "x", link: "https://twitter.com/thelastofinusa" },
  ],
  title: "Keelog",
  titleTemplate: "%s – Keelog",
  topNav: [
    {
      text: "Guides & API",
      link: "/introduction/getting-started",
      match: (path) =>
        Boolean(
          path?.startsWith("/introduction") ||
          path?.startsWith("/writing") ||
          path?.startsWith("/features") ||
          path?.startsWith("/reference"),
        ),
    },
    {
      text: `v${version}`,
      items: [
        {
          text: "Changelog",
          link: "/changelog",
        },
        {
          text: "Contributing",
          link: "https://github.com/thelastofinusa/keelog/blob/main/.github/CONTRIBUTING.md",
        },
      ],
    },
  ],
});
