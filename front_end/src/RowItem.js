import React, { useState } from "react";

const RowItem = ({item, submitForm}) => {

    return(
        <tr className={key} key={key}>
            <td>{item._id}</td>
            <td>{item.name}</td>
            <td>{item.sku}</td>
            <td>{item.quantity}</td>
        </tr>);
};

export default RowItem;