import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);

  const Navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    Navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <>
      <Link
        className="text-blue-600 font-semibold hover:underline mb-3 inline-block"
        to="/"
      >
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="lg:flex justify-center items-start container">
          <div className="lg:w-1/2 p-5">
            <img
              src={product.image}
              alt={product.Name}
              className="w-full max-h-80 object-contain"
            />
          </div>
          <div className="lg:w-1/2 p-5">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">{product.Name}</h2>
              <Rating
                value={product.rating}
                text={`${product.numberofreviews} reviews`}
                className="text-sm text-gray-500"
              />
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">${product.price}</h3>
              <p className="text-gray-500">{product.description}</p>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-semibold">Status:</h4>
              {product.countInstock > 0 ? (
                <span className="text-green-600">In Stock</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </div>

            {product.countInstock > 0 && (
              <div className="mb-4">
                <h4 className="text-xl font-bold">Qty:</h4>
                <select
                  className="py-2 px-3 rounded-md border border-gray-300"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                >
                  {[...Array(product.countInstock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="mt-4">
              <button
                onClick={addToCartHandler}
                className={`px-6 py-3 rounded-full ${
                  product.countInstock > 0
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                type="button"
                disabled={product.countInstock === 0}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>

    // <>
    // <Link className="btn btn-light my-3" to="/">
    //   Go back
    // </Link>
    // <Row>
    //  <Col md={6}>
    //  <image src={product.image} alt={product.Name} fluid></image>
    //  </Col>
    //  <Col md={6}>
    //   <ListGroup variant="flush">
    //     <ListGroup.item>
    //         <h2>{product.Name}</h2>
    //     </ListGroup.item>
    //     <ListGroup.item>
    //     <Rating
    //         value={product.rating}
    //         text={`${product.numberofreviews} reviews`}
    //       />
    //     </ListGroup.item>
    //     <ListGroup.item>
    //         Price:${product.price}
    //     </ListGroup.item>
    //     <ListGroup.item>
    //         Description:${product.description}
    //     </ListGroup.item>
    //   </ListGroup>
    //  </Col>
    //  <Col md={3}>
    //  <Card>
    //     <ListGroup variant="flush">
    //         <ListGroup.item>
    //             <Row>
    //                  <Col>
    //                  Price:
    //                  </Col>
    //                  <Col>
    //                  <strong>{product.price}</strong>
    //                  </Col>
    //             </Row>
    //             </ListGroup.item>
    //             <ListGroup.item>
    //             <Row>
    //                  <Col>
    //                  Status:
    //                  </Col>
    //                  <Col>
    //                  <strong>{product.countInstock> 0 ? 'in Stock' : 'Out of Stock'}</strong>
    //                  </Col>
    //             </Row>
    //             </ListGroup.item>
    //  {product.countInstock > 0 &&
    //   <ListGroup.item>
    //   <Row>
    //   <Col>Qty</Col>
    //   <Col>
    //   <Form.Control as ="select" value={qty} onChange={(e) =>
    //   setQty(e.target.value)}>
    //   {[...Array(product.countInstock).keys()].map((x)=>(
    //     <option key={x+1 } value={x+1}>
    //       {x+1}
    //     </option>
    //   ))}
    //   </Form.Control>
    //   </Col>
    //   </Row>
    //   </ListGroup.item>
    // }
    //             <ListGroup.item>
    //                 <Button className='btn-block'
    //                 type="buttton"
    //                 disabled={product.countInstock===0}>
    //                     Add to Cart
    //                 </Button>
    //             </ListGroup.item>
    //     </ListGroup>
    //  </Card>
    //  </Col>
    // </Row>
    // </>
  );
};

export default ProductScreen;
