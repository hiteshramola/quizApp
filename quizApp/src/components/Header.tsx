import "../styles/Header.scss";
import { useNavigate } from "react-router-dom";
import { CommonContext } from "../contexts/commonContext";
import { useContext } from "react";

const Header = () => {
    const {deleteUserFun,userDetails } = useContext(CommonContext);
    const navigate = useNavigate();

    const handleExitQuiz = () => {
        deleteUserFun();
        navigate('/');
    };

    return (
        <header className="">
            <img src={`/quizLogo.png`} className="headerImage" alt="QuizMania" width={140} />
            <span>
                {(userDetails) && <button className="btn outline" onClick={handleExitQuiz}>Exit Quiz</button>}
            </span>
        </header>
    );
};

export default Header;