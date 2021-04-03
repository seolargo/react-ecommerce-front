import React, {useState} from "react";
import { Card, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductListItems from './ProductListItems';

import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

const SingleProduct = ({product}) => {
    const [tooltip, setTooltip] = useState("Click to add");
    
    const { user, cart } = useSelector((state) => ({ ...state}))
    const dispatch = useDispatch();

    const {title, images} = product;

    const handleAddToCart = () => {
        let cart = [];
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
            }
            cart.push({
                ...product,
                count: 1
            });
            let unique = _.uniqWith(cart, _.isEqual)
            localStorage.setItem('cart', JSON.stringify(unique))
            setTooltip("Added");

            dispatch({
                type: "ADD_TO_CART",
                payload: unique
            })
        }
    }

    return (
        <>
            <div className="col-md-5">
                <Carousel showArrows={true} autoPlay infiniteLoop>
                    {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
                </Carousel>
            </div>

            <div className="col-md-5">
                <h1 className="bg-info-p-3 ml-5">{title}</h1>
                <Card
                    actions=
                    {[
                        <Tooltip title={tooltip}>
                            <a onClick={handleAddToCart}>
                                <ShoppingCartOutlined className="text-danger" /><br />Add to Card
                            </a>
                        </Tooltip>
                    ]}
                    >
                        <ProductListItems product={product}/>
                </Card>
            </div>
        </>
    )
}

export default SingleProduct;