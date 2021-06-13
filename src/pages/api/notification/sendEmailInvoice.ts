import type { NextApiRequest, NextApiResponse } from "next";

import { OrderAggregate } from "domain/models/aggregates/OrderAggregate";

module.exports = async (request: NextApiRequest, response: NextApiResponse) => {
  let { body } = request;
  const orderAggregate = OrderAggregate.create(body, body._id).getResult();

  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msgToClient = {
    to: orderAggregate.customer.email,
    from: "dannyyys@yeowys.com", // Use the email address or domain you verified above
    subject: "TheAroidHouse Invoice",
    templateId: "d-753885d783664f1e99325d3ffbf47e64",
    // templateId: "d-8545e88ce32347ad809d7af22bd25dab",
    dynamicTemplateData: {
      customerName: orderAggregate.customer.lastName,
      cartItems: orderAggregate.cart.cartItems,
      orderTotal: orderAggregate.orderTotalAmount,
      isSelfCollect: orderAggregate.isSelfCollect ? 0 : 10,
      deliveryFee: 10,
    },
  };

  const msgToAdmin = {
    to: "yeowys95@gmail.com",
    from: "dannyyys@yeowys.com", // Use the email address or domain you verified above
    subject: "TheAroidHouse New Order",
    templateId: "d-753885d783664f1e99325d3ffbf47e64",
    // templateId: "d-8545e88ce32347ad809d7af22bd25dab",
    dynamicTemplateData: {
      customerName: orderAggregate.customer.lastName + "made new order",
      cartItems: orderAggregate.cart.cartItems,
      orderTotal: orderAggregate.orderTotalAmount,
      isSelfCollect: orderAggregate.isSelfCollect ? 0 : 10,
      deliveryFee: 10,
    },
  };

  //ES6
  sgMail.send(msgToClient).then(
    () => {},
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }

      return response.status(500).json("email sending went wrong");
    }
  );

  sgMail.send(msgToAdmin).then(
    () => {},
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }

      return response.status(500).json("email sending went wrong");
    }
  );
};
