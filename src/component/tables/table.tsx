import React, { useState } from 'react';
import PaginationEpl from './pagination';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Checkbox } from '@mui/material';
import api from '../../api';
import { getDataTable } from '../../counter/counterSlice';
import { useSelector, useDispatch } from 'react-redux'
import { count } from 'console';


// interface DataType {
//   key: React.Key;
//   name: string;
//   age: number;
//   address: string;
// }

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'staff_id', label: 'NIK', minWidth: 200 },
  { id: 'name', label: 'Name', minWidth: 100 },
  {
    id: 'gender',
    label: 'Gender',
    minWidth: 170,
    

  },
  {
    id: 'card_number',
    label: 'Bank Card No.',
    minWidth: 170,

  },
  {
    id: 'bank_account_no',
    label: 'Bank Account No.',
    minWidth: 170,

  },
  {
    id: 'family_card_number',
    label: 'Family Card No.',
    minWidth: 170,

  },
  {
    id: 'marriage_status',
    label: 'Marriage Status',
    minWidth: 170,

  },
  {
    id: 'mother_name',
    label: 'Mother Name',
    minWidth: 170,

  },
  {
    id: 'place_of_birth',
    label: 'Place of birth',
    minWidth: 170,

  },
  {
    id: 'date_of_birth',
    label: 'Date of birth',
    minWidth: 170,

  },
  {
    id: 'home_address_1',
    label: 'Home Address',
    minWidth: 170,

  },
  {
    id: 'nation_ card_id',
    label: 'National Card ID No.',
    minWidth: 170,

  },
  {
    id: 'updated_at',
    label: 'Date Start',
    minWidth: 170,

  },
  {
    id: 'first_contact',
    label: 'First Contract',
    minWidth: 170,

  },
  {
    id: 'second_contact',
    label: 'Second Contract',
    minWidth: 170,

  },
  {
    id: 'end_contact',
    label: 'End Contract',
    minWidth: 170,

  },
  {
    id: 'department_name',
    label: 'Department',
    minWidth: 170,

  },
  {
    id: 'employee_type',
    label: 'Employee Type',
    minWidth: 100,
  },
  {
    id: 'basic_salary',
    label: 'Salary Rp.',
    minWidth: 100,
  },
  {
    id: 'position',
    label: 'Position',
    minWidth: 100,
  },
  {
    id: 'ot_paid',
    label: 'O/T Paid',
    minWidth: 100,
  },
  {
    id: 'meal_paid',
    label: 'Meal paid',
    minWidth: 100,
  },
  {
    id: 'meal_rp',
    label: 'Meal Rp.',
    minWidth: 100,
  },
  {
    id: 'grading',
    label: 'Grading',
    minWidth: 100,
  },
];


// function createData(
//   // id staff
//   nik: string,
//   name: number,
//   gender: string,
//   bank_account_no: null,
//   family_card_number: null,
//   mother_name: string,
//   // no value
//   place_of_birth: string,
//   home_address_1: null,
//   nation_card_id: null,
//   updated_at: Date,
//   first_contact: Date,
//   second_contact: string,
//   end_contact: string,
//   deparment: string,
//   employee_type: string,
//   salary_Rp: string,
//   position: string,
//   ot_paid: string,
//   meal_paid: number,
//   grading: string,
// ) {
//   return {

//     nik,
//     name,
//     gender,
//     bank_account_no,
//     family_card_number,
//     mother_name,
//     place_of_birth,
//     home_address_1,
//     nation_card_id,
//     updated_at,
//     first_contact,
//     second_contact,
//     end_contact,
//     deparment,
//     employee_type,
//     salary_Rp,
//     position,
//     ot_paid,
//     meal_paid,
//     grading
//   };
// }

// let rows: any = [];

interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, numSelected, rowCount} = props;
 

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            // indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            
          />
        </TableCell>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{ minWidth: column.minWidth }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


const TableEmployee = ({setCheckedTable}: any) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const dispatch = useDispatch();
  // const tableDatas = useSelector((state: any) => state.employee.datas)
  const [tableDatas, setTableDatas] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  // const handleChangePage = (event: unknown, newPage: number) => {
  //   setPage(newPage);
  // };
  const [selected, setSelected] = React.useState<readonly string[]>([]);


  // const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  // const start = () => {
  //   setLoading(true);

  //   setTimeout(() => {
  //     setSelectedRowKeys([]);
  //     setLoading(false);
  //   }, 1000);
  // };



  // const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
  //   console.log('selectedRowKeys changed: ', newSelectedRowKeys);
  //   setSelectedRowKeys(newSelectedRowKeys);
  // };

  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  // };
  // const hasSelected = selectedRowKeys.length > 0;
  let [counts, setCounts] = React.useState<number>()
  
  // const [allData, setAllData] = React.useState<any>([])
  const [pageCurrent, setPageCurrent] = React.useState<number>()
  const getData = async  ()=>{
    try {

       const res = await api.get("/employee",{
        params: {
            page: pageCurrent,
          }
        });
       
        setTableDatas(res.data.data.data)
        // let newRows: any = [];
        // datas?.forEach((item: any) => {
        //   newRows.push(createData(
        //         item.staff_id,
        //         item.name,
        //         item.gender,
        //         item.bank_account_no,
        //         item.family_card_number,
        //         item.mother_name,
        //         item.place_of_birth,
        //         item.home_address_1,
        //         item.nation_card_id,
        //         item.updated_at,
        //         item.contract_start_date,
        //         item.second_contact,
        //         item.end_contact,
        //         item.deparment,
        //         item.type,
        //         item.basic_salary,
        //         item.position_name,
        //         item.ot_paid,
        //         item.meal_allowance_paid,
        //         item.grading));
        //    });
        //   // setRows(newRows);   
        //   setRows(res.data.data.data) 
          setCounts(res.data.data.total)
      // dispatch(getDataTable(res.data.data.data));
      
       

    }catch (e) {
      console.log(e);
    }
  }
  


  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = tableDatas.map((row: any) => row.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  React.useEffect(()=>{
    getData();
    
  }, [pageCurrent]);

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };
  console.log(selected)
  setCheckedTable(selected);

  return (

    <div>
      <div style={{ marginBottom: 16 }}>


      </div>
      <TableContainer sx={{ maxHeight: 440, width: '100%' }}>

        <Table sx={{ minWidth: 750 }}>
          <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={tableDatas.length}
            />
          <TableBody>
            {tableDatas?.map((row: any) => {
              const isItemSelected = isSelected(row.id);
             
                return (
                  <TableRow hover role="checkbox" 
              
                  tabIndex={-1} 
                  key={row.id}
                  onClick={(event) => handleClick(event, row.id)}
                  selected={isItemSelected}
                  aria-checked={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                    
                      />
                    </TableCell>
                    {columns.map((column) => {  
                      const value = row[column.id];
                      if (value === 1) return <TableCell>Nam</TableCell>
                      if (value === 0) return <TableCell>Nữ</TableCell>
                      return (
                        <TableCell key={column.id} >
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
          <PaginationEpl counts={counts} setPageCurrent={setPageCurrent}/>

    
    </div>

  )
}

export default TableEmployee