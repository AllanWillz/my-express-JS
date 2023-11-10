import { Table, Container } from 'react-bootstrap';
import { useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [ developers, setDevelopers ] = useState([]);

  useEffect(()=>{
    fetchDevelopers()
  }, []);

  const fetchDevelopers = async () => {
    const response = await axios.get('http://localhost:4000/developers');
     if(response){
        setDevelopers(response.data.developers);
     }
  }

  return (
    <div className="App">
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>OtherName</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Telephone</th>
              <th>Dob</th>
            </tr>
          </thead>
          <tbody>
            {
              developers?.map((developer, index)=>{
                return (<tr>
                  <td>{index + 1}</td>
                  <td>{developer.firstName}</td>
                  <td>{developer.lastName}</td>
                  <td>{developer.otherNames}</td>
                  <td>{developer.gender}</td>
                  <td>{developer.email}</td>
                  <td>{developer.telephone}</td>
                  <td>{developer.dateOfBirth}</td>
                </tr>)
              })
            }
          </tbody>
        </Table>
      </Container>
       
    </div>
  );
}

export default App;
