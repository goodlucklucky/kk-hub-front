import Image from "next/image";
import React from "react";

export default function Avatar({
  image,
  level = 1,
  name,
  Bottom,
}: {
  image: string;
  level?: number;
  name: string;
  Bottom?: () => JSX.Element;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        className="size-10 rounded-full"
        src={image}
        alt="profile-1"
        width={200}
        height={200}
      />
      <h3 className=" text-[#6E5C4F] text-[16px] font-light">
        {name.startsWith("0x")
          ? `${name.slice(0, 4)}...${name.slice(-4)}`
          : name}
      </h3>
      {Bottom != undefined ? (
        <Bottom />
      ) : (
        <p className="text-black/45 text-[12px]  font-extralight">
          Level {level}
        </p>
      )}
    </div>
  );
}
