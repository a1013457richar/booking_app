type Props = {
  selectStar: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const StarRatingFilter = ({ selectStar, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Property Rating</h4>
      {[5, 4, 3, 2, 1].map((star) => (
        <label key={star} className="flex items-center space-x-2">
          <input
            type="checkbox"
            value={star.toString()}
            checked={selectStar.includes(star.toString())}
            onChange={onChange}
          />
          <span>{star} stars</span>
        </label>
      ))}
    </div>
  );
};

export default StarRatingFilter;
