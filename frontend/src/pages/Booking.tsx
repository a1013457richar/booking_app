import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import BookingForm from "../form/BookingForm/BookingForm";
import { useSearchContext } from "../contexts/Search";
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import { useAppContext } from "../contexts/AppContext";
import { Elements } from "@stripe/react-stripe-js";
const Booking = () => {
  const { stripePromise } = useAppContext();
  const search = useSearchContext();
  const { hotelId } = useParams();
  const [clientSecret, setClientSecretKey] = useState("");

  const [numberOfNights, setNumberofNight] = useState<number>(0);
  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const night =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);
      setNumberofNight(Math.ceil(night));
    }
  }, [search.checkIn, search.checkOut]);

  const {
    data: paymentIntentData,
    error,
    isError,
  } = useQuery(
    ["fetchPaymentIntent", hotelId, numberOfNights],
    () =>
      apiClient.createPaymentIntent(
        hotelId as string,
        numberOfNights.toString()
      ),
    {
      enabled: !!hotelId && numberOfNights > 0,
      onSuccess: (data) => {
        setClientSecretKey(data.clientSecret);
      },
    }
  );
  if (isError) {
    console.error(error);
    // 在UI中顯示錯誤信息
  }
  const elementsOptions = useMemo(
    () => ({
      clientSecret: paymentIntentData?.clientSecret,
    }),
    [paymentIntentData?.clientSecret]
  ); // 使用clientSecretKey和paymentIntentData?.clientSecret作為依賴，確保每次clientSecret更新時重新計算

  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );
  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );

  if (!hotel) return <></>;

  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />
      {currentUser && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={elementsOptions}
          key={clientSecret}
        >
          <BookingForm
            currentUser={currentUser}
            paymentIntent={paymentIntentData}
          />
        </Elements>
      )}
    </div>
  );
};

export default Booking;
