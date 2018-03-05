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

    sendGrocery = (e) =>{
        const missingName = document.getElementById('missing-name');
        const missingQuantity = document.getElementById('missing-quantity');
        let putOrPost ='post';
        let nameValidation = false;
        let quantityValidation = false;

        const newGrocery = {
            name: this.state.newName,
            quantity: this.state.newQuantity
        }

        if(newGrocery.name){
            missingName.setAttribute('style', "color:red; display:none");
            nameValidation = true;
        } else {
            missingName.setAttribute('style', "color:red");
            nameValidation = false;
        }

        if(newGrocery.quantity){
            missingQuantity.setAttribute('style', "color:red; display:none");
            quantityValidation = true;
        } else {
            missingQuantity.setAttribute('style', "color:red");
            quantityValidation = false;
        }

        if(nameValidation && quantityValidation){
        for(let i = 0; i< this.state.groceries.length; i++){
            if(this.state.groceries[i].name ===newGrocery.name){
                putOrPost = 'put';
                communicationService.putRequest('/' + newGrocery.name, newGrocery, (response)=>{
                  this.fetchData();
                }, (err)=>{
                    console.log(err);
                });
            }
        }
        if(putOrPost === 'post'){
            communicationService.postRequest('/', newGrocery, (response)=>{
            this.fetchData();
            }, (err)=>{
                console.log(err);
            });
        }
        document.getElementsByName('grocery-name')[0].value = "";
        document.getElementsByName('grocery-quantity')[0].value = "";
            this.setState({
                newName: '',
                newQuantity: ''
            })
        }
    }

    collectInput = (e) =>{
        if(e.target.name === 'grocery-name'){
            this.setState({
                newName: e.target.value
            });
        }

        if(e.target.name === 'grocery-quantity'){
            this.setState({
                newQuantity: Number(e.target.value)
            });
        }
    }

    deleteGrocery = (e) =>{
        communicationService.deleteRequest('/' + e.currentTarget.name, (response)=>{
            this.fetchData();
        }, (err)=>{
            console.log(err);
        });
    }
    
    render() {
        return (
            <div className ="container-fluid">
                <h1 className="text-warning">Welcome to Grocery List App :)</h1>
                <UserInput sendGrocery ={this.sendGrocery} collectInput={this.collectInput} />
                <p id="missing-name" style={{color:"red", display:"none"}}>Please enter grocery name before you want to proceed!</p>
                <p id="missing-quantity" style={{color:"red", display:"none"}}>Please enter grocery quantity before you want to proceed!</p>
                <GroceryList data={this.state.groceries} deleteGrocery={this.deleteGrocery}/>
            </div>
        );
    }
}

export default Main;