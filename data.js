//Filtro para reducir el array
export const getData = (data) => {
  const dataReduce = data.results.slice(1,130)
  return dataReduce
}
//Filtrar personajes muertos
export const getDeads =(data) => {
 const arrayDeads = getData(data).filter(e=>e.status=="Dead");
 return arrayDeads
}

//Filtrar personajes vivos
export const getAlive=(data)=>{
 const arrayAlive= getData(data).filter(e=>e.status=="Alive");
 return arrayAlive
}
//Filtrat los personajes Femeninos
export const getFemale=(data)=>{
 const arrayFemale= getData(data).filter(e=>e.gender=="Female");
 return arrayFemale
}
//Filtrar los personajes Masculinos
export const getMale=(data)=>{
 const arrayMale= getData(data).filter(e=>e.gender=="Male");
 return arrayMale
}
//Filtrar por gender Unknow
export const getUnknow=(data)=>{
  const arrayUnknow=getData(data).filter(e => e.gender == "unknown");
  return arrayUnknow
}
//Ordenar los personajes de a A-Z sin filtro
export const ascendente=(data)=>{
  const a= data.sort((a,b)=>{
    if(a.name<b.name){
      return -1 }
    })
  return a
}

//Ordenar los personajes de a Z-A sin filtro
export const descendente=(data)=>{
  const b= data.sort((a,b)=>{
   if(a.name>b.name){
     return -1
   }
 }
 )
 //console.log(Array.isArray(descendente));
 return b
}

