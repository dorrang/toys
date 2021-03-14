// const gToys = require('../../data/toys.json');
const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;
// const logger = require('../../services/logger.service');




module.exports = {
    query,
    getById,
    remove,
    save
}

/* Get List Of toys */
async function query() {
    const criteria = {};
    try {
        const collection = await dbService.getCollection('toy');
        var toys = await collection.find(criteria).toArray();
        toys = toys.map(toy => {
            toy.createdAt = ObjectId(toy._id).getTimestamp();
            return toy;
        })
        return toys;

    } catch (err) {
        console.log('cannot find toys');
        throw err;
    }
}

/* Get toy By Id */
// function getById(toyId) {
//     const currToy = gToys.find(toy => toy._id === toyId)
//     return Promise.resolve(currToy);

// }

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy');
        const toy = await collection.findOne({ '_id': ObjectId(toyId) });
        return toy;
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err);
        throw err;
    }
}

/* Remove toy */
// function remove(toyId) {
//     const idx = gToys.findIndex(toy => toy._id === toyId)
//     gToys.splice(idx, 1)
//     return _saveToysToFile();
// }

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy');
        await collection.deleteOne({ '_id': ObjectId(toyId) });
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err);
        throw err;
    }
}

/* Add / update toy */
// function save(toy) {
//     if (toy._id) {
//         const idx = gToys.findIndex(t => t._id === toy._id)
//         if (idx < 0) return Promise.reject('No such toy', toy._id)
//         gToys.splice(idx, 1, toy)
//     } else {
//         toy._id = ObjectId(toy._id),
//             toy.createdAt = ObjectId(toy._id).getTimestamp();
//         gToys.unshift(toy)
//     }
//     return _saveToysToFile()
//         .then(() => toy)
// }

async function save(toy) {
    try {
        if (toy._id) {
            const toyToSave = {
                _id: ObjectId(toy._id),
                name: toy.name,
                price: toy.price,
                type: toy.type,
                inStock: true,
                createdAt: ObjectId(toy._id).getTimestamp()
            };
            const collection = await dbService.getCollection('toy')
            await collection.updateOne({ '_id': toyToSave._id }, { $set: toyToSave })
            return toyToSave;
        } else {
            const toyToAdd = {
                name: toy.name,
                price: toy.price,
                type: toy.type,
                createdAt: ObjectId(toy._id).getTimestamp(),
                url: getRandomInt(1, 100),
                inStock: true


            };
            const collection = await dbService.getCollection('toy');
            await collection.insertOne(toyToAdd);
            return toyToAdd;
        }
    } catch (err) {
        logger.error(`cannot save toy ${toy._id}`, err)
        throw err;
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}



// //update toys DB
// function _saveToysToFile() {
//     return new Promise((resolve, reject) => {
//         const fs = require('fs')
//         fs.writeFile('data/toys.json', JSON.stringify(gToys, null, 2), (err) => {
//             if (err) reject(err)
//             else resolve()
//         })
//     })
// }

// //utils make id
// function _makeId(length = 5) {
//     var txt = ''
//     var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//     for (var i = 0; i < length; i++) {
//         txt += possible.charAt(Math.floor(Math.random() * possible.length))
//     }
//     return txt
// }