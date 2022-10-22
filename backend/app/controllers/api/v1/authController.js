const authService = require('../../../services/authService');

module.exports = {

    async createAdmin(req, res) {
        try {
            const {email, password, name, } = req.body;
            const createdBy = req.user.name;
            const updatedBy = req.user.name;
            const status = 'admin';
            console.log(createdBy)
            const user = await authService.createAdmin(email, password , name , status , createdBy, updatedBy);
            res.status(201).json({
                status: "OK",
                data: user,
            });
        } catch (err) {
            res.status(201).json({
                status: "FAIL",
                message: err.message,
            });
        }
    },

    register(req,res){
        const {email, password, name} = req.body;
        const createdBy = "default";
        const updatedBy = "default";
        const status = 'member';
        authService.register(email, password, name, status, createdBy, updatedBy).then((user)=>{
            res.status(201).json({
                status:"OK",
                data:user
            })
        }).catch((err)=>{
                res.status(400).json({
                    status:"FAIL",
                    message: err.message,
                })
            });
    },
    

    login(req, res){
        const {email, password} = req.body;

        authService.login(email, password).then((auth)=>{
            if(!auth){
                res.status(401).json({
                    status: "FAIL",
                    message: "Email or password is incorrect",
                })
                return;
            }
            res.status(200).json({
                status: "OK",
                data: auth
            })
        }).catch((err)=>{
            res.status(400).json({
                status: "FAIL",
                message: err.message
            })
        })
    },


    async allUser(req, res){
        try{
            const user = await authService.allUser();
            res.status(200).json({
                status: "OK",
                data: user.data,
                count: user.count
            })
        }catch(err){
            throw err;
        }
    },


    authorize(req, res, next){
        const bearerToken = req.headers.authorization;
        console.log(bearerToken)
        if(!bearerToken){
            res.status(403).json({
                    message:"Unauthorized"
                })
                return;
        }

        const token = bearerToken.split('Bearer ')[1];
        console.log(token)
        authService.authorize(token).then(user=>{
            if(!user){
                res.status(403).json({
                    message:"Unauthorized"
                })
                return;
            }

            req.user = user;
            next();
        }).catch((err) =>{
            res.status(403).json({
                    message:"Unauthorized"
            })
        })
    },

    authorizeAdmin(req, res, next){
        const bearerToken = req.headers.authorization;
        if(!bearerToken){
            res.status(403).json({
                    message:"Unauthorized"
                })
                return;
        }
        const token = bearerToken.split('Bearer ')[1];
        authService.authorize(token).then(user=>{
            if(!user){
                res.status(403).json({
                    message:"Unauthorized"
                })
                return;
            }
            console.log(user.status)
            if((user.status != ('admin') && (user.status != 'super admin') )){
                res.status(403).json({
                    message:"you are not allowed"
                })
                return;
            }

            req.user = user;
            next();
        }).catch((err) =>{
            res.status(403).json({
                    message:"Unauthorized"
            })
        })
    },

    authorizeSuperAdmin(req, res, next){
        const bearerToken = req.headers.authorization;
        if(!bearerToken){
            res.status(403).json({
                    message:"Unauthorized"
                })
                return;
        }
        const token = bearerToken.split('Bearer ')[1];

        authService.authorize(token).then(user=>{
            if(!user){
                res.status(403).json({
                    message:"Unauthorized"
                })
                return;
            }
            console.log(user.status)
            if(user.status != 'super admin' ){
                res.status(403).json({
                    message:"you are not allowed"
                })
                return;
            }
            req.user = user;
            next();
        }).catch((err) =>{
            res.status(403).json({
                    message:"Unauthorized"
            })
        })
    },

    whoAmI(req, res){
        const user = req.user;
        console.log(user)
        res.status(201).json({
            status:"OK",
            data: user,
        })
    },

    
}