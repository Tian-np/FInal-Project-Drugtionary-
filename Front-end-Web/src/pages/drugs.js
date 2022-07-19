import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlphabetSearch from "../component/AlphabetSearch";
import DrugCard from "../component/DrugCard";
import { useAuth } from "../context/context"

const Drugs = () => {
  const axios = require("axios");
  const [drugs, setDrugs] = useState([]);
  const [search, setSearch] = useState(null);
  const [isAlphabetSearch, setIsAlphabetSearch] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await axios.get("http://localhost:5000/api/drugs");
      setDrugs(await response.data);
    })();
  }, []);

  const deleteDrug = async (id) => {
    await axios.delete("http://localhost:5000/api/drugs/" + id);
    setDrugs((prevDrugs) =>
      prevDrugs.filter((drug) => {
        return drug._id !== id;
      })
    );
  };

  const onChangeSearch = (event) => {
    setSearch(event.target.value.substr(0, 20));
  };

  const filterDrugs = drugs.filter((drug) => {
    return drug.name.geneticName.indexOf(search) !== -1;
  });

  return (
    <>
      <div className="w-full flex">
        <div className="w-full font-extrabold sm:ml-1.5 md:ml-10 mb-10 cursor-none">
          <h1 className="sm:text-5xl md:text-6xl text-4xl font-extrabold leading-6 xl:inline text-indigo-600 justify-center flex">
            Drugtionary
          </h1>
        </div>
        <div className="w-full justify-end sm:mr-5 md:mr-7 lg:mr-10 xl:mr-10 flex">
        {user && (
          <Link to="/Createdrugs">
            <button
              variant="success"
              className="w-full p-2 mr-10  bg-cyan-500 hover:bg-cyan-700 flex items-center justify-center border border-transparent rounded-md text-white"
            >
              + เพิ่มยา
            </button>
          </Link>
        )}
        </div>
      </div>

      <form className="w-full">
        <div className="flex justify-center">
          <div className="mb-3 w-4/6">
            <div className="input-group relative flex flex-wrap items-stretch w-full mb-4 ">
              <input
                type="search"
                placeholder="Search drug "
                onChange={onChangeSearch}
                value={search || ""}
                className="relative block w-full px-3 py-1.5 font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </form>

      <div className="mt-5 mb-4 ">
        <div className="flex justify-center">
          <button
            onClick={() => {
              setIsAlphabetSearch(false);
            }}
            className="text-xl font-medium font-sans text-slate-400 hover:text-slate-700 sm:ml-5 md:ml-7 lg:ml-10 xl:ml-10 cursor-default"
          >
            Popular Drug Search
          </button>
          <button
            className="text-xl font-medium font-sans text-slate-400 hover:text-slate-700 sm:ml-5 md:ml-7 lg:ml-10 xl:ml-10 cursor-default"
            onClick={() => {
              setIsAlphabetSearch(true);
            }}
          >
            Browse Alphabetically
          </button>
        </div>
      </div>
      <hr />

      {/* Drugs  */}
      <div className="flex m-2 flex-wrap w-full justify-center">
        {isAlphabetSearch ? (
          <AlphabetSearch data={drugs} delete={deleteDrug} />
        ) : search === null ? (
          <DrugCard data={drugs} delete={deleteDrug}/>
        ) : (
          <DrugCard data={filterDrugs} delete={deleteDrug} />
        )}
      </div>
    </>
  );
};
export default Drugs;
