import styled from 'styled-components'
import { useInputContext } from '../context/input_context'
import { InputElement } from '.'

const Input = () => {
  const { setImport } = useInputContext()
  return (
    <InputWrapper>
      <h1>Input data</h1>
      <InputElement type='porosity' label='Porosity (%)' />
      <InputElement type='viscosity' label='Viscosity (cp)' />
      <InputElement type='effectiveThickness' label='EffectiveThickness (ft)' />
      <InputElement type='fvf' label='FVF (bbl/STB)' />
      <InputElement
        type='totalCompressibility'
        label='Total compressibility (1/psi)'
      />
      <InputElement type='wellRadius' label='Well radius (ft)' />
      <InputElement type='rate' label='Flowing rate (STB/day)' />
      <InputElement type='productionTime' label='Production time (hour)' />
      <label htmlFor='file' className='file'>
        Import Pressure data
      </label>
      <input id='file' type='file' accept='.xlsx' onChange={setImport} hidden />
    </InputWrapper>
  )
}

const InputWrapper = styled.form`
  display: grid;
  grid-auto-rows: min-content;
  grid-row-gap: 1rem;
  background: #c8c8c8;
  padding: 1rem;

  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */

  h1 {
    margin: auto;
  }

  .file {
    width: max-content;
    margin: auto;
    padding: 0.8rem;
    background: green;
    color: white;
    border-radius: 10px;
    letter-spacing: 2px;
    cursor: pointer;
  }
`

export default Input
