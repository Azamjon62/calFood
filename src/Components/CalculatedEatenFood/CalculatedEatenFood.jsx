/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// CalculatedEatenFood.js
import React from "react";

function CalculatedEatenFood({ calculatedEatenFood }) {
  return (
    <>
      {calculatedEatenFood.length ? (
        <table className="mt-[60px] hidden sm:block">
          <thead>
            <tr>
              <th className="w-[320px] border-black border-[1px]">Person</th>
              <th className="w-[25%]  border-black border-[1px]">Food</th>
              <th className="w-[50px] border-black border-[1px]">&#8470;</th>
              <th className="w-[15%] border-black border-[1px]">Price</th>
              <th className="w-[15%] border-black border-[1px]">Will Pay</th>
            </tr>
          </thead>

          <tbody>
            {calculatedEatenFood.map((person) => (
              <React.Fragment key={person.id}>
                {person.foodItems.map((foodItem, foodIndex) => (
                  <tr key={foodItem.id}>
                    {foodIndex === 0 && (
                      <td
                        className="border-[1px] border-black"
                        rowSpan={person.foodItems.length}
                      >
                        {person.name}
                      </td>
                    )}
                    <td className="border-[1px] border-black">
                      {foodItem.foodName}
                    </td>
                    <td className="border-[1px] border-black">
                      {foodItem.numOfFood}
                    </td>
                    <td className="border-[1px] border-black">
                      {foodItem.price}
                    </td>

                    {foodIndex == 0 && (
                      <td
                        className="border-[1px] border-black"
                        rowSpan={person.foodItems.length}
                      >
                        {person.foodItems.reduce((total, food) => {
                          const itemAmount =
                            parseInt(food.numOfFood, 10) * parseInt(food.price);
                          return total + itemAmount;
                        }, 0)}
                        so&rsquo;m
                      </td>
                    )}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : null}
    </>
  );
}

export default CalculatedEatenFood;
