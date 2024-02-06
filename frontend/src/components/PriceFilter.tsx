type Props = {
  selectedPriceRange?: string;
  onChange: (value?: number) => void;
};

const PriceFilter = ({ selectedPriceRange, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Max Price</h4>
      <select
        value={selectedPriceRange}
        onChange={(e) =>
          onChange(e.target.value ? parseInt(e.target.value) : undefined)
        }
        className="rounded-sm w-full p-2 border "
      >
        <option value="">Select Max Price</option>
        {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map(
          (price) => (
            <option key={price} value={price}>
              {price}
            </option>
          )
        )}
      </select>
    </div>
  );
};

export default PriceFilter;
