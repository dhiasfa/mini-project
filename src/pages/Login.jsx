import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../client";
import "../css/login.css";
import NavbarComp from "../components/navbar/NavbarComp";

const Login = ({ setToken }) => {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;

  async function onSubmit(formData, e) {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      console.log(data);
      if (error) throw error;
      reset();
      setToken(data);
      navigate("/home-page");
    } catch (error) {
      alert("Data tidak valid");
      reset();
    }
  }

  return (
    <>
      <NavbarComp />
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Email</label> <br />
          <input
            type="email"
            name="email"
            id=""
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: regexEmail,
                message: "Email tidak valid",
              },
            })}
            style={{
              border: errors.email && "1px solid red",
            }}
          />
          {errors?.email?.message}
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Panjang password minimal 6 karakter",
              },
            })}
            style={{
              border: errors.email && "1px solid red",
            }}
          />
          {errors?.password?.message}
          <br />
          <button type="submit" className="btn btn-secondary">
            Submit
          </button>
          <p>
            Don't have an account? <Link to="/signUp"> Sign Up </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
