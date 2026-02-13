import React, { type ButtonHTMLAttributes } from "react";
import "./Button.css";

type ButtonVariant = "start" | "round";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "start",
  className = "",
  ...props
}) => {
  const computedClasses = ["btn", `btn-${variant}`, className].filter(Boolean).join(" ");

  return (
    <button className={computedClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
