// "client";

// import { useParams } from "next/navigation";
import React from "react";
import SnakePlayScreen from "./_screens/snake/sections/play";
import FlappyPlayScreen from "./_screens/flappy";

export default async function Page(props: any) {
  // const { title } = useParams();
  const params = await props?.params;
  const title = params?.title;

  // console.log("title", title);

  if (title == "flappy") return <FlappyPlayScreen />;
  if (title == "snake") return <SnakePlayScreen />;
  return <SnakePlayScreen />;
}
