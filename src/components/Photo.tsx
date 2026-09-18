import Image from "next/image";

export default function Photo({
  src,
  caption,
  alt,
  width = 640,
  height = 480,
  className,
}: {
  src: string;
  caption?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <figure
      className={`group inline-block overflow-hidden rounded-lg border-2 border-fg bg-surface shadow-[5px_5px_0_0_var(--color-fg)] transition-all duration-300 ${className ?? ""}`}
    >
      <Image
        src={src}
        alt={alt ?? caption ?? "photo"}
        width={width}
        height={height}
        unoptimized
        loading="lazy"
        className="max-w-full grayscale transition-all duration-300 group-hover:grayscale-0"
      />
      {caption && (
        <figcaption className="px-3 py-2 text-center font-hand text-lg leading-tight text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
