import { LuPlus } from "react-icons/lu";
import { useState, useEffect, type ChangeEvent } from "react";
import { useImageUpload } from "@/utils/image-upload";
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

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
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
		<div className="flex flex-col gap-2">
			<h2 className="text-sm text-gray-500">Images</h2>
			<div className="flex gap-4 p-2 bg-gray-200 rounded-lg peer">
				{imageUrls.map((url) => {
					return (
						<div
							className="relative w-20 h-20 bg-gray-200 rounded-md overflow-clip"
							key={url}
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
						<div className="flex flex-col justify-center items-center w-20 h-20 bg-gray-50 rounded-lg border-2 border-gray-300">
							<MoonLoader color="#000000" size={20} loading={isLoading} />
						</div>
					) : (
						<label className="flex flex-col justify-center items-center w-20 h-20 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:scale-[1.02]">
							<div className="flex flex-col justify-center items-center">
								<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
									<LuPlus size={24} />
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
		</div>
	);
}
