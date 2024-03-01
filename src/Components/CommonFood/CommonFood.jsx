/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// CommonFood.js
import React from "react";

function CommonFood({
  commonFood,
  addCommonFoods,
  setInputOpen,
  isInputOpen,
  setNewFoodName,
  setNumOfFood,
  setNewPrice,
  newFoodName,
  numOfFood,
  newPrice,
}) {
  return (
    <table className="table-row-group"> 
      {commonFood.length > 0 && (
        <tr className="table-row">
          <td rowSpan={commonFood.length + 2} className="border border-black table-cell">
            Common
          </td>
        </tr>
      )}


      {commonFood.map((item, index) => (
        <tr className="table-row" key={item.id}>
          <td className="border border-black flex">
            {index == 0 && (
              <button
                onClick={() => setInputOpen(!isInputOpen)}
                className="plus border-none w-[30px] bg-slate-300 hidden sm:block"
              >
                +
              </button>
            )}
            {item.foodName}
          </td>
          <td className="border border-black table-cell">{item.numOfFood}</td>
          <td className="border border-black table-cell">{item.price} so&rsquo;m</td>
          {index == 0 && (
            <td className="border border-black table-cell" rowSpan={commonFood.length}>
              {commonFood.reduce((total, food) => {
                const itemAmount =
                  parseInt(food.numOfFood, 10) * parseInt(food.price);

                return total + itemAmount;
              }, 0)}{" "}
              so&rsquo;m
            </td>
          )}
        </tr>
      ))}

      {isInputOpen && (
        <tr className="table-row invisible sm:visible">
          <td className="border border-black table-cell">
            <input
              className="w-[100%]"
              type="text"
              placeholder="Food"
              value={newFoodName}
              onChange={(e) => setNewFoodName(e.target.value)}
            />
          </td>
          <td className="border border-black table-cell">
            <input
              className="w-[100%]"
              type="number"
              placeholder="Count"
              value={numOfFood}
              onChange={(e) => setNumOfFood(e.target.value)}
            />
          </td>
          <td className="border border-black table-cell">
            <input
              className="w-[100%]"
              type="number"
              placeholder="Price"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
          </td>
          <td className="table-cell">
            <button
              className="bg-black text-white w-[100%]"
              onClick={addCommonFoods}
            >
              Add common food
            </button>
          </td>
        </tr>
      )}
    </table>
  );
}

export default CommonFood;
