import React,{useState} from 'react';
import {fetchQuizQuestions} from './API'

import Routes from './config/routes'

//components
import QuestionCard from './components/QuestionCard';
import { QuestionState,Difficulty } from './API';
//styles
import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject = {
  question:string;
  answer:string;
  correct:boolean;
  correctAnswer:string;
}

const TOTAL_QUESTIONS=10;

function App() {
  const [loading,setLoading]=useState(false);
  const [questions,setQuestions]=useState<QuestionState[]>([]);
  const [number,setNumber] = useState(0);
  const [userAnswers,setUserAnswers] = useState<AnswerObject[]>([]);
  const [score,setScore]=useState(0);
  const [gameOver,setGameOver]=useState(true);


  const startTrivia = async ()=>{
    try{
      setLoading(true)
      setGameOver(false)
      const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    console.log(newQuestions)
    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  }catch(error:any){
      console.log(`something went wrong`)
    }
  
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>)=>{
      if(!gameOver){
        //user answer
        const answer = e.currentTarget.value;
        //compare answers
        const correct = questions[number].correct_answer===answer;
        if(correct){
          setScore(prev=>prev+1)
        }
        //save answer in the array for user answers
        const answerObject ={
          question: questions[number].question,
          answer,
          correct,
          correctAnswer:questions[number].correct_answer,
        };
        setUserAnswers(prev=>[...prev,answerObject])
        console.log(answer)
      }
  }
  
  const nextQuestion =()=>{
    //move on the next question if not on the last question
    const nextQuestion = number +1;

    if(nextQuestion===TOTAL_QUESTIONS){
      setGameOver(true);
    }else{
      setNumber(nextQuestion)
    }
  }

  return (
    <>
    <GlobalStyle/>
    <Wrapper>
      <h1>REACT QUIZ</h1>
      {
        gameOver || userAnswers.length==TOTAL_QUESTIONS?(
          <button className="start" onClick={startTrivia}>Start</button>
        ):<div>Game Started</div>
      }
      {
        !gameOver?<p className="score">score:{score}</p>:null
      }
      {
        loading&&(<p>Loading Questions...</p>)
      }
      {
        !loading&&!gameOver && (
          <QuestionCard 
          questionNb ={number+1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number]:undefined}
          callback={checkAnswer}
          />
        )
      }
      {
        !gameOver && !loading && userAnswers.length === number +1 && number!==TOTAL_QUESTIONS-1?(
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ):null
      }
      
      </Wrapper>
      <Routes />
    </>
  );
}

export default App;
