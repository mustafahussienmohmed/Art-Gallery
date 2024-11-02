import Form from "@/app/ui/admin/products/edit-product";

// import { notFound } from "next/navigation";
import {
  fetchCategories,
  fetchProductById,
  fetchProducts,
} from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/admin/products/breadcrumbs";

export default async function Page({ params }) {
  const id = params.id;
  const [product, categories] = await Promise.all([
    fetchProductById(id),
    fetchCategories(),
  ]);

  // if (!invoice) {
  //   notFound();
  // }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Products", href: "/admin" },
          {
            label: "Edit Product",
            href: `/admin/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form product={product} categories={categories} />
    </main>
  );
}
