import React, {Fragment, useEffect, useState} from 'react';
import CreateItem from './CreateItem';
import RowItem from './RowItem';
import CreateCsv from './CreateCsv';
import process from 'process';
import moment from 'moment';

const App = () => {
    const getTableJson = async () => {
        try {
            const res = await fetch(`${rootUrl}inventory`, {
                method: "GET",
            });
            let inventoryTable = await res.json();

            inventoryTable = inventoryTable['data'];
            for(let index in inventoryTable){
                // delete inventoryTable[index]._id;
                delete inventoryTable[index].__v;
                // console.log('index...');
                // console.log(index);
                // for(let key in inventoryTable[index]) {
                //     console.log('key...');
                //     console.log(key);
                // }
            }
            console.log(inventoryTable);
            return inventoryTable;
        } catch (err) {
            console.error(err.message);
        }
    };

    const [date, setDate] = useState(() => {
        return moment().format('MMMM DD, YYYY')
        // let newDate = new Date();
        // let date = new date.getDate();
        // let month = newDate.getMonth() + 1;
        // let year = newDate.getFullYear();
        // return `date ${date} month ${month} year ${year}`;

    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [invList, setInvList] = useState(null);
    const [showInvList, setShowInvList] = useState(false);
    const [isProduction, setProduction] = useState(() => {
        return process.env.NODE_ENV === 'production'
    });
    const [rootUrl] = useState(() => {
        if(process.env.NODE_ENV === 'production') {
            return 'https://shopify-2022.herokuapp.com/';
        } else {
            return 'http://localhost:8000/';
        }
    });

    const submitForm = () => {
        setIsSubmitted(true);
    };
    // const [invList, setInvList] = useState(()=> {
    //     let data = getTableJson().then(result =>{
    //         console.log(result);
    //         return result;
    //     })
    //     console.log('data');
    //     console.log(data);
    //
    //     return
    //     // return (async () => {
    //     //     let data = await getTableJson();
    //     //     //console.log(`data: ${data}`);
    //     //     console.log(data);
    //     //     return data
    //     // })();
    // });

    useEffect(() => {
        // console.log('invList');
        // console.log(invList);
        // Object.keys(invList).map(key => {
        //     console.log(key);
        // });

        (async () => {
            let data = await getTableJson();
            setInvList(data);
        })();
    },[]);

    useEffect(() => {
        if(showInvList === true) {
            (async () => {
                let data = await getTableJson();
                setInvList(data);
            })();
        }
    },[showInvList]);

    // useEffect(() => {
    //     Object.keys(invList).map(key => {
    //        console.log(key);
    //     });
    //     console.log(invList);
    // },[invList]);

    useEffect(() => {
        if(isSubmitted === true) {
            (async () => {
                let data = await getTableJson();
                setInvList(data);

            })();
            setIsSubmitted(false);
        }
    },[isSubmitted]);
    const test = {
        1: 'test',
        2: 'test2'
    };

    let onClickInvList = () => {
        setShowInvList(prevshowInvList => !prevshowInvList);
    };

    return (
        <div>
            <h1>
                Inventory System
            </h1>
            <h2>
                ABC company
            </h2>
            <h3>
                Toronto Warehouse
            </h3>
            <h4>
                {date != null && date}
            </h4>
            {/*<table>*/}
            {/*    {Object.keys(test).map(key => {*/}
            {/*        return <tr key="{key}">{key}</tr>*/}

            {/*    })}*/}
            {/*</table>*/}
            <button onClick={onClickInvList}>Get Inventory List</button>
            {showInvList ? (
                <table style={{border: "3px solid rgb(0, 0, 0)", width: 700}}>
                    <tbody>
                    <tr>
                        {/*<td>_id</td>*/}
                        <td>Name</td>
                        <td>SKU</td>
                        <td>Quantity</td>
                        <td>Delete</td>
                        <td>Edit</td>

                        {/*<td>_v</td>*/}
                    </tr>
                    {
                        invList != null && Object.keys(invList).map(key => {
                            // console.log('test');
                        return(<RowItem rootUrl={rootUrl} key={key} item={invList[key]} invKey={key} submitForm={submitForm}/>);
                    })}
                    </tbody>
                </table>
            ) : (<Fragment/>)}
            <CreateItem rootUrl={rootUrl} submitForm={submitForm}/>
            <CreateCsv rootUrl={rootUrl}/>
        </div>
    );
};

// !(invList && Object.keys(invList).length === 0 && Object.getPrototypeOf(invList) === Object.prototype) &&

// {Object.keys(invList).map(key => {
//     return(
//         <tr className={key} key={key}>
//             <td>{invList[key]._id}</td>
//             <td>{invList[key].name}</td>
//             <td>{invList[key].sku}</td>
//             <td>{invList[key].quantity}</td>
//         </tr>);
// })}

// {Object.keys(invList).map(key => {
//     return <tr className={key} key={key}>
//         {Object.keys(invList[key]).map(col =>{
//             return <td className={key+col} key={key+col}>{invList[key][col]}</td>
//         })}
//     </tr>;
// })}

export default App;
