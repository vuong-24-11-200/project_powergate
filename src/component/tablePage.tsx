import React, { useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import Button from '@mui/material/Button';
import TableEmployee from './tables/table';
import api from '../api';
import Divider from '@mui/material/Divider';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector, useDispatch } from 'react-redux'
import { getdatas } from '../counter/counterSlice';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const TablePage =(valueSearch: any) => {

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [disibaleDelete, setDisibaleDelete] = useState<boolean>(true);
    const [checkedTable, setCheckedTable] = useState([]);
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    // const tableDatas = useSelector((state: any) => state.dataemployee.datas)
    const dispatch = useDispatch()
    
    const [idUpdate, setIdUpdate] = React.useState<any>();
    // const handleShowRow =  (id: any) => {
    
    //   navigate('/addemployee');
    //   console.log(id)
    //   setIdUpdate(id)

    // }
  
    
    

    let [counts, setCounts] = React.useState<number>()
    const [tableDatas, setTableDatas] = React.useState([]);
    const [pageCurrent, setPageCurrent] = React.useState<number>()
    const getData = async  ()=>{
      try {
  
         const res = await api.get("/employee",{
          params: {
              page: pageCurrent,
              search: valueSearch.valueSearch,
              
  
            }
          });
          // console.log(res.data.data.data)
        //  dispatch(getdatas(res.data.data.data))
          setTableDatas(res.data.data.data) 
          setCounts(res.data.data.total)
      }catch (e) {
        console.log(e);
      }
    }

    React.useEffect(()=>{
      getData();
      }, [pageCurrent, valueSearch]);

  

    const handleDelete = async () =>{
      setOpen(true)
    }
    const handleClose = () => {
      setOpen(false);
    };
    const handleYesDelete = async () =>{
      handleClose();
         try{
          await api.delete("/employee/multiple-delete", {
            params: {
              record_ids: checkedTable,
            }
          })
        }
        catch(e){
          console.log(e)
        }
        getData();
    }


    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
      console.log("selectedRowKeys changed: ", newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
    };
    React.useEffect(() =>{

      if(checkedTable.length > 0) {
        setDisibaleDelete(false); 
      }
      else{
        setDisibaleDelete(true);
      }
    }, [checkedTable]);
   
  
    const rowSelection: TableRowSelection<DataType> = {
      selectedRowKeys,
      onChange: onSelectChange,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        Table.SELECTION_NONE,
        {
          key: "odd",
          text: "Select Odd Row",
          onSelect: (changeableRowKeys) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            setSelectedRowKeys(newSelectedRowKeys);
          }
        },
        {
          key: "even",
          text: "Select Even Row",
          onSelect: (changeableRowKeys) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            setSelectedRowKeys(newSelectedRowKeys);
          }
        }
      ]
    };
    const handleAdd = () =>{
      navigate('/employee/create-or-update')
    }
  
    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'end', gap: '10px', paddingBottom: '10px'}}>
        <Button variant="outlined" className='button-add'tabIndex={0} type='button'  onClick={handleAdd}>
          <span style={{display: "flex", alignItems: 'center', gap: '5px' }} >
          

            <svg width="15"  viewBox="0 0 15 15">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V4.70711L9.29289 2H3.5ZM2 2.5C2 1.67157 2.67157 1 3.5 1H9.5C9.63261 1 9.75979 1.05268 9.85355 1.14645L12.7803 4.07322C12.921 4.21388 13 4.40464 13 4.60355V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5ZM4.75 7.5C4.75 7.22386 4.97386 7 5.25 7H7V5.25C7 4.97386 7.22386 4.75 7.5 4.75C7.77614 4.75 8 4.97386 8 5.25V7H9.75C10.0261 7 10.25 7.22386 10.25 7.5C10.25 7.77614 10.0261 8 9.75 8H8V9.75C8 10.0261 7.77614 10.25 7.5 10.25C7.22386 10.25 7 10.0261 7 9.75V8H5.25C4.97386 8 4.75 7.77614 4.75 7.5Z" fill="black">
              </path>
            </svg>
        
          <p style={{margin: "auto"}}>Add</p>
        
          </span>
        </Button>
        
        <Button variant="outlined" className='button-add'tabIndex={0} type='button' color="error" disabled={disibaleDelete} onClick={handleDelete} >
          <span style={{display: "flex", alignItems: 'center', gap: '5px' }}>
         

            <svg width="15"  viewBox="0 0 15 15" >
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="black"></path>
            </svg>
 
          <p style={{margin: "auto"}}>Delete</p>
        
          </span>
        </Button>
        </div>
        <Divider />
        
        <TableEmployee getData={getData} setPageCurrent={setPageCurrent} counts={counts} tableDatas={tableDatas} handleDelete={handleDelete} valueSearch={valueSearch} setCheckedTable={setCheckedTable}/>
        <div>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Delete</DialogTitle>
              <DialogContent>
                <DialogContentText>
                Are you sure you want to delete?
                </DialogContentText>
              
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={handleYesDelete}>Yes</Button>
              </DialogActions>
            </Dialog>
          </div>
      </div>
    );
}


export default TablePage;