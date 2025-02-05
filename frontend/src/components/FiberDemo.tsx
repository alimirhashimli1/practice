import { lazy, Suspense, useState, useTransition, Profiler } from "react";

const FiberDemo: React.FC = () => {
  const [text, setText] = useState("");
  const [list, setList] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const AsyncList = lazy(() => import("./AsyncList"));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);

    // Simulate a computation-heavy task to update the list
    const newList = Array.from({ length: 20000 }, (_, i) => `${e.target.value} - Item ${i}`);
    startTransition(() => {
      setList(newList);
    });
  };

  // Profiler callback to log render duration and other details
  const profilerCallback = (
    id: string,
    phase: "mount" | "update" | "nested-update",
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number
  ) => {
    console.log(`Profiler (${id}) - ${phase} phase:`);
    console.log(`  Actual render time: ${actualDuration}ms`);
    console.log(`  Base render time: ${baseDuration}ms`);
    console.log(`  Start time: ${startTime}`);
    console.log(`  Commit time: ${commitTime}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>React Fiber - Concurrent Mode Demo</h2>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Type something..."
        style={{ padding: "10px", width: "100%" }}
      />
      {isPending && <p>Loading...</p>}
      <ul style={{ maxHeight: "300px", overflowY: "auto", border: "1px solid gray", padding: "10px" }}>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      {/* Wrap the Suspense and AsyncList with Profiler */}
      <Profiler id="async-list" onRender={profilerCallback}>
        <Suspense fallback={<p>Loading...</p>}>
          <AsyncList />
        </Suspense>
      </Profiler>
    </div>
  );
};

export default FiberDemo;
