"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { AiOutlineFastBackward } from "react-icons/ai";
import ReactDatePicker from "react-datepicker";
import moment from "moment";
import { v4 as uuid } from 'uuid';

import "react-datepicker/dist/react-datepicker.css";
const schema: any = yup.object().shape({
  emp_id: yup
    .number()
    .typeError("Must be a valid ID")
    .required("This field is required"),
  emp_name: yup.string().required("This field is required"),
  emp_gender: yup.string().required("This field is required"),
  emp_birthday: yup.string().required("This field is required"),
});

export default function Employees(props: any) {
  const router: any = useRouter();
  const [loader, setLoader] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      emp_id: "",
      emp_name: "",
      emp_gender: "",
      emp_birthday: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setLoader(true);
    data.emp_birthday = moment(data.emp_birthday).format('yyyy-MM-DD');
    const dataToPost = {
        request_id: uuid,
        app_name: "apresiasi dari kita",
        app_version: "1.0.14",
        data: data,
    }

    axios.post('/api/employees', dataToPost).then((response: any) => {
    setLoader(false);

      Swal.fire({
        title: "Success",
        text: "Success add employee",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        router.push("/tailwind/employees", undefined, { shallow: true });
      });
    })
  };

  return (
    <section className="bg-white pb-10 md:pb-32 pt-5 h-screen">
      <div className="grid gap-4 px-8 mx-auto md:w-5/12 mt-10">
        <div className="justify-center content-center">
          <div className="grid md:grid-cols-2">
            <h6 className="mb-4 max-w-3xl text-5xl leading-none text-blac font-sans font-bold">
              SMU Employees
            </h6>
            <div className="flex items-center justify-end">
              <button className="btn bg-blue-600 text-white w-full md:w-20 h-8 mx-1 flex justify-center items-center p-1 rounded-lg transform transition duration-500 hover:scale-110" onClick={() => {router.push("/tailwind/employees")}}>
                <AiOutlineFastBackward size={20} />
              </button>
            </div>
          </div>
          <hr />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 mt-8">
              <label className="text-black">Employee ID</label>
              <input
                type="text"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-[-1rem]"
                {...register("emp_id")}
                autoComplete="off"
              />
              {errors.emp_id && (
                <small className="flex text-red-500 mt-[-1rem]">
                  {errors.emp_id.message}
                </small>
              )}
              <label className="text-black">Full Name</label>
              <input
                type="text"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-[-1rem]"
                {...register("emp_name")}
                autoComplete="off"
              />
              {errors.emp_name && (
                <small className="flex text-red-500 mt-[-1rem]">
                  {errors.emp_name.message}
                </small>
              )}
              <label className="text-black">Gender</label>
              <select
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-[-1rem]"
                {...register("emp_gender")}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.emp_gender && (
                <small className="flex text-red-500 mt-[-1rem]">
                  {errors.emp_gender.message}
                </small>
              )}
              <label className="text-black">Birthday</label>
              <Controller
                control={control}
                name="emp_birthday"
                render={({ field }) => (
                  <ReactDatePicker
                    dateFormat="dd-MM-yyyy"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-[-1rem]"
                    onChange={(e) => field.onChange(e)}
                    selected={field.value ? new Date(field.value) : new Date()}
                  />
                )}
              />
              {errors.emp_birthday && (
                <small className="flex text-red-500 mt-[-1rem]">
                  {errors.emp_birthday.message}
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
                  <>Add</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
