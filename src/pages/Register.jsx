import React from 'react';
import Input from '../components/Input';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../redux/auth/authSlice';
import Button from '../components/Button';

const Register = () => {
  const [errors, setErrors] = React.useState({
    name: {
      isError: true,
      message: '',
    },
    email: {
      isError: true,
      message: '',
    },
    password: {
      isError: true,
      message: '',
    },
  });
  const [error, setError] = React.useState();
  const nameRef = React.useRef();
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (isValidate()) return;
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    dispatch(register(data))
      .then((res) => {
        if (res.payload.success) {
          navigate('/login');
        } else setError(res.payload.message);
      })
      .catch((err) => {
        console.log(err);
      });
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

    // verify name
    if (nameRef.current.value.length < 1)
      setErrors((prevState) => ({
        ...prevState,
        name: { isError: true, message: 'Must be at least 1 characters' },
      }));
    else {
      setErrors((prevState) => ({
        ...prevState,
        name: { isError: false, message: '' },
      }));
      return false;
    }

    return true;
  };

  React.useEffect(() => {
    document.title = 'Register';
  }, []);

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={(e) => onSubmit(e)}
      >
        {error && (
          <p
            id="error-message"
            className="text-center text-sm text-red-400 capitalize"
          >
            {error}
          </p>
        )}
        <Input innerRef={nameRef} label="Nama" error={errors.name} />
        <Input
          innerRef={emailRef}
          type="email"
          label="Email"
          error={errors.email}
        />
        <Input
          innerRef={passwordRef}
          type="password"
          label="Password"
          error={errors.password}
        />
        <div className="flex flex-col gap-3">
          <Button text="Register" type="submit" />
          <p className="text-sm">
            Sudah punya akun?{' '}
            <span
              className="underline text-blue-400"
              onClick={() => navigate('/login')}
            >
              Login disini
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
