import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CommonContext } from '../contexts/commonContext';
import '../styles/Result.scss';

const ResultPage = () => {
    const navigate = useNavigate();
    const { userDetails, userProgress, deleteUserFun } = useContext(CommonContext);

    // Use values from userProgress or default to 0 if not available
    const correct = userProgress?.correctAnswers ?? 0;
    const incorrectAnswers = userProgress?.incorrectAnsweres ?? 0;
    const notAnswered = userProgress?.notAnswered ?? 10;
    const totalQuestions = correct + incorrectAnswers + notAnswered;
    const scorePercentage = Math.round((correct / (totalQuestions || 1)) * 100);

    const handleRetakeQuiz = () => {
        deleteUserFun();
        navigate('/');
    };

    useEffect(() => {
        if (!userDetails || !userProgress) {navigate('/');}
    }, []);

    return (<>
        {userDetails && <div className="result-container">
            <div className="result-card">
                <div className="image">{scorePercentage >= 60 ? <svg width="97" height="96" viewBox="0 0 97 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" width="96" height="96" rx="48" fill="#06AF52" fill-opacity="0.1" />
                    <path d="M28.5 51L41 63.5L68.5 36" stroke="#06AF52" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
                </svg> : <svg width="87" height="87" viewBox="0 0 87 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M43.6064 6.11149C23.1719 6.11149 6.60645 22.6911 6.60645 43.143C6.60645 63.5948 23.1719 80.1745 43.6064 80.1745C64.0408 80.1745 80.6064 63.5948 80.6064 43.143C80.6064 22.6911 64.0408 6.11149 43.6064 6.11149ZM0.606445 43.143C0.606445 19.3745 19.8582 0.106384 43.6064 0.106384C67.3548 0.106384 86.6064 19.3745 86.6064 43.143C86.6064 66.9116 67.3548 86.1796 43.6064 86.1796C19.8582 86.1796 0.606445 66.9116 0.606445 43.143Z" fill="#B92B5D" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M23.6069 31.1327C23.6069 28.9217 25.3978 27.1293 27.6069 27.1293H27.6428C29.852 27.1293 31.6428 28.9217 31.6428 31.1327C31.6428 33.3438 29.852 35.1361 27.6428 35.1361H27.6069C25.3978 35.1361 23.6069 33.3438 23.6069 31.1327ZM55.5709 31.1327C55.5709 28.9217 57.3617 27.1293 59.5709 27.1293H59.6069C61.8161 27.1293 63.6069 28.9217 63.6069 31.1327C63.6069 33.3438 61.8161 35.1361 59.6069 35.1361H59.5709C57.3617 35.1361 55.5709 33.3438 55.5709 31.1327Z" fill="#B92B5D" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M58.3914 50.0347C59.0066 51.5741 58.2582 53.3215 56.7198 53.9377L36.7198 61.9445C35.1816 62.5602 33.4357 61.8112 32.8203 60.2714C32.205 58.7321 32.9533 56.9847 34.4916 56.3685L54.4918 48.3617C56.0298 47.746 57.7758 48.495 58.3914 50.0347Z" fill="#B92B5D" />
                </svg>
                }
                </div>
                {scorePercentage < 60 && <p className="completion-text">You successfully completed the Quiz but you need to</p>}
                <h1 className="success-title">{scorePercentage >= 80 ? "Congratulations!" : scorePercentage >= 60 ? 'Good job!' : "Keep practicing!"}</h1>
                {scorePercentage >= 60 && <p className="completion-text">You have successfully completed the Quiz</p>}

                <div className="score-section">
                    <p>Your Score</p>
                    <div className="score-circle">
                        <span className="percentage">{scorePercentage}%</span>
                    </div>
                    {/* <p className="score-message">
                        {scorePercentage >= 80 ? 'Congratulations!' :
                            scorePercentage >= 60 ? 'Good job!' :
                                'Keep practicing!'}
                    </p> */}
                </div>

                <div className="stats-section">
                    <p>Quiz Statistics</p>
                    <div className="stats-grid">
                        <div className="stat-item correct">
                            <span className="stat-number">{correct}</span>
                            <span className="stat-label">Correct</span>
                        </div>
                        <div className="stat-item incorrect">
                            <span className="stat-number">{incorrectAnswers}</span>
                            <span className="stat-label">Incorrect</span>
                        </div>
                        <div className="stat-item unanswered">
                            <span className="stat-number">{notAnswered}</span>
                            <span className="stat-label">Not Answered</span>
                        </div>
                    </div>
                </div>

                <button
                    className="btn outline"
                    onClick={handleRetakeQuiz}
                >
                    Retake Quiz
                </button>
            </div>
        </div>}
    </>
    );
};

export default ResultPage;