import Xendit from "xendit-node";

export const x = new Xendit({ secretKey: process.env.XENDIT_KEY as string });
