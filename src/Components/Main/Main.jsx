import { useState } from "react";

function Main() {
    const [modal, setModal] = useState(true);
    const [array, setArray] = useState([]);
    const [newPerson, setNewPerson] = useState('');
    const [newFood, setNewFood] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [whoPaid, setWhoPaid] = useState('');
    const [allPrice, setAllPrice] = useState('');
  
    const formatPrice = (price) => {
        return new Intl.NumberFormat('uz-UZ', {
          style: 'currency',
          currency: 'UZS',
          minimumFractionDigits: 2,
        }).format(price);
    };

    
    const addItem = () => {
        if (newPerson.trim() !== '') {
            setArray([...array, { id: Date.now(), name: newPerson, food: newFood, price: formatPrice(newPrice), whoPaidAll: whoPaid, allPrice:  formatPrice(allPrice) }]);
            setNewPerson('');
            setNewFood('');
            setNewPrice('');
            setWhoPaid('');
            setAllPrice('');
            setModal(true);
        }
    };
    // const removeTask = (taskId) => {
    //   setArray(name.filter(task => task.id !== taskId));
    // };

    console.log(array);

  return (
    <div>
        <div className="container h-[200vh] relative">
            <table>
                <thead>
                    <tr >
                        <th className=" w-[320px] border-black border-[1px]" >Person</th>
                        <th className=" w-[200px] mr-[10px] border-black border-[1px]" >Food</th>
                        <th className="w-[20%] border-black border-[1px]" >Price</th>
                    </tr>
                </thead>
                <tbody >
                    {array.map(item => (
                        <tr key={item.id}>
                            <td className="border-black border-[1px]">
                            {item.name}
                            </td>
                            <td className="border-black border-[1px]">{item.food}</td>
                            <td className="border-black border-[1px]">{item.price} so&rsquo;m</td>
                        </tr>
                    ))}


                    {
                        array.map(item => (
                            <tr key={item.id} className="flex gap-[100px]  mt-7 mb-7" >
                                <td className="border-[1px] border-black" >{item.whoPaidAll}</td>
                                <td className="border-[1px] border-black"  >{item.allPrice}</td>
                            </tr>
                        ))
                    }
                </tbody>
                <button className="bg-black text-white p-[10px] rounded m-[10px]" onClick={() => { modal ? setModal(false) : setModal(true)}} >{modal ? 'Add Item' : 'Close Modal'}</button>
            </table>

            <div className="m-[50px]" >
                <button className=" bg-black text-white p-[10px] rounded" >Reckoning</button>
            </div>
        </div>
        <div className=" bg-slate-500 w-[30%] h-[100vh] fixed top-0 right-0" style={{
            display: `${modal ? 'none' : 'block'}`
        }}>
            <div className="flex gap-4 flex-wrap flex-col p-4" >
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
                {/* <button className="border-[1px] bg-white" onClick={addItem}>Add Item</button> */}
            </div>
            <br />
            <div className="flex gap-4 p-4 flex-wrap flex-col" >
                <input
                    type="text"
                    placeholder="Who paid"
                    value={whoPaid}
                    onChange={(e) => setWhoPaid(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="All price"
                    value={allPrice}
                    onChange={(e) => setAllPrice(e.target.value)}
                />
                <button className="border-[1px] bg-white" onClick={addItem} >Add</button>
            </div>

        </div>

    </div>
  );
}

export default Main;
