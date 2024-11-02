import Form from "@/app/ui/admin/customer/edit-product";

// import { notFound } from "next/navigation";
import {
  fetchCategories,
  fetchProductById,
  fetchProducts,
  fetchUsersById,
} from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/admin/products/breadcrumbs";

export default async function Page({ params }) {
  const id = params.id;
  const [product, categories] = await Promise.all([
    fetchUsersById(id),
    fetchCategories(),
  ]);

  // if (!invoice) {
  //   notFound();
  // }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Customers", href: "/admin/customers" },
          {
            label: "Edit Customer",
            href: `/admin/customers/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form product={product} />
    </main>
  );
}
