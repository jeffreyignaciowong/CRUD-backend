import React, { useState, useEffect, Fragment} from "react";

const CreateCsv = () => {
    const [showLink, setShowLink] = useState(false);
    const [href, setHref] = useState('');

    let onClickCsv = async () => {
        const response = await fetch(
            "http://localhost:8000/inventory/csv",
            {
                method: "GET"
            }
        );
        const blob = await response.blob();
        //const blob = new Blob([response, { type: "octet-stream"}])

        setHref(URL.createObjectURL(blob));
    };
    useEffect(() => {
        if(href === '') {
            setShowLink(false);
        } else {
            setShowLink(true);
        }
    },[href]);

    return(
    <Fragment>
        <div>Generate Inventory CSV</div>
        <div><button onClick={onClickCsv}>Generate CSV</button></div>
        {showLink ? (<a href={href} download="Inventory.csv" >Download csv</a>
        ) :  (<Fragment/>)}

    </Fragment>)
};

export default CreateCsv;