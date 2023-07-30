import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleLoginRedux } from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const isLoading = useSelector((state) => state.user.isLoading);
  const account = useSelector((state) => state.user.account);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      nav("/");
    }
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Missing email or password!");
      return;
    }

    dispatch(handleLoginRedux(email, password));
  };

  const handleBack = () => {
    nav("/");
  };
  const handlePressEnter = (e) => {
    if (e && e.key === "Enter") {
      handleLogin();
    }
  };

  useEffect(() => {
    if (account && account.auth === true) {
      nav("/");
    }
  }, [account]);

  return (
    <div className="login-container col-6 col-sm-6">
      <div className="title">Log in</div>
      <div className="text">Email or username (eve.holt@reqres.in)</div>
      <input
        type="text"
        value={email}
        placeholder="Email or username..."
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <div className="input-pw">
        <input
          type={isShowPassword ? "text" : "password"}
          value={password}
          placeholder="Password..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          onKeyDown={(e) => handlePressEnter(e)}
        />
        <i
          onClick={() => setIsShowPassword(!isShowPassword)}
          className={
            isShowPassword === true
              ? "fa-solid fa-eye password-icon"
              : "fa-solid fa-eye-slash password-icon"
          }
        ></i>
      </div>

      <button
        className={email && password ? "active" : ""}
        disabled={email && password ? false : true}
        onClick={() => handleLogin()}
      >
        {isLoading && <i className="fas fa-circle-notch fa-spin"></i>}
        &nbsp;Login
      </button>
      <div className="back">
        <i className="fa-solid fa-chevron-left"></i>
        <span onClick={() => handleBack()}>Go back</span>
      </div>
    </div>
  );
}

export default Login;
