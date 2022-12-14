import { Link } from "react-router-dom";
import { useEffect ,useState} from "react";
import fullaxios from "./FullAxios";
import Cookie from "../components/Cookie";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import Logoutmodal from "./Logoutmodal";


import logo from '../pages/images/TravDays_logos/transparent_logo.png'
const hideMenu = ()=>{
    
    document.getElementById('mobile-menu').style.transform='translateY(-300%)';
    document.getElementById('hide-menu-btn').style.display='none';
    document.getElementById('show-menu-btn').style.display='flex';
}

const MobileMenu = ({ namechanged ,isauthenticated, setIsadmin, setIsauthenticated}) => {

    const history = useHistory();
    const [profiledata, setProfiledata] = useState([])
    const [igotdata, setIgotdata] = useState(false);
    const [profile, setProfile] = useState(false);
    const [isopen, setIsopen] = useState(false);



    useEffect(() => {
        fullaxios({ url: 'userinfo/info', type: 'get' })
            .then(res => {
                    setProfiledata(res.data)
                    setIgotdata(true)
            })
            .catch(res => {
                console.log(res)
            })
    }, [isauthenticated,namechanged])
    
    const Profile = (statement) => {
        setProfile(statement)
    }
   

    const Logout = () => {
        console.log("logout")
        fullaxios({ url: 'auth/logout', sendcookie: true })
            .then(res => {
                //("here",res.data)
                setProfile(false)
                setIsadmin(false)
                setIgotdata(false)
                setProfiledata([])
                setIsauthenticated(false)
                setIsopen(true)

                // Cookie('setCookie',"accesstoken",0,-1)
                Cookie('setCookie', "csrftoken", 0, -1)
                Cookie('setCookie', "sessionid", 0, -1)
                history.push('/login')
            })
            .catch(err => {
                //(err.data)
            })
    }
    return ( 
        <div  id="mobile-menu" className="flex flex-col text-white bg-black fixed top-0 z-[20] w-full h-full opacity-90">
        
            <nav className="flex flex-col w-full h-full items-center justify-center">
               {profile ? <> 

                
                <div onClick={()=>{Profile(false)}} className='p-4 text-xl' >
                <svg xmlns="http://www.w3.org/2000/svg"  id="body_1" className="absolute top-21 left-8 cursor-pointer " width="38" height="38">
                            <g transform="matrix(0.5 0 0 0.49350652 0 0)">
                                <g transform="matrix(0.07700001 0 0 0.07700001 12.499999 -0)">
                                    <g>
                                        <path d="M188.6 453.3L504.9 137L373 137L10 500L373 863L504.9 863L189.2 547.3L990 547.3L990 546.6L990 453.89996L990 453.19995L188.6 453.19995L188.6 453.3z" stroke="none" fill="#FFFFFF" fill-rule="nonzero" />
                                    </g>
                                </g>
                            </g>
                        </svg>
                </div>
                <NavLink onClick={hideMenu} className='p-4 text-xl' to='/changename'><h4>Change Name</h4></NavLink>
                            <NavLink onClick={hideMenu} className='p-4 text-xl' to='/bookings'><h4>Bookings</h4></NavLink>
                            <NavLink  onClick={hideMenu} className='p-4 text-xl' to='/resetpassword'><h4>Reset password</h4></NavLink>
                            <NavLink onClick={hideMenu}  className='p-4 text-xl' to='/myblogs'><h4> My Blogs</h4></NavLink>
               </>:<>
               <div onClick={hideMenu} className="p-6 text-5xl mobilecross">
                     <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
               </div>
               <Link onClick={hideMenu} className='p-6 text-3xl' to='/'>TravDays</Link>
                {/* <Link className='p-4 text-xl' to='/IndivisualBlogPage'>indi-blog</Link> */}
                <Link  onClick={hideMenu} className='p-4 text-xl' to='/trips'>Packages</Link>
                {/* <Link className='p-4 text-xl' to='/blogs'>Blogs</Link> */}
                <Link  onClick={hideMenu} className='p-4 text-xl' to='/gallery'>Gallery</Link>
                <Link  onClick={hideMenu} className='p-4 text-xl' to='/contactus'>Contact Us</Link>
                <Link  onClick={hideMenu} className='p-4 text-xl' to='/faq'>FAQ</Link>
                <NavLink  onClick={hideMenu} className='p-4 text-xl' to='/blogs'><h4>Blogs</h4></NavLink>
                {/* <Link className='p-4 text-xl' to='/bookings'>Bookings</Link>
                <Link className='p-4 text-xl' to='/resetpassword'>Reset password</Link>
            <Link className='p-4 text-xl' to='/changename'>Change name </Link> */}
                
                {isauthenticated && igotdata ? <>
                        <p   onClick={()=>{Profile(true)}} className='p-4 text-xl'  >Profile</p>
                        <p  onClick={()=>{hideMenu();Logout()}} className='p-4 text-xl' ><h4>Logout</h4></p>
                            
                   </> :
                    <NavLink onClick={hideMenu} className='p-4 text-xl' to='/login' >Login</NavLink>}
               </>} 
               <Logoutmodal setIsopen={setIsopen} isopen={isopen} headingg="Proccess complete" p1="You have been logged out" p2=""/>
            </nav>
        </div>
     );
}
 
export default MobileMenu;