import React, { useEffect, useState, Fragment } from "react";
// import { use } from "../../../BE/router/auth";
import Dropdown from "../component/Dropdown";
import Alert from "../component/Alert";

const ManageRoles = () => {
  const axios = require("axios");
  const [infoUserData, setInfoUserData] = useState();
  const [alert, setAlert] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [revert, setRevert] = useState(false);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await axios(`http://localhost:5000/api/user/`);
      response = await response.data;
      filterUserData(response);
    }
    fetchMyAPI();
  }, []);

  const filterUserData = (info) => {
    let infoUserData = info.filter(
      (item) => item.name
      // (item) => item.requestMedicalStaff && !item.medicalStaff
    );
    setInfoUserData(infoUserData);
  };

  return (
    <>
      <div className="w-full relative">
        <div className="mt-10 sm:mt-0 pr-10">
          <div className="flex">
            <div className="w-1/3">
              <div className="px-4 sm:px-0 flex justify-center align-middle ">
                <h3 className="sm:text-5xl md:text-6xl text-4xl font-extrabold leading-6 xl:inline text-indigo-600 justify-center flex">
                  Manage Roles
                </h3>
              </div>
            </div>
            <div className="bg-slate-100 border-2 grow rounded-lg ">
              {infoUserData?.map((user, index) => {
                return (
                  <Fragment key={index}>
                    <div className="flex w-full border-slate-100 border-2 rounded-lg -space-x-2 overflow-hidden">
                      <div className="flex w-full ">
                        <div className="flex m-2 h-10">
                          <img
                            className="inline-block h-9 w-10 rounded-full ring-2 ring-white"
                            src={require("../image/user.png")}
                            alt=""
                            id="image"
                          />
                        </div>
                        <div
                          key={index}
                          className="m-2 p-1 flex justify-start w-1/4 font-bold"
                        >
                          <div className="mr-1">{user.name}</div>
                          <div>{user.lastname}</div>
                        </div>
                        <div className="flex justify-end w-3/4">
                          <Dropdown
                            user={user}
                            role={user.role}
                            editUser={editUser}
                            setEditUser={setEditUser}
                            onAlert={setAlert}
                            alert={alert}
                            revert={revert}
                          />
                        </div>
                      </div>
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>
        {alert && (
          <Alert onAlert={setAlert} editUser={editUser} setRevert={setRevert} />
        )}
      </div>
    </>
  );
};

export default ManageRoles;
