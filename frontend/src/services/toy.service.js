import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import axios from 'axios';
import httpService from './http.service';



const KEY = 'toysDB';
const TOY_URL = '//localhost:3030/api/toy/';

export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy,
}

function query() {

    return httpService.get('toy')
        // .then(({ data }) => data)
}

function getById(id) {
    return httpService.get('toy' + id)

    // return storageService.get(KEY, id)
    // return gToys.find(toy => toy._id === id)
}

function remove(id) {
    // const idx = gToys.findIndex(toy => toy._id === id)
    // gToys.splice(idx, 1)
    // storageService.store(KEY, gToys)
    return httpService.delete('toy' + id)
        // .then(res => res.data)
        // .catch(err => {
        //     throw new Error('error')
        // })

    // return storageService.remove(KEY, id)
}

function save(toy) {
    // const savedToy = (toy._id) ? _update(toy) : _add(toy)
    // storageService.store(KEY, gToys)
    // return savedToy;

    if (toy._id) {
        return httpService.put('toy' + toy._id, toy)
            // .then(res => res.data)
    } else {
        return httpService.post('toy', toy)
            // .then(res => res.data)
    }

    // const savedToy = (toy._id) ? storageService.put(KEY, toy) : storageService.post(KEY, toy)
    // return savedToy
}


function getEmptyToy() {
    return {
        // _id: '',
        name: '',
        price: utilService.getRandomInt(10, 300),
        type: '',
        // createdAt: new Date(),
        url: utilService.getRandomInt(1, 100),
        inStock: true
    }
}

function _createToys() {
    return storageService.query(KEY)
        .then(toys => {
            if (!toys || !toys.length) {
                toys = [
                    _createToy('Train', 'kids'),
                    _createToy('Talking Doll', 'funny'),
                    _createToy('Ball', 'sports'),
                    _createToy('Jigsaw', 'smart'),
                    _createToy('Puzzle', 'smart'),
                    _createToy('Cards', 'kids'),
                    _createToy('Touch The Nums', 'kids'),
                ]

                localStorage.setItem(KEY, JSON.stringify(toys));
            }
            return toys;
        })
}

function _createToy(toyName, toyType) {
    return {
        _id: utilService.makeId(),
        name: toyName,
        price: utilService.getRandomInt(10, 300),
        type: toyType,
        createdAt: new Date(),
        url: utilService.getRandomInt(1, 100),
        inStock: true

    }
}