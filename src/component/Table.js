import { Button, Modal } from 'react-bootstrap';
import React, {useEffect, useState} from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import "bootstrap/dist/css/bootstrap.min.css";
import filterfactory, {textFilter} from "react-bootstrap-table2-filter"
import "./Table.css"
import ToolkitProvider, {Search,CSVExport} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';

export default function Table() {
 
 
    const { SearchBar } = Search;
    const {ExportCSVButton} = CSVExport;
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose =() => setShow(false);
    const handleShow =() => setShow(true);
    const [modeldata, setModeldata] = useState({
        id:'',
        home_team_score:'',
        visitor_team_score:'',
        home_team:{
            id:'',
    abbreviation:'',
    city:'',
    conference:'',
    division:'',
    full_name:'',
    name:''
    },
    visitor_team:{
    name:''
  },
    })

    const MyExportCSV =(props)=>{
      const handleClick=()=>{
        props.onExport();
      };
      return(
        <div >
          <button className='export btn btn-success' onClick={handleClick}>Export to CSV</button>
        </div>
      )
    }
     

   

    const showDetail =(id)=>{
        fetch(`https://www.balldontlie.io/api/v1/games/${id}`).then(response=>response.json()).then(res=>setModeldata(res))
   
    
        
    }
  const fetchData = () => {
    fetch("https://www.balldontlie.io/api/v1/teams")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setUsers(data.data)
        
      })
  }

  useEffect(() => {
    fetchData()
  }, [])
  

const columns =[
    {dataField:"name", text: "Team Name", sort:true,
    filter:textFilter({	placeholder: 'Enter name..',
			
				})},
    {dataField:"city", text: "City",sort:true,filter:textFilter()},
    {dataField:"abbreviation", text: "Abbreviation",sort:true,filter:textFilter()},
    {dataField:"conference", text: "Conference",sort:true,filter:textFilter()},
    {dataField:"division", text: "Division",sort:true,filter:textFilter()},
]


  




const rowEvents ={
    onClick: (e, row)=>{
        showDetail(row.id);
     
        
       
        toggleTrueFalse();
        
        
        
    },
};
const toggleTrueFalse=()=>{
    setShowModal(handleShow);
}
const ModalContent=()=>{
    return(
      
        <div>
          
        <Modal  className='modal fade bd-example-modal-lg' show={show} onHide={handleClose}>
          <div className="modal-content" id="modal-nav">

<Modal.Header className='title' closeButton>
   
    <Modal.Title >{modeldata.id}</Modal.Title>
</Modal.Header>
 <div className="modal-body">
<Modal.Body>

<div className='general'>
        <div>Team Full Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {modeldata.home_team.full_name}</div>
     
    <div>Total games in 2021&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 99</div>
    </div>
    <div className='random'>
    <div>Randam Game details:</div>
    <div className='insideRandam'>
    <div >Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2021-10-04</div>
    <div>Home team&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{modeldata.home_team.name}</div>
    <div>Home team Score&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{modeldata.home_team_score}</div>
    <div>Vistor team&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {modeldata.visitor_team.name}</div>
    <div>Visitor Team Score&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {modeldata.visitor_team_score}</div> 
    </div>
    </div>  


</Modal.Body>
</div>

</div>
        </Modal>
        </div>
    )
}

  return (
    <>
    <h1 className='heading'>NBA TEAMS</h1>
    
    <div className='container mt-5'>
    
  
    
    <div className="App">
      <ToolkitProvider
      bootstrap4
      keyField='name'
        data={users}
        columns={columns}
        exportCSV
        search

      >{
        props =>(
          <React.Fragment>
          <MyExportCSV {...props.csvProps}/>
          <div className="search" >
        <SearchBar placeholder="Search For Any Field" { ...props.searchProps } />
        </div>
        
          <BootstrapTable
        
        hover condensed
       
        {...props.baseProps}
       
        pagination={paginationFactory()}
        filter={filterfactory()}
        rowEvents={rowEvents}
        />
        </React.Fragment>
        )
      }
        
        </ToolkitProvider>
    </div>
    </div>

   
   
    {show ? <ModalContent/>: null}
   
    </>
  )
}
