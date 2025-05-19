"use client";

import { ClaimOGSection } from "@/app/(pages)/(default)/_components/tasks/claim-og-section";
import React from "react";
import { useTasks } from "../../../../../../services/tasks";
import { KokoTasksSection } from "@/app/(pages)/(default)/_components/tasks/koko-tasks-section";
import { PartnerSection } from "@/app/(pages)/(default)/_components/tasks/partner-section";

export default function TaskSection({
  tab,
  onMintClick,
}: {
  tab: string;
  onMintClick: () => void;
}) {
  const { data } = useTasks();

  // const [tasks, setTasks] = React.useState<{
  //   kokoTasks?: ITask[];
  //   partnerTasks?: ITask[];
  //   claimogTasks?: ITask[];
  // }>({
  //   kokoTasks: [],
  //   partnerTasks: [],
  //   claimogTasks: [],
  // });

  // useEffect(() => {
  //   if (data?.kokoTasks?.length)
  //     setTasks((p) => ({ ...p, kokoTasks: data?.kokoTasks }));
  //   if (data?.partnerTasks?.length)
  //     setTasks((p) => ({ ...p, partnerTasks: data?.partnerTasks }));
  //   if (data?.claimogTasks?.length)
  //     setTasks((p) => ({ ...p, claimogTasks: data.claimogTasks }));
  // }, [data]);

  if (tab == "Claim OG")
    return (
      <ClaimOGSection
        onMintClick={onMintClick}
        data={data?.claimogTasks || []}
      />
    );
  if (tab == "Koko Tasks")
    return <KokoTasksSection data={data?.kokoTasks || []} />;
  if (tab == "Partner")
    return <PartnerSection data={data?.partnerTasks || []} />;

  return null;
}
