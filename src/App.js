import './App.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

function App() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleClickStart = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: 'kn'
    })
  }

  return (
    <div className="App">
      <h2 className='App-header'>Transcribe It...!</h2>
      <div className='Select-language'>
        <div>Select language to transcribe</div>
        <select>
          <option>English</option>
          <option>Kannada</option>
          <option>Hindi</option>
        </select>
      </div>
      <p className='microphone'>Microphone : {listening ? 'On' : 'Off'}</p>
      <div className='button-container'>
        <button onClick={() => handleClickStart()}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
      </div>
      <div className='transcript-container'>
        {transcript}
      </div>
    </div>
  );
}

export default App;
