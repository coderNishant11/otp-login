/* eslint-disable react/prop-types */
//import React from "react";
import {useState,useRef, useEffect} from 'react'
export const OtpInput = ({length=4,onOtpSubmit=()=>{}}) => {
    const [otp, setOtp] = useState(new Array(length).fill(""))
    const inputRefs =useRef([])
    console.log(inputRefs)
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus()
        }
    },[])
    const handleChange = (e, index) => {
        const value = e.target.value;
        if (isNaN(value)) return;
        const newOtp = [...otp]
        
        // allow only one input 
        newOtp[index] = value.substring(value.length - 1)
        setOtp(newOtp)

        //submit trigger
        const combinedOtp = newOtp.join("");
        if (combinedOtp.length == length) {
            onOtpSubmit(combinedOtp)
        }
        //move to next input id current input is filled
        if (value && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index+1].focus()
        }
    }
    const handleClick = (index) => {
        inputRefs.current[index].setSelectionRange(1, 1)
        
        //if previous input is empty
        if (index > 0 && !otp[index - 1]) {
            inputRefs.current[otp.indexOf('')].focus()
        }
        
    }
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && !otp[index] > 0 && inputRefs.current[index - 1]) {
            //moving focus to the previous input when pressing backspace
            inputRefs.current[index-1].focus()
        }
        
    }
    return <div>
        {otp.map((value, index) => {
            return (
                <input key={index} type="text" value={value}
                    ref={(input)=>(inputRefs.current[index]=input)}
                    onChange={(e) => handleChange(e, index)}
                    onClick={() => handleClick(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className='otpInput'
                />
            )
        })
    
        }
    </div>;
};


export default OtpInput