import { Request, Response, Application } from "express";
import { ContactController } from "../controllers/controller";
import { NextFunction } from "connect";

export class Routes {

    public contactController: ContactController = new ContactController();

    public routes(app: Application): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'Successful get request my dude!'
                })
            })
        // Contact 
        app.route('/contact')
            .get((req: Request, res: Response, next: NextFunction) => {
                if (req.query.key !== process.env.key)
                    res.status(401).send('You shall not pass!')
                else next()
            }, this.contactController.getContacts)
            .post(this.contactController.addNewContact)

        // Contact details
        app.route('/contact/:contactId')
            // get specific contact
            .get(this.contactController.getContactWithID)
            .put(this.contactController.updateContact)
            .delete(this.contactController.deleteContact)
    }
}