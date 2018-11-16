import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
/**
 * Generated class for the AddelevePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-addeleve",
  templateUrl: "addeleve.html"
})
export class AddelevePage {
  public form: FormGroup;

  public nomEl: any;
  public prenomEl: any;
  public datenaisEl: any;

  public isEdited: boolean = false;

  public hideForm: boolean = false;

  public pageTitle: string;

  public recordID: any = null;

  private baseURI: string = "http://localhost:81/IonicMysqlGestionEcole/";

  // Initialise module classes
  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    public NP: NavParams,
    public fb: FormBuilder,
    public toastCtrl: ToastController
  ) {
    // Create form builder validation rules
    this.form = fb.group({
      nomEl: ["", Validators.required],
      prenomEl: ["", Validators.required],
      datenaisEl: ["", Validators.required]
    });
  }

  ionViewWillEnter(): void {
    this.resetFields();

    if (this.NP.get("record")) {
      this.isEdited = true;
      this.selectEntry(this.NP.get("record"));
      this.pageTitle = "Eleve entry";
    } else {
      this.isEdited = false;
      this.pageTitle = " Create a eleve entry";
    }
  }

  selectEntry(item: any): void {
    this.nomEl = item.nomEl;
    this.prenomEl = item.prenomEl;
    this.datenaisEl = item.datenaisEl;
    this.recordID = item.id;
  }

  createEntry(nomEl: string, prenomEl: string, datenaisEl: string): void {
    let headers: any = new HttpHeaders({ "Content-Type": "application/json" }),
      options: any = {
        key: "create",
        nomEl: nomEl,
        prenomEl: prenomEl,
        datenaisEl: this.datenaisEl
      },
      url: any = this.baseURI + "manage-data-eleve.php";

    this.http.post(url, JSON.stringify(options), headers).subscribe(
      (data: any) => {
        // If the request was successful notify the user
        this.hideForm = true;
        this.sendNotification(
          `Congratulations the technology: ${nomEl} was successfully added`
        );
      },
      (error: any) => {
        this.sendNotification("Something went wrong!");
      }
    );
  }

  updateEntry(nomEl: string, prenomEl: string, datenaisEl: string): void {
    let headers: any = new HttpHeaders({ "Content-Type": "application/json" }),
      options: any = {
        key: "update",
        nomEl: nomEl,
        prenomEl: prenomEl,
        datenaisEl: datenaisEl,
        recordID: this.recordID
      },
      url: any = this.baseURI + "manage-data-eleve.php";

    this.http.post(url, JSON.stringify(options), headers).subscribe(
      data => {
        // If the request was successful notify the user
        this.hideForm = true;
        this.sendNotification(
          `Congratulations the technology: ${name} was successfully updated`
        );
      },
      (error: any) => {
        this.sendNotification("Something went wrong!");
      }
    );
  }

  deleteEntry(): void {
    let nomEl: string = this.form.controls["nomEl"].value,
      headers: any = new HttpHeaders({ "Content-Type": "application/json" }),
      options: any = { key: "delete", recordID: this.recordID },
      url: any = this.baseURI + "manage-data-eleve.php";

    this.http.post(url, JSON.stringify(options), headers).subscribe(
      data => {
        this.hideForm = true;
        this.sendNotification(
          `Congratulations the student: ${nomEl} was successfully deleted`
        );
      },
      (error: any) => {
        this.sendNotification("Something went wrong!");
      }
    );
  }

  saveEntry(): void {
    let nomEl: string = this.form.controls["nomEl"].value,
      prenomEl: string = this.form.controls["prenomEl"].value,
      datenaisEl: string = this.form.controls["datenaisEl"].value;

    if (this.isEdited) {
      this.updateEntry(nomEl, prenomEl, datenaisEl);
    } else {
      this.createEntry(nomEl, prenomEl, datenaisEl);
    }
  }

  resetFields(): void {
    this.nomEl = "";
    this.prenomEl = "";
    this.datenaisEl = "";
  }

  sendNotification(message: string): void {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    notification.present();
  }
}
