import React from 'react';
import { useSelector } from 'react-redux';
 
const ReserveExcelContent = () => {
    const excelContent = useSelector(state =>
        state.appReducer.reserveExcel
    );

    const generateExcelContent = () => {
        let content = '';

        if(excelContent && excelContent[0]){
            return (
                <div>
                    {excelContent.map(row => (
                        <div>
                            <p>Author First Name: {row["author_first_name"]}</p>
                            <p>Author Last Name: {row["author_last_name"]}</p>
                            <p>Product Type Specific: {row['product_type_specific']}</p>
                            <p>Publication Date: {row['publication_date']}</p>
                            <p>Related Resource LIDVID: {row['related_resource']}</p>
                            <p>Status: {row["status"]}</p>
                            <p>Title: {row["title"]}</p>
                            <br/>
                        </div>
                    ))}
                </div>
            )
        }
        else{
            content = '';
        }

        return content;
    }

    return <div>
        {generateExcelContent()}
    </div>;
};

export default ReserveExcelContent;