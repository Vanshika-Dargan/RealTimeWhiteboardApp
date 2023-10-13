

const JoinRoom = () => {
  return (
    <form className="form col-md-12 mt-5">
      <div className="form-group">
        <input
          type="text"
          className="form-control my-2 "
          placeholder="Enter Room Name"
        />
      </div>
      <div className="form-group">
          <input
            type="text"
            className="form-control my-2 "
            placeholder="Enter Room Code"
            
          />
      </div>
      <button type="submit" className="btn btn-info mt-4 btn-block form-control">
        Join Room
      </button>
    </form>
  );
};

export default JoinRoom