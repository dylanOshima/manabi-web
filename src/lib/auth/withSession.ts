import type { GetServerSideProps } from "next";

import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import { NextApiHandler } from "next";
import ironConfig from "./ironConfig";

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, ironConfig);
}

export function withSessionServerSideRendering<
  TProps extends { [key: string]: any } = { [key: string]: any }
>(handler: GetServerSideProps<TProps>) {
  return withIronSessionSsr(handler, ironConfig);
}