import Main from "./Components/Main/Main";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Make a GET request to fetch data from the backend
    fetch("otto.db.elephantsql.com")
      .then((response) => response.json())
      .then((data) => {
        setData(data.message); // Update state with data from the backend
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <>
      <main>
        <Main />
        {data ? <p>{data}</p> : null}
      </main>
    </>
  );
}

export default App;
