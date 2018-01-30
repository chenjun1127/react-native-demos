/**
 * Created by 0easy-23 on 2018/1/30
 */
import {observable, computed, action, useStrict} from "mobx";

useStrict(true);
export default class UserOrder {
    @observable name = "Jone";
    @observable price = 10;
    @observable amount = 15;

    @computed get total() {
        return this.amount * this.price
    }

    @action increment() {
        this.amount++;
    }

    @action updateName(newName) {
        this.name = newName;
    }
}