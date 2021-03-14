const express = require('express')
const toyService = require('./toys.service')
const logger = require('../../services/logger.service');
// const router = express.Router()


/* toy API CONTROLLER */

//Get toy List
// router.get('/', (req, res) => {
//     toyService.query(filterBy)
//         .then(toys => {
//             console.log(toys)
//             res.json(toys)
//         })
// })

async function getToys(req, res) {
    console.log('getting')
    try {
        const toys = await toyService.query();
        res.send(toys);
    } catch (err) {
        logger.error('Failed to get toys', err);
        res.status(500).send({ err: 'Failed to get toys' });
    }
}


//Get single toy
// router.get('/:toyId', (req, res) => {
//     const toyId = req.params.toyId;
//     toyService.getById(toyId)
//         .then(toy => {
//             res.json(toy)
//         })
// })

async function getToy(req, res) {
    try {
        const toy = await toyService.getById(req.params.id);
        res.send(toy);
    } catch (err) {
        logger.error('Failed to get toy', err);
        res.status(500).send({ err: 'Failed to get toy' });
    }
}

//Remove toy 
// router.delete('/:toyId', (req, res) => {
//     const toyId = req.params.toyId;
//     toyService.remove(toyId)
//         .then(() => {
//             res.json('current toy delete')
//         })
//         .catch((err) => {
//             console.log('Cannot remove toy', err)
//             res.status(401).send('Cannot remove toy')
//         })
// })

async function removeToy(req, res) {
    try {
        await toyService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete toy', err)
        res.status(500).send({ err: 'Failed to delete toy' })
    }
}

// Add toy
// router.post('/', (req, res) => {
//     const toy = req.body
//         // const newtoy = { name, price, type, inStock, url }
//     toyService.save(toy)
//         .then((savedtoy) => {
//             console.log('Added toy:', toy);
//             res.json(toy)
//         })
//         .catch((err) => {
//             console.log('Cannot add toy', err)
//             res.status(401).send('Cannot add toy')
//         })
// })


//Save Toy

async function saveToy(req, res) {
    try {
        const toy = req.body;
        const savedtoy = await toyService.save(toy);
        res.send(savedtoy);
    } catch (err) {
        logger.error('Failed to update toy', err);
        res.status(500).send({ err: 'Failed to update toy' });
    }
}


//Update toy
// router.put('/:toyId', (req, res) => {
//     // const toyId = req.params.toyId;
//     const toy = req.body;
//     toyService.save(toy)
//         .then((savedtoy) => {
//             console.log('Updated toy:', toy);
//             res.json(savedtoy)
//         })
//         .catch((err) => {
//             console.log('you cant update toy', err, 'toy', toy)
//             res.status(401).send('you cant update the toy')
//         })
// })


module.exports = {
    getToy,
    getToys,
    removeToy,
    saveToy
}