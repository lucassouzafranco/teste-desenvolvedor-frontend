import './ComponentWrapper.css'
import Header from '../Header/Header'

function ComponentWrapper() {
  return (
    <div className='GeneralContainer'>
      <div className='ContentWrapper'>
        <div className='ComponentWrapper'>
          <Header />
          <hr />
          searchbar
        </div>
      </div>
    </div>
  )
}

export default ComponentWrapper;