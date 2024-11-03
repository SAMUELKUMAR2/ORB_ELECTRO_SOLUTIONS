import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [isMdOrLarger, setIsMdOrLarger] = useState(window.innerWidth >= 768);

  const handleResize = () => {
    setIsMdOrLarger(window.innerWidth >= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const inputClass = isMdOrLarger ? "col-4 p-3 h-100" : "card p-3";

  return (
    <>
      <div
        className={`  ${inputClass} `}
        style={{ height: "100vh", background: "#D9D9D9" }}
      >
        <span
          className="p-3 pt-0"
          style={{ fontWeight: "bold", fontFamily: "serif", fontSize: "35px" }}
        >
          Rs. {product.netPrice ? product.netPrice : product.price}
        </span>
        <hr />
        <span className="text-success pb-3 " style={{ fontWeight: "bold" }}>
          In Stock
        </span>

        <div>
          <h3>{product.itemName}</h3>
          <hr />
        </div>
        <div>
          <h6>{product.description}</h6>
        </div>

        <div
          className="  d-flex justify-content-center "
          style={{ width: "100%", height: "40%" }}
        >
          <div className=" w-100  mt-5">
            <Link to={`/products/${product._id}/buy`}>
              <button
                className=" mt-5 btn btn-success"
                //  onClick={()=>checkout(product._id)}

                style={{ width: "100%" }}
              >
                Buy
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
