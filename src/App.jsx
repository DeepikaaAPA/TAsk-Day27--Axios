import { useState } from "react";
import UserTable from "./components/UserTable";

function App() {
  return (
    <>
      <h1 className="text-center text-white bg-primary">User Details</h1>
      <UserTable></UserTable>
    </>
  );
}

export default App;
