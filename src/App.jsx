import { useState, useEffect } from "react";
import { Header, Footer } from "./components/index";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth.services";
import { login, logout } from "./store/index";
// TODO import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  loading ? (
    <div>Loading...</div>
  ) : (
    <>
      <Header />
      {/* TODO { <Outlet />} */}
      <Footer />
    </>
  );
}

export default App;
