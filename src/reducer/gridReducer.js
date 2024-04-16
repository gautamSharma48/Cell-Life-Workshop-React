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
