import { Request, Response } from 'express';

const exampleController = {
  hello: (req: Request, res: Response) => {
    res.json({ message: 'Olá, mundo!' });
  }
};

export default exampleController;
