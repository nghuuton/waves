import React, { Component } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faAngleDown from "@fortawesome/fontawesome-free-solid/faAngleDown";
import faAngleUp from "@fortawesome/fontawesome-free-solid/faAngleUp";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Collapse from "@material-ui/core/Collapse";

class CollapseCheckbox extends Component {
    state = {
        open: false,
        checked: [],
    };

    componentDidMount() {
        if (this.props.initState) {
            this.setState({
                open: this.props.initState,
            });
        }
    }

    handeleClick = () => {
        console.log(this.state.open);
        this.setState({
            open: !this.state.open,
        });
    };

    handeleAngle = () => {
        return this.state.open ? (
            <FontAwesomeIcon icon={faAngleUp}></FontAwesomeIcon>
        ) : (
            <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
        );
    };

    renderList = () =>
        this.props.list ? this.props.list.map((value) => <ListItem></ListItem>) : null;

    render() {
        return (
            <div className="collapse_items_wrapper">
                <List style={{ borderBottom: "1px solid #dbdbdb" }}>
                    <ListItem
                        onClick={this.handeleClick}
                        style={{ padding: "10px 23px 10px 0" }}
                    >
                        <ListItemText
                            primary={this.props.title}
                            className="collapse_title"
                        />
                        {this.handeleAngle()}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {this.renderList()}
                        </List>
                    </Collapse>
                </List>
            </div>
        );
    }
}

export default CollapseCheckbox;
