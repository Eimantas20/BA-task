import './App.scss';
import { GiphyProvider } from './Components/Hooks/GiphyContext';
import Giphy from './Components/Giphy/Giphy';
import TopBar from './Components/Giphy/TopBar/TopBar';

function App() {

  return (
    <GiphyProvider>
      <div className='container'>
        <TopBar />
        <Giphy />
      </div>
    </GiphyProvider>
  );
}

export default App;