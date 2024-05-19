// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"
import { celebrate, Joi } from "celebrate";
const _ = require('lodash');
import { Op } from "sequelize";
const stripe = require('stripe')('sk_test_51I3N88LegrW7VvWRlxbFbX9uPSL3huAOVv7HzZT8T7hXkl1MyuAvcU040YxSeYhxmkL5wl5mnZwRkab3ywmnpWad00ZaQwi64p');

import CommonService from "../../services/common";
import SubscriptionServices from "../../services/subscription"
import { authRedirect } from "../middlewares/index";
import constants from "../../helpers/constants";
import { CustomError } from "../../services/error-service";
import Subscriptions from "../../db/models/subcription";
import User from "../../db/models/user";
import SubscriptionHistories from "../../db/models/subcription-histories";
import Payment from "../../db/models/payment";
import moment from "moment";
import SubscriptionTypes from "../../db/models/subscription-types";
import Advertisements from "../../db/models/advertisement";
const NODE_ENV = process.env.NODE_ENV;
// const baseURL = "http://localhost:4444/admin/"; 
const baseURL = NODE_ENV == "production" ? "https://admin.vetpass.com/admin/" : "https://staging-admin.vetpass.com/admin/";

export default (app: Router) => {
  app.get(
    "/subscriptions",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("subscriptions/index.ejs", {
        title: "Subscription list",
        userData: req.session && req.session.user ? req.session.user : null,
      })
    }
  )

  // app.get(
  //   "/advertisement-details",
  //   authRedirect(true),
  //   async (req: Request, res: Response) => {
  //   const commonService = new CommonService();
  //   const advertisement = await commonService.getAdvertisement(req.session?.user.id);
  //     res.render("advertisements/advertisement-create.ejs", {
  //       responseData: advertisement,
  //       title: constants.PAGE_TITLE.ADVERTISEMENT_ADD,
  //       userData: req.session && req.session.user ? req.session.user : null,
  //       // users: await commonService.getServiceProviders()
  //     })
  //   }
  // )

  app.get('/subscription', authRedirect(true), async (req: Request, res: Response) => {
    const commonService = new CommonService();
    return res.render('subscriptions/subscriptions.ejs', {
      title: constants.PAGE_TITLE.SUBSCRIPTION_ADD,
      userData: req.session && req.session.user ? req.session.user : null,
      currencyTypeData: commonService.getCurrencyType(),
      subscriptionDurationData: commonService.getSubscriptionDuration(),
      subscriptionForData: commonService.getSubscriptionFor(),
      subscriptionTitleData: await commonService.getSubscriptiontypes(),
    });
  });

  app.post(
    '/subscriptions',
    authRedirect(true),
    celebrate({
      body: Joi.object({
        title: Joi.string()
          .required()
          .error(new CustomError("Title is required")),
        description: Joi.string()
          .required()
          .error(new CustomError("Description is required")),
        duration: Joi.string()
          .required()
          .error(new CustomError("Duration is required")),
        amount: Joi.string().optional(),
        per_day_price: Joi.string().optional(),
        currency_type: Joi.string()
          .required()
          .error(new CustomError("Currency type is required")),
        subscription_for: Joi.string()
          .required()
          .error(new CustomError("Subcription for is required")),
        subscription_type: Joi.string()
          .required()
          .error(new CustomError("Subcription type is required")),
        id: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      req.body.created_by = req.session?.user.id;
      const subscriptionServices = new SubscriptionServices();
      subscriptionServices
        .addSubscription(req.body, req.session?.user.id)
        .then(() => {
          req.flash(
            'success',
            `Subscription is created successfully.`,
            req,
            res
          );
          res.redirect("/admin/subscriptions")
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.get(
    "/subscriptions/data",
    authRedirect(true),
    async (req: Request, res: Response) => {
      datatable(Subscriptions, req.query, {
        distinct: true,
        col: 'id',
      }).then((result: any) => {
        res.json(result);
      })
    }
  )

  app.get(
    "/subscriptions/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const commonService = new CommonService();
      const subscriptionServices = new SubscriptionServices();
      const subscriptionId = req.params.id;
      
      subscriptionServices
        .getSubscription(+req.params.id)
        .then(async (responseData: any) => {
          res.render("subscriptions/subscriptions.ejs", {
            title: constants.PAGE_TITLE.SUBSCRIPTION_EDIT,
            userData: req.session && req.session.user ? req.session.user : null,
            responseData,
            subscriptionId,
            currencyTypeData: commonService.getCurrencyType(),
            subscriptionDurationData: commonService.getSubscriptionDuration(),
            subscriptionForData: commonService.getSubscriptionFor(),
            subscriptionTitleData: await commonService.getSubscriptiontypes(),
          })
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/subscriptions/update",
    celebrate({
      body: Joi.object({
        title: Joi.string()
          .required()
          .error(new CustomError("Subscription title is required")),
        description: Joi.string()
          .required()
          .error(new CustomError("Description is required")),
        duration: Joi.string()
          .required()
          .error(new CustomError("Duration is required")),
        amount: Joi.string().optional(),
        per_day_price: Joi.string().optional(),
        currency_type: Joi.string()
          .required()
          .error(new CustomError("Currency type is required")),
        subscription_for: Joi.string()
          .required()
          .error(new CustomError("Subcription for is required")),
        subscription_type: Joi.string()
          .required()
          .error(new CustomError("Subcription type is required")),
        id: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const subscriptionServices = new SubscriptionServices();

      subscriptionServices
        .updateSubscription(req.body, req.session?.user.id)
        .then(() => {
          req.flash(
            "success",
            `Subscription is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/subscriptions")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/subscriptions/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const subscriptionServices = new SubscriptionServices();
      subscriptionServices
        .deleteSubscriptions(+req.params.id)
        .then((result:any) => {
          if (result && result.is_delted) {
            req.flash(
              "success",
              "Subscription deleted successfully.",
              req,
              res
            )
          } else if (result && result.is_archived) {
            req.flash(
              "success",
              "Subscription archived successfully.",
              req,
              res
            )
          }
          res.redirect("/admin/subscriptions")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/subscriptionList",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const commonService = new CommonService();
      const subscriptionServices = new SubscriptionServices();
      console.log(req?.session?.user);
      subscriptionServices
        .getSubscriptionList(req.session?.user.id, req.session?.user.role)
        .then(async (responseData: any) => {
          // res.render("subscriptions/subscription-list.ejs", {
          res.render("subscriptions/subscription-list-new.ejs", {
            title: constants.PAGE_TITLE.SUBSCRIPTION_LIST,
            userData: req.session && req.session.user ? req.session.user : null,
            responseData: responseData.subscriptionList,
            activeSubscriptionList: responseData.activeSubscriptionList,
            currencyTypeData: commonService.getCurrencyType(),
            subscriptionDurationData: commonService.getSubscriptionDuration(),
            subscriptionForData: commonService.getSubscriptionFor(),
            subscriptionTitleData: await commonService.getSubscriptiontypes(),
          })
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )


app.post("/create-checkout-session", 
celebrate({
  body: Joi.object({
    sub_id: Joi.string()
      .required()
      .error(new CustomError("Subscription selection is required")),
    no_of_subscription_days: Joi.optional(),
  }),
}),
async (req, res) => {
  try {
    const { sub_id, no_of_subscription_days } = req.body;
    const subcription = await Subscriptions.findOne({ where: { id: sub_id } });

    if (!subcription) {
      return res.redirect("/subscriptionList");
    }

    const paymentInfo = await Payment.findOne({ where: { user: req.session?.user.id }});
    let customer_id = paymentInfo?.customer_id;
    if(!paymentInfo || !paymentInfo.customer_id) {
      const customer = await stripe.customers.create({
        description: 'user id:'+ req.session?.user.id,
      });
      customer_id = customer.id;
      const dataToStore = {
          customer_id: customer.id,
          user: req.session?.user.id
      }
      const data = await Payment.create(dataToStore);
    }
    console.log("customer_id >>> ", customer_id);

    const line_items = [
      {
        "price_data": {
          "currency": subcription.currency_type,
          "product_data": {
            "name": subcription.title,
            "description": subcription.duration == "Custom" ? `Custom Plan for ${no_of_subscription_days} days` : `${subcription.duration}ly Plan`
          },
          "unit_amount": subcription.amount ? Number(subcription.amount) * 100 : Number(no_of_subscription_days * subcription.per_day_price) * 100,
        },
        "quantity": 1
      }
    ]

    // Create a checkout session with Stripe PAYMENT MODE
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${baseURL}payment-status`,
      cancel_url: `${baseURL}subscriptionList`,
    });

    // Create a checkout session with Stripe SUBSCRIPTION MODE
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ["card"],
    //   line_items: [
    //     {
    //       price: subcription?.stripe_price_id, // PRICE_ID GET FROM STRIPE AFTER CREATING SUBSCRIPTION
    //       quantity: 1,
    //     },
    //   ],
    //   customer: customer_id, // SET IF ALREADY CREATED THIS CUSTOMER MANAGE IN PAYMENT DB TABLE
    //   mode: "subscription",
    //   success_url: `http://localhost:4444/admin/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: `http://localhost:4444/payment/cancel.html`,
    // });

    if (req.session && req.session.user) {
      req.session.user.payment_intent = session.payment_intent;
      req.session.user.sub_id = sub_id;
      req.session.user.no_of_subscription_days = no_of_subscription_days;
    }
    console.log(">>>>>>>>>", session);
    res.redirect(session.url);
    // res.json({ url: session.url })
  } catch (e) {
    // If there is an error send it to the client
    res.status(500).json({ error: e })
  }
})

app.get(
  "/payment-status",
  authRedirect(true),
  async (req: Request, res: Response, next: NextFunction) => {
    const { payment_intent, sub_id, id, no_of_subscription_days } = req.session && req.session.user;
    const paymentIntent = await stripe.paymentIntents.retrieve(
      payment_intent
    );
    console.log(payment_intent);
    console.log(paymentIntent);
    if(paymentIntent && paymentIntent.status !== 'succeeded') {
      return res.redirect("/payment/cancel.html");
    }

    const subscription = await Subscriptions.findOne({ where: { id: sub_id } });
    let sub_start_date: any = new Date();
    let sub_end_date: any = new Date();
    

    if (subscription && subscription.duration && subscription.duration == "Month") {
      sub_end_date = moment(sub_end_date).clone().add(27, 'days').format("YYYY-MM-DD")
    } else if (subscription && subscription.duration && subscription.duration == "Year") {
      sub_end_date = moment(sub_end_date).clone().add(364, 'days').format("YYYY-MM-DD")
    } else if (subscription && subscription.duration && subscription.duration == "Custom") {
      sub_end_date = moment(sub_end_date).clone().add((no_of_subscription_days - 1), 'days').format("YYYY-MM-DD")
    }

    let amount  = subscription?.amount;
    if (subscription && subscription.duration == "Custom" && subscription.per_day_price) {
      amount = subscription.per_day_price * no_of_subscription_days;
    } else {
      amount = subscription?.amount;
    }


    const subscriptionHistory = {
      sub_id,
      user_id: id,
      sub_start_date: moment(sub_start_date).format("YYYY-MM-DD"),
      sub_end_date: moment(sub_end_date).format("YYYY-MM-DD"),
      paymentIntentId: payment_intent,
      title: subscription?.title,
      description: subscription?.description,
      duration: subscription?.duration,
      amount,
      currency_type: subscription?.currency_type,
      subscription_for: subscription?.subscription_for,
      subscription_type: subscription?.subscription_type,
      is_active: true,
      no_of_subscription_days,
      per_day_price: subscription?.per_day_price
    };

    await SubscriptionHistories.create(subscriptionHistory);

    console.log("FROM SUCCESS >>>> ", subscription);
    return res.redirect("/payment/success.html");
  });

  app.post(
    "/subcription-end",
    async (req: Request, res: Response, next: NextFunction) => {
      const request = req.body;
      console.log(request);
      return res.status(200).json({"message": "OK"});
  });


  app.get('/payment/success/:session_id?', async (req, res) => {
    console.log(req.query.session_id);
    let customerName = "";
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    customerName = session.customer_details.name;
    console.log("session >> ", session);

    // if(paymentIntent && paymentIntent.status !== 'succeeded') {
    //   return res.redirect("/payment/cancel.html");
    // }
    // const customer = await stripe.customers.retrieve(session.customer);
    // if (customer && customer.name) {
    //   customerName = customer.name;
    // }
    // console.log("customer >> ", customer);
  
    res.send(`<html><body><h1>Thanks for your order, ${customerName}!</h1></body></html>`);
  });

  app.get("/subscriptions/:id/unArchive", authRedirect(true), (req: Request, res: Response, next: NextFunction) => {
    const subscriptionServices = new SubscriptionServices();
      subscriptionServices
      .unArchiveSubscription(+req.params.id)
      .then(() => {
        req.flash(
          "success",
          "Subscription UnArchived successfully.",
          req,
          res
        );
        res.redirect("/admin/subscriptions");
      })
      .catch((error: Error) => {
        return next(error);
      });
  });

  app.get(
    "/subscribers",
    authRedirect(true),
    async (req: Request, res: Response) => {
      
      const commonService = new CommonService();
      console.log(commonService.getSubscriptionFor());
      res.render("subscriptions/subscribers.ejs", {
        title: "Subscribers list",
        userData: req.session && req.session.user ? req.session.user : null,
        subscriptions: await commonService.getSubscriptiontypes(),
        subscriptionForData: commonService.getSubscriptionFor(),
        fanPageQuery: req.query?.fanPage
      });
    }
  );

  app.get(
    "/subscribers/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      let whereObj: any = {};
      const name = _.find(req.query.columns, { 'data': 'Type.name' }).search.value;
      const subscription_for = _.find(req.query.columns, { 'data': 'subscription_for' }).search.value;
      const is_active = _.find(req.query.columns, { 'data': 'is_active' }).search.value;
      
      // Subscription Type Filter
      if (name != '') {
        whereObj['$Type.name$'] = name;
      }
      
      // Subscription For Filter
      if (subscription_for != '') {
        whereObj['subscription_for'] = subscription_for;
      }
      
      // Status Filter
      if (is_active && is_active == "true") {
        whereObj['is_active'] = true;
      } else if (is_active && is_active == "null") {
        whereObj['is_active'] = null;
      } else if (is_active && is_active == "false") {
        whereObj['is_active'] = false;
      }
      
      console.log(name,subscription_for, is_active);
      datatable(SubscriptionHistories, req.query, {
        attributes: [
          "id",
          "sub_id",
          "user_id",
          "title",
          "subscription_type",
          "duration",
          "currency_type",
          "subscription_for",
          "amount",
          "is_active",
          "sub_start_date",
          "sub_end_date"
          // [Sequelize.fn('CONCAT', col('`user`.`first_name`'), ' ', col('`user`.`last_name`')), 'user_name'],
          // [Sequelize.fn('CONCAT', col('`admin`.`firstname`'), ' ', col('`admin`.`lastname`')), 'admin_name']
        ],
        include: [
          {
            model: User,
            as: "user",
            required: false,
            attributes: ['first_name', 'last_name']
          },
          { model: SubscriptionTypes, as: "Type" }
        ],
        where: whereObj
      }).then((result: any) => {
        result.is_active = is_active;
        result.subscription_for = subscription_for;
        result.Type = {};
        result.Type.name = name;
        res.json(result);
      })
    }
  )

  app.get(
    "/advertisement-subscriptions",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("subscriptions/active-subscriptions.ejs", {
        title: "Advertisments Subscription list",
        userData: req.session && req.session.user ? req.session.user : null,
      })
    }
  )

  app.get(
    "/advertisement-subscriptions/data",
    authRedirect(true),
    async (req: Request, res: Response) => {
      const { id } = req.session && req.session.user;
      datatable(SubscriptionHistories, req.query, {
        distinct: true,
        col: 'id',
        include: [
          { model: SubscriptionTypes, as: "Type" },
          { model: Advertisements, as: "advertisements" }
        ],
        where: { user_id: id, subscription_type: { [Op.in]: [1,3] } }
      }).then((result: any) => {
        res.json(result);
      })
    }
  )

}
