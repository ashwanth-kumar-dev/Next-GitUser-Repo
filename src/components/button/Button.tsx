import { ReactNode } from "react";
import "./Button.css";
import Link from "next/link";

type ButtonProps = {
  label?: string | ReactNode;
  variant?: string;
  width?: string;
  disabled?: boolean;
  type?: "button" | "submit";
  link?: string;
  onClick?: () => void;
};

const Button = ({
  label,
  variant,
  width = "w-fit",
  disabled = false,
  type,
  link,
  onClick,
}: ButtonProps) => {

  const buttonStyles = "px-4 py-2 my-2 text-center";
  const handleClick = () => {
    onClick && onClick();
  };
  if (link)
    return (
      <Link href={link} className={`${variant} ${width} ${buttonStyles} no-underline`}>
        {label}
      </Link>
    );
  return (
    <button
      type={type}
      className={`${variant} ${width} ${buttonStyles}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
