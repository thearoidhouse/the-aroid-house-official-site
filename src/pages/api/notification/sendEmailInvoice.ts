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
    templateId: "d-4095ddd2f6564cfb87086aee771800e7",
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
    templateId: "d-4095ddd2f6564cfb87086aee771800e7",
    dynamicTemplateData: {
      customerName: orderAggregate.customer.lastName + " made new order",
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
    () => {
      return response.status(200).json("email sending success");
    },
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }

      return response.status(500).json("email sending went wrong");
    }
  );
};
