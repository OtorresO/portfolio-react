/* eslint-disable react/prop-types */
import './proyecto.css'
import EyeIcon from '../icons/EyeIcon'
import GithubIcon from '../icons/GithubIcon'

export default function Proyecto({ proyecto }) {
    return (
        <div className="proyecto">
            <div className="proyecto-img" style={{ backgroundImage: `url(${proyecto.image})` }}>
                <div className="overlay-proyecto-image ">
                    <a className="btn btn-first-eye flex items-center justify-center  gap-1 " href={proyecto.url}>
                        <EyeIcon /> Ver Demo

                    </a>
                    <a className="btn btn-second-github flex items-center justify-center gap-1" href={proyecto.repo}>
                        <GithubIcon /> Ver código

                    </a>
                </div>

            </div>
            <div className="proyecto-nombre">
                {proyecto.name}
            </div>
            <div className="flex gap-2 items-center justify-center">

                {
                    proyecto.technologiesIcons.map(TechnologieIcon => {
                        return <span className='badge-technologie' key={crypto.randomUUID()}>
                        {<TechnologieIcon/>}
                        </span>
                    })
                }


            </div>
        </div>
    )
}
