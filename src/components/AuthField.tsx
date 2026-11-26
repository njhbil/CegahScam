import { useId, useState } from "react";
import type { ReactNode } from "react";
import { EyeIcon, EyeOffIcon } from "./AuthIcons";

type AuthFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon?: ReactNode;
  type?: "text" | "email" | "password" | "tel";
  name?: string;
  placeholder?: string;
  autoComplete?: string;
  hint?: string;
};

export default function AuthField({
  label,
  value,
  onChange,
  icon,
  type = "text",
  name,
  placeholder,
  autoComplete,
  hint,
}: AuthFieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const isPassword = type === "password";
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-[#26384A]">
        {label}
      </label>

      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5E83A5]">
            {icon}
          </span>
        )}

        <input
          id={id}
          name={name}
          type={isPassword && visible ? "text" : type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-describedby={hint ? hintId : undefined}
          className={`form-input bg-white! py-2! ${icon ? "pl-11" : ""} ${isPassword ? "pr-11" : ""}`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((current) => !current)}
            aria-label={
              visible ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
            }
            className="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#5E83A5] transition hover:bg-[#F5F7FA] hover:text-[#183B56] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47a8e4]/40"
          >
            {visible ? (
              <EyeOffIcon className="h-[18px] w-[18px]" />
            ) : (
              <EyeIcon className="h-[18px] w-[18px]" />
            )}
          </button>
        )}
      </div>

      {hint && (
        <p id={hintId} className="text-xs leading-relaxed text-[#7C8DA0]">
          {hint}
        </p>
      )}
    </div>
  );
}
