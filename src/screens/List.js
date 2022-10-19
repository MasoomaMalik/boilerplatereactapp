import React, { useEffect ,useState} from 'react'
import { readFromDB } from '../config/firebaseMethods';

const List = ({todoList}) => {
  let newListDb
 if(todoList){
  let item =   Object.values(todoList)
  let ID=Object.keys(todoList)
  // console.log(ID)
  let listDb=[ ...ID]
  
 newListDb= listDb.map((e,i,ID)=>( 
  {item:item[i],
    ID:ID[i]
 
}
))
 }

 
console.log(newListDb)
 
  return (
    
    <>
{/* {console.log(" todolist in list.js")}
{console.log(todoList)} */}
{/* {console.log("listDB")}
{console.log(listDb)} */}
 


    {todoList ?newListDb.map((e,i)=>(


   <div className="d-flex">

      <li  key={e.ID} >
         <input type="text" value={e.item}  
         onChange={(event)=> event.preventDefault()}/>
<button  >
  <i className="fa fa-edit"></i>
</button>
<button  >
  <i className="fa fa-trash"></i>
</button>
          
        </li>
        </div> 



    )):null}


    
    </>
  )
}

export default List