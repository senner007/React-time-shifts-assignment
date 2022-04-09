import "./App.css";
import { SubmitShift } from "./SubmitShift";
import { ShiftsOverview } from "./ShiftsOverview";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const url = "http://localhost:5000/api";

function App() {
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    (async () => {
      getData();
    })();
  }, []);

  async function getData() {
    const users = await (await fetch(url)).json();
    setShifts(users);
  }

  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async function postShift(shift) {
    const mappedObject = {
      userName: shift.userName.value,
      startDate: shift.startDate.value,
      endDate: shift.endDate.value,
    };
    await postData(url, mappedObject);
    getData();
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShiftsOverview shifts={shifts}></ShiftsOverview>} />
          <Route path="shifts" element={<ShiftsOverview shifts={shifts}></ShiftsOverview>} />
          <Route path="submit-shift" element={<SubmitShift postShift={postShift}></SubmitShift>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
