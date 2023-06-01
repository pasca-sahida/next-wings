"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { BiAddToQueue } from "react-icons/bi";

import Employeebar from "../component/employeebar";

export default function Employees(props: any) {
  const router: any = useRouter();
  const [loader, setLoader] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);

  const getData = () => {
    setLoader(true);
    setTimeout(async () => {
      await axios
        .get(`/api/employees`, { data: "test" })
        .then((response: any) => setData(response.data.data));
      setLoader(false);
    }, 1000);
  };

  const deleteData = (emp_id: number) => {
    Swal.fire({
      title: "Warning",
      text: `Are you sure to delete this data (ID: ${emp_id})?`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return axios
          .delete(`/api/employees?emp_id=${emp_id}`)
          .then((response: any) => {})
          .catch((error) => {});
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Success",
          text: `Success delete data employee (ID: ${emp_id})`,
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          getData();
        });
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="bg-white pb-10 md:pb-32 pt-5 h-screen">
      <div className="grid gap-4 px-8 mx-auto md:w-5/12 mt-10">
        <div className="justify-center content-center">
          <div className="grid md:grid-cols-2">
            <h6 className="mb-4 max-w-3xl text-5xl leading-none text-blac font-sans font-bold">
              SMU Employees
            </h6>
            <div className="flex items-center justify-end">
              <button
                className="btn bg-blue-600 text-white w-full md:w-20 h-8 mx-1 flex justify-center items-center p-1 rounded-lg transform transition duration-500 hover:scale-110"
                onClick={() => router.push("/tailwind/employees/add")}
              >
                <BiAddToQueue size={30} />
              </button>
            </div>
          </div>
          <hr />
          {loader ? (
            <div className="flex flex-row my-5 justify-center">
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
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
            </div>
          ) : (
            <div className="flex flex-col my-5">
              {data.map((data: any, index: number) => {
                return (
                  <Employeebar
                    index={index}
                    data={data}
                    deleteEmp={deleteData}
                    key={index}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
