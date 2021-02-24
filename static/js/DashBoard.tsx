import * as React from "react";

const DashBoard: React.FC = ({ children }) => {
  return (
    <section className="h-100">
      <header className="container h-100">
        <div className="d-flex align-items-center justify-content-center h-100">
          <div className="d-flex flex-column">{children}</div>
        </div>
      </header>
    </section>
  );
};

export default DashBoard;
