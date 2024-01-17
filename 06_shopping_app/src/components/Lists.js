import React, { useState, useEffect } from 'react'
import axios from '../api/axios';
import requests from '../api/requests';

export default function Lists() {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const { data: productData } = await axios.get(requests.fetchProduct);

        setProduct(productData);
        console.log('data : ', productData);
    }

  return (
    <div className='px-2 py-3'>
        <nav className='tabNav flex justify-center items-center mb-4'>
            <button type='button' className=''>모두</button>
            <button type='button'>전자기기</button>
            <button type='button'>쥬얼리</button>
            <button type='button'>남성의류</button>
            <button type='button'>여성의류</button>
        </nav>

        <div className='tabs_cont w-full flex flex-wrap'>
        {
            product.map((item, index) => (
            <div key={item.id} id={item.id} className='w-1/3 border border-black p-3 m-1'>
                <img src={item.image} alt={item.title} className='w-full object-cover'/>
                <div>
                    <p>{ item.title }</p>
                    <div className='flex justify-between'>
                        <span>Cart 담기</span>
                        <span>$ { item.price }</span>
                    </div>
                </div>
            </div>
            ))
        }
        </div>
    </div>
  )
}
