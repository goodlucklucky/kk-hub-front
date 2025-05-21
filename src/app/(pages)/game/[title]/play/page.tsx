// "client";

// import { useParams } from "next/navigation";
import React from "react";
import PlayScreen from "./_screens/snake/sections/play";

export default async function Page(props: any) {
  // const { title } = useParams();
  const params = await props?.params;
  const title = params?.title;

  console.log("title", title);

  return (
    <>
      <PlayScreen />
    </>
  );
}
