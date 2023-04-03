import React, { useState } from 'react';
import './styles.module.css';

function Form() {
const [questions, setQuestions] = useState([]);
const [question, setQuestion] = useState('');
const [questionType, setQuestionType] = useState('');
const [options, setOptions] = useState([]);
const [selectedOption, setSelectedOption] = useState('');
const [selectedOptions, setSelectedOptions] = useState([]);
const [answer, setAnswer] = useState('');


const handleSubmit = (event) => {
event.preventDefault();
let newQuestion = { question, questionType };
if (questionType === 'text') {
newQuestion.answer = event.target.answer.value;
} else if (questionType === 'radio') {
newQuestion.options = options;
newQuestion.answer = selectedOption;
} else if (questionType === 'checkbox') {
newQuestion.options = options;
newQuestion.answer = selectedOptions;
}
setQuestions([...questions, newQuestion]);
setQuestion('');
setQuestionType('');
setOptions([]);
setSelectedOption('');
setSelectedOptions([]);
};

const handleQuestionTypeChange = (event) => {
setQuestionType(event.target.value);
};

const handleOptionChange = (event) => {
const optionValue = event.target.value;
if (questionType === 'radio') {
setSelectedOption(optionValue);
} else if (questionType === 'checkbox') {
const isSelected = event.target.checked;
if (isSelected) {
setSelectedOptions([...selectedOptions, optionValue]);
} else {
setSelectedOptions(selectedOptions.filter((option) => option !== optionValue));
}
}
};

const addOption = () => {
setOptions([...options, '']);
};

const handleOptionTextChange = (event, index) => {
const newOptions = [...options];
newOptions[index] = event.target.value;
setOptions(newOptions);
};


const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleQuestionBlur = (event) => {
    setQuestion(event.target.value + '?');
  };

  const handleBoldClick = () => {
    setQuestion("<b>" + question + "</b>");
  };

  const handleItalicClick = () => {
    setQuestion("<i>" + question + "</i>");
  };

  const handleUnderlineClick = () => {
    setQuestion("<u>" + question + "</u>");
  };

  const handleLinkChange = (event) => {
    setQuestion('<a href="' + event.target.value + '">' + question + '</a>');
  };


  const handleUpdateQuestion = (index, newQuestion, newQuestionType) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {
      question: newQuestion,
      questionType: newQuestionType,
      answer: questions[index].answer,
      options: questions[index].options
    };
    setQuestions(updatedQuestions);
  };
  
  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };
  


  
return (
<>
 
<form onSubmit={handleSubmit} className="form-container">
      <label>
        Question:
        <input type="text" value={question} onChange={handleQuestionChange} onBlur={handleQuestionBlur} />
      </label>
      <br />
      <button type="button" onClick={handleBoldClick}>Bold</button>
      <button type="button" onClick={handleItalicClick}>Italic</button>
      <button type="button" onClick={handleUnderlineClick}>Underline</button>
      <button type='button' onClick={handleLinkChange}>Link</button>
      <br />

<div>
      
      <select id="question-type" value={questionType} onChange={handleQuestionTypeChange} className="form-container select" >
        <option  >Type Question</option>
        <option value="text"className='form-container input[type="text"]'>Text</option>
        <option value="radio">Radio</option>
        <option value="checkbox">Checkbox</option>
      </select>
    </div>

    {questionType === 'text' && (
  <div>
    <label htmlFor="answer" className='answer'>Answer:</label>
    <input type="text " id="answer" value={answer} onChange={(event) => setAnswer(event.target.value)} className="form-container input" />
  </div>
)}


    {questionType === 'radio' && (
      <div>
        <label htmlFor="options" className='option-label'>Options:</label>
        {options.map((option, index) => (
          <div key={index} className='option-item'>
            <input type="radio" id={`option${index}`} name="options" value={option} onChange={handleOptionChange} checked={selectedOption === option}  />
            <input type="text" value={option} onChange={(event) => handleOptionTextChange(event, index)} className='option-inputtext' />
          </div>
        ))}
        <button type="button" onClick={addOption} className="add-option-button">Add Option</button>
      </div>
    )}

    {questionType === 'checkbox' && (
      <div>
        <label htmlFor="options" className='options-container '>Options:</label>
        {options.map((option, index) => (
          <div key={index}>
            <input type="checkbox" id={`option${index}`} name="options" value={option} onChange={handleOptionChange} checked={selectedOptions.includes(option)}  />
<input type="text" value={option} onChange={(event) => handleOptionTextChange(event, index)} className='option-inputtext'/>
</div>
))}
<button type="button" onClick={addOption} className='add-option-button'>Add Option</button>
</div>
)}

<label >
    
    <button type="submit" id="submit-button" className='submit-label'>Submit</button>
  </label>

  </form>
  <div>
    <label>
    <h2 className='questions-container'>Questions</h2>
    </label>
    <label>
    <ul>
    <div class="question-predefined">
  {questions.map((q, index) => (
    <li key={index}>
      <div className='question-item'>{q.question}</div>
      {q.questionType === 'text' && <div className='question-title'>{q.answer}</div>}
      {q.questionType === 'radio' && (
        <div className='question-title'>
          {q.options.map((option, index) => (
            <div key={index}>
              <input type="radio" id={`option${index}`} name={`question${index}`} value={option} checked={option === q.answer} />
              <label htmlFor={`option${index}`}>{option}</label>
            </div>
          ))}
        </div>
      )}
      
      {q.questionType === 'checkbox' && (
        <div className='question-item'>
          {q.options.map((option, index) => (
            <div key={index}>
              <input type="checkbox" id={`option${index}`} name={`question${index}`} value={option} checked={q.answer.includes(option)} />
              <label htmlFor={`option${index}`}>{option}</label>
            </div>
          ))}
        </div>
      )}
    </li>
    
  ))}
</div>
{questions.map((question, index) => (
        <div key={index} className="question-predefined">
          <h4>{question.question}</h4>
          {question.options && question.options.map((option, index) => (
            <div key={index}>
              {question.questionType === 'radio' && (
                <input type="radio" name={`question-${index}`} value={option} />
              )}
              {question.questionType === 'checkbox' && (
                <input type="checkbox" name={`question-${index}`} value={option} />
              )}
              {option}
            </div>
          ))}
          {question.answer && (
            <div>
              <label>Answer: </label>
              <span>{question.answer}</span>
            </div>
          )}
          <button type="button" onClick={() => handleUpdateQuestion(index)}>Update</button>
          <button type="button" onClick={() => handleDeleteQuestion(index)}>Delete</button>
        </div>
      ))}
    </ul>
    </label>
  </div>
</>
);
}
export default Form;
