import Form from "@/app/ui/admin/orders/edit-product";

// import { notFound } from "next/navigation";
import { fetchCategories, fetchOrdersById, fetchUsers } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/admin/products/breadcrumbs";

export default async function Page({ params }) {
  const id = params.id;
  const [order, users] = await Promise.all([fetchOrdersById(id), fetchUsers()]);

  // if (!invoice) {
  //   notFound();
  // }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Orders", href: "/admin/orders" },
          {
            label: "Edit Order",
            href: `/admin/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form order={order} users={users} />
    </main>
  );
}
