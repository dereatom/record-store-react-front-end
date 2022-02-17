import { useState, useEffect } from 'react';
import RecordCard from './RecordCard.js';
import RecordForm from './RecordForm.js';

function Records() {

    const [records, setRecords] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [scopedRecord, setScopedRecord] = useState({});
    const [error, setError] = useState();

    useEffect(() => {
        fetch("http://localhost:8080/records")
            .then(response => response.json())
            .then(result => setRecords(result))
            .catch(console.log);
    }, []);

    function addClick() {
        const now = new Date();
        const year = now.getFullYear();
        const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(now);
        const day = new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(now);
        const time = new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit" })
            .format(now).replace(" ", "");
        console.log(time);
        setScopedRecord({ id: 0, brief: "", details: "", dateTime: `${day}-${month}-${year} ${time}` });
        setShowForm(true);
    }

    function notify({ action, record, error }) {

        if (error) {
            setError(error);
            setShowForm(false);
            return;
        }

        switch (action) {
            case "add":
                setRecords([...records, record]);
                break;
            case "edit":
                setRecords(records.map(e => {
                    if (e.id === record.id) {
                        return record;
                    }
                    return e;
                }));
                break;
            case "edit-form":
                setScopedRecord(record);
                setShowForm(true);
                return;
            case "delete":
                setRecords(records.filter(e => e.id !== record.id));
                break;
        }
        
        error = "";
        setShowForm(false);
    }

    if (showForm) {
        return <RecordForm record={scopedRecord} notify={notify} />
    }

    return (
        <>
            <div className="row mt-2">
                <div className="col-8">
                    <h1>Records</h1>
                </div>
                <div className="col">
                    <button className="btn btn-primary" type="button" onClick={addClick}>Add a Record</button>
                </div>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            {records.length === 0 ? <div className="alert alert-warning">No Records</div>
                : (<div className="row row-cols-3">
                    {records.map(e => <RecordCard key={e.id} record={e} notify={notify} />)}
                </div>)}
        </>
    )
}

export default Records;