import React from 'react';
import {AnswerObject} from '../App';
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
    <Wrapper>
        <p className = "number">Question:{questionNb}/{totalQuestions}</p>
        <p dangerouslySetInnerHTML ={{__html: question}}/>
        <div>
            {answers.map((answer)=>(
                <ButtonWrapper 
                correct={userAnswer?.correctAnswer===answer} 
                key={answer}
                userClicked={userAnswer?.answer===answer}>
                    <button disabled={userAnswer?true:false} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{__html:answer}}></span>
                    </button>
                </ButtonWrapper>
            ))}
        </div>
    </Wrapper>
)

export default QuestionCard;