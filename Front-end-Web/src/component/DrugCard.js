import { Link } from "react-router-dom";
// import { Carousel } from "react-responsive-carousel";
import { useAuth } from "../context/context";
// import Arrow from "../carousel/Arrow";
import { Fragment } from "react";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
const DrugCard = (props) => {
  const { user } = useAuth();
 
  const moreThanThree = () => {
    return (
      <Fragment>
        <Splide
          aria-label="My Favorite Images"
          hasTrack={false}
          options={{
            perPage: 3,
            rewind: true,
            gap: "0.3rem",
          }}
        >
          <SplideTrack>
            {props.data.map((drug, index) => {
              return (
                <SplideSlide className="w-full" key={index}>
                  <div className="mx-3 flex flex-col items-center h-full rounded-3xl border-2 border-slate-100 shadow-lg">
                    <div className="h-50">
                      <img className="h-36" src={drug.images[0]} />
                    </div>
                    <div>
                      <p>
                        <span className="font-bold">GeneralName:</span>{" "}
                        <span className="font-semibold">
                          {drug.name.geneticName}
                        </span>
                      </p>
                      <p>
                        <span className="font-bold">BrandName:</span>{" "}
                        <span className="font-semibold">
                          {drug.name.brandName}
                        </span>
                      </p>
                      <p>
                        <span className="font-bold">Serial:</span>{" "}
                        <span className="font-semibold">
                          {drug.serialNumber}
                        </span>
                      </p>
                      <p>
                        <span className="font-bold">Dosage:</span>{" "}
                        <span className="font-semibold">{drug.dosage}</span>
                      </p>
                    </div>
                    <div className="my-3">
                      <Link
                        to={"/Drug/" + drug._id}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded m-1"
                      >
                        <button variant="info">ข้อมูล</button>
                      </Link>
                      {user && (
                        <>
                          <Link
                            to={"/EditDrug/" + drug._id}
                            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1.5 px-3 rounded m-1"
                          >
                            <button variant="warning">แก้ไขข้อมูล</button>
                          </Link>
                          <button
                            onClick={() => props.delete(drug._id)}
                            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded m-1"
                          >
                            ลบยา
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </SplideSlide>
              );
            })}
          </SplideTrack>
        </Splide>
      </Fragment>
    );
  };

  const lessThanThree = () => {
    return (
      <Fragment>
        {props.data.map((drug) => {
          return (
            <div className="flex justify-center">
              <div className="flex flex-col items-center py-5 rounded-3xl mt-12  border-slate-100 shadow-lg w-1/3">
                <div className="h-50">
                  <img className="h-36" src={drug.images[0]} />
                </div>
                <div>
                  <p>
                    <span className="font-bold">GeneralName:</span>{" "}
                    <span className="font-semibold">
                      {drug.name.geneticName}
                    </span>
                  </p>
                  <p>
                    <span className="font-bold">BrandName:</span>{" "}
                    <span className="font-semibold">{drug.name.brandName}</span>
                  </p>
                  <p>
                    <span className="font-bold">Serial:</span>{" "}
                    <span className="font-semibold">{drug.serialNumber}</span>
                  </p>
                  <p>
                    <span className="font-bold">Dosage:</span>{" "}
                    <span className="font-semibold">{drug.dosage} mg</span>
                  </p>
                </div>
                <div className="mt-3">
                  <Link
                    to={"/Drug/" + drug._id}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded m-1"
                  >
                    <button variant="info">ข้อมูล</button>
                  </Link>
                  {user && (
                    <>
                      <Link
                        to={"/EditDrug/" + drug._id}
                        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1.5 px-3 rounded m-1"
                      >
                        <button variant="warning">แก้ไขข้อมูล</button>
                      </Link>
                      <button
                        onClick={() => props.delete(drug._id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded m-1"
                      >
                        ลบยา
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </Fragment>
    );
  };

  return (
    <Fragment>
      <div className="w-5/6">
        {props.data.length > 2 ? moreThanThree() : lessThanThree()}
      </div>
    </Fragment>
  );
};

export default DrugCard;
