import { createContext, useState } from "react";

interface UserDetails {
  topic: string;
  fullName: string;
  Timeout: number;
}

interface UserProgress {
  correctAnswers: number;
  incorrectAnsweres: number;
  notAnswered: number;
  progress: number;
}

const CommonContext = createContext({
  deleteUserFun: () => { },
  showLoader: false,
  setShowLoader: (value: boolean) => { },
  userDetails: null as UserDetails | null,
  setUserDetails: (value: UserDetails | null) => { },
  userProgress: null as UserProgress | null,
  setUserProgress: (value: UserProgress | null) => { }
});

function CommonProvider({ children }: React.PropsWithChildren<{}>) {
  const [showLoader, setShowLoader] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);

  const deleteUserFun = () => {
    setUserDetails(null);
    setUserProgress(null);
    localStorage.removeItem('quizLog');
  }

  return (
    <CommonContext.Provider
      value={{
        deleteUserFun, showLoader, setShowLoader, userDetails, setUserDetails, userProgress, setUserProgress
      }}
    >
      {children}
    </CommonContext.Provider>
  );
}

export { CommonProvider, CommonContext };
