import unifespLogo from '/unifesp-logo.png';
import { Link } from 'react-router-dom';

export default function CustomHeader() {
    return (
        <>
            <header className='w-full bg-[#215A36] h-[135px] flex justify-center items-center'>
                <div
                    className='flex w-[80%] items-center justify-between h-[70px]'>
                    <div className='flex justify-between items-center'>
                        <Link to="/">
                            <img
                                title='Unifesp Logo'
                                rel='noopener noreferrer'
                                className='unifesp-logo'
                                src={unifespLogo} />
                        </Link>
                    </div>
                    <a
                        href='https://dae-sjc.unifesp.br/minicursos/4-integralizando-o-bct'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='underline text-white hover:underline dae-link'
                    >Acesse a página oficial da DAE SJC</a>
                </div>
            </header>
        </>
    );
}