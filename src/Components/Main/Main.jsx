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

  const formatPrice = (price) => {
    return new Intl.NumberFormat("uz-UZ", {
      style: "currency",
      currency: "UZS",
      minimumFractionDigits: 2,
    }).format(price);
  };

  const handleAdd = () => {
      
      if (newPerson.trim() !== "" && newFood.trim() !== "" && newPrice.trim() !== "") {
        setArray([
          ...array,
          { id: Date.now(), name: newPerson, food: newFood, price: formatPrice(newPrice) },
        ]);
        setNewPerson("");
        setNewFood("");
        setNewPrice("");
        setModal(true);
      }
      // Add All Paid
      if (whoPaid.trim() !== "" && allPrice.trim() !== "") {
        setArray2([
          ...array2,
          { id: Date.now(), whoPaidAll: whoPaid, allPrice: formatPrice(allPrice) },
        ]);
        setWhoPaid("");
        setAllPrice("");
        setModal(true);
      }
  };

  return (
    <div>
        <div className="container h-[200vh] relative">
            <table>
                <thead>
                    <tr>
                        <th className="w-[320px] border-black border-[1px]">Person</th>
                        <th className="w-[200px] mr-[10px] border-black border-[1px]">Food</th>
                        <th className="w-[20%] border-black border-[1px]">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {array.map((item) => (
                    <tr key={item.id}>
                        <td className="border-black border-[1px]">{item.name}</td>
                        <td className="border-black border-[1px]">{item.food}</td>
                        <td className="border-black border-[1px]">{item.price} so&rsquo;m</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <table>
                <tbody>
                    {array2.map((item) => (
                    <tr key={item.id} className="flex gap-[100px] mt-7 mb-7">
                        <td className="border-[1px] border-black">{item.whoPaidAll}</td>
                        <td className="border-[1px] border-black">{item.allPrice}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <button className="bg-black text-white p-[10px] rounded m-[10px]" onClick={() => setModal(!modal)}>
                {modal ? "Add Item" : "Add All Paid"}
            </button>

            <div className="m-[50px]">
                <button className="bg-black text-white p-[10px] rounded">Reckoning</button>
            </div>
        </div>
        <div className="bg-slate-500 w-[30%] h-[100vh] fixed top-0 right-0" style={{ display: `${modal ? "none" : "block"}`}}>
            <h3 className="pl-4 pt-4" >New Prices</h3>
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
            <h3 className="pl-4" >Who paid</h3>
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
  );
}

export default Main;
