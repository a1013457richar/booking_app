import { useMutation } from "react-query";
import ManageHotelsForm from "../form/ManageHotelForm/ManageHotelsForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";
import { useNavigate } from "react-router-dom";

const AddHotels = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const { mutate, isLoading } = useMutation(apiClient.addHotel, {
    onSuccess: () => {
      showToast({
        message: "Hotel added successfully",
        type: "SUCCESS",
      });
      navigate("/my-hotels");
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
