import { Outlet} from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer/Footer";
export default function Layout() {
  return (
    <div className="min-h-screen bg-ivory flex flex-col">
            <Navbar />


      <main className="flex-1">
        <Outlet />
      </main>

      <Footer/>
    </div>
  );
}