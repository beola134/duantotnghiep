import SanPham from "./components/sanpham/page";
import SuaSanPham from "./components/suasanpham/[id]/page";

import ThemSanPham from "./components/themsanpham/page";

export default function Home() {
  return (
    // <SuaSanPham/>
    <SanPham />
    // <ThemSanPham />
  );
}
