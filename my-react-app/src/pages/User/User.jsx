import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, setUserInfo } from "../../feature/auth.slice";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, TokenAuth } = useSelector((state) => state.auth);
  const [accounts, setAccounts] = useState([]); // État local pour les comptes bancaires
  const [isEditing, setIsEditing] = useState(false); // Mode édition
  const [firstName, setFirstName] = useState(""); // Champ prénom
  const [lastName, setLastName] = useState(""); // Champ nom

  // Charger les informations utilisateur et les comptes
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
          dispatch(setUserInfo(res.data));
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

    // Charger les comptes bancaires (API simulée ici)
    setAccounts([
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
    ]);
  }, [TokenAuth, userInfo, dispatch, navigate]);

  // Gérer la sauvegarde des modifications
  const handleSave = () => {
    axios
      .put(
        "http://localhost:3001/api/v1/user/profile",
        { firstName, lastName },
        { headers: { Authorization: `Bearer ${TokenAuth}` } }
      )
      .then((res) => {
        dispatch(setUserInfo(res.data)); // Met à jour Redux
        setIsEditing(false); // Quitter le mode édition
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour du profil :", error);
      });
  };

  // Annuler l'édition
  const handleCancel = () => {
    setFirstName(userInfo.firstName); // Réinitialise le prénom
    setLastName(userInfo.lastName); // Réinitialise le nom
    setIsEditing(false); // Quitter le mode édition
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
