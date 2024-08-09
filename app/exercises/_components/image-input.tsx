"use client";

import { LuPlus } from "react-icons/lu";
import React, { useState, useEffect } from "react";
import { useImageUpload } from "@/contexts/image-upload";
import Image from "next/image";
import { MoonLoader } from "react-spinners";

interface ImageInputProps {
  imageUrls: string[];
  setImageUrls: (input: string[]) => void;
}

export default function ImageInput({
  imageUrls,
  setImageUrls,
}: ImageInputProps) {
  const [image, setImage] = useState<File | null>(null);
  const { uploadImage } = useImageUpload();
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    handleUpload();
  }, [image]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleUpload = async () => {
    if (image) {
      setLoading(true);
      try {
        const url = await uploadImage(image);
        setImageUrls([...imageUrls, url]);
      } catch (error) {
        console.error("Failed to upload image:", error);
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col-reverse gap-4">
      <div className="grid grid-cols-2 gap-4 p-4 bg-gray-200 rounded-lg peer">
        {imageUrls.map((url, index) => {
          return (
            <div
              className="relative w-36 h-36 bg-gray-200 rounded-md overflow-clip"
              key={index}
            >
              <Image
                src={url}
                fill={true}
                className="object-cover"
                alt="Uploaded Image"
              />
            </div>
          );
        })}
        <div className="flex justify-center items-center w-full">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center w-36 h-36 bg-gray-50 rounded-lg border-2 border-gray-300">
              <MoonLoader color="#000000" size={36} loading={isLoading} />
            </div>
          ) : (
            <label className="flex flex-col justify-center items-center w-36 h-36 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:scale-[1.02]">
              <div className="flex flex-col justify-center items-center">
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <LuPlus size={32} />
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  JPG or PNG
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept=".jpg, .jpeg, .png"
                onChange={handleFileChange}
              />
            </label>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center w-24 h-8 text-lg bg-transparent rounded-full peer-[:hover]:bg-gray-300">
        <p>Images</p>
      </div>
    </div>
  );
}
