
import { useEffect, useRef, useState } from "react";
import fullaxios from "../components/FullAxios";
import { useHistory } from "react-router-dom";



const Addtrips = () => {

    const [newimages, setNewimages] = useState([]);
    const [imagepreview, setImagepreview] = useState([])
    const [tripname, setTripname] = useState(null)
    const [price, setPrice] = useState()
    const [location, setLocation] = useState(null)
    const [descripition, setDescripition] = useState(null)
    const [triptype, setTriptype] = useState(null)
    const [durationdays, setDurationdays] = useState(null)
    const [duration, setDuration] = useState(null)
    const [durationnights, setDurationnights] = useState(null)
    const [nOmedia, setNOmedia] = useState(true)
    const history = useHistory()
     
    const [error,setError] = useState([]);
    const [datas, setDatas] = useState([]);
    const [vdatas, setVdatas] = useState([]);
    const [videopreview, setVideopreview] = useState([])
    var [type, setType] = useState(null)

    useEffect(() => {
        if (durationnights && durationdays)
            setDuration(`${durationdays},${durationnights}`)
        //"it should set")

    }, [durationnights, durationdays])

    useEffect(() => {
        //duration)
        //"duration")

    }, [duration])

    useEffect(() => {
        //duration)
        //"duration")

    }, [price, tripname])

    const Imagechangehandler = (e) => {
        //e.target.files)
        if (e.target.files.length === 0) {
            //"zerooooooo")
        }
        if (e.target.files.length >= 0) {
            //"not zeroooo")
        }
        // //e.target.files.length )
        for (let i = 0; i < e.target.files.length; i++) {
            // //"rubbish")
        }

        const fileArray = Array.from(e.target.files).map((file, index) => ({
            "type": file.type,
            "media": URL.createObjectURL(file),
            //   "videos" : URL.createObjectURL(file)
        }))
        // //"has it changed",e.target.value)
        // setDatas(Array.from(e.target.files).map((file)=>URL.revokeObjectURL(file)))
        //fileArray)
        setImagepreview((prevVideos) => prevVideos.concat(fileArray))
        setDatas(prev => [...prev, ...Array.from(e.target.files).map((file) => file)])
    }



    useEffect(() => {
        //datas)
        if (imagepreview.length === 0) {
            setNOmedia(true)
        }
        else {
            setNOmedia(false)
        }
        //imagepreview)
        //imagepreview.slice(2, 3))
        //[...imagepreview.slice(0, 1), ...imagepreview.slice(2,)])
    }, [datas, imagepreview])



    useEffect(() => {
        //datas)
        if (imagepreview.length === 0) {
            setNOmedia(true)
        }
        else {
            setNOmedia(false)
        }
        //imagepreview)
        //imagepreview.slice(2, 3))
        //[...imagepreview.slice(0, 1), ...imagepreview.slice(2,)])
    }, [datas, imagepreview])



    useEffect(() => {
        //datas)
        //imagepreview)
        //imagepreview.slice(2, 3))
        //[...imagepreview.slice(0, 1), ...imagepreview.slice(2,)])
    }, [datas, imagepreview])


    const test = (n) => {

        // //document.getElementById("1").innerHTML)
        // document.getElementById("1").innerHTML= null
        setImagepreview(prev => [...prev.slice(0, n), ...prev.slice(n + 1,)])
        setDatas(prev => [...prev.slice(0, n), ...prev.slice(n + 1,)])
        //imagepreview)

    }



    const Submit = (e) => {
        e.preventDefault();
        if (nOmedia === true) {
            alert("pls select some media for the trip")
        }
        else {
            let formData = new FormData();
            //datas[0])
            let m = 0
            let n = 0
            for (let i = 0; i < datas.length; i++) {
                //"rubbish")
                //datas[i])

                if (datas[i].type.slice(0, 5) === "image") {
                    //"image gang")
                    formData.append(`image${m}`, datas[i])
                    m++
                }
                else if (datas[i].type.slice(0, 5) === "video") {

                    formData.append(`video${n}`, datas[i])
                    n++
                }
                //datas[i].type)
            }



            formData.append(`type`, d.value)
            formData.append(`name`, tripname)
            formData.append(`location`, location)
            formData.append(`description`, descripition)
            formData.append(`price`, price)
            formData.append(`duration`, duration)


            //...formData)

            fullaxios({ url: 'trip/create/', type: 'post', data: formData, formdata: true })
                .then((res) => {
                    console.log("res", res.data)
                    alert("trip added")
                    history.push("/packagespage")
                    console.log("done")
                }

                )
                .catch(err => {
                    //err)

                })
        }
    }
    var d = document.getElementById("selected");

    return (
        <div className="section">





            {/* <button className='edit-btn'onClick = {onClickFocus}>Change image</button> */}

            <form className='flex flex-col mx-auto max-w-[1000px] rounded-lg lg:p-8 mt-[5%] p-box-shadow-2 ' onSubmit={Submit} action="">
                <span className='text-4xl sm:text-xl font-bold sm:p-2 inline-block '>Add trips</span>
                <p className=''>
                    {imagepreview && imagepreview.map((data, i) => {
                        //data.type)
                        //data.image)
                        if (data.type.slice(0, 5) === 'image') {
                            return (
                                <div className="Acontainer">
                                    <img className="imageee" src={data.media} alt="" />
                                    <div onClick={() => { test(i) }} className="Amiddle">
                                        <div className="Atext">Delete</div>
                                    </div>
                                </div>
                            )
                        }
                        else if (data.type.slice(0, 5) === "video") {
                            return (
                                <div className="Acontainer">
                                    <video controlsList="nodownload" className="imageee" controls src={data.media} alt="" />
                                    <div onClick={() => { test(i) }} className="Amiddle">
                                        <div className="Atext">Delete</div>
                                    </div>
                                </div>
                            )
                        }
                    })
                    }
                </p>
                <div className='sm:pb-4'>
                    <p className='flex items-center'>
                        <span className='w-52'>Enter Trip name :</span>
                        <input required type="text" placeholder="Tripname" onChange={(e) => setTripname(e.target.value)} />
                    </p>
                    <p className='flex items-center'>
                        <span className='w-52'>Enter Location name :</span>
                        <input required type="text" placeholder="Location" onChange={(e) => setLocation(e.target.value)} />
                    </p>

                    <div className='flex items-center'>
                        <span className='w-52'>Enter Trip duration :</span>
                        <div  className="flex flex-col mr-2">days :<input required className="m-0 " required type="number" placeholder="no of days" id="name" onChange={(e) => setDurationdays(e.target.value)} /></div>
                        <div className="flex flex-col ml-2">nights :<input required className="m-0" required type="number" placeholder="no of nights" id="name" onChange={(e) => setDurationnights(e.target.value)} /></div>
                    </div>
                    <p className='flex items-center'>
                    </p>

                    <p className='flex items-center sm:relative'>
                        <span className='w-52'>Enter Trip price</span>
                        <div className="flex flex-col mr-2" >???<input className="m-0" required type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} /></div>
                        {/* {displayalert && <p className=' sm:absolute sm:bottom-0 sm:right-0 sm:px-0 px-2 text-sm text-red-500'>number must contain 10 digits</p>} */}
                    </p>
                    <p className="flex items-center h-[76px]">
                        <span className="w-52">Select Trip type : </span>
                        <select className="bg-[#e1e1e1] rounded-md" name="val" id="selected">
                            <option> solo </option>
                            <option> pet friendly </option>
                            <option> workation </option>
                        </select>
                    </p>
                    <span className="">
                        <input type="file" multiple style={{ display: 'none' }} name="file" id="file" onChange={Imagechangehandler} />
                        <label htmlFor="file">
                        <p type="none" className=" sm:mx-auto m-2 p-2 w-40 bg-blue-500 font-semibold rounded-lg hover:bg-blue-700 text-white font-bold">add image</p>
                        </label>
                    </span>
                </div>

                <textarea required placeHolder="Trip description..." name="" id="" cols="70" rows="6" onChange={(e) => setDescripition(e.target.value)}></textarea>
                <button className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg hover:bg-blue-700 text-white font-bold' type="submit" >submit</button>



            </form>


        </div>
    );
}

export default Addtrips;