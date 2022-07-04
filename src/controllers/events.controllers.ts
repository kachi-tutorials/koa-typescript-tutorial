import { Context } from "koa";
import { eventsDbProps } from "../types/events.types";

const events_db: eventsDbProps[] = [];

export const getEvents = (ctx: Context) => {
  ctx.body = events_db;
  ctx.status = 200;
};

export const postEvent = (ctx: Context) => {
  events_db.push(ctx.request.body);
  ctx.body = "Event Created!";
  ctx.status = 201;
};
