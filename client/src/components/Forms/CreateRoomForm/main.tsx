
const CreateRoom = () => {
  return (
    <>
    <form className="form col-md-12 mt-5">
      <div className="form-group">
        <input
          type="text"
          className="form-control my-2 "
          placeholder="Enter Room Name"
        />
      </div>
      <div className="form-group border rounded-2">
        <div className="input-group d-flex align-items-center justify-content-center">
          <input
            type="text"
            className="form-control my-2 border-0"
            placeholder="Generate Room Code"
            disabled
          />
          <div className="input-group-append ">
            <button className="btn btn-primary btn-sm me-1" type="button">
              Generate
            </button>
            <button className="btn btn-outline-danger btn-sm me-1">Copy</button>
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary mt-4 btn-block form-control">
        Generate Room
      </button>
    </form>
    </>
  );
};

export default CreateRoom;
