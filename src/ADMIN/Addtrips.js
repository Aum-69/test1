
import { useEffect, useRef, useState } from "react";
import fullaxios from "../components/FullAxios";


const Addtrips = () => {
   
    const [newimages, setNewimages ] = useState([]);
    const [imagepreview, setImagepreview] = useState([])
    const [tripname, setTripname] = useState(null)
    const [price, setPrice] = useState()
    const [location, setLocation] = useState(null)
    const [descripition, setDescripition] = useState(null)
    const [triptype, setTriptype] = useState(null)
    const [durationdays, setDurationdays] = useState(null)
    const [duration, setDuration] = useState(null)
    const [durationnights, setDurationnights] = useState(null)
     
    const [error,setError] = useState([]);
    const [datas, setDatas] = useState([]);
    const [vdatas, setVdatas] = useState([]);
    const [videopreview, setVideopreview] = useState([])
    var [type, setType] = useState(null)

    useEffect(() => {
        if(durationnights && durationdays)
        setDuration(`${durationdays},${durationnights}`)
        console.log("it should set")
    
    },[durationnights,durationdays])

    useEffect(() => {
        console.log(duration)
        console.log("duration")
       
    },[duration])

    useEffect(() => {
        console.log(duration)
        console.log("duration")
       
    },[price,tripname])

    const Imagechangehandler = (e) => {
        console.log(e.target.files)
        // console.log(e.target.files.length )
        for (let i= 0 ; i < e.target.files.length ; i++ ){
            // console.log("rubbish")
         }
 
        const fileArray = Array.from(e.target.files).map((file,index)=>({  
                     "type": file.type, 
                     "media" :URL.createObjectURL(file),
                    //   "videos" : URL.createObjectURL(file)
        }) )
        // console.log("has it changed",e.target.value)
        // setDatas(Array.from(e.target.files).map((file)=>URL.revokeObjectURL(file)))
        console.log(fileArray)
        setImagepreview((prevVideos)=>prevVideos.concat(fileArray))
        setDatas(prev=>[...prev,...Array.from(e.target.files).map((file)=>file)])
    }
 
  
    
useEffect(() => {
console.log(datas)
console.log(imagepreview)
console.log(imagepreview.slice(2,3)) 
console.log([...imagepreview.slice(0,1),...imagepreview.slice(2,)])
}, [datas,imagepreview])


const test = (n) => {

    // console.log(document.getElementById("1").innerHTML)
    // document.getElementById("1").innerHTML= null
    setImagepreview(prev=>[...prev.slice(0,n),...prev.slice(n+1,)])
    setDatas(prev=>[...prev.slice(0,n),...prev.slice(n+1,)])
    console.log(imagepreview)

}
  

     
    const Submit = (e) => {
        e.preventDefault();
      
        let formData = new FormData();
        console.log(datas[0])
        let m=0
        let n=0
        for (let i= 0;  i < datas.length ; i++ ){
            console.log("rubbish")
            console.log(datas[i])
        
            if(datas[i].type.slice(0,5) === "image" ){
                console.log("image gang")
              formData.append(`image${m}`, datas[i])
              m++
            }
             else if (datas[i].type.slice(0,5) === "video" ){
                 
                 formData.append(`video${n}`, datas[i])
                 n++
             }
                console.log(datas[i].type)
         }

    

        formData.append(`type`,d.value)
        formData.append(`name`,tripname)
        formData.append(`location`,location)
        formData.append(`description`,descripition)
        formData.append(`price`,price)
        formData.append(`duration`,duration)
        
       
        console.log(...formData)
       
        fullaxios({ url: 'trip/create/' , type:'post', data : formData , formdata : true   })
        .then((res)=>{
        console.log("res", res.data)
        // console.log('info data received')
        console.log("done")}
            
        )
        .catch(err => {
            console.log(err)
    
    })
 
  }
  var d = document.getElementById("selected");

    return ( 
        <div className="">
            <div >
            <input type="file" multiple style={{display:'none'}} name ="file" id="file" onChange={Imagechangehandler}   />
                                    <label htmlFor="file">
                                        <i className="materail-icon">ADD IMAGE</i>
                                    </label>
                                    
            
                        <div className="row">  
                      
                        {/* <button className='edit-btn'onClick = {onClickFocus}>Change image</button> */}
                     
                        <form className='flex flex-col mx-auto max-w-[1000px] lg:shadow-xl rounded-lg lg:p-8 mt-[5%] '   action="">
                            <span className='text-4xl sm:text-xl font-bold sm:p-2 inline-block '>Add trips</span>
                            <p className=''> 
                                    {imagepreview &&  imagepreview.map((data,i)=>{
                                        console.log(data.type)
                                        console.log(data.image)
                                      if( data.type.slice(0,5) === 'image' ) { 
                                          return(
                                            <div className="Acontainer">
                                            <img className="imageee"  src={data.media} alt=""  /> 
                                            <div onClick={()=>{test(i)}} className="Amiddle">
                                            <div className="Atext">Delete</div>
                                            </div> 
                                      </div>
                                        )
                                      }
                                      else if (data.type.slice(0,5) === "video"){
                                        return(
                                            <div className="Acontainer">
                                            <video className="imageee"  controls src={data.media }alt="" />
                                               <div onClick={()=>{test(i)}} className="Amiddle">
                                                   <div className="Atext">Delete</div>
                                                   </div> 
                                         </div>
                                            )
                                      }
                                    })
                                     }
                                </p>
                                <div className='sm:pb-4'> 
                                     <div className="">
                                    <p className='flex items-center'>
                                    <span className='w-52'>Enter Trip name :</span>
                                    <input required type="text" placeholder ="Tripname" onChange={(e) => setTripname(e.target.value) } />
                                    </p>
                                    <p className='flex items-center'>
                                    <span className='w-52'>Enter Location name :</span>
                                    <input required type="text" placeholder ="Location" onChange={(e) => setLocation(e.target.value) } />
                                    </p>
                                    
                                    <div className='flex items-center'>
                                    <span className='w-52'>Enter Trip duration :</span> 
                                    <p>days :</p>
                                    <input  required type="number" placeholder = "no of days" id="name" onChange={(e) => setDurationdays(e.target.value) } />
                                    <p>nights :</p>
                                    <input  required type="number" placeholder = "no of nights" id="name" onChange={(e) => setDurationnights(e.target.value) } />

                                
                                                
                                        </div>    
                                    <p className='flex items-center'>
                                    </p>
                                </div>
                                
                                    <p className='flex items-center sm:relative'>
                                    <span className='w-52'>Enter Trip price....................: Rs</span>
                                    <input required type="number" placeholder = "Price"  onChange={(e) => setPrice(e.target.value)} />
                                    {/* {displayalert && <p className=' sm:absolute sm:bottom-0 sm:right-0 sm:px-0 px-2 text-sm text-red-500'>number must contain 10 digits</p>} */}
                                    </p>
                                    </div>
                                
                                    
                            <div className='flex'>
                            <p>Select Trip type : </p>
                        
                                <select  name="val" id="selected">
                                <option> solo </option>   
                                <option> petfriendly </option>   
                                <option> workation </option>   
                                </select>          
                         </div>    
                                        
                          
                            <textarea required placeHolder = "Trip description..." name="" id="" cols="70" rows="6" onChange={(e) => setDescripition(e.target.value) }></textarea>
                            <button className=' sm:mx-auto p-2 w-40 bg-blue-500 font-semibold rounded-lg' type="submit" onClick={Submit} >submit</button>
                            
                            

            </form>                       
                        </div>
                         </div>
        </div>
     );
}

export default Addtrips;