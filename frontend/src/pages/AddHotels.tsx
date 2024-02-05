import { useMutation } from "react-query";
import ManageHotelsForm from "../form/ManageHotelForm/ManageHotelsForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";

const AddHotels = () => {
  const { showToast } = useAppContext();
  const { mutate, isLoading } = useMutation(apiClient.addHotel, {
    onSuccess: () => {
      showToast({
        message: "Hotel added successfully",
        type: "SUCCESS",
      });
    },
    onError: () => {
      showToast({
        message: "Hotel could not be added",
        type: "ERROR",
      });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };
  return <ManageHotelsForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddHotels;
