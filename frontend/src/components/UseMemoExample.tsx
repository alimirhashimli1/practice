import React, { useState, useMemo } from "react";

const UseMemoExample = () => {
  const [number, setNumber] = useState<number>(0);

  // Base code where you will implement the factorial calculation using useMemo


  const factorial = useMemo(() => {
    const calculateFactorial = (num: number): number => {
    if (num <= 0) return 1;
    return num * calculateFactorial(num - 1);
  }
  return calculateFactorial(number);
  }, [number]);

  return (
    <div>
      <h2>Factorial Calculator</h2>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
        min={0}
      />
      <h3>Factorial of {number}: {factorial}</h3>
    </div>
  );
};

export default UseMemoExample;
