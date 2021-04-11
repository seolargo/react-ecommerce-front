import React, { useState, useEffect } from "react";
import {
    getProductsByCount,
    fetchProductsByFilter
} from "../functions/product";
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";
import { useDispatch } from "react-redux"; 
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider, Checkbox } from "antd";
import { DownSquareOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;

const Shop = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);
    const [ok, setOk] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);
    const [subs, setSubs] = useState([]);
    const [sub, setSub] = useState('');

    let dispatch = useDispatch();
    //let { search } = useSelector((state) => ({...state}))
    //const { text } = search;

    useEffect(() => {
        loadAllProducts();
        getCategories().then((res) => setCategories(res.data));
        getSubs().then((res) => setSubs(res.data));
    }, []);

    const fetchProducts = (arg) => {
        fetchProductsByFilter(arg).then((p) => {
            setProducts(p.data);
            setLoading(false);
        })
    };

    const loadAllProducts = () => {
        getProductsByCount(1000).then((p) => {
            setProducts(p.data);
            setLoading(false);
        })
    };

    useEffect(() => {
        fetchProducts({price});
    }, [ok]);

    const showCategories = () => 
        categories.map((c) => (
            <div key={c._id}>
                <Checkbox 
                    onChange={handleCheck} 
                    className="pb-2 pl-4 pr-4" 
                    value={c._id} 
                    name="category"
                    checked={categoryIds.includes(c._id)}
                >
                    {c.name}
                </Checkbox>
            </div>
        ))

    const handleCheck = (e) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: "" }
        })
        setPrice([0, 0]);
        let inTheState = [...categoryIds];
        let justChecked = e.target.value;
        let foundInTheState = inTheState.indexOf(justChecked);

        if (foundInTheState === -1) {
            inTheState.push(justChecked);
        } else {
            inTheState.splice(foundInTheState, 1);
        }

        setCategoryIds(inTheState);
        fetchProducts({category: inTheState});
    }

    const showSubs = () => 
        subs.map((s) => (
            <div 
                key = {s._id}
                onClick={() => handleSub(s)} 
                className="p-1 m-1 badge badge-secondary"
                style={{cursor: "pointer"}}
            >
                {s.name}
            </div>
        ));
        
    const handleSub = (sub) => {
        setSub(sub);
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" }
        })
        setCategoryIds([]);
        fetchProducts({ sub: sub });
    }

    return (
        <div className="container-fluid">
            <div className="row">
                
                <div className="col-sm-2 pt-2">
                    <h4>Search/Filter</h4>
                    <hr />

                    {loading ? (
                        <h4 className="text-danger">Loading...</h4>
                    ) : (
                        <h4 className="text-danger">Products</h4>
                    )}
                    {products.length < 1 && <p>No products found.</p>}

                    <Menu defaultOpenKeys={["1", "2"]} mode="inline">
                        
                        {/* category */}
                        <SubMenu
                            key="1"
                            title={
                                <span className="h6">
                                    <DownSquareOutlined /> Categories
                                </span>
                            }
                        >
                            <div style={{marginTop: "-10px"}}>
                                {showCategories()}
                            </div>
                        </SubMenu>

                        {/* sub-category */}
                        <SubMenu
                            key="2"
                            title={
                                <span className="h6">
                                    <DownSquareOutlined /> Sub Categories
                                </span>
                            }
                        >
                            <div style={{marginTop: "-10px"}} className="pl-4 pr-4">
                                {showSubs()}
                            </div>
                        </SubMenu>

                    </Menu>
                </div>

                <div className="col-sm-8 row">
                    {products.map((p) => (
                        <div key={p._id} className="col mt-4 mb-4 ml-4 mr-4">
                            <ProductCard product={p}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Shop;