import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//aums imports?
import fullaxios from './components/FullAxios';
//aums imports?
import Navbar from './components/Navbar';
import Blogs from './pages/BlogsPage';
import ContactUs from './pages/ContactUs';
import Gallery from './pages/Gallery';
import Home from './pages/Homepage';
import AllTrips from './pages/AllTripsPage';
import Trip from './pages/TripPage';
import FAQ from './components/FAQ';
import WriteABlog from './components/WriteABlog';
import IndivisualBlogPage from './pages/IndivisualBlogsPage';
import MobileMenu from './components/MobileMenu';
import Logout from './pages/Logout';
import Login from './pages/Login';
import PackagesPage from './pages/PackagesPage';
import { Link } from 'react-router-dom';
import Privacy from './pages/PrivacyPolicy';
import { useState, useParams, useEffect } from 'react';
import Addtrips from './ADMIN/Addtrips';
import Edittrips from './ADMIN/Edittrips';
import ApproveBlogs from './ADMIN/ApproveBlogs';
import Addtestimonials from './ADMIN/Addtestimonials';
import AdmContactUs from './ADMIN/AdmContactUs';
import AdmFaq from './ADMIN/AdmFaq';
import AdmBooking from './ADMIN/AdmBooking';
import MainAdmin from './ADMIN/MainAdmin';
import Profilepage from './pages/Profilepage';
import Registration from './pages/Registration';
import ResetPassword from './pages/ResetPassword';
import BookingHistory from './pages/Bookinghistory';
import MyBlogs from './pages/MyBlogs';
import BgImg1 from "./pages/images/TravDays_logos/bg_layer_1.svg"
import BgImg2 from "./pages/images/TravDays_logos/bg_layer_2.svg"
import BgImg3 from "./pages/images/TravDays_logos/bg_layer_3.svg"
import EditBlogsPage from './pages/EditBlogsPage';
import TnC from './pages/TermsAndConditions';
import AboutUs from './pages/AboutUs';
import NotFound from './pages/NotFound';
import NotLoggedIn from './pages/NotloggedInPage';
import UndefinedError from "./components/FetchErrorHandling/UndefinedError";
import MobileProfile from './components/MobileProfile';
import Logoutmodal from './components/Logoutmodal';

const showMenu = () => {
  document.getElementById('mobile-menu').style.transform = "translateY(0%)";
  document.getElementById('show-menu-btn').style.display = 'flex';
  document.getElementById('hide-menu-btn').style.display = 'none';

}
const hideMenu = () => {
  document.getElementById('mobile-menu').style.transform = 'translateY(-300%)';
  document.getElementById('hide-menu-btn').style.display = 'none';
  document.getElementById('show-menu-btn').style.display = 'flex';
}
// aum time 

function App() {
  const [isadmin, setIsadmin] = useState(false);
  const [isauthenticated, setIsauthenticated] = useState(false);
  const [namechanged, setNamechanged] = useState(0);
  const [preLoading, setPreLoading] = useState(true)
  const [error, setError] = useState(false)
  //modall varialble
  const [isopen,setIsopen] = useState(false);

  const [profiledata, setProfiledata] = useState([])
  const [igotdata, setIgotdata] = useState(null);


  useEffect(() => {
        fullaxios({ url: 'userinfo/info', type: 'get' })
            .then(res => {
                    setProfiledata(res.data)
                    setIgotdata(true)
            })
            .catch(res => {
                setIgotdata(false)
                console.log(res)
            })
    }, [isauthenticated,namechanged])

  useEffect(() => {
    fullaxios({url: 'userinfo/status'})
      .then((res) => {
        if (res) {
          setIsadmin(res.data.admin)
          setIsauthenticated(res.data.authenticated)
          setTimeout(() => {
            const preLoader = document.querySelector('.loader-container')
            preLoader.remove();
            setPreLoading(false)
          }, 1000);
        }
      })
      .catch(err => {
        if(err){
          setTimeout(() => {
            const preLoader = document.querySelector('.loader-container')
            preLoader.remove();
            setPreLoading(false)
            setError(true)
          }, 1000);
        }
      })
    console.log(document.querySelector('.loader-container'))
  }, [])

  // useEffect(()=>
  // {
  //   fullaxios({ url: 'userinfo/status' })
  //   //   .get(`faq/question?page=`+ page)
  //   .then((res) => {
  //     //res.data.admin)
  //     setIsadmin(res.data.admin)

  //   })
  //   .catch(err => {
  //     //err)
  //   }) 
  // })


  return (
    <Router>
        <div className="App ">
        {!preLoading && error && <UndefinedError /> }
        {!preLoading && !error && <>
        <img className='w-[100vw] fixed z-[0] opacity-[30%]' src={BgImg1} alt=''/>
        <img className='w-[100vw] fixed z-[0] opacity-[25%]' src={BgImg2} alt=''/>
        <img className='w-[100vw] fixed z-[0] opacity-[15%]' src={BgImg3} alt=''/>


        <Navbar  namechanged={namechanged} isauthenticated = {isauthenticated} setIsadmin={setIsadmin} setIsauthenticated = {setIsauthenticated} setIsopen={setIsopen} isopen={isopen} igotdata={igotdata} setIgotdata={setIgotdata} profiledata={profiledata} setProfiledata={setProfiledata} />
        <div className="berger hidden w-full md:flex items-center justify-between md:fixed top-0  p-2 z-[5] bg-gray-400 opacity-80" >
          {/* <img className='h-10' src={logo} alt=""/> */}
          <Link to='/'><p className='text-lg'>TravDays</p></Link>
          <svg xmlns="http://www.w3.org/2000/svg" id='show-menu-btn' className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={showMenu}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" id='hide-menu-btn' className="h-8 w-8 hidden  " fill="none" viewBox="0 0 24 24" stroke="black" onClick={hideMenu}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>

        </div>
        <MobileMenu  isauthenticated = {isauthenticated} setIsadmin={setIsadmin} setIsauthenticated = {setIsauthenticated}  />
        <div className="content pt-[60px] sm:pt-[48px] flex justify-center ">
          <Switch>

            <Route exact path="/"> <Home isadmin={isadmin} setIsadmin={setIsadmin}  isopen={isopen} setIsopen={setIsopen} /> </Route>

            <Route exact path="/blogs"> <Blogs /> </Route>

            <Route exact path="/gallery"> <Gallery /> </Route>

            <Route exact path="/login"> { isauthenticated ? <Home isadmin={isadmin} setIsadmin={setIsadmin}/> : <Login setIsauthenticated={setIsauthenticated} isopen={isopen} setIsopen={setIsopen}/> }</Route>

            <Route exact path="/contactus"> <ContactUs isauthenticated = {isauthenticated}  setIsopen={setIsopen} isopen={isopen} /> </Route>

            <Route exact path="/trip/:name"> <Trip isadmin={isadmin} isAuth={isauthenticated} /> </Route>

            <Route exact path="/trips/:type"> <AllTrips /> </Route>

            <Route exact path="/trips"> <PackagesPage /> </Route>

            <Route exact path="/faq"> <FAQ isadmin={isadmin} /> </Route>

            <Route exact path="/blogs/:title/:id"> <IndivisualBlogPage isadmin={isadmin} isauthenticated={isauthenticated} /> </Route>

            <Route exact path="/logout"> { isauthenticated? <Logout />  : <NotLoggedIn /> }</Route>

            <Route exact path="/changename"> { isauthenticated? <Profilepage setNamechanged={setNamechanged} />  : <NotLoggedIn /> }</Route>

            <Route exact path="/blogs/write"> { isauthenticated? <WriteABlog />  : <NotLoggedIn /> } </Route>

            <Route exact path="/myblogs/editblogs"> { isauthenticated? <EditBlogsPage />  : <NotLoggedIn /> } </Route>

            <Route exact path="/myblogs">{ isauthenticated?  <MyBlogs /> : <NotLoggedIn /> } </Route>

            <Route exact path="/resetpassword"> <ResetPassword /> </Route>

            <Route exact path="/bookings"> { isauthenticated? <BookingHistory />   : <NotLoggedIn /> }</Route>

            <Route exact path='/tnc'> <TnC/> </Route>

            <Route exact path='/aboutus'> <AboutUs/> </Route>

            <Route exact path='/privacypolicy'> <Privacy/> </Route>

            {(isadmin === true) &&
            <>
            <Switch>
            
            <Route exact path="/adminOnly"> <MainAdmin /> </Route>

            <Route exact path="/addtrips"> <Addtrips /> </Route>
              
            <Route exact path="/tripedit/:name/:id"> <Edittrips /> </Route>
              
            <Route exact path="/approveblogs"> <ApproveBlogs /> </Route>
              
            <Route exact path="/addtestimonials"> <Addtestimonials /> </Route>
              
            <Route exact path="/admcontactus"> <AdmContactUs /> </Route>
              
            <Route exact path="/admfaq"> <AdmFaq /> </Route>
              
            <Route exact path="/admbooking"> <AdmBooking /> </Route>

            <Route path = "*"> < NotFound /> </Route>
            
            </Switch>
            </>
            }      
            <Route path> < NotFound /> </Route>
          </Switch>
          {/* ADMINS ONLY */}
          {/* {Onlyadmin()} */}
        </div>
        </>}
      </div>
    </Router>
  );
}

export default App;