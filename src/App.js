import { Home } from './pages'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PressureTime from './charts/PressureTime'
import { useInputContext } from './context/input_context'

function App() {
  let { importedData, productionTime } = useInputContext()
  const MDH_data = importedData.map((item) => [Math.log10(item[0]), item[1]])

  const Horner_data = []
  if (productionTime) {
    for (let item of importedData) {
      if (item[0] === 0) continue
      Horner_data.push([
        Math.log10((+productionTime + item[0]) / item[0]),
        item[1],
      ])
    }
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route
            index
            element={
              <main
                style={{
                  padding: '2rem',
                  textAlign: 'center',
                }}
              >
                <h2>Select a method for calculation</h2>
              </main>
            }
          />
          <Route
            path='mdh'
            element={
              <PressureTime
                data={MDH_data}
                type='MDH method'
                xAxisName='Log (Δt)'
                key='1'
              />
            }
          />
          <Route
            path='horner'
            element={
              <PressureTime
                data={Horner_data}
                type='Horner method'
                xAxisName='Log (Horner time ratio)'
                key='2'
              />
            }
          />
          <Route
            path='agarwal'
            element={
              <PressureTime
                data={MDH_data}
                type='MDH method'
                xAxisName='Log(Δt)'
              />
            }
          />
        </Route>
        <Route
          path='*'
          element={
            <main style={{ padding: '1rem' }}>
              <p>Oops! There is nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
