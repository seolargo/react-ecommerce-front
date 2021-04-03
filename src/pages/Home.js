import React, {useEffect, useState} from 'react';
import { getProductsByCount } from "../functions/product";
import ProductCard from '../components/cards/ProductCard';
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";  

const Home = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAllProducts();
    }, [])

    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(3).then((res) => {
            setProducts(res.data);
            setLoading(false);
        })
    }

    return (
        <>
            <div className="text-center display-4 mb-2 jumbotron">
                {loading ? (<h4>Loading...</h4>) : <h4>Ömer's E-Commerce Website</h4>}
            </div>

            <h4 className="text-center p-3 display-4" style={{fontWeight: "bold", color: 'purple'}}>
                Categories
            </h4>
            <CategoryList />

            <h4 className="text-center p-3 display-4" style={{fontWeight: "bold", color: 'purple'}}>
                Sub Categories
            </h4>
            <SubList />

            <div className="row mt-5 p-3">
                {products.map((product) => (
                    <div key={product._id} className="col-md-4">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </>
    )
}

export default Home;