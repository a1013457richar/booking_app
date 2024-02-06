import { hotelFacilities } from "../config/hotel-options-config";

type Props = {
  selectedFacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Facilites = ({ selectedFacilities, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Hotel Facilites</h4>
       {hotelFacilities.map((hotelFacilites) => (
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={hotelFacilites}
            checked={selectedFacilities.includes(hotelFacilites)}
            onChange={onChange}
          />
          <span>{hotelFacilites}</span>
        </label>
      ))}
    </div>
  );
};

export default Facilites;
