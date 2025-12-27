import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <div className="h-14 bg-white border-b flex justify-between px-6 items-center">
      <h1 className="text-xl font-semibold">File Sharing</h1>

      <div className="relative">
        <span
          onClick={() => setOpen(!open)}
          className="cursor-pointer"
        >
          Welcome, {user.name}
        </span>

        {open && (
          <div className="absolute right-0 mt-2 bg-white border rounded shadow">
            <button
              onClick={logout}
              className="block px-4 py-2 text-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
