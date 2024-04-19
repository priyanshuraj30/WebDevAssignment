import React, { useState , useEffect } from 'react';
// import axios from 'axios';


const Form = () => {

  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const response = await fetch('/recording/');
        const data = await response.json(); // Parse the response JSON
        setRecordings(data); // Set the recordings state with the fetched data
      } catch (error) {
        console.error('Error fetching recordings:', error);
      }
    };

    fetchRecordings();
  }, []); // Fetch recordings on component mount

  const [formData, setFormData] = useState({
    doctorName: '',
    patientName: '',
    patientAge: '',
    dateOfRecording: '',
    soundFile: ''
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === 'file' ? files[0] : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    if (!formData.doctorName || !formData.patientName || !formData.patientAge || !formData.dateOfRecording || !formData.soundFile) {
      alert('Please fill all the fields.');
      return;
    }

    const formDataToSend = new FormData();
    for (let key in formData) {
      if (formData[key] instanceof File) {
        formDataToSend.append(key, formData[key]);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch('/recording/', {
        method:"POST",
        body:formDataToSend
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  return (  
    <div className="container">
      
      <div>
      <form className="recording-form" onSubmit={handleSubmit}>
        <h2>Record a New Recording</h2>
        <div className="form-group">
          <input type="text" name="doctorName" placeholder="Doctor's Name" onChange={handleChange} />
        </div>
        <div className="form-group">
          <input type="text" name="patientName" placeholder="Patient's Name" onChange={handleChange} />
        </div>
        <div className="form-group">
          <input type="number" name="patientAge" placeholder="Patient's Age" onChange={handleChange} />
        </div>
        <div className="form-group">
          <input type="date" name="dateOfRecording" onChange={handleChange} />
        </div>
        <div className="form-group">
          <input type="file" name="soundFile" onChange={handleChange} />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
      </div>
      <div className="recordings-list">
        <h2>Recordings List</h2>
        <ul>
          {recordings.map((recording, index) => (
            <li key={index} className="recording-item">
              <div className="recording-details">
                <div className="detail">
                  <strong>Doctor Name:</strong> {recording.doctorName}
                </div>
                <div className="detail">
                  <strong>Patient Name:</strong> {recording.patientName}
                </div>
                <div className="detail">
                  <strong>Patient Age:</strong> {recording.patientAge}
                </div>
                <div className="detail">
  <strong>Date:</strong> {new Date(recording.dateOfRecording).toLocaleDateString()}
</div>
              </div>
              <div className="audio-player">
                <audio controls>
                  <source src={`data:audio/wav;base64,${recording.soundFile}`} type="audio/wav" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Form;
