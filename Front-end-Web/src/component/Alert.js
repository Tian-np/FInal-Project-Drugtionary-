import { Fragment, useCallback, useEffect } from "react";

const Alert = ({ onAlert, editUser, setRevert }) => {
  const axios = require("axios");

  useEffect(() => {
    setRevert(false);
  }, []);
 
  const handleOnSubmit = useCallback(async () => {
    const { _id } = editUser.user;
    try {
      await axios.patch(`http://localhost:5000/api/user/id/${_id}`, {
        role: editUser.value,
      });

      onAlert(false);
      window.location.reload();
    } catch {
      console.error("error");
    }
  }, []);

  const handleOnCancel = useCallback(() => {
    setRevert(true);
    onAlert(false);
  }, []);

  return (
    <Fragment>
      <div className="absolute w-screen h-screen -mt-20 bg-opacity-50 bg-gray-600 top-0 flex justify-center items-center">
        <div className="w-1/3 h-1/4 bg-white flex flex-col rounded-xl">
          <div className="w-full h-10 flex justify-end">
            <button
              className="w-16 max-w-10 h-10 max-h-10 flex items-center "
              onClick={() => onAlert(false)}
            >
              Close
            </button>
          </div>
          <div className="w-full grow flex flex-col justify-center">
            <h1 className="w-full text-center text-2xl font-bold text-blue-600 mb-5">
              Do you want to Confirm ?
            </h1>
            <div className="w-full h-20 max-h-20 flex justify-center pt-3">
              <button
                onClick={handleOnCancel}
                className="bg-red-500 w-16 rounded-xl text-white uppercase h-10 hover:bg-red-700 duration-150 transition mr-2.5"
              >
                No
              </button>
              <button
                onClick={handleOnSubmit}
                className="bg-green-500 w-16 rounded-xl text-white uppercase h-10 hover:bg-green-700 duration-150 transition "
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Alert;
