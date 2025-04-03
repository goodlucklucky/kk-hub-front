import { games } from "@/constants/games";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return games?.map((game) => ({
      source: `/games/${game?.page}/:path*`,
      destination: `${game.link}/:path*`,
      permanent: false,
    }));
  },
};

export default nextConfig;
