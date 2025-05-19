import { WinNumberIcon } from "@/app/_assets/svg/win-number";

interface WinningNumbersProps {
  numbers: number[];
}

export const WinningNumbers = ({ numbers }: WinningNumbersProps) => {
  // console.log("Numbers******", numbers);
  const firstRow = numbers.slice(0, 3);
  const secondRow = numbers.slice(3);

  const NumberBall = ({ number }: { number: number }) => (
    <div className="w-16 h-16 flex justify-center items-center">
      <WinNumberIcon className="w-16 h-16 absolute" />
      <span className="text-[#745061] font-made-tommy text-[20px] font-bold leading-normal tracking-[0.56px] text-center pb-2 w-full mt-1.5 z-20">
        {String(number).padStart(3, "0")}
      </span>
    </div>
  );

  return (
    <div className="w-full flex flex-col gap-y-0 px-[18px] py-[5px]">
      {firstRow && (
        <div className="w-full flex justify-start gap-x-3.5">
          {firstRow.map((number, index) => (
            <NumberBall key={index} number={number} />
          ))}
        </div>
      )}
      {secondRow && (
        <div className="w-full flex justify-end gap-x-3.5">
          {secondRow.map((number, index) => (
            <NumberBall key={index} number={number} />
          ))}
        </div>
      )}
    </div>
  );
};
