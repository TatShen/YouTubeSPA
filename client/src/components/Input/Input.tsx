import React, { ChangeEvent } from "react";
import style from "./Input.module.css";

interface IInputProps {
  type: string;
  label?: string;
  icon?: React.ReactNode;
  handler?: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string;
  className?: string;
  onClick?: () => void;
  value: string
}
export const Input: React.FC<IInputProps> = ({
  type,
  label,
  icon,
  handler,
  placeholder,
  className,
  onClick,
}) => {
  return (
    <div className={style.input_container}>
      <p className={style.label}>{label}</p>
      <div className={style.input_div}>
        <input
          placeholder={placeholder}
          type={type}
          onChange={handler}
          className={className}
        />
        {icon && (
          <span className={style.icon} onClick={onClick}>
            {icon}
          </span>
        )}
      </div>
    </div>
  );
};
