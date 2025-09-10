"use client";
import Image from 'next/image';

type Props = {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
};

export default function CloudImage({ url, alt = '', width = 800, height = 600, className }: Props) {
  return (
    <Image src={url} alt={alt} width={width} height={height} className={className} />
  );
}
