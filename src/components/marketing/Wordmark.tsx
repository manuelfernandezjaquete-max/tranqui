import Image from "next/image";
import Link from "next/link";

export function Wordmark({
  size = "md",
  href = "/",
}: {
  size?: "sm" | "md";
  href?: string;
}) {
  const imgSize = size === "sm" ? 110 : 140;
  const height = size === "sm" ? 46 : 59;

  return (
    <Link href={href} aria-label="Tranqui — inicio">
      <Image
        src="/logo.svg"
        alt="Tranqui"
        width={imgSize}
        height={height}
        priority
      />
    </Link>
  );
}
