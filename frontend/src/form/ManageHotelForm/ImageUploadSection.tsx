import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelsForm";

export default function ImageUploadSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
      {/* {existingImageUrls && (
          <div className="grid grid-cols-6 gap-4">
            {existingImageUrls.map((url) => (
              <div className="relative group">
                <img src={url} className="min-h-full object-cover" />
                <button
                  onClick={(event) => handleDelete(event, url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )} */}
       
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (files) => {
                const totalLength =
                files.length 
                // + (existingImageUrls?.length || 0);

              if (totalLength === 0) {
                return "Please upload at least 1 image";
              }
              if (totalLength > 6) {
                return "You can only upload a maximum of 5 images";
              }
            },
          })}
        ></input>
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-sm font-bold">
          {errors.imageFiles.message}
        </span>
      )}
        
    
    </div>
  );
}
