import React, {useState} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function Answers({a, nextQuestion, updateUserScore}) {
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [submitAnswer, setSubmitAnswer] = useState(false)

    function handleSubmitAnswer(){
        setSubmitAnswer(true)
        if(selectedAnswer.correct){
            updateUserScore()
        }
    }

    function handleNextQuestion(){
        nextQuestion()
        setSelectedAnswer(null)
        setSubmitAnswer(false)
    }

    return (
        <div>
            {a.map((x,i)=> submitAnswer ? 
                <AnswerChoiceSubmitted 
                  key={x.id} 
                  selectedAnswer={selectedAnswer.id === x.id}
                  answer={x}
                />
            :
                <AnswerChoice 
                  key={x.id} 
                  onSelectAnswer={()=>setSelectedAnswer(x)}
                  answer={x}
                />
            )}
            <button onClick={()=>handleSubmitAnswer()} disabled={(selectedAnswer === null)}>Submit</button>
            {submitAnswer ? <button onClick={()=>handleNextQuestion()}>Next Question</button> : null}
        </div>
    );
}
export default Answers;

function AnswerChoice({onSelectAnswer, answer}){
    let answerIndex = {0:'A', 1:'B', 2:'C', 3:'D'}
    return(
        <div style={{display:"flex", justifyContent:'center', alignItems:"left"}}>
            <List component="nav">
                <ListItem onClick={()=>onSelectAnswer()} button>
                    <ListItemText primary={`${answerIndex[answer.id]}) ${answer.answer}` } />
                </ListItem>
            </List>
        </div>
    );
}

function AnswerChoiceSubmitted({answer, selectedAnswer}){
    let answerIndex = {0:'A', 1:'B', 2:'C', 3:'D'}
    return(
        <div style={{display:"flex", justifyContent:'center', alignItems:"left", backgroundColor:(answer.correct ? "green" : (selectedAnswer ? "red": ""))}}>
            <List component="nav">
                <ListItem button>
                    <ListItemText primary={`${answerIndex[answer.id]}) ${answer.answer}` } />
                </ListItem>
            </List>
        </div>
    );
}


// old AnswerChoice = <h1
// onClick={()=>onSelectAnswer()} 
// onMouseEnter={()=>onHoverOver()}
// onMouseLeave={()=>onHoverLeave()}
// style={{backgroundColor:(selectedAnswer === answer.id ? "pink" : "")}}
// >
//     {answerIndex[answer.id]}) {answer.answer}
// </h1>