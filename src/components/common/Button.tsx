import React from "react";

type ButtonProps = {
  label: string;
  onClick: () => void;
  type?: "button" | "submit";
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  className,
}) => {
  return (
    <button className={`btn ${className}`} type={type} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
