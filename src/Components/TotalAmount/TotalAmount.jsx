/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

// TotalAmount.js
import React from "react";

function TotalAmount({ totalAmount, commonFood, foods }) {
  return (
    <>
      <tr className="invisible sm:visible">
        <td></td>
        <td></td>
        <td></td>
        {foods.length > 0 || commonFood.length > 0 ? (
            <td colSpan={2} className="border border-black">
              Total: {totalAmount()} so&rsquo;m
            </td>
          ) : null}
        <td></td>
      </tr>
    </>
  );
}

export default TotalAmount;
