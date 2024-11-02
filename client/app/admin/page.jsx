import { CreateProduct } from "../ui/admin/buttons";
import Search from "../ui/admin/search";
import { lusitana } from "../ui/fonts";
import Table from "../ui/admin/products/tabel";
import { Suspense } from "react";
import { ProductsTableSkeleton } from "../ui/skeletons";
export default async function page({ searchParams }) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Products</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Products..." />
        <CreateProduct />
      </div>
      <Suspense fallback={<ProductsTableSkeleton />}>
        <Table />
      </Suspense>
    </div>
  );
}
