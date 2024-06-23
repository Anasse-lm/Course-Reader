import RouterController from "./components/RouterController";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { FilesProvider } from "./components/context/FilesContext";

function App() {
  return (
    <div className='app'>
      <FilesProvider>
        <RouterController />
      </FilesProvider>
    </div>
  );
}

export default App;
