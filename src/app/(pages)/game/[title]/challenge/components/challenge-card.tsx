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
    // router.push(`/game/${title}/challenge/${challenge.id}`);
    router.push(`challenge/${challenge.id}`);
    trackEvent(`${title} challenge ${challenge.name} Page`, {
      id: challenge?.id,
      score_summary: challenge?.score_summary,
      game: title,
    });
  }, [challenge.id, challenge.name, challenge?.score_summary, router, title]);

  return (
    <div
      className="w-full border border-[#F1DCB8] rounded-md bg-[#F1DCB8] overflow-hidden p-2 space-y-2"
      style={{ boxShadow: "0px 2px 0px 0px rgba(0, 0, 0, 0.16)" }}
    >
      <div className="grid grid-cols-12 justify-between w-full gap-2">
        <button
          className={`col-span-9 flex justify-between items-center rounded-md p-1 px-2 font-semibold text-sm text-[#5F3F57]`}
          style={{
            backgroundColor: `${challenge.details?.color}`,
          }}
          onClick={viewTornament}
        >
          {challenge.name}
        </button>
        <button
          onClick={viewTornament}
          className="col-span-3 flex gap-2 items-center justify-center text-md text-[#5F3F57] font-semibold p-[3px] bg-[#7FCA72] rounded-md"
        >
          <span>Play</span>
          <Image alt="Right arrow" src={RightArrow} width={10} />
        </button>
      </div>
      <div className="flex items-center rounded-sm p-2 bg-[#E3BEAA] gap-4 leading-4">
        <div className="flex flex-shrink-0 items-start gap-3">
          <Image alt="Prize Image" src={PrizeImage} width={28} height={38} />
          <div className="text-[#745061] text-[10px] font-semibold">
            1st Place Prize
            <br />
            {challenge?.score_summary?.maxPrize ? (
              <>
                <strong className="text-xs font-bold">
                  {formatBigNumber(challenge?.score_summary?.maxPrize)}
                </strong>
                🥥
              </>
            ) : (
              <>⏳</>
            )}
          </div>
        </div>
        <div className="border border-[#74506140] w-0 h-8"></div>
        <div className="flex items-start gap-3 text-[#745061]">
          <Image alt="Status image" src={status.img || SmileImg} width={31} />
          <div className="text-[10px] font-semibold">
            Your Current Prize
            <br />
            <strong className="text-xs font-bold">{status.text}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
