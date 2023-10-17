import * as mobilenet from '@tensorflow-models/mobilenet'
import {useRef} from 'react'
const Model=()=>{
const [model,setModel]=useState(null);
const [isModelLoading,setIsModelLoading]=useState(false);
const [imageURL, setImageURL] = useState(null);
    const [results, setResults] = useState([])

  const imageRef = useRef()
    const fileInputRef = useRef()
const loadModel=async()=>{
    setIsModelLoading(true);
    try{
    const model=await mobilenet.load()
    setModel(model)
    setIsModelLoading(false);
    }
    catch(error){
    console.log(error);
    setIsModelLoading(false);
    }
}
useEffect(()=>{
    loadModel()
},[])
useEffect(()=>{
    if(isModelLoading){
        return <h2 className='modelLoader'>Model is Loading...</h2>
    }
})
const identify = async () => {
    textInputRef.current.value = ''
    const results = await model.classify(imageRef.current)
    setResults(results)
}
const handleOnChange = (e) => {
    setImageURL(e.target.value)
    setResults([])
}
const uploadImage = (e) => {
    const { files } = e.target
    if (files.length > 0) {
        const url = URL.createObjectURL(files[0])
        setImageURL(url)
    } else {
        setImageURL(null)
    }
}
const triggerUpload = () => {
    fileInputRef.current.click()
}


useEffect(() => {
    loadModel()
}, [])
return(
    <>
   <input type='file' accept='image/*' capture='camera' className='uploadInput' onChange={uploadImage} ref={fileInputRef} />
   <button className='uploadImage' onClick={triggerUpload}>Upload an Image</button>
    <img src={imageURL} alt="Upload Image" crossOrigin='anonymous' ref={imageRef}/>
    
    <button onClick={identify}>
       Identify  
    </button>
    </>
)
}
export default Model;