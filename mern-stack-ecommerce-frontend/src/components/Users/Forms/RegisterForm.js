import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../../../redux/slices/users/usersSlice";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import LoadingComponent from "../../LoadingComp/LoadingComponent";

const RegisterForm = () => {
  //dispatch
  const dispatch = useDispatch();
  //dispatch
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  //---Destructuring---
  const { fullname, email, password } = formData;
  //---onchange handler----
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //---onsubmit handler----
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUserAction({ fullname, email, password }));
  };
  //select store data
  const { user, error, loading } = useSelector((state) => state?.users);
  //redirect
  useEffect(() => {
    if (user) {
      window.location.href = "/login";
    }
  }, [user]);
  return (
    <>
      <section className="relative overflow-x-hidden h-[1000px] bg-[#f8f8f8] ">
        <div className="container px-4 mx-auto w-[50%] bg-[#ffff] h-[55%] mt-[100px] rounded-3xl shadow-xl shadow-blue-500/50" >
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-3/6 px-4 mb-12 lg:mb-0">
              <div className="py-20 text-center">
                <h3 className="mb-8 text-xl md:text-4xl font-bold font-heading font-serif">
                  Create your account
                </h3>

                {/* errr */}
                {error && <ErrorMsg message={error?.message} />}
                {/* <p className="mb-10"></p> */}
                <form onSubmit={onSubmitHandler}>
                  <div className="relative ml-4 lg:my-5">
                    <span class="material-symbols-outlined absolute top-[20%] ">
                      account_circle
                    </span>

                    <input
                      name="fullname"
                      value={fullname}
                      onChange={onChangeHandler}
                      className="w-full mb-4 px-12 py-3 border-b border-black focus:outline-none focus-visible:ring focus:border-none focus"
                      type="text"
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="relative ml-4 lg:my-5">
                    <span class="material-symbols-outlined absolute top-[20%]">
                      lock
                    </span>
                    <input
                      name="email"
                      value={email}
                      onChange={onChangeHandler}
                      className="w-full mb-4 px-12 py-3 border-b border-black focus:ring-blue-300 focus:border-b-blue-30"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="relative ml-4 lg:my-5">
                    <span class="material-symbols-outlined absolute top-[20%] ">
                      water_lock
                    </span>

                    <input
                      name="password"
                      value={password}
                      onChange={onChangeHandler}
                      className="w-full mb-4 px-12 py-3 border-b border-black focus:ring-blue-300 focus:border-b-blue-30"
                      type="password"
                      placeholder="Enter your password"
                    />
                  </div>

                  {loading ? (
                    <LoadingComponent />
                  ) : (
                    <button className="mt-12 md:mt-16 bg-blue-800 hover:bg-blue-900 text-white font-bold font-heading py-5 px-8 rounded-md uppercase">
                      Register
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* <div
          className="hidden lg:block lg:absolute top-0 bottom-0 right-0 lg:w-3/6 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage:
              'url("https://cdn.pixabay.com/photo/2017/03/29/04/47/high-heels-2184095_1280.jpg")',
          }}
        /> */}
      </section>
    </>
  );
};

export default RegisterForm;
