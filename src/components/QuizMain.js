import React, { Component } from 'react'
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
        score: 0,
        correctAnswerValue: ''
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
                function escapeHtml(unsafe) {
                    return unsafe
                         .replace(/&amp;/g, "&")
                         .replace(/&lt;/g, "<")
                         .replace(/&gt;/g, ">")
                         .replace(/&quot;/g, '"')
                         .replace(/&#039;/g, "'");
                 }
                value.question = escapeHtml(value.question);
                value.correct_answer = escapeHtml(value.correct_answer);
                value.incorrect_answers = value.incorrect_answers.map(function (value, label) {
                    return escapeHtml(value);
                });
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
                clickedAnswer: index,
                correctAnswerValue: correctAnswers[step]
            })
        } else {
            this.setState({
                correctAnswer: false,
                clickedAnswer: index,
                correctAnswerValue: correctAnswers[step]
            })
        }
    }
    nextQuestion = step => {
        this.setState({ step: step + 1, clickedAnswer: 0, correctAnswer: 0 })
    }
    refreshPage = () => {
        window.location.reload(false);
      }
    render() {
        let { questions, step, answers, clickedAnswer, correctAnswer, score, correctAnswerValue } = this.state;
        return (
            <div className='answer'>
                <div className="Content">
                    {
                        step <= Object.keys(questions).length ?
                            (<div>
                                <h1><span className="count">{step} of 10 questions</span></h1>
                                <span className='score'>Score : <span>{score}</span></span>
                                <Question
                                    question={questions[step]}
                                />
                                <Answer
                                    answer={answers[step]}
                                    step={step}
                                    checkAnswer={this.checkAnswer}
                                    correctAnswer={correctAnswer}
                                    clickedAnswer={clickedAnswer}
                                    correctAnswerValue = {correctAnswerValue}
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
                                    <button onClick={() => this.refreshPage()}
                                    className="NextStep" >Play Again</button>
                                </div>
                            )}
                </div>
            </div>
        )
    }
}

export default QuizMain
