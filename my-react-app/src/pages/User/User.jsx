import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, setCredentialsUser } from "../../feature/auth.slice";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, TokenAuth } = useSelector((state) => state.auth);
  const [accounts, setAccounts] = useState([]); // État local pour stocker les comptes bancaires

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
          dispatch(setCredentialsUser(res.data));
        })
        .catch(() => {
          dispatch(logout());
          navigate("/signin");
        });
    }

    // Simuler une récupération des comptes bancaires (à remplacer par un appel API si dispo)
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

  if (!userInfo) return <p>Chargement...</p>;

  return (
    <>
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {userInfo.firstName} {userInfo.lastName}!
          </h1>
          <button className="edit-button">Edit Name</button>
        </div>

        <h2 className="sr-only">Accounts</h2>

        {accounts.map((account) => (
          <section className="account" key={account.id}>
            <div className="account-content-wrapper">
              <h3 className="account-title">{account.name}</h3>
              <p className="account-amount">{account.balance}</p>
              <p className="account-amount-description">
                {account.description}
              </p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
        ))}
      </main>
    </>
  );
};

export default User;
