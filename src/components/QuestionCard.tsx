import React from 'react';
import {AnswerObject} from '../App';

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
    <div>
        <p className = "number">Question:{questionNb}/{totalQuestions}</p>
        <p dangerouslySetInnerHTML ={{__html: question}}/>
        <div>
            {answers.map((answer)=>(
                <div key={answer}>
                    <button disabled={userAnswer?true:false} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{__html:answer}}></span>
                    </button>
                </div>
            ))}
        </div>
    </div>
)

export default QuestionCard;