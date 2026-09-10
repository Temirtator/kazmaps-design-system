"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { TextInput, type TextInputProps } from "./text-input";

export type PasswordInputProps = Omit<TextInputProps, "type" | "trailing">;

export function PasswordInput({ ...rest }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <TextInput
      {...rest}
      type={visible ? "text" : "password"}
      trailing={
        <button
          type="button"
          aria-label={visible ? "Скрыть пароль" : "Показать пароль"}
          aria-pressed={visible}
          onClick={() => {
            setVisible((v) => !v);
          }}
          className="flex size-8 items-center justify-center rounded-[6px] text-(color:--text-tertiary) transition-interactive focus-ring hover:text-(color:--text-primary)"
        >
          {visible ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
        </button>
      }
    />
  );
}
