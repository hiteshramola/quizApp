import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/QuizSelect.scss";
import CustomRadio from "../components/CustomRadio";
import Modal from "../components/Modal";
import { CommonContext } from "../contexts/commonContext";

const QuizPage = () => {
    const navigate = useNavigate();
    const [selectedTopic, setSelectedTopic] = useState('');
    const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
    const [fullName, setFullName] = useState('');
    const [errors, setErrors] = useState({
        fullName: '',
        topic: ''
    });
    const { setUserDetails } = useContext(CommonContext);

    const handleTopicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedTopic(event.target.value);
        setErrors(prev => ({ ...prev, topic: '' }));
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFullName(event.target.value);
        setErrors(prev => ({ ...prev, fullName: '' }));
    };

    const openRulesModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsRulesModalOpen(true);
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            fullName: '',
            topic: ''
        };

        if (!fullName.trim()) {
            newErrors.fullName = 'Full name is required';
            isValid = false;
        }

        if (!selectedTopic) {
            newErrors.topic = 'Please select a topic';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            // Save user details in context/localStorage
            const userDetails = {
                fullName,
                topic: selectedTopic,
                Timeout: new Date().getTime()
            };
            setUserDetails(userDetails);
            localStorage.setItem('quizLog', JSON.stringify(userDetails));
            navigate('/quiz');
        }
    };

    return (<>
        <div className="quizSelectPage flexCenterColumn">
            <h1>Welcome to <span className="primaryText">QUIZ<strong>Mania</strong></span></h1>

            <div className="infoBox">
                <p>Please read all the rules about this quiz before you start.</p>
                <a href="#" onClick={openRulesModal}>Quiz rules</a>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="flexStartColumn">
                    <label className="inputLabel">Full name</label>
                    <input
                        type="text"
                        placeholder="Full Name"
                        className={`forminpt ${errors.fullName ? 'error' : ''}`}
                        value={fullName}
                        onChange={handleNameChange}
                    />
                    {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                </div>

                <div className="selectTopic">
                    <label className="inputLabel">Please select topic to continue</label>
                    {errors.topic && <span className="error-message">{errors.topic}</span>}
                    <div className="flexstart">
                        <CustomRadio
                            id="js_basics"
                            name="topic"
                            value="js_basics"
                            checked={selectedTopic === "js_basics"}
                            onChange={handleTopicChange}
                            label="Javascript Basic"
                        />
                        <CustomRadio
                            id="angular_basics"
                            name="topic"
                            value="angular_basics"
                            checked={selectedTopic === "angular_basics"}
                            onChange={handleTopicChange}
                            label="Angular Basic"
                        />
                        <CustomRadio
                            id="reactjs_advance"
                            name="topic"
                            value="reactjs_advance"
                            checked={selectedTopic === "reactjs_advance"}
                            onChange={handleTopicChange}
                            label="React.js Advance"
                        />
                        <CustomRadio
                            id="flutter"
                            name="topic"
                            value="flutter"
                            checked={selectedTopic === "flutter"}
                            onChange={handleTopicChange}
                            label="Flutter"
                        />
                    </div>
                </div>
                <button className="btn">Start Quiz</button>
            </form>
        </div>


        <Modal isOpen={isRulesModalOpen} onClose={() => setIsRulesModalOpen(false)} title="Quiz Rules">
            <ul className="quizRules">
                <li className="rule-title">
                    <h6>10-Second Timer</h6>
                    <ul>
                        <li>Each question comes with a 10-second timer.</li>
                        <li>If you don't answer within the time limit, the app will automatically move to the next question.</li>
                    </ul>
                </li>
                <li className="rule-title">
                    <h6>Manual Navigation</h6>
                    <ul>
                        <li>You can navigate to the next question manually before the timer expires.</li>
                        <li>Use the "Next" button to move ahead if you're ready before the timer runs out.</li>
                    </ul>
                </li>
                <li className="rule-title">
                    <h6>Final Score and Performance Message</h6>
                    <ul>
                        <li>After all questions are answered, your final score will be displayed.</li>
                        <li>Based on your performance, you will receive a personalized message:
                            <ul>
                                <li>Great job!: If you score <strong>above 80%</strong>.</li>
                                <li>Well done!: If you score <strong>between 60% and 80%</strong>.</li>
                                <li>Keep practicing!: If you score <strong>below 60%</strong>.</li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </Modal>

    </>
    );
}

export default QuizPage;