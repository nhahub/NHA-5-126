import CatalogPage from "../../components/products/CatalogPage";
import useProducts from "../../Helpers/useProducts";

export default function Deals() {
  const { products, loading, error } = useProducts();

  const discountedProducts = products.filter((p) => Number(p.discountPercentage) > 0);

  return (
    <CatalogPage
      eyebrow="Limited Time"
      title="DEALS"
      description="Current discounts across the catalog—grab them before they're gone."
      products={discountedProducts}
      loading={loading}
      error={error}
      showDiscount
    />
  );
}
