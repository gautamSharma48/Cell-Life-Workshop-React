const getGridData = !!localStorage.getItem("grid")
  ? JSON.parse(localStorage.getItem("grid"))
  : [];

const initialState = getGridData;

export default function grid(state = initialState, action) {
  switch (action.type) {
    case "UPDATE":
      const updatedGrids = state.map((item) => {
        if (parseInt(item.id) === parseInt(action.payload.id)) {
          return { ...item, name: action.payload.name };
        }
        return item;
      });
      localStorage.setItem("grid", JSON.stringify(updatedGrids));
      return updatedGrids;
    case "ADD":
      const data = [...state, action.payload];
      localStorage.setItem("grid", JSON.stringify(data));
      return data;
    default:
      return state;
  }
}

// const gridReducer = createSlice({
//   name: "grid",
//   initialState,
//   reducers: {
//     add: (state=initialState, action) => {
//       console.log(state);
//       const data = [
//         ...state,
//         { id: action.payload.id, name: action.payload.name },
//       ];
//       localStorage.setItem("grid", JSON.stringify(data));
//       return data;
//     },
//     update: (state = initialState, action) => {
//       const currentIndex = state.find(
//         (item) => item.id.toString() === action.payload.id.toString()
//       );
//       console.log(currentIndex);
//     },
//   },
// });

// export const { add, update } = gridReducer.actions;

// export default gridReducer.reducer;
