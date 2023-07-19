import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const handleShowPassword = () => {
    if (password) {
      setIsShowPassword(!isShowPassword);
    }
  };
  return (
    <div className="login-container col-6 col-sm-6">
      <div className="title">Log in</div>
      <div className="text">Email or username</div>
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
        />
        <i onClick={handleShowPassword} class="fa-solid fa-eye-slash"></i>
      </div>

      <button
        className={email && password ? "active" : ""}
        disabled={email && password ? false : true}
      >
        Login
      </button>
      <div className="back">
        <i className="fa-solid fa-chevron-left"></i> Go back
      </div>
    </div>
  );
}

export default Login;
