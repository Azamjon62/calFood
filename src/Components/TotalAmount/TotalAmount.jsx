/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

// TotalAmount.js
import React from "react";

function TotalAmount({ totalAmount }) {
  return (
    <>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td colSpan={2} className="border border-black">
          Total: {totalAmount()} so&rsquo;m
        </td>
        <td></td>
      </tr>
    </>
  );
}

export default TotalAmount;
