import Image from "next/image";
import { useUser } from "../util/context/context";

const HomeCard = ({ type }: { type: string }) => {
  const data:any = useUser()
  return (
    <div className="rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <h2 className="capitalize text-lg font-normal text-gray-800">{type}</h2>
        <span className="text-xl bg-white px-2 py-1 font-semibold rounded-full text-green-600 cursor-pointer">
          €{data?.investment < 0 ? 0 : data?.investment}
        </span>
      </div>
    </div>
  );
};

export default HomeCard;
