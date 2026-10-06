'use client'
import React, { useState } from 'react';
import ProductCard from './ProductCard';

const AllProducts = ({ products }) => {
    const [search, setSearch] = useState('')

    const filteredData = products.filter(product => {
        if (!search.trim()) {
            return products
        } else {
            const filterProduct = product.name.toLowerCase().includes(search.toLowerCase())
            return filterProduct
        };


    })

    return (
        <div>
            <div className='flex justify-between'>
                <p>All Products</p>
                <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search' />
            </div>
            <div className='grid grid-cols-5 gap-8'>
                {
                    filteredData.map(product => <ProductCard key={product._id} product={product}></ProductCard>)
                }
            </div>
        </div>
    );
};

export default AllProducts;