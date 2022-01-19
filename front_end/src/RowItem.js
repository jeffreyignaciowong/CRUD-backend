import React, { useState, Fragment} from "react";

const RowItem = ({item, invKey, submitForm}) => {
    const [inputs, setInputs] = useState({
        name: "",
        sku: "",
        quantity: ""
    });

    const { name, sku, quantity } = inputs;

    const onChange = e => setInputs({ ...inputs, [e.target.name]: e.target.value });

    const [isEdit, setIsEdit] = useState(false);

    const editOnClick = () => {
        setIsEdit(prevIsEdit => !prevIsEdit);

    };
    const onDelete = async () => {
        try{
            // const body = { _id: item._id };
            const url = new URL(item._id, 'http://localhost:8000/inventory/');

            const response = await fetch(
                url,
                {
                    method: "DELETE"
                }
            );

            const parseRes = await response.json();
            submitForm();
        } catch (err) {
            console.error(err.message);
        }
    };
    const onSubmitEdit = async () => {
        try {
            const body = { name, sku, quantity };
            if (name === "") {
                body.name = item.name;
            }
            if(sku === "") {
                body.sku = item.sku;
            }
            if(quantity === "") {
                body.quantity = item.quantity;
            }

            const url = new URL(item._id, 'http://localhost:8000/inventory/');

            const response = await fetch(
                url,
                {
                    method: "PATCH",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            );

            const parseRes = await response.json();
            submitForm();
            setIsEdit(false);

        } catch (err) {
            console.error(err.message);
        }
    };

    return(
        <tr className={invKey} key={invKey}>
            {!isEdit ? (
                <Fragment>
                    {/*<td>{item._id}</td>*/}
                    <td>{item.name}</td>
                    <td>{item.sku}</td>
                    <td>{item.quantity}</td>
                    <td><button onClick={onDelete}>Delete</button></td>
                    <td><button onClick={editOnClick}>Edit</button></td>
                </Fragment>
            ) : (
                <Fragment>
                    {/*<td>{item._id}</td>*/}
                    <td>
                        <input
                            type="text"
                            name="name"
                            placeholder={item.name}
                            value={name}
                            onChange={e => onChange(e)}
                        />
                    </td>
                    <td>
                        <input
                        type="text"
                        name="sku"
                        placeholder={item.sku}
                        value={sku}
                        onChange={e => onChange(e)}
                        />
                    </td>
                    <input
                        type="text"
                        name="quantity"
                        placeholder={item.quantity}
                        value={quantity}
                        onChange={e => onChange(e)}
                    />
                    <td><button>Delete</button></td>
                    <td><button onClick={editOnClick}>Edit</button></td>
                    <td><button onClick={onSubmitEdit}>Submit Edit</button></td>
                </Fragment>
            )}

        </tr>);
};

// <td key={item._id}>{item._id}</td>
// <td key={item.name}>{item.name}</td>
// <td key={item.sku}>{item.sku}</td>
// <td key={item.quantity}>{item.quantity}</td>


export default RowItem;