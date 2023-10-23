import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";

export const BasketmaniaContext = createContext();

export const BasketmaniaProvider = (props) => {
  const [user, setUser] = useState({});
  const [logged, setLogged] = useState(false);
  const team = "bskmn";
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (usr) => {
      if (usr) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setUser(usr.uid);
        setLogged(true);
        console.log(usr.uid);
      } else {
        // User is signed out
      }
    });
  }, [logged]);
  return (
    <BasketmaniaContext.Provider
      value={{ logged, setLogged, setUser, user, team }}
    >
      {props.children}
    </BasketmaniaContext.Provider>
  );
};
