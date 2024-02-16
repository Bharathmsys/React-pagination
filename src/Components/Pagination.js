import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Pagination = () => {
  const [data,setData] = useState([])
 const [currentPage,setCurrentpage] = useState(1)
 const totalPages = data.length / 2
const visiblePages = 2
    useEffect(()=>{
        axios.get('https://fakestoreapi.com/products').then((res)=>{
             console.log(res.data,"Data Success")
            setData(res.data)
        }).catch((err)=>{
          console.log(err,"Data Error")
        })
    },[])
    console.log(data)
    const handleClick = (page) => {
      setCurrentpage(page);
    };
    const pageNumbers = [];
    // for (let i = 1; i <totalPages + 1; i++) {
    //   pageNumbers.push(i);
    // }


    let ellipsesStart = false;
  let ellipsesEnd = false;

  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage || 
        i <= visiblePages || 
        i > totalPages - visiblePages || 
        (i >= currentPage - visiblePages && i <= currentPage + visiblePages)) {
      pageNumbers.push(i);
    } else {
      if (!ellipsesStart && i < currentPage - visiblePages) {
        pageNumbers.push('...');
        ellipsesStart = true;
      }
      if (!ellipsesEnd && i > currentPage + visiblePages) {
        pageNumbers.push('...');
        ellipsesEnd = true;
      }
    }
  }

  

  
    const start = (currentPage - 1) * 2;
    const end = start + 2;
  return (
    <center>
    <>
    {data.slice(start,end).map((e)=>{
      return(
        <div className='containter' key={e.id}>
      <img src={e.image} width="180px" alt={e.title}/>
      <h2>{e.title}</h2>
    </div>
      )
    })}
    </>
    {/* <video width="640" height="360" controls><source src='https://youtu.be/zb-WLrNCcT0?si=IK7Dvle2D6ECAUJ5' type="video/mp4" /> your video</video> */}
    <button className='previourspage' onClick={()=>(setCurrentpage(currentPage-1))} disabled={currentPage===1}>previourspage</button>
    {pageNumbers.map((number) => (
                  <button 
                    className="page-button active"
                    onClick={() => handleClick(number)}
                  >
                    {number}
                  </button>
                ))}
                <button className='previourspage' onClick={()=>setCurrentpage(currentPage+1)} disabled={currentPage===totalPages}>Next</button>
    </center>
  )
}

export default Pagination
