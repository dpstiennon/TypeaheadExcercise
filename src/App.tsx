import React, { FC } from "react";

const App: FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <div className="App">
      <h2> Typeahead Demo </h2>
      {children}
    </div>
  );
};

export default App;
