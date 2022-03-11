import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import * as ReactBootStrap from "react-bootstrap";

export default function Countries() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  const getData = () => {
    axios("https://restcountries.com/v2/all")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (checkbox) {
      //to show data when checbox state is true
      setFilteredData(
        data.filter((data) => {
          return (
            data.capital &&
            data.capital.toLowerCase().includes(search.toLocaleLowerCase())
          );
        })
      );
    } else
      setFilteredData(
        data.filter((data) => {
          if (
            data.capital &&
            data.capital.toLowerCase().includes(search.toLocaleLowerCase())
          ) {
            return data;
          } else if (
            //searching al datas with their names
            data.name &&
            data.name.toLowerCase().includes(search.toLocaleLowerCase())
          ) {
            return data;
          }
        })
      );
  }, [search, checkbox]);

  function inputHandler(event) {
    var input = event.target.value;
    setSearch(input);
  }

  function checkboxHandler(event) {
    setCheckbox(!checkbox);
  }

  return (
    <div>
      <div>
        <h2>Search Country Hello</h2>
        <div>
          <label>
            <input
              onChange={inputHandler}
              type="text"
              placeholder="Enter Text"
            />
            <input
              onChange={checkboxHandler}
              checked={checkbox} //to active only capital search
              type="checkbox"
              placeholder="Only Capital Search"
            />
          </label>
          <br></br>
          <br></br>
        </div>
      </div>
      <div>
        <ReactBootStrap.Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Capital</th>
              <th>Region</th>
              <th>Flag</th>
            </tr>
          </thead>
          <tbody>
            {filteredData &&
              filteredData.map(
                (
                  item //to show filtered data
                ) => (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{item.capital}</td>
                    <td>{item.region}</td>
                    <td>
                      <img
                        style={{ width: 200, height: 100 }}
                        src={item.flag}
                      ></img>
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </ReactBootStrap.Table>
      </div>
    </div>
  );
}
