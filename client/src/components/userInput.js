import React from 'react';

const UserInput = (props) => {
    const { collectInput, sendGrocery } = props;
    return (
        <div className= "row">
            <div className= "style-fix col-md-3">
                <input onChange={(e)=>collectInput(e)} className="basic-slide" name="grocery-name" id="name" type="text" placeholder="Please enter grocery name" /><label className="bg-success" htmlFor="name">Name</label>
            </div>
            <div className= "col-md-3">
                <input onChange={(e)=>collectInput(e)} className="basic-slide" name="grocery-quantity" id="quantity" type="number" placeholder="Please enter quantity" /><label className="bg-success" htmlFor="quantity">Quantity</label>
            </div>
            <div className="col-md-2">
            <button type="button" className="btn btn-success" onClick={(e)=> sendGrocery(e)}><i className="fa fa-plus"></i></button>
            </div>
        </div>
    );
};

export default UserInput;