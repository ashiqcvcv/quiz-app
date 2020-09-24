import React, { Component } from 'react'
import './QuizMain.css';
import Question from './question/Question';
import Answer from './answer/Answer';

export class QuizMain extends Component {

    state = {
        questions: {
            1: ''
        },
        answers: {
            1: {
                1: '',
                2: '',
                3: ''
            }
        },
        correctAnswers: {
            1: ''
        },
        correctAnswer: false,
        clickedAnswer: false,
        step: 1,
        score: 0
    }

    componentDidMount(){
        // https://opentdb.com/api_config.php
        fetch('https://opentdb.com/api.php?amount=10')
        .then(response => response.json())
        .then(response =>{
            var temp = {
                questions : {},
                answers : {},
                correctAnswers : {}
            }
            response = response.results
            response.forEach(function(value, key) {
                value.question = value.question.replace(/(&quot)/g,"\"")
                temp.questions[key+1] = value.question;
                temp.correctAnswers[key+1] = value.correct_answer;
                value.incorrect_answers.push(value.correct_answer);
                function shuffleArray(array) {
                    for (let i = array.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [array[i], array[j]] = [array[j], array[i]];
                    }
                }
                shuffleArray(value.incorrect_answers);
                temp.answers[key+1] = value.incorrect_answers.reduce(function(acc, cur, i) {
                    acc[i+1] = cur;
                    return acc;
                  }, {});
            })
            this.setState({
                questions : temp.questions,
                answers : temp.answers,
                correctAnswers : temp.correctAnswers
            })
        })
    }

    checkAnswer = (answer,index) => {
        const { correctAnswers, step, score } = this.state;
        if (answer === correctAnswers[step]) {
            this.setState({
                score: score + 1,
                correctAnswer: true,
                clickedAnswer: index
            })
        } else {
            this.setState({
                correctAnswer: false,
                clickedAnswer: index
            })
        }
    }
    nextQuestion = step => {
        this.setState({ step: step + 1, clickedAnswer: 0, correctAnswer: 0 })
    }
    render() {
        let { questions, step, answers, clickedAnswer, correctAnswer, score } = this.state;
        return (
            <div className='answer'>
                <div className="Content">
                    {
                        step <= Object.keys(questions).length ?
                            (<div>
                                <h1><span>{step} of 10 questions</span></h1>
                                <h1>Score : <span>{score}</span></h1>
                                <Question
                                    question={questions[step]}
                                />
                                <Answer
                                    answer={answers[step]}
                                    step={step}
                                    checkAnswer={this.checkAnswer}
                                    correctAnswer={correctAnswer}
                                    clickedAnswer={clickedAnswer}
                                />
                                <button onClick={() => this.nextQuestion(this.state.step)}
                                    className="NextStep" disabled={
                                        clickedAnswer && Object.keys(questions).length >= step
                                            ? false : true
                                    } >Next Question</button>
                            </div>) : (
                                <div className="finalPage">
                                    <h1>You have completed the quiz !</h1>
                                    <p>Your score is: {score} of {Object.keys(questions).length}</p>
                                    <p>Thank You</p>
                                </div>
                            )}
                </div>
            </div>
        )
    }
}

export default QuizMain
