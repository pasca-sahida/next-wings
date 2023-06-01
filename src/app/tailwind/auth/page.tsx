"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

const schema: any = yup.object().shape({
  login_id: yup
    .number()
    .typeError("Must be a valid ID")
    .required("This field is required"),
  login_password: yup.string().required("This field is required"),
});

export default function Auth(props: any) {
  const router: any = useRouter();
  const [loader, setLoader] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      login_id: "",
      login_password: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setLoader(true);

    setTimeout(() => {
      axios
        .get(`/api/employees`)
        .then((response: any) => console.log(response));
      setLoader(false);

      Swal.fire({
        title: "Success",
        text: "Success login",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        router.push("/tailwind/employees", undefined, { shallow: true });
      });
    }, 2000);
  };

  return (
    <section className="bg-white pb-10 md:pb-32 pt-5 h-screen">
      <div className="grid gap-4 px-8 mx-auto md:w-3/12 mt-10">
        <div className="justify-center content-center">
          <h6 className="mb-4 max-w-3xl text-5xl leading-none text-blac font-sans font-bold">
            Login to<div className="text-black">Portal SMU</div>
          </h6>
          <hr />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 mt-8">
              <label className="text-black">Employee ID</label>
              <input
                type="text"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-[-1rem]"
                {...register("login_id")}
                autoComplete="off"
              />
              {errors.login_id && (
                <small className="flex text-red-500 mt-[-1rem]">
                  {errors.login_id.message}
                </small>
              )}
              <label className="text-black">Password</label>
              <input
                type="password"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-[-1rem]"
                {...register("login_password")}
                autoComplete="off"
              />
              {errors.login_password && (
                <small className="flex text-red-500 mt-[-1rem]">
                  {errors.login_password.message}
                </small>
              )}
            </div>
            <div className="flex mt-5">
              <button
                type="submit"
                className="flex btn w-full bg-red-600 hover:bg-red-400 text-white font-semibold py-3 px-8 rounded-lg justify-center"
              >
                {loader ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Please wait ...
                  </>
                ) : (
                  <>Login</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
