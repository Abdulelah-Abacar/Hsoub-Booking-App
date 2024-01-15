import { NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

const Navbar = () => {
  const value = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-md navbar-light main-navigation">
      <div className="container-fluid">
        <NavLink to="/events" className="navbar-brand">
          <h1> مناسبات حسوب</h1>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse main-navigation-items"
          id="navbarContent"
        >
          <ul className="navbar-nav me-auto">
            {value.token && (
              <li className="nav-item">
                <NavLink to="bookings">حجوزاتي</NavLink>
              </li>
            )}
            {!value.token && (
              <li className="nav-item">
                <NavLink to="/login">تسجيل دخول</NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink to="/events">المناسبات</NavLink>
            </li>
          </ul>
          {value.token && (
            <ul className="navbar-nav">
              <button onClick={() => value.logout()}>تسجيل خروج</button>
              <li className="nav-item">
                <NavLink to="#">{value.username}</NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
