import './ComponentWrapper.css'
import Header from '../Header/Header'
import Search from '../Search/Search';

function ComponentWrapper() {
  return (
    <div className='GeneralContainer'>
      <div className='ContentWrapper'>
        <div className='ComponentWrapper'>
          <Header />
          <hr />
          <Search />
        </div>
      </div>
    </div>
  )
}

export default ComponentWrapper;