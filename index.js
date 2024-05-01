require('dotenv').config()
const express = require('express')
const app = express()


//importações
// const morgan = require('morgan')
const path = require("path")
const cors = require('cors')
const api = require('./backend/api.js')
const schedule = require('node-schedule');
const produto = require('./backend/models/produto.js')
// const Produto = require("./backend/models/produto.js")

//middlewares
// app.use(morgan('dev'))
app.use(express.json())
const multer = require('multer')
app.use(express.urlencoded({extended: true}))

app.use("/api", api)

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, path.resolve(__dirname, "./", "img"));
    },
    filename: (req, file, cb)=>{
        cb(null, req.body.name);
    },
    limits:{
        fileSize: 4*1024*1024,
    },
    fileFilter: (req, file, cb)=>{
        const allowedMimes=[
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif"
        ];
        if(allowedMimes.includes(file.mimetype)){
            cb(null, true);
        }else{
            cd(new error("Invalid file type."))
        }
    }
})


const upload = multer({storage: storage})
app.post("/upload", upload.single("file", (req, res)=>{
    try{
        res.status(200).json("file has been uploaded")
    }catch(err){
        res.json(err)
    }
}))

app.use("/img", express.static(path.resolve(__dirname, "./", "img")))
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "/*");
    res.header("Access-Control-Allow-Methods", 'GET,POST');
    app.use(cors())
    next();
})
app.use(cors())


//Agendamento com node-Schemule - cadastrar post
const job = schedule.scheduleJob('0 13 * * *', function(){
    const delitePosts = async ()=>{
        try {
            const fourDaysAgo = new Date();
            fourDaysAgo.setDate(fourDaysAgo.getDate() - 6);
        
            await produto.deleteMany({ createdAt: { $lte: fourDaysAgo } });
          } catch (error) {
            console.error('Erro ao deletar posts:', error.message);
          }
    }

    delitePosts()
});

//routas

app.get("/", (req, res)=>{
    function aleCod(max, min){
        return Math.floor(Math.random()*(max - min) + min)
    }
    
    const codigo = aleCod(100000, 1000000)
    console.log(codigo)
     res.json(codigo) 
})



//inicializar o app
const PORT=process.env.PORT
app.listen(PORT, console.log("Servidor Inicializado!"))