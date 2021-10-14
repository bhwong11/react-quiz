import React from 'react';
import {AnswerObject} from './home';
import {Wrapper, ButtonWrapper} from './QuestionCard.styles'

type Props = {
    question: string;
    answers:string[];
    callback:(e: React.MouseEvent<HTMLButtonElement>)=>void;
    userAnswer:AnswerObject | undefined;
    questionNb:number;
    totalQuestions:number;
}

const QuestionCard: React.FC<Props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNb,
    totalQuestions
})=>(
    <div className ="wrapper">
        <p className = "number">Question:{questionNb}/{totalQuestions}</p>
        <p dangerouslySetInnerHTML ={{__html: question}}/>
        <div>
            {answers.map((answer)=>(
                <ButtonWrapper 
                correct={userAnswer &&userAnswer.correctAnswer===answer?true:false} 
                key={answer}
                userClicked={userAnswer &&userAnswer.answer===answer?true:false}>
                    <button disabled={userAnswer?true:false} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{__html:answer}}></span>
                    </button>
                </ButtonWrapper>
            ))}
        </div>
    </div>
)

export default QuestionCard;