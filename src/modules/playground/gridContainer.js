import React, { useMemo } from "react";
import { convertJSON } from "../../utils";

const GridContainer = ({ data, setData }) => {
  const width = useMemo(() => {
    const widthGrid = data?.cols * 14;
    return widthGrid;

    //eslint-disable-next-line
  }, [data?.cols, data?.rows]);

  // Check which row or column is green
  const rowsArray = useMemo(() => {
    let rowsArr = [];
    for (let i = 0; i < data?.rows; i++) {
      for (let j = 0; j < data?.cols; j++) {
        let boxId = i + "_" + j;

        rowsArr.push({
          boxClass: data.gridFull[i][j] ? "box on" : "box Off",
          key: boxId,
          row: i,
          col: j,
        });
      }
    }
    return rowsArr;

    //eslint-disable-next-line
  }, [data.gridFull]);

  // Color a specific row and col
  const selectBox = (row, col) => {
    let gridCopy = convertJSON(data?.gridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    setData({
      ...data,
      gridFull: gridCopy,
    });
  };

  return (
    <div className="grid-container" style={{ width: width }}>
      {rowsArray.map((element) => (
        <Boxes
          selectBox={selectBox}
          key={element?.key}
          data={element}
          cellSize={data?.cellSize}
        />
      ))}
    </div>
  );
};

const Boxes = ({ data, selectBox, cellSize }) => {
  return (
    <div
      style={{ width: cellSize, height: cellSize }}
      className={data?.boxClass}
      id={data?.id}
      onClick={() => selectBox(data?.row, data?.col)}
    />
  );
};

export default GridContainer;
