import { fetchProducts } from "../../../lib/data";

export async function ProductsList() {
  const products = await fetchProducts();

  return (
    <div>
      {products.map((product) => (
        <div>{product.title}</div>
      ))}
      ahmed
    </div>
  );
}
