  import React, { useState } from 'react';
  import { Container, Button, Form } from 'react-bootstrap';

  function Calculator() {
  const [input, setInput] = useState('0');
  const [result, setResult] = useState('');
  const [lastButton, setLastButton] = useState('');

/* document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (/[0-9]/.test(key)) {
    handleNumberClick(key);
  } else if (['+', '-', '*', '/'].includes(key)) {
    handleButtonClick(key);
  } else if (key === '.') {
    handleButtonClick(key);
  } else if (key === 'Enter') {
    handleCalculate();
  } else if (key === 'Escape') {
    handleClear();
  }
}); */

  const handleNumberClick = (value) => {
    if (result !== '') {
      setInput(value);
      setResult('');
    } else {
      if (input === '0' && value !== '0') {
        setInput(value);
      } else if (input !== '0') {
        setInput(input + value);
      }
    }
    setLastButton(value);
  };
  
  const handleButtonClick = (value) => {
  if (result !== '') {
    // использование предыдущего результата
    if (value === '0') {
      setInput(result + value);
      setResult('');
    } else {
      setInput(result + value);
      setResult('');
    }
    setLastButton(value);
  } else {
    // остальная логика кнопок
    if (value === '.') {
        if (input === '' || ['+', '-', '*', '/'].includes(input.slice(-1))) {
          setInput(input + '0' + value);
        } else if (!/\.\d*$/.test(input)) {
          setInput(input + value);
        }
    } else if (['+', '-', '*', '/'].includes(value) && ['+', '-', '*', '/'].includes(lastButton)) {
      const newInput = input.slice(0, -1) + value;
      setInput(newInput);
      setLastButton(value);
    } else {
      console.log(typeof input);

      if (input.endsWith('.') && ['+', '-', '*', '/'].includes(value)) {
        const newInput = input.slice(0, -1) + value;
        setInput(newInput);
        setLastButton(value);
      } else {
        if (input === '0' && !['+', '-', '*', '/'].includes(value)) {
          setInput(value);
        } else {
          setInput(input + value);
        }
        setLastButton(value);
      }
    }
  }
};
  
  const handleClear = () => {
    setInput('0');
    setResult('');
    setLastButton('');
  };
  
  const handleCalculate = () => {
    try {
      const calculatedResult = eval(input);
      setInput(calculatedResult.toString());
      setResult(calculatedResult.toString());
      setLastButton('');
    } catch (error) {
      setResult('Error');
    }
  };
  
  return (
    <Container>
      <h1> NOTстильный калькулятор</h1>
      <section className='calculator'>
        <ul className='calculator-buttons' style={{marginBottom: '20px'}}>
          <li><Button onClick={handleClear} className='clear-button'>C</Button></li>
          <li>
            <Form.Control 
              style={{ width: '290px', height: '45px', textAlign: 'right'}}
              value={input}
              readOnly
            />
          </li>
        </ul>
        <ul className='calculator-buttons'>
          <li><Button onClick={() => handleNumberClick('7')}>7</Button></li>
          <li><Button onClick={() => handleNumberClick('8')}>8</Button></li>
          <li><Button onClick={() => handleNumberClick('9')}>9</Button></li>
          <li><Button onClick={() => handleButtonClick('+')}>+</Button></li>
        </ul>
        <ul className='calculator-buttons'>
          <li><Button onClick={() => handleNumberClick('4')}>4</Button></li>
          <li><Button onClick={() => handleNumberClick('5')}>5</Button></li>
          <li><Button onClick={() => handleNumberClick('6')}>6</Button></li>
          <li><Button onClick={() => handleButtonClick('-')}>&mdash;</Button></li>
        </ul>
        <ul className='calculator-buttons'>
          <li><Button onClick={() => handleNumberClick('1')}>1</Button></li>
          <li><Button onClick={() => handleNumberClick('2')}>2</Button></li>
          <li><Button onClick={() => handleNumberClick('3')}>3</Button></li>
          <li><Button onClick={() => handleButtonClick('/')}>/</Button></li>
        </ul>
        <ul className='calculator-buttons'>
          <li><Button onClick={() => handleNumberClick('0')}>0</Button></li>
          <li><Button onClick={() => handleButtonClick('.')}>.</Button></li>
          <li><Button onClick={handleCalculate} value={result} className='equality-buttons'>=</Button></li>
          <li><Button onClick={() => handleButtonClick('*')}>X</Button></li>
        </ul>
      </section>
    </Container>
  );
}
export default Calculator;