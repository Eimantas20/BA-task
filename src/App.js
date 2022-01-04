import './App.scss';
import { GiphyProvider } from './GiphyContext';
import Giphy from './Components/Giphy';
import TopBar from './Components/TopBar';

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