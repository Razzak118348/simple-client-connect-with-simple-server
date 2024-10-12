
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {
const [customer,setcustomer]=useState([]);
const [phone , setPhone]=useState([])
useEffect(()=>{
  fetch('http://localhost:5000/phones')
  .then(res=>res.json())
  .then(data=>setPhone(data))
},[])

useEffect(()=>{
  fetch('http://localhost:5000/customer')
  .then(res=>res.json())
  .then(data=>setcustomer(data))
},[])

const handleAddCustomer=event =>{
  event.preventDefault()
  const form = event.target;
  const name = form.name.value;
  const email = form.email.value;
  const customer ={name,email}
  console.log(customer)
  fetch('http://localhost:5000/customer',{
    method:"POST",
    headers: {
      'content-type': 'application/json'
    },
    body:JSON.stringify(customer)
  })
  .then(res=>res.json())
  .then(data=>{
    console.log(data);
  })

}

  return (
    <>
   <div className='flex justify-center items-center'>
   <h1 className='text-4xl font-bold'>customer Management System </h1>

   </div>

<h3 className='text-xl text-center mt-9'>Current Customer Number : {customer.length}</h3>

<form className='text-center'
onSubmit={handleAddCustomer}>
<input className='border-2' placeholder='Name ' type="text" name='name' />
<br />
<input className='border-2'  placeholder='email' type="email" name='email' />
<br />
<input className='border-2' type="submit" value="Add customer" />
</form>

   <h3 className='text-xl text-center mt-9'>Numbers of Phone :{phone.length}</h3>
   <div className='text-center mt-6'>
   {
    phone.map((item)=><p key={item.id}>{item.id} :  {item.name} , ${item.price}</p>)
   }
   </div>
    </>
  )
}

export default App
