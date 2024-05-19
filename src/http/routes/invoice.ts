//TODO : Remove ts-ignore and make definitions for `sequelize-datatable` and fix typescript issues
// @ts-ignore:3
import datatable from "sequelize-datatable";
import { Router, Request, Response, NextFunction, response } from "express";
import { celebrate, Joi } from "celebrate";
const stripe = require('stripe')('sk_test_51I3N88LegrW7VvWRlxbFbX9uPSL3huAOVv7HzZT8T7hXkl1MyuAvcU040YxSeYhxmkL5wl5mnZwRkab3ywmnpWad00ZaQwi64p');

import User from "../../db/models/user";
import { authRedirect } from "../middlewares/index";
import InvoiceService from "../../services/invoice";
import { CustomError } from "../../services/error-service";
import Payment from "../../db/models/payment";
import CommonService from "../../services/common";


// const NODE_ENV = process.env.NODE_ENV;
// const baseURL = NODE_ENV == "production" ? "https://admin.vetpass.com/admin/" : "https://staging-admin.vetpass.com/admin/";
const baseURL = "http://localhost:4444/admin/";

export default (app: Router) => {

  app.get("/send-invoice", authRedirect(true), async (req: Request, res: Response) => {
    const commonService = new CommonService();
    const  invoiceService = new InvoiceService();
    if (req.query && req.query.status && req.query.status == "success" && req.query.stripeAccountId) {
      if (req.session && req.session.user) {
        const practice_id = req.session.user.vetPractice;
        await invoiceService.updatePracticeStripeAccountId(practice_id, req.query.stripeAccountId);
        req.session.user.stripe_account_id = req.query.stripeAccountId;
      }
      req.flash(
        "success",
        `Stripe connect account created successfully.`,
        req,
        res
      );
    } else if (req.query && req.query.status && req.query.status == "fail") {
      req.flash(
        "error",
        `Something went wrong, Please try again.`,
        req,
        res
      )
    }
    res.render("invoice/user.ejs", {
      title: "Send Invoice",
      userData: req.session && req.session.user ? req.session.user : null,
      currencyTypeData: commonService.getCurrencyType(),
    });
  });

  app.get("/create-stripe-account", authRedirect(true), async (req: Request, res: Response) => {
    const insurerService = new InvoiceService();
    const stripe_account_id =  req.session && req.session.user && req.session.user.stripe_account_id ? req.session.user.stripe_account_id : null;
    const account_link: any = await insurerService.createStripeAccountAndSendLink(stripe_account_id);
    console.log("", account_link.url);
    return res.redirect(account_link.url);
  });

  const escapeString = (input: string): string => {
    if(input) {
        return input.replace(/[!@#$%^&*()+=\-[\]\\';,./{}|":<>?~_]/g, '\\$&');
    }
    return input;
  };

  app.get("/invoice/data", authRedirect(true), (req: Request, res: Response) => {
    let whereObj:any = {};
    // if(req.session && req.session.user && req.session.user.roleName && req.session.user.roleName === config.common.role.vet_practice_admin_role_name){
    //   whereObj = { created_by: req.session.user.id };
    // }
    let order:any[] = [];
    // if(req.query && req.query.search && req.query.search.value !== '') {
    //   whereObj[Op.or] = [
    //     { first_name: { [Op.like]: `%${req.query.search.value}%` } },
    //     { last_name: { [Op.like]: `%${req.query.search.value}%` } },
    //     { email: { [Op.like]: `%${req.query.search.value}%` } },
    //   ];
    //   delete req.query.search;
    // }
    console.log("req.query.search >>>", req.query.search);
    if (req.query && req.query.search && req.query.search.value == '') {
        whereObj.id = null;    
    }
    whereObj.is_deleted = null;
    datatable(User, req.query, {
      distinct: true,
      col: 'id',
      subQuery: false,
      attributes: [
        "id",
        "email",
        "first_name",
        "last_name",
      ],
      where : whereObj,
    }).then((result: any) => {
      res.json(result);
    });
  });

  app.post("/create-invoice-checkout", 
  // celebrate({
  //   body: Joi.object({
  //     sub_id: Joi.string()
  //       .required()
  //       .error(new CustomError("Subscription selection is required")),
  //     no_of_subscription_days: Joi.optional(),
  //   }),
  // }),
  async (req, res) => {
    try {
      const line_items = [
        {
          "price_data": {
            "currency": "USD",
            "product_data": {
              "name": "Operation Charges",
              "description": "Practice Operation Charges"
            },
            "unit_amount": 20 * 100,
          },
          "quantity": 1
        }
      ]

      // Create a checkout session with Stripe PAYMENT MODE
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        payment_intent_data: {
          application_fee_amount: 2*100,
          transfer_data: {
            destination: "acct_1N1onbPq0S1Qj1Hb"
          }
        },
        line_items,
        mode: "payment",
        success_url: `${baseURL}payment-status`,
        cancel_url: `${baseURL}subscriptionList`,
      });
      res.redirect(session.url);
    } catch (e) {
      // If there is an error send it to the client
      res.status(500).json({ error: e })
    }
  });

  app.get(
    "/payment-status",
    authRedirect(true),
    async (req: Request, res: Response, next: NextFunction) => {
      // const { payment_intent, sub_id, id, no_of_subscription_days } = req.session && req.session.user;
      // const paymentIntent = await stripe.paymentIntents.retrieve(
      //   payment_intent
      // );
      // console.log(payment_intent);
      // console.log(paymentIntent);
      // if(paymentIntent && paymentIntent.status !== 'succeeded') {
      //   return res.redirect("/payment/cancel.html");
      // }
  
      // const subscription = await Subscriptions.findOne({ where: { id: sub_id } });
      // let sub_start_date: any = new Date();
      // let sub_end_date: any = new Date();
      
  
      // if (subscription && subscription.duration && subscription.duration == "Month") {
      //   sub_end_date = moment(sub_end_date).clone().add(27, 'days').format("YYYY-MM-DD")
      // } else if (subscription && subscription.duration && subscription.duration == "Year") {
      //   sub_end_date = moment(sub_end_date).clone().add(364, 'days').format("YYYY-MM-DD")
      // } else if (subscription && subscription.duration && subscription.duration == "Custom") {
      //   sub_end_date = moment(sub_end_date).clone().add((no_of_subscription_days - 1), 'days').format("YYYY-MM-DD")
      // }
  
      // let amount  = subscription?.amount;
      // if (subscription && subscription.duration == "Custom" && subscription.per_day_price) {
      //   amount = subscription.per_day_price * no_of_subscription_days;
      // } else {
      //   amount = subscription?.amount;
      // }
  
  
      // const subscriptionHistory = {
      //   sub_id,
      //   user_id: id,
      //   sub_start_date: moment(sub_start_date).format("YYYY-MM-DD"),
      //   sub_end_date: moment(sub_end_date).format("YYYY-MM-DD"),
      //   paymentIntentId: payment_intent,
      //   title: subscription?.title,
      //   description: subscription?.description,
      //   duration: subscription?.duration,
      //   amount,
      //   currency_type: subscription?.currency_type,
      //   subscription_for: subscription?.subscription_for,
      //   subscription_type: subscription?.subscription_type,
      //   is_active: true,
      //   no_of_subscription_days,
      //   per_day_price: subscription?.per_day_price
      // };
  
      // await SubscriptionHistories.create(subscriptionHistory);
  
      // console.log("FROM SUCCESS >>>> ", subscription);
      return res.redirect("/payment/success.html");
    });
};
