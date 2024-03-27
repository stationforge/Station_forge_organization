import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import Stripe from "stripe";
import firebaseConfig from "./fire_base_config";
import { getAuth } from "firebase/auth";

export const stripe = new Stripe(
  process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY ?? "",
  {
    apiVersion: "2023-10-16",
    typescript: true,
  },
);

// Function to calculate the Unix timestamp for the 1st day of the next month
function getNextMonthTimestamp() {
  const currentDate = new Date();
  const nextMonth = new Date(
    Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth() + 1, 1),
  );
  return Math.floor(nextMonth.getTime() / 1000);
}

export const pay_standard_Subscriptions: any = async (
  userid: string,
  email: string,
) => {
  const billing_url = `${
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000/"
  }${"subscriptions"}`;

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: billing_url,
    cancel_url: billing_url,
    payment_method_types: ["card"],
    mode: "subscription",
    billing_address_collection: "auto",
    customer_email: email,
    line_items: [
      {
        price: process.env.NEXT_PUBLIC_STANDARD_PRICE,
        quantity: 1,
      },
    ],
    metadata: {
      userId: userid,
    },
    // subscription_data: {
    //   // Set the billing cycle anchor to the 1st of the next month
    //   billing_cycle_anchor: getNextMonthTimestamp(),
    //   // proration_behavior: "create_prorations",
    // },
  });

  // console.log(stripeSession.url);
  return { id: stripeSession.id };
};

export const pay_merchant_Subscriptions: any = async (
  userid: string,
  email: string,
) => {
  const billing_url = `${
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000/"
  }${"subscriptions"}`;

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: billing_url,
    cancel_url: billing_url,
    payment_method_types: ["card"],
    mode: "subscription",
    billing_address_collection: "auto",
    customer_email: email,

    line_items: [
      {
        price: process.env.NEXT_PUBLIC_MERCHANT_PRICE,
        quantity: 1,
      },
    ],
    metadata: {
      userId: userid,
    },
    // subscription_data: {
    //   // Set the billing cycle anchor to the 1st of the next month
    //   billing_cycle_anchor: getNextMonthTimestamp(),
    //   // proration_behavior: "create_prorations",
    // },
  });

  // console.log(stripeSession.url);
  return { id: stripeSession.id };
};

export const manage_subscription: any = async (customerid: string) => {
  const billing_url = `${
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000/"
  }${"subscriptions"}`;

  const stripeSession = await stripe.billingPortal.sessions.create({
    customer: customerid,
    return_url: billing_url,
  });
  return { url: stripeSession.url };
};

// export const upgrade_subscriptions: any = async (customerid: string) => {
//   const billing_url = `${
//     process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000/"
//   }${"subscriptions"}`;

//   const subscriptions = await stripe.subscriptions.list({
//     customer: customerid,
//   });

//   return { url: subscriptions.url };
// };

export const renew_subscription: any = async (
  customerid: string,
  userid: string,
  email: string,
  priceid: any,
) => {
  const billing_url = `${
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000/"
  }${"subscriptions"}`;
  const stripeSession = await stripe.checkout.sessions.create({
    success_url: billing_url,
    customer: customerid, // Replace with the actual customer ID
    cancel_url: billing_url,
    payment_method_types: ["card"],
    mode: "subscription",
    billing_address_collection: "auto",

    line_items: [
      {
        price: priceid,
        quantity: 1,
      },
    ],
    metadata: {
      userId: userid,
    },
    subscription_data: {
      billing_cycle_anchor: getNextMonthTimestamp(),
    },
  });

  // console.log(stripeSession.url);
  return { id: stripeSession.id };
};

export const cancelSubscription = async (customerId: any) => {
  try {
    // Retrieve customer's subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
    });

    // Check if the customer has any active subscriptions
    if (subscriptions.data.length > 0) {
      // Assuming you want to cancel the first active subscription,
      // you can customize this logic based on your requirements
      const subscriptionId = subscriptions.data[0].id;

      const subscription = await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
      });
      return;
      // return console.log(subscription);
    } else {
      // return console.log("No active subscriptions found for the customer");
      return;
    }
  } catch (error) {
    console.error("Error canceling subscription:", error);
  }
};

// this is just to test out stripe webhook
// this is just to test out stripe webhook
// this is just to test out stripe webhook
// this is just to test out stripe webhook
// this is just to test out stripe webhook

export const update_user_doc = async (
  e: number,
  id: string,
  type: string,
  subscriptionid: string,
  subscriptionCancel: boolean,
) => {
  try {
    const app = initializeApp(firebaseConfig);

    // Initialize Firestore
    console.log(id);
    const db = getFirestore(app);
    const auth: any = getAuth();
    const userQuery = query(collection(db, "users"), where("userid", "==", id));
    const userDocs = await getDocs(userQuery);
    // console.log(userDocs);
    if (userDocs.empty) {
      console.log(
        "No user document found for the current user",
        "because the usedocs is empty",
      );
      return;
    }

    const userDocRef = doc(db, "users", userDocs.docs[0].id);
    await updateDoc(userDocRef, {
      subscribedAt: serverTimestamp(),
      step: e,
      subscriptionCancelled: subscriptionCancel,
      subscription: type,
      allocations: 30,
      subscriptionId: subscriptionid,
      // no_of_subscriptions: 1,
    });

    // Add_notification("has completed first subscription");
  } catch (error) {
    console.error("Error updating user document:", error);
    throw error;
  }
};
