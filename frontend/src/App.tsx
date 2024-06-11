import { useState } from "react";

import "./index.css";
import { LoginForm } from "@/components/LoginForm";
import { UserHome } from './pages/UserHome'

function App() {
  return (
    <>
      {/* <div className="flex justify-center mt-40">
        <div className="w-96">
          <LoginForm></LoginForm>
        </div>
      </div> */}
      <UserHome />
    </>
  );
}

export default App;
