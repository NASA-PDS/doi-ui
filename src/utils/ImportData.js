import React from 'react';
import { useDispatch } from 'react-redux';
import rootActions from '../actions/rootActions';
import XLSX from 'xlsx';

const ImportData = () => {
    const dispatch = useDispatch();

    const excelToJson = (reader) => {
        let fileData = reader.result;
        let wb = XLSX.read(fileData, {type : 'binary', cellDates: true});
        let data = [];

        wb.SheetNames.forEach(sheetName => {
            let rowObjs = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);

            rowObjs.forEach(rowObj => {
                let keys = Object.keys(rowObj);
                let convertedRowObj = {};

                keys.forEach(key => {
                    let newKey = key.split(/\s(.+)/)[0].trim();
                    convertedRowObj[newKey] = rowObj[key];
                    
                    if(rowObj[key] instanceof Date){
                        if(typeof rowObj[key].getMonth === 'function'){
                            let date = rowObj[key].getFullYear() + "-" + ("0"+(rowObj[key].getMonth()+1)).slice(-2) + "-" + ("0" + rowObj[key].getDate()).slice(-2);
                            convertedRowObj[newKey] = date;
                        }
                    }
                    
                    return;
                });
    
                data.push(convertedRowObj);
            });
        });

        dispatch(rootActions.appAction.updateReserveExcel(data));
    };
    
    const loadFileXLSX = (event) => {
        let input = event.target;
        let reader = new FileReader();
        reader.onload = excelToJson.bind(this, reader);
        reader.readAsBinaryString(input.files[0]);
    };

    return (
        <div>
            <input type="file" onChange={loadFileXLSX}/>
        </div>
    );
}

export default ImportData;