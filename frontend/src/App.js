import "./App.css";
import "materialize-css";

import { BrowserRouter } from "react-router-dom";

import { RoutesConfig } from "./routes";
import { useAuth } from "./hooks/auth.hook";

import { AuthContext } from "./context/auth.context";
import NavBar from "./components/navbar.component";

function App() {
  const { login, logout, token, userId } = useAuth();
  const isAuth = !!token;
  const routes = RoutesConfig(isAuth);

  return (
    <AuthContext.Provider value={{
      login,
      logout,
      token,
      userId,
      isAuth
    }}>
      <BrowserRouter>
        <div className="App">
          { isAuth && <NavBar /> }

          <div className="container">
            {routes}
          </div>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
