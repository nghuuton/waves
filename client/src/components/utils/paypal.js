import React, { Component } from "react";

import PaypalExpressBtn from "react-paypal-express-checkout";

class Paypal extends Component {
    render() {
        const onSuccess = (payment) => {
            console.log(JSON.stringify(payment));
        };

        const onCancel = (data) => {
            console.log(JSON.stringify(data));
        };
        const onError = (error) => {
            console.log(JSON.stringify(error));
        };
        let env = "sandbox";
        let currency = "USD";
        let total = this.props.toPay;

        const client = {
            sandbox:
                "AZPgbZgP2zp4RIXxkpjCQHxGwt4PdyxyLOXL_qfLSr0RZEdtl-o-V7GzE1K3oRbdrqnyRIhxuTdzzb-q",
            production: "",
        };

        return (
            <div>
                <PaypalExpressBtn
                    env={env}
                    client={client}
                    currency={currency}
                    total={total}
                    onError={onError}
                    onSuccess={onSuccess}
                    onCancel={onCancel}
                    style={{
                        size: "large",
                        color: "blue",
                        shape: "rect",
                        label: "checkout",
                    }}
                />
            </div>
        );
    }
}

export default Paypal;
