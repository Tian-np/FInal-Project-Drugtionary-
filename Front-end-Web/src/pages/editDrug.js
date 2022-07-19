import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

const EditDrug = () => {
  let fileObj = [];
  let fileArray = [];
  const history = useHistory();
  const axios = require("axios");
  let { drugID } = useParams();
  const [drugName, setName] = useState({
    geneticName: "",
    brandName: "",
  });
  const [drugSerialNumber, setDrugSerialNumber] = useState("");
  const [drugDosage, setDosage] = useState("");
  const [showFiles, setShowFiles] = useState([]);
  const [drugWarnings, setWarnings] = useState({});
  const [drugDetail, setDetail] = useState("");
  const [drugUses, setUses] = useState({});
  const [file, setFile] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nameImageSearch, setNameImageSearch] = useState("");

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await axios(`http://localhost:5000/api/drugs/${drugID}`);
      response = await response.data;
      setName(response.name);
      setWarnings(response.warnings);
      setDetail(response.detail);
      setUses(response.uses);
      setDosage(response.dosage);
      setShowFiles(response.images);
      setDrugSerialNumber(response.serialNumber);
      setIsLoading(false);
    }
    fetchMyAPI();
  }, [axios, drugID]);

  function uploadSingleFile(event) {
    const newShowFiles = [];

    for (const singleFile of event.target.files) {
      newShowFiles.push(URL.createObjectURL(singleFile));
    }

    setFile(event.target.files);
    setShowFiles(newShowFiles);

    // console.log(event.target.files[0])
  }

  function onChangeName(event) {
    setName((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    setNameImageSearch(event.target.value)
  }

  function onChangeBrandName(event) {
    setName((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  function onChangeDetail(event) {
    setDetail(event.target.value);
  }

  function onChangeSerialNumber(event) {
    setDrugSerialNumber(event.target.value);
  }

  function onChangeWarnings(event) {
    console.log(event.target);
    setWarnings((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.checked ? true : false,
    }));
  }

  function onChangeWarningOther(event) {
    setWarnings((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  function onChangeUsesOther(event) {
    setUses((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  function onChangeDosage(event) {
    setDosage(event.target.value);
  }

  function onChangeUses(event) {
    setUses((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.checked ? true : false,
    }));
  }

  async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData();

    // const setDrug = {
    //   name: drugName,
    //   warnings: drugWarnings,
    //   uses: drugUses,
    //   detail: drugDetail,
    //   dosage: drugDosage,
    //   images: file,
    //   serialNumber: drugSerialNumber,
    // };
    // axios.put(`http://localhost:5000/api/drugs/${drugID}`, setDrug);

    formData.append(
      "data",
      JSON.stringify({
        name: drugName,
        warnings: drugWarnings,
        nameImageSearch: nameImageSearch,
        uses: drugUses,
        detail: drugDetail,
        dosage: drugDosage,
        serialNumber: drugSerialNumber,
      })
    );

    for (const singleFile of file) {
      formData.append("images", singleFile);
    }

    await axios({
      method: "put",
      url: `http://localhost:5000/api/drugs/${drugID}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    history.push("/Drugs/" + drugID);
  }

  let idImg = -1;

  const renderImg =
    showFiles &&
    showFiles.map((fileUrl) => {
      idImg = idImg + 1;
      return (
        <div key={idImg}>
          <img
            className="d-block w-100 h-100"
            src={fileUrl}
            alt="Third slide"
          />
        </div>
      );
    });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      <div>
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0 flex justify-center align-middle ">
                <h3 className="sm:text-5xl md:text-6xl text-4xl font-extrabold leading-6 xl:inline text-indigo-600 justify-center flex">
                  Edit Drugs
                </h3>
              </div>
            </div>
            {drugName && (
              <div className="md:-mt-6 md:col-span-2">
                <form onSubmit={onSubmit}>
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-md font-bold text-gray-700 mb-2">
                          Genetics Name Drug
                        </label>
                        {/* relative block w-full px-3 py-1.5 font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none */}
                        <input
                          value={drugName.geneticName}
                          name="geneticName"
                          onChange={onChangeName}
                          type="text"
                          placeholder="กรอกชื่อสามัญของตัวยา"
                          className="mt-1 px-3 py-1.5 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-md font-bold text-gray-700 mb-2">
                          Brand Name Drug
                        </label>
                        <input
                          value={drugName.brandName}
                          name="brandName"
                          onChange={onChangeBrandName}
                          type="text"
                          placeholder="กรอกชื่อการค้าของตัวยา"
                          className="mt-1 px-3 py-1.5 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label className="block text-md font-bold text-gray-700 mb-2 mt-2">
                        Detail
                      </label>
                      <input
                        value={drugDetail}
                        onChange={onChangeDetail}
                        as="textarea"
                        placeholder="กรอกรายละเอียดของตัวยา"
                        className="mt-1 px-3 py-1.5 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-md font-bold text-gray-700 mb-2 mt-2">
                        Serial Number
                      </label>
                      <input
                        value={drugSerialNumber}
                        onChange={onChangeSerialNumber}
                        placeholder="กรอกรหัสผลิตภัณฑ์"
                        type="text"
                        className="mt-1 px-3 py-1.5 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-md font-bold text-gray-700 mb-2 mt-2">
                        Uses
                      </label>
                      <div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5 ">
                            <input
                              id="morning"
                              name="morning"
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded ml-3"
                              onChange={onChangeUses}
                              defaultChecked={drugUses.morning}
                            />
                          </div>
                          <div className="ml-3 text-sm">เช้า</div>
                          <div className="flex items-center h-5 ">
                            <input
                              id="กลางวัน"
                              name="afternoon"
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded ml-3"
                              onChange={onChangeUses}
                              defaultChecked={drugUses.afternoon}
                            />
                          </div>
                          <div className="ml-3 text-sm">กลางวัน</div>
                          <div className="flex items-center h-5 ">
                            <input
                              id="เย็น"
                              name="evening"
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded ml-3"
                              onChange={onChangeUses}
                              defaultChecked={drugUses.evening}
                            />
                          </div>
                          <div className="ml-3 text-sm">เย็น</div>
                          <div className="flex items-center h-5 ">
                            <input
                              id="ก่อนนอน"
                              name="night"
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded ml-3"
                              onChange={onChangeUses}
                              defaultChecked={drugUses.night}
                            />
                          </div>
                          <div className="ml-3 text-sm">ก่อนนอน</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-start mt-2">
                        <div className="flex items-center h-5 ">
                          <input
                            id="ก่อนอาหาร"
                            name="beforeMeal"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded ml-3"
                            onChange={onChangeUses}
                            defaultChecked={drugUses.beforeMeal}
                          />
                        </div>
                        <div className="ml-3 text-sm">ก่อนอาหาร</div>
                        <div className="flex items-center h-5 ">
                          <input
                            id="หลังอาหาร"
                            name="afterMeal"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded ml-3"
                            onChange={onChangeUses}
                            defaultChecked={drugUses.afterMeal}
                          />
                        </div>
                        <div className="ml-3 text-sm">หลังอาหาร</div>
                      </div>
                      <input
                        type="text"
                        placeholder="โปรดระบุ"
                        className="mt-2 px-3 py-1.5 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                        name="other"
                        onChange={onChangeUsesOther}
                        value={drugUses.other}
                      />
                    </div>

                    <div>
                      <label className="block text-md font-bold text-gray-700 mb-2 mt-2">
                        Warnings
                      </label>
                      <div className="flex items-start">
                        <div className="flex items-center h-5 ">
                          <input
                            id="pregnant"
                            name="pregnant"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded ml-3"
                            onChange={onChangeWarnings}
                            defaultChecked={drugWarnings.pregnant}
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          ไม่เหมาะสำหรับสตรีมีครรถ์
                        </div>
                        <div className="flex items-center h-5 ">
                          <input
                            id="allergy"
                            name="allergy"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded ml-3"
                            onChange={onChangeWarnings}
                            label="ไม่เหมาะสำหรับผู้มีอาการแพ้ยา"
                            defaultChecked={drugWarnings.allergy}
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          ไม่เหมาะสำหรับผู้มีอาการแพ้ยา
                        </div>
                        <div className="flex items-center h-5 ">
                          <input
                            id="aged"
                            name="aged"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded ml-3"
                            onChange={onChangeWarnings}
                            label="ไม่เหมาะสำหรับผู้สูงอายุ"
                            defaultChecked={drugWarnings.aged}
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          ไม่เหมาะสำหรับผู้สูงอายุ
                        </div>
                        <div className="flex items-center h-5 ">
                          <input
                            id="baby"
                            name="baby"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded ml-3"
                            onChange={onChangeWarnings}
                            label="ไม่เหมาะสำหรับเด็กเล็ก"
                            defaultChecked={drugWarnings.baby}
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          ไม่เหมาะสำหรับเด็กเล็ก
                        </div>
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="โปรดระบุ"
                          className="mt-2 px-3 py-1.5 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                          name="other"
                          onChange={onChangeWarningOther}
                          value={drugWarnings.other}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-md font-bold text-gray-700 mb-2 mt-2">
                        Dosage
                      </label>
                      <input
                        value={drugDosage}
                        onChange={onChangeDosage}
                        type="text"
                        placeholder="กรอกปริมาณของตัวยา  [ ex. 100mg 500mg ]"
                        className="mt-1 px-3 py-1.5 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div className="">
                      <label className="block text-md font-bold text-gray-700 mb-2 mt-2">
                        Image
                      </label>
                      <div className="w-44 mb-2">
                        <div className="w-44">{renderImg}</div>
                      </div>
                      <input type="file" onChange={uploadSingleFile} multiple />
                    </div>
                    <div className="flex w-full">
                      <button
                        type="submit"
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-3 w-full"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default EditDrug;
