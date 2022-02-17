function RecordCard({ record, notify }) {

    function handleDelete() {
        fetch(`http://localhost:8080/records/${record.id}`, { method: "DELETE" })
            .then(() => notify({ action: "delete", record: record }))
            .catch(error => notify({ action: "delete", error: error }));
    }

    return (
        <div className="col">
            <div className="card">
                <div className="card-body">
                    <h5>Artist</h5>
                    <p className="card-text">{record.artist}</p>
                    <h5>Album</h5>
                    <p className="card-text">{record.album}</p>
                    <h5>Year</h5>
                    <p className="card-text">{record.year}</p>
                </div>
                <div className="card-footer d-flex justify-content-center">
                    <button className="btn btn-danger mr-3" type="button" onClick={handleDelete}>Delete</button>
                    <button className="btn btn-secondary" type="button" onClick={() => notify({ action: "edit-form", record })}>Edit</button>
                </div>
            </div>
        </div>
    );
}

export default RecordCard;