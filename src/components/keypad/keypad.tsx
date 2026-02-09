import React, { useState } from "react";
import "./keypad.css";

type KeyType = "digit" | "clear" | "enter";

interface KeyConfig {
    label: string;
    value: string;
    type: KeyType;
}

const CORRECT_CODE = "123";

const keys: KeyConfig[] = [
    { label: "1", value: "1", type: "digit" },
    { label: "2", value: "2", type: "digit" },
    { label: "3", value: "3", type: "digit" },
    { label: "4", value: "4", type: "digit" },
    { label: "5", value: "5", type: "digit" },
    { label: "6", value: "6", type: "digit" },
    { label: "7", value: "7", type: "digit" },
    { label: "8", value: "8", type: "digit" },
    { label: "9", value: "9", type: "digit" },
    { label: "Clear", value: "clear", type: "clear" },
    { label: "0", value: "0", type: "digit" },
    { label: "Enter", value: "enter", type: "enter" },
];

const Keypad: React.FC = () => {
const [value, setValue] = useState<string>("");
const [message, setMessage] = useState<string>("");

const handleClick = (key: KeyConfig) => {
    if (key.type === "clear") {
        setValue("");
        setMessage("");
        return;
    }

    if (key.type === "enter") {
        if (value.length !== 3) {
            return;
        }

        if (value === CORRECT_CODE) {
            setMessage("CORRECT");
        } 
        else {
            setMessage("INCORRECT");
        }

        setTimeout(() => {
            setValue("");
            setMessage("");
        }, 1500);
        return;
    }

    if (value.length < 3) {
        setValue((prev) => prev + key.value);
    }
};

  return (
    <div className="keypad">
        <div className={`display ${message ? "result" : ""}`}>
            {message ? message : value.padEnd(3, "_")}
        </div>

        <div className="keypad-grid">
            {keys.map((key) => (
            <button
                key={key.label}
                className={`key key-${key.type}`}
                onClick={() => handleClick(key)}
            >
                {key.label}
            </button>
            ))}
        </div>
    </div>
  );
};

export default Keypad;
