import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export const runtime = 'nodejs';

const CONTENT_ROOT = path.resolve(process.cwd(), 'content');
const MIME_TYPES: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

const isSafePath = (filePath: string) =>
  filePath === CONTENT_ROOT || filePath.startsWith(`${CONTENT_ROOT}${path.sep}`);

export async function GET(
  request: Request,
  { params }: { params: { path?: string[] } },
) {
  const segments = params.path ?? [];
  const filePath = path.resolve(CONTENT_ROOT, ...segments);
  if (!isSafePath(filePath)) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const extension = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[extension];
  if (!contentType) {
    return new NextResponse('Not Found', { status: 404 });
  }

  try {
    const data = await readFile(filePath);
    return new NextResponse(data, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new NextResponse('Not Found', { status: 404 });
  }
}
