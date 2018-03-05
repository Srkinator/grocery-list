import React, { Component } from 'react';

import UserInput from './userInput';
import GroceryList from './groceryList';
import { communicationService } from "../services/communicationService";


class Main extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
			groceries: [],
			newName: "",
			newQuantity: ""
		};
    }

    fetchData =() =>{
        communicationService.getRequest('/', (response)=>{
            this.setState({
                groceries: response.data
            });
        }, (err)=>{
            console.log(err);
        });
    }

    componentDidMount(){
        this.fetchData();
    }
    
    render() {
        return (
            <div className ="container-fluid">
                <h1>Welcome to Grocery List App :)</h1>
                <UserInput />
                <GroceryList data={this.state.groceries} />
            </div>
        );
    }
}

export default Main;