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
    
    <tbody>
      <tr>
        <td rowSpan={commonFood.length + 2} className="border border-black">
          Common
        </td>
      </tr>

      {commonFood.map((item, index) => (
        <tr key={item.id}>
          <td className="border border-black">
            {index == 0 && (
              <button
                onClick={() => setInputOpen(!isInputOpen)}
                className="plus border-none w-[30px] bg-slate-300"
              >
                +
              </button>
            )}
            {item.foodName}
          </td>
          <td className="border border-black">{item.numOfFood}</td>
          <td className="border border-black">{item.price} so&rsquo;m</td>
          {index == 0 && (
            <td className="border border-black" rowSpan={commonFood.length}>
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
        <tr>
          <td className="border border-black">
            <input
              className="w-[100%]"
              type="text"
              placeholder="Food"
              value={newFoodName}
              onChange={(e) => setNewFoodName(e.target.value)}
            />
          </td>
          <td className="border border-black">
            <input
              className="w-[100%]"
              type="number"
              placeholder="Num"
              value={numOfFood}
              onChange={(e) => setNumOfFood(e.target.value)}
            />
          </td>
          <td className="border border-black">
            <input
              className="w-[100%]"
              type="number"
              placeholder="Price"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
          </td>
          <td>
            <button
              className="bg-black text-white w-[100%]"
              onClick={addCommonFoods}
            >
              add common food
            </button>
          </td>
        </tr>
      )}
    </tbody>
  );
}

export default CommonFood;
