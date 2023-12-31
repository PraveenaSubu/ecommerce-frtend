import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../Global";
import { useCart } from "../Context/cart";
import { toast } from "react-hot-toast";

const ProductDetail = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [cart, setCart] = useCart();
    //getProduct
    const getProduct = async () => {
        try {
            const { data } = await axios.get(
                `${API}/api/products/get-product/${params.slug}`
            );
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
        }
    };
    //initalp details

    useEffect(() => {
        if (params?.slug) getProduct();
        // eslint-disable-next-line
    }, [params?.slug]);

    //get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(
                `${API}/api/products/related-product/${pid}/${cid}`
            );
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };
    const disc = 20 / 100;
    return (
        <Layout>
            <div className="row container product-details my-2">
                <div className="col-md-6">
                    <img
                        src={product.photo}
                        className="card-img-top"
                        alt={product.name}
                    />
                </div>
                <div className="col-md-6 product-details-info">
                    <hr />
                    <h6>
                        <b>Name :</b> {product.name}
                    </h6>
                    <h6>
                        <b>Description :</b> {product.description}
                    </h6>
                    <h6>
                        <b>Specifications  :</b>
                        <h6> Intel Core i5-1235U, 14-inch (35.6 cm), FHD, 16GB DDR4, 512GB SSD, Intel Iris Xe graphics, FPR, Backlit KB, Audio by B&O (Win 11, MSO 2021, Silver, 1.41 kg), dv2014TU</h6>
                        {product.specifications}
                    </h6>
                    <h6>
                        <b> Offer Price :</b>

                        <span className="card-price px-2">
                            {product?.price?.toLocaleString("en-IN", {
                                style: "currency",
                                currency: "INR",
                            })}
                        </span>
                    </h6>
                    <h6>
                        <b>Actual Price :</b>

                        <s>{(product.price + product.price * disc).toFixed(2)}</s>
                    </h6>
                    <h6>
                        <b>Category :</b> {product?.category?.name}
                    </h6>
                    <button
                        class="btn btn-secondary ms-1"
                        onClick={() => {
                            setCart([...cart, product]);
                            localStorage.setItem("cart", JSON.stringify([...cart, product]));
                            toast.success("Item Added to cart");
                        }}
                    >
                        ADD TO CART
                    </button>
                    <div>
                        <b>Customer review:</b>
                        <h6> Upgrade and value for money</h6>
                        <h6> The product is Good </h6>
                        <h6> Feels good ans serves its purpose and value for the money</h6>
                        <h6> Very nice product </h6> </div>
                    {/* <Row style={{ marginTop: 20 }}>
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {product.reviews.length === 0 && <Message>No Reviews</Message>}
                            <ListGroup variant='flush'>
                                {product.reviews.map((review) => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} />
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h2>Write a Customer Review</h2>
                                    {errorProductReview && (
                                        <Message variant='danger'>{errorProductReview}</Message>
                                    )}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId='rating'>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as='select'
                                                    value={rating}
                                                    onChange={(e) => setRating(e.target.value)}
                                                >
                                                    <option value=''>Select...</option>
                                                    <option value='1'>1 - Poor</option>
                                                    <option value='2'>2 - Fair</option>
                                                    <option value='3'>3 - Good</option>
                                                    <option value='4'>4 - Very Good</option>
                                                    <option value='5'>5 - Excellent</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='comment'>
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control
                                                    as='textarea'
                                                    row='3'
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                            <Button type='submit' variant='primary'>
                                                Submit
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message>
                                            Please <Link to='/login'>sign in</Link> to write a review{' '}
                                        </Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row> */}
                </div>
            </div>
            <hr />
            <div className="row container similar-products">
                <h4>Similar Products ➡️</h4>
                {relatedProducts.length < 1 && (
                    <p className="text-center">No Similar Products found</p>
                )}
                <div className="d-flex flex-wrap">
                    {relatedProducts?.map((p) => (
                        <div className="card m-2" key={p._id} style={{ width: "340px" }}>
                            <img src={p.photo} className="card-img-top" alt={p.name} />
                            <div className="card-body">
                                <div className="card-name-price">
                                    <h5 className="card-title text-capitalize">{p.name}</h5>
                                    <h6 className="card-title card-price">
                                        {p.price.toLocaleString("en-IN", {
                                            style: "currency",
                                            currency: "INR",
                                        })}
                                    </h6>
                                </div>
                                <p className="card-text ">
                                    {p.description.substring(0, 60)}...
                                </p>
                                <div className="card-name-price">
                                    <button
                                        className="btn btn-info ms-1"
                                        onClick={() => navigate(`/products/${p.slug}`)}
                                    >
                                        More Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default ProductDetail;
