"use client";

// import SplashScreen from "@/src/app/(home)/_components/splash";
import Image from "next/image";
import { useEffect } from "react";

export default function UserNotFoundBanned() {
  useEffect(() => {
    const handlePopState = () => {
      history.pushState(null, "", window.location.href);
    };

    history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <>
      {/* <SplashScreen /> */}
      <div
        className="flex relative justify-between py-10 flex-col items-center h-dvh bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `url(/images/splash.png)`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-[0.15]"></div>
        <div className="grid gap-2.5 mt-8">
          <Image
            alt="kokomo Snake"
            src={"/images/flat-logo.png"}
            priority={true}
            loading="eager"
            height={175}
            width={400}
            className="w-60"
          />
          <Image
            alt="Season One"
            src={"/images/season-one.png"}
            priority={true}
            loading="eager"
            height={23}
            width={114}
            className="mx-auto"
          />
        </div>
        <div className="p-6 bg-black/30 shadow-lg backdrop-blur rounded-md grid gap-6 max-w-lg w-full">
          <p className="text-lg text-center font-medium mb-4 text-white italic">
            <b>Oops! Looks like you broke the rules.</b>
            <br />
            <span className="inline-block mb-1">
              Time to take a break… a permanent one!
            </span>
            <br />
            <span className="">
              Need help? Try following the rules next time.
            </span>
          </p>
          <p className="mb-2 font-medium text-white">
            Follow us to stay updated on our latest news:
          </p>
          <button
            onClick={() => {
              window.open(
                "https://x.com/kokomo_games",
                "_blank",
                "noopener,noreferrer"
              );
            }}
            rel="noopener noreferrer"
            className="flex text-center justify-center w-full items-center gap-2 px-4 py-2 bg-green btn-animate hover:bg-green-600 text-white font-semibold rounded-md transition-all"
          >
            Follow us on Twitter
          </button>
        </div>
        <div className="flex justify-center">
          <svg
            width="102"
            height="32"
            viewBox="0 0 102 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_549_169151)">
              <path
                d="M39.1283 25.1315H36.3505C36.046 25.1315 35.7987 25.3868 35.7987 25.7011V26.3934C35.7987 26.7078 36.046 26.9631 36.3505 26.9631H37.5465C37.3211 27.4179 36.8726 27.8672 35.9767 27.8672C34.7489 27.8672 34.1893 26.8516 34.1893 25.9074C34.1893 24.9632 34.7489 23.9476 35.9767 23.9476C36.4461 23.9476 36.8407 24.0947 37.1496 24.3868C37.3398 24.5629 37.6212 24.5875 37.8378 24.447L38.7315 23.8439C38.8689 23.7558 38.959 23.6109 38.9799 23.4448C39.0019 23.2709 38.9469 23.0992 38.8271 22.9699C38.095 22.2174 37.0826 21.8027 35.9756 21.8027C33.6683 21.8027 31.9941 23.5284 31.9941 25.9074C31.9941 28.2863 33.6683 30.0009 35.9756 30.0009C36.932 30.0009 37.7092 29.7043 38.2918 29.118L38.3907 29.4959C38.4577 29.7166 38.66 29.8716 38.881 29.8716H39.169C39.4493 29.8716 39.6779 29.6408 39.6779 29.3565V25.7023C39.6779 25.3879 39.4306 25.1326 39.1261 25.1326L39.1283 25.1315Z"
                fill="white"
              />
              <path
                d="M45.7065 22.3751C45.6164 22.1153 45.368 21.9414 45.0898 21.9414H43.6048C43.3266 21.9414 43.0782 22.1153 42.9892 22.3739L40.5411 29.2421C40.4917 29.3915 40.5148 29.5487 40.6049 29.6747C40.6917 29.7962 40.8302 29.8686 40.9775 29.8686H42.1417C42.4275 29.8686 42.6792 29.6847 42.7704 29.4071L43.0628 28.4529H45.6329L45.9264 29.4105C46.0165 29.6847 46.2693 29.8686 46.554 29.8686H47.7083C47.8643 29.8686 48.0094 29.7928 48.0952 29.6646C48.1798 29.5387 48.1974 29.3815 48.1425 29.2354L45.7076 22.3739L45.7065 22.3751ZM45.0821 26.6971H43.6114L44.3424 24.3226L45.0821 26.6971Z"
                fill="white"
              />
              <path
                d="M57.1523 21.9414H55.9234C55.6629 21.9414 55.4221 22.0785 55.2803 22.3082L53.4028 25.4184L51.5341 22.3071C51.3923 22.0785 51.1526 21.9414 50.8921 21.9414H49.6741C49.3642 21.9414 49.1113 22.1967 49.1113 22.5111V29.299C49.1113 29.6134 49.3642 29.8686 49.6741 29.8686H50.7426C51.0526 29.8686 51.3054 29.6134 51.3054 29.299V25.8342L52.8092 28.3369C52.9015 28.5086 53.084 28.6145 53.2863 28.6145H53.5325C53.7315 28.6145 53.9074 28.5175 54.0151 28.3447L55.5233 25.8342V29.299C55.5233 29.6134 55.7706 29.8686 56.0751 29.8686H57.1545C57.459 29.8686 57.7064 29.6134 57.7064 29.299V22.5111C57.7064 22.1967 57.459 21.9414 57.1545 21.9414H57.1523Z"
                fill="white"
              />
              <path
                d="M63.5534 27.7572H61.2417V26.8743H63.1148C63.4248 26.8743 63.6776 26.619 63.6776 26.3047V25.4296C63.6776 25.1152 63.4248 24.8599 63.1148 24.8599H61.2417V24.0428H63.4567C63.7667 24.0428 64.0195 23.792 64.0195 23.4843V22.5111C64.0195 22.1967 63.7667 21.9414 63.4567 21.9414H59.6214C59.3114 21.9414 59.0586 22.1967 59.0586 22.5111V29.299C59.0586 29.6134 59.3114 29.8686 59.6214 29.8686H63.5534C63.8634 29.8686 64.1162 29.6134 64.1162 29.299V28.3258C64.1162 28.0114 63.8634 27.7561 63.5534 27.7561V27.7572Z"
                fill="white"
              />
              <path
                d="M68.6433 25.02C68.5663 24.9977 68.4828 24.9765 68.397 24.9542C67.9079 24.8283 67.2989 24.6722 67.2989 24.2965C67.2989 23.9665 67.5814 23.7525 68.0189 23.7525C68.397 23.7525 68.6718 23.8885 68.818 24.1527C68.9401 24.3534 69.1819 24.4559 69.4292 24.4058L70.3977 24.1583C70.5593 24.1215 70.6934 24.0134 70.767 23.864C70.8418 23.7112 70.8451 23.534 70.7758 23.379C70.3383 22.3913 69.3347 21.8027 68.0925 21.8027C66.3436 21.8027 65.1685 22.8094 65.1685 24.3077C65.1685 25.6387 65.8819 26.4124 67.4824 26.817C67.6056 26.8483 67.7254 26.8772 67.8419 26.904C68.53 27.0668 68.9192 27.1749 68.9192 27.506C68.9192 28.031 68.2211 28.0712 68.0068 28.0712C67.5319 28.0712 67.1516 27.8794 66.9625 27.5428C66.8251 27.312 66.5624 27.2106 66.3095 27.2908L65.3312 27.5952C65.1773 27.6498 65.052 27.7668 64.9861 27.9162C64.9234 28.0589 64.9212 28.2139 64.9806 28.3566C65.4257 29.4011 66.5371 30.0009 68.0288 30.0009C68.9522 30.0009 69.7414 29.74 70.3097 29.2473C70.8418 28.7858 71.1342 28.1559 71.1342 27.4759C71.1342 26.1694 70.5054 25.5506 68.6433 25.0211V25.02Z"
                fill="white"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_549_169151"
                x="0"
                y="0"
                width="102"
                height="32.0009"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="0.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_549_169151"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_549_169151"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </>
  );
}
