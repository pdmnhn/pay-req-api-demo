"use client";

import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

const googlePaymentDataRequest = {
  environment: "TEST",
  apiVersion: 2,
  apiVersionMinor: 0,
  merchantInfo: {
    merchantName: "Example Merchant",
  },
  allowedPaymentMethods: [
    {
      type: "CARD",
      parameters: {
        allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
        allowedCardNetworks: [
          "AMEX",
          "DISCOVER",
          "INTERAC",
          "JCB",
          "MASTERCARD",
          "VISA",
        ],
      },
      tokenizationSpecification: {
        type: "PAYMENT_GATEWAY",
        parameters: {
          gateway: "example",
          gatewayMerchantId: "exampleGatewayMerchantId",
        },
      },
    },
  ],
};

function buildSupportedPaymentMethodData() {
  return [
    {
      supportedMethods: "basic-card",
      data: {
        supportedNetworks: [
          "visa",
          "mastercard",
          "amex",
          "jcb",
          "diners",
          "discover",
          "mir",
          "unionpay",
        ],
      },
    },
    {
      supportedMethods: "https://google.com/pay",
      data: googlePaymentDataRequest,
    },
  ];
}

function buildShoppingCartDetails() {
  return {
    id: "order-123",
    displayItems: [
      {
        label: "Example item",
        amount: { currency: "USD", value: "1.00" },
      },
    ],
    total: {
      label: "Total",
      amount: { currency: "USD", value: "1.00" },
    },
  };
}

export default function Home() {
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest>();
  useEffect(() => {
    const request = new PaymentRequest(
      buildSupportedPaymentMethodData(),
      buildShoppingCartDetails()
    );
    setPaymentRequest(request);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <AppBar position="static">
        <Toolbar variant="regular">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Payment Request API Demo by pdmnhn
          </Typography>
        </Toolbar>
      </AppBar>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Payment Request API Demo
            </Typography>
            <Typography variant="body1">
              Added Google Pay as one of the supported methods
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="medium" onClick={() => paymentRequest?.show()}>
              Pay Now
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}
