import { Link } from "@tanstack/react-router";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-4">
      <nav className="flex justify-between">
        <Link to="/">Trang chủ</Link>
        <Link to="/login">Đăng nhập</Link>
      </nav>
    </header>
  );
};

export default Header;
