import React from'react';
import './Answer.css';

const Answer = (props) => {

    let answer = Object.keys(props.answer)
    .map((qAnswer,i)=>(
        <li className = {
            props.correctAnswer && (props.clickedAnswer === qAnswer) ?
            'correct' : 
            props.clickedAnswer === qAnswer ?
            'incorrect' : ''
        }
        onClick = {() => props.checkAnswer(props.answer[qAnswer],qAnswer)}
        key={qAnswer}> {props.answer[qAnswer]} </li>
    ))
    return (
        <>
        <ul disabled={props.clickedAnswer ? true : false} className="Answers">
            {answer}
        </ul>
        <div>
            {props.correctAnswer ? 'Correct Answer !' :
            props.clickedAnswer ? 'Wrong Answer' : ''}
        </div>
        </>
    )
}

export default Answer;