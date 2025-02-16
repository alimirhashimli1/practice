import { useCallback, useState } from 'react'


const FilterableList = () => {
    const [items, setItems] = useState<string[]>([]);
    const [text, setText] = useState<string>('');

  

const listItems = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setItems(Array.from({ length: 20000 }, (_, i) => `${e.target.value} - Item ${i}`));
}, [setText, setItems]);
 
 
  return (
    <div>
       
       <input type="text" value={text} onChange={listItems} />
        <ul>
            {items.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      
    </div>
  )
}

export default FilterableList