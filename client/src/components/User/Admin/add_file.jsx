import React, { Component } from "react";
import UserLayout from "../../../HOC/user";

import Dropzone from "react-dropzone";
import axios from "axios";
import { Link } from "react-router-dom";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faPlusCircle from "@fortawesome/fontawesome-free-solid/faPlusCircle";
import CircularProgress from "@material-ui/core/CircularProgress";

class AddFile extends Component {
    constructor() {
        super();
        this.state = {
            formSuccess: false,
            formError: false,
            uploading: false,
            files: [],
        };
    }

    onDrop(files) {
        this.setState({ uploading: true });
        let formData = new FormData();
        const config = {
            header: { "content-type": "multipart/form-data" },
        };
        formData.append("file", files[0]);
    }

    render() {
        return (
            <UserLayout>
                <h1>Upload file</h1>
                <div>
                    <Dropzone
                        onDrop={(e) => this.onDrop(e)}
                        multiple={false}
                        className="dropzone_box"
                    >
                        <div className="wrap">
                            <FontAwesomeIcon icon={faPlusCircle} />
                        </div>
                    </Dropzone>
                    {this.state.uploading ? (
                        <div style={{ textAlign: "center", paddingTop: "60px" }}>
                            <CircularProgress
                                style={{ color: "#00bcd4" }}
                                thickness={7}
                            />
                        </div>
                    ) : null}
                    <div style={{ clear: "both" }}>
                        {this.state.formSuccess ? (
                            <div className="form_success">Success</div>
                        ) : null}
                        {this.state.formError ? (
                            <div className="error_label">Please check your data</div>
                        ) : (
                            ""
                        )}
                    </div>
                    <hr />
                    <div>uploads</div>
                </div>
            </UserLayout>
        );
    }
}

export default AddFile;
