"use client";

//import modules
import React from "react";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";

//import utils
import { cn } from "@/app/_lib/utils";

//import assets
import {
  MissionIcon,
  PetIcon,
  PlayIcon,
  SpeakerIcon,
  StoreIcon,
  StatsIcon,
  HomeIcon,
} from "@/app/_assets/svg/etc";
import footerItem from "@assets/images/footer-item.svg";

export default function Footer({
  footerCategory = "home",
}: {
  footerCategory: string;
}) {
  const pathname = usePathname();
  const params = useParams();
  const title = params?.title as string;

  const isPlayRoute = (path: string) => {
    return pathname?.includes(path);
  };

  return (
    <>
      <footer
        className={cn(
          "bg-[url(/images/footer-panel.png)] bg-[length:100%_100%] bg-no-repeat w-full h-[95px]",
          "grid grid-cols-5 items-center pt-4 px-3 xs:px-4",
          "text-center font-bumper-sticker text-xs text-golden-brown drop-shadow-[0_0.25ch_#fff4] z-10 fixed bottom-0"
        )}
      >
        <Item
          Icon={SpeakerIcon}
          isPlay={isPlayRoute(
            footerCategory === "home" ? "tasks" : `game/${title}/tasks`
          )}
          label="TASKS"
          path={footerCategory === "home" ? "tasks" : `game/${title}/tasks`}
        />
        <Item
          Icon={StoreIcon}
          isPlay={isPlayRoute(
            footerCategory === "home" ? "store" : `game/${title}/store`
          )}
          label="Store"
          path={footerCategory === "home" ? "store" : `game/${title}/store`}
        />
        {footerCategory === "home" && (
          <Item
            Icon={HomeIcon}
            isPlay={isPlayRoute("home")}
            label="Home"
            path="home"
          />
        )}
        {footerCategory === "game" && (
          <Item
            Icon={PlayIcon}
            isPlay={isPlayRoute(`game/${title}/tournaments`)}
            label="PLAY"
            path={`game/${title}/tournaments`}
          />
        )}
        {footerCategory === "home" && (
          <Item
            Icon={MissionIcon}
            isPlay={isPlayRoute("missions")}
            label="MISSIONS"
            path="missions"
          />
        )}
        {footerCategory === "game" && (
          <Item
            Icon={StatsIcon}
            isPlay={isPlayRoute(`game/${title}/stats`)}
            label="STATS"
            path={`game/${title}/stats`}
          />
        )}
        {footerCategory === "home" && (
          <Item
            Icon={PetIcon}
            isPlay={isPlayRoute("pets")}
            label="Pets"
            isComing={true}
            path="pets"
          />
        )}
        {footerCategory === "game" && (
          <Item
            Icon={HomeIcon}
            isPlay={isPlayRoute("home")}
            label="Back To Hub"
            path="home"
          />
        )}
      </footer>
      <div className="h-[95px] w-full"></div>
    </>
  );
}

function Item({
  label,
  Icon = PlayIcon,
  isPlay,
  isComing,
  path,
}: {
  label?: React.ReactNode | string;
  Icon: (props: React.ComponentProps<"svg">) => React.JSX.Element;
  isPlay?: boolean;
  isComing?: boolean;
  path?: string;
}) {
  const router = useRouter();

  const handleClick = () => {
    if (isComing) return;

    router.push(`/${path}`);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative flex flex-col gap-1 p-1 pt-3 z-0 h-18 justify-center items-center",
        isPlay && "text-golden-2",
        !isComing && "cursor-pointer"
      )}
    >
      {Icon && <Icon className={cn(isPlay ? "size-7 mt-0.5" : "size-7")} />}
      <p className="leading-[12px]">{label}</p>
      {isPlay && (
        <FooterSvg className="absolute -z-[1] top-0 left-0 w-full h-[76px]" />
      )}
      {!isPlay && (
        <Image
          className="absolute -top-0 -z-10 h-[76px]"
          src={footerItem}
          alt="footer-item"
        />
      )}
      {isComing && (
        <div className="absolute -top-0 -z-10 w-full text-[10px] text-[#FFC920] text-center font-made-tommy font-bold leading-normal [text-shadow:0px_1px_0px_rgba(0,0,0,0.20)] rounded-[5px] border border-[#FFEBB3] bg-[#7D4000] shadow-[0px_2px_0px_0px_rgba(0,0,0,0.20)]">
          Coming Soon
        </div>
      )}
    </div>
  );
}

function FooterSvg(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="66"
      height="76"
      viewBox="0 0 66 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_d_1_4014)">
        <path
          d="M66 43.9032V9.6732C66 9.1232 65.94 8.5832 65.84 8.0632C65.68 7.2832 65.41 6.5432 65.04 5.8632C64.67 5.1832 64.2 4.5632 63.66 4.0132C62.94 3.2932 62.07 2.7032 61.11 2.2932C60.87 2.1932 60.62 2.1032 60.37 2.0232C59.62 1.7932 58.82 1.6632 57.99 1.6632H33.29L26.43 1.1632L21.19 0.783203L20.79 0.813203L10.06 1.6532H8.01C8.01 1.6532 7.92 1.6532 7.88 1.6632C7.54 1.6632 7.21 1.7032 6.89 1.7432C6.82 1.7532 6.74 1.7632 6.67 1.7732C6.16 1.8632 5.68 1.9932 5.21 2.1632C5.11 2.2032 5.01 2.2332 4.91 2.2732C4.89 2.2732 4.87 2.2932 4.85 2.3032C4.7 2.3732 4.55 2.4432 4.4 2.5132C4.38 2.5132 4.37 2.5232 4.35 2.5332C4.02 2.7032 3.7 2.8932 3.39 3.1032C3.35 3.1332 3.3 3.1532 3.26 3.1832C3.15 3.2532 3.06 3.3432 2.96 3.4232C2.96 3.4232 2.94 3.4332 2.93 3.4432C2.41 3.8432 1.95 4.3232 1.55 4.8532C1.48 4.9332 1.42 5.0232 1.35 5.1132C1.35 5.1132 1.34 5.1332 1.33 5.1432C0.5 6.3432 0 7.7632 0.01 9.2232C0.01 9.2232 0.01 9.2632 0.01 9.2732V9.5532C0.01 9.5532 0.01 9.6332 0.01 9.6732V11.0132V33.4132V36.6732V37.7232H0V54.8932V63.6532C0 65.4532 0.6 67.1032 1.6 68.4432C3.06 70.3932 5.38 71.6632 8.01 71.6632L23.76 73.1532L27.4 72.2932L46.2 71.9032L49.85 72.3932L53.81 72.0332L54.9 71.9332L57.99 71.6532C62.41 71.6532 66 68.0732 66 63.6532V43.9132V43.9032Z"
          fill="url(#paint0_linear_1_4014)"
        />
        <path
          d="M23.76 73.1532L27.4 72.2932L46.2 71.9032L49.85 72.3932M23.76 73.1532L23.8542 72.1577L23.6903 72.1422M23.76 73.1532L23.5301 72.18L23.6903 72.1422M23.76 73.1532L8.01 71.6632C5.38 71.6632 3.06 70.3932 1.6 68.4432C0.6 67.1032 0 65.4532 0 63.6532V54.8932L62.9497 4.71714M23.6903 72.1422L27.1701 71.32L27.2733 71.2956L27.3793 71.2934L46.1793 70.9034L46.2565 70.9018L46.3331 70.9121L49.8715 71.3871M23.6903 72.1422L8.10418 70.6676L8.0572 70.6632H8.01C5.71141 70.6632 3.68191 69.5551 2.40079 67.8443C1.52275 66.6673 1 65.2253 1 63.6532V54.8932V38.7232H1.01V37.7232V36.6732V33.4132V11.0132V9.6732V9.67297V9.67273V9.6725V9.67226V9.67202V9.67178V9.67154V9.6713V9.67106V9.67081V9.67057V9.67033V9.67008V9.66984V9.66959V9.66934V9.66909V9.66884V9.66859V9.66834V9.66809V9.66784V9.66758V9.66733V9.66707V9.66682V9.66656V9.6663V9.66604V9.66578V9.66552V9.66526V9.665V9.66474V9.66448V9.66421V9.66395V9.66368V9.66342V9.66315V9.66289V9.66262V9.66235V9.66208V9.66181V9.66154V9.66127V9.661V9.66073V9.66045V9.66018V9.6599V9.65963V9.65935V9.65908V9.6588V9.65852V9.65824V9.65797V9.65769V9.65741V9.65713V9.65684V9.65656V9.65628V9.656V9.65571V9.65543V9.65515V9.65486V9.65458V9.65429V9.654V9.65372V9.65343V9.65314V9.65285V9.65256V9.65227V9.65198V9.65169V9.6514V9.65111V9.65082V9.65052V9.65023V9.64994V9.64964V9.64935V9.64905V9.64876V9.64846V9.64817V9.64787V9.64757V9.64728V9.64698V9.64668V9.64638V9.64608V9.64578V9.64548V9.64518V9.64488V9.64458V9.64428V9.64398V9.64368V9.64338V9.64307V9.64277V9.64247V9.64216V9.64186V9.64156V9.64125V9.64095V9.64064V9.64034V9.64003V9.63973V9.63942V9.63911V9.63881V9.6385V9.63819V9.63789V9.63758V9.63727V9.63696V9.63665V9.63635V9.63604V9.63573V9.63542V9.63511V9.6348V9.63449V9.63418V9.63387V9.63356V9.63325V9.63294V9.63263V9.63232V9.63201V9.6317V9.63139V9.63108V9.63076V9.63045V9.63014V9.62983V9.62952V9.62921V9.62889V9.62858V9.62827V9.62796V9.62765V9.62733V9.62702V9.62671V9.6264V9.62609V9.62577V9.62546V9.62515V9.62484V9.62452V9.62421V9.6239V9.62359V9.62327V9.62296V9.62265V9.62234V9.62202V9.62171V9.6214V9.62109V9.62077V9.62046V9.62015V9.61984V9.61953V9.61921V9.6189V9.61859V9.61828V9.61797V9.61766V9.61735V9.61703V9.61672V9.61641V9.6161V9.61579V9.61548V9.61517V9.61486V9.61455V9.61424V9.61393V9.61362V9.61331V9.613V9.61269V9.61239V9.61208V9.61177V9.61146V9.61115V9.61085V9.61054V9.61023V9.60992V9.60962V9.60931V9.609V9.6087V9.60839V9.60809V9.60778V9.60748V9.60717V9.60687V9.60657V9.60626V9.60596V9.60566V9.60535V9.60505V9.60475V9.60445V9.60415V9.60385V9.60355V9.60325V9.60295V9.60265V9.60235V9.60205V9.60175V9.60145V9.60116V9.60086V9.60056V9.60027V9.59997V9.59967V9.59938V9.59908V9.59879V9.5985V9.5982V9.59791V9.59762V9.59733V9.59704V9.59674V9.59645V9.59616V9.59587V9.59559V9.5953V9.59501V9.59472V9.59444V9.59415V9.59386V9.59358V9.59329V9.59301V9.59273V9.59244V9.59216V9.59188V9.5916V9.59132V9.59104V9.59076V9.59048V9.5902V9.58992V9.58964V9.58937V9.58909V9.58882V9.58854V9.58827V9.58799V9.58772V9.58745V9.58718V9.58691V9.58664V9.58637V9.5861V9.58583V9.58556V9.5853V9.58503V9.58477V9.5845V9.58424V9.58398V9.58371V9.58345V9.58319V9.58293V9.58267V9.58241V9.58216V9.5819V9.58164V9.58139V9.58113V9.58088V9.58063V9.58037V9.58012V9.57987V9.57962V9.57937V9.57912V9.57888V9.57863V9.57838V9.57814V9.5779V9.57765V9.57741V9.57717V9.57693V9.57669V9.57645V9.57621V9.57598V9.57574V9.5755V9.57527V9.57504V9.5748V9.57457V9.57434V9.57411V9.57388V9.57366V9.57343V9.5732V9.57298V9.57275V9.57253V9.57231V9.57209V9.57187V9.57165V9.57143V9.57122V9.571V9.57079V9.57057V9.57036V9.57015V9.56994V9.56973V9.56952V9.56931V9.5691V9.5689V9.56869V9.56849V9.56829V9.56809V9.56789V9.56769V9.56749V9.5673V9.5671V9.56691V9.56671V9.56652V9.56633V9.56614V9.56595V9.56576V9.56558V9.56539V9.56521V9.56502V9.56484V9.56466V9.56448V9.5643V9.56413V9.56395V9.56378V9.5636V9.56343V9.56326V9.56309V9.56292V9.56276V9.56259V9.56243V9.5621V9.56194V9.56178V9.56162V9.56146V9.56131V9.56115V9.561V9.56085V9.5607V9.56055V9.5604V9.56026V9.56011V9.55997V9.55982V9.55968V9.55954V9.55941V9.55927V9.55913V9.559V9.55887V9.55873V9.55861V9.55848V9.55835V9.55822V9.5581V9.55798V9.55785V9.55773V9.55762V9.5575V9.55738V9.55727V9.55716V9.55704V9.55693V9.55683V9.55672V9.55661V9.55651V9.55641V9.55631V9.55621V9.55611V9.55601V9.55601V9.55592V9.55582V9.55573V9.55564V9.55555V9.55547V9.55538V9.5553V9.55521V9.55513V9.55505V9.55498V9.5549V9.55483V9.55475V9.55468V9.55461V9.55454V9.55448V9.55441V9.55435V9.55429V9.55423V9.55417V9.55411V9.55406V9.554V9.55395V9.5539V9.55385V9.55381V9.55376V9.55372V9.55368V9.55364V9.5536V9.55356V9.55353V9.5535V9.55346V9.55343V9.55341V9.55338V9.55336V9.55333V9.55331V9.55329V9.55328V9.55327V9.55326V9.55325V9.55324V9.55323V9.55322V9.55321V9.5532H1.01002L1.00998 9.21635C1.00164 7.99939 1.41591 6.78677 2.135 5.73739C2.15075 5.71651 2.16386 5.69763 2.17424 5.68196C2.22136 5.62043 2.24193 5.59117 2.25587 5.57133C2.27085 5.55002 2.27818 5.53959 2.30258 5.51171L2.3264 5.48448L2.34819 5.45561C2.68659 5.00723 3.06622 4.60926 3.48407 4.2792L3.50197 4.27025L3.5847 4.20407C3.6232 4.17326 3.65784 4.14383 3.68479 4.12071C3.69708 4.11016 3.70677 4.1018 3.71529 4.09446C3.72869 4.08289 3.73916 4.07386 3.75219 4.06284C3.78627 4.034 3.79716 4.02669 3.79716 4.02669L3.81986 4.01224C3.8321 4.00541 3.85203 3.99418 3.87293 3.98163C3.89622 3.96766 3.92759 3.94805 3.96299 3.92291C4.21253 3.7545 4.46888 3.60083 4.73213 3.46174L4.82289 3.41939L5.04789 3.31439L5.27289 3.20939L5.28513 3.20367L5.29721 3.19763C5.30258 3.19495 5.30783 3.19226 5.31295 3.1896C5.33276 3.18228 5.35684 3.17379 5.39035 3.16206L5.39613 3.16004C5.43895 3.14506 5.4995 3.12388 5.56371 3.09868C5.9715 2.952 6.38635 2.83967 6.82736 2.7609C6.85267 2.75737 6.88045 2.75366 6.91216 2.74943L6.91436 2.74914C6.94761 2.74471 6.98548 2.73966 7.02233 2.73444C7.3439 2.69429 7.6131 2.6632 7.88 2.6632H8.00311L8.04311 2.6532H10.06H10.0991L10.138 2.65015L20.8648 1.8104L20.868 1.81015L21.1912 1.78592L26.3573 2.16056L26.3577 2.16058L33.2173 2.66056L33.2536 2.6632H33.29H57.99C58.7131 2.6632 59.4124 2.77609 60.0711 2.9775C60.2952 3.04937 60.5146 3.12862 60.7214 3.21461C61.5615 3.57405 62.3221 4.0903 62.9497 4.71714M49.8715 71.3871L49.7595 71.3973L49.85 72.3932M49.8715 71.3871L49.9831 71.4021L49.85 72.3932M49.8715 71.3871L53.7186 71.0374L53.81 72.0332L49.85 72.3932M64.8591 8.25776C64.9483 8.72321 65 9.19753 65 9.6732V43.9032V43.9132V63.6532C65 67.5193 61.8593 70.6532 57.99 70.6532H57.9448L57.8998 70.6573L54.8098 70.9373L54.8086 70.9374L53.7195 71.0373L64.8604 8.26415C64.86 8.26202 64.8595 8.25989 64.8591 8.25776ZM64.8591 8.25776C64.7184 7.57525 64.4826 6.93097 64.1616 6.34115C63.8402 5.75047 63.4287 5.20555 62.9497 4.71714M64.8591 8.25776L62.9497 4.71714M4.86316 3.39205C4.86905 3.38865 4.86776 3.38947 4.86211 3.39265L4.86235 3.39252L4.86316 3.39205Z"
          stroke="url(#paint1_linear_1_4014)"
          strokeWidth="2"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1_4014"
          x="0"
          y="0.783203"
          width="66"
          height="74.3701"
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
          <feOffset dy="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.466623 0 0 0 0 0.338678 0 0 0 0 0 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1_4014"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1_4014"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_1_4014"
          x1="33"
          y1="0.783203"
          x2="33"
          y2="73.1532"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FBB600" />
          <stop offset="1" stopColor="#FFCE36" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1_4014"
          x1="33"
          y1="0.783203"
          x2="33"
          y2="73.1532"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFEBB3" />
          <stop offset="1" stopColor="#E59800" />
        </linearGradient>
      </defs>
    </svg>
  );
}
