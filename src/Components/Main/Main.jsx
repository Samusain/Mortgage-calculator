import React from 'react'
import { useState, useEffect } from 'react'
import './Main.css'
import { TbCurrencyPound } from "react-icons/tb";
import { FaPercent } from "react-icons/fa";
import Img1 from '../../assets/images/illustration-empty.svg'
import Img2 from '../../assets/images/icon-calculator.svg'


const Main = () => {
  
  const [values, setValues] = useState({
    amount: '',
    term: '',
    interest: '',
    type: ''
  })
  const [percentage, setPercentage] = useState();
  console.log(percentage)

  const [errors, setErrors] = useState({})
  
  useEffect(()=>{
    setPercentage(values.interest/100);
  }, [values.interest]);


  const handleChanges = (e) => {
    setValues( prevState => ({
      ...prevState, [e.target.name]: e.target.value
    }))
  }
  
  const validate = (values) => {
    const errors = {};
  if (!values.amount) {
    errors.amount = 'This field is required';
  } else if (isNaN(values.amount)) {
    errors.amount = 'Invalid amount';
  }

  if (!values.term) {
    errors.term = 'This field is required';
  } else if (isNaN(values.term)) {
    errors.term = 'Invalid term';
  }

  if (!values.interest) {
    errors.interest = 'This field is required';
  } else if (isNaN(values.interest) || values.interest < 0 || values.interest > 100) {
    errors.interest = 'Invalid interest rate';
  }

  if (!values.type) {
    errors.type = 'This field is required';
  }
    return errors;
  }
  
  const [calculatedValue, setCalculatedValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(values);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      const monthlyInterestRate = percentage / 12;
      const numberOfPayments = values.term * 12;
      const calValue = values.amount * [monthlyInterestRate * (1 + monthlyInterestRate) ** numberOfPayments] / [(1 + monthlyInterestRate) ** numberOfPayments - 1];
      setCalculatedValue(calValue.toFixed(2));
    }
  }


  return (
    <main>
        <div className="container">
            <div className="calculator">
              <article className='top'>
                <h1>Mortgage Calculator</h1>
                <p><a href="/">Clear All</a></p>
              </article>
              <form id="form" onSubmit={handleSubmit}>
                <div className='amount'>
                  <label htmlFor='amount'> Mortgage Amount</label>
                  <div className='amount-box'>
                    <TbCurrencyPound className="pound-icon"/>
                    <input 
                      type="text" 
                      id='amount'
                      name='amount'
                      value={values.amount}
                      onChange={handleChanges}
                    />
                  </div>
                    <span className='error'>{errors.amount}</span>
                </div>
                <div className='mort'>
                  <label htmlFor='term'>Mortgage Term
                    <div className="term-box">
                      <input 
                        type="text" 
                        id='term'
                        min="0"
                        name='term'
                        value={values.term}
                        onChange={handleChanges}
                      />
                      <p>years</p>
                    </div></label>
                    <span className='error'>{errors.term}</span>
                  
                  <label htmlFor='interest'> Interest Rate
                    <div className='rate-box'>
                      <input 
                        type="text" 
                        id='interest'
                        name='interest'
                        value={values.interest}
                        onChange={handleChanges}
                      />
                      <FaPercent className="percent-icon"/>
                    </div></label>
                    <span className='error'>{errors.interest}</span>
                  
                </div>
                <div className="type">
                  <label htmlFor='type' >Mortgage Type</label>
                    <div className="checkbox">
                      <input 
                      type="radio" 
                      name='type'
                      value="repayment"
                      checked={values.type === "repayment"}
                      onChange={handleChanges}
                      />Repayment
                    </div>
                    <div className="checkbox">
                      <input 
                      type="radio" 
                      name='type'
                      value="interest-only"
                      checked={values.type === "interest-only"}
                      onChange={handleChanges}
                      />Interest Only
                    </div>
                    <span className='error'>{errors.type}</span>
                </div>
                <button><img src={ Img2 } alt="icon-calculator" className='calc-img'/>Calculate Repayments</button>
              </form>
            </div>

            <div className="result">
            {/* Empty results start */}
              {/* <div className='empty' id='empty'>
                <img src={ Img1 } alt="illutration-empty" className='empty-img'/>
                <article className='empty-form'>
                  <h2>Results shown here</h2>
                  <p>Complete the form and click “calculate repayments” to see what 
                  your monthly repayments would be.</p>
                </article>
              </div> */}
              {/* Empty results end */}

        {/* Completed results start */}
                {calculatedValue? 
                  <div className="filled" id='filled'>
                    <article className='fill-article'>
                      <h3>Your results</h3>
                      <p>Your results are shown below based on the information you provided. 
                      To adjust the results, edit the form and click “calculate repayments” again.</p>
                    </article>
                    <div className="calc-result">
                      <p>Your monthly repayments</p>
                      <span id='monthly'>{calculatedValue}</span>
                      <article className='term-pay'>
                        <p>Total you'll repay over the term</p>
                        <span id='termly'>---</span>
                      </article>
                    </div>
                  </div>
                :
                  <div className='empty' id='empty'>
                  <img src={ Img1 } alt="illutration-empty" className='empty-img'/>
                  <article className='empty-form'>
                    <h2>Results shown here</h2>
                    <p>Complete the form and click “calculate repayments” to see what 
                    your monthly repayments would be.</p>
                  </article>
                </div>
                }
            </div>
          
        </div>
        {/*<!-- Completed results end --> */}
    </main>
  )
}

export default Main