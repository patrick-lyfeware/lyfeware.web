import { useState } from "react";

const BUILD_SHA = import.meta.env.VITE_BUILD_SHA ?? "local";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="app">
      <h1>Lyfeboost</h1>
      <p className="tagline">Engineering foundation is live. 🚀</p>
      <p>
        This trivial app proves the pipeline end-to-end: commit → CI → deploy →
        reachable URL.
      </p>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        Clicked {count} {count === 1 ? "time" : "times"}
      </button>
      <footer className="build">build: {BUILD_SHA}</footer>
    </main>
  );
}
