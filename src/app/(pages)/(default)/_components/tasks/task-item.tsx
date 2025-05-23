"use client";

import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CheckIcon } from "@/app/_assets/svg/check";
import Button from "@/app/_components/shared/button";
import { CopyIcon } from "@/app/_assets/svg/copy";
import { ShareIcon } from "@/app/_assets/svg/share";
import { ITask } from "../../../../../../services/tasks";
import {
  useAddBonusPoints,
  useCheckIfUserInCommunity,
  useCheckUserBonus,
} from "../../../../../../services/bonus";
import { GeneralContext } from "@/app/_providers/generalProvider";
import toast, { LoaderIcon } from "react-hot-toast";
import { trackEvent } from "@/app/_lib/mixpanel";
import { cn } from "@/app/_lib/utils";

interface TaskItemProps {
  title: string;
  reward: string;
  taskNumber: number;
  actionTitle?: string;
  task: ITask;
}

const TaskItem: React.FC<TaskItemProps> = ({
  title,
  reward,
  taskNumber,
  actionTitle,
  task,
}) => {
  const { sessionId, user, addMyScore } = useContext(GeneralContext);
  const isFriend = useMemo(() => reward == "invite_3_friends", [reward]);
  const referrals = useMemo(() => user?.referrals || [], [user?.referrals]);
  const [taskStatus, setTaskStatus] = useState<
    "CLAIMED" | "PENDING" | "FETCHING"
  >("FETCHING");
  const isCompleted = useMemo(() => taskStatus == "CLAIMED", [taskStatus]);

  // queries
  const {
    data,
    refetch: refreshCheckUserBonus,
    isError: isCheckUserBonusError,
  } = useCheckUserBonus({
    userId: sessionId,
    bonusName: task?.bonusName,
  });

  const {
    mutateAsync: addPoints,
    isSuccess,
    isError,
    isPending,
  } = useAddBonusPoints({
    onSuccess: (data: any) => {
      toast.success(task.details?.toast?.success ?? "Bonus added successfully");
      setTaskStatus("CLAIMED");
      refreshCheckUserBonus();
      addMyScore?.(data?.amount || 0);
      trackEvent?.("Score Updated", { score: data?.amount });
    },
    onError: (error: any) => {
      toast.error(error?.response.data.message);
    },
  });

  const { mutateAsync: checkIfUserInCommunity } = useCheckIfUserInCommunity();

  // functions
  const delayedBonus = useCallback(async () => {
    if (typeof window !== "undefined" && task?.details?.link)
      window.open(task?.details?.link, "_blank", "noopener,noreferrer");

    return new Promise(() => {
      setTimeout(() => {
        if (sessionId && taskStatus !== "CLAIMED")
          addPoints({ bonusName: task?.bonusName, sessionId });
      }, 3000);
    });
  }, [sessionId, taskStatus, task?.bonusName, task?.details?.link, addPoints]);

  const handleJoinCommunity = useCallback(async () => {
    try {
      toast.loading("Checking community status...");

      setTaskStatus("FETCHING");
      const res = await checkIfUserInCommunity({ sessionId });
      if (res?.inChannel) {
        refreshCheckUserBonus();
        setTaskStatus("CLAIMED");
        toast.success(
          task.details?.toast?.success ?? "Join telegram community successfully"
        );
      } else {
        setTaskStatus("PENDING");
        toast.error(
          task.details?.toast?.error ??
            "You're not part of the Telegram community yet."
        );

        window.open(
          process.env.NEXT_PUBLIC_COMMUNITY_URL || task?.details?.link,
          "_blank",
          "noopener,noreferrer"
        );
      }
    } catch {
      // console.log(error);
    }
  }, [
    // manageToast,
    checkIfUserInCommunity,
    refreshCheckUserBonus,
    task.details?.toast?.error,
    task.details?.toast?.success,
    sessionId,
  ]);

  const handleInviteAfriend = useCallback(() => {
    if (referrals?.length >= 1) {
      setTaskStatus("FETCHING");
      addPoints({ bonusName: task?.bonusName, sessionId });
    } else
      toast.error(
        `Current invites: ${referrals?.length}. Invite successful when friend joins & checks 1 Koko!`
      );
  }, [referrals, addPoints, sessionId, task?.bonusName]);

  // effects
  useEffect(() => {
    if (data?.data?.status?.toLowerCase?.() === "claimed") {
      setTaskStatus("CLAIMED");
      // cardData?.forEach((item) => {
      //   if (item.bonusId === task.bonusId) {
      //     item.claimed = true;
      //   }
      // });
      // if (updateCardData)
      //   updateCardData(
      //     `${listLabel === "index" ? "kokoTask" : "partnerTask"}`,
      //     task.bonusId
      //   );
    }
    if (data?.data?.status?.toLowerCase?.() === "pending")
      setTaskStatus("PENDING");
    if (isCheckUserBonusError) setTaskStatus("FETCHING");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheckUserBonusError, data?.data?.status]);

  useEffect(() => {
    if (isSuccess) toast.success("Bonus added successfully");
    if (isError) toast.error("Failed to add bonus");
    if (isPending) toast.loading("Adding bonus...");
  }, [isSuccess, isError, isPending]);

  return (
    <div className="rounded-[14px] border border-[#F1DCB8] bg-[#E3BEAA] bg-opacity-50 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.16)] [background:linear-gradient(0deg,rgba(249,227,198,0.50)_0%,rgba(249,227,198,0.50)_100%),#E3BEAA] flex">
      <div
        className={`flex flex-col w-6 rounded-[14px_0px_0px_14px] ${
          !isCompleted ? "bg-[#653F56]" : "bg-[#25BF63]"
        }`}
      >
        <div
          className={`flex flex-col h-6 rounded-[13px_0px_0px_0px] justify-center items-center text-[#EFF6FF] font-made-tommy font-bold text-xs leading-normal tracking-[0.16px] ${
            !isCompleted ? "bg-[#82616B]" : "bg-[#609F70]"
          }`}
        >
          {taskNumber}
        </div>
        <div className="flex flex-1"></div>
      </div>
      <div className="flex flex-col flex-1 justify-around text-[#5F3F57] font-made-tommy font-bold text-base leading-normal tracking-[0.16px] pt-2 pb-1 px-3 gap-y-1">
        <div className="flex flex-col">{title}</div>
        <div className="flex justify-between items-center h-8 rounded-[6px] border-1 border-[#F1DCB8] bg-[#E3BEAA] px-2 pr-1.5">
          <span className="text-sm font-made-tommy font-bold text-[#745061]">
            {reward}
          </span>
          {isCompleted ? (
            <CheckIcon color="#745061" className="w-4 h-4" />
          ) : (
            <Button
              disabled={taskStatus === "FETCHING"}
              onClick={() => {
                setTaskStatus("FETCHING");
                switch (task?.bonusName) {
                  case "telegram_community":
                    handleJoinCommunity();
                    break;
                  case "invite_3_friends":
                    handleInviteAfriend();
                    break;
                  default:
                    delayedBonus();
                    break;
                }
              }}
              className={cn(
                "rounded-[2px] bg-gradient-to-b from-[#24BE62] from-[10%] to-[#1AB257] to-[201.67%] py-0.5",
                "h-5 flex items-center"
              )}
            >
              <span className="text-white text-xs font-bold px-2 py-0 first-letter:uppercase">
                {taskStatus == "FETCHING" ? (
                  <LoaderIcon className="size-4" />
                ) : isFriend ? (
                  "Verify"
                ) : (
                  actionTitle || "Follow"
                )}
              </span>
            </Button>
          )}
        </div>
        {isFriend && !isCompleted && (
          <div className="flex items-center gap-x-1 my-1">
            <Button className="rounded-[2px] bg-gradient-to-b from-[#24BE62] from-[10%] to-[#1AB257] to-[201.67%] py-0.5 w-full flex gap-x-1 items-center justify-center">
              <ShareIcon className="w-3.5 h-3.5" />
              <span className="text-white text-xs font-bold py-[1px]">
                Share
              </span>
            </Button>
            <Button className="rounded-[2px] bg-gradient-to-b from-[#24BE62] from-[10%] to-[#1AB257] to-[201.67%] py-0.5 w-full flex gap-x-1 items-center justify-center">
              <CopyIcon className="w-3.5 h-3.5" />
              <span className="text-white text-xs font-bold py-[1px]">
                Copy Link
              </span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
