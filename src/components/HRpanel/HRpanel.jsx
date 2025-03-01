import React, { useState } from 'react';
import axios from 'axios';
import './HRPanel.scss';

const HRPanel = () => {
  // Fayl yuborish va tahlil qismi uchun state'lar
  const [file, setFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState('');

  // Nomzod ma'lumotlari (misol uchun)
  const [candidate, setCandidate] = useState({
    name: 'Ali Valiyev',
    position: 'Frontend Developer',
    interviewDate: '2023-12-15',
    score: '85/100',
    status: 'Baholashda',
  });

  // Fayl yuborish funksiyasi
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://api.example.com/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setAnalysisResult(response.data.result);

      // Tahlil natijasiga ko'ra nomzod ma'lumotlarini yangilash (misol uchun)
      setCandidate({
        ...candidate,
        score: '90/100', // Yangi baholash
        status: 'Tahlil qilindi',
      });
    } catch (error) {
      console.error('Xatolik yuz berdi:', error);
      setAnalysisResult('Fayl yuborishda xatolik yuz berdi. Iltimos, qayta urunib ko\'ring.');
    }
  };

  return (
    <div className="hr-panel">
      {/* Chap qism: Fayl yuborish va tahlil natijalari */}
      <div className="left-section">
        <div className="file-upload">
          <h2>PDF Fayl Yuborish</h2>
          <input type="file" accept=".pdf" onChange={handleFileChange} />
          <button onClick={handleUpload}>Yuborish</button>
          {analysisResult && (
            <div className="analysis-result">
              <h3>Tahlil Natijalari:</h3>
              <p>{analysisResult}</p>
            </div>
          )}
        </div>
      </div>

      {/* O'ng qism: Nomzod ma'lumotlari va intervyu rejasi */}
      <div className="right-section">
        <div className="candidate-info">
          <h2>Nomzod Ma'lumotlari</h2>
          <div className="info-section">
            <p><strong>Ism:</strong> {candidate.name}</p>
            <p><strong>Lavozim:</strong> {candidate.position}</p>
            <p><strong>Intervyu Sanasi:</strong> {candidate.interviewDate}</p>
            <p><strong>Baholash:</strong> {candidate.score}</p>
            <p><strong>Holat:</strong> {candidate.status}</p>
          </div>
          <div className="interview-schedule">
            <h3>Intervyu Rejasi</h3>
            <p>Intervyu {candidate.interviewDate} sanasida soat 10:00 da bo'lib o'tadi.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRPanel;