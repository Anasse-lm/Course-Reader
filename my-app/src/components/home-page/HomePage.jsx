import Header from './Header';
import Main from './Main';

function HomePage({ setCanAccessSlider }) {
  return (
    <div className='home-page'>
      <Header />
      <Main setCanAccessSlider={setCanAccessSlider}/>
    </div>
  );
}

export default HomePage;
