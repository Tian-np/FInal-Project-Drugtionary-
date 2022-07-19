import { useState } from "react";
import DrugCard from "./DrugCard";

const AlphabetSearch = (props) => {
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [click, setClick] = useState();
 
  const filter = props.data.filter((drug) => {
    if (!click) {
      return false;
    }
    return drug.name.geneticName.startsWith(click);
  });

  return (
    <>
      <div className="">
        <div className="flex justify-center">
          {alphabets.map((alpha, i) => {
            return (
              <div key={i} className="flex justify-center">
                <button
                  className="mx-2 flex justify-center border-2 bg-slate-100 rounded-xl hover:bg-slate-300 px-3"
                  key={alpha}
                  onClick={() => {
                    setClick(alpha);
                  }}
                >
                  {alpha}
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap justify-center">
          <DrugCard data={filter} delete={props.deleteDrug} />
        </div>
      </div>
    </>
  );
};

export default AlphabetSearch;