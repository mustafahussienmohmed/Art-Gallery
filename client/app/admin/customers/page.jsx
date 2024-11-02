import { lusitana } from "../../ui/fonts";
import Table from "../../ui/admin/customer/tabel";
import { Suspense } from "react";
import { ProductsTableSkeleton } from "../../ui/skeletons";
import Search from "@/app/ui/admin/search";
export default async function page({}) {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Customer..." />
      </div>
      <Suspense fallback={<ProductsTableSkeleton />}>
        <Table />
      </Suspense>
    </div>
  );
}
