import { useState } from 'react';
import './App.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

function App() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [language, setLanguage] = useState('en');

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleLanguageSelection = (e) => {
    setLanguage(e.target.value);
    SpeechRecognition.stopListening();
  }

  const handleClickStart = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: language
    })
  }

  const copyData = () => {
    navigator.clipboard.writeText(transcript);
    var element = document.getElementById("copy-text");
    var originalText = element.innerText;
    if(transcript) {
      element.innerText = "Copied";
    }

    setTimeout(function() {
        element.innerText = originalText;
    }, 1000);
  }

  return (
    <div className="App">
      <h2 className='App-header'>Transcribe It...!</h2>
      <div className='Select-language'>
        <div>Select language to transcribe</div>
        <select className='dropdown' onChange={(e) => handleLanguageSelection(e)}>
          <option value={'en'}>English</option>
          <option value={'kn'}>Kannada</option>
          <option value={'hi'}>Hindi</option>
        </select>
      </div>
      <div className='microphone-container'>
        <p className='microphone-text'>Microphone : </p>
        <p style={listening ? {color: 'green'} : {color: 'red'}}>{listening ? 'On' : 'Off'}</p>
      </div>
      <div className='button-container'>
        <button onClick={() => handleClickStart()}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <button onClick={() => copyData()} id='copy-text'>Copy</button>
      </div>
      <div className='transcript-container'>
        {!listening && !transcript ? "Please click 'Start' to recite" : transcript}
      </div>
      <p className='thank-you'>Than you!</p>
    </div>
  );
}

export default App;
