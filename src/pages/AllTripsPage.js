import axios from "axios";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useParams, useHistory } from "react-router";
import fullaxios from "../components/FullAxios";
import stars from './images/stars.png'
import NotFound from "./NotFound";
import UndefinedError from "../components/FetchErrorHandling/UndefinedError";
import Loading from "../components/Loading";
import { useLocation } from 'react-router-dom'

const AllTrips = () => {

  const { type } = useParams();
  var object = useMemo(() => { return { "type": type } }, [type])
  // console.log("object")
  // var object = {"type":type};
  const [globalUrl, setGlobalUrl] = useState('');
  const [datas, setDatas] = useState([]);
  const [page, setPage] = useState(1);
  const [fetch, setFetch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [location, setLocation] = useState('');
  const prevDatas = useRef([])
  const [aumSearchtext, setAumSearchtext] = useState(null)
  const history = useHistory();
  const [displaysearchresults, setDisplaysearchresults] = useState(false)
  const [searchtext, setSearchtext] = useState(null)
  const observer = useRef()
  const [paginationLoading, setPaginationLoading] = useState(false)


  const [error, setError] = useState(false)
  const [realLoading, setRealLoading] = useState(true)
  const [sorted, setSorted] = useState();

  useEffect(() => {
    setDatas([])
    setPage(1)
    setLoading(true)
    setLoading1()
    setHasMore(true)
    setGlobalUrl('')
  }, [type])
  // console.log(object)

  const priceAscending = () => {
    if ("sort" in object) object["sort"] = "price"
    if (!("sort" in object)) object = Object.assign(object, { sort: "price" });
    setHasMore(true)
    setPage(1)
    setDatas([])
    setSorted(1)
    if (fetch === true) setFetch(false)
    else if (fetch === false) setFetch(true)
  }
  const priceDescending = () => {
    if ("sort" in object) object["sort"] = "-price";
    if (!("sort" in object)) object = Object.assign(object, { sort: "-price" });
    setHasMore(true)
    setPage(1)
    setDatas([])
    setSorted(2)
    console.log(page)
    console.log(datas)
    console.log(hasMore)
    if (fetch === true) setFetch(false)
    else if (fetch === false) setFetch(true)
  }

  const lastDataElementRef = useCallback(node => {
    // console.log('last element')
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  // useEffect(() => {
  // setLoading1(true)

  //   }, [searchtext])

  useEffect(() => {
    // console.log("i was here")
    // setLoading1(true)
    setPaginationLoading(true)
    if (searchtext === "" || searchtext === null) {
      fullaxios({ url: 'trip/universal/' + JSON.stringify(object) + '?page=' + page })
        .then(res => {
          if (res) {
            setDatas(prev => [...prev, ...res.data])
            console.log(res.data)
            // console.log(object)
            prevDatas.current = datas
            setLoading1(false)
            setLoading(false)
            setRealLoading(false)
            setPaginationLoading(false)
          }
        }
        )
        .catch(err => {
          if (err.response) {
            if (err.response.data.detail === "Invalid page.") {
              // console.log("sethasmore")
              setHasMore(false);
            }
            else if (typeof (err.response) === "undefined") {
              // console.log("this should work goddamit")
              setError(true)
            }
            // setError(true)
            setRealLoading(false)
            setPaginationLoading(false)

          }
        })
    }
    else if (searchtext) {
      console.log("worked till here", searchtext)
      fullaxios({ url: `search/trip/${searchtext}/${type}` + '?page=' + page })
        .then(res => {
          if (res) {
            setDatas(prev => [...prev, ...res.data])
            console.log(res.data)
            // console.log(object)
            prevDatas.current = datas
            setLoading1(false)
            setRealLoading(false)
            setPaginationLoading(false)
            // setLoading(false)
          }
        })
        .catch(err => {
          if (err.response) {
            if (err.response.data.detail === "Invalid page.") {
              setHasMore(false);
            }
            if (typeof (err.response) === "undefined") {
              // console.log("this should work goddamit")
              setError(true)
            }
            // setError(true)
            setRealLoading(false)
            setPaginationLoading(false)
            // setLoading(false)
            // console.log(err)
          }
        })
    }
    // setLoading(false);
  }, [page, fetch, object])
  // _____________________________________________________________________________________________________________________________________
  // const [hoverdatas, setHoveratas] = useState([]);
  // const [hoverpage, setHoverpage] = useState(0);
  // const [hoverloading, setHoverloading] = useState(true);
  // const [hoverhasMore, setHoverhasMore] = useState(true);
  // const hoverprevDatas = useRef([])
  // const hoverobserver = useRef()
  // const MouseOver = (name) => {
  // event.target.style.background = 'red';
  // setHoverloading(true)
  // setHoverhasMore(true)
  // setGlobalUrl(name)
  // setHoverpage(1)
  // axios
  //   .get(`http://127.0.0.1:8000/trip/media/` + name + `?page=` + hoverpage)
  //   .then(res => {
  //     setHoveratas(prev => [...prev, ...res.data])
  //     console.log(res.data)
  //     hoverprevDatas.current = hoverdatas
  //   })
  //   .catch(err => {
  //     // if (err.response.data.detail === "Invalid page.") {
  //     //   setHoverhasMore(false);
  //     // }
  //     console.log(err)
  //   })
  //   setHoverloading(false);
  // }


  // function MouseOut(event) {
  //   event.target.style.background = "";

  // }
  // const lastDataElementRef2 = useCallback(node => {
  //   console.log('last element')
  //   if (hoverloading) return
  //   if (hoverobserver.current) hoverobserver.current.disconnect()
  //   hoverobserver.current = new IntersectionObserver(entries => {
  //     if (entries[0].isIntersecting && hoverhasMore) {
  //       setHoverpage(prev => prev + 1)
  //     }
  //   })
  //   if (node) hoverobserver.current.observe(node)
  // }, [hoverloading, hoverhasMore])

  // useEffect(() => {
  //   console.log(globalUrl)
  //   fullaxios({ url: 'trip/media/asdf' + globalUrl + '?page=' + hoverpage })
  //     .then(res => {
  //       console.log("nothing makes sense anymore")
  //       if (res) {
  //         setHoveratas(prev => [...prev, ...res.data])
  //         console.log("let's go", res.data)
  //         setRealLoading(false)
  //       }
  //     })
  //     .catch(err => {
  //       console.log("this should work goddamit")
  //       console.log(err)
  //       if (err.response) {
  //         if (err.response.data.detail === "Invalid page.") {
  //           setHoverhasMore(false);
  //         }
  //       }
  //       console.log("this should work goddamit")
  //       if (typeof (err.response) === "undefined") {
  //         console.log("this should work goddamit")
  //         setError(false)
  //       }
  //       setRealLoading(false)
  //     })
  //   setHoverloading(false);
  // }, [hoverpage])

  const fetchSearchedDataFromBackend = (searchtexts) => {
    console.log("this works everytime")
    console.log("searchtexts", "this")
    setSearchtext(searchtexts)
    setAumSearchtext(searchtext)
    setHasMore(true)
    setDatas([])
    setPage(1)
    setLoading1(true)
    if (fetch === true) setFetch(false)
    else if (fetch === false) setFetch(true)
    console.log("still alive")
  }



  var percentage = "";
  var allstars = {};
  function calculation(data) {
    // var star = "url(#full)";
    for (let i = 1; i < 6; i++) {
      // console.log(data.ratings)
      var ratings = parseFloat(data.ratings)
      if (ratings >= i) {
        allstars = Object.assign(allstars, { [i]: "url(#full)" })
      }
      // else if(ratings < i && ratings != i){
      //   allstars = Object.assign(allstars, {[i]:"url(#partial)"})
      // }
      else if (ratings < i && ratings > (i - 1)) {
        percentage = ((parseFloat(ratings) - i + 1) * 100)
        // console.log(ratings)
        // console.log(percentage)
        percentage = percentage.toFixed()
        // console.log(percentage)
        percentage = percentage.toString() + "%"
        // console.log(percentage)
        // percentage = "30%"
        allstars = Object.assign(allstars, { [i]: "url(#partial)" })
      }
      else {
        allstars = Object.assign(allstars, { [i]: "url(#empty)" })
      }
      // console.log(allstars)
      // console.log(percentage)
      // allstars[1] = "url(#full)"
      // allstars[2] = "url(#partial)"
    }
  }

  useEffect(() => {
    // console.log("searchtext",searchtext)
    // console.log("searchtext",typeof searchtext)
  }, [searchtext])




  const ShowData = (data, index) => {

    return (
      <>
        <div onClick={() => { history.push('/trip/' + data.name) }} id={`template${index}`} className=" md:text-white md:relative flex md:flex-col rounded-[20px] overflow-hidden trip-card aumnormalblog2 cursor-pointer">
          <div className='md:relative w-[300px] md:w-full h-[300px] md:h-[300px] flex justify-center md:p-0 p-2 z-[0]'>
            <div className='md:flex md:w-full md:h-1/4 bg-gradient-to-b from-[#00000088] to-[#00000000] absolute top-0 hidden z-[-1]'></div>
            <div className='md:flex md:w-full md:h-1/2 bg-gradient-to-t from-[#00000088] to-[#00000000] absolute bottom-0 hidden z-[-1]'></div>
            {/* {console.log(data.displayImage)}  */}
            {data.displayImage && <img src={data.displayImage} onClick={() => { history.push('/trip/' + data.name) }} alt="" className="z-[-2] w-full h-full object-cover rounded-[20px]" />}
          </div>
          <div className='md:absolute md:h-full p-4 md:p-2 w-full'>
            <p className='flex justify-between items-center'>
              {data.name && <p className='text-xl font-bold cursor-pointer '>{data.name}</p>}
              {/* {data.type[0] = data.type[0].toUpperCase()} */}
              {/* {data.type && <p className='text-sm'>{data.type}</p>} */}
              {data.location && <p className='font-semibold mx-2'>{data.location}</p>}

            </p>

            <p className='md:absolute md:bottom-[35px] md:py-0 flex items-center py-4'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 md:h-4 w-6 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className='pl-2 md:pl-2'>{data.duration}</span>
            </p>

            {data.ratings === "No Ratings" && <p className='md:absolute md:bottom-[60px] md:py-0 flex items-center py-4' >{data.ratings}</p>}
            {data.ratings !== "No Ratings" &&
              <p className='md:absolute md:bottom-[60px] md:py-0 flex items-center py-4' >
                {/* <span className='pr-4 md:pr-2' >{data.ratings}</span> */}
                {/* <span className=' h-6 sm:h-4 overflow-hidden relative' >
          <div className=' h-full bg-[#f5e63b] absolute z-[-1]' style={{width:data.ratings*24}}></div>
          <img className='w-full h-full' src={stars} alt=""/>
          </span> */}
                <div className="stars flex" >
                  {calculation(data)}
                  <svg width="0" height="0" viewBox="0 0 20 20">
                    <defs>
                      <linearGradient id="full" x1="0" x2="100%" y1="0" y2="0">
                        <stop offset="0" stop-color="#F3C117"></stop>
                        <stop offset="100%" stop-color="#F3C117"></stop>
                        <stop offset="36%" stop-color="#E8E8E8"></stop>
                        <stop offset="1" stop-color="#E8E8E8"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                  <svg width="0" height="0" viewBox="0 0 20 20">
                    <defs>
                      <linearGradient id="partial" x1="0" x2="100%" y1="0" y2="0">
                        <stop offset="0" stop-color="#F3C117"></stop>
                        {/* {console.log(percentage)} */}
                        <stop offset={percentage} stop-color="#F3C117"></stop>
                        <stop offset={percentage} stop-color="#E8E8E8"></stop>
                        <stop offset="1" stop-color="#E8E8E8"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                  <svg width="0" height="0" viewBox="0 0 20 20">
                    <defs>
                      <linearGradient id="empty" x1="0" x2="100%" y1="0" y2="0">
                        <stop offset="0" stop-color="#F3C117"></stop>
                        <stop offset="0" stop-color="#F3C117"></stop>
                        <stop offset="0" stop-color="#E8E8E8"></stop>
                        <stop offset="0" stop-color="#E8E8E8"></stop>
                      </linearGradient>
                    </defs>
                  </svg>

                  <svg width="25" height="25" className="md:hidden" viewBox="0 0 20 20">
                    <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={allstars[1]} />
                  </svg>
                  {/* </path> */}
                  <svg width="25" height="25" className="md:hidden" viewBox="0 0 20 20">
                    <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={allstars[2]} />
                  </svg>
                  <svg width="25" height="25" className="md:hidden" viewBox="0 0 20 20">
                    <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={allstars[3]} />
                  </svg>
                  <svg width="25" height="25" className="md:hidden" viewBox="0 0 20 20">
                    <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={allstars[4]} />
                  </svg>
                  <svg width="25" height="25" className="md:hidden" viewBox="0 0 20 20">
                    <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={allstars[5]} />
                  </svg>


                  <svg width="15" height="15" className="hidden md:block" viewBox="0 0 20 20">
                    <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={allstars[1]} />
                  </svg>
                  {/* </path> */}
                  <svg width="15" height="15" className="hidden md:block" viewBox="0 0 20 20">
                    <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={allstars[2]} />
                  </svg>
                  <svg width="15" height="15" className="hidden md:block" viewBox="0 0 20 20">
                    <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={allstars[3]} />
                  </svg>
                  <svg width="15" height="15" className="hidden md:block" viewBox="0 0 20 20">
                    <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={allstars[4]} />
                  </svg>
                  <svg width="15" height="15" className="hidden md:block" viewBox="0 0 20 20">
                    <path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z" fill={allstars[5]} />
                  </svg>

                </div>
                <span className='px-4 text-sm'>({data.ratingsCount})</span>
              </p>}

            {/* <p className='md:hidden text-lg font-semibold'>Short Description</p>
            <p className='md:hidden leading-tight'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur non aliquam itaque omnis repellendus, dignissimos voluptate fuga, provident libero in praesentium porro consequuntur odit ex ipsa magnam tenetur nostrum. Ipsa!</p> */}
            <p className='md:hidden leading-tight'>{data.description}</p>
            {/* {data.ratingsCount && <p >{data.ratingsCount}</p>} */}
            {data.price && <p className='font-semibold absolute bottom-4 right-5'>???{data.price}</p>}
          </div>






        </div>
      </>
    );
  }


  return (
  <>
    {realLoading && <Loading />}
    {!realLoading && error && <UndefinedError />}
    {/* {realLoading &&  } */}
    {!realLoading && !error &&
      // <div className='section relative flex flex-col  items-center pt-6'>
      <div className='section'> 
        {/* //the trips class  consists of all the grid logic */}
        {/* <svg xmlns="http://www.w3.org/2000/svg" className="z-[5] h-16 w-16 fixed bottom-16 right-16 md:right-4 hidden sm:block " viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
      </svg> */}
      <div className="flex justify-center" style={{ backgroundColor: 'transparent'}}>
        <div id='searchbar' className="top-[60px] sm:top-[48px] md:top-[48px] z-[4]  rounded-[20px]  flex w-[800px] sm:w-full md:w-full justify-center items-center">
          <input type="text" className="w-1/2 mx-2 sm:w-full" placeholder=" Search...." onChange={(e) => { setSearchtext(e.target.value); }} onKeyDown={(e) => { if (e.key === "Enter") { fetchSearchedDataFromBackend(e.target.value) } }} />
          <button className=' sm:mx-auto p-2 w-20 bg-blue-500 font-semibold rounded-lg  hover:bg-blue-700 text-white font-bold  ' onClick={() => { if (searchtext !== null) fetchSearchedDataFromBackend(searchtext) }}> Search </button>
          <div className="flex right-0">
            <button className="flex m-2 pricehover" onClick={priceAscending} type="button">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
              </svg>
              <span className="sm:hidden">Price</span></button>
            <button className="flex m-2 pricehover" onClick={priceDescending} type="button">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              <span className="sm:hidden">Price</span></button>
          </div>
          {/* godly method to lose and gain focus */}
          {/* onFocus = {() =>setDisplaysearchresults(true)} onBlur = {() => setDisplaysearchresults(false)} */}

          {/* {displaysearchresults && (
                <div className="search-results-container">
                    <div className = 'w-[500px]'></div>
                    <div className="search-results">
                        <h1>it's working af</h1>
                    </div>
                </div>
            )} */}


        </div>
      </div>


        <div className="trips mr-2">

        {datas && datas.map((data, index) => {
          if (datas.length === index + 1) {
            return (
              <div ref={lastDataElementRef} className="m-1 flex justify-center xl:w-[1033px] lg:w-[781px] bg-[#f5f5f7] " key={data.id}>
                {ShowData(data, index)}
              </div>
            );
          } else {
            return (
              <div className="m-1 flex justify-center xl:w-[1033px] lg:w-[781px] bg-[#f5f5f7] " key={data.id}>
                {ShowData(data, index)}
              </div>
            );
          }
        })}
        {paginationLoading && <div className="p-4 m-auto">
          <div className="m-auto" data-visualcompletion="loading-state" style={{ height: '32px', width: '32px' }}>
            <svg aria-label="Loading..." className="pagination-loading" viewBox="0 0 100 100"><rect fill="#555555" height={6} opacity={0} rx={3} ry={3} transform="rotate(-90 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.08333333333333333" rx={3} ry={3} transform="rotate(-60 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.16666666666666666" rx={3} ry={3} transform="rotate(-30 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.25" rx={3} ry={3} transform="rotate(0 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.3333333333333333" rx={3} ry={3} transform="rotate(30 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.4166666666666667" rx={3} ry={3} transform="rotate(60 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.5" rx={3} ry={3} transform="rotate(90 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.5833333333333334" rx={3} ry={3} transform="rotate(120 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.6666666666666666" rx={3} ry={3} transform="rotate(150 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.75" rx={3} ry={3} transform="rotate(180 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.8333333333333334" rx={3} ry={3} transform="rotate(210 50 50)" width={25} x={72} y={47} /><rect fill="#555555" height={6} opacity="0.9166666666666666" rx={3} ry={3} transform="rotate(240 50 50)" width={25} x={72} y={47} />
            </svg>
          </div>
        </div>}
        </div>
        {/* {!paginationLoading && !hasMore && 
            <div className="m-auto">
              <p className="text-center">Woah! You have reached the end</p>
            </div> } */}
      </div>}
  </>);
}

export default AllTrips;