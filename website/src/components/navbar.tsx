import { Link } from 'react-router-dom';

const Navbar = () => {

  const handleHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav className='fixed top-0 h-[4.5rem] w-[100%] z-10 bg-gray-300 dark:bg-dark px-24'>
        <div className='h-full w-full text-2xl text-dark dark:text-light bg-gray-300 dark:bg-dark font-heading flex justify-between items-center px-12'>
          <div className='flex flex-row justify-center items-center'>
            <img src='logo.png' alt='logo' className='h-16 w-16' />
            <div className=' tracking-wider font-bold text-3xl'>SAMPOORNA SCAN</div>
          </div>
          <div className='w-[50%] h-full flex justify-end'>
            <ul className='w-[70%] h-full flex justify-evenly items-center font-bold text-2xl'>
              <li onClick={handleHome}>
                <Link to={`/`}>History</Link>
              </li>
              <li onClick={handleHome}>
                <Link to={`/fund`}>Fund</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
