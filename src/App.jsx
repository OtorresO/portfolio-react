
import { useState } from 'react'
import './App.css'
import FacebookIcon from './components/icons/FacebookIcon.jsx'
import GithubIcon from './components/icons/GithubIcon.jsx'
import InstagramIcon from './components/icons/InstagramIcon.jsx'
import Proyecto from './components/proyecto/Proyecto.jsx'
import { proyectos } from './data/proyectos.jsx'
import { Toaster, toast } from 'sonner'

function App() {
  const [dataEmail, setDataEmail] = useState({
    nombres: '',
    correo: '',
    mensaje: ''
  });
  const [sending, setSending] = useState(false)
  
  const enviarEmail = async (e) => {
    e.preventDefault();
    setSending(true)
    try {
      const response = await fetch('http://localhost/enviar-correo/index.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataEmail)
      })

      if (!response.ok) {
        const messageError = await response.json();
        toast.error(messageError.message)
      } else {
        const result = await response.json();
        toast.success(result.message)
        setDataEmail({ nombres: '', correo: '', mensaje: '' })

      }
      setSending(false)
    } catch (error) {
      toast.error(error.message)
      setSending(false)
    }

  }
  return <main>
    <Toaster position="top-right" richColors/>
    <header>
      <img src="./img/hero.jpg" alt="Código de javascript" className="hero-image " />
      <div className="overlay-image">

      </div>
      <nav className="navbar ">
        <a href="#acerca_de">Acerca de</a>
        <a href="#proyectos">Proyectos</a>
        <a href="#contactame">Contacto</a>
      </nav>
      <section className="myself">
        <h4 >Orlando Torres</h4>
        <p className='mt-10'>Desarrollador Web</p>
        <div className='flex items-center justify-center gap-3 mt-10'>
          <a href='https://github.com/OtorresO' target='_blank'><GithubIcon size={30} color='#000000' /></a>
          <a href="https://web.facebook.com/forlant.alvarz" target='_blank'><FacebookIcon /></a>
          <a href='https://www.instagram.com/de_orlandot/' target='_blank'><InstagramIcon /></a>
        </div>
      </section>
    </header>

    <div className='container'>
      <div className="acerca-de " id="acerca_de">
        <img src="./img/criatura.png" alt="Imagen de Perfil" />
        <h4 className='my-10 title-section'>Acerca de </h4>

        <p className=''>!Hola! Soy Orlando Torres Orozco, un desarrollador web full stack con 6 meses de experiencia en una
          startup, donde trabajé en un sistema de gestión de clientes usando Laravel, MySQL, jQuery y Vue. Estoy
          buscando nuevas oportunidades laborales para seguir creciendo y aprendiendo en el campo del desarrollo
          web.


        </p>
      </div>
      <div className="proyectos mt-10" id="proyectos">
        <h4 className='title-section'>Proyectos</h4>
        <div className="proyectos-grid mt-10">
          {
            proyectos.map(proyecto => <Proyecto key={crypto.randomUUID()} proyecto={proyecto} />)
          }

        </div>

      </div>

      <div className='flex flex-column justify-center items-center mt-10' id='contactame'>
        <h4 className='title-section my-10'>Contáctame</h4>
        <form onSubmit={enviarEmail}>
          <div className='contactame'>
            <div className='contactame-nombre relative'>
              <span className='text-nombre absolute'>Nombres:</span>
              <input type="text" onChange={e => setDataEmail({ ...dataEmail, nombres: e.target.value })}  value={dataEmail.nombres}/>

            </div>
            <div className='contactame-correo relative'>
              <span className='text-correo absolute'>Correo:</span>
              <input type="text" onChange={e => setDataEmail({ ...dataEmail, correo: e.target.value })}  value={dataEmail.correo}/>

            </div>
            <div className='contactame-mensaje relative'>
              <span className='text-mensaje absolute'>Mensaje:</span>
              <textarea cols={30} rows={10} onChange={e => setDataEmail({ ...dataEmail, mensaje: e.target.value })} value={dataEmail.mensaje}></textarea>
            </div>

            <button className='contactame-enviar' disabled={sending}>{sending? 'Sending...':'Enviar'}</button>

          </div>
        </form>
        

      </div>



    </div>
    <footer className='mt-20'>

      <p>&copy; 2024 Orlando Torres. Ningun derecho reservado, usalo a libertad si te sirve 👍️.</p>
    </footer>
  </main>
}

export default App
