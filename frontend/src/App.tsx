import './App.css'
import ConvoContainer from './components/conversation/ConvoContainer'
import EmptyConvoContainer from './components/conversation/EmptyConvoContainer'
import CustomFooter from './components/footer/CustomFooter'
import CustomHeader from './components/header/CustomHeader'

function App() {
  let startedConvo: Boolean = false;

  return (
    <div className='flex flex-col h-screen overflow-hidden'>
      <CustomHeader />
      {startedConvo ? (<ConvoContainer />) : (<EmptyConvoContainer />)}
      <CustomFooter />
    </div>
  )
}

export default App
