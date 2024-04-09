import React, { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

import { password_generator } from '../public/javascript/password_gen';


const App = () => {
    const [length ,setlength]  = useState(8);
    const [numAllowed , setnumAllowed ] = useState(false);
    const [charAllowed , setchar] = useState(false);
    const [pass , setpass] = useState("");
    const [on , seton] = useState(false)


    //ref hook
    
    const Passwordref = useRef(null);


    const passwordGenerator = useCallback(() => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        if(numAllowed) {
            str = str + "0123456789" ; 
        }

        if(charAllowed) {
            str = str + "~!@#$%^&*" ; 
        }

        for (let index = 1; index < length; index++) {
            let char = Math.floor(Math.random() * str.length + 1) ;
            pass = pass + str.charAt(char) ; 
            console.log(pass);  
        }

        setpass(pass) ; 
    } , [length , numAllowed , charAllowed ,setpass]) ;


    useEffect(()=>{
      passwordGenerator()
      

    },[length , numAllowed , charAllowed ,passwordGenerator])
    
    const copypass = () => {
      navigator.clipboard.writeText(pass)
      seton(true)
      setTimeout(()=>{
        seton(false)
      },3000)
      }

  return (
    <>

    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-10 py-3  text-orange-500 bg-gray-800 '> 
    <h2 className='text-5xl text-center text-white underline my-4'>
        Password Generator 
    </h2>
          <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input 
            type="text"
            value={pass}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={Passwordref}
            />

            <button onClick={copypass} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'  >COPY</button>

          </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
                <input 
                type="range"
                min = {8} 
                max={100} 
                value={length}
                className='cursor-pointer'
                onChange={(e) => {setlength(e.target.value)}}
                />
                <label > Length : {length} </label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input 
              type="checkbox"
              defaultChecked = {numAllowed} 
              id='numberInput'
              onChange={()=> {
                setnumAllowed((prev) => !prev)           //this will change the allowed properties according to the checkbox.
              }} 
              />
              <label > Numbers Allowed </label>

            </div>
            <div className='flex items-center gap-x-1'>
              <input 
              type="checkbox"
              defaultChecked = {charAllowed} 
              id='charInput'
              onChange={()=> {
                setchar((val) => !val)           //this will change the allowed properties according to the checkbox.
              }} 
              />
              <label > Characters Allowed </label>


            </div>
          </div>
          
          {on && <div class="bg-green-100 border border-green-400 text-green-700 text-center mt-8 rounded relative"  role="alert">
                <span class="block sm:inline">Password Copied Successfully !! </span>
                <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                  </span>
                  </div>}
    </div>
    </>

  )
}

export default App