import { useSelector } from "react-redux";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header>
      <nav className="relative w-full bg-[#FFCC70] border py-2">
        <Container>
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
            <div className="inline-flex items-center space-x-2">
              <Link to="/">
                <Logo />
              </Link>
            </div>
            <div className="hidden lg:block">
              <ul className="inline-flex space-x-8">
                {navItems.map((item) =>
                  item.active ? (
                    <li key={item.name}>
                      <button
                        className="text-base font-semibold text-gray-800 hover:text-white hover:ease-in hover:transition-all hover:duration-300"
                        onClick={() => navigate(item.slug)}
                      >
                        {item.name}
                      </button>
                    </li>
                  ) : null
                )}
                {authStatus && (
                  <li>
                    <LogoutBtn />
                  </li>
                )}
              </ul>
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
}

export default Header;
