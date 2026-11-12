const express = require('express')
const app = express()
const PORT = 3000

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
    console.log(__dirname)
    const hora = new Date().toLocaleTimeString()
    console.log(`${hora} ${req.method} ${req.url}`)
    next()
})

app.get('/', (req, res) => {
    res.render('index', {titulo: 'Inicio'})
})

app.get('/horario', (req, res) => {
    const filas = [{dia: 'Lunes', horas: "8:30 - 14:30"}, 
        {dia: 'Martes', horas: "8:30 - 14:30"},
        {dia: 'Miercoles', horas: "8:30 - 14:30"},
        {dia: 'Jueves', horas: "8:30 - 14:30"},
        {dia: 'Viernes', horas: "8:30 - 14:30 y 16:00 - 19:00"}
    ]
    res.render('horario', {titulo: 'Horario', filas: filas});
})

app.get('/libros', (req, res) => {
    const libros = [
        { titulo: 'El Quijote', autor: 'Miguel de Cervantes', anio: 1605, disponible: true },
        { titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', anio: 1967, disponible: false
        },
        { titulo: 'La sombra del viento', autor: 'Carlos Ruiz Zafón', anio: 2001, disponible: true },
        { titulo: 'Clean Code', autor: 'Robert C. Martin', anio: 2008, disponible: false },
        { titulo: 'El nombre del viento', autor: 'Patrick Rothfuss', anio: 2007, disponible: true }
    ]   

    res.render('libros', {titulo: 'Libros', libros: libros})
})
app.get('/libros/disponibles', (req, res) => {
    var libros = [
        { titulo: 'El Quijote', autor: 'Miguel de Cervantes', anio: 1605, disponible: true },
        { titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', anio: 1967, disponible: false
        },
        { titulo: 'La sombra del viento', autor: 'Carlos Ruiz Zafón', anio: 2001, disponible: true },
        { titulo: 'Clean Code', autor: 'Robert C. Martin', anio: 2008, disponible: false },
        { titulo: 'El nombre del viento', autor: 'Patrick Rothfuss', anio: 2007, disponible: true }
    ]  
    
    libros = libros.filter(l => l.disponible)

    res.render('libros', {titulo: 'Libros Disponibles', libros: libros})
})

app.use((req, res) => {
 res.status(404).render('404', {titulo: '404'})
})

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`)
})
