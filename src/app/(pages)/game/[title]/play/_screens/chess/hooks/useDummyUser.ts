import { useState, useEffect } from "react";
import profile2 from "@assets/images/chess-profile-2.png";
import profile1 from "@assets/images/chess-profile-1.jpg";

interface DummyUser {
  name: string;
  photo_url: string;
  level: number;
}

const saveImageLocally = async (imageUrl: string): Promise<string> => {
  try {
    const response = await fetch(imageUrl, { mode: "cors" });

    if (!response.ok) {
      throw new Error("Image fetch failed");
    }

    const blob = await response.blob();
    const fileReader = new FileReader();

    return new Promise((resolve) => {
      fileReader.onload = () => {
        const base64Data = fileReader.result as string;
        const savedFilePath = `/saved_images/dummy_user_${Date.now()}.png`; // Simulated local path
        localStorage.setItem(savedFilePath, base64Data); // Simulate saving locally
        resolve(savedFilePath);
      };
      fileReader.readAsDataURL(blob);
    });
  } catch (error) {
    // console.warn("Failed to save image locally:", error);
    throw error;
  }
};

const useDummyUser = () => {
  const [dummyUser, setDummyUser] = useState<DummyUser>({
    name: "",
    photo_url: "",
    level: 0,
  });

  useEffect(() => {
    const fetchDummyUser = async () => {
      const userData: DummyUser = {
        name: `User_${Math.floor(Math.random() * 1000)}`,
        photo_url: "https://i.pravatar.cc/250",
        level: Math.floor(Math.random() * 10) + 1,
      };

      try {
        const savedPhotoUrl = await saveImageLocally(userData.photo_url);
        // console.log("Saved photo URL:", savedPhotoUrl);

        setDummyUser({ ...userData, photo_url: savedPhotoUrl });
      } catch {
        // console.warn("Falling back to default image due to error");

        // fallback to local asset
        const fallbackImages = [profile1.src, profile2.src];
        const fallbackPhoto =
          fallbackImages[Math.floor(Math.random() * fallbackImages.length)];

        setDummyUser({ ...userData, photo_url: fallbackPhoto });
      }
    };

    fetchDummyUser();
  }, []);

  return dummyUser;
};

export default useDummyUser;
