import React, { useEffect, useState} from 'react';
import CreateItem from './CreateItem'

const App = () => {
    const getTableJson = async () => {
        try {
            const res = await fetch("http://localhost:8000/inventory", {
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
            // console.log(inventoryTable);
            return inventoryTable;
        } catch (err) {
            console.error(err.message);
        }
    };

    const [invList, setInvList] = useState({});

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
        Object.keys(invList).map(key => {
           console.log(key);
        });
        console.log(invList);
    },[invList]);

    const test = {
        1: 'test',
        2: 'test2'
    };

    return (
        <div>
            <div>
                hello
            </div>
            <table>
                {test[1]}
            </table>
            {/*<table>*/}
            {/*    {Object.keys(test).map(key => {*/}
            {/*        return <tr key="{key}">{key}</tr>*/}

            {/*    })}*/}
            {/*</table>*/}
            <table style={{border: "3px solid rgb(0, 0, 0)"}}>
                <tr>
                    <td>_id</td>
                    <td>Name</td>
                    <td>SKU</td>
                    <td>Amount</td>
                    {/*<td>_v</td>*/}
                </tr>
                {Object.keys(invList).map(key => {
                    return <tr className={key} key={key}>
                            {Object.keys(invList[key]).map(col =>{
                        return <td className={key+col} key={key+col}>{invList[key][col]}</td>
                        })}
                    </tr>;
                })}
            </table>
            <CreateItem/>
        </div>
    );
};

export default App;
