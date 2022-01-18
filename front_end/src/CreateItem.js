import React, { Fragment, useState } from "react";

const CreateItem = ({submitForm}) => {
    const [inputs, setInputs] = useState({
        name: "",
        sku: "",
        quantity: ""
    });

    const { name, sku, quantity } = inputs;

    const onChange = e =>
        setInputs({ ...inputs, [e.target.name]: e.target.value });

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { name, sku, quantity };
            const response = await fetch(
                "http://localhost:8000/inventory/",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            );

            const parseRes = await response.json();
            submitForm();


        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <div>Add inventory item </div>
            <form onSubmit={onSubmitForm}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={e => onChange(e)}
                />
                <input
                    type="text"
                    name="sku"
                    placeholder="SKU"
                    value={sku}
                    onChange={e => onChange(e)}
                />
                <input
                    type="text"
                    name="quantity"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={e => onChange(e)}
                />
                <button>Submit</button>
            </form>
        </Fragment>);
};

export default CreateItem;