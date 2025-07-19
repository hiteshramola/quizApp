
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomRadio from '../components/CustomRadio';
import { CommonContext } from '../contexts/commonContext';
import { _get } from '../utilities/apiConfigs';
import '../styles/Quiz.scss';

interface Question {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    timeLimit: number;
}

const QuizPage = () => {
    const navigate = useNavigate();
    const { userDetails, setUserProgress } = useContext(CommonContext);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [timer, setTimer] = useState(10);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
    const [incorrectAnswerCount, setIncorrectAnswerCount] = useState(0);
    const [notAnswered, setNotAnswered] = useState(0);

    useEffect(() => {
        const mockQuizData = {
            categories: [
                {
                    id: "js_basics",
                    name: "JavaScript Basics",
                    questions: [
                        {
                            id: "js_q1",
                            question: "What is the correct syntax for referring to an external script called 'script.js'?",
                            options: [
                                "A. <script name='script.js'>",
                                "B. <script href='script.js'>",
                                "C. <script src='script.js'>",
                                "D. <script file='script.js'>"
                            ],
                            correctAnswer: "C",
                            timeLimit: 20
                        },
                        {
                            id: "js_q2",
                            question: "Which company developed JavaScript?",
                            options: [
                                "A. Microsoft",
                                "B. Netscape",
                                "C. Google",
                                "D. Mozilla"
                            ],
                            correctAnswer: "B",
                            timeLimit: 10
                        },
                        {
                            id: "js_q3",
                            question: "What is the correct way to write a JavaScript array?",
                            options: [
                                "A. var colors = ['red', 'green', 'blue']",
                                "B. var colors = (1:'red', 2:'green', 3:'blue')",
                                "C. var colors = 'red', 'green', 'blue'",
                                "D. var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')"
                            ],
                            correctAnswer: "A",
                            timeLimit: 10
                        },
                        {
                            id: "js_q4",
                            question: "Which operator is used to assign a value to a variable?",
                            options: [
                                "A. *",
                                "B. -",
                                "C. =",
                                "D. =="
                            ],
                            correctAnswer: "C",
                            timeLimit: 10
                        },
                        {
                            id: "js_q5",
                            question: "What is the correct way to write an IF statement in JavaScript?",
                            options: [
                                "A. if i = 5 then",
                                "B. if i == 5 then",
                                "C. if (i == 5)",
                                "D. if i = 5"
                            ],
                            correctAnswer: "C",
                            timeLimit: 10
                        },
                        {
                            id: "js_q6",
                            question: "How do you create a function in JavaScript?",
                            options: [
                                "A. function = myFunction()",
                                "B. function:myFunction()",
                                "C. function myFunction()",
                                "D. create myFunction()"
                            ],
                            correctAnswer: "C",
                            timeLimit: 10
                        },
                        {
                            id: "js_q7",
                            question: "How do you write 'Hello World' in an alert box?",
                            options: [
                                "A. msgBox('Hello World')",
                                "B. alert('Hello World')",
                                "C. msg('Hello World')",
                                "D. alertBox('Hello World')"
                            ],
                            correctAnswer: "B",
                            timeLimit: 10
                        },
                        {
                            id: "js_q8",
                            question: "What is the correct way to write a JavaScript object?",
                            options: [
                                "A. var person = Object(name:'John', age:50)",
                                "B. var person = {name:'John', age:50}",
                                "C. var person = 'name':'John', 'age':50",
                                "D. var person = (name='John', age=50)"
                            ],
                            correctAnswer: "B",
                            timeLimit: 10
                        },
                        {
                            id: "js_q9",
                            question: "Which event occurs when the user clicks on an HTML element?",
                            options: [
                                "A. onmouseclick",
                                "B. onclick",
                                "C. onchange",
                                "D. onmouseover"
                            ],
                            correctAnswer: "B",
                            timeLimit: 10
                        },
                        {
                            id: "js_q10",
                            question: "What is the correct JavaScript syntax to change the content of an HTML element with id='demo'?",
                            options: [
                                "A. document.getElementById('demo').innerHTML = 'Hello'",
                                "B. #demo.innerHTML = 'Hello'",
                                "C. document.getElement('demo').innerHTML = 'Hello'",
                                "D. document.getElementByName('demo').innerHTML = 'Hello'"
                            ],
                            correctAnswer: "A",
                            timeLimit: 10
                        }
                    ]
                },
                {
                    id: "angular_basics",
                    name: "Angular Basics",
                    questions: [
                        {
                            id: "ang_q1",
                            question: "What is the decorator used for creating a new component in Angular?",
                            options: [
                                "A. @NgApp",
                                "B. @Component",
                                "C. @Directive",
                                "D. @Module"
                            ],
                            correctAnswer: "B",
                            timeLimit: 10
                        },
                        {
                            id: "ang_q2",
                            question: "Which of the following is used for dependency injection in Angular?",
                            options: [
                                "A. @Inject",
                                "B. @DependencyInjector",
                                "C. @Injectable",
                                "D. @Injector"
                            ],
                            correctAnswer: "C",
                            timeLimit: 10
                        },
                        {
                            id: "ang_q3",
                            question: "What is the purpose of ngOnInit?",
                            options: [
                                "A. To initialize the component",
                                "B. To destroy the component",
                                "C. To detect changes in component",
                                "D. To update component data"
                            ],
                            correctAnswer: "A",
                            timeLimit: 10
                        },
                        {
                            id: "ang_q4",
                            question: "Which character is used for property binding in Angular?",
                            options: [
                                "A. []",
                                "B. ()",
                                "C. {}",
                                "D. *"
                            ],
                            correctAnswer: "A",
                            timeLimit: 10
                        },
                        {
                            id: "ang_q5",
                            question: "What is the purpose of *ngFor directive?",
                            options: [
                                "A. To create a conditional statement",
                                "B. To handle form submission",
                                "C. To iterate through a list",
                                "D. To bind data to view"
                            ],
                            correctAnswer: "C",
                            timeLimit: 10
                        },
                        {
                            id: "ang_q6",
                            question: "What is Angular CLI command to create a new component?",
                            options: [
                                "A. ng new component",
                                "B. ng generate component",
                                "C. ng create component",
                                "D. ng make component"
                            ],
                            correctAnswer: "B",
                            timeLimit: 10
                        },
                        {
                            id: "ang_q7",
                            question: "Which service is used for routing in Angular?",
                            options: [
                                "A. RouterService",
                                "B. Router",
                                "C. RouteService",
                                "D. NavigationService"
                            ],
                            correctAnswer: "B",
                            timeLimit: 10
                        },
                        {
                            id: "ang_q8",
                            question: "What is the purpose of constructor in Angular component?",
                            options: [
                                "A. To define component properties",
                                "B. To initialize dependency injection",
                                "C. To define component methods",
                                "D. To handle component events"
                            ],
                            correctAnswer: "B",
                            timeLimit: 10
                        },
                        {
                            id: "ang_q9",
                            question: "Which file contains the root module of an Angular application?",
                            options: [
                                "A. main.ts",
                                "B. index.html",
                                "C. app.module.ts",
                                "D. app.component.ts"
                            ],
                            correctAnswer: "C",
                            timeLimit: 10
                        },
                        {
                            id: "ang_q10",
                            question: "What is the purpose of @Input decorator?",
                            options: [
                                "A. To send data from child to parent",
                                "B. To receive data from parent component",
                                "C. To handle user input",
                                "D. To define component input fields"
                            ],
                            correctAnswer: "B",
                            timeLimit: 10
                        }
                    ]
                },
                {
                    id: "reactjs_advance",
                    name: "React.js Advance",
                    questions: [
                        {
                            id: "react_q1",
                            question: "What is the purpose of useCallback hook?",
                            options: [
                                "A. To memoize functions",
                                "B. To manage state",
                                "C. To handle side effects",
                                "D. To access DOM elements"
                            ],
                            correctAnswer: "A",
                            timeLimit: 10
                        },
                        {
                            id: "react_q2",
                            question: "Which hook is used for handling side effects in React?",
                            options: [
                                "A. useState",
                                "B. useEffect",
                                "C. useContext",
                                "D. useReducer"
                            ],
                            correctAnswer: "B",
                            timeLimit: 10
                        },
                        {
                            id: "react_q3",
                            question: "What is React.memo used for?",
                            options: [
                                "A. Database operations",
                                "B. Component memoization",
                                "C. State management",
                                "D. Event handling"
                            ],
                            correctAnswer: "B",
                            timeLimit: 10
                        },
                        {
                            id: "react_q4",
                            question: "What is the purpose of useRef hook?",
                            options: [
                                "A. To store mutable values",
                                "B. To handle form data",
                                "C. To manage state",
                                "D. To create components"
                            ],
                            correctAnswer: "A",
                            timeLimit: 10
                        },
                        {
                            id: "react_q5",
                            question: "Which method is used to implement error boundaries in React?",
                            options: [
                                "A. componentDidCatch",
                                "B. handleError",
                                "C. errorHandler",
                                "D. catchError"
                            ],
                            correctAnswer: "A",
                            timeLimit: 10
                        },
                        {
                            id: "react_q6",
                            question: "What is the purpose of React.lazy()?",
                            options: [
                                "A. Lazy loading components",
                                "B. Lazy state initialization",
                                "C. Lazy event handling",
                                "D. Lazy prop updates"
                            ],
                            correctAnswer: "A",
                            timeLimit: 10
                        },
                        {
                            id: "react_q7",
                            question: "What is the use of useMemo hook?",
                            options: [
                                "A. To memoize values",
                                "B. To handle memory leaks",
                                "C. To manage component lifecycle",
                                "D. To handle routing"
                            ],
                            correctAnswer: "A",
                            timeLimit: 10
                        },
                        {
                            id: "react_q8",
                            question: "What is the purpose of React.createPortal?",
                            options: [
                                "A. Create new components",
                                "B. Render children into different DOM node",
                                "C. Create virtual DOM",
                                "D. Handle component updates"
                            ],
                            correctAnswer: "B",
                            timeLimit: 10
                        },
                        {
                            id: "react_q9",
                            question: "What is the use of React.Fragment?",
                            options: [
                                "A. Group elements without extra node",
                                "B. Create reusable components",
                                "C. Handle component state",
                                "D. Manage component lifecycle"
                            ],
                            correctAnswer: "A",
                            timeLimit: 10
                        },
                        {
                            id: "react_q10",
                            question: "What is the purpose of useLayoutEffect?",
                            options: [
                                "A. Handle component layout",
                                "B. Synchronous version of useEffect",
                                "C. Manage CSS updates",
                                "D. Handle DOM mutations"
                            ],
                            correctAnswer: "B",
                            timeLimit: 10
                        }
                    ]
                },
                {
                    id: "flutter",
                    name: "Flutter",
                    questions: [
                        {
                            id: "flutter_q1",
                            question: "What is a Widget in Flutter?",
                            options: [
                                "A. A database structure",
                                "B. A UI component",
                                "C. A programming language",
                                "D. A testing framework"
                            ],
                            correctAnswer: "B",
                            timeLimit: 10
                        },
                        {
                            id: "flutter_q2",
                            question: "Which widget is used to create a button in Flutter?",
                            options: [
                                "A. Button",
                                "B. FlatButton",
                                "C. ElevatedButton",
                                "D. PressButton"
                            ],
                            correctAnswer: "C",
                            timeLimit: 10
                        },
                        {
                            id: "flutter_q3",
                            question: "What is the purpose of StatefulWidget?",
                            options: [
                                "A. Create static UI",
                                "B. Handle user input",
                                "C. Manage mutable state",
                                "D. Define app theme"
                            ],
                            correctAnswer: "C",
                            timeLimit: 10
                        },
                        {
                            id: "flutter_q4",
                            question: "Which widget is used for layout in Flutter?",
                            options: [
                                "A. Container",
                                "B. Text",
                                "C. Image",
                                "D. Button"
                            ],
                            correctAnswer: "A",
                            timeLimit: 10
                        },
                        {
                            id: "flutter_q5",
                            question: "What is the purpose of MaterialApp widget?",
                            options: [
                                "A. Handle routing",
                                "B. Implement Material Design",
                                "C. Manage state",
                                "D. Create animations"
                            ],
                            correctAnswer: "B",
                            timeLimit: 10
                        },
                        {
                            id: "flutter_q6",
                            question: "Which package is used for state management in Flutter?",
                            options: [
                                "A. http",
                                "B. provider",
                                "C. path",
                                "D. intl"
                            ],
                            correctAnswer: "B",
                            timeLimit: 10
                        },
                        {
                            id: "flutter_q7",
                            question: "What is hot reload in Flutter?",
                            options: [
                                "A. App reinstallation",
                                "B. Instant UI updates",
                                "C. Database refresh",
                                "D. Cache clearing"
                            ],
                            correctAnswer: "B",
                            timeLimit: 10
                        },
                        {
                            id: "flutter_q8",
                            question: "Which widget is used for scrollable lists?",
                            options: [
                                "A. ScrollView",
                                "B. ListView",
                                "C. GridView",
                                "D. Column"
                            ],
                            correctAnswer: "B",
                            timeLimit: 10
                        },
                        {
                            id: "flutter_q9",
                            question: "What is pubspec.yaml used for?",
                            options: [
                                "A. Store app data",
                                "B. Define dependencies",
                                "C. Handle routing",
                                "D. Manage state"
                            ],
                            correctAnswer: "B",
                            timeLimit: 10
                        },
                        {
                            id: "flutter_q10",
                            question: "Which widget is used for handling gestures?",
                            options: [
                                "A. GestureRecognizer",
                                "B. GestureDetector",
                                "C. TouchHandler",
                                "D. EventListener"
                            ],
                            correctAnswer: "B",
                            timeLimit: 10
                        }
                    ]
                }
            ]
        };

        const fetchQuestions = () => {
            try {
                // Fetch call with AXIOS when API is there
                if (userDetails?.topic) {
                    const category = mockQuizData.categories.find(cat => cat.id === userDetails.topic);
                    if (category) {
                        setQuestions(category.questions);
                        setNotAnswered(category.questions.length - 1);
                        setTimer(category.questions[0]?.timeLimit || 10);
                    } else {
                        console.error('Category not found');
                    }
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, [userDetails]);

    const handleTimerExpiry = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer('');
            setTimer(questions[currentQuestionIndex]?.timeLimit || 10);
            setUserProgress({
                correctAnswers: correctAnswerCount,
                incorrectAnsweres: incorrectAnswerCount,
                notAnswered: notAnswered,
                progress: ((currentQuestionIndex + 1) / questions.length) * 100
            });
            return true;
        } else {
            navigate('/results');
            return false;
        }
    };

    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    const shouldContinue = handleTimerExpiry();
                    return shouldContinue ? 10 : 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [currentQuestionIndex, questions.length]);

    const handleAnswerSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedAnswer(event.target.value);
    };

    const handleNextQuestion = () => {
        if (selectedAnswer && questions[currentQuestionIndex]) {
            const isCorrect = selectedAnswer === questions[currentQuestionIndex].correctAnswer;
            if (isCorrect) {
                setCorrectAnswerCount(prev => prev + 1);
            } else {
                setIncorrectAnswerCount(prev => prev + 1);
            }
            setTimer(questions[currentQuestionIndex]?.timeLimit || 10);
        }

        // Calculate progress
        const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
        setNotAnswered(notAnswered - 1);
        
        // Update progress
        setUserProgress({
            correctAnswers: correctAnswerCount + (selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 1 : 0),
            incorrectAnsweres: incorrectAnswerCount + (selectedAnswer && selectedAnswer !== questions[currentQuestionIndex].correctAnswer ? 1 : 0),
            notAnswered,
            progress
        });

        // Move to next question or finish quiz
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer('');
            setTimer(10);
        } else {
            navigate('/results');
        }
    };

    const skipQuestion = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer('');
            setTimer(questions[currentQuestionIndex + 1]?.timeLimit || 10);
        } else {
            navigate('/results');
        }
    };

    if (!questions.length) return <div>Loading...</div>;

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / questions.length) * 100;

    return (
        <div className="quizPage">
            <div className='flexCenterBetween'>
                <span className="quizNumber">
                    <span className="primaryText">{currentQuestionIndex + 1}</span>/{questions.length}
                </span>
                <span className={`timer ${timer <= 3 ? 'primaryText' : ''}`}>{timer < 10 ? `0:0${timer}` : `0:${timer}`}</span>
            </div>
            <div className="progressBar">
                <div className="progressFill" style={{ width: `${progress}%` }} />
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleNextQuestion(); }}>
                <div className="question">
                    {currentQuestionIndex + 1}. {currentQuestion.question}
                </div>
                <div className="options">
                    {currentQuestion.options.map((option, index) => (
                        <CustomRadio
                            key={index}
                            id={`option${index}`}
                            name="answer"
                            value={String.fromCharCode(65 + index)}
                            checked={selectedAnswer === String.fromCharCode(65 + index)}
                            onChange={handleAnswerSelect}
                            label={option}
                        />
                    ))}
                </div>
                <div className="actions">
                    <button className="btn" type="submit" disabled={!selectedAnswer?true:false}>Next</button>
                    <a href="#" onClick={skipQuestion}>Skip this question</a>
                </div>
            </form>
        </div>
    );
}

export default QuizPage;