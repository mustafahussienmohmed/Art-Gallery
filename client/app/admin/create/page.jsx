import Form from "../../ui/admin/products/create-form";
import Breadcrumbs from "../../ui/admin/products/breadcrumbs";
import { fetchCategories } from "../../lib/data";

export default async function Page() {
  const categories = await fetchCategories();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Products", href: "/admin" },
          {
            label: "Create Product",
            href: "/admin/create",
            active: true,
          },
        ]}
      />
      <Form categories={categories} />
    </main>
  );
}
