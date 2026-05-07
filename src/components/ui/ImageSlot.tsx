import Image from "next/image";

type Props = {
  /** When unset the muted placeholder is shown instead of an image. */
  src?: string;
  alt: string;
  /** Hint text rendered inside the placeholder. */
  placeholder?: string;
  shape?: "rect" | "square";
  /** Filter preset that mirrors the design prototype's color treatment. */
  filter?: "low" | "mid";
  className?: string;
  priority?: boolean;
};

/**
 * Drops in where the prototype used <image-slot>. With no `src` it renders the
 * same muted block as the design; pass `src` (relative path under /public) once
 * the real photography lands.
 */
export function ImageSlot({
  src,
  alt,
  placeholder,
  shape = "rect",
  filter = "low",
  className,
  priority,
}: Props) {
  const classes = [
    "image-slot",
    filter === "low" ? "saturate-low" : "saturate-mid",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} data-shape={shape}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 880px) 100vw, 50vw"
          priority={priority}
        />
      ) : (
        <span className="placeholder">{placeholder ?? alt}</span>
      )}
    </div>
  );
}
