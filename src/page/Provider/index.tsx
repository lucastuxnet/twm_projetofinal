import { Outlet } from "react-router-dom";

export default function Provider() {
  return (
    <div className="container">
      <Outlet />
    </div>
  );
}
