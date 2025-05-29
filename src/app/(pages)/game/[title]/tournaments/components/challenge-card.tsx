"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import RightArrow from "@/app/_assets/images/Icon_NextPageArrow.png";
import PrizeImage from "@/app/_assets/images/prize.png";
import SmileImg from "@/app/_assets/images/smile.png";
import GoldSmileImg from "@/app/_assets/images/gold-smile.png";
import RocketImg from "@/app/_assets/images/rocket.png";
import { useCallback, useMemo } from "react";
import { useGeneral } from "@/app/_providers/generalProvider";
import { IChallenge } from "@/../services/game/challenges";
import { formatBigNumber } from "@/app/_utils/number";
import { trackEvent } from "@/app/_lib/mixpanel";
import { CustomRightArrow } from "@/app/_assets/svg/right-arrow";

export interface ChallengeCardProps {
  challenge: IChallenge;
}

const ChallengeCard = ({ challenge }: ChallengeCardProps) => {
  const router = useRouter();
  const { myScore } = useGeneral();
  const { title } = useParams();

  const qualifyStatus = useMemo(() => {
    const is_active = challenge?.is_active;
    const balanceAvailable =
      !challenge?.entry_fee || (myScore || 0) >= challenge?.entry_fee;
    const isAvailable = is_active && balanceAvailable;
    return { isAvailable, is_active, balanceAvailable };
  }, [challenge?.entry_fee, challenge?.is_active, myScore]);

  const status = useMemo(() => {
    const participationCount =
      challenge?.score_summary?.participationCount || 0;
    const yourTotalScore = challenge?.score_summary?.yourTotalScore || 0;
    const minimumPoints =
      challenge?.score_summary?.minScoreToBeat ||
      challenge?.score_summary?.minimumPoints ||
      0;

    if (participationCount === 0)
      return { img: SmileImg, text: "Not Yet Entered" };
    else if (yourTotalScore >= minimumPoints) {
      const estimatedPrize = challenge?.score_summary?.estimatedPrize || null;
      return {
        img: GoldSmileImg,
        text: estimatedPrize
          ? `${formatBigNumber(estimatedPrize)} 🥥`
          : "Currently Qualified",
      };
    } else if (!qualifyStatus.balanceAvailable)
      return { img: RocketImg, text: "Improve to Qualify" };

    return { img: SmileImg, text: "Improve Score to Qualify" };
  }, [challenge?.score_summary, qualifyStatus.balanceAvailable]);

  const viewTornament = useCallback(() => {
    router.push(`/game/${title}/tournaments/${challenge.id}`);
    trackEvent(`${title} tournament ${challenge.name} Page`, {
      id: challenge?.id,
      score_summary: challenge?.score_summary,
      game: title,
    });
  }, [challenge.id, challenge.name, challenge?.score_summary, router, title]);

  return (
    <div
      className="rounded-[14px] bg-[#EED1B8] shadow-[0px_2px_0px_0px_rgba(0,0,0,0.16)] flex flex-col gap-1.5 p-2"
    >
      <div className="flex justify-between gap-1.5">
        <button
          className={`rounded-[6px] bg-[#EED1B8] bg-[linear-gradient(0deg,rgba(233,140,0,0.40)_0%,rgba(233,140,0,0.40)_100%)] flex-1 flex justify-start items-center px-4`}
          style={{
            backgroundColor: `${challenge.details?.color}`,
          }}
          onClick={viewTornament}
        >
          <span className="text-[#5F3F57] font-made-tommy text-[14px] font-bold">
            {challenge.name}
          </span>
        </button>
        <button
          onClick={viewTornament}
          className="rounded-[6px] bg-[#7FCA72] flex items-center gap-1 p-1 px-4"
        >
          <span className="text-[#5F3F57] font-made-tommy text-[14px] font-bold">
            Play
          </span>
          <CustomRightArrow color={"#745061"} />
        </button>
      </div>
      <div className="flex justify-between gap-1.5 p-2 rounded-[6px] bg-[#E3BEAA]">
        <div className="flex items-center gap-1 border-r-2 border-r-[#74506140] pl-1 pr-4">
          <Image alt="Prize Image" src={PrizeImage} width={30} height={30} />
          <div className="flex flex-col justify-between">
            <span className="text-[#745061] font-made-tommy text-[10px] font-bold tracking-[0.1px]">
              1st Place Prize
            </span>
            {challenge?.score_summary?.maxPrize ? (
              <span className="text-[#745061] font-made-tommy text-[12px] font-extrabold tracking-[0.12px]">
                {formatBigNumber(challenge?.score_summary?.maxPrize)} 🥥
              </span>
            ) : (
              <span className="text-[#745061] font-made-tommy text-[12px] font-extrabold tracking-[0.12px]">
                ⏳
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 flex-1 pl-1">
          <Image alt="Status image" src={status.img || SmileImg} width={30} />
          <div className="flex flex-col justify-between">
            <span className="text-[#745061] font-made-tommy text-[10px] font-bold tracking-[0.1px]">
              Your Current Prize
            </span>
            <span className="text-[#745061] font-made-tommy text-[12px] font-extrabold tracking-[0.12px]">
              {status.text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
