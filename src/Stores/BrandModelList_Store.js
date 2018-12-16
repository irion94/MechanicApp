import {action, observable, runInAction} from "mobx";
import * as mobx from "mobx";
import {map} from "ramda";
import * as carModels from "../carModels";
mobx.configure({ enforceActions: "observed" })

class BrandModelList_Store {
    @observable brandList;
    @observable brandState; //Done/Error

    @observable modelList;
    @observable modelState;

    @action async setBrandList() {
        this.brandList = [];
        this.brandState = "Pending";
        try{
            const brandList = await BrandGenerator();
            runInAction(() => {
                this.brandState = "Done";
                this.brandList = brandList;
            })
        }
        catch (error){
            runInAction(() => {
                this.brandState = "error"
            })
        }
    }

    getModelList(brand){
        return BrandModelGenerator().find(item => item.brand === brand).models
    }
}

let brandModelStore = new BrandModelList_Store();
export default brandModelStore;

let BrandGenerator = () => {
    let arr = [];
    map( item => arr.push({brand:item.brand}), carModels);
    return arr;
}

export let BrandModelGenerator = () => {
    let arr = [];
    map( item => arr.push(item), carModels);
    return arr;
}