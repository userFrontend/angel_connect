import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './HRpanel.scss';

const HRPanel = () => {
  const [file, setFile] = useState(null);
  const [userMessage, setUserMessage] = useState(''); // Foydalanuvchiga ko'rsatiladigan xabar
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [candidates, setCandidates] = useState([]); // localStorage dan olingan nomzodlar ro'yxati

  const [candidate, setCandidate] = useState({
    name: '',
    phone: '',
    age: '',
    skills: '',
    experience: '',
    matchPercentage: 0, // Vakansiyaga moslik foizi
  });

  // localStorage dan nomzodlarni yuklash
  useEffect(() => {
    const savedCandidates = JSON.parse(localStorage.getItem('candidates')) || [];
    setCandidates(savedCandidates);
  }, []);

  // Gemini API ni sozlash
  const genAI = new GoogleGenerativeAI("AIzaSyCGLewOuiQw3bdFLkXk-LDM9P0_mdIKzys"); // API kalitingizni qo'ying
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); // Model nomini yangilang

  // Faylni drag-and-drop orqali yuklash
  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
    } else {
      alert('Faqat PDF fayllarni yuklash mumkin!');
    }
  };

  // Faylni tanlash orqali yuklash
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Faqat PDF fayllarni yuklash mumkin!');
    }
  };

  // Faylni yuborish va tahlil qilish
  const handleAnalyze = async () => {
    if (!file) return;

    setIsLoading(true);

    try {
      // Faylni Base64 formatiga o'tkazish
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Data = reader.result.split(',')[1]; // Base64 ma'lumotni ajratib olish

        // Gemini API ga so'rov yuborish
        const result = await model.generateContent([
          {
            inlineData: {
              data: base64Data,
              mimeType: "application/pdf",
            },
          },
          `Ushbu PDF faylni tahlil qiling va quyidagi vakansiya talablariga mosligini baholang:
          Vakansiya: Senior Frontend Developer
          Kompaniya: FreamMedia
          Talablar:
          - Rus tilini bilish
          - JavaScript, TypeScript, React, Redux/Zustand
          - CSS - Tailwind
          - Web OS SDK, Tizen SDK
          - Ilovalarni tegishli market/storlarga chiqarish tajribasi
          - Jamoaviy ishlash ko‘nikmalari

          Agar nomzod vakansiyaga mos kelmasa, foydalanuvchiga quyidagi xabarni ko'rsating:
          "Ushbu foydalanuvchiga bizda hozircha vakansiya yo'q. Ma'lumotlaringiz saqlab qolindi, vakansiya ochilganda siz bilan bog'lanamiz."

          Agar nomzod vakansiyaga mos kelsa, quyidagi xabarni ko'rsating:
          "Sizning ma'lumotlaringiz vakansiyaga mos keladi. Tez orada siz bilan bog'lanamiz."

          Shuningdek, vakansiyaga moslik foizini hisoblang va quyidagi ma'lumotlarni qaytaring:
          - Ism va familiya
          - Telefon raqam
          - Yosh
          - Bilim va tajribalar
          - Vakansiyaga moslik foizi (%)`,
        ]);

        // Tahlil natijasini olish
        const analysisResult = result.response.text();
        console.log(analysisResult); // Konsolda tahlil natijasini ko'rish

        // Ma'lumotlarni ajratib olish
        const nameMatch = analysisResult.match(/Ism va familiya:\s*(.+)/);
        const phoneMatch = analysisResult.match(/Telefon raqam:\s*(.+)/);
        const ageMatch = analysisResult.match(/Yosh:\s*(\d+)/); // Faqat raqamni ajratib olish
        const skillsMatch = analysisResult.match(/Bilim va tajribalar:\s*(.+)/);
        const matchPercentageMatch = analysisResult.match(/Vakansiyaga moslik foizi:\s*(\d+)%/);

        const name = nameMatch ? nameMatch[1].replace(/\*\*/g, '').trim() : 'Noma\'lum';
        const phone = phoneMatch ? phoneMatch[1].replace(/\*\*/g, '').trim() : 'Berilmagan';
        const age = ageMatch ? ageMatch[1].replace(/\*\*/g, '').trim() : 'Noma\'lum';
        const skills = skillsMatch ? skillsMatch[1].replace(/\*\*/g, '').trim() : 'Noma\'lum';
        const matchPercentage = matchPercentageMatch ? parseInt(matchPercentageMatch[1]) : 0;

        // Foydalanuvchiga ko'rsatiladigan xabar
        const userMessage = matchPercentage < 50
          ? "Ushbu foydalanuvchiga bizda hozircha vakansiya yo'q. Ma'lumotlaringiz saqlab qolindi, vakansiya ochilganda siz bilan bog'lanamiz."
          : "Sizning ma'lumotlaringiz vakansiyaga mos keladi. Tez orada siz bilan bog'lanamiz.";

        setUserMessage(userMessage);

        // Nomzod ma'lumotlarini yangilash
        const candidateData = {
          name,
          phone,
          age,
          skills,
          experience: skills, // Tajriba sifatida bilimlarni qo'shamiz
          matchPercentage,
        };
        setCandidate(candidateData);

        // Ma'lumotni localStorage ga saqlash
        const updatedCandidates = [...candidates, candidateData];
        localStorage.setItem('candidates', JSON.stringify(updatedCandidates));
        setCandidates(updatedCandidates); // Ro'yxatni yangilash
      };
    } catch (error) {
      console.error('Xatolik yuz berdi:', error);
      setUserMessage('Xatolik yuz berdi. Iltimos, qayta urunib ko\'ring.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="hr-panel">
      {/* Chap qism: Fayl yuborish va tahlil natijalari */}
      <div className="left-section">
        <div
          className={`file-upload ${isDragging ? 'dragging' : ''}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <h2>PDF Fayl Yuborish</h2>
          <div className="upload-area">
            <p>Faylni shu yerga sudrab keling yoki tanlang</p>
            <input
              type="file"
              id="file-input"
              accept=".pdf"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="file-input" style={{textDecoration: 'underline', cursor: 'pointer'}}>
              Faylni tanlang
            </label>
          </div>
          {file && (
            <div className="file-info">
              <p>Tanlangan fayl: <strong>{file.name}</strong></p>
              <button onClick={handleAnalyze} disabled={isLoading}>
                {isLoading ? 'Tahlil qilinmoqda...' : 'Tahlil qilish'}
              </button>
            </div>
          )}
          {userMessage && (
            <div className="user-message">
              <h3>Xabar:</h3>
              <p>{userMessage}</p>
            </div>
          )}
        </div>
      </div>

      {/* O'ng qism: Nomzodlar ro'yxati */}
      <div className="right-section">
        <h2>Nomzodlar Ro'yxati</h2>
        <div className="candidates-list">
          {candidates.length > 0 ? (
            candidates.map((candidate, index) => (
              <div key={index} className="candidate-card">
                <h3>{candidate.name}</h3>
                <p><strong>Telefon:</strong> {candidate.phone}</p>
                <p><strong>Yosh:</strong> {candidate.age}</p>
                <p><strong>Bilim va tajriba:</strong> {candidate.skills}</p>
                <p><strong>Vakansiyaga moslik:</strong> {candidate.matchPercentage}%</p>
              </div>
            ))
          ) : (
            <div className="candidate-card empty">
              <p>Hozircha nomzodlar mavjud emas.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HRPanel;