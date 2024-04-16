import React from "react";
import { history } from "../../manager/history";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const gridData = useSelector((state) => state.gridData);
  const dispatch = useDispatch();

  const handleAddGrid = () => {
    dispatch({
      type: "ADD",
      payload: {
        id: gridData.length + 1,
        name: `Grid name ${gridData.length + 1}`,
      },
    });
  };

  return (
    <section className="h-full p-10 ">
      <h1 className="mt-10 fixed">Dashboard</h1>
      <div className="flex-col items-center h-full w-full">
        <div className="flex-col  mx-auto max-w-550  gap-10 my-auto w-full   ">
          {gridData.length > 0 &&
            gridData?.map((element, index) => {
              return (
                <div
                  onClick={() => history.push(`/playground/${element?.id}`)}
                  key={index}
                  className="p-10 b-1-black rounded-12 cursor-pointer"
                >
                  {element?.name}
                </div>
              );
            })}
          <button
            onClick={handleAddGrid}
            className="p-10 rounded-12 bg-green-10 text-white h-40 mt-10 mb-40"
          >
            {"+ "}
            {gridData.length > 0 ? "Add more" : "Add "}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
