import { OrderAggregate } from "domain/models/aggregates/OrderAggregate";

interface ISendGridEmailNotification {
  orderAggregate: OrderAggregate;
}

export const sendGridEmailNotification = async ({
  orderAggregate,
}: ISendGridEmailNotification) => {
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: orderAggregate.customer.email,
    from: "dannyyys@yeowys.com", // Use the email address or domain you verified above
    subject: "TheAroidHouse Invoice",
    templateId: "d-8545e88ce32347ad809d7af22bd25dab",
    dynamicTemplateData: {
      customerName: orderAggregate.customer.lastName,
      cartItems: orderAggregate.cart.cartItems,
      orderTotal: orderAggregate.orderTotalAmount,
      isSelfCollect: orderAggregate.isSelfCollect ? 0 : 10,
      deliveryFee: 10,
    },
  };

  //ES6
  sgMail.send(msg).then(
    () => {
      console.log("email sent successfully");
    },
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );

  return Promise.resolve("success");
};
