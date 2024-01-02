import React from 'react'
import { useState, useRef, useEffect} from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'


const Textform = (props) => {
    const [text, setText]=useState(" ");
    const [prevText, setPrevText] = useState('');
    const textRef = useRef(null);
    const [transcriptText, setTranscriptText] = useState('');

    const { transcript,resetTranscript,  browserSupportsSpeechRecognition } = useSpeechRecognition();
    const startListening = () => SpeechRecognition.startListening({ continuous: true,language:'en-IN' });
    const stopListening = () => SpeechRecognition.stopListening();
    
    
    useEffect(() => {
      setTranscriptText(transcript);
    }, [transcript]);
    
      if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
      }

    
    const handleUpClick=()=>{
        let newText=text.toUpperCase();
        setText(newText);
    props.showAlert("Coverted to Uppercase!", "success");

        
    }
    const handleOnChange=(event)=>{
        setText(event.target.value);
    }

const  handleDownClick=()=>{
    let newText=text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to lowercase!", "success");
}

const  handleClearClick=()=>{
    let newText="";
    setPrevText(text);
    setText(newText);
    resetTranscript();
      SpeechRecognition.stopListening();
    SpeechRecognition.abortListening();
    props.showAlert("Text Cleared!", "success");
}

const  handleCopyClick=()=>{
    let text=document.getElementById("box-1");
    text.select();
    navigator.clipboard.writeText(text.value);
    props.showAlert("Copied to Clipboard!", "success");
    textRef.current.blur();
}

const handleExtraSpaces=()=>{
    let newText=text.split(/[ ]+/);
    setText(newText.join(" "));
    setPrevText(text);
    props.showAlert("Extra spaces removed!", "success");

}

const handleExtractNumbers=()=>{
    let newText=text.match(/\d+/g);
    setText(newText.join(" "));
    props.showAlert("Numbers extracted!", "success");
    
}

const handleUndo=()=>{
    setText(prevText);
    props.showAlert("Undo Action!", "success");
}

const isNumberEntered = text.match(/\d+/g);




  return (
      <>
      <div className="mb-3">
        <h1>{props.heading}</h1>
              <textarea className="form-control mb-4" ref={textRef}  id="box-1" rows="8" value={transcript||text} onChange={handleOnChange}></textarea>
              <button className="btn btn-primary mx-1"disabled={text.length===0} onClick={handleUpClick}>Convert to UPPERCASE</button>
              <button className="btn btn-success" disabled={text.length===0} onClick={handleDownClick}>Convert to lowercase</button>
              <button className="btn btn-dark mx-1" disabled={text.length===0} onClick={handleClearClick}>Clear Text</button>
              <button className="btn btn-danger " disabled={text.length===0} onClick={handleCopyClick}>Copy Text</button>
              <button className="btn btn-success mx-1"  disabled={text.length===0} onClick={handleExtraSpaces}>Remove Extra Spaces</button>
              <button className="btn btn-primary " disabled={!isNumberEntered} onClick={handleExtractNumbers}>Extract Numbers</button>
              <button className="btn btn-primary mx-1" onClick={handleUndo} disabled={!prevText}> Undo Action</button>
              <button className="btn btn-success mx-1" onClick={startListening} > Start Listening</button>
              <button className="btn btn-danger mx-1" onClick={stopListening} > Stop Listening</button>
          </div>
          <div className="container">
            <h2>Your text summary</h2>
            <p>{text.split(" ").filter((element)=>{return element.length!==0}).length} words and {text.replace(/\s/g, '').length} characters</p>

            <p>
          Transcript: {transcriptText.split(' ').filter((element) => element.length !== 0).length}{' '}
          words and {transcriptText.replace(/\s/g, '').length} characters
        </p>

            <h3>Preview Here</h3>
            <p>{text.length>0?text:"Enter something in the textbox above to preview your text here"}</p>
          </div>
          </>
)
}

export default Textform