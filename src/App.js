import React, { createContext, useContext, useEffect, useState } from "react";
import "./styles.css";

const UserContext = createContext();

function App() {
  const [userState, setUserState] = useState({
    Namık: true,
    Eda: true,
    Suzan: true,
    Engin: true,
    Samet: true
  });

  return (
    <UserContext.Provider value={{ userState, setUserState }}>
      <UserList />
    </UserContext.Provider>
  );
}

const UserList = () => {
  const userContext = useContext(UserContext);
  const { userState, setUserState } = userContext;

  // console.log(userState)

  const randomProp = (obj) => {
    const key = Object.keys(obj);
    return key[Math.floor(Math.random() * key.length)];
  };

  const changeIsOnline = () => {
    setUserState((userState) => {
      const randomUser = randomProp(userState);
      const newUser = { ...userState, [randomUser]: !userState[randomUser] };
      return newUser;
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      changeIsOnline();
    }, 2000);
    return () => clearTimeout(timeout);
  }, [userState]);

  const uniqeKey = () => crypto.randomUUID();

  return (
    <div>
      {Object.entries(userState).map(([key, value]) => {
        return (
          <div key={uniqeKey()}>
            <span>
              {key}: {value}
            </span>
            <span className={value ? "dot-green" : "dot-red"}></span>
          </div>
        );
      })}
    </div>
  );
};

export default App;
