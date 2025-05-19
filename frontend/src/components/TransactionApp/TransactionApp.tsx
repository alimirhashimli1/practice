import React from 'react'


function TransactionApp() {
  return (
    <form action="">
      <div>
      <label htmlFor="">Title</label>
      <input type="text" placeholder='Title' />
      </div>
      <div>
      <label htmlFor="">Amount</label>
      <input type="number" placeholder='Amount' />
      </div>
      <div>
      <label htmlFor="">Category</label>
      <select name="" id="">
        <option disabled value="">Select category</option>
        <option value="">Income</option>
        <option value="">Expense</option>
      </select>
      </div>
    </form>
  )
}

export default TransactionApp