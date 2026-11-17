import CatalogPage from "../components/products/CatalogPage";
import useProducts from "../Helpers/useProducts";

export default function ProductsPage() {
  const { products, loading, error } = useProducts();

  return (
    <CatalogPage
      eyebrow="The Complete Edit"
      title="ALL PRODUCTS"
      description="Useful, beautiful technology—selected for how well it fits into real life."
      products={products}
      loading={loading}
      error={error}
    />
  );
}
