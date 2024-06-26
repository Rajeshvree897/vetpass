import express from 'express';
import cors from 'cors';

const json2xls = require('json2xls');
var session = require('express-session')
var MemoryStore = require('memorystore')(session)


import cookie from 'cookie-parser';

import config from '../config';
import routes from '../http';
import { Request, Response } from 'express-serve-static-core';
import { NextFunction } from 'connect';
import flash from '../helpers/flash';
import Logger from './logger';

export default (app: express.Application) => {
  app.set('views', 'public/views/');
  app.use(express.static('public/assets'));
  app.use(cookie());
  app.use(json2xls.middleware);

  app.use(session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    resave: false,
    saveUninitialized: true,
    secret: 'vetpass_admin_secrate_8426456'
  }));

  app.use(cors());

  app.use(flash());

  // Middleware that transforms the raw string of req.body into json
  app.use(express.json());
  app.use(express.urlencoded());

  // Default route
  /* app.get('/', (req, res) => {
    res.redirect('/admin/login');
  }); */
  // Set admin route prefix
  app.use('/admin/', routes());

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    res.redirect('/admin/login');
  });

  // Error handlers for routes
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error.name == 'CustomError') {
      req.flash('error', error.message, req, res);
    } else {
      Logger.info(error.message);
      req.flash('error', 'Something went wrong', req, res);
    }
    res.redirect(req.get('referer') || '/');
  });

  /* app.use(errors()); */
};
