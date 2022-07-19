import { Fragment, useCallback, useEffect, useState } from "react";
// import axios from "axios";
// import Alert from "./Alert";

const Dropdown = ({ role, onAlert, setEditUser, user, alert, revert }) => {
  const [roles, setRoles] = useState(user.role);
  const [button, setButton] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [transaction, setTransaction] = useState(null);
 
  useEffect(() => {
    if (revert && transaction) {
      setRoles(transaction);
    }
    setCurrentUser(user);
  }, [alert, revert]);

  // const manageAccess = async (e) => {
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:5000/api/user/id/${e.target.name}`,
  //       // {
  //       //   medicalStaff: true,
  //       // }
  //     );
  //   } catch {}
  // };

  const openButtons = () => {
    if (button === true) {
      setButton(false);
    } else {
      setButton(true);
    }
    // short condition
    // setButton( a => a ? false : true)
  };

  const downArrow = () => {
    return (
      <svg
        className="ml-2 w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    );
  };

  const handleOnClick = useCallback((e) => {
    const { id } = e.target;

    setEditUser({ user: user, value: id });
    setTransaction(roles);
    onAlert(true);
    setRoles(id);
  }, []);

  return (
    <div className="m-2 w-30">
      <div className="flex">
        <button
          id="dropdownDefault"
          data-dropdown-toggle="dropdown"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5"
          onClick={openButtons}
          type="button"
        >
          {/* onClick={() => setRoles( prev => prev ? "Manage Access" : roles )} */}
          <div className="flex">
            <div className="w-30">{roles}</div>
            {downArrow()}
          </div>
          {button && (
            <div className="w-30">
              <div className="w-30">
                <div onClick={handleOnClick} id="Editer">
                  {currentUser.role === "Viewer" && "Editer"}
                </div>
              </div>
              <div className="w-30">
                <div onClick={handleOnClick} id="Viewer">
                  {currentUser.role === "Editer" && "Viewer"}
                </div>
              </div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
