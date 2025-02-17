import { LuPlus, LuX } from "react-icons/lu";
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

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		file && setImage(file);
	};

	useEffect(() => {
		handleUpload();
	}, [image]);

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

	const removeUrl = (url: string) => {
		const newUrls = imageUrls.filter((element) => element !== url);
		setImageUrls(newUrls);
	};

	// Create a popover when the image is selected to preview and crop?
	//
	// {image && (
	// 	<div className="relative w-32 h-32 bg-gray-300 rounded-md overflow-clip">
	// 		<Image
	// 			src={URL.createObjectURL(image)}
	// 			fill={true}
	// 			className="object-cover"
	// 			alt="Uploaded Image"
	// 		/>
	// 	</div>
	// )}

	return (
		<div className="flex flex-col gap-2 w-full">
			<h2 className="text-sm text-gray-500">Images</h2>

			<div className="flex flex-wrap gap-4 p-4 bg-white rounded-lg w-fit">
				{imageUrls.map((url) => {
					return (
						<div className="stack group" key={url}>
							<div className="relative w-32 h-32 bg-gray-300 rounded-md">
								<Image
									src={url}
									fill={true}
									className="object-contain aspect-square"
									alt="Uploaded Image"
								/>
							</div>

							<button
								type="button"
								className="z-10 justify-self-end self-start w-10 h-10 text-red-500 rounded-full stack"
								onClick={() => removeUrl(url)}
							>
								<LuX size={24} />
							</button>
						</div>
					);
				})}

				{isLoading && (
					<div className="w-32 h-32 bg-gray-50 rounded-lg border-2 border-gray-300 stack">
						<MoonLoader color="#000000" size={20} loading={isLoading} />
					</div>
				)}

				<label
					htmlFor="dropzone-file"
					className="flex flex-col justify-center items-center w-32 h-32 bg-gray-50 rounded-lg border-4 border-gray-300 border-dotted cursor-pointer"
				>
					<div className="flex flex-col gap-2 justify-center items-center text-gray-500 dark:text-gray-400">
						<LuPlus size={24} />
						<p className="text-sm">JPG or PNG</p>
					</div>

					<input
						id="dropzone-file"
						type="file"
						className="hidden"
						accept=".jpg, .jpeg, .png"
						onChange={handleFileChange}
					/>
				</label>
			</div>
		</div>
	);
}
