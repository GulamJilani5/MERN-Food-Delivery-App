import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
// import Carousel from "../components/Carousel";

export default function Home() {
  const [foodCate, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    let response = await fetch("http://127.0.0.1:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    // console.log(data[0], data[1]); ///// We are sending data from the DsiplayData.js. Which is an array with two elements
    const [food_Data, food_Category] = data;
    console.log("food_Data, food_Category: ", food_Data, food_Category);
    setFoodItem(food_Data);
    setFoodCat(food_Category);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          style={{ objectFit: "contain !important" }}
          data-bs-ride="carousel"
        >
          <div className="carousel-inner mh-30" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                {/* <button
                  className="btn btn-outline-success bg-success text-white"
                  type="submit"
                >
                  Search
                </button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/100×50/?burger"
                // src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                className="d-block w-100"
                style={{
                  // height: "500px",
                  // objectFit: "fill",
                  filter: "brightness(30%)",
                }}
                alt="Pic 1"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/100×50/?pastry"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="Pic 2"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/100×50/?barbeque"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="Pic 3"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/* <Carousel />Search bar is inside carousel and it is
      associated with our home componenet's filtering items. ///// That's why we
      are using carousel within same component rather than having separate
      component */}
      <div className="container">
        {foodCate
          ? foodCate.map((category) => {
              return (
                // <div></div>
                <div className="row mb-3" key={category._id}>
                  <div key={category._id} className="fs-3 m-3">
                    {category.CategoryName}
                  </div>
                  <hr />
                  {foodItem ? (
                    foodItem
                      .filter(
                        (item) =>
                          item.CategoryName === category.CategoryName &&
                          item.name
                            .toLowerCase()
                            .includes(search.toLocaleLowerCase())
                      )
                      .map((filterItems) => {
                        return (
                          <div
                            key={filterItems._id}
                            className="col-12 col-md-6 col-lg-3"
                          >
                            <Card
                              foodItemList={filterItems}
                              options={filterItems.options[0]}
                            ></Card>
                          </div>
                        );
                      })
                  ) : (
                    <div>No data found</div>
                  )}
                </div>
              );
            })
          : "....."}
      </div>
      <Footer />
    </div>
  );
}
