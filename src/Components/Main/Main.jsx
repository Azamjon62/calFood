import { useState } from "react";

function Main() {
  const [modal, setModal] = useState(true);
  const [array, setArray] = useState([]);
  const [array2, setArray2] = useState([]);
  const [newPerson, setNewPerson] = useState("");
  const [newFood, setNewFood] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [whoPaid, setWhoPaid] = useState("");
  const [allPrice, setAllPrice] = useState("");

  const [newArray, setNewArray] = useState([]);
  const [newArray2, setNewArray2] = useState([]);

  // const formatPrice = (price) => {
  //   return new Intl.NumberFormat({
  //     style: "currency",
  //     currency: "UZS",
  //     minimumFractionDigits: 2,
  //   }).format(price);
  // };

  const handleAdd = () => {
    if (
      newPerson.trim() !== "" &&
      newFood.trim() !== "" &&
      newPrice.trim() !== ""
    ) {
      setArray((prevArray) => [
        ...prevArray,
        {
          id: Date.now(),
          name: newPerson,
          food: newFood,
          price: newPrice,
        },
      ]);
      setNewPerson("");
      setNewFood("");
      setNewPrice("");
      setModal(true);
    }
    // Add All Paid
    if (whoPaid.trim() !== "" && allPrice.trim() !== "") {
      setArray2((prevArray2) => [
        ...prevArray2,
        {
          id: Date.now(),
          whoPaidAll: whoPaid,
          allPrice: allPrice,
        },
      ]);
      setWhoPaid("");
      setAllPrice("");
      setModal(true);
    }
  };

  const calculatePrice = () => {
    const hammaItem = array.find((item) => item.name === "hamma");

    if (hammaItem) {
      const peopleCount = array.length - 1;
      const hammaValue = parseFloat(hammaItem.price) / peopleCount;

      const updatedArray = array.map((item) => {
        if (item.name !== "hamma") {
          return {
            ...item,
            price: parseFloat(item.price) + hammaValue,
          };
        }
        return item;
      });

      setNewArray(updatedArray);

      const whoAllPaid = array2.map((item) => item);
      const allPaid = updatedArray.map((item) => item);

      const resultWhoAllPaid = allPaid.find(
        (item) => item.name === whoAllPaid[0]?.whoPaidAll
      );

      if (resultWhoAllPaid) {
        const updatedArray2 = array2.map((item) => {
          if (resultWhoAllPaid.name === item.whoPaidAll) {
            return {
              ...item,
              allPrice: 
                parseFloat(item.allPrice) - resultWhoAllPaid.price
              
            };
          }
          return item;
        });

        setNewArray2(updatedArray2);
      }
    }
  };

  return (
    <div>
      <div className="container relative">
        <table className="mt-[20px]">
          <thead>
            <tr>
              <th className="w-[320px] border-black border-[1px]">Person</th>
              <th className="w-[200px] mr-[10px] border-black border-[1px]">
                Food
              </th>
              <th className="w-[20%] border-black border-[1px]">Price</th>
            </tr>
          </thead>
          <tbody>
            {array.map((item) => (
              <tr key={item.id}>
                <td className="border-black border-[1px]">{item.name}</td>
                <td className="border-black border-[1px]">{item.food}</td>
                <td className="border-black border-[1px]">
                  {item.price} so&rsquo;m
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="bg-black text-white p-[10px] rounded m-[10px]"
          onClick={() => setModal(!modal)}
        >
          {modal ? "Add Item" : "Close Modal"}
        </button>
        <div className="mt-[350px] text-center">
          <table className="m-auto mb-[100px]">
            {array2.length ? (
              <thead>
                <tr>
                  <th className="w-[320px] border-black border-[1px]">
                    Who Paid all
                  </th>
                  <th className="w-[200px] mr-[10px] border-black border-[1px]">
                    Price
                  </th>
                </tr>
              </thead>
            ) : (
              ""
            )}

            <tbody>
              {array2.map((item) => (
                <tr key={item.id}>
                  <td className="border-[1px] border-black">
                    {item.whoPaidAll}
                  </td>
                  <td className="border-[1px] border-black">{item.allPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            className="bg-black text-white p-[10px] rounded"
            onClick={calculatePrice}
          >
            Calculate
          </button>
        </div>
        <br /> <br /> <br /> <br />
        <table>
          {newArray.length ? (
            <thead>
              <tr>
                <th className="w-[320px] border-black border-[1px]">Person</th>
                <th className="w-[20%] border-black border-[1px]">Pay</th>
              </tr>
            </thead>
          ) : (
            ""
          )}

          <tbody>
            {newArray.map((item) => (
              <tr key={item.id}>
                <td className="border-black border-[1px]">{item.name}</td>
                <td className="border-black border-[1px]">
                  {item.price} so&rsquo;m
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br /> <br />
        <table>
          {newArray2.length ? (
            <thead>
              <tr>
                <th className="w-[320px] border-[1px] border-black">
                  Who Paid all
                </th>
                <th className="w-[20%] border-[1px] border-black">Will get</th>
              </tr>
            </thead>
          ) : (
            ""
          )}

          <tbody>
            {newArray2.map((item) => (
              <tr key={item.id}>
                <td className="border-black border-[1px]">{item.whoPaidAll}</td>
                <td className="border-black border-[1px]">
                  {item.allPrice} so&rsquo;m
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          className="bg-slate-500 w-[30%] h-[100vh] fixed top-0 right-0"
          style={{ display: `${modal ? "none" : "block"}` }}
        >
          <h3 className="pl-4 pt-4">New Prices</h3>
          <div className="flex gap-4 flex-wrap flex-col p-4">
            <input
              type="text"
              placeholder="Person"
              value={newPerson}
              onChange={(e) => setNewPerson(e.target.value)}
            />
            <input
              type="text"
              placeholder="Food"
              value={newFood}
              onChange={(e) => setNewFood(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
          </div>
          <br />
          <h3 className="pl-4">Who paid</h3>
          <div className="flex gap-4 p-4 flex-wrap flex-col">
            <input
              type="text"
              placeholder="Who pai (optional)"
              value={whoPaid}
              onChange={(e) => setWhoPaid(e.target.value)}
            />
            <input
              type="number"
              placeholder="All price (optional)"
              value={allPrice}
              onChange={(e) => setAllPrice(e.target.value)}
            />
            <button className="border-[1px] bg-white" onClick={handleAdd}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
