import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import {Table, Buttonl} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
const ProductListScreen = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      Navigate("/login");
    }

    if (successCreate) {
      Navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [
    dispatch,
    Navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = (product) => {
    dispatch(createProduct());
  };
  return (
    <>
      <div class="flex items-center container">
        <div class="flex-1">
          <h1 class="text-xl font-bold">Products</h1>
        </div>
        <div>
          <button
            class=" mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={createProductHandler}
          >
            <i class="fas fa-plus"></i>Create Product
          </button>
        </div>
      </div>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div class="overflow-x-auto mt-6">
          <table class="table-auto w-full border-collapse border border-gray-300 shadow-sm">
            <thead>
              <tr class="bg-gray-100">
                <th class="px-6 py-3 text-left font-medium text-gray-700">
                  ID
                </th>
                <th class="px-6 py-3 text-left font-medium text-gray-700">
                  NAME
                </th>
                <th class="px-6 py-3 text-left font-medium text-gray-700">
                  PRICE
                </th>
                <th class="px-6 py-3 text-left font-medium text-gray-700">
                  CATEGORY
                </th>
                <th class="px-6 py-3 text-left font-medium text-gray-700"></th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-300">
              {products.map((product) => (
                <tr key={product._id}>
                  <td class="px-6 py-4">{product._id}</td>
                  <td class="px-6 py-4">{product.Name}</td>
                  <td class="px-6 py-4">${product.price}</td>
                  <td class="px-6 py-4">{product.category}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <button class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-1 px-2 rounded">
                        <i class="fas fa-edit"></i>
                      </button>
                    </Link>
                    <button
                      class="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded ml-2"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ProductListScreen;
