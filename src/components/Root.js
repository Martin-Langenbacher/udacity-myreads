import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

const RootPage = ({books}) => {
  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootPage;
