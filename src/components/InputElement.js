import { useInputContext } from '../context/input_context'
import styled from 'styled-components'

const InputElement = ({ type, label }) => {
  const { setInput, ...state } = useInputContext()
  return (
    <InputElementWrapper>
      <label htmlFor={type}>{label}</label>
      <input
        type='number'
        id={type}
        name={type}
        value={state[type]}
        onChange={setInput}
      />
    </InputElementWrapper>
  )
}

const InputElementWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  justify-items: space-between;

  label {
    place-self: center;
  }

  input {
    padding: 0.5rem;
    width: 5rem;
    text-align: center;
    outline: none;
    border: 1px solid #a1a1a1;
    border-radius: 10px;
    margin: auto;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
`

export default InputElement
