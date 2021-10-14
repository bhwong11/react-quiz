import React,{useState} from 'react';
import { Redirect } from 'react-router-dom';
import {fetchQuizQuestions,QuestionState,Difficulty} from '../API'

import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/auth";
import { RootState } from "../reducers";
import QuestionCard from './QuestionCard';
import {QuizModel} from '../models'
//styles
import { GlobalStyle, Wrapper } from './home.styles';

export type AnswerObject = {
  question:string;
  answer:string;
  correct:boolean;
  correctAnswer:string;
}

const TOTAL_QUESTIONS=10;

const required = (value:any) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Home=(props:any)=>{
    const {user:currentUser, isLoggedIn:isLoggedIn} = useSelector((state: RootState)=>state.auth)


    const [loading,setLoading]=useState(false);
    const [questions,setQuestions]=useState<QuestionState[]>([]);
    const [number,setNumber] = useState(0);
    const [userAnswers,setUserAnswers] = useState<AnswerObject[]>([]);
    const [score,setScore]=useState(0);
    const [gameOver,setGameOver]=useState(true);
    const [difficulty,setDifficulty]=useState(null);
  
    const selectDiff = (e:any)=>{
      setDifficulty(e.target.value)
      startTrivia()
    }

    const startTrivia = async ()=>{
      try{
        setLoading(true)
        setGameOver(false)
        let diffSetting = null
        if(difficulty==='hard'){
          diffSetting=Difficulty.HARD
        }else if(difficulty==='medium'){
          diffSetting=Difficulty.MEDIUM
        }else{
          diffSetting=Difficulty.EASY
        } 
        const newQuestions = await fetchQuizQuestions(
        TOTAL_QUESTIONS,
        diffSetting
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
  
    const checkAnswer = async (e: React.MouseEvent<HTMLButtonElement>)=>{
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
          if(number===9){
            let finalQScore: number = answerObject.correct?1:0;
            setDifficulty(null)
            setGameOver(true)
            console.log("SENDING REQUIEST")
            if(isLoggedIn){
              await QuizModel.create({
                questions,
                difficulty,
                score:score+finalQScore,
                user:currentUser.user._id
                }).then(json=>{
                  console.log(json)
                })
            }
        }
        }
    }
    
    const nextQuestion = async()=>{
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
        <div className="gobal-style">
        </div>
        <div className="wrapper">
        <h1>REACT QUIZ</h1>
          <>
          {
            gameOver || userAnswers.length==TOTAL_QUESTIONS?(
              <>
              <><button onClick = {selectDiff} value='easy'>easy</button>
              <button onClick = {selectDiff} value='medium'>medium</button>
              <button onClick = {selectDiff} value='hard'>hard</button></>
              </>
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
          </>
        </div>
      </>
    );
}

export default Home;