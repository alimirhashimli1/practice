import React, { useState, useEffect } from "react";

// Simulating an asynchronous operation, like fetching data
const fetchData = (): Promise<string[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["Item 1", "Item 2", "Item 3", "Item 4"]);
    }, 2000); // Simulate a 2-second delay
  });
};

const AsyncList: React.FC = () => {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchData();
      setData(result);
    };
    loadData();
  }, []);

  return (
    <div>
      <h3>Async List</h3>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default AsyncList;
