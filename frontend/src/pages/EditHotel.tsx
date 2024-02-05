import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelsForm from "../form/ManageHotelForm/ManageHotelsForm";
import { useAppContext } from "../contexts/AppContext";


const EditHotel = () => {
    const {showToast}=useAppContext()
  const { hotelId } = useParams();
  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId || ""),
    {
      enabled: !!hotelId, //has to be true to run the query
    }
  );
  const { mutate, isLoading } = useMutation(apiClient.updateHotel, {
    onSuccess: () => {
        showToast({
            message:"Hotel updated successfully",
            type:"SUCCESS"
        })
    },
    onError: () => {
        showToast({
            message:"Hotel updated failed",
            type:"ERROR"
        })
    },
  });
  const handleSubmit = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <ManageHotelsForm
      hotel={hotel}
      onSave={handleSubmit}
      isLoading={isLoading}
    />
  );
};

export default EditHotel;
