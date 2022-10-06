import axios from 'axios';
import React ,{useState,useEffect} from 'react';
import Navbar from './navbar';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
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






const Student = () => {
    let formvalue={
        id:"",
        Name:"",
        Age:"",
        Subject:"",
        Mark:""
    }

    const [student,setstudent]=useState([]);
    const[formdata,setformdata]=useState(formvalue)

    useEffect(()=>{
        async function stu(){
            let res=await axios.get("https://6320be7482f8687273a6d96b.mockapi.io/Student");
            console.log(res);
            setstudent(res.data)
        }
        stu()
    },[])

    const onpop=(id)=>{
        let popdata=student.filter((row)=>row.id===id)[0];
        setformdata({...formdata,...popdata})
    }
    const Handelchange=(e)=>{
        setformdata({...formdata,[e.target.name] : e.target.value});
    }

    const Handledel= async(id)=>{
      const res = await axios.delete(`https://6320be7482f8687273a6d96b.mockapi.io/Student/${id}`);
      console.log(res);

    
    const user=student.filter((row)=>row.id!==res.data.id);
    setstudent(user);
    };



    



    const Handelsumbit= async(e)=>{
        e.preventDefault();
        if(formdata.id)
        {
            const response=await axios.put(`https://6320be7482f8687273a6d96b.mockapi.io/Student/${formdata.id}`,{
                Name:formdata.Name,
                Age:formdata.Age,
                Subject:formdata.Subject,
                Mark:formdata.Mark
            }
                );
                let stu=[...student];
                let index=stu.findIndex((row)=>row.id===response.data.id);
                stu[index]=response.data;
                setstudent(stu)

        }
        else
        {
       
        
        const response=await axios.post("https://6320be7482f8687273a6d96b.mockapi.io/Student",{
        Name:formdata.Name,
        Age:formdata.Age,
        Subject:formdata.Subject,
        Mark:formdata.Mark
    }
        );
      
        setstudent([...student,response.data])
}
        setformdata(formvalue)

    }


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
      
    return (
        <div>
        <Navbar/>
            <h1>student details</h1>
            {
                <Box
                component="form"
                onSubmit={(e)=>Handelsumbit(e)}
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
             
              >
                <TextField id="filled-basic" label="Name" 
                variant="filled" 
                name='Name'
                 value={formdata.Name} 
                onChange={(e)=>Handelchange(e)}
                required/><br/><br/>
                <TextField id="filled-basic" label="Age" variant="filled" type={"number"} name="Age"  
                onChange={(e)=>Handelchange(e)}
                value={formdata.Age}  required/><br/><br/>

                <InputLabel id="demo-simple-select-label"   >Subject</InputLabel>
        <Select
          labelId="demo-simple-select-label" sx={{ m: 1, minWidth: 120 }}
          id="demo-simple-select"
          name="Subject" 
                
                 value={formdata.Subject} 
                 
                 onChange={(e)=>Handelchange(e)}
      
          label="Subject" required
       
        ><br/>
          <MenuItem value="React">React</MenuItem>
          <MenuItem value="Nodejs">NodeJs</MenuItem>
          <MenuItem value="Javascript">Javascript</MenuItem>
        </Select>
        <br/>

              <TextField id="filled-basic" label="Mark" variant="filled" type={"number"} name="Mark" 
              onChange={(e)=>Handelchange(e)}
              value={formdata.Mark} required/><br/><br/>
                <Button variant="contained" type='submit'>Submit</Button><br/><br/>
              
                
               
              </Box>
            }
             <h1>Student Data</h1> 
            {
                 <TableContainer component={Paper}>
                 <Table sx={{ minWidth: 500 }} aria-label="customized table">
                   <TableHead>
                     <TableRow>
                       <StyledTableCell>ID</StyledTableCell>
                       <StyledTableCell >Name</StyledTableCell>
                       <StyledTableCell >Age</StyledTableCell>
                       <StyledTableCell >Subject</StyledTableCell>
                       <StyledTableCell >Mark</StyledTableCell>
                       <StyledTableCell >Action</StyledTableCell>
                     </TableRow>
                   </TableHead>
                   <TableBody>
                     {student.map((row) => (
                       <StyledTableRow key={row.id}>
                         <StyledTableCell component="th" scope="row">
                           {row.id}
                         </StyledTableCell>
                         <StyledTableCell >{row.Name}</StyledTableCell>
                         <StyledTableCell >{row.Age}</StyledTableCell>
                         <StyledTableCell >{row.Subject}</StyledTableCell>
                         <StyledTableCell >{row.Mark}</StyledTableCell>
                         <StyledTableCell >
                         <Button variant="contained" color="success" style={{margin:"10px"}} onClick={()=>onpop(row.id)}>Edit</Button>
                         <Button variant="contained" color="error" onClick={()=>Handledel(row.id)}>Delete</Button>
                         </StyledTableCell>
                       </StyledTableRow>
                     ))}
                   </TableBody>
                 </Table>
               </TableContainer>
            }
        </div>
    );
}

export default Student;
