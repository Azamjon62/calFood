/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// InputForm.js
import React from "react";

function InputForm({
  newPersonName,
  newFoodName,
  numOfFood,
  newPrice,
  paidAmount,
  setNewPersonName,
  setNewFoodName,
  setNumOfFood,
  setNewPrice,
  setPaidAmount,
}) {
  return (
    <div className="table-row-group invisible sm:visible">
      <div className="table-row">
        <div className="border-[1px] border-black table-cell ">
          <input
            className="w-[100%]"
            type="text"
            placeholder="Food Name"
            value={newFoodName}
            onChange={(e) => setNewFoodName(e.target.value)}
          />
        </div>
        <div className="border-[1px] border-black table-cell ">
          <input
            className="w-[100%]"
            type="text"
            placeholder="Person Name"
            value={newPersonName}
            onChange={(e) => setNewPersonName(e.target.value)}
          />
        </div>
        <div className="border-[1px] border-black table-cell ">
          <input
            className="w-[100%]"
            type="number"
            placeholder="Count"
            value={numOfFood}
            onChange={(e) => setNumOfFood(e.target.value)}
          />
        </div>
        <div className="border-[1px] border-black table-cell ">
          <input
            className="w-[100%]"
            type="number"
            placeholder="Price"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
        </div>
        <div className="table-cell "></div>
        <div className="border-[1px] border-black table-cell ">
          <input
            className="w-[100%]"
            type="number"
            placeholder="Paid"
            value={paidAmount}
            onChange={(e) => setPaidAmount(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default InputForm;
