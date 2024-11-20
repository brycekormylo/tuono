"use client";

import React, { createContext, useContext, ReactNode } from "react";

interface ImageUploadContextProps {
  uploadImage: (file: File) => Promise<string>;
}

const ImageUploadContext = createContext<ImageUploadContextProps | undefined>(
  undefined,
);

interface ImageUploadProviderProps {
  children: ReactNode;
}

export const ImageUploadProvider = ({ children }: ImageUploadProviderProps) => {
  const uploadImage = async (file: File): Promise<string> => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!apiKey) throw new Error("ImgBB API Key is not set");

    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      },
    );

    const result = await response.json();
    if (result.error) throw new Error(result.error.message);

    return result.data.url;
  };

  return (
    <ImageUploadContext.Provider value={{ uploadImage }}>
      {children}
    </ImageUploadContext.Provider>
  );
};

export const useImageUpload = () => {
  const context = useContext(ImageUploadContext);
  if (!context) {
    throw new Error(
      "useImageUpload must be used within an ImageUploadProvider",
    );
  }
  return context;
};
