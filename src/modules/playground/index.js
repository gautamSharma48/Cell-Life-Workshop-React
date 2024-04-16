import React, { useCallback, useEffect, useState } from "react";
import Input from "../../common/components/input";
import Button from "../../common/components/button";
import GridContainer from "./gridContainer";
import { convertJSON } from "../../utils";
import { history } from "../../manager/history";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cellOptions, dropdownOptions, initialData } from "../../constant";

const Playground = () => {
  const params = useParams();
  const getData = useSelector((state) => state.gridData);
  const dispatch = useDispatch();
  const getCurrentGridData = getData.find(
    (item) => item.id.toString() === params.id.toString()
  );
  const [intervalId, setIntervalId] = useState(null);
  const [data, setData] = useState(initialData);
  const [gridName, setGridName] = useState(getCurrentGridData?.name);
  const [gridDropdown, setGridDropdown] = useState(false);
  const [cellDropDown, setCellDropdown] = useState(false);

  // check id is valid or not
  useEffect(() => {
    if (getData.length < params?.id) {
      alert("id is not valid");
      history.push("/");
    }
  }, [getData.length, params?.id]);

  // Update Grid Name using Debouncing
  useEffect(() => {
    try {
      if (gridName !== "" && gridName !== getCurrentGridData?.name) {
        let timeoutId = setTimeout(() => {
          // Update Grid name using redux
          dispatch({
            type: "UPDATE",
            payload: { name: gridName, id: params?.id },
          });
        }, 300);
        return () => clearTimeout(timeoutId);
      }
    } catch (error) {
      console.log(error);
    }
    //eslint-disable-next-line
  }, [gridName]);

  // Set random colors for cells - row and cols
  useEffect(() => {
    const seed = async () => {
      let gridCopy = convertJSON(data?.gridFull);
      for (let i = 0; i < data.rows; i++) {
        for (let j = 0; j < data.cols; j++) {
          if (Math.floor(Math.random() * 4) === 1) {
            gridCopy[i][j] = true;
          }
        }
      }
      setData({
        ...data,
        gridFull: gridCopy,
      });
    };
    seed();
    //eslint-disable-next-line
  }, [data?.rows, data?.cols]);

  //Rule for Game
  const play = useCallback(() => {
    let g = data.gridFull;
    let g2 = convertJSON(data.gridFull);

    for (let i = 0; i < data?.rows; i++) {
      for (let j = 0; j < data?.cols; j++) {
        let count = 0;
        const rows = data?.rows;
        const cols = data?.cols;
        if (i > 0) if (g[i - 1][j]) count++;
        if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
        if (i > 0 && j < cols - 1) if (g[i - 1][j + 1]) count++;
        if (j < cols - 1) if (g[i][j + 1]) count++;
        if (j > 0) if (g[i][j - 1]) count++;
        if (i < rows - 1) if (g[i + 1][j]) count++;
        if (i < rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
        if (i < rows - 1 && j < cols - 1) if (g[i + 1][j + 1]) count++;
        if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
        if (!g[i][j] && count === 3) g2[i][j] = true;
      }
    }

    setData((prev) => ({ ...prev, gridFull: g2 }));
    //eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    let interval;
    if (intervalId) {
      clearInterval(intervalId);
    }
    interval = setInterval(play, data?.speed);
    setIntervalId(interval);
    return () => clearInterval(interval);
    //eslint-disable-next-line
  }, [play]);

  // Play Game
  const playButton = () => {
    clearInterval(intervalId);
    let interval = setInterval(play, data?.speed);
    setIntervalId(interval);
  };

  // Pause Game
  const pauseButton = () => {
    clearInterval(intervalId);
  };

  // Change grid layout size
  const handleGridSize = (size) => {
    switch (size) {
      case 1:
        return setData((prev) => ({
          ...prev,
          cols: 20,
          row: 10,
        }));
      case 2:
        return setData((prev) => ({
          ...prev,
          cols: 50,
          row: 30,
        }));
      case 3:
        return setData((prev) => ({
          ...prev,
          cols: 70,
          row: 50,
        }));
      default:
        return setData((prev) => ({
          ...prev,
          cols: 30,
          row: 50,
        }));
    }
  };

  // Change Cell Game
  const handleCellSize = (size) => {
    switch (size) {
      case 0:
        return setData((prev) => ({ ...prev, cellSize: 15 }));
      case 1:
        return setData((prev) => ({ ...prev, cellSize: 20 }));
      case 2:
        return setData((prev) => ({ ...prev, cellSize: 30 }));
      case 3:
        return setData((prev) => ({ ...prev, cellSize: 40 }));
      default:
        return setData((prev) => ({ ...prev, cellSize: 15 }));
    }
  };

  //Reset Button
  const resetHandler = () => {
    clearInterval(intervalId);
    if (data !== initialData) {
      return setData({
        ...data,
        rows: 30,
        cols: 50,
        cellSize: 15,
      });
    }
  };

  //Dropdown handler
  const toggleDropDown = (type) => {
    if (type === "grid") {
      setGridDropdown(!gridDropdown);
      setCellDropdown(false);
    } else {
      setCellDropdown(!cellDropDown);
      setGridDropdown(false);
    }
  };

  return (
    <section className="p-10">
      <h1 className=" mt-10">Playground</h1>
      <div className="w-full h-full">
        <div className="grid w-full ">
          {/* Grid name input */}
          <div className="mt-10  flex-row gap-10 ">
            <Input
              className="h-full w-full outline-none bg-transparent border-none"
              type="text"
              placeholder="Grid Name"
              label="Grid Name:"
              onChange={(event) => setGridName(event.target.value)}
              value={gridName}
            />
          </div>
          {/* Grid options */}
          <div className="flex-row gap-10  w-full justify-center mt-10">
            <Button
              onClick={playButton}
              className={"h-40 p-10"}
              text="Play"
              type={"success"}
            />
            <Button
              onClick={pauseButton}
              className={"h-40 p-10"}
              text="Pause"
              type={"warn"}
            />
            <Button
              onClick={resetHandler}
              className={"h-40 p-10 bg-yellow-10 text-black"}
              text="Reset"
            />
            <Button
              onClick={() => history.push("/")}
              className={"h-40 p-10"}
              text="Home"
              type={"normal"}
            />
          </div>
          {/* Grid Game Container */}
          <GridContainer data={data} setData={setData} />

          <div className="flex-row gap-10 mt-10 relative">
            <Button
              onClick={() => toggleDropDown("grid")}
              className={"h-40 p-10  bg-lightBlue-10  w-200"}
              text="Grid size"
            />
            {gridDropdown && (
              <div className="absolute bottom-45 bg-grey">
                {dropdownOptions.map((element, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => handleGridSize(element?.size)}
                      className="cursor-pointer flex-col b-1-black w-full "
                    >
                      <div className="p-10">{element.value}</div>
                    </div>
                  );
                })}
              </div>
            )}

            <Button
              onClick={() => toggleDropDown("cell")}
              className={"h-40 p-10 bg-lightBlue-10 w-200 "}
              text="Cell size"
            />
            {cellDropDown && (
              <div className="absolute bottom-45 bg-grey">
                {cellOptions.map((element, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => handleCellSize(element?.size)}
                      className="cursor-pointer flex-col b-1-black w-full "
                    >
                      <div className="p-10">{element.value}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Playground;
