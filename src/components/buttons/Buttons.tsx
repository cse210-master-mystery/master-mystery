import React, { type ButtonHTMLAttributes } from "react";
import "./Buttons.css";

// Added "round" here
type ButtonVariant = "start" | "secondary" | "danger" | "round";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "start",
  size = "md",
  className = "",
  ...props
}) => {
  const computedClasses = ["btn", `btn-${variant}`, `btn-${size}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={computedClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
