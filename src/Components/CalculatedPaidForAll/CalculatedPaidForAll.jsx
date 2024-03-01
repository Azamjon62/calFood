/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// CalculatedPaidForAll.js
import React from "react";

function CalculatedPaidForAll({ calculatedPaidForAll }) {
  return (
    <>
      {calculatedPaidForAll.length ? (
        <table className="mt-[50px] hidden sm:block">
          <thead>
            <tr>
              <th className="w-[320px] border-black border-[1px]">Person</th>
              <th className="w-[30%] border-black border-[1px]">Will get</th>
            </tr>
          </thead>
          <tbody className="m-[100px]">
            {calculatedPaidForAll.map((item) => (
              <tr key={item.id}>
                <td className="border-[1px] border-black">{item.name}</td>
                <td className="border-[1px] border-black">{item.paid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </>
  );
}

export default CalculatedPaidForAll;
