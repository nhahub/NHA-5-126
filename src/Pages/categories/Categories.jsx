import CatalogPage from "../../components/products/CatalogPage";
import useProducts from "../../Helpers/useProducts";

export default function Categories() {
  const { products, loading, error } = useProducts();

  return (
    <CatalogPage
      eyebrow="Shop By Type"
      title="CATEGORIES"
      description="From phones to laptops and everything in between—jump straight to the category you need."
      products={products}
      loading={loading}
      error={error}
    />
  );
}
