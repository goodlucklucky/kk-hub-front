import {
  ISkin,
  useSkinActivate,
  useSkinDisactivate,
  useSkins,
} from "../services/cousmetics";
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { DEFAULT_SKIN } from "../constants";
import toast from "react-hot-toast";
import { IFeature, useFeatureStatus } from "../services/beta-tester";
import { ICheckUserBonus2, useCheckUserBonuses } from "../services/bonus";
import { UseQueryResult } from "@tanstack/react-query";
import { GeneralContext } from "@/app/_providers/generalProvider";
import { bonusNames } from "../components/challenge-bonus-dialog";

interface ISnakeContext {
  skins?: ISkin[];

  activeSkin?: string;
  setActiveSkin?: Setter<string>;
  refreshSkins?: () => Promise<ISkin[] | undefined>;
  changeActiveSkin?: (_skin: ISkin) => Promise<void>;
  snakeSkinFeature?: IFeature;
  snakeSkinFeatureLoading?: boolean;
  freeEntryBonuses?: UseQueryResult<ICheckUserBonus2, Error>[];
}

export const SnakeContext = createContext<ISnakeContext>({});

export const SnakeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { sessionId } = useContext(GeneralContext);
  const { data: skinsData, refetch } = useSkins(sessionId);
  const { mutateAsync: skinActivate } = useSkinActivate();
  const { mutateAsync: skinDisactivate } = useSkinDisactivate();
  const [activeSkin, setActiveSkin] = useState("Regular");
  const { data: snakeSkinFeature, isLoading: snakeSkinFeatureLoading } =
    useFeatureStatus("snake-skins");
  const abortController = useMemo(() => new AbortController(), []);

  const freeEntryBonuses = useCheckUserBonuses(
    sessionId,
    bonusNames,
    abortController
  );

  const changeActiveSkin = useCallback(
    async (skin: ISkin) => {
      try {
        if (!skin?.user_items?.id && !skin?.is_default) {
          toast.error("Skin Must be purchased first");
          return;
        }

        setActiveSkin(skin?.name);

        if (skin?.user_items?.id)
          await skinActivate({ id: skin?.user_items?.id });
        else if (skin?.is_default) await skinDisactivate({ sessionId });
      } catch {
        // console.log(error);
      }
    },
    [sessionId, skinActivate, skinDisactivate]
  );

  const refreshSkins = useCallback(async () => {
    try {
      const out = await refetch();
      return out?.data?.data?.data;
    } catch {
      // console.log(error);
    }
  }, [refetch]);

  useEffect(() => {
    if (
      snakeSkinFeature?.status !== "active" &&
      !(snakeSkinFeature?.status == "testing")
    ) {
      setActiveSkin("Regular");
      return;
    }

    const active = skinsData?.data?.data?.find(
      (one) => !!one?.user_items?.activated
    );

    if (active) {
      setActiveSkin(active?.skin_url);
      return;
    }

    const defaultSkin = skinsData?.data?.data?.find((one) => !!one?.is_default);

    if (defaultSkin) {
      setActiveSkin(defaultSkin?.skin_url);
      return;
    }

    setActiveSkin(DEFAULT_SKIN);
  }, [skinsData?.data?.data, snakeSkinFeature?.status]);

  return (
    <SnakeContext.Provider
      value={{
        activeSkin,
        setActiveSkin,
        skins: skinsData?.data?.data,
        changeActiveSkin,
        refreshSkins,
        snakeSkinFeature,
        snakeSkinFeatureLoading,
        freeEntryBonuses,
      }}
    >
      {children}
    </SnakeContext.Provider>
  );
};
