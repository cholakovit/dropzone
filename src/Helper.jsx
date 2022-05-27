


export function EmployeeResults(employees) {

  const uniqueEmployees = []
  const dupEmployees = []

  employees?.forEach(employee => { 
    [uniqueEmployees,dupEmployees][+(employees.map(employee => employee.ProjectID)
        .filter(ProjectID => ProjectID === employee.ProjectID).length > 1)]
        .push(employee)

    let startDate = new Date(employee?.DateFrom)
    let endDate = ''
    let days = ''

    console.log('isNaN(endDate)', isNaN(endDate))

    if(isNaN(endDate) === false) {
      endDate = new Date()
    } else {
      endDate = new Date(employee?.DateTo)
    }

    const time = Math.abs(startDate - endDate)
    days = Math.ceil(time / (1000 * 60 * 60 * 24))

    //console.log('days', days)

    employee.totalWorkingDays = days

  })

  let longestEmployee
  if(dupEmployees && dupEmployees.length > 0) {
    longestEmployee = dupEmployees?.reduce(function(prev, current) {
      return (prev.totalWorkingDays > current.totalWorkingDays) ? prev : current
      }) //returns object
  }
    
    console.log('results.dupEmployees')

    return { 'dupEmployees': dupEmployees, 'longestEmployee': longestEmployee }
}

export function showResults (results, res) {

  console.log('results.dupEmployees', results.dupEmployees)

  return (<>
  
    {results.longestEmployee ? 
    <>
      <h2>Longest Working Employee</h2>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Emp ID</th>
            <th>Project ID</th>
            <th>Date From</th>
            <th>Project To</th>
            <th>Total Working Days</th>
          </tr>
        </thead>
        <tbody>
            <tr key={results.longestEmployee?.EmpID}>
                <td><strong>{results.longestEmployee?.EmpID}</strong></td>
                <td>{results.longestEmployee?.ProjectID}</td>
                <td>{results.longestEmployee?.DateFrom}</td>
                <td>{results.longestEmployee?.DateTo}</td>
                <td  style={{float: "right"}}>{results.longestEmployee?.totalWorkingDays}</td>
            </tr>
        </tbody>
      </table>   
    </> : ''}

    {results.dupEmployees.length > 0 ? 
      <>
        <h3>Employees working on the same project</h3>
        <hr />
        <table>
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Project ID</th>
              <th>Date From</th>
              <th>Project To</th>
              <th>Total Working Days</th>
            </tr>
          </thead>
          <tbody>
              {results.dupEmployees?.map((result) => (
                <tr key={result.EmpID}>
                    <td><strong>{result.EmpID}</strong></td>
                    <td>{result.ProjectID}</td>
                    <td>{result.DateFrom}</td>
                    <td>{result.DateTo}</td>
                    <td  style={{float: "right"}}>{result.totalWorkingDays}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </> : '' }

    {res.length > 0 ? 
      <>
      <h4>All Imported Employees</h4>
          <hr />
          <table>
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Project ID</th>
              <th>Date From</th>
              <th>Project To</th>
            </tr>
          </thead>
          <tbody>
              {res?.map((result) => (
                <tr key={result.EmpID}>
                    <td><strong>{result.EmpID}</strong></td>
                    <td>{result.ProjectID}</td>
                    <td>{result.DateFrom}</td>
                    <td>{result.DateTo}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </> : '' }

  </>)}