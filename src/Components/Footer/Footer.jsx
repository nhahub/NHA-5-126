import { Link } from "react-router-dom";
import logo from "../../assets/icons/logo.png"; // Adjust path if needed

export default function Footer() {
  return (
    <footer className="bg-[#191919] text-white pt-16 pb-8 font-body mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Top Section: Logo and Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          
          {/* Column 1: Logo & Brand */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-3 no-underline">
              <img src={logo} alt="TechValut" className="w-8 h-8 object-contain" />
              <span className="font-heading text-xl font-bold text-white">
                TechValut
              </span>
            </Link>
            <p className="text-[#AAAAAA] text-sm leading-relaxed max-w-xs">
              Tools for work, play, and everything in between—selected with care.
            </p>
          </div>

          {/* Column 2: Shop */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading font-bold text-[11px] uppercase tracking-[0.15em] text-white mb-2">
              Shop
            </h4>
            <Link to="/products" className="text-[#AAAAAA] text-sm hover:text-white transition-colors">All products</Link>
            <Link to="/new" className="text-[#AAAAAA] text-sm hover:text-white transition-colors">New arrivals</Link>
            <Link to="/deals" className="text-[#AAAAAA] text-sm hover:text-white transition-colors">Selected deals</Link>
          </div>

          {/* Column 3: Help */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading font-bold text-[11px] uppercase tracking-[0.15em] text-white mb-2">
              Help
            </h4>
            <Link to="/shipping" className="text-[#AAAAAA] text-sm hover:text-white transition-colors">Shipping & returns</Link>
            <Link to="/faq" className="text-[#AAAAAA] text-sm hover:text-white transition-colors">FAQs</Link>
            <Link to="/contact" className="text-[#AAAAAA] text-sm hover:text-white transition-colors">Contact us</Link>
          </div>

          {/* Column 4: Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading font-bold text-[11px] uppercase tracking-[0.15em] text-white mb-2">
              Say Hello
            </h4>
            <a href="mailto:hello@techvalut.com" className="text-[#AAAAAA] text-sm hover:text-white transition-colors">hello@techvalut.com</a>
            <a href="tel:+14155550148" className="text-[#AAAAAA] text-sm hover:text-white transition-colors">+1 415 555 0148</a>
            <div className="flex gap-2 text-[#AAAAAA] text-sm">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <span>·</span>
              <a href="#" className="hover:text-white transition-colors">X</a>
              <span>·</span>
              <a href="#" className="hover:text-white transition-colors">Pinterest</a>
            </div>
          </div>

        </div>

        {/* Bottom Section: Divider and Copyright */}
        <div className="border-t border-[#333333] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-[#706F69] uppercase tracking-wider">
          <p>© 2025 TechValut</p>
          <p>Independent tech, thoughtfully selected.</p>
        </div>

      </div>
    </footer>
  );
}