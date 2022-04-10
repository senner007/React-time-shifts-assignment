import "./App.css";
import { SubmitShift } from "./Components/SubmitShift/SubmitShift";
import { ShiftsOverview } from "./Components/ShiftsOverview/ShiftsOverview";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getData, postData } from './Utils/api'

function App() {
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    (async () => {
      getUsers('api');
    })();
  }, []);

  async function getUsers(url) {
    const users = await getData(url)
    setShifts(users);
  }

  async function postShift(shift) {
    const mappedObject = {
      userName: shift.userName.value,
      startDate: shift.startDate.value,
      endDate: shift.endDate.value,
    };
    await postData('api', mappedObject);
    getUsers('api');
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
