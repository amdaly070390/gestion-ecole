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
 * Generated class for the AddclassePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-addclasse",
  templateUrl: "addclasse.html"
})
export class AddclassePage {
  public form: FormGroup;

  public nomCla: any;

  public descriptionCla: any;

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
      nomCla: ["", Validators.required],
      descriptionCla: ["", Validators.required]
    });
  }

  ionViewWillEnter(): void {
    this.resetFields();

    if (this.NP.get("record")) {
      this.isEdited = true;
      this.selectEntry(this.NP.get("record"));
      this.pageTitle = "A Classe entry";
    } else {
      this.isEdited = false;
      this.pageTitle = "Create new entry classe";
    }
  }

  selectEntry(item: any): void {
    this.nomCla = item.nomCla;
    this.descriptionCla = item.descriptionCla;
    this.recordID = item.id;
  }

  createEntry(nomCla: string, descriptionCla: string): void {
    let headers: any = new HttpHeaders({ "Content-Type": "application/json" }),
      options: any = {
        key: "create",
        nomCla: nomCla,
        descriptionCla: descriptionCla
      },
      url: any = this.baseURI + "manage-data-classe.php";

    this.http.post(url, JSON.stringify(options), headers).subscribe(
      (data: any) => {
        // If the request was successful notify the user
        this.hideForm = true;
        this.sendNotification(
          `Congratulations the technology: ${nomCla} was successfully added`
        );
      },
      (error: any) => {
        this.sendNotification("Something went wrong!");
      }
    );
  }

  updateEntry(nomCla: string, descriptionCla: string): void {
    let headers: any = new HttpHeaders({ "Content-Type": "application/json" }),
      options: any = {
        key: "update",
        nomCla: nomCla,
        descriptionCla: descriptionCla,
        recordID: this.recordID
      },
      url: any = this.baseURI + "manage-data-classe.php";

    this.http.post(url, JSON.stringify(options), headers).subscribe(
      data => {
        // If the request was successful notify the user
        this.hideForm = true;
        this.sendNotification(
          `Congratulations the technology: ${nomCla} was successfully updated`
        );
      },
      (error: any) => {
        this.sendNotification("Something went wrong!");
      }
    );
  }

  deleteEntry(): void {
    let nomCla: string = this.form.controls["nomCla"].value,
      headers: any = new HttpHeaders({ "Content-Type": "application/json" }),
      options: any = { key: "delete", recordID: this.recordID },
      url: any = this.baseURI + "manage-data-classe.php";

    this.http.post(url, JSON.stringify(options), headers).subscribe(
      data => {
        this.hideForm = true;
        this.sendNotification(
          `Congratulations the technology: ${nomCla} was successfully deleted`
        );
      },
      (error: any) => {
        this.sendNotification("Something went wrong!");
      }
    );
  }

  saveEntry(): void {
    let nomCla: string = this.form.controls["nomCla"].value,
      descriptionCla: string = this.form.controls["descriptionCla"].value;

    if (this.isEdited) {
      this.updateEntry(nomCla, descriptionCla);
    } else {
      this.createEntry(nomCla, descriptionCla);
    }
  }

  resetFields(): void {
    this.nomCla = "";
    this.descriptionCla = "";
  }

  sendNotification(message: string): void {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    notification.present();
  }
}
