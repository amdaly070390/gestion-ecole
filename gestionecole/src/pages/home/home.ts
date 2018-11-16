import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
//import { HttpClient } from "@angular/common/http";
import { ClassePage } from "../classe/classe";
import { ElevePage } from "../eleve/eleve";
import { InscriptionPage } from "../inscription/inscription";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad HomePage");
  }
  loginCla() {
    this.navCtrl.push("ClassePage", NavParams);
  }

  loginEl() {
    this.navCtrl.push("ElevePage", NavParams);
  }
  loginIns() {
    this.navCtrl.push("InscriptionPage", NavParams);
  }
}
