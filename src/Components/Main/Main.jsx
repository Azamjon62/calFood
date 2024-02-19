import { useState } from "react";
import Person from "../Person/Person";
import CommonFood from "../CommonFood/CommonFood";
import InputForm from "../InputForm/InputForm";
import TotalAmount from "../TotalAmount/TotalAmount";
import CalculatedEatenFood from "../CalculatedEatenFood/CalculatedEatenFood";
import CalculatedPaidForAll from "../CalculatedPaidForAll/CalculatedPaidForAll";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
// import Zoom from "@mui/material/Zoom";
// import Fab from "@mui/material/Fab";
// import AddIcon from "@mui/icons-material/Add";
// import EditIcon from "@mui/icons-material/Edit";
// import UpIcon from "@mui/icons-material/KeyboardArrowUp";
// import { green } from "@mui/material/colors";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}

// const fabStyle = {
//   position: 'absolute',
//   bottom: 16,
//   right: 16,
// };

// const fabGreenStyle = {
//   color: 'common.white',
//   bgcolor: green[500],
//   '&:hover': {
//     bgcolor: green[600],
//   },
// };

function Main() {
  const [isModalOpen, setModalOpen] = useState(true);
  const [isInputOpen, setInputOpen] = useState(true);
  const [foods, setFoods] = useState([]);
  const [people, setPeople] = useState([]);
  const [commonFood, setCommonFood] = useState([]);
  const [newPersonName, setNewPersonName] = useState("");
  const [newFoodName, setNewFoodName] = useState("");
  const [numOfFood, setNumOfFood] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [paidAmount, setPaidAmount] = useState("");

  const [calculatedEatenFood, setCalculatedEatenFood] = useState([]);
  const [calculatedPaidForAll, setCalculatedPaidForAll] = useState([]);

  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const addPerson = () => {
    if (newFoodName.trim() !== "" && newPersonName.trim() !== "") {
      const newFood = {
        id: Date.now(),
        foodName: newFoodName,
        personItems: [
          {
            id: Date.now() + 1,
            name: newPersonName,
            numOfFood,
            price: newPrice,
            paid: paidAmount,
          },
        ],
      };

      setPeople([...people, ...newFood.personItems]);
      setFoods([...foods, newFood]);
      setNewPersonName("");
      setNewFoodName("");
      setNumOfFood("");
      setNewPrice("");
      setPaidAmount("");
    }
  };

  const addPersonItem = (foodId) => {
    const selectedFood = foods.find((food) => food.id === foodId);

    if (selectedFood) {
      const updatedFoodItems = selectedFood.personItems.concat({
        id: Date.now(),
        name: newPersonName,
        numOfFood,
        price: newPrice,
        paid: paidAmount,
      });

      const updatedFoods = foods.map((food) => {
        if (food.id === foodId) {
          return {
            ...food,
            personItems: updatedFoodItems,
          };
        }
        return food;
      });

      setFoods(updatedFoods);

      const newPersonItem = {
        id: Date.now(),
        name: newPersonName,
        numOfFood,
        price: newPrice,
        paid: paidAmount,
      };

      setPeople((prevPeople) => [...prevPeople, newPersonItem]);
      setNewFoodName("");
      setNumOfFood("");
      setNewPrice("");
      setPaidAmount("");
      setPaidAmount("");
      setModalOpen(true);
    }
  };

  const addCommonFoods = () => {
    const newCommonFood = {
      id: Date.now(),
      foodName: newFoodName,
      numOfFood,
      price: newPrice,
      paid: paidAmount,
    };

    setCommonFood([...commonFood, newCommonFood]);
    setPeople([...people, newCommonFood]);
    setNewFoodName("");
    setNumOfFood("");
    setNewPrice("");
    setPaidAmount("");
    setInputOpen(false);
  };

  const removePerson = (personId) => {
    const updatedPeople = foods.filter((food) => food.id !== personId);
    setFoods(updatedPeople);
  };

  const totalAmount = () => {
    const totalPeopleAmount = foods.reduce((total, person) => {
      const personAmount = person.personItems.reduce(
        (personTotal, foodItem) =>
          personTotal +
          parseInt(foodItem.numOfFood, 10) * parseInt(foodItem.price),
        0
      );

      return total + personAmount;
    }, 0);

    const totalCommonFoodAmount = commonFood.reduce(
      (total, foodItem) =>
        total + parseInt(foodItem.numOfFood, 10) * parseInt(foodItem.price),
      0
    );

    return totalPeopleAmount + totalCommonFoodAmount;
  };

  const totalCommonFoodAmount = commonFood.reduce(
    (total, foodItem) =>
      total + parseInt(foodItem.numOfFood, 10) * parseInt(foodItem.price),
    0
  );

  const calculatePrice = () => {
    if (foods.length) {
      const updatedItems = foods.flatMap((item) => {
        if (item.personItems.length) {
          return item.personItems.map((personItem) => ({
            id: personItem.id,
            name: personItem.name,
            paid: personItem.paid,
            foodItems: [
              {
                id: item.id,
                foodName: item.foodName,
                numOfFood: personItem.numOfFood,
                price: personItem.price,
              },
            ],
          }));
        }
        return [];
      });

      const processedNames = [];
      const updatedItems2 = updatedItems
        .map((item, index) => {
          if (!processedNames.includes(item.name)) {
            processedNames.push(item.name);

            const matchingElements = updatedItems.filter((element2, i) => {
              return i !== index && item.name === element2.name;
            });

            if (matchingElements.length > 0) {
              const uniqueItem = {
                ...item,
                foodItems: [
                  ...item.foodItems,
                  ...matchingElements.flatMap(
                    (matchingElement) => matchingElement.foodItems
                  ),
                ],
              };

              return uniqueItem;
            } else {
              return item;
            }
          } else {
            return null;
          }
        })
        .filter(Boolean);

      const commonExpenseValue = totalCommonFoodAmount / updatedItems2.length;

      const updated = updatedItems2.map((item) => {
        return {
          ...item,
          foodItems: item.foodItems.map((foodItem, index) => {
            const updatedPrice =
              index === 0
                ? parseInt(foodItem.price) + commonExpenseValue
                : parseInt(foodItem.price);

            return {
              ...foodItem,
              price: updatedPrice,
            };
          }),
        };
      });

      setCalculatedEatenFood(updated);

      const updatedPayments = updatedItems2.map((payment) => {
        const matchingItem = updated.find((item) => {
          return item.paid != "";
        });

        if (matchingItem) {
          return {
            ...payment,
            paid:
              parseInt(payment.paid) -
              matchingItem.foodItems.reduce((total, food) => {
                const itemAmount =
                  parseInt(food.numOfFood, 10) * parseInt(food.price);
                return total + itemAmount;
              }, 0),
          };
        }
        return payment;
      });

      setCalculatedPaidForAll(
        updatedPayments.filter((item) => !isNaN(item.paid))
      );
    }
  };

  return (
    <div className="container">
      <div className="sm:hidden">
        <AppBar position="static" color="default">
          <Tabs
            className="m-auto"
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="primary tabs example"
          >
            <Tab label="Food" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="flex flex-col gap-5">
              <div className="border-[1px] border-black">
                <input
                  className="w-[100%]"
                  type="text"
                  placeholder="Food Name"
                  value={newFoodName}
                  onChange={(e) => setNewFoodName(e.target.value)}
                />
              </div>
              <div className="border-[1px] border-black flex ">
                <button
                  onClick={() => setModalOpen(!isModalOpen)}
                  className="plus border-none w-[30px] bg-slate-300"
                >
                  +
                </button>

                <input
                  className="w-[100%]"
                  type="text"
                  placeholder="Person Name"
                  value={newPersonName}
                  onChange={(e) => setNewPersonName(e.target.value)}
                />
              </div>
              <div className="border-[1px] border-black ">
                <input
                  className="w-[100%]"
                  type="number"
                  placeholder="Num"
                  value={numOfFood}
                  onChange={(e) => setNumOfFood(e.target.value)}
                />
              </div>
              <div className="border-[1px] border-black ">
                <input
                  className="w-[100%]"
                  type="number"
                  placeholder="Price"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                />
              </div>
              {/* <div className="table-cell "></div> */}
              <div className="border-[1px] border-black  ">
                <input
                  className="w-[100%]"
                  type="number"
                  placeholder="Paid"
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(e.target.value)}
                />
              </div>
              <button
                className="bg-black text-white p-[5px] rounded"
                onClick={addPerson}
              >
                Add Food
              </button>

              {!isModalOpen && <hr className=" mt-4 bg-black h-[1px]" />}

              <div className="table-row-group ">
                {!isModalOpen && (
                  <div className="flex flex-col gap-5">
                    <h4>Add Person</h4>
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
                        className="bg-black text-white p-[5px] rounded w-[100%]"
                        onClick={() =>
                          addPersonItem(foods[foods.length - 1].id)
                        }
                      >
                        Add Person
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            b
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            c
          </TabPanel>
        </SwipeableViews>
      </div>

      <div className="mt-[20px] table ">
        <div className="table-header-group ">
          <div className="table-row">
            <div className="w-[320px] border-black border-[1px] table-cell text-center">
              Food
            </div>
            <div className="w-[15%]  border-black border-[1px] table-cell text-center">
              Person
            </div>
            <div className="w-[50px] border-black border-[1px] table-cell text-center">
              &#8470;
            </div>
            <div className="w-[15%] border-black border-[1px] table-cell text-center">
              Price
            </div>
            <div className="w-[15%] border-black border-[1px] table-cell text-center">
              Amount
            </div>
            <div className="w-[15%] border-black border-[1px] table-cell text-center">
              Paid
            </div>
            <div className="w-[100px] "></div>
          </div>
        </div>
        <Person
          foods={foods}
          removePerson={removePerson}
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
          addPersonItem={addPersonItem}
          newPersonName={newPersonName}
          numOfFood={numOfFood}
          newPrice={newPrice}
          paidAmount={paidAmount}
          setNewPersonName={setNewPersonName}
          setNumOfFood={setNumOfFood}
          setNewPrice={setNewPrice}
          setPaidAmount={setPaidAmount}
        />
        <InputForm
          newPersonName={newPersonName}
          newFoodName={newFoodName}
          numOfFood={numOfFood}
          newPrice={newPrice}
          paidAmount={paidAmount}
          setNewPersonName={setNewPersonName}
          setNewFoodName={setNewFoodName}
          setNumOfFood={setNumOfFood}
          setNewPrice={setNewPrice}
          setPaidAmount={setPaidAmount}
        />
        <br /> <br /> <br />
        <CommonFood
          commonFood={commonFood}
          addCommonFoods={addCommonFoods}
          setInputOpen={setInputOpen}
          isInputOpen={isInputOpen}
          setNewFoodName={setNewFoodName}
          setNumOfFood={setNumOfFood}
          setNewPrice={setNewPrice}
          newFoodName={newFoodName}
          numOfFood={numOfFood}
          newPrice={newPrice}
        />
        <TotalAmount totalAmount={totalAmount} />
      </div>

      <button
        className="bg-black text-white p-[10px] rounded m-[10px] mt-[30px] invisible sm:visible"
        onClick={addPerson}
      >
        Add Food
      </button>

      {calculatedEatenFood.length > 0 && (
        <CalculatedEatenFood calculatedEatenFood={calculatedEatenFood} />
      )}

      {calculatedPaidForAll.length > 0 && (
        <CalculatedPaidForAll calculatedPaidForAll={calculatedPaidForAll} />
      )}

      <div className="mt-[100px] text-center">
        <button
          className="bg-black text-white p-[10px] rounded"
          onClick={calculatePrice}
        >
          Calculate
        </button>
      </div>
    </div>

    // <div className="container">
    //   <table className="mt-[20px] table-auto">
    //     <thead>
    //       <tr>
    //         <th className="w-[320px] border-black border-[1px]">Food</th>
    //         <th className="w-[15%]  border-black border-[1px]">Person</th>
    //         <th className="w-[50px] border-black border-[1px]">&#8470;</th>
    //         <th className="w-[15%] border-black border-[1px]">Price</th>
    //         <th className="w-[15%] border-black border-[1px]">Amount</th>
    //         <th className="w-[15%] border-black border-[1px]">Paid</th>
    //         <th className="w-[15%] "></th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {foods.map((person) => (
    //         <React.Fragment key={person.id}>
    //           {person.personItems.map((foodItem, foodIndex) => (
    //             <tr key={foodItem.id}>
    //               {foodIndex === 0 && (
    //                 <td
    //                   className="border-[1px] border-black"
    //                   rowSpan={person.personItems.length}
    //                 >
    //                   {person.foodName}
    //                 </td>
    //               )}
    //               <td className="border-[1px] border-black">
    //                 {foodIndex === 0 && (
    //                   <button
    //                     onClick={() => setModalOpen(!isModalOpen)}
    //                     className="plus border-none w-[30px] bg-slate-300"
    //                   >
    //                     +
    //                   </button>
    //                 )}
    //                 {foodItem.name}
    //               </td>
    //               <td className="border-[1px] border-black">
    //                 {foodItem.numOfFood}
    //               </td>
    //               <td className="border-[1px] border-black">
    //                 {foodItem.price}
    //               </td>

    //               {foodIndex == 0 && (
    //                 <td
    //                   className="border-[1px] border-black"
    //                   rowSpan={person.personItems.length}
    //                 >
    //                   {person.personItems.reduce((total, food) => {
    //                     const itemAmount =
    //                       parseInt(food.numOfFood, 10) *
    //                       parseInt(food.price);
    //                     return total + itemAmount;
    //                   }, 0)}
    //                   so&rsquo;m
    //                 </td>
    //               )}

    //               <td className="border-[1px] border-black">{foodItem.paid}</td>
    //               <td>
    //                 {foodIndex === 0 && (
    //                   <button onClick={() => removePerson(person.id)}>
    //                     Remove
    //                   </button>
    //                 )}
    //               </td>
    //             </tr>
    //           ))}
    //         </React.Fragment>
    //       ))}
    //     </tbody>
    //     <tbody>
    //       {!isModalOpen && (
    //         <tr>
    //           <td></td>
    //           <td className="border-[1px] border-black">
    //             <input
    //               className="w-[100%]"
    //               type="text"
    //               placeholder="Name"
    //               value={newPersonName}
    //               onChange={(e) => setNewPersonName(e.target.value)}
    //             />
    //           </td>
    //           <td className="border-[1px] border-black">
    //             <input
    //               className="w-[100%]"
    //               type="text"
    //               placeholder="Num"
    //               value={numOfFood}
    //               onChange={(e) => setNumOfFood(e.target.value)}
    //             />
    //           </td>
    //           <td className="border-[1px] border-black">
    //             <input
    //               className="w-[100%]"
    //               type="number"
    //               placeholder="Price"
    //               value={newPrice}
    //               onChange={(e) => setNewPrice(e.target.value)}
    //             />
    //           </td>
    //           <td></td>
    //           <td className="border-[1px] border-black">
    //             <input
    //               className="w-[100%]"
    //               type="number"
    //               placeholder="Paid"
    //               value={paidAmount}
    //               onChange={(e) => setPaidAmount(e.target.value)}
    //             />
    //           </td>
    //           <td>
    //             <button
    //               className="bg-black text-white w-[100%]"
    //               onClick={() => addPersonItem(foods[foods.length - 1].id)}
    //             >
    //               Add Food
    //             </button>
    //           </td>
    //         </tr>
    //       )}
    //     </tbody>
    //     <tbody>
    //       <tr>
    //         <td className="border-[1px] border-black">
    //           <input
    //             className="w-[100%]"
    //             type="text"
    //             placeholder="Food Name"
    //             value={newFoodName}
    //             onChange={(e) => setNewFoodName(e.target.value)}
    //           />
    //         </td>
    //         <td className="border-[1px] border-black">
    //           <input
    //             className="w-[100%]"
    //             type="text"
    //             placeholder="Person Name"
    //             value={newPersonName}
    //             onChange={(e) => setNewPersonName(e.target.value)}
    //           />
    //         </td>
    //         <td className="border-[1px] border-black">
    //           <input
    //             className="w-[100%]"
    //             type="number"
    //             placeholder="Num"
    //             value={numOfFood}
    //             onChange={(e) => setNumOfFood(e.target.value)}
    //           />
    //         </td>
    //         <td className="border-[1px] border-black">
    //           <input
    //             className="w-[100%]"
    //             type="number"
    //             placeholder="Price"
    //             value={newPrice}
    //             onChange={(e) => setNewPrice(e.target.value)}
    //           />
    //         </td>
    //         <td></td>
    //         <td className="border-[1px] border-black">
    //           <input
    //             className="w-[100%]"
    //             type="number"
    //             placeholder="Paid"
    //             value={paidAmount}
    //             onChange={(e) => setPaidAmount(e.target.value)}
    //           />
    //         </td>
    //       </tr>
    //     </tbody>
    //     <tbody>
    //       <tr>
    //         <td></td>
    //         <td></td>
    //         <td></td>
    //         <td></td>
    //         <td colSpan={2} className="border border-black">
    //           Total: {totalAmount()} so&rsquo;m
    //         </td>
    //         <td></td>
    //       </tr>
    //     </tbody>
    //     <br /> <br /> <br />
    //     <tbody>
    //       <tr>
    //         <td rowSpan={commonFood.length + 2} className="border border-black">
    //           Common
    //         </td>
    //       </tr>

    //       {commonFood.map((item, index) => (
    //         <tr key={item.id}>
    //           <td className="border border-black">
    //             {index == 0 && (
    //               <button
    //                 onClick={() => setInputOpen(!isInputOpen)}
    //                 className="plus border-none w-[30px] bg-slate-300"
    //               >
    //                 +
    //               </button>
    //             )}
    //             {item.foodName}
    //           </td>
    //           <td className="border border-black">{item.numOfFood}</td>
    //           <td className="border border-black">{item.price} so&rsquo;m</td>
    //           {index == 0 && (
    //             <td className="border border-black" rowSpan={commonFood.length}>
    //               {commonFood.reduce((total, food) => {
    //                 const itemAmount = parseInt(food.numOfFood, 10) * parseInt(food.price)

    //                 return total + itemAmount
    //               }, 0)} so&rsquo;m
    //             </td>
    //           )}

    //         </tr>
    //       ))}

    //       {isInputOpen && (
    //         <tr>
    //           <td className="border border-black">
    //             <input
    //               className="w-[100%]"
    //               type="text"
    //               placeholder="Food"
    //               value={newFoodName}
    //               onChange={(e) => setNewFoodName(e.target.value)}
    //             />
    //           </td>
    //           <td className="border border-black">
    //             <input
    //               className="w-[100%]"
    //               type="number"
    //               placeholder="Num"
    //               value={numOfFood}
    //               onChange={(e) => setNumOfFood(e.target.value)}
    //             />
    //           </td>
    //           <td className="border border-black">
    //             <input
    //               className="w-[100%]"
    //               type="number"
    //               placeholder="Price"
    //               value={newPrice}
    //               onChange={(e) => setNewPrice(e.target.value)}
    //             />
    //           </td>
    //           <td>
    //             <button className="bg-black text-white w-[100%]" onClick={addCommonFoods}>add common food</button>
    //           </td>
    //         </tr>
    //       )}
    //     </tbody>
    //   </table>

    //   <button
    //     className="bg-black text-white p-[10px] rounded m-[10px] mt-[30px]"
    //     onClick={addPerson}
    //   >
    //     Add Person
    //   </button>

    //   {calculatedEatenFood.length ? (
    //     <table className="mt-[60px]">
    //       <thead>
    //         <tr>
    //           <th className="w-[320px] border-black border-[1px]">Person</th>
    //           <th className="w-[15%]  border-black border-[1px]">Food</th>
    //           <th className="w-[50px] border-black border-[1px]">&#8470;</th>
    //           <th className="w-[15%] border-black border-[1px]">Price</th>
    //           <th className="w-[15%] border-black border-[1px]">Will Pay</th>
    //         </tr>
    //       </thead>

    //       <tbody>
    //         {calculatedEatenFood.map((person) => (
    //           <React.Fragment key={person.id}>
    //             {person.foodItems.map((foodItem, foodIndex) => (
    //               <tr key={foodItem.id}>
    //                 {foodIndex === 0 && (
    //                   <td
    //                     className="border-[1px] border-black"
    //                     rowSpan={person.foodItems.length}
    //                   >
    //                     {person.name}
    //                   </td>
    //                 )}
    //                 <td className="border-[1px] border-black">
    //                   {foodItem.foodName}
    //                 </td>
    //                 <td className="border-[1px] border-black">
    //                   {foodItem.numOfFood}
    //                 </td>
    //                 <td className="border-[1px] border-black">
    //                   {foodItem.price}
    //                 </td>

    //                 {foodIndex == 0 && (
    //                   <td
    //                     className="border-[1px] border-black"
    //                     rowSpan={person.foodItems.length}
    //                   >
    //                     {person.foodItems.reduce((total, food) => {
    //                       const itemAmount = parseInt(food.numOfFood, 10) * parseInt(food.price);
    //                       return total + itemAmount;
    //                     }, 0)}
    //                     so&rsquo;m
    //                   </td>
    //                 )}
    //               </tr>
    //             ))}
    //           </React.Fragment>
    //         ))}
    //       </tbody>
    //     </table>
    //   ) : null}

    //   {calculatedPaidForAll.length ? (
    //     <table className="mt-[50px]">
    //       <thead>
    //         <tr>
    //           <th className="w-[320px] border-black border-[1px]">Person</th>
    //           <th className="w-[30%] border-black border-[1px]">Will get</th>
    //         </tr>
    //       </thead>
    //       <tbody className="m-[100px]">
    //         {calculatedPaidForAll.map((item) => (
    //           <tr key={item.id}>
    //             <td className="border-[1px] border-black">{item.name}</td>
    //             <td className="border-[1px] border-black">{item.paid}</td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   ) : null}

    //   <div className="mt-[150px] text-center">
    //     <button
    //       className="bg-black text-white p-[10px] rounded"
    //       onClick={calculatePrice}
    //     >
    //       Calculate
    //     </button>
    //   </div>
    // </div>
  );
}

export default Main;
