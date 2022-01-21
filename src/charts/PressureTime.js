import { Chart, registerables } from 'chart.js'
import { getRelativePosition } from 'chart.js/helpers'
import annotationPlugin from 'chartjs-plugin-annotation'
import { Scatter } from 'react-chartjs-2'
import { useRef, useState } from 'react'
import regression from 'regression'
import { Result } from '../components'

function PressureTime(props) {
  const [regressionLine, setRegressionLine] = useState(0)
  const [annotations, setAnnotations] = useState(null)

  const chartRef = useRef(null)

  Chart.register(...registerables, annotationPlugin)

  const data = {
    datasets: [
      {
        label: 'Pressure vs time',
        data: props.data,
        backgroundColor: 'green',
      },
    ],
  }

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: props.xAxisName,
        },
        reverse: props.type === 'Horner method',
      },
      y: {
        title: {
          display: true,
          text: 'Pressure, atm',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: props.type,
        position: 'bottom',
        font: {
          size: 14,
          weight: 'bold',
        },
      },
      tooltip: {
        // enabled: false,
      },
      annotation: {
        annotations,
      },
    },
    onClick: (e) => {
      if (chartRef.current && props.type) {
        const canvasPosition = getRelativePosition(e, chartRef.current)
        const dataX = chartRef.current.scales.x.getValueForPixel(
          canvasPosition.x
        )
        console.log(dataX)

        const regressionArray = []
        if (props.type === 'MDH method') {
          for (let item of props.data) {
            if (item[0] >= dataX) {
              regressionArray.push(item)
            }
          }
        }
        if (props.type === 'Horner method') {
          for (let item of props.data) {
            if (item[0] <= dataX) {
              regressionArray.push(item)
            }
          }
        }
        console.log(regressionArray)
        console.log(regressionArray[regressionArray.length - 1])

        const result = regression.linear(regressionArray)
        setRegressionLine(result)
        console.log(result)
        console.log(result.predict(2))

        if (result.r2 && props.type === 'MDH method') {
          //check to see when click out of range no error in console
          chartRef.current.options.plugins.annotation.annotations = {
            line1: {
              type: 'line',
              xMin: dataX - 0.5,
              yMin: result.predict(dataX - 0.5)[1],
              xMax: regressionArray[regressionArray.length - 1][0],
              yMax: result.predict(
                regressionArray[regressionArray.length - 1][0]
              )[1],
              borderColor: 'black',
              borderWidth: 2,
              label: {
                enabled: true,
                content: result.string,
                backgroundColor: '#000',
                padding: 10,
                xAdjust: -150,
                // yAdjust: -10,
              },
            },
          }
        }
        if (result.r2 && props.type === 'Horner method') {
          //check to see when click out of range no error in console
          chartRef.current.options.plugins.annotation.annotations = {
            line1: {
              type: 'line',
              xMin: dataX + 0.5,
              yMin: result.predict(dataX + 0.5)[1],
              xMax: regressionArray[regressionArray.length - 1][0],
              yMax: result.predict(
                regressionArray[regressionArray.length - 1][0]
              )[1],
              borderColor: 'black',
              borderWidth: 2,
              label: {
                enabled: true,
                content: result.string,
                backgroundColor: '#000',
                padding: 10,
                xAdjust: -150,
                // yAdjust: -10,
              },
            },
          }
        }
        chartRef.current.update()
        setAnnotations(chartRef.current.options.plugins.annotation.annotations)
      }
    },
  }
  return (
    <>
      <Scatter
        options={options}
        data={data}
        ref={chartRef}
        style={{ cursor: 'crosshair' }}
      />
      <Result type={props.type} regressionLine={regressionLine} />
    </>
  )
}

export default PressureTime
