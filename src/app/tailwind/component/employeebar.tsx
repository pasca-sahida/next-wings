import {
  BsPersonLinesFill,
  BsPencilSquare,
  BsFillTrashFill,
} from "react-icons/bs";
import { useRouter } from "next/navigation";

export default function Employeebar(props: any) {
const router: any = useRouter();
  const { index, data, deleteEmp } = props;
  const isEven: boolean = index % 2 == 0 ? true : false;

  return (
    <div className="flex flex-col md:flex-row my-5 transform transition duration-500 hover:scale-110 p-5 border border-slate-300 rounded-lg font-sans">
      <div className="w-full md:w-2/12 flex justify-center">
        <div
          className={`w-10 h-10 ${
            isEven ? "bg-green-500" : "bg-red-500"
          } rounded-full text-white flex justify-center items-center`}
        >
          <BsPersonLinesFill size={20} />
        </div>
      </div>
      <div className="w-full md:w-2/4 font-semibold flex items-center">
        {data.emp_id} - {data.emp_name}
      </div>
      <div className="w-full md:w-1/12 text-sm flex justify-center items-center">
        {data.emp_gender}
      </div>
      <div className="w-full md:w-2/12 text-sm flex justify-center items-center">
        {data.emp_birthday}
      </div>
      <div className="w-full md:w-1/12 grid grid-cols-2 gap-1 md:gap-2 justify-items-center content-center mt-2">
        <button className="btn bg-blue-600 text-white w-full md:w-8 h-8 mx-1 flex justify-center items-center p-2 rounded-lg"
        onClick={() => {
            router.push(`/tailwind/employees/update?emp_id=${data.emp_id}`, undefined, { shallow: true });
        }}
        >
          <BsPencilSquare size={15} />
        </button>
        <button
          className="btn bg-red-600 text-white w-full md:w-8 h-8 mx-1 flex justify-center items-center p-2 rounded-lg"
          onClick={() => deleteEmp(data.emp_id)}
        >
          <BsFillTrashFill size={15} />
        </button>
      </div>
    </div>
  );
}
