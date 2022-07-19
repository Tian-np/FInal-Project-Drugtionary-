import React from "react";
import { NavLink, Route, Switch, Link } from "react-router-dom";
// import Homepages from "./pages/homepage.js";
import Login from "./pages/login.js";
import Drugs from "./pages/drugs.js";
import Drug from "./pages/drug.js";
import EditDrug from "./pages/editDrug.js";
import CreateDrug from "./pages/createDrug.js";
import ManageRoles from "./pages/manageRoles.js";
import { useAuth } from "./context/context.js";
import { auth } from "./firebase.js";
import { signOut } from "firebase/auth";

export default function App() {
  let navigation = [
    { name: "Homepage", href: "/Drugs", component: <Drugs /> },
  ];

  const { user } = useAuth();

  if (user) {
    navigation = [
      { name: "Homepage", href: "/Drugs", component: <Drugs /> },
      // { name: "EditDrug", href: "/EditDrug/:drugID", component: <EditDrug /> },
      // { name: "CreateDrug", href: "/CreateDrugs", component: <CreateDrug /> },
      { name: "ManageRoles", href: "/ManageRoles", component: <ManageRoles /> },
    ];
  }

  const handleLogout = async () => {
    await signOut(auth);
  };


  return (
    <>
      <div className="flex bg-white">
        <div className="mx-full">
          <div className="bg-white sm:pb-4 md:pb-4 lg:w-full lg:pb-4 xl:pb-4">
            <div className="pt-6 w-full">
              <nav className="items-center sm:h-10 flex">
                <div className="md:block md:ml-10 md:pr-4 md:space-x-8">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className="font-medium text-gray-500 hover:text-blue-800 transition duration-150 cursor-pointer"
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div className="bg-white sm:pb-4 md:pb-4 lg:w-full lg:pb-4 xl:pb-4 flex justify-end">
          <div className="pt-8 w-full h-10 flex justify-end">
            <div className="mr-3">
              {!user && (
                <Link to="/Login">
                  <button
                    className="font-medium text-blue-600 hover:text-blue-800 transition duration-150 cursor-pointer w-full"
                  >
                    Login
                  </button>
                </Link>
              )}
            </div>
            <div className="mr-5 cursor-default">
              {user && (
                <h4 className="font-medium text-gray-500 transition duration-150">
                  {user?.email}
                </h4>
              )}
            </div>
            <div className="mr-3">
              {user && (
                <button
                  onClick={handleLogout}
                  className="font-medium text-red-600 hover:text-blue-800 transition duration-150 cursor-pointer w-full"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Switch>
        <Route path="/Drugs">
          <Drugs />
        </Route>
        <Route path="/Createdrugs">
          <CreateDrug />
        </Route>
        <Route path="/EditDrug/:drugID">
          <EditDrug />
        </Route>
        <Route path="/Drug/:drugID">
          <Drug />
        </Route>
        <Route path="/Login">
          <Login />
        </Route>
        <Route path="/ManageRoles">
          <ManageRoles />
        </Route>
        {/* <Route path="/ManageRoles/:userID">
          <ManageRoles />
        </Route> */}
        <Route exact path="/">
          <Drugs />
        </Route>
      </Switch>
    </>
  );
}
