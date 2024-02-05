import { FormProvider, useForm } from "react-hook-form";
import DetailSection from "./DetailSection";
import TypeSelection from "./TypeSelection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImageUploadSection from "./ImageUploadSection";
import { HotelType } from "../../../../backend/src/shared/types";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
};

type Props = {
  hotel?: HotelType;
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};

const ManageHotelsForm = ({onSave,isLoading}:Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit } = formMethods
  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    // console.log(formDataJson)
  const formData= new FormData()
//   if (hotel) {
//     formData.append("hotelId", hotel._id);
//   }
  formData.append("name", formDataJson.name);
  formData.append("city", formDataJson.city);
  formData.append("country", formDataJson.country);
  formData.append("description", formDataJson.description);
  formData.append("type", formDataJson.type);
  formData.append("pricePerNight", formDataJson.pricePerNight.toString());
  formData.append("starRating", formDataJson.starRating.toString());
  formData.append("adultCount", formDataJson.adultCount.toString());
  formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility,index) => {
        formData.append(`facilities${index}`, facility);
    });

    Array.from(formDataJson.imageFiles).forEach((file) => {
      formData.append(`imageFiles`, file);
    }
    );

    onSave(formData);



  })
  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailSection/>
        <TypeSelection/>
        <FacilitiesSection/>
        <GuestsSection/>
        <ImageUploadSection/>

        <span className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
          >
           
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelsForm;