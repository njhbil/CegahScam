import { useAuth } from "../context/AuthContext";
import { AVATARS } from "../lib/avatars";
import type { AvatarId } from "../lib/avatars";

export default function Avatar({
  className,
  variant,
}: {
  className: string;
  variant?: AvatarId;
}) {
  const { avatar } = useAuth();
  const option = AVATARS.find((item) => item.id === (variant ?? avatar)) ?? AVATARS[0];

  return (
    <span
      aria-hidden="true"
      className={`relative block shrink-0 overflow-hidden rounded-full ${option.bg} ${className}`}
    >
      <img
        src={option.src}
        alt=""
        draggable={false}
        className={`absolute max-w-none -translate-x-1/2 select-none ${option.img}`}
      />
    </span>
  );
}
