import AngularIcon from "../components/icons/AngularIcon";
import AstroIcon from "../components/icons/AstroIcon";
import JqueryIcon from "../components/icons/JqueryIcon";
import LaravelIcon from "../components/icons/LaravelIcon";
import MysqlIcon from "../components/icons/MysqlIcon";
import ReactIcon from "../components/icons/ReactIcon";
import SupabaseIcon from "../components/icons/SupabaseIcon";

export const proyectos = [
    {
        name:'SistemaM',
        image:'img/proyectos/SISTEMAM.png',
        technologiesIcons:[
    LaravelIcon,JqueryIcon,MysqlIcon
        ],
        url:'#',
        urlAvailable:false,
        repo:'https://github.com/OtorresO/gestion-clientes'
        
    },
    {
        name:'UnsplashBox',
        image:'img/proyectos/UNSPLASHBOX.png',
        technologiesIcons:[
            AstroIcon,ReactIcon,SupabaseIcon
        ],
        urlAvailable:true,
        url:'https://unsplash-collection-e1emgt884-orlandotos-projects.vercel.app/',
        repo:'https://github.com/OtorresO/unsplash-collection'
    },
    {
        name:'Evaluations Teachers',
        image:'img/proyectos/EVLUATIONTEACHERS.png',
        technologiesIcons:[
            AngularIcon
        ],
        urlAvailable:true,
        url:'https://euphonious-nougat-82a974.netlify.app/login',
        repo:'https://github.com/OtorresO/proyecto-final-angular'
    }
]