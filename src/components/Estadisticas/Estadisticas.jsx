import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const Estadisticas = ({ invitadosArr, evento }) => {
  console.log("ESTADISTICAS", invitadosArr);
  const pending = invitadosArr?.filter((p) => p.status === "pendiente").length;
  const accredited = invitadosArr?.filter(
    (p) => p.status == "acreditado"
  ).length;

  const percentage = Math.floor((accredited * 100) / invitadosArr?.length);
  const percentage2 = percentage.toString();
  console.log(percentage2);
  const data = {
    labels: ["Acreditados", "Pendientes"],
    datasets: [
      {
        label: "# of Votes",
        data: [accredited, pending],
        backgroundColor: ["rgba(54, 162, 235, 0.5)", "rgba(255, 99, 132, 0.5)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <div className="grid  sm:flex sm:justify-center gap-x-6">
        <span
          className="gap-1 md:mx-0 mx-auto
            item-center bg-teal-400 w-[300px] h-[90px] mt-2 pl-4 py-2 rounded-md"
        >
          <Link to={`/eventos/${evento?.id}/invitados`}>
            <h5 className="font-semibold text-gray-50">Invitados</h5>
            <p className="font-semibold text-gray-50">{invitadosArr?.length}</p>
          </Link>
        </span>
        <span
          className="gap-1 md:mx-0 mx-auto
        item-center bg-[#36a2eb80] w-[300px] h-[90px] mt-2 pl-4 py-2 rounded-md"
        >
          <h5 className="font-semibold text-gray-50">Acreditados</h5>
          <p className="font-semibold text-gray-50">{accredited}</p>
        </span>
        <span
          className="gap-1  md:mx-0 mx-auto
        item-center bg-[#ff638480] w-[300px] h-[90px] mt-2 pl-4 py-2 rounded-md"
        >
          <h5 className="font-semibold text-gray-50">Pendientes</h5>
          <p className="font-semibold text-gray-50">{pending}</p>
        </span>
      </div>
      {percentage && (
        <div className="w-full mt-6 sm:w-1/2 mx-auto">
          <Pie data={data} />;
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
        <div
          className={`bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full `}
          style={{ width: `${percentage2}%` }}
        >
          {" "}
          {!percentage ? 0 : percentage}%
        </div>
      </div>
    </>
  );
};

export default Estadisticas;
