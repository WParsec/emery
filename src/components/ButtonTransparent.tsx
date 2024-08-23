import Image from "next/image";
import plus from "@/assets/icons/plus.png";

type ButtonTransparentProps = {
  handleClick: () => void;
  title: string;
};

const ButtonTransparent = ({ handleClick, title }: ButtonTransparentProps) => {
  return (
    <button
      onClick={handleClick}
      className="transition-colors duration-300 text-sm pl-4 py-1 rounded-lg flex gap-2 items-center bg-transparent"
    >
      {title} <Image src={plus} alt="Plus Icon" width={24} height={24} />
    </button>
  );
};

export default ButtonTransparent;
