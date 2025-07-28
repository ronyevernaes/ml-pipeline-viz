import { useEffect, useState } from "react";
import { PipelineViz } from "./components";
import { PipelineService } from "./services/pipelineService";
import { type Pipeline } from "./types";

function App() {
  const [pipelineData, setPipelineData] = useState<Pipeline | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await PipelineService.getPipelineData();
      setPipelineData(data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 border-b border-stone-700">
        <h1 className="text-3xl font-bold">Pipelines Data Viz</h1>
      </header>

      <main className="flex-1 pt-4 px-4 min-h-0 flex flex-col">
        {pipelineData && <PipelineViz data={pipelineData} />}
      </main>

      <footer className="p-2 border-t border-stone-700 text-center text-sm text-stone-600">
        ZenML Pipeline Visualization
      </footer>
    </div>
  )
};

export default App;
