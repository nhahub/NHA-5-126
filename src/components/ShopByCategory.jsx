import { Link } from "react-router-dom";

// الصف الأول: 4 + 5 + 3  |  الصف التاني: 3 + 4 + 5
const categories = [
  {
    name: "Smartphones",
    image: "/src/assets/images/smartphones.jpg",
    link: "/products?category=smartphones",
    span: "md:col-span-4",
  },
  {
    name: "Laptops",
    image: "/src/assets/images/laptops.jpg",
    link: "/products?category=laptops",
    span: "md:col-span-5",
  },
  {
    name: "Audio",
    image: "/src/assets/images/sony.png",
    link: "/products?category=mobile-accessories",
    span: "md:col-span-3",
  },
  {
    name: "Smartwatches",
    image: "/src/assets/images/apple.png",
    link: "/products?category=mobile-accessories&q=watch",
    span: "md:col-span-3",
  },
  {
    name: "Gaming",
    image: "/src/assets/images/gaming.jpg",
    link: "/products",
    span: "md:col-span-4",
  },
  {
    name: "Accessories",
    image: "/src/assets/images/accessories.jpg",
    link: "/accessories?category=mobile-accessories",
    span: "md:col-span-5",
  },
];

const Arrow = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function ShopByCategory() {
  return (
    <section className="bg-[#F6F3EC] px-6 py-20 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#E8714A]">
              Find your thing
            </p>
            <h2 className="text-5xl font-extrabold uppercase leading-none tracking-tighter text-[#2B3039] md:text-7xl">
              Shop by category
            </h2>
          </div>

          <Link
            to="/categories"
            className="hidden shrink-0 items-center gap-2 border-b border-[#2B3039] pb-1 text-sm font-medium text-[#2B3039] md:flex"
          >
            View all categories
            <Arrow />
          </Link>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-12 md:gap-5">
          {categories.map((category, i) => (
            <Link
              to={category.link}
              key={category.name}
              className={`group relative block h-64 overflow-hidden bg-[#161B22] md:h-[280px] ${category.span}`}
            >
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* تدريج غامق من تحت */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Badge */}
              <span className="absolute left-6 top-6 bg-[#E8714A] px-3 py-2 text-xs font-semibold text-white">
                /{String(i + 1).padStart(2, "0")}
              </span>

              {/* Label */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-8 text-white">
                <div>
                  <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/80">
                    Explore
                  </p>
                  <span className="block text-3xl font-medium leading-none tracking-tight text-white">
                    {category.name}
                  </span>
                </div>
                <Arrow />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}