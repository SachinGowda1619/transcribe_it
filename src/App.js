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
  }

  return (
    <div className="App">
      <h2 className='App-header'>Transcribe It...!</h2>
      <div className='Select-language'>
        <div>Select language to transcribe</div>
        <select onChange={(e) => handleLanguageSelection(e)}>
          <option value={'en'}>English</option>
          <option value={'kn'}>Kannada</option>
          <option value={'hi'}>Hindi</option>
        </select>
      </div>
      <p className='microphone'>Microphone : {listening ? 'On' : 'Off'}</p>
      {!listening && <div className='microphone-error'>Please click 'Start' to recite</div>}
      <div className='button-container'>
        <button onClick={() => handleClickStart()}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <button onClick={() => copyData()}>Copy</button>
      </div>
      <div className='transcript-container'>
        {transcript}
      </div>
    </div>
  );
}

export default App;
