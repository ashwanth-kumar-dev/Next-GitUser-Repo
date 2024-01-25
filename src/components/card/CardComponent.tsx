import Image from "next/image";
import './CardComponent.css'

type CardComponentProps = {
  cardImage?: string;
  cardTitle?: string;
  cardDescription?: string | JSX.Element;
  children?: React.ReactNode;
  roundedImage?: boolean;
};

const CardComponent = ({
  cardImage,
  cardTitle,
  cardDescription,
  children,
  roundedImage,
}: CardComponentProps) => {
  return (
    <div className="bg-white py-2 rounded-lg max-w-md mt-3 card-component-container text-center">
      {cardImage && (
        <Image src={cardImage} height={200} width={200} alt="card.img" className={`m-auto ${roundedImage ? `rounded-full` : ''}`}/>
      )}
      <div className="card-header w-fit h-11 text-center m-auto pt-3">
        <h1 className=" text-2xl font-bold inline text-black">{cardTitle}</h1>
      </div>
      <p className="flex text-gray-600 m-auto w-fit min-h-20 items-center">{cardDescription}</p>
      {children && <div className="px-8 pb-8">{children}</div>}
    </div>
  );
};
export default CardComponent;
