
/* Users can add a new transaction with the following fields: title (string), amount number (positive for income, negative for expense), category (string), date (aut-filled with current date, but edible)
/* A summary section shows total income, total expenses, net balance
/* Display transactions in a table or list grouped by date
/* Each transaction shows title amount, category, and date
/* Users can edit, delete transaction, filter by category or date range, search transactions by title, all data is saved and loaded from local storage
/* Allow CSV export of transactions */

import TransactionApp from "./components/TransactionApp/TransactionApp"

/* 
  Responsive accessible UI
  Inputs must be properly labeled and keyboard accessible
  Real-time feedback (input validation, balance update
  Efficient rendering and state management using React functional components and hooks
  Modular, reusable component structure
  Use Typescript throughout
  Use useReducer 
  Handle possible edge cases like - empty form submissions, editing while a filter is applied, handling large transaction lists efficiently
*/


function App() {

  return (
    <>
    <div className="min-h-screen flex flex-col items-center justify-center">
    <TransactionApp/>
   </div>
    </>
  )
}

export default App
