import Image from "next/image";
import mainBack from "@assets/images/main-back.png";
import forestBack from "@assets/images/forest-back.png";

export const BackgroundImages = () => {
  return (
    <>
      <Image
        src={mainBack}
        alt="Main background"
        className="absolute inset-0 w-full h-full -z-10 object-cover object-center"
        loading="eager"
        priority
        quality={75}
        sizes="100vw"
      />
      <Image
        src={forestBack}
        alt="Forest background"
        className="absolute inset-0 w-full h-[555px] top-[70px] -z-10 rotate-180"
        loading="eager"
        priority
        quality={75}
        sizes="100vw"
      />
    </>
  );
};
