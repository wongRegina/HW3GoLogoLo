import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            color
            fontSize
            backgroundColor
            borderColor
            borderRadius
            borderWidth
            padding
            margin
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderRadius: Int!,
        $borderWidth: Int!
        $padding: Int!
        $margin: Int!) {
            updateLogo(
                id: $id,
                text: $text,
                color: $color,
                fontSize: $fontSize,
                backgroundColor: $backgroundColor,
                borderColor: $borderColor,
                borderRadius: $borderRadius,
                borderWidth: $borderWidth
                padding: $padding
                margin: $margin) {
                    lastUpdate
                }
        }
`;

class EditLogoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: null,
            fontSize: null,
            textColor: null,
            backgroundColor: null,
            borderColor: null,
            borderRadius: null,
            borderWidth: null,
            padding: null,
            margin: null
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
        let text, color, fontSize, backgroundColor, borderColor,borderRadius, borderWidth, padding, margin;
        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/view/${data.logo._id}`)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4><Link to="/">Home</Link></h4>
                                            <h3 className="panel-title">
                                                Edit Logo
                                        </h3>
                                        </div>
                                        <div className="panel-body"> 
                                            <div className ="container row">
                                                <div className ="col-md-3">                                         
                                                    <form onSubmit={e => {
                                                        e.preventDefault();
                                                        updateLogo({ variables: { 
                                                            id: data.logo._id, 
                                                            text: (text.value).replace(/ /g,"\xa0"), 
                                                            color: color.value, 
                                                            fontSize: parseInt(fontSize.value), 
                                                            backgroundColor: backgroundColor.value,
                                                            borderColor: borderColor.value, 
                                                            borderRadius: parseInt(borderRadius.value), 
                                                            borderWidth: parseInt(borderWidth.value),
                                                            padding: parseInt(padding.value), 
                                                            margin: parseInt(margin.value)} });
                                                        text.value = "";
                                                        color.value = "";
                                                        fontSize.value = "";
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
                                                            }} placeholder="Text" defaultValue={data.logo.text} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="color">Color:</label>
                                                            <input type="color" className="form-control" name="color" 
                                                                    onChange={this.handleTextColorChange} ref={node => {
                                                                color = node;
                                                            }} placeholder="Color" defaultValue={data.logo.color} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="fontSize">Font Size:</label>
                                                            <input type="text" className="form-control" name="fontSize" 
                                                                    onChange={this.handleFontSizeChange} ref={node => {
                                                                fontSize = node;
                                                            }} placeholder="Font Size" defaultValue={data.logo.fontSize} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="backgroundColor"> Background Color</label>
                                                            <input type="color" className="form-control" name="backgroundColor" 
                                                                    onChange={this.handleBackgroundColorChange} ref={node =>{
                                                                backgroundColor = node
                                                            }} placeholder = "Background Color" defaultValue={data.logo.backgroundColor}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="borderColor"> Border Color</label>
                                                            <input type="color" className="form-control" name="borderColor" 
                                                                    onChange={this.handleBorderColorChange} ref={node =>{
                                                                borderColor = node
                                                            }} placeholder = "Background Color" defaultValue={data.logo.borderColor}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="borderRadius">Border Radius:</label>
                                                            <input type="text" className="form-control" name="borderRadius" 
                                                                    onChange={this.handleBorderRadiusChange} ref={node => {
                                                                borderRadius = node;
                                                            }} placeholder="Border Radius" defaultValue={data.logo.borderRadius} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="borderWidth">Border Width(Border Thickness):</label>
                                                            <input type="text" className="form-control" name="borderWidth" 
                                                                    onChange={this.handleborderWidthChange} ref={node => {
                                                                borderWidth = node;
                                                            }} placeholder="Border Width" defaultValue={data.logo.borderWidth} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="padding">Padding:</label>
                                                            <input type="text" className="form-control" name="padding" 
                                                                    onChange={this.handlePaddingChange} ref={node => {
                                                                padding = node;
                                                            }} placeholder="Padding" defaultValue={data.logo.padding} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="margin">Margin:</label>
                                                            <input type="text" className="form-control" name="margin" 
                                                                    onChange={this.handleMarginChange} ref={node => {
                                                                margin = node;
                                                            }} placeholder="Margin" defaultValue={data.logo.margin} />
                                                        </div>
                                                        <button type="submit" className="btn btn-success" >
                                                            {/*  onCompleted ={window.location.href = `/view/${data.logo._id}`}> */}
                                                            Submit
                                                        </button>
                                                    </form>
                                                    {loading && <p>Loading...</p>}
                                                    {error && <p>Error :( Please try again</p>}
                                                </div>
                                                <div className ="col-md-8" style = {{width: "max-content",
                                                        height: "max-content",overflow: 'auto'}}>
                                                    <div className = "row" style ={
                                                        {color: this.state.textColor,
                                                        fontSize: this.state.fontSize,
                                                        backgroundColor: this.state.backgroundColor,
                                                        borderColor: this.state.borderColor,
                                                        borderStyle: "solid",
                                                        borderRadius: this.state.borderRadius,
                                                        borderWidth: this.state.borderWidth,
                                                        padding: this.state.padding,
                                                        margin: this.state.margin,
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
                }}
            </Query>
        );
    }
}

export default EditLogoScreen;