import './App.css';
import LeftNav from './components/LeftNav';
import TopNav from './components/TopNav';
import Main from './components/Main';

function App() {
  return (
    <>
      <div className="navigations">
      <LeftNav/>
        <div className="right_section">
        <TopNav/>
        <Main />
        </div>
      </div>
    </>
  );
}

export default App;
