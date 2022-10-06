import axios from 'axios';
import React ,{useState,useEffect}from 'react';
import Navbar from './navbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';



const Teacher = () => {

    let formvalue={
        name:"",
        Age:"",
        Subject:"",
        Exprience:""
    }
    const [teacher,setteacher]=useState([])
    const [formData,setform]=useState(formvalue)

    useEffect(()=>{
        async function tea(){
          let res=  await axios.get("https://6320be7482f8687273a6d96b.mockapi.io/Teachers")
          console.log(res);
          setteacher(res.data)
        }
        tea()

    },[])
    const Handelchange=(e)=>{
        setform({...formData,[e.target.name] : e.target.value});
    }
    const onpop=(id)=>{
       let popdata= teacher.filter((row)=>row.id===id)[0];
       setform({...formData,...popdata})

    }

    const Handlesubmit=async(e)=>{
        e.preventDefault()
        if(formData.id){
            const res=await axios.put(`https://6320be7482f8687273a6d96b.mockapi.io/Teachers/${formData.id}`,
            {
                name:formData.name,
                Age:formData.Age,
                Subject:formData.Subject,
                Exprience:formData.Exprience
            
            })
            let tea=[...teacher];
            let index=tea.findIndex((row)=>row.id===res.data.id)
            tea[index]=res.data;
            setteacher(tea)

        }
        else
        {
        const res=await axios.post("https://6320be7482f8687273a6d96b.mockapi.io/Teachers",
        {
            name:formData.name,
            Age:formData.Age,
            Subject:formData.Subject,
            Exprience:formData.Exprience
        
        }
        )
        setteacher([...teacher,res.data])
    }
        setform(formvalue)

    }
    const Handeldel=async(id)=>{
       const res= await axios.delete(`https://6320be7482f8687273a6d96b.mockapi.io/Teachers/${id}`)
       const del=teacher.filter((row)=>row.id!==res.data.id);
       setteacher(del)
    }

    
    

    return (
        <div>
        <Navbar/>
        <h1>Teachers Forms</h1>
        {
                <Box
                component="form"
                onSubmit={(e)=>Handlesubmit(e)}
              
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
             
              >
                <TextField id="filled-basic" label="Name" 
                variant="filled" 
                name='name'
                value={formData.name}
                onChange={(e)=>Handelchange(e)}
         
             
                required/><br/><br/>
                <TextField id="filled-basic" label="Age" variant="filled" type={"number"} name="Age"   value={formData.Age}
             onChange={(e)=>Handelchange(e)}
               required/><br/><br/>

                <InputLabel id="demo-simple-select-label"   >Subject</InputLabel>
        <Select
          labelId="demo-simple-select-label" sx={{ m: 1, minWidth: 120 }}
          id="demo-simple-select"
          name="Subject" 
          value={formData.Subject}
          onChange={(e)=>Handelchange(e)}
                
           
                 
               
      
          label="Subject" required
       
        ><br/>
          <MenuItem value="React">React</MenuItem>
          <MenuItem value="Nodejs">NodeJs</MenuItem>
          <MenuItem value="Javascript">Javascript</MenuItem>
        </Select>
        <br/>

              <TextField id="filled-basic" label="Experience" variant="filled" type={"number"} name="Exprience"  value={formData.Exprience}
               onChange={(e)=>Handelchange(e)}
              required/><br/><br/>
                <Button variant="contained" type='submit'>Submit</Button><br/><br/>
              
                
               
              </Box>
            }
            <h1>Teachers Data</h1>
           { <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">subject</TableCell>
            <TableCell align="right">Experience</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teacher.map((row) => (
            <TableRow
              key={row.id}
            
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.Age}</TableCell>
              <TableCell align="right">{row.Subject}</TableCell>
              <TableCell align="right">{row.Exprience}</TableCell>
              <Button variant="contained" color="success" style={{margin:"10px"}} onClick={()=>onpop(row.id)} >Edit</Button>
                         <Button variant="contained" color="error" onClick={()=>Handeldel(row.id)} >Delete</Button>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  }

            
        </div>
    );
}

export default Teacher;
