import React from "react";
import { forwardRef } from 'react';
import Tabletop from 'tabletop';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import moment from "moment";
import Moment from 'react-moment';
import './App.css';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

class Table extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    handleClick = () => {
        window.open("https://script.google.com/macros/s/1EDiit5C2L-RFA8BmIfJ_uLp8iLylTO6Hi3wH33QMq_g/exec");
    }

    componentDidMount() {
        
        Tabletop.init({
        key: '1EDiit5C2L-RFA8BmIfJ_uLp8iLylTO6Hi3wH33QMq_g',
        callback: googleData => {
            this.setState({
            data: googleData
            })
        },
        simpleSheet: true
        })
    }
    
    calcTime(offset) {
        // create Date object for current location
        var d = new Date();
    
        // convert to msec
        // subtract local time zone offset
        // get UTC time in msec
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    
        // create new Date object for different city
        // using supplied offset
        var nd = new Date(utc + (3600000*offset));
    
        // return time as a string
        return nd.toLocaleString();
    }

    
    render() {
        const { data } = this.state;
    
        var someData = []
        let date=""
        return (
        <div>  
            <Moment format="MM/DD/YYYY, HH:mm:ss">{this.calcTime("+7")}</Moment>
            <div>
            {
                data.map(obj => {
                if (obj.Sales.trim().toLowerCase() === this.props.name.trim().toLowerCase() && obj.Tanggal !== "" && obj.Dokter !== "") {
                    //console.log(obj["Tanggal Masuk Email (Jangan masuk website)"])
                    //console.log(this.calcTime("+7"))
                    var ms = moment(this.calcTime("+7"),"MM/DD/YYYY, HH:mm:ss").diff(moment(obj["Tanggal Masuk Email (Jangan masuk website)"],"DD/MM/YYYY HH:mm:ss"));
                    var d = moment.duration(ms);
                    //var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
                    //console.log(d.asHours())
                    if(d.asHours() <="24"){
                        someData.push({
                            nama: obj.Sales,
                            kode: obj.Dokter,
                            tanggal: obj.Tanggal,
                            waktu: obj.Waktu,
                            status: obj.Status,
                            code: obj.Code,
                            checkpointCode: obj.CheckpointCode,
                            waktuCheckpoint: obj.WaktuCheckpoint,
                            keterangan: obj.Keterangan,
                            reschedDetail: obj.ReschedDetail,
                        })      
                    }
                }
                })
            }
            
            <MaterialTable
                icons={tableIcons}
                columns={[
                    { title: 'Kode Jadwal', field: 'code' },
                    { title: 'Nama Sales', field: 'nama' },
                    { title: 'Kode Dokter', field: 'kode' },
                    { title: 'Waktu Jadwal', field: 'waktu'},
                    { title: 'Waktu Checkpoint', field: 'waktuCheckpoint'},
                    { title: 'Tanggal', field: 'tanggal'},
                    { title: 'Status', field: 'status'},
                    { title: 'Kode Checkpoint', field: 'checkpointCode'},
                    { title: 'Keterangan Checkpoint', field: 'keterangan'},
                    { title: 'Alasan Pergantian Jadwal', field: 'reschedDetail'},
                ]}
                data = {someData}
                title =  "My Schedule"          

            /> 
            </div>
        </div>

        );
    }
}

export default Table;
