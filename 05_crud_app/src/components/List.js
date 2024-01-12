import React, { useState } from 'react'

const List = React.memo(({
    id, item, price, budgetData, setBudgetData, handleClick
}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editeItem, setEditedTitle] = useState(item);
    const [editePrice, setEditedPrice] = useState(price);

    const handleEditChange = e => {
        setEditedTitle(e.target.value);
    }

    const handleEditPriceChange = e => {
        setEditedPrice(e.target.value);
    }

    // List Item 삭제
    const handlerDeleteClick = itemId => {
        const newTodoItem = budgetData.filter(data => data.id !== itemId);
        setBudgetData(newTodoItem);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTodoData = budgetData.map(data => {
            if(data.id === id) {
                data.item = editeItem;
                data.price = editePrice;
            };
            return data;
        });

        setBudgetData(newTodoData);


        console.log('3 : ', budgetData);

        setIsEditing(false);
    }

    if(isEditing) {
        return (
            <form onSubmit={handleSubmit}>
                <div className='item-list flex justify-between items-center w-full mb-2 py-2 border rounded'>
                    <div className='item-value flex justify-between items-center w-full px-3'>
                        <div className='item-name w-2/4'>
                            <input type='text' className='text-black mr-2 p-2 bg-gray-100 rounded' value={editeItem} onChange={handleEditChange} />
                        </div>
                        <div className='item-price w-2/4'>
                            <input type='number' className='text-black p-2 bg-gray-100 rounded' value={editePrice} onChange={handleEditPriceChange} />
                        </div>
                    </div>

                    <div className='flex justify-center items-center item-btn w-2/6'>
                        <button type='submit' className='mr-2 text-sm p-1 text-white font-bold bg-green-700 rounded' onClick={() => handleClick(id)}>수정</button>
                        <button type='button' className='text-sm p-1 text-white font-bold bg-red-700 rounded' onClick={() => handlerDeleteClick(id)}>Delete</button>
                    </div>
                </div>
            </form>
        )
    }else {
        return (
            <div className='item-list flex justify-between items-center w-full mb-2 py-2 border rounded'>
                <div className='item-value flex justify-between items-center w-full px-3'>
                    <div className='item-name w-2/4'>
                        <p className='text-black'>{ item }</p>
                    </div>
                    <div className='item-price w-2/4'>
                        <p className='text-black'>{ price.toLocaleString('ko-KR') }원</p>
                    </div>
                </div>

                <div className='flex justify-center items-center item-btn w-2/6'>
                    <button type='button' className='mr-2 text-sm p-1 text-white font-bold bg-green-700 rounded' onClick={() => setIsEditing(true)}>Edit</button>
                    <button type='button' className='text-sm p-1 text-white font-bold bg-red-700 rounded' onClick={() => handlerDeleteClick(id)}>Delete</button>
                </div>
            </div>
        )
    }
});


export default List;