import { Button, Modal } from 'react-bootstrap';
import React, {useEffect, useState} from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import "bootstrap/dist/css/bootstrap.min.css";
import filterfactory, {textFilter} from "react-bootstrap-table2-filter"
import "./Table.css"
import ToolkitProvider, {Search,CSVExport} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import moment from "moment";

export default function Table() {

    const { SearchBar } = Search;
    const[id, setId] = useState(0);
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modaldata, setModalData] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose =() => {
      setId(0);
      setModalData([]);
      setShow(false);
    };

    const handleShow =(id) => {
      if(id!=0){
        setShow(true);
      }
    };

    const MyExportCSV =(props)=>{
      const handleClick=()=>{
        props.onExport();
      };
      return(
          <button className='export btn btn-success' onClick={handleClick}>Export to CSV</button>
      )
    }

    const showDetail =(id)=>{
      setId(id);
        fetch(`https://www.balldontlie.io/api/v1/games?seasons[]=2021&team_ids[]=${id}`).then(response=>response.json()).then(res=>setModalData(res.data))
        setShowModal(handleShow(id));

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
    fetchData();
  },[])

const columns =[
    {dataField:"name", text: "Team Name", sort:true,
    filter:textFilter({	placeholder: 'Enter name..',
				})
      },
    {dataField:"city", text: "City",sort:true,
    filter:textFilter()
  },
    {dataField:"abbreviation", text: "Abbreviation",sort:true,
    filter:textFilter()
  },
    {dataField:"conference", text: "Conference",sort:true,
    filter:textFilter()
  },
    {dataField:"division", text: "Division",sort:true,
    filter:textFilter()
  },
]

const rowEvents ={
    onClick: (e, row)=>{
      let a = row.id;
      showDetail(a);
    },
};

const ModalContent=()=>{
    return(
        <div>
        {modaldata.length!=0 && (

        <Modal 
          className='modal fade bd-example-modal-lg' show={show}  onHide={()=>{
            handleClose();
          }}>
            <div className="modal-content" id="modal-nav">

          <Modal.Header className='title' closeButton>
              <Modal.Title style={{fontSize:"2vw"}}>
                {modaldata[0]?.home_team.name}
              </Modal.Title>
          </Modal.Header>

          <Modal.Body className='modal-body'>

              <div  className='general'>
                  <div >Team Full Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {modaldata[0]?.home_team?.full_name}</div>
              
              <div >Total games in 2021&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {modaldata.length}</div>
              </div>
              <div  className='random'>
              <div>Randam Game details:</div>
              <div className='insideRandam'>
              <div >Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{moment(modaldata[0]?.date).utc().format('YYYY-MM-DD')}</div>
              <div>Home team&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{modaldata[0]?.home_team.name}</div>
              <div>Home team Score&nbsp;&nbsp;&nbsp;&nbsp;{modaldata[0]?.home_team_score}</div>
              <div>Vistor team&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {modaldata[0]?.visitor_team.name}</div>
              <div>Visitor Team Score&nbsp;&nbsp;
              {modaldata[0]?.visitor_team_score}
              </div> 
              </div>
              </div>  


          </Modal.Body>



  </div>
        </Modal>
        )}
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
            <i className='fas fa-search' id='filtersubmit' style={{fontSize:'15px'}}/>
            <SearchBar placeholder="Search For Any Field" { ...props.searchProps }/>
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
    {show ? <ModalContent/>: ""}
    </>
  )
}
