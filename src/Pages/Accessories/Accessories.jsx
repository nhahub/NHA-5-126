import CatalogPage from "../../components/products/CatalogPage";
import accessoriesImg from "../../assets/images/accessories.jpg";

const accessoriesProducts = [
  {
    id: 9002,
    title: "Everyday Essentials Kit",
    brand: "Apple",
    category: "mobile-accessories",
    price: 249,
    rating: 4.7,
    tags: ["curated set"],
    reviews: new Array(73).fill({}),
    thumbnail: accessoriesImg,
  },
];

export default function Accessories() {
  return (
    <CatalogPage
      eyebrow="The complete edit"
      title="ALL PRODUCTS"
      description="Useful, beautiful technology—selected for how well it fits into real life."
      products={accessoriesProducts}
      loading={false}
      error={null}
    />
  );
}