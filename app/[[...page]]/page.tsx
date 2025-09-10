import { Builder, builder, BuilderComponent } from '@builder.io/sdk-react';
import type { Metadata } from 'next';

// Initialize Builder SDK with your public API key from environment variables
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Stone & Resin' };
}

interface PageParams {
  page?: string[];
}

export default async function Page({ params }: { params: PageParams }) {
  const urlPath = '/' + (params.page?.join('/') || '');

  const content = await builder
    .get('page', {
      userAttributes: { urlPath },
      cachebust: true,
    })
    .toPromise();

  if (!content && urlPath === '/') {
    return (
      <main>
        <p>Welcome to Stone & Resin</p>
      </main>
    );
  }

  return (
    <main>
      <BuilderComponent model="page" content={content || undefined} />
    </main>
  );
}
