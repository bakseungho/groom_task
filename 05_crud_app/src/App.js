import React, { useState, useCallback, setError } from 'react';
import Form from './components/Form';
import Lists from './components/Lists';
// import Toast from './components/Toast';
import './App.css';

function App() {

  const [budgetData, setBudgetData] = useState([]);
  const [value, setValue] = useState('');
  const [priceValue, setPriceValue] = useState(0);
  const [calc, setCalc] = useState(0);

  console.log('budgetData : ', budgetData);

  const handleClick = useCallback((id) => {
    const newTodoData = budgetData.filter(data => data.id !== id);
    setBudgetData(newTodoData);
  }, [budgetData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newData = {
      id: Date.now(),
      item: value ? value : '항목없음',
      price: Number(priceValue),
    };
    let total = [...budgetData, newData].reduce((acc, {price}) => { return acc + price }, 0);

    setBudgetData(prev => [...prev, newData]);
    setCalc(total.toLocaleString('ko-KR'));
    setValue('');
    setPriceValue('');
  }

  return (
    <div className='container flex flex-col justify-center items-start pw-5 py-5 mt-20'>
      <h1 className='text-white text-3xl font-black'>예산 계산기</h1>

      <div className='inner-box w-full p-5 my-4 bg-white rounded shadow-md lg:w-4/5 lg:max-w-lg'>
        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} priceValue={priceValue} setPriceValue={setPriceValue} />
        <Lists budgetData={budgetData} setBudgetData={setBudgetData} handleClick={handleClick} setCalc={setCalc} />

        {/*
        <form onSubmit={handleSubmit(onSubmit)} className="w-full px-[2rem]">
        </form>
        */ }
      </div>

      <div className='flex justify-end w-full'>
        <p className='text-xl text-white'>총지출 : 
        <span className='font-bold pl-2 text-2xl'>{ calc }</span>
        원
        </p>
      </div>


      {/* toast가 true일 때만 팝업이 노출됩니다.*/}
      { /*
        toast && (
          <Toast
            setToast={setToast}
            message={'⚠️ 공백으로만 입력할 수 없습니다.'}
            position="bottom"
          />
        )
        */ }
    </div>
  );





  //useState로 팝업 노출 상태를 관리합니다.
  // const [toast, setToast] = useState(false);

  /*
  const onSubmit = (data) => {
  	//form에서 넘어온 데이터가 공백으로만 이루어져 있다면,
    if (!data.title.trim() || !data.content.trim()) {
      setError('title', { type: 'trim' });
      // toast pop-up이 보이도록 true로 변경해줍니다.
      setToast(true);
      return;
    }
  };
  */
}

export default App;
