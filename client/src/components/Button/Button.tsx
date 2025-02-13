import React from "react";
import classNames from "classnames";
import style from "./Button.module.css";

interface IButtonProps {
  type: "button" | "submit" | "reset";
  content: string;
  className?: string;
  onClick?: () => void;
}
export const Button: React.FC<IButtonProps> = ({
  type,
  content,
  className,
  onClick,
}) => {
  return (
    <button
      className={classNames(style.button, className)}
      onClick={onClick}
      type={type}
    >
      {content}
    </button>
  );
};
