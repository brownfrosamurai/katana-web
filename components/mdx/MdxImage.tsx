import Image from 'next/image';
import { cn } from '@/lib/utils';

interface MdxImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function MdxImage({ src, alt, width = 1200, height = 675, className }: Readonly<MdxImageProps>) {
  return (
    <span className={cn('my-6 block w-full overflow-hidden', className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-auto w-full object-cover"
        sizes="(max-width: 1280px) 100vw, 1280px"
        loading="lazy"
      />
    </span>
  );
}
