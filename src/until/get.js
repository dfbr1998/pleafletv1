
const getData=async(url)=>{

  const dirSolve =  `https://www.zipcodeapi.com/rest/yF17WziERm8vvjIDyEGNJwtcMEH61hQI96XNHFmrxMGzk7pXi1ZewiZGAh8ed08t${url}`
    
  try {
    const response = await fetch(dirSolve, {
      method: 'GET',
      // mode: 'no-cors',
      headers: {
        
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
         
          'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
      }   
  });
  console.log(response)
  if (response.ok){
    const json = await response.json()
    return json
  }
  } catch (error) {
    console.log('envio falso')
    return false
  }

    
   
 
}
export default getData