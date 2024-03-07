import Main from "./Components/Main/Main";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Construct the Authorization header with the API key
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa('6e6fe56e-e3eb-4440-a6e3-4ab717078efd')); // Replace 'your-api-key' with your actual API key

    // Make a GET request to fetch data from the backend
    fetch("https://api.elephantsql.com/api/data", {
      method: 'GET',
      headers: headers
    })
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
