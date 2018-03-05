import React from 'react';

const UserInput = (props) => {
    const { collectInput, addButton } = props;
    return (
        <div className= "row">
            <div className= "col-sm-5 offset-2">
                <input onChange={(e)=>collectInput(e)} className="basic-slide" name="grocery-name" id="name" type="text" placeholder="Please enter grocery name" /><label htmlFor="name">Name</label>
            </div>
            <div className= "col-sm-3 offset-1">
                <input onChange={(e)=>collectInput(e)} className="basic-slide" name="grocery-quantity" id="quantity" type="number" placeholder="Please enter quantity" /><label htmlFor="quantity">Quantity</label>
            </div>
            <div className="col-sm-1">
            <button type="button" className="btn btn-success" onClick={(e)=> addButton(e)}><i className="fa fa-plus"></i></button>
            </div>
        </div>
    );
};

export default UserInput;