import { FC,useState, useEffect, useRef, ChangeEvent } from 'react';
import * as mobilenet from "@tensorflow-models/mobilenet";
import './index.scss'
interface Props{
    image:any;
    setImage:any
}
const Model:FC<Props> =({image,setImage})=> {
    const [isModelLoading, setIsModelLoading] = useState<boolean>(false);
    const [model, setModel] = useState<mobilenet.MobileNet | null>(null);

    const [results, setResults] = useState<any[]>([]);
    

    const imageRef = useRef<HTMLImageElement>(null);


    const loadModel = async () => {
        setIsModelLoading(true);
        try {
            const loadedModel = await mobilenet.load();
            setModel(loadedModel);
            setIsModelLoading(false);
        } catch (error) {
            console.error(error);
            setIsModelLoading(false);
        }
    };



    const identify = async () => {
        if (model && imageRef.current) {
            console.log(imageRef.current);
            
            const identificationResults = await model.classify(imageRef.current);
            setResults(identificationResults);
        }
    };



 
    useEffect(() => {
        loadModel();
    }, []);



    if (isModelLoading) {
        return <h2 className='modelLoader'>Model is Loading...</h2>;
    }

    return (
        <div className="App">
            <div className="mainWrapper">
                <div className="mainContent">
                    <div className="imageHolder">
                        {image && <img src={image} alt="Upload Preview" crossOrigin="anonymous" ref={imageRef} />}
                    </div>
                    {results.length > 0 && <div className='resultsHolder'>
                        {results.map((result, index) => (
                            <div className='result' key={result.className}>
                                <span className='name'>{result.className}</span>
                                <span className='confidence'>
                                    Confidence level: {(result.probability * 100).toFixed(2)}%
                                    {index === 0 && <span className='bestGuess'>Best Prediction</span>}
                                </span>
                            </div>
                        ))}
                    </div>}
                </div>
                {image && <button className='button' onClick={identify}>Identify Image</button>}
            </div>
        </div>
    );
}

export default Model;
