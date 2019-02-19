import React, { Component, useEffect } from 'react';
import './App.css';
import Answers from "./components/Answers";
import Question from "./components/Question";
import * as data from './data/questions.js';
import * as answers from './data/answers.js';

import LinearProgress from '@material-ui/core/LinearProgress';

class App extends Component {
  state = {
    question:{},
    answers:[],
    onQuestion:0,
    userScore:0,
    triviaFinished:false
  }

  componentDidMount(){
    let newAnswers = answers.answers.filter((a)=>(a.question_id === this.state.onQuestion))
    this.setState({
      question:data.questions[this.state.onQuestion],
      answers: newAnswers[0].answers
    })
  }

  nextQuestion = () => {
    let nextQuestionNumber = this.state.onQuestion + 1
    if(nextQuestionNumber >= data.questions.length){
      this.setState({
        triviaFinished:true,
      })
    }else{
      let newAnswers = answers.answers.filter((a)=>(a.question_id === nextQuestionNumber))
      this.setState({
        onQuestion:nextQuestionNumber,
        answers:newAnswers[0].answers,
        question:data.questions[nextQuestionNumber]
      })
    }
  }

  updateUserScore = () => {
    let updatedUserScore = this.state.userScore + 1
    this.setState({userScore:updatedUserScore})
  }

  resetTriva = () =>{
    let newAnswers = answers.answers.filter((a)=>(a.question_id === 0))
    this.setState({
      question:data.questions[0],
      answers:newAnswers[0].answers,
      onQuestion:0,
      userScore:0,
      triviaFinished:false
    })
  }

  render() {
    const Results = (
      <div>
        <h1>You scored {this.state.userScore}/{data.questions.length}!</h1>
        <button onClick={()=>this.resetTriva()}>Would you like To try again?</button>
      </div>
    )

    return (
      <div className="App">
        <UpdateDocumentTitle question={this.state.onQuestion + 1} questions={data.questions.length} />
        <h1>Welcome to the Fantastic Beasts Trivia Application!</h1>
        <ProgressBar complete={this.state.triviaFinished} onQuestion={this.state.onQuestion} questionLength={data.questions.length}/>
        {this.state.triviaFinished ? 
          Results 
          : 
          <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
            <Question q={this.state.question} />
            <Answers 
              a={this.state.answers}
              nextQuestion={this.nextQuestion}
              updateUserScore={this.updateUserScore}
            />
          </div>
        }
      </div>
    );
  }
}

export default App;

function UpdateDocumentTitle({question, questions}){
  useEffect(()=>{
    document.title = `Question ${question}/${questions}`;
  })
  return null
}

function ProgressBar(props) {
  const { complete, onQuestion, questionLength} = props;
  return (
    <div>
      <LinearProgress variant="determinate" value={complete ? 100 : (onQuestion/questionLength)*100} />
    </div>
  );
}
