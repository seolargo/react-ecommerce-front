import React from "react";
import { Card } from "antd";
import {Link} from "react-router-dom";
import {EyeOutlined, ShoppingCartOutlined} from "@ant-design/icons"

const { Meta } = Card;

const AdminProductCard = ({ product }) => {
    const { title, description, images, slug } = product;
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <Card 
                        cover={
                            <img 
                                src={images && images.length ? images[0].url : ""}
                                style={{height: "150px", objectFit: "cover"}}
                                className="p-1"    
                            />
                        }
                        actions={[
                            <Link to={`/product/${slug}`}>
                                <EyeOutlined className="text-danger"/><br/>View Product
                            </Link>,
                            <>
                                <ShoppingCartOutlined className="text-danger" /><br />Add to Card
                            </>
                        ]}
                    >
                        <Card.Meta 
                            title={title} 
                            description={description}
                        />
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default AdminProductCard;