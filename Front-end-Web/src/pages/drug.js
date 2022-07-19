import React, { Fragment, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Drug = () => {
  const axios = require("axios");
  let { drugID } = useParams();
  const [drugName, setName] = useState({});
  const [drugWarnings, setWarnings] = useState("");
  const [drugDetail, setDetail] = useState("");
  const [drugUses, setUses] = useState({});
  const [drugDosage, setDosage] = useState("");
  const [drugImages, setImages] = useState([]);
  const [drugSerialNumber, setDrugSerialNumber] = useState();

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await axios(`http://localhost:5000/api/drugs/${drugID}`);
      response = await response.data;
      setName(response.name);
      setWarnings(response.warnings);
      setDetail(response.detail);
      setUses(response.uses);
      setDosage(response.dosage);
      setImages(response.images);
      setDrugSerialNumber(response.serialNumber);
    }

    fetchMyAPI();
  }, [axios, drugID]);

  let arrayUses = [
    "เช้า",
    "กลางวัน",
    "เย็น",
    "ก่อนนอน",
    "ก่อนอาหาร",
    "หลังอาหาร",
  ];

  let arrayWarn = [
    "ไม่เหมาะสำหรับสตรีมีครรถ์",
    "ไม่เหมาะสำหรับผู้มีอาการแพ้ยา",
    "ไม่เหมาะสำหรับผู้สูงอายุ",
    "ไม่เหมาะสำหรับเด็กเล็ก",
  ];

  const renderUses =
    drugUses &&
    Object.keys(drugUses).map((item, i) => {
      return (
        <Fragment key={i}>
          {i < 6 ? (
            drugUses[item] ? (
              <>
                <input
                  disabled
                  name="morning"
                  type="checkbox"
                  defaultChecked={true}
                  className="h-4 w-4 mt-2 border-gray-300 rounded ml-5"
                />
                <h1 className="font-medium ml-1 mr-1 text-2xl">
                  {arrayUses[i]}
                </h1>
              </>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          {i === 3 ? <br /> : ""}
          {i === 6 ? (
            <h6 className="font-medium ml-5 text-2xl">
              อื่นๆ : {drugUses[item]}
            </h6>
          ) : (
            ""
          )}
        </Fragment>
      );
    });

  const renderWarn =
    drugWarnings &&
    Object.keys(drugWarnings).map((item, i) => {
      return (
        <Fragment key={i}>
          {i < 4 ? (
            drugWarnings[item] ? (
              <>
                <input
                  disabled
                  name="morning"
                  type="checkbox"
                  defaultChecked={true}
                  className="h-4 w-4 mt-2 border-gray-300 rounded ml-5"
                />
                <h1 className="font-medium ml-1 mr-1 text-2xl">
                  {arrayWarn[i]}
                </h1>
              </>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          {i === 4 ? (
            <h6 className="font-medium ml-5 text-2xl">
              อื่นๆ : {drugWarnings[item]}
            </h6>
          ) : (
            ""
          )}
        </Fragment>
      );
    });

  const renderImg =
    drugImages &&
    drugImages.map((url, i) => {
      return (
        <div key={i}>
          <img
            className="transition-shadow ease-in-out duration-1000 shadow-none hover:shadow-2xl max-w-full h-auto rounded-xl"
            src={url}
          />
        </div>
      );
    });

  return (
    <>
      <div className="flex w-full">
        <div className="ml-9">
          <h1 className="sm:text-5xl md:text-6xl text-4xl font-extrabold leading-6 xl:inline text-indigo-600 justify-center flex">
            Drug Details
          </h1>
        </div>
        {/* <div className="p-2 flex justify-end">
        <Link to={"/EditDrug/" + drugID}>
          <button className="font-bold">แก้ไขข้อมูล</button>
        </Link>
      </div> */}
      </div>
      <br />
      <hr />
      {drugName && (
        <div className="ml-10 mt-5">
          <div>
            <div className="text-3xl font-extrabold mb-4">
              <h1>{drugName.geneticName}</h1>
            </div>
            <div className="flex w-full">
              <div className="w-full">
                <div className="pr-5 w-72 mb-6 mt-2 ml-5">{renderImg}</div>
                <div className="w-full flex mb-2">
                  <div className="bg-slate-100 w-1/5 rounded-xl flex justify-center">
                    <h1 className="font-semibold text-xl">ชื่อสามัญ</h1>
                  </div>
                  <h2 className="font-medium text-2xl ml-5">
                    {drugName.geneticName}
                  </h2>
                </div>
                <div className="w-full flex mb-2">
                  <div className="bg-slate-100 w-1/5 rounded-xl flex justify-center">
                    <h1 className="font-semibold text-xl">ชื่อทางการค้า </h1>
                  </div>
                  <h2 className="font-medium ml-5 text-2xl">
                    {drugName.brandName}
                  </h2>
                </div>
                <div className="w-full flex mb-2">
                  <div className="bg-slate-100 w-1/5 rounded-xl flex justify-center">
                    <h1 className="font-semibold text-xl">รหัสผลิตภัณฑ์ </h1>
                  </div>
                  <h2 className="font-medium ml-5 text-2xl">
                    {drugSerialNumber}
                  </h2>
                </div>
                <div className="w-full flex mb-2 ">
                  <div className="bg-slate-100 w-1/5 rounded-xl flex justify-center">
                    <h1 className="font-semibold text-xl">รายละเอียด </h1>
                  </div>
                  <h2 className="font-medium ml-5 text-2xl">{drugDetail}</h2>
                </div>
                <div className="w-full flex mb-2">
                  <div className="bg-slate-100 w-1/5 rounded-xl flex justify-center">
                    <h1 className="font-semibold text-xl">การใช้งาน </h1>
                  </div>
                  {renderUses}
                </div>
                <div className="w-full flex mb-2">
                  <div className="bg-slate-100 w-1/5 rounded-xl flex justify-center">
                    <h1 className="font-bold text-xl">Dosage </h1>
                  </div>
                  <h2 className="font-medium ml-5 text-2xl">{drugDosage} mg</h2>
                </div>
                <div className="w-full flex mb-2">
                  <div className="bg-slate-100 w-1/5 rounded-xl flex justify-center">
                    <h1 className="font-semibold text-xl">ข้อควรระวัง </h1>
                  </div>
                  {renderWarn}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Drug;
