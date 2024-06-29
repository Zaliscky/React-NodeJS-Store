import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = [] //{id:1, name: 'Phones'},{id:2, name: 'Laptop'}
        this._brands = [] //{id:1, name: 'Samsung'},{id:2, name: 'Apple'}
        this._devices = [] 
        this._selectedType = {}
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        makeAutoObservable(this)
    }
//{id:1, name: '17 pro', price:'', rating:'0', image : 'D:\\_Desktop\\JS\\Practise8 Store\\server\\static\\iphobe.jpg'},
                           ///{id:2, name: '15 pro', price:'1000', rating:'0', image : null},
                           //{id:4, name: 'S22', price:'1000', rating:'0', image : null}
    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setDevices(devices) {
        this._devices = devices
    }

    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }
    setSelectedBrand(brand) {
        this.setPage(1)
        this._selectedBrand = brand
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get devices() {
        return this._devices
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}