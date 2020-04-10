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
        $borderColor: String!) {
        addLogo(
            text: $text,
            color: $color,
            fontSize: $fontSize,
            backgroundColor: $backgroundColor,
            borderColor: $borderColor ) {
            _id
        }
    }
`;

class CreateLogoScreen extends Component {

    render() {
        let text, color, fontSize, backgroundColor, borderColor;
        return (
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
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
                                <form onSubmit={e => {
                                    e.preventDefault();
                                    addLogo({ variables: { text: text.value, color: color.value, 
                                        fontSize: parseInt(fontSize.value), backgroundColor: backgroundColor.value,
                                        borderColor: borderColor.value } });
                                    text.value = "";
                                    color.value = "";
                                    fontSize.value = ""
                                    backgroundColor.value = "";
                                    borderColor.value = "";
                                }}>
                                    <div className="form-group">
                                        <label htmlFor="text">Text:</label>
                                        <input type="text" className="form-control" name="text" ref={node => {
                                            text = node;
                                        }} placeholder="Text" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="color">Color:</label>
                                        <input type="color" className="form-control" name="color" ref={node => {
                                            color = node;
                                        }} placeholder="Color" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fontSize">Font Size:</label>
                                        <input type="number" className="form-control" name="fontSize" ref={node => {
                                            fontSize = node;
                                        }} placeholder="Font Size" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="backgroundColor"> Background Color</label>
                                        <input type="color" className="form-control" name="backgroundColor" ref={node =>{
                                            backgroundColor = node
                                        }} placeholder = "Background Color"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderColor"> Border Color</label>
                                        <input type="color" className="form-control" name="borderColor" ref={node =>{
                                            borderColor = node
                                        }} placeholder = "Border Color"/>
                                    </div>
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </form>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                            </div>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;