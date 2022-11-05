import React from "react";

import "./scss/app.scss";

import { Footer, Header, ButtonUp, Conventor, TableCoins } from "./components";

function App() {
  return (
    <div>
      <Header />

      <Conventor />

      <TableCoins />

      <ButtonUp />
      <Footer />
    </div>
  );
}

export default App;
