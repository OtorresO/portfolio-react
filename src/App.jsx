
import { useEffect, useState } from 'react'
import './App.css'
import FacebookIcon from './components/icons/FacebookIcon.jsx'
import GithubIcon from './components/icons/GithubIcon.jsx'
import InstagramIcon from './components/icons/InstagramIcon.jsx'
import Linkedin from './components/icons/Linkedin.jsx'
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
  const [isScrolled, setIsScrolled] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 100) {  // Cambia 100 por el valor que desees
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Cleanup para evitar fugas de memoria
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
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
    <Toaster position="top-right" richColors />
    <header>

      <nav className={`navbar  ${isScrolled ? 'bg-nav-scroll' : 'bg-transperent glowing-text'}`}>
        <a href="#sobre-mi">Sobre Mí</a>
        <a href="#experiencia">Experiencia Laboral</a>
        <a href="#proyectos">Proyectos</a>
        <a href="#contacto">Contacto</a>
      </nav>

    </header>
    <section className='sobre-mi mt-3 flex items-center gap-3 ' id='sobre-mi'>
      <div className='sobre-mi-profile flex items-center flex-column gap-3'>
        <img className='sobre-mi-avatar' src='./img/a-mi-myself.png' alt='Persona con chompa crema sonriendo' />
        <div className='sobre-mi-redes-sociales flex items-center  gap-3 mt-10'>
          <a href='https://github.com/OtorresO' target='_blank'><GithubIcon size={30} color='#000000' /></a>
          <a href="https://web.facebook.com/forlant.alvarz" target='_blank'><FacebookIcon /></a>
          <a href='https://www.instagram.com/de_orlandot/' target='_blank'><InstagramIcon /></a>
          <a href='linkedin.com/in/orlando-jose-junnior-torres-orozco-050b9331b' target='_blank'><Linkedin /></a>
        </div>
      </div>

      <div className='sobre-mi-description '>
        <h1 className='important fw-bold'>Hola ✋!, te saluda Orlando Torres</h1>
        <p >
          <span className=''>Desarrollador web </span> con 6 meses de experiencia laborando en una startup.</p>
        <p>
          Estoy buscando nuevas oportunidades laborales para seguir creciendo y aprendiendo en el campo del desarrollo
          web.
        </p>
      </div>





    </section>

    <section className='experiencia'>

      <h4 className='important mt-9 fw-bold'>💼 Experiencia Laboral</h4>
      <div className=' flex gap-5 mt-2' >
        <div class="cane">
          <div class="ball">

          </div>
        </div>

        <div className='flex experiencia-container'>
          <div className='experiencia-info flex flex-column gap-3'>
            <h5 className='fs-3 text-primary'>Desarrollador Web</h5>
            <p className='fs-2 text-white fw-bold'>INSOTEC</p>
            <span className='fs-2 text-white'>03/23-10/23</span>
          </div>
          <div className='experiencia-description text-white ' >
            Implementé un Sistema de Gestión Integral para dar seguimiento a los clientes, planes , servicios y pagos.
          </div>
        </div>

      </div>
    </section>

    <section className="proyectos mt-9" id="proyectos">
      <h4 className='important fw-bold'>👨‍💻 Proyectos</h4>
      <div className="proyectos-grid mt-2">
        {
          proyectos.map(proyecto => <Proyecto key={crypto.randomUUID()} proyecto={proyecto} />)
        }

      </div>

    </section>

    <section className='contacto flex flex-column  mt-9' id='contacto'>
      <h4 className='important  fw-bold'>🗣️📲 Contacto</h4>
      <form onSubmit={enviarEmail} className='flex justify-center mt-2'>
        <div className='contacto-grid'>
          <div className='contacto-grid-nombre relative'>
            <span className='text-nombre absolute'>Nombres:</span>
            <input type="text" onChange={e => setDataEmail({ ...dataEmail, nombres: e.target.value })} value={dataEmail.nombres} />

          </div>
          <div className='contacto-grid-correo relative'>
            <span className='text-correo absolute'>Correo:</span>
            <input type="text" onChange={e => setDataEmail({ ...dataEmail, correo: e.target.value })} value={dataEmail.correo} />

          </div>
          <div className='contacto-grid-mensaje relative'>
            <span className='text-mensaje absolute'>Mensaje:</span>
            <textarea cols={30} rows={10} onChange={e => setDataEmail({ ...dataEmail, mensaje: e.target.value })} value={dataEmail.mensaje}></textarea>
          </div>

          <button className='contacto-grid-enviar' disabled={sending}>{sending ? 'Sending...' : 'Enviar'}</button>

        </div>
      </form>


    </section>

    <footer className='mt-9 '>

      <p className='text-center '>&copy; 2024 Orlando Torres. Ningun derecho reservado, usalo a libertad si te sirve 👍️.</p>
    </footer>



  </main>

}

export default App
