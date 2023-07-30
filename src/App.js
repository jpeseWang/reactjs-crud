import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
import "./App.scss";
import Header from "./components/Header";
import AppRoutes from "./routes/AppRoutes";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { handleRefresh } from "./redux/actions/userAction";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(handleRefresh());
    }
  }, []);
  return (
    <>
      <div className="app-container">
        <Container>
          <Header />
          <AppRoutes />
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
