import { useCallback, useState } from 'react'


const FilterableList = () => {
    const [items, setItems] = useState<Array<string>>([]);
    const [count, setCount] = useState(0);

    const listItems = useCallback(() => {
        setItems(Array.from({length: 20000}, (_, i) => `Item ${i}`));
    }, [])

    const incrementCount = () => {
        setCount(prev => prev + 1);
    }
  return (
    <div>
          <p>{count}</p>
        <button onClick={listItems}>Render</button>
        <button onClick={incrementCount}>Increment</button>
        <ul>
            {items.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      
    </div>
  )
}

export default FilterableList