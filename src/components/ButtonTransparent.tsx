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
      className="text-xs px-4 py-2 rounded-lg flex gap-2 items-center"
    >
      {title} <Image src={plus} alt="Plus Icon" width={24} height={24} />
    </button>
  );
};

export default ButtonTransparent;
