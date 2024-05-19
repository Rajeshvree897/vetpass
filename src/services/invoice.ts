const stripe = require("stripe")(
  "sk_test_51I3N88LegrW7VvWRlxbFbX9uPSL3huAOVv7HzZT8T7hXkl1MyuAvcU040YxSeYhxmkL5wl5mnZwRkab3ywmnpWad00ZaQwi64p"
);

import VetPractices from "../db/models/vet-practices";

export default class InvoiceService {
  constructor() {}

  async updatePracticeStripeAccountId(
    id: number,
    stripe_account_id: string
  ): Promise<any> {
      return VetPractices.update({ stripe_account_id }, {where: { id }});
  }

  async createStripeAccountAndSendLink(
    stripe_account_id: string
  ): Promise<any> {
    if (stripe_account_id) {
      return stripe.accounts.createLoginLink(stripe_account_id);
    }

    const stripeAccount = await stripe.accounts.create({
      type: "express", // standard
      country: "GB",
      settings: {
        payouts: {
          schedule: {
            interval: "manual",
          },
        },
      },
    });

    console.log("stripeAccount >>> ", stripeAccount);
    const stripeAccountLinks = await stripe.accountLinks.create({
      account: stripeAccount.id,
      refresh_url: "http://localhost:4444/admin/send-invoice?status=fail", //accountRefreshUrl
      return_url: `http://localhost:4444/admin/send-invoice?status=success&stripeAccountId=${stripeAccount.id}`, //accountReturnUrl
      type: "account_onboarding",
    });
    console.log("stripeAccountLinks >>>", stripeAccountLinks);
    return stripeAccountLinks;
  }
}
