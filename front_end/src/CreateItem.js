import React, { Fragment, useState } from "react";

const CreateItem = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const { email, password } = inputs;

    const onChange = e =>
        setInputs({ ...inputs, [e.target.name]: e.target.value });

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { email, password };
            const response = await fetch(
                "http://localhost:8000/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            );

            const parseRes = await response.json();


        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <form onSubmit={onSubmitForm}>
                <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={e => onChange(e)}
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => onChange(e)}
                />
                <button>Submit</button>
            </form>
        </Fragment>);
};