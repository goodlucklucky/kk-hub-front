import { games } from "@/constants/games";
import type { NextConfig } from "next";
import { RemotePattern } from "next/dist/shared/lib/image-config";

const nextConfig: NextConfig = {
  async rewrites() {
    const gameRewrites =
      games?.flatMap((game) => {
        // Skip if link is # or invalid
        if (game.link === '#' || !game.link) {
          return [];
        }

        const baseRewrites = [
          // Main game page rewrite
          {
            source: `/games/${game.page}/:path*`,
            destination: `${game.link}/:path*`,
          },
          // Root path for the game
          {
            source: `/games/${game.page}`,
            destination: game.link,
          },
        ];

        // Special handling for Next.js apps
        if (game.webtype === "nextjs") {
          return [
            ...baseRewrites,
            // Proxy all static assets from root
            {
              source: "/_next/:path*",
              destination: `${game.link}/_next/:path*`,
            },
            {
              source: "/images/:path*",
              destination: `${game.link}/images/:path*`,
            },
            // Handle Next.js image optimization
            {
              source: "/_next/image",
              destination: `${game.link}/_next/image`,
            },
          ];
        }

        // Unity-specific rewrites
        if (game.webtype === "unity") {
          return [
            ...baseRewrites,
            {
              source: "/games/Build/:path*",
              destination: `${game.link}/Build/:path*`,
            },
            {
              source: "/games/TemplateData/:path*",
              destination: `${game.link}/TemplateData/:path*`,
            },
            {
              source: "/games/ServiceWorker.js",
              destination: `${game.link}/ServiceWorker.js`,
            },
          ];
        }

        return baseRewrites;
      }) || [];

    return gameRewrites;
  },

  // Required for Next.js image optimization to work
  images: {
    remotePatterns: (
      games
        ?.filter((g) => g.webtype === "nextjs" && g.link !== '#' && g.link)
        .map((game) => {
          try {
            return {
              protocol: "https",
              hostname: new URL(game.link).hostname,
              pathname: "/images/**",
            };
          } catch {
            return null;
          }
        })
        .filter(Boolean) || []
    ) as RemotePattern[],
  },
};

export default nextConfig;
