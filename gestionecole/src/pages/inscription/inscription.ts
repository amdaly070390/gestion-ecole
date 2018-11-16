import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { HttpClient } from "@angular/common/http";

/**
 * Generated class for the InscriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-inscription",
  templateUrl: "inscription.html"
})
export class InscriptionPage {
  public items: Array<any> = [];

  constructor(public navCtrl: NavController, public http: HttpClient) {}

  ionViewWillEnter(): void {
    this.load();
  }

  load(): void {
    this.http
      .get("http://localhost:81/retrieve-data-inscription.php")
      .subscribe(
        (data: any) => {
          console.dir(data);
          this.items = data;
        },
        (error: any) => {
          console.dir(error);
        }
      );
  }

  addEntry(): void {
    this.navCtrl.push("AddinscriptionPage");
  }

  viewEntry(param: any): void {
    this.navCtrl.push("AddinscriptionPage", param);
  }
}
