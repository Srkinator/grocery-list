import React from 'react';
import _ from 'lodash';

const GroceryList = (props) => {
    const { data, deleteGrocery } = props;
    const sortedData = _.sortBy(data, "name");

   const renderGroceries = (grocery) => {
        return (
            <div className="row grocery-info">
                <span className="grocery-name bg-success col-5 col-xs-2 col-sm-4 offset-1">{grocery.name.charAt(0).toUpperCase()}{grocery.name.slice(1).toLowerCase()}</span>
                <span className="grocery-quantity bg-success col-2 col-xs-2 col-sm-4 offset-1">{grocery.quantity}</span>
                <button onClick={(e)=> deleteGrocery(e)} name={grocery.name} className="btn btn-warning"><i className="fa fa-minus"></i></button>
            </div>
        )
    }

    return (
        <div>
            {sortedData.map(grocery => {
                return (
                    <div key={grocery.name}>
                        {renderGroceries(grocery)}
                    </div>
                )
            })}

        </div>
    );
};

export default GroceryList;