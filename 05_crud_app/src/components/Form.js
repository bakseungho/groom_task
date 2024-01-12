import React from 'react'

export default function Form({ handleSubmit, value, setValue, priceValue, setPriceValue }) {

    const handlerItemChange = e => {
        setValue(e.target.value);
    }

    const handlerPriceChange = e => {
      setPriceValue(e.target.value);
    }

  return (
    <form className='flex flex-col' onSubmit={handleSubmit}>
        <div className='flex justify-between items-center mb-4'>
            <div className='flex flex-col w-2/4 mr-10'>
                <label className='text-gray-900 mb-2'>지출항목</label>
                <input type='text' className='text-gray-800 px-3 py-2 shadow border rounded' placeholder='항목을 입력하세요.' value={value} onChange={e => handlerItemChange(e)} />
            </div>

            <div className='flex flex-col w-2/4'>
                <label className='text-gray-900 mb-2'>비용</label>
                <input type='number' className='text-gray-800 px-3 py-2 shadow border rounded' placeholder='비용을 입력하세요.' value={priceValue} onChange={handlerPriceChange} />
            </div>
      </div>

      <button type='submit' className='bg-black rounded'>제출</button>
    </form>
  )
}
