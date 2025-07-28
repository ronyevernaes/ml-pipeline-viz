import { PipelineViz } from "./components";
import data from "./data.json";
import type { Pipeline } from "./types";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 border-b border-stone-700">
        <h1 className="text-3xl font-bold">Data Viz Pipelines</h1>
      </header>

      <main className="flex-1 p-4 min-h-0">
        <PipelineViz data={data as Pipeline} />
      </main>

      <footer className="p-2 border-t border-stone-700 text-center text-sm text-stone-600">
        ZenML Pipeline Visualization
      </footer>
    </div>
  )
};

export default App;
