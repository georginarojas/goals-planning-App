import React from 'react';

const ItemStats = (props) =>{
    return(
        <div>
            <h5>Total: {props.list.length} {props.name}</h5>
            <h5> Completed: {props.finished}</h5>
            <h5> Percent: {props.percentDone}%</h5>
        </div>
    );
}
export default ItemStats;