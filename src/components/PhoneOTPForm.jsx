//import React from "react";
import { useState } from 'react'
import OtpInput from './OtpInput';
export const PhoneOtpForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showOtpInput,setShowOtpInput]=useState(false)
  function handlePhoneNumber(e) {
    setPhoneNumber(e.target.value)
  }
  function handlePhoneSubmit(e) {
    e.preventDefault()

    //phone validations
    const regex = /[^0-9]/g;
    if (phoneNumber.length < 10 || regex.test(phoneNumber)){
      alert("Invalid Phone Number")
      return; 
    }
    //call backend API <---if successful

    //show otp field
    setShowOtpInput(true)
  }
  function onOtpSubmit(otp) {
    console.log('login Successfully ',otp)
  }
  return <div>
    {!showOtpInput ?
      <form onSubmit={handlePhoneSubmit}>
        <input type="text"
          value={phoneNumber}
          onChange={handlePhoneNumber}
          placeholder='Enter Phone Number' name="phone number" id="phone-number" />
        <button type="submit">Submit</button>
      </form> :
      <div>
        <p>
          Enter otp sent to {phoneNumber}
        </p>
          <OtpInput length={ 4} onOtpSubmit={onOtpSubmit} />
        
      </div>}
    </div>
};

export default PhoneOtpForm;