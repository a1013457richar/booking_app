import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/Search";
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultsCard from "../components/SearchResult";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelType from "../components/HotelType";
import Facilites from "../components/Facilites";
import PriceFilter from "../components/PriceFilter";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
    apiClient.searchHotels(searchParams)
  );
  const handleStarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const star = event.target.value;
    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, star]
        : prevStars.filter((s) => s !== star)
    );
  };

  const handlehHotelTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelType = event.target.value;
    setSelectedHotelTypes((preHotel) =>
      event.target.checked
        ? [...preHotel, hotelType]
        : preHotel.filter((hotelTypes) => hotelTypes !== hotelType)
    );
  };
  const handlehHotelFacilitesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelFacilites = event.target.value;
    setSelectedHotelTypes((facilites) =>
      event.target.checked
        ? [...facilites, hotelFacilites]
        : facilites.filter((hotelTypes) => hotelTypes !== hotelFacilites)
    );
  };

  return (
    <div className="grid gird-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filters by:
          </h3>
          <StarRatingFilter
            selectStar={selectedStars}
            onChange={handleStarChange}
          />
          <HotelType
            selectedHotelTypes={selectedHotelTypes}
            onChange={handlehHotelTypeChange}
          />
          <Facilites
            selectedFacilities={selectedFacilities}
            onChange={handlehHotelFacilitesChange}
          />
          <PriceFilter
            selectedPriceRange={selectedPrice?.toString()}
            onChange={(value?: number) => setSelectedPrice(value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 ">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total} hotels found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="rounded-md p-2 border"
          >
            <option value="">Sort by</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">
              Price per Night(low to high)
            </option>
            <option value="pricePerNightDesc">
              Price per Night(high to low)
            </option>
          </select>
        </div>
        {hotelData?.data.map((hotel) => (
          <SearchResultsCard hotel={hotel} />
        ))}
        <div>
          <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
