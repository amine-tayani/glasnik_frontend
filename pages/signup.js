import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import React from "react";
import { CREATE_ACCOUNT } from "../graphql/mutations/auth";
import Spinner from "../components/shared/Spinner";

const Signup = () => {
  const { handleSubmit, register } = useForm();
  const router = useRouter();
  const [createAccount, { data, loading, error }] = useMutation(CREATE_ACCOUNT);

  if (data) {
    console.log(data);
  }

  const signup = async (data) => {
    try {
      await createAccount({
        variables: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
      });
      if (!error) {
        router.push("/");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="bg-[#1D232A] h-screen">
      <Head>
        <title>Glasnik - Create an account</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading ? (
        <Spinner />
      ) : (
        <section className="font-inter">
          <div className="container mx-auto items-center px-5 py-12 lg:px-20">
            <div className="flex flex-col w-full p-10 mx-auto my-6 transition duration-500 ease-in-out transform  rounded-lg lg:w-2/6 md:w-1/2 md:mt-0">
              <div className="flex justify-center items-center mb-4">
                <div className="w-3 h-3 p-3 mr-2 rounded-full bg-gradient-to-tr  from-indigo-400 to-blue-700" />
                <h2 className="block p-2 text-3xl font-tweb font-extrabold tracking-widest transition duration-500 ease-in-out transform cursor-pointer lg:mr-8 text-white">
                  Glasnik
                </h2>
              </div>
              <form onSubmit={handleSubmit(signup)}>
                {error && (
                  <p className="text-sm mb-4 font-tweb text-red-500">
                    *{error.message}
                  </p>
                )}
                <div>
                  <div className="relative ">
                    <label
                      htmlFor="email"
                      className="text-sm  font-medium leading-7 text-gray-100"
                    >
                      What&apos;s your email?
                      <input
                        {...register("email", { required: true })}
                        type="text"
                        onFocus={(e) => {
                          e.target.placeholder = "";
                        }}
                        onBlur={(e) => {
                          e.target.placeholder = "Enter your email";
                        }}
                        name="email"
                        placeholder="Enter your email"
                        className="w-full bg-[#272D36] px-4 py-2 mt-2 transition duration-300 ease-in-out transform rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071FF] "
                      />
                    </label>
                  </div>
                  <div className="relative mt-4">
                    <label
                      htmlFor="username"
                      className="text-sm  font-medium leading-7 text-gray-100"
                    >
                      What should we call you?
                      <input
                        {...register("username", { required: true })}
                        type="text"
                        onFocus={(e) => {
                          e.target.placeholder = "";
                        }}
                        onBlur={(e) => {
                          e.target.placeholder = "Enter a username";
                        }}
                        name="username"
                        placeholder="Enter a username"
                        className="w-full bg-[#272D36] px-4 py-2 mt-2 transition duration-300 ease-in-out transform rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071FF]"
                      />
                    </label>
                  </div>
                  <div className="relative mt-4">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium leading-7 text-gray-100"
                    >
                      Create a password
                      <input
                        {...register("password", { required: true })}
                        type="password"
                        onFocus={(e) => {
                          e.target.placeholder = "";
                        }}
                        onBlur={(e) => {
                          e.target.placeholder = "Type a password";
                        }}
                        name="password"
                        placeholder="Type a password"
                        className="w-full bg-[#272D36] px-4 py-2 mt-2 transition duration-300 ease-in-out transform rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071FF]"
                      />
                    </label>
                  </div>

                  <div className="font-tweb mt-4 ">
                    <button
                      className="w-full px-8 py-3 my-2 rounded-lg text-base tracking-wider transform transition duration-500 ease-in-out bg-blue-600 hover:bg-blue-700 text-white font-semibold focus:outline-none "
                      type="submit"
                    >
                      Sign Up
                    </button>
                  </div>
                  <div className="flex items-center mt-3 text-sm font-medium space-x-1">
                    <p className="text-gray-100">
                      Do you have an account already?
                    </p>
                    <Link href="/login">
                      <p className="cursor-pointer text-sm  leading-7 text-blue-500">
                        Login here
                      </p>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Signup;
