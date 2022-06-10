import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [foodItem, setFoodItem] = useState("");
  const [days, setDays] = useState(0);
  const [data, setData] = useState([]);
  const [newFood, setNewFood] = useState("");

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getData();
  }, [data]);
  const getData = () => {
    axios.get("http://localhost:8080/read").then((res) => {
      setData(res.data), console.log(res, res.data);
    });
  };
  const addFood = () => {
    axios
      .post("http://localhost:8080/insert", {
        foodName: foodItem,
        daysSinceIAte: days,
      })
      .then((res) => alert("added item"))
      .catch((err) => alert(err));
    getData();
  };

  const updateFood = (id) => {
    axios
      .patch("http://localhost:8080/update", {
        id: id,
        foodName: newFood,
      })
      .catch((err) => alert(err));

    getData();
  };

  const deleteFood = (id) => {
    axios
      .delete(`http://localhost:8080/delete/${id}`)
      .then(getData())
      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      <h1>CRUD with MERN</h1>
      <div>
        <input
          type="text"
          placeholder="foodName...."
          onChange={(e) => setFoodItem(e.target.value)}
        />
        <input
          type="number"
          placeholder="daysSinceIAte"
          onChange={(e) => setDays(e.target.value)}
        />
        <button onClick={() => addFood()}>Add food Item</button>
      </div>

      <h1>Data</h1>
      <div className="cont">
        {data?.map((el) => (
          <div key={el._id}>
            <h1>
              <span>{el.foodName}</span>
              {"   "}
              <span>{el.daysSinceIAte}</span>
            </h1>
            <input
              placeholder="Update FoodName ...."
              onChange={(e) => setNewFood(e.target.value)}
            />
            <button onClick={() => updateFood(el._id)}>Update</button>
            <button onClick={() => deleteFood(el._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
