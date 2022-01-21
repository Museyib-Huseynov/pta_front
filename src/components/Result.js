import React from 'react'
import styled from 'styled-components'
import { useInputContext } from '../context/input_context'

function Result({ type, regressionLine }) {
  const {
    porosity,
    viscosity,
    totalCompressibility,
    wellRadius,
    fvf,
    effectiveThickness,
    rate,
    productionTime,
    importedData,
  } = useInputContext()

  const allInputsFilled =
    porosity !== '' &&
    viscosity !== '' &&
    totalCompressibility !== '' &&
    wellRadius !== '' &&
    fvf !== '' &&
    effectiveThickness !== '' &&
    rate !== '' &&
    productionTime !== ''

  const inputEmptyWarning = (
    <p className='warning'>Please fill all input data</p>
  )
  const regressionWarning = (
    <p className='warning'>Please draw the regression line</p>
  )

  const calcPerm = () => {
    if (!regressionLine) return null
    if (!allInputsFilled) return null
    const slope = Math.abs(regressionLine.equation[0])
    return (
      (162.6 * rate * fvf * viscosity) /
      (slope * effectiveThickness)
    ).toFixed(1)
  }

  const permeability = calcPerm()

  const calcSkin = () => {
    if (!regressionLine) return null
    if (!allInputsFilled) return null
    const slope = Math.abs(regressionLine.equation[0])
    let pressureAtOneHour = 0
    if (type === 'MDH method') {
      pressureAtOneHour = regressionLine.predict(0)[1]
    }
    if (type === 'Horner method') {
      pressureAtOneHour = regressionLine.predict(
        Math.log10((productionTime + 1) / 1)
      )[1]
    }
    const flowingWellborePressure = importedData[0][1]
    return (
      1.151 *
      ((pressureAtOneHour - flowingWellborePressure) / slope -
        Math.log10(
          permeability /
            (porosity *
              viscosity *
              totalCompressibility *
              Math.pow(wellRadius, 2))
        ) +
        3.23)
    ).toFixed(1)
  }

  const skin = calcSkin()

  if (!type) return null
  return (
    <ResultWrapper>
      {!allInputsFilled ? inputEmptyWarning : null}
      {!regressionLine ? regressionWarning : null}
      <table>
        <tbody>
          <tr>
            <th colSpan='2'>Results</th>
          </tr>
          <tr>
            <td>Permeability (mD)</td>
            <td>{permeability}</td>
          </tr>
          <tr>
            <td>Skin factor</td>
            <td>{skin}</td>
          </tr>
        </tbody>
      </table>
    </ResultWrapper>
  )
}

const ResultWrapper = styled.div`
  margin: auto;

  table,
  th,
  td {
    border: 1px solid #000;
    text-align: center;
    padding: 10px;
  }

  table {
    border-collapse: collapse;
    width: 300px;
  }

  th {
    background: #c8c8c8;
    color: #000;
  }

  td:first-of-type {
    width: 200px;
  }

  .warning {
    color: red;
    margin-bottom: 0.5rem;
  }
`

export default Result
