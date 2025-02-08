import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../feature/auth.slice";
import {
  setUserInfo as setUser,
  updateUserName,
} from "../../feature/user.slice";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { TokenAuth } = useSelector((state) => state.auth); // Token d'authentification
  const { userInfo } = useSelector((state) => state.user); // Infos utilisateur

  const [isEditing, setIsEditing] = useState(false); // Mode édition
  const [firstName, setFirstName] = useState(""); // Prénom modifiable
  const [lastName, setLastName] = useState(""); // Nom modifiable

  const [accounts] = useState([
    {
      id: 1,
      name: "Argent Bank Checking (x8349)",
      balance: "$2,082.79",
      description: "Available Balance",
    },
    {
      id: 2,
      name: "Argent Bank Savings (x6712)",
      balance: "$10,928.42",
      description: "Available Balance",
    },
    {
      id: 3,
      name: "Argent Bank Credit Card (x8349)",
      balance: "$184.30",
      description: "Current Balance",
    },
  ]); // Données statiques pour les comptes

  useEffect(() => {
    if (!TokenAuth) {
      navigate("/signin");
    } else if (!userInfo) {
      axios
        .post(
          "http://localhost:3001/api/v1/user/profile",
          {},
          { headers: { Authorization: `Bearer ${TokenAuth}` } }
        )
        .then((res) => {
          dispatch(setUser(res.data));
          setFirstName(res.data.firstName);
          setLastName(res.data.lastName);
        })
        .catch(() => {
          dispatch(logout());
          navigate("/signin");
        });
    } else {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
    }
  }, [TokenAuth, userInfo, dispatch, navigate]);

  const handleSave = () => {
    axios
      .put(
        "http://localhost:3001/api/v1/user/profile",
        { firstName, lastName },
        { headers: { Authorization: `Bearer ${TokenAuth}` } }
      )
      .then(() => {
        dispatch(updateUserName({ firstName, lastName })); // Met à jour Redux
        setIsEditing(false); // Quitte le mode édition
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour :", error);
      });
  };

  const handleCancel = () => {
    setFirstName(userInfo.firstName);
    setLastName(userInfo.lastName);
    setIsEditing(false);
  };

  if (!userInfo) return <p>Chargement...</p>;

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back</h1>
        {isEditing ? (
          <div className="edit-name">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
            <div>
              <button onClick={handleSave} className="save-button">
                Save
              </button>
              <button onClick={handleCancel} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2>
              {userInfo.firstName} {userInfo.lastName}
            </h2>
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit Name
            </button>
          </div>
        )}
      </div>

      <h2 className="sr-only">Accounts</h2>

      {accounts.map((account) => (
        <section className="account" key={account.id}>
          <div className="account-content-wrapper">
            <h3 className="account-title">{account.name}</h3>
            <p className="account-amount">{account.balance}</p>
            <p className="account-amount-description">{account.description}</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      ))}
    </main>
  );
};

export default User;
