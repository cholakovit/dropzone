import { useState } from 'react'
import { parse } from 'papaparse'
import { EmployeeResults, showResults } from './Helper'

function App() {

  const [res, setRes] = useState([])

  const results = EmployeeResults(res)

  const onDropped = (e) => {

    e.preventDefault()

    Array.from(e.dataTransfer.files)
    .filter((file) => file.type === 'text/csv')
    .forEach(async (file) => {
      const text = await file.text();
      const result = parse(text, { header: true });

      setRes(result.data);
    })

  }

  let content = showResults(results, res)


  return (
    <div className='App'>
      <h1>Employees Import</h1>
      <div className='dropHere' onDragOver={(e) => { e.preventDefault() }} onDrop={(e) => onDropped(e)}>DROP HERE</div>
        {content}
    </div>
  )
}

export default App




// let i = 0;
// let newArr = []

// const foundDuplicateName = res.find((nnn, index) =>{

//   return res.find((x, ind)=> x.ProjectID === nnn.ProjectID && index !== ind )
//    })
   
//    console.log('foundDuplicateName', foundDuplicateName)

//    function findArrayElementByTitle(array, title) {
//     return array.find((element) => {
//       return element.ProjectID === title;
//     })
//   }

//   const zzz = findArrayElementByTitle(res, foundDuplicateName.ProjectID)

//   console.log('zzz', zzz)

















// const [highlighted, setHighlighted] = useState(false)
// const [res, setRes] = useState([])

// //ProjectID DateFrom DateTo
// //console.log('res', res)
// //console.log('uniqObjs:',uniqObjs);

// EmployeeResults()

// const uniqObjs = [];
// const dupeObjs = [];

// res.forEach(obj => { 
//   [uniqObjs,dupeObjs][+(res.map(obj => obj.ProjectID)
//       .filter(ProjectID => ProjectID === obj.ProjectID).length > 1)]
//       .push(obj)

//   let startDate = new Date(obj.DateFrom)
//   let endDate = new Date(obj.DateTo)

//   const time = Math.abs(startDate - endDate)
//   const days = Math.ceil(time / (1000 * 60 * 60 * 24))

//   obj.totalWorkingDays = days

// })

// console.log('dupeObjs',dupeObjs)

// let max
// if(dupeObjs && dupeObjs.length > 0) {
//   max = dupeObjs?.reduce(function(prev, current) {
//     return (prev.totalWorkingDays > current.totalWorkingDays) ? prev : current
//   }) //returns object
// }

// console.log('max', max);