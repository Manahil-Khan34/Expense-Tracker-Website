import React, { useState } from 'react'
import Input from '../Inputs/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddExpanceform = ({onAddExpance}) => {
  
  const [income, setIncome] = useState({
    category:"",
    amount:"",
    date:"",
    icon:"",
  });

  const handleChange = (key, vlaue) => setIncome({...income, [key]:vlaue});
  
  
    return (
    <div>
     <EmojiPickerPopup
     icon={income.icon}
     onSelect={(selectedIcon) => handleChange("icon", selectedIcon)} />

     <Input
     value={income.category}
     onChange={({ target }) => handleChange("category" , target.value)}
     label="Category"
     placeholder="Rent , Groceries, etc"
     type="text" />

      <Input
     value={income.amount}
     onChange={({ target }) => handleChange("amount" , target.value)}
     label="Amount"
     placeholder="Rent , Groceries, etc"
     type="number" />

 <Input
     value={income.date}
     onChange={({ target }) => handleChange("date" , target.value)}
     label="Date"
     placeholder="Rent , Groceries, etc"
     type="date" />

     <div className="flex justify-end mt-6">
  <button
    type="button"
    className="add-btn add-btn-fill"
    onClick={() => onAddExpance(income)}
  >
    Add Expense
  </button>
</div>

    </div>
  )
}

export default AddExpanceform
