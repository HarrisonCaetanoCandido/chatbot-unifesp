import './Chat.css'
import ConvoContainer from '../../components/conversation/ConvoContainer'
import EmptyConvoContainer from '../../components/conversation/EmptyConvoContainer'
import CustomFooter from '../../components/footer/CustomFooter'
import CustomHeader from '../../components/header/CustomHeader'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useStore } from '@/store';

function Chat() {
  const { chatInitialized } = useStore();

  useEffect(() => {
    toast(
      <p>Ao continuar, você concorda com os <a href="/termos-de-uso" className="underline text-blue-500">Termos de Uso</a> e a <a href="/politica-de-privacidade" className="underline text-blue-500">Política de Privacidade</a>.</p>
      ,
      {
        duration: 6000,
      }
    );

  }, []);

  return (
    <div className='flex flex-col h-screen overflow-hidden bg-[#1c1d25]'>
      <CustomHeader />
      {chatInitialized ? (<ConvoContainer />) : (<EmptyConvoContainer />)}
      <CustomFooter />
    </div>
  )
}

export default Chat
