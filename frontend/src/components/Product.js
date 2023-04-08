import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
const Product = ({ product }) => {
  return (
    <div className="my-3 p-3 rounded-lg border border-gray-300">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.Name}
          className="w-full h-full object-cover"
        />
      </Link>
      <div className="mt-3">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-medium text-gray-900">{product.Name}</h3>
        </Link>

        <div className="mt-2 text-sm text-gray-500">
          <Rating
            value={product.rating}
            text={`${product.numberofreviews} reviews`}
          />
        </div>

        <div className="mt-2 font-semibold text-gray-900">${product.price}</div>
      </div>
    </div>
  );
};

export default Product;

// import React from 'react'
// import {Card} from "react-bootstrap"
// import Rating from "./Rating";
// const Product = ({product}) => {
//   return (
//     <Card className= "my-3 p-3 rounded">
//       <a href={`/product/${product._id}`}>
//      <Card.Img src={product.image} variant="top"/>
//       </a>

//       <Card.Body>
//         <a href={`/product/${product._id}`}>
//             <Card.Title as="div"><strong>{product.Name}</strong></Card.Title>
//         </a>

//       <Card.Text as="div">
//         <Rating value={product.rating}text={`${product.numberofreviews} reviews`}/>
//       </Card.Text>

//       <Card.Text as="h3">
//      ${product.price}
//       </Card.Text>
//       </Card.Body>
//     </Card>
//   )
// }

// export default Product
