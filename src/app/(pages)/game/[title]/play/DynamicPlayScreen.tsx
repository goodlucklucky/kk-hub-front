"use client";

import dynamic from "next/dynamic";

export default function DynamicPlayScreen({ title }: { title: string }) {
  let Component;
  if (title === "flappy")
    Component = dynamic(() => import("./_screens/flappy"), {
      ssr: false,
    });
  else if (title === "chess")
    Component = dynamic(() => import("./_screens/chess"), {
      ssr: false,
    });
  else if (title === "snake")
    Component = dynamic(() => import("./_screens/snake/sections/play"), {
      ssr: false,
    });
  else if (title === "tetris")
    Component = dynamic(() => import("./_screens/tetris/page"), {
      ssr: false,
    });
  else
    Component = dynamic(() => import("./_screens/snake/sections/play"), {
      ssr: false,
    });

  return <Component />;
}
