import React from "react";

import "./scss/app.scss";

import { Footer, Header, ButtonUp, Conventor } from "./components";

function App() {
  return (
    <div>
      <Header />

      <Conventor />

      {/* <Table /> */}
      <ButtonUp />
      <Footer />
    </div>
  );
}

export default App;
