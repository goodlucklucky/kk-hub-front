import { formatBigNumber, formatNumber } from "@/app/_utils/number";
import { ResultType } from "./result-details";

const ResultCard = ({
  titleColor,
  name,
  yourScore,
  bestScore,
  yourPrize,
}: ResultType) => {
  return (
    <div
      className=" bg-[#EED1B8] border border-[rgba(250,238,210,0.65)] rounded-2xl p-2 space-y-2 text-[#5F3F57]"
      style={{ boxShadow: "0px 2px 0px 0px rgba(0, 0, 0, 0.16)" }}
    >
      <div
        className="inline rounded-lg text-sm font-semibold px-2 py-1"
        style={{
          backgroundColor: titleColor,
        }}
      >
        {name}
      </div>
      {yourScore === null ? (
        <p className="bg-[#E3BEAA] py-1 px-2 rounded-lg text-xs font-semibold">
          No Participation
        </p>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-1 rounded-lg overflow-hidden text-center">
            <div>
              <p className="text-xs font-bold py-[6px] bg-[#906C74]/30">
                Your Score
              </p>
              <p className="text-base font-semibold py-[6px] bg-[#E3BEAA]">
                {yourScore}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold py-[6px] bg-[#906C74]/30">
                1st Place Score
              </p>
              <p className="text-base font-semibold py-[6px] bg-[#E3BEAA]">
                {bestScore === null ? "-" : formatNumber(bestScore)}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold py-[6px] bg-[#906C74]/30">
                Your Prize
              </p>
              <p className="text-base font-semibold py-[6px] bg-[#E3BEAA]">
                {yourPrize === null ? "-" : `${formatBigNumber(yourPrize)} 🥥`}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ResultCard;
