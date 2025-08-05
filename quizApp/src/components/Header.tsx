import "../styles/Header.scss";
import { useNavigate } from "react-router-dom";
import { CommonContext } from "../contexts/commonContext";
import { useContext } from "react";

const Header = () => {
    const {deleteUserFun,userDetails,userProgress } = useContext(CommonContext);
    const navigate = useNavigate();

    const handleExitQuiz = () => {
        deleteUserFun();
        navigate('/');
    };

    return (
        <header className="">
            <img src={`/quizLogo.png`} className="headerImage" alt="QuizMania" width={140} />
            <span>
                {(userDetails && userProgress?.progress !== 100) && <button className="btn outline" onClick={handleExitQuiz}>Exit Quiz</button>}

                {userProgress?.progress === 100 && (
                    userDetails && userDetails.fullName &&
                        <span className="userDetails">
                            <span className="userName" data-letters={userDetails.fullName[0]}>{userDetails.fullName}</span>
                        </span>
                )}
                
            </span>
        </header>
    );
};

export default Header;