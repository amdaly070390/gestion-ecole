import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { AddelevePage } from "../addeleve/addeleve";

/**
 * Generated class for the ElevePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-eleve",
  templateUrl: "eleve.html"
})
export class ElevePage {
  public items: Array<any> = [];

  constructor(public navCtrl: NavController, public http: HttpClient) {}

  /**
   * Triggered when template view is about to be entered
   * Returns and parses the PHP data through the load() method
   *
   * @public
   * @method ionViewWillEnter
   * @return {None}
   */
  ionViewWillEnter(): void {
    this.load();
  }

  /**
   * Retrieve the JSON encoded data from the remote server
   * Using Angular's Http class and an Observable - then
   * assign this to the items array for rendering to the HTML template
   *
   * @public
   * @method load
   * @return {None}
   */
  load(): void {
    this.http
      .get("http://localhost:81/IonicMysqlGestionEcole/retrieve-data-eleve.php")
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
    this.navCtrl.push("AddelevePage");
  }

  viewEntry(param: any): void {
    this.navCtrl.push("AddelevePage", param);
  }
}
