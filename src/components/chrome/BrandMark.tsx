type Props = {
  /** Pixel size of the square mark. Defaults to 36 (matches the header wordmark stack). */
  size?: number;
  className?: string;
};

/**
 * "DJ" monogram in amber. Used inline next to the wordmark in the header
 * and the mobile sheet. The favicon at app/icon.svg is the same mark in
 * standalone form.
 */
export function BrandMark({ size = 36, className }: Props) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      role="img"
    >
      <rect width="64" height="64" fill="#C8923D" />
      <text
        x="32"
        y="46"
        textAnchor="middle"
        fontFamily='var(--font-barlow), Barlow, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
        fontWeight={600}
        fontSize={38}
        letterSpacing={-1.5}
        fill="#FAF7F2"
      >
        DJ
      </text>
    </svg>
  );
}
