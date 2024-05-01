const express = require('express')
const router = express.Router()

//conectar ao Bongodb Atlas
require('./services/database')

//routes
const authRouter = require("./routes/auth.routes")
const usersRouter = require("./routes/User.routes")
const postsRouter = require("./routes/Produto.routes")
const categoryRouter = require("./routes/Category.routes")
const desapegoRouter = require("./routes/Desapego.routes")
const aluguelRouter = require("./routes/Aluguel.routes")
const compartilharRouter = require("./routes/Compartilhar.routes")
const HelloRouter = require('./routes/Hello.routes.js')
const stripeRouter = require('./routes/stripe.routes')
const userSig = require('./routes/AuthSig')
const produtoMonitor = require('./routes/ProdutoMonitor')
const doacaoMonitor = require('./routes/DesapegoMonitor')
const aluguelMonitor = require('./routes/AluguelMonitor')
const compartilharMonitor = require('./routes/CompartilharMonitor.js')
const UserG = require('./routes/UserGoogle.js')
const GlobalUser = require('./routes/GlobalUser.js')
// const RouterUpload = require('./routes/Post.routes.js')

router.get("/", (req, res)=>{
    function aleCod(max, min){
        return Math.floor(Math.random()*(max - min) + min)
    }
    
    const codigo = aleCod(100000, 1000000)
    console.log(codigo)
     res.json(codigo) 
})

// app.use("/", RouterUpload)
router.use("/auth/router", authRouter)
router.use("/hello", HelloRouter)
router.use("/produto", postsRouter)
router.use("/produtomonitor", produtoMonitor)
router.use("/doacaomonitor", doacaoMonitor)
router.use("/aluguelmonitor", aluguelMonitor)
router.use("/compartilharmonitor", compartilharMonitor)
router.use("/users", usersRouter)
router.use("/usersig", userSig)
router.use("/userg", UserG)
router.use("/global", GlobalUser)
router.use("/categories", categoryRouter)
router.use("/desapego", desapegoRouter)
router.use("/aluguel", aluguelRouter)
router.use("/compartilhar", compartilharRouter)
router.use('/stripe', stripeRouter)

module.exports = router;