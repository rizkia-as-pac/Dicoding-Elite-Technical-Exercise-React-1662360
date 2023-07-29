import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { login } from '../redux/auth/authSlice';

const Login = () => {
  const { error } = useSelector((state) => state.auth);
  const [errors, setErrors] = React.useState({
    email: {
      isError: true,
      message: '',
    },
    password: {
      isError: true,
      message: '',
    },
  });
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (isValidate()) return;
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      dispatch(login(data)).then((res) => {
        if (res.payload.isLogin) navigate('/');
      });
    } catch (err) {
      console.log(err);
    }
  };

  const validateEmail = () => {
    const filter = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!filter.test(emailRef.current.value)) {
      setErrors((prevState) => ({
        ...prevState,
        email: { isError: true, message: 'Please enter a valid email address' },
      }));
      return true;
    } else {
      setErrors((prevState) => ({
        ...prevState,
        email: { isError: false, message: '' },
      }));
      return false;
    }
  };

  const isValidate = () => {
    if (!validateEmail()) {
      return false;
    }
    // verify password
    if (passwordRef.current.value.length < 6)
      setErrors((prevState) => ({
        ...prevState,
        password: { isError: true, message: 'Must be at least 6 characters' },
      }));
    else {
      setErrors((prevState) => ({
        ...prevState,
        password: { isError: false, message: '' },
      }));
      return false;
    }

    return true;
  };

  React.useEffect(() => {
    document.title = 'Login';
  }, []);

  return (
    <div
      id="login-page"
      className="bg-gray-100 h-screen flex items-center justify-center"
    >
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={(e) => onSubmit(e)}
      >
        {error && (
          <p
            id="error-message"
            className="text-sm text-red-600 text-center error-message"
          >
            {error}
          </p>
        )}
        <Input
          innerRef={emailRef}
          label="Email"
          type="email"
          error={errors.email}
        />
        <Input
          innerRef={passwordRef}
          label="Password"
          type="password"
          error={errors.password}
        />
        <div className="flex flex-col gap-3">
          <Button text="Login" type="submit" />
          <p className="text-sm">
            Belum punya akun?{' '}
            <span
              className="underline text-blue-400 cursor-pointer"
              onClick={() => navigate('/register')}
            >
              Daftar disini
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
