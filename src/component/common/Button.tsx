import { type ReactNode } from "react";

interface ButtonProps {
    title: ReactNode;
    onClick: () => void;
    disabled?: boolean;
}

export default function Button({ title, onClick, disabled }: ButtonProps) {
    return <button onClick={onClick} disabled={disabled}>{title}</button>;
}