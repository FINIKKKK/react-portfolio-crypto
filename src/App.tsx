import React from "react";

import "./scss/app.scss";

import { Footer, Header, ButtonUp, Conventor, TableCoins } from "./components";

function App() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />

      <Conventor />

      <TableCoins />

      <ButtonUp />
      <Footer />
    </>
  );
}

export default App;
