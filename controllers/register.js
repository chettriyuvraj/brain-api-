const handleRegister = (req, res,bcrypt,db) => {

    const { email, name, password } = req.body;

    if(!email||!name||!password)
        return res.status(400).json("incorrect form submission");

    // bcrypt.hash(password, null, null, function (err, hash) {
    //     // Store hash in your password DB.
    //     console.log(hash);
    // }); //asynch hash 

    const hash = bcrypt.hashSync(password);//sync hash

    db.transaction(trx => {

        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users').returning('*').insert({
                    email: email,
                    name: name,
                    joined: new Date()
                }).then(user => { res.json(user[0]) })

            })
            .then(trx.commit)
            .catch(trx.rollback)



    }).catch(err => { res.status(400).json('Unable to register!') });






};


module.exports = {
    handleRegister:handleRegister
};