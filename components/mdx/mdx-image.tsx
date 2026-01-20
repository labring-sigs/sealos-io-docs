'use client';

import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import { useMemo } from 'react';

const CDN_PATTERN = /^https?:\/\/images\.sealos\.run/;
const APP_URL_PLACEHOLDER = '__APP_URL__';

const normalizeBaseUrl = (baseUrl: string) => baseUrl.replace(/\/+$/, '');

const getRuntimeBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return normalizeBaseUrl(window.location.origin);
  }
  return normalizeBaseUrl(process.env.NEXT_PUBLIC_APP_URL || '');
};

const resolveImageSrc = (src?: string) => {
  if (!src) return src;
  const runtimeBase = getRuntimeBaseUrl();
  if (!runtimeBase) return src;
  if (src.includes(APP_URL_PLACEHOLDER)) {
    return src.replace(APP_URL_PLACEHOLDER, runtimeBase);
  }
  if (CDN_PATTERN.test(src)) {
    return src.replace(CDN_PATTERN, runtimeBase);
  }
  return src;
};

export function MdxImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { className, src, ...rest } = props;
  const resolvedSrc = useMemo(() => resolveImageSrc(src), [src]);
  const mergedClassName = ['rounded-xl', className].filter(Boolean).join(' ');

  return (
    <ImageZoom
      {...(rest as any)}
      src={resolvedSrc}
      className={mergedClassName}
    />
  );
}
