export function DeletePeriodo(selectedOptions1,setSelectedOptions1,setSelectedOptions2,setSelectedOptions3,setSelectedOptions4,setSelectedOptions5,setSelectedOptions6){
    console.log(selectedOptions1)
    if(selectedOptions1 !== []){
      setSelectedOptions1([])
      setSelectedOptions2([])
      setSelectedOptions3([])
      setSelectedOptions4([])
      setSelectedOptions5([])
      setSelectedOptions6([])
    }
}