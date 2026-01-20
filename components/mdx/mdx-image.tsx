'use client';

import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import { useMemo } from 'react';

const CDN_PATTERN = /^https?:\/\/images\.sealos\.run/;
const APP_URL_PLACEHOLDER = '__APP_URL__';

type MdxImageSrc =
  | React.ImgHTMLAttributes<HTMLImageElement>['src']
  | { src: string; [key: string]: unknown }
  | { default: { src: string; [key: string]: unknown }; [key: string]: unknown };

const normalizeBaseUrl = (baseUrl: string) => baseUrl.replace(/\/+$/, '');

const getRuntimeBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return normalizeBaseUrl(window.location.origin);
  }
  return normalizeBaseUrl(process.env.NEXT_PUBLIC_APP_URL || '');
};

const resolveImageSrcValue = (src: string) => {
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

const resolveImageSrc = (src: MdxImageSrc) => {
  if (!src) return src;
  if (typeof src === 'string') {
    return resolveImageSrcValue(src);
  }
  if (typeof src === 'object') {
    if ('default' in src && src.default && typeof src.default === 'object') {
      const inner = src.default as { src?: string };
      if (typeof inner.src === 'string') {
        const resolved = resolveImageSrcValue(inner.src);
        if (resolved === inner.src) return src;
        return { ...src, default: { ...inner, src: resolved } };
      }
    }
    if ('src' in src && typeof src.src === 'string') {
      const resolved = resolveImageSrcValue(src.src);
      if (resolved === src.src) return src;
      return { ...src, src: resolved };
    }
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
