import { notFound } from 'next/navigation';

import { fetchProductBySlug } from '@/lib/fetchProduct';
import { handlePreviewStatus } from '@/utils/handlePreviewStatus';
import { ProductPage } from '@/components';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Page = async ({ params, searchParams }: PageProps) => {
  const paramsData = await params;
  const searchParamsData = await searchParams;
  const status = await handlePreviewStatus(searchParamsData?.status as string);
  const product = await fetchProductBySlug(paramsData?.slug, status);

  if (!product) {
    notFound();
  }
  return (
    <main>
      <ProductPage data={product as any} />
    </main>
  );
};

export default Page;
