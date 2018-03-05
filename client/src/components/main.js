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

    addButton = (e) =>{
        document.getElementsByName('grocery-name')[0].value = "";
        document.getElementsByName('grocery-quantity')[0].value = "";

        const newGrocery = {
            name: this.state.newName,
            quantity: this.state.newQuantity
        }

        communicationService.postRequest('/', newGrocery, (response)=>{
            this.setState({
                groceries: [...this.state.groceries, response.data]
            });
        }, (err)=>{
            console.log(err);
        });
    }

    collectInput = (e) =>{
        if(e.target.name === "grocery-name"){
            this.setState({
                newName: e.target.value
            });
        }

        if(e.target.name === "grocery-quantity"){
            this.setState({
                newQuantity: Number(e.target.value)
            });
        }
        console.log(e.target.name)
    }
    
    render() {
        return (
            <div className ="container-fluid">
                <h1 className="text-warning">Welcome to Grocery List App :)</h1>
                <UserInput addButton ={this.addButton} collectInput={this.collectInput}/>
                <GroceryList data={this.state.groceries} />
            </div>
        );
    }
}

export default Main;