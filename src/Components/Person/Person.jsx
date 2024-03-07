/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// Person.js
import React from "react";

function Person({ foods, removePerson, isModalOpen, setModalOpen, addPersonItem, newPersonName, numOfFood, newPrice, paidAmount, setNewPersonName, setNumOfFood, setNewPrice, setPaidAmount}) {

  return (
    <>
      <div className="table-row-group hidden sm:block">
        {foods.map((person) => (
          <React.Fragment key={person.id}>
            {person.personItems.map((foodItem, foodIndex) => (
              <div key={foodItem.id} className="table-row">
                {foodIndex === 0 && (
                  <td
                    className="border-[1px] border-black table-cell"
                    rowSpan={person.personItems.length}
                  >
                    {person.foodName}
                  </td>
                )}

                <div className="border-[1px] border-black table-cell">
                  {foodIndex === 0 && (
                    <button
                      onClick={() => setModalOpen(!isModalOpen)}
                      className="plus border-none w-[30px] bg-slate-300 invisible sm:visible"
                    >
                      +
                    </button>
                  )}
                  {foodItem.name}
                </div>

                <div className="border-[1px] border-black table-cell">
                  {foodItem.numOfFood}
                </div>

                <div className="border-[1px] border-black table-cell">{foodItem.price}</div>

                {foodIndex === 0 && (
                  <td
                    className="border-[1px] border-black"
                    rowSpan={person.personItems.length}
                  >
                    {person.personItems.reduce((total, food) => {
                      const itemAmount =
                        parseInt(food.numOfFood, 10) * parseInt(food.price);
                      return total + itemAmount;
                    }, 0)}
                    so&rsquo;m
                  </td>
                )}

                <div className="border-[1px] border-black table-cell">{foodItem.paid}</div>

                <div className="table-cell">
                  {foodIndex === 0 && (
                    <button onClick={() => removePerson(person.id)}>
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      <div className="table-row-group invisible sm:visible">
        {!isModalOpen && (
          <div className="table-row">
            <div className="table-cell"></div>
            <div className="border-[1px] border-black table-cell">
              <input
                className="w-[100%]"
                type="text"
                placeholder="Name"
                value={newPersonName}
                onChange={(e) => setNewPersonName(e.target.value)}
              />
            </div>
            <div className="border-[1px] border-black table-cell">
              <input
                className="w-[100%]"
                type="text"
                placeholder="Num"
                value={numOfFood}
                onChange={(e) => setNumOfFood(e.target.value)}
              />
            </div>
            <div className="border-[1px] border-black table-cell">
              <input
                className="w-[100%]"
                type="number"
                placeholder="Price"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
              />
            </div>
            <div className="table-cell"></div>
            <div className="border-[1px] border-black table-cell">
              <input
                className="w-[100%]"
                type="number"
                placeholder="Paid"
                value={paidAmount}
                onChange={(e) => setPaidAmount(e.target.value)}
              />
            </div>
            <div className="table-cell">
              <button
                className="bg-black text-white w-[100px] "
                onClick={() => addPersonItem(foods[foods.length - 1].id)}
              >
                Add person
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Person;
