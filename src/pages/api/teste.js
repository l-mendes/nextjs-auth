import authenticated from '../../../utils/middlewares/authenticated';

export default authenticated(function Teste(req, res) {
    const data = {
        name: 'Lucas',
        age: 27
    };

    res.status(201).json(data);
});