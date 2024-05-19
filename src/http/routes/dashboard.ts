import { Router, Request, Response } from 'express';
import { authRedirect } from '../middlewares/index';
// import NotificationService from '../../services/notification-service';

export default (app: Router) => {
  app.get('/dashboard', authRedirect(true), async (req: Request, res: Response) => {
    // const notification = new NotificationService();
    // await notification.sampletestNotification();
    res.render('dashboard/index.ejs', {
      title: ' Dashboard',
      userData: req.session && req.session.user ? req.session.user : null,
    });
  });
};
