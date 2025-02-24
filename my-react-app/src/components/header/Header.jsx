import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/argentBankLogo.png";
import { logout } from "../../feature/auth.slice";
import { resetUserInfo } from "../../feature/user.slice"; // Reset user info après logout
import "./header.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { TokenAuth } = useSelector((state) => state.auth); // Vérification du token
  const { userInfo } = useSelector((state) => state.user);
  console.log(userInfo);

  useEffect(() => {
    console.log("TokenAuth updated"); // Debug: Vérifier l'état du token après logout
  }, [TokenAuth]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetUserInfo()); // Reset user info dans user.slice
    navigate("/"); // Redirection après déconnexion
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {TokenAuth ? ( // Vérification du token pour afficher Sign In / Sign Out
          <>
            <Link className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i>
              {userInfo?.firstName}
            </Link>
            <button className="main-nav-item" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </button>
          </>
        ) : (
          <Link className="main-nav-item" to="/signin">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
