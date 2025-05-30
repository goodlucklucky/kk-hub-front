import { games } from "@/constants/games";
import type { NextConfig } from "next";
import { RemotePattern } from "next/dist/shared/lib/image-config";

const nextConfig: NextConfig = {
  // Exclude services folder from production build
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      ...(games
        ?.filter((g) => g.webtype === "nextjs" && g.link !== "#" && g.link)
        ?.map((game) => {
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
        .filter(Boolean) || []),
      // Add Cloudinary domain explicitly
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // Allow all paths under this domain
      },
      // Add i.pravatar.cc domain explicitly
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        pathname: "/**", // Allow all paths under this domain
      },
    ] as RemotePattern[],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack(config, { isServer }) {
    // Handle audio files
    config.module.rules.push({
      test: /\.(mp3|wav|ogg)$/,
      type: "asset/resource",
    });

    // Client-side fallbacks for Node.js modules (fixes Stockfish WASM issues)
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        stream: false,
        assert: false,
        http: false,
        https: false,
        os: false,
        url: false,
        zlib: false,
        util: false,
        buffer: false,
        events: false,
        worker_threads: false,
        perf_hooks: false,
        child_process: false,
        net: false,
        tls: false,
        dns: false,
        readline: false,
        inspector: false,
      };
    }

    // Handle Web Workers
    config.module.rules.push({
      test: /\.worker\.(js|ts)$/,
      use: {
        loader: "worker-loader",
        options: {
          name: "static/[hash].worker.js",
          publicPath: "/_next/",
        },
      },
    });

    // WASM support (if needed later)
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      syncWebAssembly: true,
    };

    config.module.rules.push({
      test: /\.wasm$/,
      type: "webassembly/async",
    });

    return config;
  },
  devIndicators: false,
};

export default nextConfig;
