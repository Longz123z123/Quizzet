import { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { ImSpinner10 } from 'react-icons/im';
import ReCAPTCHA from 'react-google-recaptcha'; // Import ReCAPTCHA
import 'nprogress/nprogress.css';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState(null); // State để lưu giá trị reCAPTCHA
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value); // Lưu giá trị của reCAPTCHA
  };

  const handleLogin = async () => {
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error('Invalid email');
      return;
    }

    if (!password) {
      toast.error('Invalid password');
      return;
    }

    if (!recaptchaValue) {
      // Kiểm tra nếu reCAPTCHA chưa được xác nhận
      toast.error('Please verify you are not a robot');
      return;
    }

    setIsLoading(true);
    //submit api
    let data = await postLogin(email, password);
    if (data && data.EC === 0) {
      dispatch(doLogin(data));
      toast.success(data.EM);
      setIsLoading(false);
      navigate('/');
    }
    if (data && +data.EC !== 0) {
      toast.error(data.EM);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event && event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <span className="font-header-span"> Don't have an account yet? </span>
        <button onClick={() => navigate('/register')}>Sign up</button>
      </div>
      <div className="title col-4 mx-auto">ZeT1</div>
      <div className="welcome col-4 mx-auto">Hello, who's this?</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            type={'email'}
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type={'password'}
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={(event) => handleKeyDown(event)}
          />
        </div>
        <span className="forgot-password">For got password?</span>

        {/* Thêm Google reCAPTCHA */}
        <div className="recaptcha-container">
          <ReCAPTCHA
            sitekey="6LfIsYcqAAAAAI9PPOlUDAIFOPIg89SejdK-eKoR" // Thay bằng key của bạn từ Google reCAPTCHA
            onChange={handleRecaptchaChange} // Lắng nghe sự kiện thay đổi
          />
        </div>

        <div>
          <button className="btn-submit" onClick={() => handleLogin()} disabled={isLoading}>
            {isLoading === true && <ImSpinner10 className="loader-icon" />}
            <span>Login to ZeT1</span>
          </button>
        </div>
        <div className="back text-center">
          <span
            onClick={() => {
              navigate('/');
            }}
          >
            {' '}
            &#60;&#60; Go to Homepage
          </span>
        </div>
      </div>
    </div>
  );
};
export default Login;
