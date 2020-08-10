const clarifai = require('clarifai');


const app = new Clarifai.App({
    apiKey: 'bea226acdcea453d901516f830bf5106',
});



const handleApiCall=(req,res)=>{
    app.models.predict
    (Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>res.status(400).json("unable to fetch data from api"))

}


const handleImage = (req,res,db) =>
{
    const { id } = req.body;

    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            if (entries.length)
                res.json(entries[0]);
            else
                res.status(400).json('unable to get entries');

        }).catch(err => res.status(400).json('unable to get entries'))
}


module.exports = 
{
    handleImage:handleImage,
    handleApiCall:handleApiCall
}