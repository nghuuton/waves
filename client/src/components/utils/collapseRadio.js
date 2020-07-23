import React, { Component } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faAngleDown from "@fortawesome/fontawesome-free-solid/faAngleDown";
import faAngleUp from "@fortawesome/fontawesome-free-solid/faAngleUp";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";

import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { RadioGroup } from "@material-ui/core";

class CollapseRadio extends Component {
    state = {
        open: false,
        value: "0",
    };

    componentDidMount() {
        if (this.props.initState) {
            this.setState({
                open: this.props.initState,
            });
        }
    }

    handeleClick = () => {
        // console.log(this.state.open);
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

    renderList = () => {
        return this.props.list
            ? this.props.list.map((value) => (
                  <FormControlLabel
                      key={value._id}
                      value={`${value._id}`}
                      control={<Radio />}
                      label={value.name}
                  />
              ))
            : null;
    };

    handleChange = (event) => {
        this.props.handleFilters(event.target.value);
        this.setState({
            value: event.target.value,
        });
    };

    render() {
        return (
            <div>
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
                        <RadioGroup
                            aria-label="prices"
                            name="prices"
                            value={this.state.value}
                            onChange={this.handleChange}
                        >
                            {this.renderList()}
                        </RadioGroup>
                    </Collapse>
                </List>
            </div>
        );
    }
}

export default CollapseRadio;
