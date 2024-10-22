import './Tailwind.css';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/footer';
import Navbar from './components/navbar';
import History from './pages/history'
import Fund from './pages/fund';

const App = () => {

  return (
    <>
      <div className='bg-mid dark:bg-dark font-main'>
        <div className='max-w-[100vw] container'>
          <Navbar />
          <Routes>
            <Route
              path={'/'}
              element={<History />}
            />
            <Route
              path={'/fund'}
              element={<Fund />}
            />
          </Routes>
          <Footer></Footer>
        </div>
      </div>
    </>
  );
};

export default App;
