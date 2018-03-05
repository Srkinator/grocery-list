import React from 'react';
import _ from 'lodash';

const GroceryList = (props) => {
    const { data } = props;
    const sortedData = _.sortBy(data, "name");

   const renderGroceries = (grocery) => {
        return (
            <div className="row">
                <span className="bg-success col-sm-4 offset-1">{grocery.name.charAt(0).toUpperCase()}{grocery.name.slice(1).toLowerCase()}</span>
                <span className="bg-success col-sm-4 offset-1">{grocery.quantity}</span>
                <button className="btn btn-warning"><i className="fa fa-minus"></i></button>
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