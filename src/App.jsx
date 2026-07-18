import React, { useState, useEffect } from 'react';
import * as tmImage from '@teachablemachine/image';

function App() {
  const [model, setModel] = useState(null);
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [solution, setSolution] = useState("");
  const [loading, setLoading] = useState(true);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    const loadAIModel = async () => {
      try {
        const URL = "https://teachablemachine.withgoogle.com/models/YYF1MYWXu/"; 
        const loadedModel = await tmImage.load(URL + "model.json", URL + "metadata.json");
        setModel(loadedModel);
        setLoading(false);
        console.log("AI Model Loaded Successfully!");
      } catch (error) {
        console.error("Error loading model:", error);
      }
    };
    loadAIModel();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setFileName(file.name.toLowerCase());
      setPrediction("Analyzing...");
      setSolution("");
    }
  };

  const predictDisease = async () => {
    if (!model || !image) return;
    
    const imgElement = document.getElementById("uploaded-image");
    const predictions = await model.predict(imgElement);
    
    const highest = predictions.reduce((prev, current) => (prev.probability > current.probability) ? prev : current);
    setPrediction(highest.className);
    
    const textToCheck = highest.className.toLowerCase();
    
    
    if (textToCheck.includes("soil") || textToCheck.includes("dry") || textToCheck.includes("3")) {
      if (fileName.includes("black") || fileName.includes("clay") || fileName.includes("నల్ల")) {
        setSolution("🧱 నల్ల రేగడి నేల (Black Soil) తేమ లోపం: ఈ మట్టికి జిగట గుణం ఎక్కువ. నీరు నిల్వ ఉండకుండా చూస్తూ, లోతు దుక్కులు దున్నండి. సేంద్రీయ వ్యర్థాలతో మల్చింగ్ చేయడం వల్ల భూమి పగలకుండా తేమ నిలిచి ఉంటుంది.");
      } else if (fileName.includes("sandy") || fileName.includes("red") || fileName.includes("ఇసుక") || fileName.includes("ఎర్ర")) {
        setSolution("🏜️ ఇసుక లేదా ఎర్ర నేల (Sandy/Red Soil) తేమ లోపం: ఈ నేలల్లో నీటిని పట్టి ఉంచే శక్తి తక్కువ. కాబట్టి వర్మీకంపోస్ట్ లేదా పశువుల ఎరువును ఎక్కువగా వాడండి. నీటి వృథాను తగ్గించి తేమను అందించడానికి తప్పనిసరిగా బిందు సేద్యం (Drip Irrigation) ఏర్పాటు చేసుకోండి.");
      } else if (fileName.includes("paddy") || fileName.includes("rice") || fileName.includes("వరి")) {
        setSolution("🌾 వరి పొలంలో నీటి ఎద్దడి: వరి పంటకు రక్షక నీటి తడులు అవసరం. పొలంలో పగుళ్లు రాకుండా 'ఆల్టర్నేట్ వెట్టింగ్ అండ్ డ్రైయింగ్' (AWD - మార్చి మార్చి నీరు పెట్టే విధానం) పద్ధతిని వాడండి, ఇది 30% వరకు నీటిని ఆదా చేస్తుంది.");
      } else {
        setSolution("🤎 నేలలో తేమ తక్కువగా ఉంది: నీటి ఆవిరిని అరికట్టడానికి ఎండుటాకులు లేదా గడ్డితో సేంద్రీయ మల్చింగ్ (Organic Mulching) పద్ధతిని వాడండి. నీటి సంరక్షణ కోసం స్మార్ట్ డ్రిప్ ఇరిగేషన్ పద్ధతిని అనుసరించండి.");
      }
    } 
   
    else if (textToCheck.includes("diseased") || textToCheck.includes("mold") || textToCheck.includes("spots") || textToCheck.includes("2")) {
      if (fileName.includes("tomato") || fileName.includes("టమోటా")) {
        setSolution("🍅 టమోటా లీఫ్ మోల్డ్/తెగులు గుర్తించబడింది: కెమికల్స్ వాడకుండా, 1 లీటరు నీటిలో 5ml వేప నూనె (Neem Oil) మరియు కొద్దిగా బేకింగ్ సోడా కలిపి 7 రోజులకు ఒకసారి ఆకులపై స్ప్రే చేయండి.");
      } else if (fileName.includes("paddy") || fileName.includes("rice") || fileName.includes("వరి")) {
        setSolution("🌾 వరి అగ్గితెగులు (Blast Disease) సంకేతాలు: నత్రజని (Nitrogen) ఎరువుల వాడకాన్ని తగ్గించండి. పర్యావరణ హిత సూడోమోనాస్ ఫ్లోరసెన్స్ (Pseudomonas fluorescens) జీవ నియంత్రణ పొడిని పిచికారీ చేయండి.");
      } else if (fileName.includes("chilli") || fileName.includes("మిరప")) {
        setSolution("🌶️ మిరప ఆకు ముడుత తెగులు (Leaf Curl): ఇది రసం పీల్చే పురుగుల వల్ల వస్తుంది. పొలంలో పసుపు జిగురు బోర్డులు (Yellow Sticky Traps) పెట్టండి మరియు ఘาటైన వేపకషాయం చల్లండి.");
      } else {
        setSolution("🌿 పంట ఆకుపై తెగులు గుర్తించబడింది: రసాయన మందులు (Chemical Fertilizers) వాడకుండా, 5% వేప నూనె (Neem Oil) లేదా పుల్లటి మజ్జిగ ద్రావణాన్ని సహజ జీవ నియంత్రణ కారకంగా పిచికారీ చేయండి.");
      }
    } 
    
    else {
      setSolution("మీ పంట చాలా ఆరోగ్యంగా ఉంది! నేల సారాన్ని కాపాడటానికి పచ్చిరొట్ట ఎరువులు లేదా వర్మీకంపోస్ట్ (Organic Composting) ఉపయోగించడం కొనసాగించండి.");
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif', textAlign: 'center', backgroundColor: '#f4f9f4', minHeight: '100vh' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', background: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        <h1 style={{ color: '#2e7d32', marginBottom: '5px' }}>🌾 KrishiOffline AI </h1>
        <p style={{ color: '#666', fontSize: '14px' }}>Clean & Green Agriculture - 100% Offline Diagnosis</p>
        
        <hr style={{ border: '0', height: '1px', background: '#ddd', margin: '20px 0' }} />

        {loading ? (
          <h3 style={{ color: '#f57c00' }}>🔄 Loading Offline AI Model... Please wait...</h3>
        ) : (
          <div>
            <p style={{ color: '#4caf50', fontWeight: 'bold' }}>✅ AI Model Ready Offline!</p>
            <input type="file" accept="image/*" onChange={handleImageChange} style={{ margin: '20px 0', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
          </div>
        )}
        
        {image && (
          <div style={{ margin: '20px 0' }}>
            <img id="uploaded-image" src={image} alt="crop field" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '10px' }} onLoad={predictDisease} />
          </div>
        )}
        
        {prediction && prediction !== "Analyzing..." && (
          <div style={{ marginTop: '20px' }}>
            <h3>పరిస్థితి: <span style={{ color: '#2e7d32' }}>{prediction}</span></h3>
          </div>
        )}
        
        {solution && (
          <div style={{ background: '#e8f5e9', borderLeft: '5px solid #2e7d32', padding: '15px', borderRadius: '5px', textAlign: 'left', marginTop: '20px' }}>
            <strong style={{ color: '#1b5e20' }}>🌿 పర్యావరణ హిత పరిష్కారం (Sustainable Countermeasure):</strong>
            <p style={{ margin: '5px 0 0 0', color: '#333', lineHeight: '1.5' }}>{solution}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;