import React, { useEffect, useState, useRef } from "react";

import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  const dispatch = useDispatchCart();
  const data = useCart();
  const priceRef = useRef();
  // console.log("props.foodItemList", props.foodItemList);
  const { _id: id, CategoryName, img, name } = props.foodItemList;
  const { options } = props;
  // console.log("options", options);
  let priceOptions = Object.keys(options); ///// store the keys of the object 'options' in a array 'typeOptions'
  // console.log("priceOptions", priceOptions);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === id) {
        food = item;
        break;
      }
    }
    // console.log(food)
    // console.log(new Date())
    // if (food !== []) {
    if (!food) {
      ///// if food is empty
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: id,
          name: name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.ImgSrc,
        });
        console.log("Size different so simply ADD one more to the list");
        return;
      }
      return;
    }
    await dispatch({
      type: "ADD",
      id: id,
      name: name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
    console.log("Data", data);
  };

  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  return (
    <>
      <div
        className="card mt-3 m-3"
        style={{ width: "18rem", maxHeight: "360px" }}
      >
        {/* <div className="card mt-3 m-3" style={{ width: "18rem" }}> */}
        <img
          // src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
          src={img}
          className="card-img-top"
          alt="food pic"
          style={{ height: "120px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">Some text goes here</p>
          <div>
            <select
              className="m-2 h-100 bg-success rounded"
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100 bg-success rounded"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((priceOption) => {
                return (
                  <option key={priceOption} value={priceOption}>
                    {priceOption}
                  </option>
                );
              })}
            </select>
            <div className="d-inline h-100 fs-5">{finalPrice}/-</div>
          </div>
        </div>
        <button
          className="btn btn-success justify-center ms-2"
          onClick={handleAddToCart}
        >
          Add To Cart
        </button>
      </div>
    </>
  );
}
