"use client";

import React, {
  useState,
  useCallback,
  memo,
  useContext,
  useEffect,
} from "react";
import Image from "next/image";
//import components

//import utils
import { cn } from "@/app/_lib/utils";

//import icons
import item from "@assets/svg/item-star.svg";
import itemClick from "@assets/svg/item-star-click.svg";
import starscore from "@assets/svg/star-score.svg";
import starscoreClick from "@assets/svg/star-score-click.svg";
import inventory from "@assets/svg/inventory.svg";
import inventoryClick from "@assets/svg/inventory-click.svg";

//import images
import forestBack from "@assets/images/forest-back.png";
import mainBack from "@assets/images/main-back.png";
import cosmetic from "@assets/images/cosmetics.png";

import { GeneralContext } from "@/app/_providers/generalProvider";
import CosmeticCard from "@/app/(pages)/(default)/_components/store/cosmetic-card";
import NavigationButton from "@/app/(pages)/(default)/_components/profile/navigateBtn";
import { NavBar } from "@/app/(pages)/(default)/_components/xp/bar";
import DiscountBadge from "@/app/(pages)/(default)/_components/store/discount-badge";
import {
  IStoreItem,
  IStoreItemType,
  useStoreItems,
  useStoreTypes,
} from "@/../services/store";
import PaymentDialog from "../_components/dialogs/payment";

// Types
type StoreCategory = "featured" | "items" | "kokitos" | "social";

// Memoized CosmeticCard component
const MemoizedCosmeticCard = memo(CosmeticCard);

// Memoized NavigationButton component
const MemoizedNavigationButton = memo(NavigationButton);

// Product category buttons component
const ProductCategoryButtons = memo(
  ({
    categories,
    activeCategory,
    onCategoryChange,
    isLoading,
  }: {
    categories: IStoreItemType[];
    activeCategory: string;
    onCategoryChange: (category: IStoreItemType) => void;
    isLoading: boolean;
  }) => (
    <div className="w-full flex gap-x-1 overflow-x-auto">
      {isLoading ? (
        // Loading state
        <div className="w-full flex justify-center py-2">
          <div className="animate-pulse bg-gray-300 h-8 rounded-full w-32"></div>
        </div>
      ) : (
        categories.map((category) => (
          <MemoizedNavigationButton
            key={category.id}
            label={category.name}
            isActive={activeCategory === category.name}
            onClick={() => onCategoryChange(category)}
            className="rounded-full !text-sm !font-normal font-bumper-sticker"
            lableClassName="!text-[14px] font-made-tommy font-bold"
          />
        ))
      )}
    </div>
  )
);

ProductCategoryButtons.displayName = "ProductCategoryButtons";

export default function StorePage() {
  const { sessionId } = useContext(GeneralContext);
  const [activeProductCategory, setActiveProductCategory] =
    useState<IStoreItemType>();
  const [activeCategoryId, setActiveCategoryId] = useState<string | undefined>(
    undefined
  );
  const {
    data: storeItems,
    isLoading: isItemsLoading,
    refetch,
  } = useStoreItems(sessionId, activeCategoryId);
  const { data: storeTypes, isLoading: isTypesLoading } = useStoreTypes();

  const [activeComponent, setActiveComponent] =
    useState<StoreCategory>("featured");

  const [isSkinDialogOpen, setIsSkinDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IStoreItem | null>(null);

  // Categories derived from storeTypes
  const productCategories = React.useMemo(() => {
    if (!storeTypes?.data) return [];
    return storeTypes.data;
  }, [storeTypes]);

  useEffect(() => {
    if (activeCategoryId) {
      refetch();
    }
  }, [activeCategoryId, refetch]);

  // Set initial active category when data loads
  useEffect(() => {
    if (productCategories.length > 0 && !activeProductCategory) {
      setActiveProductCategory(productCategories[0]);
    }
  }, [productCategories, activeProductCategory]);

  // Completely separated open and close functions for the dialog
  const openSkinDialog = useCallback((storeItem: IStoreItem) => {
    setSelectedItem(storeItem);
    setIsSkinDialogOpen(true);
  }, []);

  const closeSkinDialog = useCallback(() => {
    setIsSkinDialogOpen(false);
  }, []);

  const handleCategoryChange = useCallback((category: StoreCategory) => {
    setActiveComponent(category);
  }, []);

  const handleProductCategoryChange = useCallback(
    (category: IStoreItemType) => {
      setActiveProductCategory(category);
      setActiveCategoryId(category.id);
    },
    []
  );

  return (
    <>
      <NavBar title={"Store"} />
      <div
        className={cn(
          "flex flex-col flex-1 h-full items-center p-3 justify-center"
        )}
      >
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
        <div className="bg-[url(/images/board_2.png)] flex flex-col gap-3 bg-cover bg-center fixed top-32 bottom-30 w-[95%] mx-auto z-50 border-2 border-[#FAC485] rounded-3xl p-2 flex-1 overflow-y-auto">
          <div className="bg-[#F5D6B1] rounded-2xl p-3 py-2.5 shadow-md border-2 border-[#A96415] flex flex-col">
            <div className="flex justify-center gap-1.5">
              <MemoizedNavigationButton
                icon={
                  activeComponent === "featured" ? starscoreClick : starscore
                }
                label="Featured"
                isActive={activeComponent === "featured"}
                onClick={() => handleCategoryChange("featured")}
                className="shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)]"
                lableClassName="!text-[15px] font-made-tommy font-bold"
              />
              <MemoizedNavigationButton
                icon={activeComponent === "items" ? itemClick : item}
                label="Items"
                isActive={activeComponent === "items"}
                onClick={() => handleCategoryChange("items")}
                className="shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)]"
                lableClassName="!text-[15px] font-made-tommy font-bold"
              />
              <MemoizedNavigationButton
                icon={
                  activeComponent === "kokitos" ? inventoryClick : inventory
                }
                label="Kokitos"
                isActive={activeComponent === "kokitos"}
                onClick={() => handleCategoryChange("kokitos")}
                className="shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)]"
                lableClassName="!text-[15px] font-made-tommy font-bold"
              />
            </div>
          </div>
          <div className="bg-[#F5D6B1] rounded-2xl p-3 py-2.5 shadow-md border-2 border-[#A96415] flex flex-col flex-1 overflow-y-auto gap-2">
            <ProductCategoryButtons
              categories={productCategories}
              activeCategory={activeProductCategory?.name || ""}
              onCategoryChange={handleProductCategoryChange}
              isLoading={isTypesLoading}
            />
            <div className="w-full flex-1 overflow-y-auto rounded-[7px] border-2 border-[#CDAA98] bg-[#E3BEAA] shadow-[inset_0px_4px_0px_0px_rgba(0,0,0,0.20)] p-2 pt-3">
              {isItemsLoading || isTypesLoading ? (
                // Loading state
                <div className="flex flex-col gap-4 p-4">
                  <div className="animate-pulse bg-[#EED1B8] rounded-[22px] p-4">
                    <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
                    <div className="grid grid-cols-3 gap-4">
                      {[...Array(6)].map((_, index) => (
                        <div
                          key={index}
                          className="h-32 bg-gray-300 rounded"
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full flex flex-col gap-1 bg-[#EED1B8] rounded-[22px] p-3 px-1 overflow-y-auto">
                  <div className="flex justify-start items-center">
                    <span className="text-[#5F3F57] text-[22px] font-bumper-sticker font-normal px-1">
                      {activeProductCategory?.name.toUpperCase()}
                    </span>
                    <DiscountBadge discount={-20} />
                  </div>
                  {storeItems?.data && storeItems?.data.length > 0 ? (
                    <div className="justify-between items-center flex-wrap grid grid-cols-3 gap-1">
                      {storeItems?.data.map((storeItem, index) => {
                        const [title, ...subtitleParts] =
                          storeItem.name.split(" ");
                        const subtitle = subtitleParts.join(" ");

                        return (
                          <MemoizedCosmeticCard
                            key={storeItem.id || index}
                            image={storeItem.details?.icon || cosmetic}
                            title={title}
                            subtitle={subtitle}
                            price={parseFloat(storeItem.price)}
                            showInfo={index === 0}
                            isHot={index === 0}
                            // Critical fix: Use arrow function to pass the click handler correctly
                            onClick={() => openSkinDialog(storeItem)}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex justify-center items-center h-40">
                      <p className="text-[#5F3F57] font-made-tommy">
                        No items available in this category
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Only render the dialog when we have both a selected item and the dialog should be open */}
      {selectedItem && (
        <PaymentDialog
          isOpen={isSkinDialogOpen}
          onClose={closeSkinDialog}
          item={{
            id: selectedItem?.id,
            icon: selectedItem?.details?.icon,
            name: selectedItem?.name,
            title: selectedItem?.type?.name,
            description: selectedItem?.description,
            price: Number(selectedItem.price) || 0,
          }}
        />
      )}
    </>
  );
}
