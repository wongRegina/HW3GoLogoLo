import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';

const ADD_LOGO = gql`
    mutation AddLogo(
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderRadius: Int!,
        $borderWidth: Int!,
        $padding: Int!,
        $margin: Int!) {
        addLogo(
            text: $text,
            color: $color,
            fontSize: $fontSize,
            backgroundColor: $backgroundColor,
            borderColor: $borderColor, 
            borderRadius: $borderRadius,
            borderWidth: $borderWidth,
            padding: $padding,
            margin: $margin) {
            _id
        }
    }
`;

class CreateLogoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "GoLogoLo",
            fontSize: "30",
            textColor: "#FF5733",
            backgroundColor: "#A569BD",
            borderColor: "#707B7C",
            borderRadius: "10",
            borderWidth: "10",
            padding: "10",
            margin: "10"
        };
    }

    handleTextChange =(event) =>{
        this.setState({ text: event.target.value });
    }
    
    handleTextColorChange = (event) => {
        console.log("handleTextColorChange to " + event.target.value);
        this.setState({ textColor: event.target.value });
    }

    handleFontSizeChange = (event) => {
        console.log("handleTextFontChangeComplete to " + event.target.value);
        this.setState({ fontSize: event.target.value });
    }

    handleBackgroundColorChange = (event) => {
        console.log("handleBackgroundColorChange to " + event.target.value)
        this.setState({ backgroundColor: event.target.value });
    }

    handleBorderColorChange = (event) => {
        console.log("handleBorderColorChange to " + event.target.value)
        this.setState({ borderColor: event.target.value });
    }

    handleBorderRadiusChange = (event) => {
        console.log("handleBorderRadiusChange to " + event.target.value)
        this.setState({ borderRadius: event.target.value });
    }

    handleborderWidthChange = (event) => {
        console.log("handleborderWidthChange to " + event.target.value)
        this.setState({ borderWidth: event.target.value });
    }

    handlePaddingChange = (event) => {
        console.log("handlePaddingChange to " + event.target.value)
        this.setState({ padding: event.target.value });
    }

    handleMarginChange = (event) => {
        console.log("handleMarginChange to " + event.target.value)
        this.setState({ margin: event.target.value });
    }

    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin;
        return (
            <Mutation mutation={ADD_LOGO} onCompleted={data => {this.props.history.push(`/view/${data.addLogo._id}`)}
                }>
                {(addLogo, { loading, error }) => (
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4><Link to="/">Home</Link></h4>
                                <h3 className="panel-title">
                                    Create Logo
                            </h3>
                            </div>
                            <div className="panel-body">
                                <div className ="container row">
                                    <div className ="col-md-3">
                                        <form onSubmit={e => {
                                            e.preventDefault();
                                            if((text.value).trim() === ""){
                                                return false;
                                            }
                                            addLogo({ variables: { text: (text.value).trim().replace(/ /g,"\xa0"), color: color.value, 
                                                fontSize: parseInt(fontSize.value), backgroundColor: backgroundColor.value,
                                                borderColor: borderColor.value, borderStyle: "solid",
                                                borderRadius: parseInt(borderRadius.value), borderWidth: parseInt(borderWidth.value) ,
                                                padding: parseInt(padding.value), margin: parseInt(margin.value) } });
                                            text.value = "";
                                            color.value = "";
                                            fontSize.value = ""
                                            backgroundColor.value = "";
                                            borderColor.value = "";
                                            borderRadius.value = "";
                                            borderWidth.value = "";
                                            padding.value = "";
                                            margin.value = "";
                                        }}>
                                            <div className="form-group">
                                                <label htmlFor="text">Text:</label>
                                                <input type="text" className="form-control" name="text"
                                                    onChange={this.handleTextChange} ref={node => {
                                                    text = node;
                                                }} placeholder="Text" defaultValue="GoLogoLo"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="color">Color:</label>
                                                <input type="color" className="form-control" 
                                                    onChange={this.handleTextColorChange} name="color" ref={node => {
                                                    color = node;
                                                }} placeholder="Color" defaultValue="#FF5733"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="fontSize">Font Size:</label>
                                                <input type="number" min="2" max = "144" className="form-control" 
                                                    onChange={this.handleFontSizeChange} name="fontSize" ref={node => {
                                                    fontSize = node;
                                                }} placeholder="Font Size" defaultValue="30"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="backgroundColor"> Background Color</label>
                                                <input type="color" className="form-control" 
                                                    onChange={this.handleBackgroundColorChange} name="backgroundColor" ref={node =>{
                                                    backgroundColor = node
                                                }} placeholder = "Background Color" defaultValue ="#A569BD"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="borderColor"> Border Color</label>
                                                <input type="color" className="form-control" 
                                                    onChange={this.handleBorderColorChange} name="borderColor" ref={node =>{
                                                    borderColor = node
                                                }} placeholder = "Border Color" defaultValue = "#707B7C"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="borderRadius">Border Radius:</label>
                                                <input type="number" min="0" max = "30" className="form-control" 
                                                    onChange={this.handleBorderRadiusChange} name="borderRadius" ref={node => {
                                                    borderRadius = node;
                                                }} placeholder="Border Radius" defaultValue = "10"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="borderWidth">Border Width(Border Thickness):</label>
                                                <input type="number" min="0" max = "30" className="form-control" 
                                                    onChange={this.handleborderWidthChange} name="borderWidth" ref={node => {
                                                    borderWidth = node;
                                                }} placeholder="Border Width" defaultValue = "10"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="padding">Padding:</label>
                                                <input type="number" min="0" max = "30" className="form-control"
                                                    onChange={this.handlePaddingChange} name="padding" ref={node => {
                                                    padding = node;
                                                }} placeholder="Padding" defaultValue = "10"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="margin">Margin:</label>
                                                <input type="number" min="0" max = "30" className="form-control" 
                                                    onChange={this.handleMarginChange} name="margin" ref={node => {
                                                    margin = node;
                                                }} placeholder="Margin" defaultValue = "10"/>
                                            </div>
                                            <button type="submit" className="btn btn-success">Submit</button>
                                        </form>
                                        {loading && <p>Loading...</p>}
                                        {error && <p>Error :( Please try again</p>}
                                    </div>
                                    <div className ="col-md-8" style = {{width: "max-content",
                                            height: "max-content",overflow: 'auto'}}>
                                        <div className = "row" style ={
                                                        {color: this.state.textColor,
                                                        fontSize: parseInt(this.state.fontSize),
                                                        backgroundColor: this.state.backgroundColor,
                                                        borderColor: this.state.borderColor,
                                                        borderStyle: "solid",
                                                        borderRadius: parseInt(this.state.borderRadius),
                                                        borderWidth: parseInt(this.state.borderWidth),
                                                        padding: parseInt(this.state.padding),
                                                        margin: parseInt(this.state.margin),
                                                        width: "max-content",
                                                        height: "max-content",
                                                        overflow: 'auto'}}>
                                                        {this.state.text}
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;