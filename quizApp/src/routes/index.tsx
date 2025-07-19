import { Route, BrowserRouter, Routes } from "react-router-dom";
import Header from "../components/Header";
import { CommonProvider } from "../contexts/commonContext";
import QuizSelectPage from "../pages/quizSelectPage";
import QuizPage from "../pages/quiz";
import ResultPage from "../pages/result";

function AppRoutes() {
    return (
        <CommonProvider>
            <BrowserRouter>
            <Header />
                <Routes>
                    <Route path="/" element={<QuizSelectPage/>} />
                    <Route path="/quiz" element={<QuizPage />} />
                    <Route path="/results" element={<ResultPage />} />
                </Routes>
            </BrowserRouter>
        </CommonProvider>
    );
}

export default AppRoutes;