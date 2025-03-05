import React, { useEffect, useState } from "react";
import axiosInstance from "../interceptors/interceptors";
import { useSelector, useDispatch } from "react-redux";
import productData from "../redux/actions/fetchData";
// import { setUpdatedProducts } from "../redux/reducer/productSlicer";
const ProductList = () => {
  const products = useSelector((state) => state.products);
  // console.log(products);
  const [selectedItemDetail, setSelectedItemDetail] = useState({
    pId: "",
    size: "",
    colour: "",
  });

  // console.log(selectedItemDetail);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productData());
  }, [dispatch]);
  const orderProduct = async (pId) => {
    // console.log({pId,...selectedItemDetail});
    if (
      selectedItemDetail.size.trim() != "" &&
      selectedItemDetail.colour.trim() != "" &&
      pId == selectedItemDetail.pId
    ) {
      const response = await axiosInstance.post("/placeOrder", {
        ...selectedItemDetail,
      });
      if (response.data.success) {
        alert(response.data.message);
        // setSelectedItemDetail({size:'',colour:''});
        dispatch(productData());
      } else {
        alert(response.data.message);
      }
      setSelectedItemDetail({ pId: "", size: "", colour: "" });
    } else {
      alert("Please select size and colour to place order!!");
    }
  };
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src="https://s.yimg.com/ny/api/res/1.2/BHXNY0oZI.c1yw9lUHi85A--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyNDI7aD04Mjg-/https://s.yimg.com/os/creatr-uploaded-images/2023-07/d0cfa590-2681-11ee-a5df-def09d36591c"
              alt={product.productName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.productName}</h3>
              <p className="text-gray-700">Price: ₹{product.price}</p>
              <div className="mt-2">
                <p className="font-semibold underline">Sizes & Colors</p>
                {product.moreDetails.map((detail) => (
                  <div key={detail._id} className="mt-1 text-sm">
                    <span
                      className="font-medium bold p-1 text-xl"
                      //   onClick={() =>
                      //     setSelectedItemDetail((prev) => ({
                      //       ...prev,
                      //       size: detail.size,
                      //     }))
                      //   }
                    >
                      Size: {detail.size}
                    </span>
                    <div className="flex m-2">
                      {detail.details.map((colorDetail) => (
                        <span
                          key={colorDetail._id}
                          className="ml-0.5 px-2 border grid-cols-3 py-1 cursor-pointer hover:bg-emerald-500 text-xs rounded bg-gray-200"
                          onClick={() =>
                            setSelectedItemDetail({
                              pId: product._id,
                              size: detail.size,
                              colour: colorDetail.colour,
                            })
                          }
                        >
                          {colorDetail.colour} ({colorDetail.quantity})
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                <div>
                  Selected Details:{" "}
                  {product._id == selectedItemDetail.pId ? (
                    <b>
                      {selectedItemDetail.colour} {selectedItemDetail.size}
                    </b>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <button
              className="border rounded p-2 bg-blue-400 mb-0.5"
              onClick={() => orderProduct(product._id)}
            >
              Place Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
