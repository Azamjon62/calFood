import React, { useState } from "react";
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
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { InputAdornment } from "@mui/material";
import FunctionsRoundedIcon from "@mui/icons-material/FunctionsRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
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

function Main() {
  const [isModalOpen, setModalOpen] = useState(true);
  const [isInputOpen, setInputOpen] = useState(true);
  const [foods, setFoods] = useState([]);
  const [people, setPeople] = useState([]);
  const [commonFood, setCommonFood] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [newPersonName, setNewPersonName] = useState("");
  const [newFoodName, setNewFoodName] = useState("");
  const [numOfFood, setNumOfFood] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [service, setService] = useState("");

  const [calculatedEatenFood, setCalculatedEatenFood] = useState([]);
  const [calculatedPaidForAll, setCalculatedPaidForAll] = useState([]);

  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
      setNewFoodName("");
      setNewPersonName("");
      setNumOfFood("");
      setNewPrice("");
      setPaidAmount("");
    }
  };

  const addPersonItem = (foodId) => {
    const selectedFoodIndex = foods.findIndex((food) => food.id === foodId);

    if (selectedFoodIndex !== -1) {
      const selectedFood = foods[selectedFoodIndex];

      if (
        newPersonName.trim() !== "" &&
        numOfFood.trim() !== "" &&
        newPrice.trim() !== ""
      ) {
        const updatedFoodItems = selectedFood.personItems.concat({
          id: Date.now(),
          name: newPersonName,
          numOfFood,
          price: newPrice,
          paid: paidAmount,
        });

        const updatedFoods = [...foods];
        updatedFoods[selectedFoodIndex] = {
          ...selectedFood,
          personItems: updatedFoodItems,
        };

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
        setNewPersonName("");
        setModalOpen(true);
      }
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

  const addServices = () => {
    const newServicesPrice = {
      id: Date.now(),
      percentage: service,
    };

    setServiceList([newServicesPrice]);
    setService("");
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
            let serviceAmount = 0;
            if (serviceList.length > 0) {
              const servicePercentage = serviceList[0].percentage;
              serviceAmount = (servicePercentage / 100) * updatedPrice;
            }

            return {
              ...foodItem,
              price: updatedPrice + serviceAmount,
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
      setValue(2);
    }
  };

  return (
    <div className="container">
      <div className="sm:hidden ">
        <AppBar color="default">
          <Tabs
            className="m-auto "
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="primary tabs example"
          >
            <Tab label="Food" {...a11yProps(0)} />
            <Tab label="Common" {...a11yProps(1)} />
            <Tab label="Total" {...a11yProps(2)} />
          </Tabs>
        </AppBar>

        <SwipeableViews
          className="mt-[55px]"
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Accordion
              // disableGutters
              sx={{
                p: 1,
                background: "#f1f5f9",
                width: "100%",
                boxShadow: 0,
                borderRadius: "5px",
              }}
              expanded={expanded === "panel1"}
              onChange={handleChangeAccordion("panel1")}
            >
              <AccordionSummary
                sx={{
                  p: 1,
                }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  <h3>Add Food</h3>
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0, mb: 3 }}>
                <Typography>
                  <div className="flex flex-col gap-5">
                    <Box
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                      }}
                    >
                      <TextField
                        fullWidth
                        label="Food"
                        id="fullWidth"
                        type="text"
                        value={newFoodName}
                        onChange={(e) => setNewFoodName(e.target.value)}
                      />
                    </Box>
                    <Box
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                      }}
                    >
                      <TextField
                        fullWidth
                        label="Person Name"
                        id="fullWidth"
                        type="text"
                        value={newPersonName}
                        onChange={(e) => setNewPersonName(e.target.value)}
                      />
                    </Box>

                    <Box
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                      }}
                    >
                      <TextField
                        fullWidth
                        label="Count"
                        id="fullWidth"
                        type="number"
                        value={numOfFood}
                        onChange={(e) => setNumOfFood(e.target.value)}
                      />
                    </Box>

                    <Box
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                      }}
                    >
                      <TextField
                        fullWidth
                        label="Price"
                        id="fullWidth"
                        type="number"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                      />
                    </Box>

                    <Box
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                      }}
                    >
                      <TextField
                        fullWidth
                        label="Paid"
                        id="fullWidth"
                        type="number"
                        value={paidAmount}
                        onChange={(e) => setPaidAmount(e.target.value)}
                      />
                    </Box>

                    <Button
                      variant="contained"
                      className="w-[100%]"
                      disableElevation
                      onClick={addPerson}
                    >
                      Add food
                    </Button>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>

            {foods.length ? (
              <Accordion
                // disableGutters
                sx={{
                  p: 1,
                  mt: 1.5,
                  mb: 5,
                  background: "#f1f5f9",
                  width: "100%",
                  boxShadow: 0,
                  "::before": {
                    content: "none",
                  },
                  borderRadius: "5px",
                }}
                expanded={expanded === "panel2"}
                onChange={handleChangeAccordion("panel2")}
              >
                <AccordionSummary
                  sx={{
                    p: 1,
                  }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                >
                  <Typography sx={{ width: "43%", flexShrink: 0 }}>
                    <h3>Add Person</h3>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0, mb: 3 }}>
                  <Typography>
                    <div className="flex flex-col gap-5">
                      <Box
                        sx={{
                          width: 500,
                          maxWidth: "100%",
                        }}
                      >
                        <TextField
                          fullWidth
                          label="Name"
                          id="fullWidth"
                          type="text"
                          value={newPersonName}
                          onChange={(e) => setNewPersonName(e.target.value)}
                        />
                      </Box>

                      <Box
                        sx={{
                          width: 500,
                          maxWidth: "100%",
                        }}
                      >
                        <TextField
                          fullWidth
                          label="Count"
                          id="fullWidth"
                          type="Number"
                          value={numOfFood}
                          onChange={(e) => setNumOfFood(e.target.value)}
                        />
                      </Box>

                      <Box
                        sx={{
                          width: 500,
                          maxWidth: "100%",
                        }}
                      >
                        <TextField
                          fullWidth
                          label="Price"
                          id="fullWidth"
                          type="Number"
                          value={newPrice}
                          onChange={(e) => setNewPrice(e.target.value)}
                        />
                      </Box>

                      <Box
                        sx={{
                          width: 500,
                          maxWidth: "100%",
                        }}
                      >
                        <TextField
                          fullWidth
                          label="Paid"
                          id="fullWidth"
                          type="Number"
                          value={paidAmount}
                          onChange={(e) => setPaidAmount(e.target.value)}
                        />
                      </Box>

                      {/* <Button
                        variant="contained"
                        className="w-[100%]"
                        disableElevation
                        // onClick={() => addPersonItem(foods.length - 1)}
                      >
                        Add Person
                      </Button> */}
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ) : null}

            <hr />
            <div>
              {foods.length ? <h2>Items</h2> : null}
              {foods.map((person) => (
                <React.Fragment key={person.id}>
                  <div className="bg-slate-100 p-[10px] rounded mt-[20px]">
                    <div className="flex justify-between h-14 items-center">
                      <h2>{person.foodName}</h2>
                      <p className=" font-semibold text-base">
                        Amt:{" "}
                        {person.personItems.reduce((total, food) => {
                          const itemAmount =
                            parseInt(food.numOfFood, 10) * parseInt(food.price);
                          return total + itemAmount;
                        }, 0)}{" "}
                        so&rsquo;m
                      </p>
                    </div>
                    <hr />
                    {person.personItems.map((foodItem, foodIndex) => (
                      <div key={foodItem.id}>
                        <hr />
                        <div className="flex justify-between mt-[15px] mb-[10px]">
                          <h3>{foodItem.name}</h3>
                          <p>x {foodItem.numOfFood} </p>
                        </div>

                        <div className="flex justify-between mb-[15px] ">
                          <p>Price: {foodItem.price} so&rsquo;m</p>
                          <p>
                            {foodItem.paid.length ? (
                              <span className="text-sm">
                                Paid: {foodItem.paid} so&rsquo;m
                              </span>
                            ) : null}
                          </p>
                        </div>

                        {foodIndex === person.personItems.length - 1 && (
                          <Accordion
                            disableGutters
                            sx={{
                              background: "#f1f5f9",
                              width: "100%",
                              boxShadow: 0,
                              "::before": {
                                content: "none",
                              },
                            }}
                            expanded={expanded === "panel2"}
                            onChange={handleChangeAccordion("panel2")}
                          >
                            <AccordionSummary
                              sx={{
                                backgroundColor: "#f1f5f9",
                                height: 0,
                                p: 0,
                              }}
                              aria-controls="panel2bh-content"
                              id="panel2bh-header"
                            >
                              <Typography
                                sx={{
                                  width: "100%",
                                }}
                              >
                                <Button
                                  variant="outlined"
                                  className="text-center w-[100%]"
                                  onClick={() => addPersonItem(person.id)}
                                >
                                  Add Person
                                </Button>
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ p: 0 }}></AccordionDetails>
                          </Accordion>
                        )}
                      </div>
                    ))}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div>
              <Accordion
                // disableGutters
                sx={{
                  p: 1,
                  background: "#f1f5f9",
                  width: "100%",
                  boxShadow: 0,
                  borderRadius: "5px",
                }}
                expanded={expanded === "panel3"}
                onChange={handleChangeAccordion("panel3")}
              >
                <AccordionSummary
                  sx={{
                    p: 1,
                  }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3bh-content"
                  id="panel3bh-header"
                >
                  <Typography sx={{ width: "63%", flexShrink: 0 }}>
                    <h3>Add Common Food</h3>
                  </Typography>
                  {/* <Typography sx={{ color: 'text.secondary' }}>with person</Typography> */}
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0, mb: 3 }}>
                  <Typography>
                    <div className="flex flex-col gap-5">
                      <Box
                        sx={{
                          width: 500,
                          maxWidth: "100%",
                        }}
                      >
                        <TextField
                          fullWidth
                          label="Food"
                          id="fullWidth"
                          type="text"
                          value={newFoodName}
                          onChange={(e) => setNewFoodName(e.target.value)}
                        />
                      </Box>

                      <Box
                        sx={{
                          width: 500,
                          maxWidth: "100%",
                        }}
                      >
                        <TextField
                          fullWidth
                          label="Count"
                          id="fullWidth"
                          type="number"
                          value={numOfFood}
                          onChange={(e) => setNumOfFood(e.target.value)}
                        />
                      </Box>

                      <Box
                        sx={{
                          width: 500,
                          maxWidth: "100%",
                        }}
                      >
                        <TextField
                          fullWidth
                          label="Price"
                          id="fullWidth"
                          type="number"
                          value={newPrice}
                          onChange={(e) => setNewPrice(e.target.value)}
                        />
                      </Box>
                      <div>
                        <Button
                          variant="contained"
                          className="w-[100%]"
                          disableElevation
                          onClick={addCommonFoods}
                        >
                          Add common food
                        </Button>
                      </div>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                // disableGutters
                sx={{
                  background: "#f1f5f9",
                  width: "100%",
                  boxShadow: 0,
                  p: 1,
                  mt: 1.5,
                  "::before": {
                    content: "none",
                  },
                }}
                expanded={expanded === "panel4"}
                onChange={handleChangeAccordion("panel4")}
              >
                <AccordionSummary
                  sx={{ p: 1 }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    <h3>Service</h3>
                  </Typography>
                  {/* <Typography sx={{ color: 'text.secondary' }}>with person</Typography> */}
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0, mb: 3 }}>
                  <Typography>
                    <div>
                      <Box
                        sx={{
                          width: 500,
                          maxWidth: "100%",
                        }}
                      >
                        <TextField
                          fullWidth
                          label="Service"
                          id="fullWidth"
                          type="text"
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="start">
                                %
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>

                      <div className="mt-[20px]">
                        <Button
                          variant="contained"
                          className="w-[100%] "
                          disableElevation
                          onClick={addServices}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <div>
                {commonFood.length > 0 && (
                  <div className="bg-slate-100 p-[10px] rounded mt-[60px]">
                    <div>
                      <h2
                        rowSpan={commonFood.length + 2}
                        className="text-center"
                      >
                        Common Food
                      </h2>
                    </div>
                    {commonFood.map((food, index) => (
                      <div key={food.id}>
                        <hr />
                        <div className="flex justify-between mt-[15px] mb-[10px]">
                          <h3>{food.foodName}</h3>
                          <p>x {food.numOfFood} </p>
                        </div>

                        <div className="flex justify-between mb-[15px]">
                          <p>Price: {food.price}</p>
                        </div>

                        {index == commonFood.length - 1 && (
                          <p className="text-center">
                            Amount:{" "}
                            {commonFood.reduce((total, food) => {
                              const itemAmount =
                                parseInt(food.numOfFood, 10) *
                                parseInt(food.price);

                              return total + itemAmount;
                            }, 0)}{" "}
                            so&rsquo;m
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                {serviceList.map((service) => (
                  <div
                    key={service.id}
                    className="bg-slate-100 p-[10px] rounded mt-[20px] flex justify-between items-center"
                  >
                    <h2>Service:</h2>
                    <p className="text-xl">{service.percentage} %</p>
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <div>
              <div>
                {calculatedEatenFood.length ? (
                  <h2 className="mt-[-5px]" >Those who will pay</h2>
                ) : null}
                {calculatedEatenFood.map((person) => (
                  <React.Fragment key={person.id}>
                    <div className="bg-slate-100 p-[10px] rounded mt-[20px]">
                      <div className="flex justify-between h-14 items-center">
                        <h3>{person.name}</h3>
                        <p>
                          <span className="text-center">
                            <FunctionsRoundedIcon />
                          </span>{" "}
                          {person.foodItems.reduce((total, food) => {
                            const itemAmount =
                              parseInt(food.numOfFood, 10) *
                              parseInt(food.price);
                            return total + itemAmount;
                          }, 0)}{" "}
                          so&rsquo;m
                        </p>
                      </div>
                      {person.foodItems.map((foodItem) => (
                        <div key={foodItem.id}>
                          <hr />
                          <div className="flex justify-between mt-[15px] mb-[10px]">
                            <p> {foodItem.foodName}</p>
                            <p>x {foodItem.numOfFood} </p>
                          </div>

                          <div className="flex justify-between mb-[15px]">
                            <p>
                              <span className="text-sm">Price:</span>{" "}
                              {foodItem.price} so&rsquo;m
                            </p>
                            <p>
                              {person.paid.length ? (
                                <span className="text-sm">
                                  Paid: {person.paid} so&rsquo;m
                                </span>
                              ) : null}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </React.Fragment>
                ))}
              </div>

              {calculatedPaidForAll.length ? (
                <>
                  <h2 className="mt-[50px]">Those who take money</h2>
                  <div className="bg-slate-100 p-[10px] rounded mt-[20px]">
                    {calculatedPaidForAll.map((item) => (
                      <div key={item.id}>
                        <hr />
                        <div className="flex justify-between mt-[15px]">
                          <p>{item.name}</p>
                          <p>
                            {" "}
                            <span className="font-bold text-sm">
                              <AddRoundedIcon />:
                            </span>{" "}
                            {item.paid} so&rsquo;m
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          </TabPanel>
        </SwipeableViews>
      </div>

      <div className="mt-[20px] table hidden sm:block">
        <div className="table-header-group ">
          <div className="table-row w-auto">
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
        <br />
        <>
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
        </>
        <TotalAmount
          totalAmount={totalAmount}
          foods={foods}
          commonFood={commonFood}
        />
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

      <div className="sm:mt-[100px] mt-[-40px] text-center">
        <button
          className="bg-black text-white p-[10px] mb-[30px] rounded"
          onClick={calculatePrice}
        >
          Calculate
        </button>
      </div>
    </div>
  );
}

export default Main;
