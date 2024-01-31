import React from 'react';
import './CustomInput.css';

const CustomInput = (props) => (
  <div className="input-container">
    <textarea className="custom-input" placeholder="Enter your text here..." {...props} ></textarea>
  </div>
);

export default CustomInput;
