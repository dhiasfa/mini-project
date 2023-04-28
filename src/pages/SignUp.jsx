import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { supabase } from "../client";
const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  // const [formData, setFormData] = useState({});
  const regexName = /^[a-zA-Z ]{2,}$/;
  const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;

  async function onSubmit(formData, e) {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
        },
      });
      if (error) throw error;
      alert("Check your email for verification link");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" className="">
          Full Name
        </label>
        <br />
        <input
          type="text"
          name="fullName"
          id="fullName"
          {...register("fullName", {
            required: "Full Name is required",
            pattern: {
              value: regexName,
              message: "Full Name tidak valid",
            },
            maxLength: {
              value: 26,
              message: "tidak boleh lebih dari 25 karakter",
            },
          })}
          style={{
            border: errors.fullName && "1px solid red",
          }}
        />
        {errors?.fullName?.message}
        <br />
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login"> Login </Link>
      </p>
    </>
  );
};

export default SignUp;
