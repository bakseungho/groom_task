import React, { useEffect } from 'react';

export default function ToastPopup({
    message,
    setToast,
    position,
  }) {
  
    // 3초 뒤 toast를 false로 변경합니다.
    useEffect(() => {
      const timer = setTimeout(() => {
        setToast(false);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }, [setToast]);
  
    return (
      <div
        className={`fixed z-20 flex h-[4rem] w-[90%] max-w-[73rem] items-center justify-center rounded-[1rem] bg-green-50 opacity-[97%] shadow-[0px_2px_8px_rgba(0,0,0,0.25)] ${
          position === 'top' ? 'animate-toast-top' : 'animate-toast-bottom'
        }`}>
        <p className="text-Body text-white">{message}</p>
      </div>
    );
  }