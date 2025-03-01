import React from 'react';
import './Home.scss'; // Файл стилей

const Home = () => {
  return (
    <div className="home-container">
      {/* Герой-секция */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Добро пожаловать на платформу SmartBiz Connect!</h1>
          <p className="hero-description">
            "SmartBiz Connect" — это инновационная платформа на основе ИИ для бизнеса, которая автоматизирует взаимодействие с клиентами и HR-процессы, повышая их эффективность.
          </p>
          <div className="cta-buttons">
            <button className="cta-button primary">Зарегистрироваться</button>
            <button className="cta-button secondary">Посмотреть демо</button>
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/hero.jpg" alt="SmartBiz Connect" />
        </div>
      </section>

      {/* Раздел "Особенности" */}
      <section className="features-section">
        <h2>Ключевые преимущества платформы</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>ИИ-чат-бот</h3>
            <p>Быстрые и точные ответы на вопросы клиентов, персонализированные рекомендации и круглосуточная поддержка.</p>
          </div>
          <div className="feature-card">
            <h3>Автоматизация HR</h3>
            <p>Автоматическая оценка кандидатов, упрощение процесса собеседования и управление базой кандидатов.</p>
          </div>
          <div className="feature-card">
            <h3>Мультиязычность</h3>
            <p>Возможность общения на английском, русском, узбекском и других языках.</p>
          </div>
        </div>
      </section>

      {/* Раздел "Инновации" */}
      <section className="innovation-section">
        <h2>Инновационные аспекты</h2>
        <div className="innovation-grid">
          <div className="innovation-card">
            <h3>Интегрированное ИИ-решение</h3>
            <p>Объединение взаимодействия с клиентами и HR-процессов в одной платформе.</p>
          </div>
          <div className="innovation-card">
            <h3>Персонализированные услуги</h3>
            <p>Индивидуальные рекомендации и сервисы для клиентов и кандидатов.</p>
          </div>
          <div className="innovation-card">
            <h3>Мультиязычность</h3>
            <p>Обслуживание клиентов на разных языках.</p>
          </div>
          <div className="innovation-card">
            <h3>Автоматизированные HR-процессы</h3>
            <p>Автоматическая оценка кандидатов и автоматизация собеседований.</p>
          </div>
        </div>
      </section>

      {/* Раздел "Этапы реализации" */}
      <section className="implementation-section">
        <h2>Этапы реализации</h2>
        <div className="steps-grid">
          <div className="step-card">
            <h3>1. Первоначальное планирование</h3>
            <p>Определение целей, аудитории, функциональных требований и технологий.</p>
          </div>
          <div className="step-card">
            <h3>2. Дизайн и интерфейс</h3>
            <p>Создание дизайна интерфейса и прототипа в Figma.</p>
          </div>
          <div className="step-card">
            <h3>3. Разработка и интеграция</h3>
            <p>Разработка чат-бота, HR-автоматизации и мультиязычности.</p>
          </div>
          <div className="step-card">
            <h3>4. Тестирование и улучшение</h3>
            <p>Тестирование чат-бота и HR-системы, улучшение пользовательского опыта.</p>
          </div>
          <div className="step-card">
            <h3>5. Коммерциализация и маркетинг</h3>
            <p>Разработка бизнес-модели и маркетинговой стратегии.</p>
          </div>
        </div>
      </section>

      {/* Раздел "Технологии" */}
      <section className="tech-section">
        <h2>Технологии и инструменты</h2>
        <div className="tech-grid">
          <div className="tech-card">
            <h3>Языки программирования</h3>
            <p>Python (для ИИ), JavaScript (для фронтенда и бэкенда)</p>
          </div>
          <div className="tech-card">
            <h3>Фреймворки</h3>
            <p>ReactJS (фронтенд), NodeJS (бэкенд), Flask/Django (для ИИ)</p>
          </div>
          <div className="tech-card">
            <h3>Базы данных</h3>
            <p>MongoDB (для хранения данных о клиентах и кандидатах)</p>
          </div>
          <div className="tech-card">
            <h3>ИИ-инструменты</h3>
            <p>OpenAI API (ChatGPT), NLP-библиотеки (spaCy, NLTK)</p>
          </div>
          <div className="tech-card">
            <h3>Интеграция</h3>
            <p>Google Translate API (для мультиязычности)</p>
          </div>
        </div>
      </section>

      {/* Раздел "Хакатон" */}
      <section className="pitch-section">
        <h2>Презентация для хакатона</h2>
        <div className="pitch-grid">
          <div className="pitch-card">
            <h3>Презентация проекта</h3>
            <p>Описание идеи, функций и инновационных аспектов.</p>
          </div>
          <div className="pitch-card">
            <h3>Прототип</h3>
            <p>Создание прототипа интерфейса в Figma и демо-версии чат-бота.</p>
          </div>
          <div className="pitch-card">
            <h3>Бизнес-модель</h3>
            <p>План коммерциализации и привлечения инвестиций.</p>
          </div>
          <div className="pitch-card">
            <h3>Критерии оценки</h3>
            <p>Оценка проекта по уровню ИИ-технологий, инновациям и коммерческому потенциалу.</p>
          </div>
        </div>
      </section>

      {/* Раздел "Призыв к действию" */}
      <section className="cta-section">
        <h2>Автоматизируйте свой бизнес!</h2>
        <p>SmartBiz Connect поможет вам сэкономить время, улучшить взаимодействие с клиентами и упростить HR-процессы.</p>
        <button className="cta-button primary">Начать сейчас</button>
      </section>
    </div>
  );
};

export default Home;
