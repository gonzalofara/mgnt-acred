import React from "react";
import { useHistory } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const ArchivoAside = () => {
  const history = useHistory();
  return (
    <div className="w-60 invisible md:visible md:h-full md:dark:bg-gray-900 md:px-1 absolute">
      <ul className="relative py-4">
        <li className="relative grid text-left mt-6">
          <span className="px-6 text-gray-400 uppercase text-sm">Acciones</span>

          <div
            className="flex gap-px items-center text-sm cursor-pointer px-6 h-10 overflow-hidden text-teal-500 text-ellipsis whitespace-nowrap rounded hover:text-teal-400 hover:bg-gray-200 transition duration-300 ease-in-out"
            onClick={() => history.goBack()}
          >
            <IoMdArrowRoundBack size={22} />
            <span className="text-gray-600 hover:text-gray-700 text-base">
              Volver
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ArchivoAside;
